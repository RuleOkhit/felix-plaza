"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Store } from "@/data/stores";
import { EASE } from "@/lib/motion";

// Store banner. Two deliberate differences from the generic page hero:
//  1. A heavier scrim — tenant banners are busy product collages, so the
//     name needs more darkness under it than a photo hero does.
//  2. The name sits in the upper third rather than dead centre, clear of
//     the artwork that usually fills the middle of a brand banner.
// The line above the name is the category only — location lives in the
// info card, where the floor badge is.
export default function StoreHero({ store }: { store: Store }) {
  return (
    <section className="relative flex h-[42vh] min-h-[300px] items-start justify-center overflow-hidden md:h-[54vh] md:min-h-[400px]">
      <Image
        src={store.banner}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Layered scrim, kept light enough that the banner artwork still
          reads: a soft tint, a gradient weighted to the top where the
          title sits, and a gentle vignette behind the name itself. */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_33%,rgba(0,0,0,0.34),transparent_72%)]" />

      <div className="relative z-10 px-4 pt-[16vh] text-center md:pt-[19vh]">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/75 md:text-xs"
        >
          {store.category}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-3 font-display text-[40px] uppercase leading-none tracking-[0.08em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.6)] md:text-[76px]"
        >
          {store.name}
        </motion.h1>
      </div>
    </section>
  );
}
