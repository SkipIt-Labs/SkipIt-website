"use client";

import { useUser } from "@/lib/useUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AccountPage() {
  const { user, profile, loading } = useUser();
  const router = useRouter();
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  const handleManageBilling = async () => {
    if (!user) return;
    
    setLoadingPortal(true);
    try {
      const res = await fetch("/api/customer-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to open billing portal");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to open billing portal");
    } finally {
      setLoadingPortal(false);
    }
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } finally {
      setSigningOut(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen px-8 py-16">
        <p className="text-white/60">Loading...</p>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="glass neon-ring rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-2">
            <p className="text-white/70">
              <span className="text-white/50">Email:</span> {user.email}
            </p>
            <p className="text-white/70">
              <span className="text-white/50">Subscription:</span>{" "}
              {profile?.is_subscribed ? (
                <span className="text-green-400">
                  Active ({profile.plan})
                </span>
              ) : (
                <span className="text-white/50">Inactive</span>
              )}
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="px-6 py-3 rounded-xl btn-ghost font-semibold transition disabled:opacity-50"
            >
              {signingOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </div>

        {profile?.is_subscribed && (
          <div className="glass neon-ring rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Subscription Management</h2>
            
            <button
              onClick={handleManageBilling}
              disabled={loadingPortal}
              className="w-full py-3 rounded-xl btn-primary font-semibold transition disabled:opacity-50"
            >
              {loadingPortal ? "Loading..." : "Manage Payment Method"}
            </button>
          </div>
        )}

        {!profile?.is_subscribed && (
          <div className="glass neon-ring rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">No Active Subscription</h2>
            <p className="text-white/60 mb-4">
              You don't have an active subscription. Subscribe to get access to all tools.
            </p>
            <a
              href="/pricing"
              className="inline-block px-6 py-3 rounded-xl btn-primary font-semibold transition"
            >
              View Pricing
            </a>
          </div>
        )}
      </div>
    </main>
  );
}

