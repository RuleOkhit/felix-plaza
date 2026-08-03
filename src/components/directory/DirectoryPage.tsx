"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { DirectorySection } from "@/data/directory";
import { EASE, fadeUp, stagger, viewportOnce } from "@/lib/motion";
import CardCarousel from "@/components/home/CardCarousel";
import Reveal from "@/components/ui/Reveal";

// Shared inner-page template mirroring the reference directory pages:
// short hero banner → featured carousel → category filter pills →
// responsive card grid (2-col mobile / 3-col desktop) with A–Z sorting.
export default function DirectoryPage({ section }: { section: DirectorySection }) {
  const [category, setCategory] = useState("All");
  const [sortAZ, setSortAZ] = useState(true);

  const visible = useMemo(() => {
    const filtered =
      category === "All"
        ? section.items
        : section.items.filter((i) => i.category === category);
    return [...filtered].sort((a, b) =>
      sortAZ ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
  }, [section.items, category, sortAZ]);

  return (
    <>
      {/* Short hero banner */}
      <section className="relative flex h-[46vh] min-h-[320px] items-center justify-center overflow-hidden">
        <Image
          src={section.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-transparent" />
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="relative z-10 font-display text-[52px] uppercase tracking-[0.08em] text-white md:text-[82px]"
        >
          {section.heroTitle}
        </motion.h1>
      </section>

      {/* Featured carousel (optional per section) */}
      {section.featured && (
        <section className="pt-[50px] md:pt-[70px]">
          <div className="px-4 md:px-[60px]">
            <Reveal>
              <h2 className="mb-7 font-display text-[24px] uppercase text-ink md:text-[32px]">
                Featured
              </h2>
            </Reveal>
            <CardCarousel items={section.featured} id={`${section.slug}-featured`} />
          </div>
        </section>
      )}

      {/* Directory grid */}
      <section className="py-[50px] md:py-[70px]">
        <div className="px-4 md:px-[60px]">
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-ink/70">
              {section.intro}
            </p>
          </Reveal>

          {/* Filters row */}
          <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {section.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full border-2 px-5 py-1.5 text-sm font-semibold transition-all duration-300 ${
                    category === cat
                      ? "border-primary bg-primary text-white"
                      : "border-ink/15 bg-white text-ink hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button
              onClick={() => setSortAZ((v) => !v)}
              className="text-sm font-semibold uppercase tracking-wider text-ink/60 transition-colors hover:text-primary"
            >
              Sort: {sortAZ ? "A–Z" : "Z–A"}
            </button>
          </Reveal>

          {/* Cards — keyed by filter state so the grid re-reveals with a
              stagger each time the selection changes */}
          <motion.div
            key={`${category}-${sortAZ}`}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3"
          >
            {visible.map((item) => (
              <motion.div
                key={item.name}
                variants={fadeUp}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <Link href={item.href} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-xl border border-ink/10 bg-white transition-all duration-500 ease-in-out group-hover:border-primary/40 group-hover:shadow-[0_14px_34px_-14px_rgba(23,22,31,0.3)]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-contain p-8 transition-transform duration-500 ease-in-out group-hover:scale-105 md:p-10"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-primary">
                    {item.name}
                  </h3>
                  <p className="text-sm uppercase tracking-wider text-ink/50">
                    {item.category}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {visible.length === 0 && (
            <p className="mt-10 text-center text-ink/50">
              No placeholder items in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
