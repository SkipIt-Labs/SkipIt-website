"use client";

import { useId, useMemo, useRef, useState } from "react";

export type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={[
        "w-8 h-8 rounded-full border border-white/10",
        "grid place-items-center text-white/60 bg-white/5",
        "transition-transform duration-300 ease-in-out",
        open ? "rotate-180 border-cyan-300/25 text-white/85" : "",
      ].join(" ")}
    >
      ⌄
    </span>
  );
}

export default function LegalAccordion({
  items,
  defaultOpenId,
}: {
  items: AccordionItem[];
  defaultOpenId?: string;
}) {
  const baseId = useId();
  const initialOpen = useMemo(() => defaultOpenId ?? items[0]?.id, [defaultOpenId, items]);
  const [openId, setOpenId] = useState<string | null>(initialOpen ?? null);

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <AccordionRow
          key={item.id}
          baseId={baseId}
          item={item}
          open={openId === item.id}
          onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
        />
      ))}
    </div>
  );
}

function AccordionRow({
  baseId,
  item,
  open,
  onToggle,
}: {
  baseId: string;
  item: AccordionItem;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `${baseId}-${item.id}-panel`;
  const buttonId = `${baseId}-${item.id}-button`;
  const contentRef = useRef<HTMLDivElement | null>(null);
  const maxHeight = open ? contentRef.current?.scrollHeight ?? 0 : 0;

  return (
    <div
      className={[
        "glass neon-ring rounded-2xl border border-white/10 overflow-hidden",
        open ? "bg-white/10 border-white/20" : "",
      ].join(" ")}
    >
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={[
          "w-full text-left px-5 py-4 flex items-center justify-between gap-4",
          "select-none outline-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/30 focus-visible:ring-inset",
        ].join(" ")}
      >
        <span className="flex items-center gap-3 min-w-0">
          <span
            aria-hidden="true"
            className="w-2.5 h-2.5 rounded-full bg-white/80 shadow-[0_0_14px_rgba(0,229,255,0.30),0_0_22px_rgba(74,125,255,0.22)] flex-none"
          />
          <span className="font-semibold text-white/90 text-sm md:text-base truncate">
            {item.title}
          </span>
        </span>
        <Chevron open={open} />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="px-5 overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{
          maxHeight,
        }}
      >
        <div
          ref={contentRef}
          className={[
            "pb-5 text-sm text-white/70",
            "transition-all duration-300 ease-in-out",
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
          ].join(" ")}
        >
          {item.content}
        </div>
      </div>
    </div>
  );
}


