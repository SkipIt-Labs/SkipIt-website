"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    } else {
      router.push("/tools");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-8">
      <div className="w-full max-w-md border border-white/10 rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          SkipIt Authentication
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black border border-white/20"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black border border-white/20"
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-3 mt-4 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Continue"}
          </button>
        </form>

        {message && (
          <p className="text-sm text-center text-white/70 mt-4">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
