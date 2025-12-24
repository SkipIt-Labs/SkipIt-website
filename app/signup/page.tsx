"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Step = "form" | "sent";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const e = email.trim().length > 3;
    const p = password.length >= 8;
    const m = password === confirmPassword;
    return e && p && m;
  }, [email, password, confirmPassword]);

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!canSubmit) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          // After they confirm the email, bring them back into the app.
          // Ensure this URL is allowed in Supabase Auth URL configuration.
          emailRedirectTo: `${window.location.origin}/tools`,
        },
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setStep("sent");
      setMessage("Check your email to confirm your account, then you can log in.");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    setMessage(null);
    if (email.trim().length <= 3) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/tools`,
        },
      });
      if (error) {
        setMessage(error.message);
        return;
      }
      setMessage("Confirmation email sent again. Check your inbox (and spam).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 md:px-8 relative z-10">
      <div className="w-full max-w-md glass neon-ring rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-2 text-center">Create your account</h1>
        <p className="text-white/60 text-sm text-center mb-6">
          Sign up with email + password, then confirm via email.
        </p>

        {step === "form" ? (
          <form onSubmit={signUp} className="space-y-4">
            <div>
              <label className="block text-sm text-white/70 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/15 focus:border-white/30 outline-none"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/15 focus:border-white/30 outline-none"
                placeholder="Min 8 characters"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1">Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/15 focus:border-white/30 outline-none"
                placeholder="Repeat password"
                autoComplete="new-password"
              />
              {confirmPassword.length > 0 && password !== confirmPassword && (
                <p className="text-xs text-red-300 mt-2">Passwords do not match.</p>
              )}
            </div>

            <button
              disabled={loading || !canSubmit}
              className="w-full py-3 rounded-xl btn-primary font-semibold transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-white/60">
              Confirmation email sent to <span className="text-white/80">{email.trim()}</span>
            </div>

            <div className="glass rounded-xl p-4 text-sm text-white/70">
              Open your email and confirm your account. After confirming, you can sign in with your
              email and password.
            </div>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => {
                  setStep("form");
                  setMessage(null);
                }}
                className="text-white/70 hover:text-white underline underline-offset-4"
              >
                Change email
              </button>
              <button
                type="button"
                onClick={resend}
                disabled={loading}
                className="text-white/70 hover:text-white underline underline-offset-4 disabled:opacity-50"
              >
                Resend email
              </button>
            </div>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full py-3 rounded-xl btn-ghost font-semibold transition"
            >
              Back to sign in
            </button>
          </div>
        )}

        {message && (
          <p className="text-sm text-center text-white/70 mt-5">{message}</p>
        )}

        <div className="mt-6 text-sm text-center text-white/60">
          Already have an account?{" "}
          <Link href="/login" className="text-white/80 hover:text-white underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}


