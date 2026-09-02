"use client";

import { motion } from "framer-motion";
import type { CategoryFilter } from "@/data/store-directory";

export type ChipOption = CategoryFilter;

// Category selector. With sixteen options on the shop page the row has to
// stay legible, so each chip carries its category's line icon, the active
// state is a single pill that slides between chips (shared layoutId)
// rather than a hard colour swap, and on phones the row becomes one
// swipeable snap track instead of wrapping into four stacked lines.
export default function FilterChips({
  options,
  active,
  onSelect,
  idPrefix,
}: {
  options: ChipOption[];
  active: string;
  onSelect: (key: string) => void;
  idPrefix: string;
}) {
  return (
    <div
      role="group"
      aria-label="Filter by category"
      className="scrollbar-none -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0"
    >
      {options.map((opt) => {
        const on = active === opt.key;
        return (
          <button
            key={opt.key}
            onClick={() => onSelect(opt.key)}
            aria-pressed={on}
            className={`group relative flex shrink-0 snap-start items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
              on ? "text-white" : "text-ink/70 hover:text-primary"
            }`}
          >
            {/* Sliding active pill */}
            {on && (
              <motion.span
                layoutId={`${idPrefix}-chip`}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute inset-0 -z-10 rounded-full bg-primary"
              />
            )}
            {/* Resting outline */}
            {!on && (
              <span className="absolute inset-0 -z-10 rounded-full border-2 border-ink/12 bg-white/70 transition-colors duration-300 group-hover:border-primary/45" />
            )}

            {opt.icon && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="shrink-0 opacity-80"
                dangerouslySetInnerHTML={{ __html: opt.icon }}
              />
            )}
            <span className="whitespace-nowrap">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
