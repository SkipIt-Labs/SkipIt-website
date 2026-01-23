"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const EMAIL = "skipittools@gmail.com";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");

  const canSubmit = useMemo(() => {
    return email.trim().length > 3 && request.trim().length >= 10;
  }, [email, request]);

  const mailtoHref = useMemo(() => {
    const subject = `Tool Request${name.trim() ? ` - ${name.trim()}` : ""}`;
    const bodyLines = [
      `Name: ${name.trim() || "-"}`,
      `Email: ${email.trim() || "-"}`,
      "",
      "Request:",
      request.trim(),
    ];
    const body = bodyLines.join("\n");
    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [name, email, request]);

  return (
    <main className="min-h-screen px-6 md:px-8 py-10 md:py-14 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="glass neon-ring rounded-3xl p-8 md:p-10">
          <p className="text-xs tracking-[0.28em] uppercase text-white/50 mb-3">
            Request Tools
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Need a new tool?
          </h1>
          <p className="text-white/65 mb-8">
            Send us your idea and we will reply by email. Your message will be sent to {EMAIL}.
          </p>

          <div className="space-y-5">
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
                  placeholder="you@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1">
                What do you want to solve?
              </label>
              <textarea
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                className="w-full min-h-[140px] px-4 py-3 rounded-lg bg-black/30 border border-white/15 focus:border-white/30 outline-none resize-y"
                placeholder="Describe the task: what you do today, what inputs you have, what output you want."
                required
              />
              <p className="text-xs text-white/45 mt-2">
                Tip: include a sample input/output if you can.
              </p>
            </div>

            <a
              href={mailtoHref}
              className={`w-full inline-flex items-center justify-center py-3 rounded-xl btn-primary font-semibold transition ${
                canSubmit ? "" : "opacity-50 pointer-events-none"
              }`}
            >
              Open email
            </a>

            <div className="text-sm text-center text-white/60">
              Prefer browsing?{" "}
              <Link
                href="/tools"
                className="text-white/80 hover:text-white underline underline-offset-4"
              >
                View tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
