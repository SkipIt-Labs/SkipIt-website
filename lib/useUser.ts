"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

type Profile = {
  id: string;
  email: string | null;
  is_subscribed: boolean;
  plan: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
};

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      const { data, error } = await supabase.auth.getUser();
      const u = error ? null : data?.user ?? null;

      if (!mounted) return;

      setUser(u);

      if (!u) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data: prof, error: profErr } = await supabase
        .from("profiles")
        .select("id, email, is_subscribed, plan, stripe_customer_id, stripe_subscription_id")
        .eq("id", u.id)
        .single();

      if (!mounted) return;

      if (profErr) {
        // If profile row doesn't exist yet, try to create it (first login / first verify).
        const { data: created, error: createErr } = await supabase
          .from("profiles")
          .upsert(
            {
              id: u.id,
              email: u.email,
              is_subscribed: false,
              plan: null,
              stripe_customer_id: null,
              stripe_subscription_id: null,
            },
            { onConflict: "id" }
          )
          .select("id, email, is_subscribed, plan, stripe_customer_id, stripe_subscription_id")
          .single();

        if (createErr) {
          console.error("Failed to create profile:", createErr);
          setProfile(null);
        } else {
          setProfile(created as Profile);
        }
      } else {
        setProfile(prof as Profile);
      }

      setLoading(false);
    }

    load();

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      load();
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { user, profile, loading };
}
