"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import Button from "./Button";

type SectionHeaderProps = {
  title: string;
  text?: string;
  cta?: string;
  href?: string;
  ctaVariant?: "primary" | "accent" | "light";
  // Emphasised CTA: a full pill button on mobile too (instead of the quiet
  // arrow link) and a glow on desktop. Used for the main "View All Shops".
  highlightCta?: boolean;
};

// Section header row. Desktop: title + intro left, pill CTA bottom-right.
// Mobile: the CTA renders as a compact inline arrow link under the intro
// instead — no full-width pill duplicated below the content.
export default function SectionHeader({
  title,
  text,
  cta,
  href,
  ctaVariant = "primary",
  highlightCta = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mb-6 flex flex-wrap items-end justify-between gap-6 md:mb-7"
    >
      <div className="max-w-2xl">
        <motion.h2
          variants={fadeUp}
          className="font-display text-[26px] uppercase leading-[0.95] tracking-wide text-ink md:text-[40px] md:leading-[0.9]"
        >
          {title}
        </motion.h2>
        {text && (
          <motion.p
            variants={fadeUp}
            className="mt-3 text-base leading-relaxed text-ink/70 md:mt-4 md:text-lg"
          >
            {text}
          </motion.p>
        )}
        {cta && href && (
          <motion.div variants={fadeUp} className="md:hidden">
            {highlightCta ? (
              <div className="mt-5">
                <Button
                  href={href}
                  variant={ctaVariant}
                  className="shadow-lg shadow-primary/30"
                >
                  {cta}
                </Button>
              </div>
            ) : (
              <Link
                href={href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-primary"
              >
                {cta}
                <span aria-hidden>→</span>
              </Link>
            )}
          </motion.div>
        )}
      </div>
      {cta && href && (
        <motion.div variants={fadeUp} className="hidden md:block">
          <Button
            href={href}
            variant={ctaVariant}
            className={highlightCta ? "shadow-lg shadow-primary/35 ring-2 ring-primary/25 ring-offset-2" : ""}
          >
            {cta}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
