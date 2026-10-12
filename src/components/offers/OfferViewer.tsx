"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { OfferView } from "@/data/offers";
import { getLenis } from "@/components/layout/SmoothScroll";
import { EASE } from "@/lib/motion";

// An offer opened large: the poster with the deal beside it on desktop, or
// stacked on phones. On a phone everything fits one screen without
// scrolling: the poster takes whatever height the details leave it.
// Arrows, arrow keys or a swipe on the poster move between offers; Escape,
// the cross or a tap outside closes it.
export default function OfferViewer({
  offers,
  index,
  onIndex,
  onClose,
  storeLink = true,
}: {
  offers: OfferView[];
  index: number | null;
  onIndex: (i: number) => void;
  onClose: () => void;
  /** Off on the store's own page, where it would lead back to itself */
  storeLink?: boolean;
}) {
  const reduced = useReducedMotion();
  const [dir, setDir] = useState(1);
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const many = offers.length > 1;

  const step = useCallback(
    (d: number) => {
      if (index === null || !many) return;
      setDir(d);
      onIndex((index + d + offers.length) % offers.length);
    },
    [index, many, offers.length, onIndex],
  );

  // Hold the page still underneath while the viewer is open.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    // Focus whichever close button this layout shows.
    const closes = dialogRef.current?.querySelectorAll<HTMLButtonElement>('button[aria-label="Close"]');
    [...(closes ?? [])].find((b) => b.offsetParent !== null)?.focus();
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = overflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, step]);

  const offer = index === null ? null : offers[index];
  const ratio = offer ? offer.poster.width / offer.poster.height : 1;
  const stop = (e: React.MouseEvent) => e.stopPropagation();
  const meta = offer ? [offer.store.floor, offer.ends, offer.terms].filter(Boolean).join(" · ") : "";

  const storeLinkEl =
    offer && storeLink && offer.store.href ? (
      <Link
        href={offer.store.href}
        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:text-white/70"
      >
        Visit the store
        <span aria-hidden>→</span>
      </Link>
    ) : null;

  return (
    <AnimatePresence>
      {offer && (
        <motion.div
          key="viewer"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${offer.store.name} offer`}
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] bg-ink/95 backdrop-blur-sm"
        >
          <div className="flex h-full flex-col px-4 pb-2 pt-2 md:flex-row md:items-center md:justify-center md:gap-14 md:px-28 md:py-16">
            {/* Phones: the count and the close button along the top */}
            <div onClick={stop} className="flex h-11 shrink-0 items-center justify-between md:hidden">
              <span className="text-xs font-bold tracking-[0.2em] text-white/50">
                {many ? `${index! + 1} / ${offers.length}` : ""}
              </span>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="-mr-1 grid h-11 w-11 place-items-center text-4xl leading-none text-white/70 transition-colors hover:text-white"
              >
                &times;
              </button>
            </div>

            {/* The poster, as large as the space allows */}
            <div
              className="flex min-h-0 flex-1 items-center justify-center [container-type:size] md:aspect-[var(--r)] md:h-[min(82svh,calc((100vw_-_560px)/var(--r)))] md:flex-none"
              style={{ "--r": ratio } as CSSProperties}
            >
              <motion.div
                key={offer.slug}
                onClick={stop}
                initial={reduced ? false : { opacity: 0, x: dir * 36 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                drag={many ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.35}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) step(1);
                  else if (info.offset.x > 60) step(-1);
                }}
                className={`relative overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] ${many ? "cursor-grab active:cursor-grabbing" : ""}`}
                style={{ aspectRatio: ratio, width: `min(100cqw, 100cqh * ${ratio})` }}
              >
                <Image
                  src={offer.poster.src}
                  alt={`${offer.store.name}: ${offer.title} ${offer.detail}`}
                  fill
                  sizes="(max-width: 768px) 92vw, 50vw"
                  draggable={false}
                  className="pointer-events-none object-cover"
                />
              </motion.div>
            </div>

            {/* The deal */}
            <motion.div
              key={`${offer.slug}-text`}
              onClick={stop}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.08 }}
              className="shrink-0 pt-4 text-white md:w-full md:max-w-md md:pt-0"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
                {offer.store.name}
              </p>
              {offer.tagline && <p className="mt-3 hidden text-white/70 md:block">{offer.tagline}</p>}
              <h2 className="mt-1.5 font-display text-[28px] uppercase leading-[0.95] md:mt-2 md:text-[52px]">
                {offer.title}
              </h2>
              <p className="mt-1.5 leading-snug text-white/85 md:mt-3 md:text-xl">{offer.detail}</p>
              {meta && <p className="mt-1.5 text-sm text-white/50 md:mt-4">{meta}</p>}
              {storeLinkEl && <div className="mt-7 hidden md:block">{storeLinkEl}</div>}
            </motion.div>

            {/* Phones: arrows either side of the way to the store */}
            <div onClick={stop} className="mt-2 flex h-12 shrink-0 items-center justify-between md:hidden">
              {many ? <Arrow label="Previous offer" onClick={() => step(-1)} flip /> : <span className="w-11" />}
              {storeLinkEl}
              {many ? <Arrow label="Next offer" onClick={() => step(1)} /> : <span className="w-11" />}
            </div>
          </div>

          {/* Desktop: close at the top right, arrows at the sides, count below */}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="fixed right-8 top-6 hidden text-4xl leading-none text-white/70 transition-colors hover:text-white md:block"
          >
            &times;
          </button>
          {many && (
            <div className="pointer-events-none fixed inset-0 hidden items-center justify-between px-6 md:flex">
              <Arrow label="Previous offer" onClick={() => step(-1)} flip />
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.2em] text-white/50">
                {index! + 1} / {offers.length}
              </span>
              <Arrow label="Next offer" onClick={() => step(1)} />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Arrow({ label, onClick, flip }: { label: string; onClick: () => void; flip?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="pointer-events-auto grid h-11 w-11 place-items-center text-white/70 transition-colors hover:text-white"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={flip ? "rotate-180" : undefined}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
