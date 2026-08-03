"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";

// Full-screen search overlay (fades + slides in, focuses the input, closes
// on Escape) — mirrors the reference site's header search behaviour.
export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-ink/95 px-4 pt-[22vh]"
        >
          <button
            aria-label="Close search"
            onClick={onClose}
            className="absolute right-8 top-8 text-4xl leading-none text-white/80 transition-colors hover:text-white"
          >
            &times;
          </button>
          <motion.div
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="w-full max-w-3xl"
          >
            <label className="mb-4 block text-sm uppercase tracking-[0.25em] text-white/60">
              Search the destination
            </label>
            <div className="flex items-center gap-4 border-b-2 border-white/40 pb-4 focus-within:border-white">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.8-3.8" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                placeholder="Search shops, dining, events…"
                className="w-full bg-transparent font-display text-2xl text-white placeholder:text-white/40 focus:outline-none md:text-4xl"
              />
            </div>
            <p className="mt-6 text-sm text-white/50">
              Placeholder search — wire this input to your own search endpoint.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
