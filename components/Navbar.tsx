"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/lib/useUser";

export default function Navbar() {
  const { user, loading } = useUser();

  return (
    <nav className="w-full px-6 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center glass neon-ring rounded-2xl px-4 py-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/skipit-icon.png"
            alt="SkipIt"
            width={212}
            height={212}
            className="object-contain"
          />
        </Link>
      </div>

      <div className="glass neon-ring rounded-2xl px-2 py-2 flex items-center gap-1 text-sm">
        <Link
          href="/tools"
          className="px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition"
        >
          Tools
        </Link>
        <Link
          href="/pricing"
          className="px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition"
        >
          Subscription
        </Link>
        <Link
          href="/contact"
          className="px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition"
        >
          Contact
        </Link>

        {!loading && user && (
          <Link
            href="/account"
            className="px-4 py-2 rounded-xl btn-primary font-semibold transition"
          >
            Account
          </Link>
        )}

        {!loading && !user && (
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl btn-primary font-semibold transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
