"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ARCHIVE_EVENTS, ARCHIVE_LABEL } from "@/data/events";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import Reveal from "@/components/ui/Reveal";

// Current-year archive in an editorial "lead story + supporting" layout:
// one wide overlay card for the most recent event, then a row of compact
// cards for the rest.
export default function EventArchive() {
  const [lead, ...rest] = ARCHIVE_EVENTS;

  return (
    <section className="py-[50px] md:py-[70px]">
      <div className="px-4 md:px-[60px]">
        {/* Header */}
        <Reveal className="mb-9">
          <div className="flex items-center gap-5">
            <h2 className="font-display text-[28px] uppercase leading-[0.9] tracking-wide text-ink md:text-[40px]">
              {ARCHIVE_LABEL}
            </h2>
            <span className="rounded-full bg-surface px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink/60">
              {ARCHIVE_EVENTS.length} events
            </span>
            <span className="hidden h-px flex-1 bg-ink/10 md:block" />
          </div>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">
            Placeholder intro for this year's happenings so far — a sentence
            inviting visitors to look back at recent moments.
          </p>
        </Reveal>

        {/* Lead story */}
        <Reveal>
          <a href={lead.href} className="group relative block overflow-hidden rounded-2xl">
            <div className="relative aspect-[16/10] md:aspect-[21/9]">
              <Image
                src={lead.image}
                alt={lead.name}
                fill
                sizes="(max-width: 768px) 100vw, 92vw"
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-ink backdrop-blur-sm md:left-8 md:top-8">
                {lead.date}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <h3 className="font-display text-[30px] uppercase leading-none text-white md:text-[46px]">
                  {lead.name}
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-white/75">
                  {lead.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
                  View recap
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>
            </div>
          </a>
        </Reveal>

        {/* Supporting stories */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {rest.map((ev) => (
            <motion.div key={ev.name} variants={fadeUp}>
              <a href={ev.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink backdrop-blur-sm">
                    {ev.date}
                  </span>
                  <Image
                    src={ev.image}
                    alt={ev.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                </div>
                <h4 className="mt-4 text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-primary">
                  {ev.name}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">{ev.blurb}</p>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
