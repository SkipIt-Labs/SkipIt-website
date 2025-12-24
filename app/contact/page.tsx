"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return email.trim().length > 3 && request.trim().length >= 10;
  }, [email, request]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || loading) return;

    setLoading(true);
    setStatus("idle");
    setError(null);

    try {
      const res = await fetch("/api/tool-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || null,
          email: email.trim(),
          request: request.trim(),
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setStatus("error");
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setRequest("");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 md:px-8 py-10 md:py-14 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="glass neon-ring rounded-3xl p-8 md:p-10">
          <p className="text-xs tracking-[0.28em] uppercase text-white/50 mb-3">
            Contact / Request Tool
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Didn’t find what you need? Request a tool.
          </h1>
          <p className="text-white/65 mb-8">
            Tell us what you want to automate. If it’s a good fit, we’ll build it and notify you.
          </p>

          <form onSubmit={submit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/70 mb-1">
                  Name <span className="text-white/40">(optional)</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/15 focus:border-white/30 outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">
                  Email <span className="text-white/40">(required)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/15 focus:border-white/30 outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1">
                The Problem / Tool Request
              </label>
              <textarea
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                className="w-full min-h-[140px] px-4 py-3 rounded-lg bg-black/30 border border-white/15 focus:border-white/30 outline-none resize-y"
                placeholder='Describe the task you want to automate (what you do today, what input you have, what output you want).'
                required
              />
              <p className="text-xs text-white/45 mt-2">
                Tip: include an example input/output if possible.
              </p>
            </div>

            <button
              disabled={!canSubmit || loading}
              className="w-full py-3 rounded-xl btn-primary font-semibold transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send request"}
            </button>

            {status === "success" && (
              <div className="glass rounded-xl p-4 text-sm text-white/75">
                Request sent. We’ll email you when it’s ready.
              </div>
            )}
            {status === "error" && (
              <div className="glass rounded-xl p-4 text-sm text-red-200">
                {error ?? "Something went wrong. Please try again."}
              </div>
            )}

            <div className="text-sm text-center text-white/60">
              Prefer browsing?{" "}
              <Link
                href="/tools"
                className="text-white/80 hover:text-white underline underline-offset-4"
              >
                View tools
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}



