import Link from "next/link";
import Image from "next/image";
import SpotlightCard from "@/components/SpotlightCard";
import { HardDrive, ShieldCheck, Rocket, Zap, Package, Cpu, Github } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen text-white relative z-10">
      <section className="px-6 md:px-8 pt-10 md:pt-14 pb-10 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="glass neon-ring rounded-3xl px-6 md:px-10 py-10 md:py-14">
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="relative">
                <div
                  className="absolute -inset-8 rounded-full blur-3xl opacity-40"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(124,92,255,0.45), transparent 60%)",
                  }}
                />
                <Image
                  src={`glitch_logo.gif`}
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
                Rapid • Minimal • No accounts
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  A static depot of practical tools
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 italic mb-8 max-w-2xl mx-auto">
                Download, install, solve the problem. No subscriptions, no endless searching.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link
                  href="/tools"
                  className="px-8 py-3 rounded-xl btn-primary font-semibold transition w-full sm:w-auto text-center"
                >
                  Browse Tools
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3 rounded-xl btn-ghost font-semibold transition w-full sm:w-auto text-center"
                >
                  Request Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Why SkipIt?</h2>
            <div className="hidden md:block h-px flex-1 ml-6 bg-gradient-to-r from-white/0 via-white/15 to-white/0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <SpotlightCard
              eyebrow="OFFLINE"
              title="Runs locally."
              description="Every tool is built to run on your machine, with no uploads or accounts."
              className="md:col-span-4 md:row-span-2"
              icon={
                <div className="flex items-center gap-2">
                  <HardDrive className="w-5 h-5" />
                  <ShieldCheck className="w-5 h-5" />
                </div>
              }
            >
              <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-[11px] tracking-[0.24em] uppercase text-white/45">
                    no cloud
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    Your files stay with you.
                  </p>
                </div>
                <div className="rounded-2xl border border-cyan-300/25 bg-black/30 p-4">
                  <p className="text-[11px] tracking-[0.24em] uppercase text-cyan-200/70">
                    fast
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    Click and go.
                  </p>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard
              eyebrow="GITHUB"
              title="Direct downloads."
              description="Each tool has a GitHub repo and a simple latest-release link."
              className="md:col-span-2 md:row-span-2"
              icon={
                <div className="flex items-center gap-2">
                  <Github className="w-5 h-5" />
                </div>
              }
            >
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-black/30 border border-white/10 text-white/70">
                  release builds
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-black/30 border border-white/10 text-white/70">
                  quick README
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-black/30 border border-white/10 text-white/70">
                  open source
                </span>
              </div>
            </SpotlightCard>

            <SpotlightCard
              eyebrow="START"
              title="Instant launch."
              description="Install once, keep it handy forever."
              className="md:col-span-4"
              icon={
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  <Zap className="w-5 h-5" />
                </div>
              }
            />

            <SpotlightCard
              eyebrow="LEAN"
              title="No bloat."
              description="Small, focused tools that do one thing extremely well."
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

      <section className="px-6 md:px-8 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Available tools</h2>
            <div className="hidden md:block h-px flex-1 ml-6 bg-gradient-to-r from-white/0 via-white/15 to-white/0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass neon-ring rounded-2xl p-6 hover:border-white/30 transition">
              <h3 className="text-xl font-semibold mb-2">Media Saver</h3>
              <p className="text-white/60 text-sm mb-4">
                Download playlists, long videos, or full matches without limits.
              </p>
            </div>

            <div className="glass neon-ring rounded-2xl p-6 hover:border-white/30 transition">
              <h3 className="text-xl font-semibold mb-2">Vers2Go</h3>
              <p className="text-white/60 text-sm mb-4">
                Turn song lyrics into ready-to-present PowerPoint slides, one stanza per slide.
              </p>
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

      <section className="px-6 md:px-8 pb-14">
        <div className="max-w-6xl mx-auto">
          <div className="glass neon-ring rounded-3xl px-6 md:px-10 py-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Need a new tool?</h2>
            <p className="text-white/65 mb-8 max-w-2xl mx-auto">
              Send your idea and we will turn it into a downloadable tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3 rounded-xl btn-primary font-semibold transition"
              >
                Request Tools
              </Link>
              <Link
                href="/tools"
                className="px-8 py-3 rounded-xl btn-ghost font-semibold transition"
              >
                Browse Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 md:px-8 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="h-px w-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 mb-6" />
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-white/45">
            <div>© {new Date().getFullYear()} SkipIt.</div>
            <div className="flex items-center gap-2">
              <Link
                href="/tools"
                className="transition text-white/45 hover:text-cyan-300"
              >
                Tools
              </Link>
              <span className="text-white/25">|</span>
              <Link
                href="/contact"
                className="transition text-white/45 hover:text-cyan-300"
              >
                Request Tools
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
