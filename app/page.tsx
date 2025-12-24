"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/lib/useUser";

export default function Home() {
  const { user, loading } = useUser();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="px-8 py-20 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/glitch_logo.gif"
              alt="SkipIt"
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
          <p className="text-xl md:text-2xl text-white/80 mb-4 max-w-3xl mx-auto">
            Simple tools for real problems
          </p>
          <p className="text-lg md:text-xl text-white/70 italic mb-4 max-w-2xl mx-auto">
            The place you go when you know you don't have time to search
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!loading && !user && (
              <>
                <Link
                  href="/login"
                  className="px-8 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
                >
                  Get Started
                </Link>
                <Link
                  href="/tools"
                  className="px-8 py-3 rounded-xl border border-white/30 text-white font-semibold hover:border-white/50 transition"
                >
                  Browse Tools
                </Link>
              </>
            )}
            {!loading && user && (
              <Link
                href="/tools"
                className="px-8 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Go to Tools
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why SkipIt?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Fast & Simple</h3>
              <p className="text-white/60">
                No bloated interfaces. Get things done quickly.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🔓</div>
              <h3 className="text-xl font-semibold mb-2">No Limits</h3>
              <p className="text-white/60">
                Download entire playlists, process long files. No artificial restrictions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-semibold mb-2">Real Tools</h3>
              <p className="text-white/60">
                Built for actual problems. Offline tools that work without AI subscriptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Preview */}
      <section className="px-8 py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Available Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-white/10 rounded-xl p-6 hover:border-white/30 transition">
              <h3 className="text-xl font-semibold mb-2">YouTube Downloader</h3>
              <p className="text-white/60 text-sm mb-4">
                Download playlists, long videos or entire matches without limitations.
              </p>
              <span className="text-xs text-white/50">Offline tool</span>
            </div>
            
            <div className="border border-white/10 rounded-xl p-6 hover:border-white/30 transition">
              <h3 className="text-xl font-semibold mb-2">Build PC on Budget</h3>
              <p className="text-white/60 text-sm mb-4">
                Tell us what you do and your budget, get the optimal configuration.
              </p>
              <span className="text-xs text-white/50">Online tool</span>
            </div>
            
            <div className="border border-white/10 rounded-xl p-6 hover:border-white/30 transition">
              <h3 className="text-xl font-semibold mb-2">Pitch Changer</h3>
              <p className="text-white/60 text-sm mb-4">
                Change audio pitch quickly, without AI subscriptions.
              </p>
              <span className="text-xs text-white/50">Offline tool</span>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/tools"
              className="text-white/70 hover:text-white underline"
            >
              View all tools →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!loading && !user && (
        <section className="px-8 py-16 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-white/60 mb-8">
              Join SkipIt and unlock access to all tools. Simple pricing, no hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="px-8 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Sign In
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-3 rounded-xl border border-white/30 text-white font-semibold hover:border-white/50 transition"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
