"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ENTERTAINMENT, SECTION_INTROS } from "@/data/home";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import SectionHeader from "@/components/ui/SectionHeader";

// Entertainment cards. Desktop: three-column grid. Mobile: a horizontal
// snap carousel with the next card peeking in — one swipe per venue
// instead of ~2 screens of stacked cards.
export default function EntertainGrid() {
  const intro = SECTION_INTROS.entertain;
  return (
    <section className="py-[44px] md:py-[70px]">
      <div className="px-4 md:px-[60px]">
        <SectionHeader
          title={intro.title}
          text={intro.text}
          cta={intro.cta}
          href={intro.href}
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
        >
          {ENTERTAINMENT.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeUp}
              className={`w-[78%] shrink-0 snap-center sm:w-[52%] md:w-auto md:shrink ${
                item.mobileOnly ? "md:hidden" : ""
              }`}
            >
              <Link href={item.href} className="group block">
                {/* Logo tile — contained so each mark keeps its proportions.
                    Where the artwork ships on a solid ground the tile is
                    painted to match, so it fills edge to edge rather than
                    floating in white. */}
                <div
                  className="relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-ink/10 transition-all duration-500 ease-in-out group-hover:shadow-[0_14px_34px_-14px_rgba(23,22,31,0.3)]"
                  style={{ backgroundColor: item.bg ?? "#ffffff" }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 78vw, 33vw"
                    className="object-contain p-8 transition-transform duration-500 ease-in-out group-hover:scale-105 md:p-12"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-primary md:text-[21px]">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60 md:mt-2 md:text-base">
                  {item.blurb}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
