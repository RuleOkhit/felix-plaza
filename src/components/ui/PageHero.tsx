"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

// Short inner-page hero: image + gradient scrim + big centered display
// title, with an optional small uppercase eyebrow above it. Mirrors the
// directory-page banner so every inner page opens with the same rhythm.
export default function PageHero({
  title,
  image,
  eyebrow,
}: {
  title: string;
  image: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative flex h-[46vh] min-h-[320px] items-center justify-center overflow-hidden">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-transparent" />
      <div className="relative z-10 px-4 text-center">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/80"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="font-display text-[44px] uppercase leading-none tracking-[0.08em] text-white md:text-[82px]"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}
