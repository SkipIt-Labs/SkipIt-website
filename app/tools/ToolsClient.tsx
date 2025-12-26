"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/lib/useUser";
import ToolCard from "@/components/ToolCard";

export type ToolRow = {
  id: number;
  name: string;
  description: string | null;
  subscription_tier: string | null;
  is_active: boolean;
};

export default function ToolsClient({ tools }: { tools: ToolRow[] | null }) {
  const { user, profile, loading } = useUser();
  const searchParams = useSearchParams();
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const isLoggedIn = !!user;
  const isSubscribed = !!profile?.is_subscribed;

  const checkoutSuccess = useMemo(
    () => searchParams.get("success") === "1",
    [searchParams]
  );
  const checkoutSessionId = useMemo(
    () => searchParams.get("session_id"),
    [searchParams]
  );

  useEffect(() => {
    const run = async () => {
      if (!checkoutSuccess) return;
      if (!checkoutSessionId) return;
      if (!user?.id) return;
      if (profile?.is_subscribed) return;

      setSyncError(null);
      setSyncing(true);
      try {
        const res = await fetch("/api/checkout-success", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: checkoutSessionId,
            userId: user.id,
          }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          setSyncError(data?.error ?? "Failed to sync subscription.");
          return;
        }
        window.location.replace("/tools");
      } catch (e: any) {
        setSyncError(e?.message ?? "Failed to sync subscription.");
      } finally {
        setSyncing(false);
      }
    };
    run();
  }, [checkoutSuccess, checkoutSessionId, user?.id, profile?.is_subscribed]);

  if (loading) {
    return (
      <main className="min-h-screen px-8 py-16">
        <p className="text-white/60">Loading...</p>
      </main>
    );
  }

  const locked = !isSubscribed;

  return (
    <main className="min-h-screen px-8 py-16">
      <h1 className="text-3xl font-bold mb-10">Available Tools</h1>

      {checkoutSuccess && (
        <div className="border border-white/10 rounded-xl p-4 mb-8">
          {syncing ? (
            <p className="text-sm text-white/70">
              Processing your subscription… this usually takes a few seconds.
            </p>
          ) : syncError ? (
            <p className="text-sm text-red-400">
              Subscription sync failed: {syncError}
            </p>
          ) : (
            <p className="text-sm text-white/70">Subscription check complete.</p>
          )}
        </div>
      )}

      {!tools?.length ? (
        <p className="text-white/60">No tools found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.name}
              description={tool.description ?? ""}
              statusBadge={tool.subscription_tier}
              locked={locked}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      )}

      {!user && (
        <p className="text-sm text-white/50 mt-10">
          Some tools are only available for authenticated users.
        </p>
      )}

      {user && !profile?.is_subscribed && (
        <p className="text-sm text-white/50 mt-10">
          Some tools are only available with an active subscription.
        </p>
      )}
    </main>
  );
}


