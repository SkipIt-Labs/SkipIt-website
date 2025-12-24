import { supabase } from "./supabaseClient";

export async function getProfile() {
  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  if (userErr || !user) return { user: null, profile: null };

  const { data: profile, error: profErr } = await supabase
    .from("profiles")
    .select("id, email, is_subscribed, plan")
    .eq("id", user.id)
    .single();

  if (profErr) return { user, profile: null };

  return { user, profile };
}
