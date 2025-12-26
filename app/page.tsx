"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/lib/useUser";
import SpotlightCard from "@/components/SpotlightCard";
import {
  CreditCard,
  Infinity,
  HardDrive,
  ShieldCheck,
  Rocket,
  Zap,
  Package,
  Cpu,
} from "lucide-react";

export default function Home() {
  const { user, loading } = useUser();

  return (
    <main className="min-h-screen text-white relative z-10">
      {/* Hero Section */}
      <section className="px-6 md:px-8 pt-10 md:pt-14 pb-10 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="glass neon-ring rounded-3xl px-6 md:px-10 py-10 md:py-14">
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="relative">
                <div className="absolute -inset-8 rounded-full blur-3xl opacity-40"
                  style={{ background: "radial-gradient(circle, rgba(124,92,255,0.45), transparent 60%)" }}
                />
                <Image
                  src="/glitch_logo.gif"
                  alt="SkipIt"
                  width={520}
                  height={520}
                  unoptimized
                  priority
                  className="relative object-contain drop-shadow-[0_40px_80px_rgba(124,92,255,0.22)]"
                />
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs tracking-[0.28em] uppercase text-white/50 mb-3">
                Fast • Minimal • No fluff
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  Simple tools for real problems
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 italic mb-8 max-w-2xl mx-auto">
                The place you go when you know you don't have time to search
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                {!loading && !user && (
                  <>
                    <Link
                      href="/login"
                      className="px-8 py-3 rounded-xl btn-primary font-semibold transition w-full sm:w-auto text-center"
                    >
                      Get Started
                    </Link>
                    <Link
                      href="/tools"
                      className="px-8 py-3 rounded-xl btn-ghost font-semibold transition w-full sm:w-auto text-center"
                    >
                      Browse Tools
                    </Link>
                    <Link
                      href="/contact"
                      className="px-8 py-3 rounded-xl btn-ghost font-semibold transition w-full sm:w-auto text-center"
                    >
                      Request a Tool
                    </Link>
                  </>
                )}
                {!loading && user && (
                  <>
                    <Link
                      href="/tools"
                      className="px-8 py-3 rounded-xl btn-primary font-semibold transition w-full sm:w-auto text-center"
                    >
                      Go to Tools
                    </Link>
                    <Link
                      href="/contact"
                      className="px-8 py-3 rounded-xl btn-ghost font-semibold transition w-full sm:w-auto text-center"
                    >
                      Request a Tool
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-8 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Why SkipIt?</h2>
            <div className="hidden md:block h-px flex-1 ml-6 bg-gradient-to-r from-white/0 via-white/15 to-white/0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Card 1 (Large - Main Pain) */}
            <SpotlightCard
              eyebrow="VALUE"
              title="Stop Renting Your Tools."
              description="Why pay $20/month forever for a tool you use twice? SkipIt is your permanent digital warehouse."
              className="md:col-span-4 md:row-span-2"
              icon={
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  <Infinity className="w-5 h-5" />
                </div>
              }
            >
              <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-[11px] tracking-[0.24em] uppercase text-white/45">
                    subscription culture
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    Pay forever, keep nothing.
                  </p>
                </div>
                <div className="rounded-2xl border border-cyan-300/25 bg-black/30 p-4">
                  <p className="text-[11px] tracking-[0.24em] uppercase text-cyan-200/70">
                    skipit
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    Own the toolkit. Build momentum.
                  </p>
                </div>
              </div>
            </SpotlightCard>

            {/* Card 2 (Tall/Square - Privacy) */}
            <SpotlightCard
              eyebrow="PRIVACY"
              title="Offline is the new Luxury."
              description="No cloud uploads. No data tracking. Your files never leave your machine."
              className="md:col-span-2 md:row-span-2"
              icon={
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  <HardDrive className="w-5 h-5" />
                </div>
              }
            >
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-black/30 border border-white/10 text-white/70">
                  Offline tools
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-black/30 border border-white/10 text-white/70">
                  No uploads
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-black/30 border border-white/10 text-white/70">
                  No tracking
                </span>
              </div>
            </SpotlightCard>

            {/* Card 3 (Wide - Performance) */}
            <SpotlightCard
              eyebrow="SPEED"
              title="Instant Launch."
              description="No logins, no 'update required' popups. Just click and work."
              className="md:col-span-4"
              icon={
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  <Zap className="w-5 h-5" />
                </div>
              }
            />

            {/* Card 4 (Standard) */}
            <SpotlightCard
              eyebrow="LEAN"
              title="The Anti‑Bloatware."
              description="10+ Tools. Max 200MB / tool . Runs on a potato."
              className="md:col-span-2"
              icon={
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  <Cpu className="w-5 h-5" />
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Tools Preview */}
      <section className="px-6 md:px-8 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Available Tools</h2>
            <div className="hidden md:block h-px flex-1 ml-6 bg-gradient-to-r from-white/0 via-white/15 to-white/0" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass neon-ring rounded-2xl p-6 hover:border-white/30 transition">
              <h3 className="text-xl font-semibold mb-2">YouTube Downloader</h3>
              <p className="text-white/60 text-sm mb-4">
                Download playlists, long videos or entire matches without limitations.
              </p>
              <span className="text-xs text-white/50">Offline tool</span>
            </div>
            
            <div className="glass neon-ring rounded-2xl p-6 hover:border-white/30 transition">
              <h3 className="text-xl font-semibold mb-2">Build PC on Budget</h3>
              <p className="text-white/60 text-sm mb-4">
                Tell us what you do and your budget, get the optimal configuration.
              </p>
              <span className="text-xs text-white/50">Online tool</span>
            </div>
            
            <div className="glass neon-ring rounded-2xl p-6 hover:border-white/30 transition">
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
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn-ghost font-semibold transition"
            >
              View all tools
              <span className="text-white/60">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!loading && !user && (
        <section className="px-6 md:px-8 pb-14">
          <div className="max-w-6xl mx-auto">
            <div className="glass neon-ring rounded-3xl px-6 md:px-10 py-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Ready to get started?
              </h2>
              <p className="text-white/65 mb-8 max-w-2xl mx-auto">
                Join SkipIt and unlock access to all tools. Simple pricing, no hidden fees.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/login"
                  className="px-8 py-3 rounded-xl btn-primary font-semibold transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/pricing"
                  className="px-8 py-3 rounded-xl btn-ghost font-semibold transition"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
