"use client";

import { useMemo, useRef } from "react";
import { motion } from "framer-motion";

type SpotlightCardProps = {
  title: string;
  eyebrow?: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export default function SpotlightCard({
  title,
  eyebrow,
  description,
  icon,
  className,
  children,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const base =
    "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md " +
    "transition-colors duration-200 hover:border-cyan-300/40";

  const glow = useMemo(
    () =>
      "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100",
    []
  );

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--sx", `${x}px`);
    el.style.setProperty("--sy", `${y}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${base} ${className ?? ""}`}
      style={
        {
          // used by the spotlight overlay below
          "--sx": "50%",
          "--sy": "50%",
        } as React.CSSProperties
      }
    >
      {/* spotlight */}
      <div
        className={glow}
        style={{
          background:
            "radial-gradient(420px circle at var(--sx) var(--sy), rgba(0,229,255,0.18), rgba(74,125,255,0.10) 35%, transparent 62%)",
        }}
      />

      {/* subtle noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            {eyebrow && (
              <p className="text-[11px] tracking-[0.24em] uppercase text-white/45 mb-2">
                {eyebrow}
              </p>
            )}
            <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight">
              {title}
            </h3>
          </div>
          {icon && (
            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/30 p-3 text-cyan-200/90">
              {icon}
            </div>
          )}
        </div>

        <p className="mt-3 text-sm md:text-[15px] text-white/70 leading-relaxed max-w-prose">
          {description}
        </p>

        {children && <div className="mt-5">{children}</div>}
      </div>
    </motion.div>
  );
}


