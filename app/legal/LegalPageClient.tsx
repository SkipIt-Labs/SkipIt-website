"use client";

import Link from "next/link";
import LegalAccordion, { type AccordionItem } from "./LegalAccordion";

const LAST_UPDATED = "December 25, 2025";

export default function LegalPageClient() {
  const items: AccordionItem[] = [
    {
      id: "refund",
      title: "Refund Policy (EU Digital Content)",
      content: (
        <div className="space-y-3">
          <h3 className="text-white/90 font-semibold text-sm">
            The EU clause (digital content & immediate execution)
          </h3>
          <p>
            SkipIt provides digital content and/or digital services (software tools) delivered
            electronically. By completing a purchase and receiving access to the software, you
            request the immediate execution of the contract.
          </p>
          <p>
            <span className="text-white/90 font-semibold">Express consent & acknowledgment:</span>{" "}
            By purchasing and downloading/accessing the software, you expressly agree to immediate
            performance and acknowledge that you{" "}
            <span className="text-white/90 font-semibold">waive your right of withdrawal</span>{" "}
            (cooling‑off period) for digital content supplied immediately and not on a tangible
            medium, to the extent permitted under applicable EU consumer law (including Directive
            2011/83/EU as implemented in Romania).
          </p>

          <div className="mt-2 rounded-2xl border border-cyan-300/25 bg-gradient-to-r from-cyan-300/10 to-blue-500/10 p-4 text-white/80">
            <span className="text-white/90 font-semibold">7‑Day Money‑Back Guarantee:</span> If the
            software does not work on your machine or you are unsatisfied, contact us within 7 days
            of purchase so we can attempt to resolve the issue. Where approved, refunds are
            processed to the original payment method.
          </div>

          <h3 className="text-white/90 font-semibold text-sm">Anti‑abuse</h3>
          <p>
            We reserve the right to deny refunds in cases of suspected abuse or bad‑faith behavior,
            including (but not limited to):
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Downloading a large portion of the tool library and immediately requesting a refund.
            </li>
            <li>Repeated refund requests across multiple purchases or accounts.</li>
            <li>Fraudulent activity, chargeback abuse, or policy circumvention.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "terms",
      title: "Terms of Use",
      content: (
        <div className="space-y-3">
          <h3 className="text-white/90 font-semibold text-sm">Personal license</h3>
          <p>
            Your purchase grants you a personal, limited, non‑exclusive, non‑transferable, revocable
            license to use SkipIt tools for your own lawful purposes, subject to these Terms.
          </p>

          <h3 className="text-white/90 font-semibold text-sm">Restrictions</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>You may not resell, sublicense, rent, lease, or redistribute the tools.</li>
            <li>
              You may not reverse engineer, decompile, or attempt to extract source code except
              where permitted by law.
            </li>
            <li>You may not remove or alter notices, branding, licensing, or technical protections.</li>
            <li>You may not use the tools to violate applicable law or third‑party rights.</li>
          </ul>

          <h3 className="text-white/90 font-semibold text-sm">Warranty disclaimer</h3>
          <p>
            The software is provided <span className="text-white/90 font-semibold">“as is”</span>{" "}
            and <span className="text-white/90 font-semibold">“as available”</span>, without
            warranties of any kind, to the maximum extent permitted by law.
          </p>

          <h3 className="text-white/90 font-semibold text-sm">Limitation of liability</h3>
          <p>
            To the maximum extent permitted by law, SkipIt Software will not be liable for indirect,
            incidental, special, consequential, or punitive damages. Many tools run locally; you are
            responsible for backing up your files and verifying outputs.
          </p>
        </div>
      ),
    },
    {
      id: "privacy",
      title: "Privacy (Offline‑first)",
      content: (
        <div className="space-y-3">
          <h3 className="text-white/90 font-semibold text-sm">Offline tools (no data collection)</h3>
          <p>
            SkipIt tools are designed to operate{" "}
            <span className="text-white/90 font-semibold">offline</span>. We do not upload your
            files to the cloud for processing, and we do not collect usage data from your offline
            tool executions.
          </p>

          <h3 className="text-white/90 font-semibold text-sm">Payments</h3>
          <p>
            Payments are processed securely by{" "}
            <span className="text-white/90 font-semibold">Stripe</span>. We do not store or process
            your full credit card details. Stripe may process personal data to provide payment
            services; please review Stripe’s policies for details.
          </p>

          <h3 className="text-white/90 font-semibold text-sm">Account data</h3>
          <p>
            We store minimal account data necessary to provide access (for example: email and
            subscription status). If you contact us for support, you may choose to share additional
            information—only share what is necessary.
          </p>
        </div>
      ),
    },
    {
      id: "contact",
      title: "Contact & Company Details",
      content: (
        <div className="space-y-3">
          <p>
            If you have questions about these Terms or would like to request a refund under the
            7‑Day Money‑Back Guarantee, contact us:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="text-white/90 font-semibold">Contact email:</span>{" "}
              <span className="text-white/85">skipittools@gmail.com</span>
            </li>
            <li>
              <span className="text-white/90 font-semibold">Company:</span>{" "}
              <span className="text-white/85">SkipIt Software (Romania, EU)</span>
            </li>
          </ul>
          <div className="rounded-2xl border border-cyan-300/20 bg-white/5 p-4 text-white/75">
            For Stripe disputes/chargebacks: please contact us first. Most issues can be resolved
            quickly without escalating.
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen px-6 md:px-8 py-12 md:py-16 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn-ghost font-semibold transition focus:outline-none"
          >
            <span className="text-white/70">←</span>
            Back to Home
          </Link>
        </div>

        <header className="glass neon-ring rounded-3xl px-6 md:px-8 py-8 md:py-10 mb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Terms, Refund Policy & Privacy
            </h1>
            <div className="px-4 py-2 rounded-full text-xs tracking-[0.24em] uppercase text-cyan-200/80 bg-black/30 border border-cyan-300/20">
              SkipIt Software
            </div>
          </div>

          <p className="mt-4 text-white/70">
            This page explains how SkipIt products work, what you’re allowed to do with the
            software, how refunds are handled, and our offline‑first privacy promise.
          </p>

          <p className="mt-4 text-sm text-white/60">
            <span className="text-white/80 font-semibold">Last Updated:</span> {LAST_UPDATED}
          </p>
        </header>

        <LegalAccordion items={items} defaultOpenId="refund" />

        <footer className="mt-8 glass neon-ring rounded-2xl px-6 py-5 text-sm text-white/60 flex flex-col sm:flex-row gap-2 sm:justify-between">
          <div>
            <span className="text-white/80 font-semibold">SkipIt Software</span> — Tools that save
            time.
          </div>
          <div>
            Contact: <span className="text-white/80 font-semibold">skipittools@gmail.com</span>
          </div>
        </footer>
      </div>
    </main>
  );
}


