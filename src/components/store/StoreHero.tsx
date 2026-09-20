"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Store } from "@/data/stores";
import { EASE } from "@/lib/motion";

const SECTION_LABEL: Record<Store["section"], string> = {
  shop: "Shop",
  dine: "Dine",
  entertain: "Entertain",
};

function formatHour(h: number) {
  const hh = h % 24;
  const suffix = hh >= 12 ? "PM" : "AM";
  return `${hh % 12 === 0 ? 12 : hh % 12}:00 ${suffix}`;
}

// Live status, sized to sit inline with the floor chip.
function StatusChip({ store }: { store: Store }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      const h = new Date().getHours();
      setOpen(h >= store.opensAt && h < store.closesAt);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, [store.opensAt, store.closesAt]);

  if (open === null) return null;

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
      <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-emerald-400" : "bg-accent"}`} />
      {open ? `Open until ${formatHour(store.closesAt)}` : `Opens ${formatHour(store.opensAt)}`}
    </span>
  );
}

const EscalatorIcon = (
  <svg width="15" height="15" viewBox="0 0 32 32" fill="none" aria-hidden>
    <path d="M3.5 25.5h4.6L21.4 9.6h7.1" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="15.4" cy="6.6" r="2.6" fill="currentColor" />
    <path d="M15.4 10.6v6.2" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
  </svg>
);

// The header artwork: a portrait cut on phones, and a wide band turned on its
// side for desktop. Only one is downloaded. Both are softened behind the
// words and the logo, with the pattern left crisp in between. Each store has
// its own cut (see heroArt in data/stores.ts).
function HeroBackground({ art }: { art: string }) {
  const common = { alt: "", sizes: "100vw", priority: true };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: `/images/store-hero/${art}-desktop.webp`, width: 1472, height: 491 });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: `/images/store-hero/${art}-mobile.webp`, width: 736, height: 866 });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <img
        {...rest}
        srcSet={mobile}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  );
}

// Store header. The brand's mark is deliberately small and set to one side:
// the name, the line the brand is known for, and where to find it carry the
// header instead, over the house background artwork.
export default function StoreHero({ store }: { store: Store }) {
  const cardBg = store.knockout ? "#232130" : store.bg ?? "#ffffff";

  return (
    <section className="relative overflow-hidden bg-ink pb-11 pt-24 md:pb-14 md:pt-32">
      <HeroBackground art={store.heroArt} />

      <div className="relative px-4 md:px-[60px]">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          aria-label="Breadcrumb"
          className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40"
        >
          <Link href={`/${store.section}`} className="transition-colors hover:text-white">
            {SECTION_LABEL[store.section]}
          </Link>
          <span className="mx-2 text-white/20">/</span>
          <span className="text-white/70">{store.name}</span>
        </motion.nav>

        <div className="mt-7 flex flex-col gap-7 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-14">
          {/* Name and line */}
          <div className="order-2 md:order-1 md:max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/50"
            >
              {store.category}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.16 }}
              className="mt-3 font-display text-[34px] uppercase leading-[0.95] tracking-[0.04em] text-white md:text-[58px]"
            >
              {store.name}
            </motion.h1>

            {store.tagline && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.26 }}
                className="mt-4 font-display text-[17px] uppercase leading-snug tracking-[0.1em] text-white/55 md:text-xl"
              >
                {store.tagline}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="mt-6 flex flex-wrap items-center gap-2.5"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
                <span className="text-white/60">{EscalatorIcon}</span>
                {store.floorName}
              </span>
              <StatusChip store={store} />
            </motion.div>
          </div>

          {/* The mark, small and to one side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="order-1 w-[150px] shrink-0 md:order-2 md:w-[210px]"
          >
            <div
              className="relative aspect-[3/2] overflow-hidden rounded-xl ring-1 ring-white/15 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.8)]"
              style={{ backgroundColor: cardBg }}
            >
              <Image
                src={store.logo}
                alt={store.name}
                fill
                priority
                sizes="210px"
                className={`object-contain ${store.bg ? "p-0" : "p-5 md:p-6"}`}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
