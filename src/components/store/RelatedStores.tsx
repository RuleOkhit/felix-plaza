"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { relatedStores, storeHref, type Store } from "@/data/stores";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import Reveal from "@/components/ui/Reveal";

const LIMIT = 8;

/** A shuffle that repeats for the same seed. */
function shuffled<T>(items: T[], seed: number) {
  let s = Math.floor(seed * 2147483646) + 1;
  const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// A fresh seed for each visit in the browser. The built page uses one taken
// from the store's name, so it is already in a mixed order before scripts run.
const visitSeed = typeof window === "undefined" ? 0 : Math.random();
const noop = () => () => {};

// Foot of a store page: the neighbours worth walking to next. Same logo
// tile treatment as the directory grid, so the two read as one system.
// Stores from the same category come first, then others from the section,
// each group in a new random order on every visit.
// Scrolls as a snap row on phones, sits as a grid from tablet up.
export default function RelatedStores({ store }: { store: Store }) {
  const seed = useSyncExternalStore(
    noop,
    () => visitSeed,
    () => null,
  );
  const { related, allSameCategory } = useMemo(() => {
    const base = seed ?? [...store.slug].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 1000, 7) / 1000;
    const { sameCategory, rest } = relatedStores(store);
    const list = [...shuffled(sameCategory, base), ...shuffled(rest, (base * 7.3) % 1)].slice(0, LIMIT);
    return { related: list, allSameCategory: list.every((s) => s.category === store.category) };
  }, [seed, store]);
  if (!related.length) return null;

  return (
    <section className="bg-surface py-[44px] md:py-[70px]">
      <div className="px-4 md:px-[60px]">
        <Reveal className="mb-7 flex flex-wrap items-baseline justify-between gap-4 md:mb-9">
          <h2 className="font-display text-[24px] uppercase leading-none tracking-wide text-ink md:text-[32px]">
            {allSameCategory ? `More in ${store.category}` : "More to explore"}
          </h2>
          <Link
            href={`/${store.section}`}
            className="text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-ink"
          >
            Explore all
          </Link>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="scrollbar-none -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 xl:grid-cols-5"
        >
          {related.map((s) => (
            <motion.div
              key={s.slug}
              variants={fadeUp}
              className="w-[42%] shrink-0 snap-start sm:w-auto sm:shrink"
            >
              <Link href={storeHref(s)} className="group block">
                <div
                  className={`relative aspect-square overflow-hidden rounded-xl border transition-all duration-500 ease-in-out group-hover:shadow-[0_14px_34px_-14px_rgba(23,22,31,0.3)] ${
                    s.knockout || s.bg
                      ? "border-ink/15 group-hover:border-ink/40"
                      : "border-ink/10 bg-white group-hover:border-primary/40"
                  }`}
                  style={
                    s.knockout || s.bg
                      ? { backgroundColor: s.knockout ? "#17161f" : s.bg }
                      : undefined
                  }
                >
                  <Image
                    src={s.logo}
                    alt={s.name}
                    fill
                    sizes="(max-width: 640px) 42vw, (max-width: 1024px) 33vw, 20vw"
                    className={`object-contain transition-transform duration-500 ease-in-out group-hover:scale-105 ${
                    s.bg ? "p-0" : "p-5 md:p-8"
                  }`}
                  />
                </div>
                <h3 className="mt-2.5 text-sm font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-primary md:mt-3.5 md:text-[15px]">
                  {s.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
