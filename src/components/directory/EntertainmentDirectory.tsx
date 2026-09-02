"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ENTERTAINMENT_STORES } from "@/data/store-directory";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { BANNER } from "@/data/site";

// Only four venues, so filtering would be pointless furniture and a dense
// tile grid would undersell them. Each venue gets a generous panel whose
// ground is painted in the logo's OWN background colour — sampled from the
// artwork — so marks that ship on a solid field (FunCity's purple, Game X's
// black) fill the panel edge to edge instead of floating in a white box.
// The name sits plainly underneath: no pill, no card, just type.
export default function EntertainmentDirectory() {
  return (
    <>
      <PageHero
        title="Entertain"
        image={BANNER.entertain.src}
        focus={BANNER.entertain.focus}
        eyebrow="What's On"
      />

      <section className="py-[40px] md:py-[80px]">
        <div className="px-4 md:px-[60px]">
          <Reveal>
            <p className="max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
              A cinema that fills up on opening weekend, play zones for the
              younger ones, and an arcade that keeps going after the shops
              have pulled their shutters down.
            </p>
          </Reveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mx-auto mt-12 grid max-w-5xl gap-x-10 gap-y-14 sm:grid-cols-2 md:mt-16 md:gap-x-14 md:gap-y-20"
          >
            {ENTERTAINMENT_STORES.map((venue) => (
              <motion.article key={venue.slug} variants={fadeUp}>
                <Link href={`/entertain/${venue.slug}`} className="group block">
                <div
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-ink/10 transition-all duration-500 ease-in-out group-hover:-translate-y-1 group-hover:shadow-[0_26px_50px_-24px_rgba(23,22,31,0.4)]"
                  style={{ backgroundColor: venue.bg ?? "#ffffff" }}
                >
                  <Image
                    src={venue.logo}
                    alt={venue.name}
                    fill
                    sizes="(max-width: 640px) 92vw, 42vw"
                    className="object-contain p-9 transition-transform duration-500 ease-in-out group-hover:scale-[1.04] md:p-14"
                  />
                </div>
                  <h2 className="mt-6 text-center font-display text-xl uppercase tracking-[0.14em] text-ink transition-colors duration-300 group-hover:text-primary md:mt-7 md:text-2xl">
                    {venue.name}
                  </h2>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
