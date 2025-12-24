"use client";

import { useUser } from "@/lib/useUser";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { user, profile, loading } = useUser();
  const router = useRouter();
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);

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

  const handleCancelSubscription = async () => {
    if (!confirm("Are you sure you want to cancel your subscription? You will lose access to all premium tools.")) {
      return;
    }
    
    if (!user) return;
    setLoadingCancel(true);
    
    try {
      const res = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert("Subscription cancelled successfully");
        router.refresh();
      } else {
        alert(data.error || "Failed to cancel subscription");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to cancel subscription");
    } finally {
      setLoadingCancel(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen px-8 py-16">
        <p className="text-white/60">Loading...</p>
      </main>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <main className="min-h-screen px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="border border-white/10 rounded-xl p-6 mb-6">
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
        </div>

        {profile?.is_subscribed && (
          <div className="border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Subscription Management</h2>
            
            <button
              onClick={handleManageBilling}
              disabled={loadingPortal}
              className="w-full py-3 rounded-xl border border-white/30 text-white font-semibold hover:border-white/50 transition disabled:opacity-50"
            >
              {loadingPortal ? "Loading..." : "Manage Payment Method"}
            </button>
            
            <button
              onClick={handleCancelSubscription}
              disabled={loadingCancel}
              className="w-full py-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 font-semibold hover:bg-red-500/30 transition disabled:opacity-50"
            >
              {loadingCancel ? "Cancelling..." : "Cancel Subscription"}
            </button>
          </div>
        )}

        {!profile?.is_subscribed && (
          <div className="border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">No Active Subscription</h2>
            <p className="text-white/60 mb-4">
              You don't have an active subscription. Subscribe to get access to all tools.
            </p>
            <a
              href="/pricing"
              className="inline-block px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
            >
              View Pricing
            </a>
          </div>
        )}
      </div>
    </main>
  );
}

