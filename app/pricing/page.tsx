"use client";

import { useState } from "react";
import { useUser } from "@/lib/useUser";

type Plan = "monthly" | "yearly";

export default function PricingPage() {
  const { user } = useUser();
  const [loadingPlan, setLoadingPlan] = useState<Plan | null>(null);

  const handleCheckout = async (plan: Plan) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    setLoadingPlan(plan);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          email: user.email,
          userId: user.id,
        }),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;


      if (!res.ok) {
        console.error("Checkout error:", data);
        alert(data?.error ?? "Checkout error.");
        setLoadingPlan(null);
        return;
      }

      if (!data?.url) {
        alert(data?.error ?? "Could not start checkout.");
        setLoadingPlan(null);
        return;
      }
      window.location.href = data.url;
    } catch (e) {
      console.error(e);
      alert("Could not start checkout.");
      setLoadingPlan(null);
    }
  };

  return (
    <main className="min-h-screen px-8 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-3 text-center">
          Full Access to SkipIt
        </h1>
        <p className="text-white/60 text-center mb-12">
          Simple tools for real problems. No artificial limits.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Monthly */}
          <div className="glass neon-ring rounded-2xl p-8 flex flex-col h-full">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-2xl font-bold">Monthly</h2>
              <span className="text-xs text-white/50">Flexible</span>
            </div>

            <div className="mb-6">
              <div className="text-5xl font-bold">4.99€</div>
              <div className="text-white/50 mt-1">per month</div>
            </div>

            <ul className="text-sm text-white/70 space-y-2 mb-8 flex-1">
              <li>✓ Access to online tools</li>
              <li>✓ Access to offline tools</li>
              <li>✓ Constant updates</li>
              <li>✓ Propose a new tool</li>
            </ul>

            <button
              onClick={() => handleCheckout("monthly")}
              disabled={loadingPlan !== null}
              className="w-full py-3 rounded-xl btn-primary font-semibold transition disabled:opacity-50 mt-auto"
            >
              {loadingPlan === "monthly" ? "Redirecting..." : "Choose Monthly"}
            </button>
          </div>

          {/* Yearly */}
          <div className="glass neon-ring rounded-2xl p-8 relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-white text-black font-semibold">
              Best value
            </div>

            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-2xl font-bold">Yearly</h2>
              <span className="text-xs text-white/50">-50%</span>
            </div>

            <div className="mb-2">
              <div className="text-5xl font-bold">29.99€</div>
              <div className="text-white/50 mt-1">per year</div>
            </div>

            <div className="text-xs text-white/50 mb-6">
              Pay for 6 months, get another 6 months free.
            </div>

            <ul className="text-sm text-white/70 space-y-2 mb-8 flex-1">
              <li>✓ Access to online tools</li>
              <li>✓ Access to offline tools</li>
              <li>✓ Constant updates</li>
              <li>✓ Propose a new tool</li>
              <li>✓ Save ~50% per year</li>
            </ul>

            <button
              onClick={() => handleCheckout("yearly")}
              disabled={loadingPlan !== null}
              className="w-full py-3 rounded-xl btn-primary font-semibold transition disabled:opacity-50 mt-auto"
            >
              {loadingPlan === "yearly" ? "Redirecting..." : "Choose Yearly"}
            </button>
          </div>
        </div>

        {!user && (
          <p className="text-center text-sm text-white/50 mt-10">
            If you're not logged in, we'll automatically redirect you to Login before checkout.
          </p>
        )}
      </div>
    </main>
  );
}
