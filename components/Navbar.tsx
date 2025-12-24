"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/lib/useUser";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const { user, loading } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="w-full px-8 py-4 flex items-center justify-between border-b border-white/10">
      <div className="flex items-center">
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

      <div className="flex gap-6 text-sm text-white/80 items-center">
        <Link href="/tools" className="hover:text-white">
          Tools
        </Link>
        <Link href="/pricing" className="hover:text-white">
          Subscription
        </Link>

        {!loading && user && (
          <Link href="/account" className="hover:text-white">
            Account
          </Link>
        )}

        {!loading && !user && (
          <Link href="/login" className="hover:text-white">
            Login
          </Link>
        )}

        {!loading && user && (
          <>
            <span className="text-white/60 text-xs">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
