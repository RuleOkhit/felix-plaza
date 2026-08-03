"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import Button from "./Button";

type SectionHeaderProps = {
  title: string;
  text?: string;
  cta?: string;
  href?: string;
  ctaVariant?: "primary" | "accent" | "light";
};

// Section header row: title + intro left, CTA button bottom-right (desktop
// only — the CTA is repeated below the content on mobile, as on the
// reference layout).
export default function SectionHeader({
  title,
  text,
  cta,
  href,
  ctaVariant = "primary",
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mb-7 flex flex-wrap items-end justify-between gap-6"
    >
      <div className="max-w-2xl">
        <motion.h2
          variants={fadeUp}
          className="font-display text-[28px] uppercase leading-[0.9] tracking-wide text-ink md:text-[40px]"
        >
          {title}
        </motion.h2>
        {text && (
          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg leading-relaxed text-ink/70"
          >
            {text}
          </motion.p>
        )}
      </div>
      {cta && href && (
        <motion.div variants={fadeUp} className="hidden md:block">
          <Button href={href} variant={ctaVariant}>
            {cta}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
