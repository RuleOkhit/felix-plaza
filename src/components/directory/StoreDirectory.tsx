"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { CategoryFilter, DirectoryStore } from "@/data/store-directory";
import { EASE } from "@/lib/motion";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import FilterChips, { type ChipOption } from "./FilterChips";

// Every store in the directory has a page, so every tile links through.
function StoreCard({ store, section }: { store: DirectoryStore; section: string }) {
  return (
    <Link href={`/${section}/${store.slug}`} className="group block">
      <div
        className={`relative aspect-square overflow-hidden rounded-xl border transition-all duration-500 ease-in-out group-hover:shadow-[0_14px_34px_-14px_rgba(23,22,31,0.35)] ${
          store.knockout || store.bg
            ? "border-ink/15 group-hover:border-ink/40"
            : "border-ink/10 bg-white group-hover:border-primary/40"
        }`}
        style={
          store.knockout || store.bg
            ? { backgroundColor: store.knockout ? "#17161f" : store.bg }
            : undefined
        }
      >
        <Image
          src={store.logo}
          alt={store.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className={`object-contain transition-transform duration-500 ease-in-out group-hover:scale-105 ${
            store.bg ? "p-0" : "p-5 md:p-8"
          }`}
        />
      </div>
      <h3 className="mt-2.5 flex items-center gap-1.5 text-sm font-semibold leading-snug text-ink md:mt-3.5 md:text-[15px]">
        <span className="transition-colors duration-300 group-hover:text-primary">
          {store.name}
        </span>
        <span
          aria-hidden
          className="text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
        >
          &rarr;
        </span>
      </h3>
    </Link>
  );
}

// Shared template for the Shop and Dine directories: hero, a sticky
// category bar, and a grid of logo tiles. Logos are contained (never
// cropped) on a light tile so marks of any proportion sit consistently.
export default function StoreDirectory({
  title,
  eyebrow,
  heroImage,
  heroFocus,
  intro,
  stores,
  filters,
  noun,
  allLabel,
  section,
}: {
  title: string;
  eyebrow: string;
  heroImage: string;
  heroFocus?: string;
  intro: string;
  stores: DirectoryStore[];
  filters: CategoryFilter[];
  noun: string;
  allLabel: string;
  section: string;
}) {
  const [active, setActive] = useState("all");

  // Only offer a category that actually has stores behind it.
  const options: ChipOption[] = useMemo(() => {
    const present = new Set(stores.map((s) => s.cat));
    return [
      { key: "all", label: "All", icon: "" },
      ...filters.filter((f) => present.has(f.key)),
    ];
  }, [stores, filters]);

  const visible = useMemo(
    () => (active === "all" ? stores : stores.filter((s) => s.cat === active)),
    [stores, active],
  );

  const activeLabel = options.find((o) => o.key === active)?.label ?? "All";

  return (
    <>
      <PageHero title={title} image={heroImage} eyebrow={eyebrow} focus={heroFocus} />

      <section className="pb-[50px] pt-[36px] md:pb-[70px] md:pt-[50px]">
        <div className="px-4 md:px-[60px]">
          <Reveal>
            <p className="max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
              {intro}
            </p>
          </Reveal>
        </div>

        {/* Sticky category bar. Frosted glass rather than flat translucency:
            a blurred, slightly saturated ground, a bright inner top edge and
            a soft falling sheen, so it reads as a pane of glass over the
            grid instead of a washed-out strip. */}
        <div className="sticky top-16 z-30 mt-6 border-y border-ink/8 bg-white/60 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_30px_-24px_rgba(23,22,31,0.55)] backdrop-blur-xl backdrop-saturate-150 md:top-[72px] md:mt-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/10 to-transparent"
          />
          <div className="relative px-4 md:px-[60px]">
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/55">
                {active === "all" ? allLabel : activeLabel}
              </p>
              {active !== "all" && (
                <button
                  onClick={() => setActive("all")}
                  className="text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-ink"
                >
                  Clear
                </button>
              )}
            </div>
            <FilterChips
              options={options}
              active={active}
              onSelect={setActive}
              idPrefix={noun}
            />
          </div>
        </div>

        {/* Grid — re-keyed per filter so the new set cascades in. The
            stagger is capped so a 77-item list does not crawl. */}
        <div className="px-4 md:px-[60px]">
          <motion.div
            key={active}
            initial="hidden"
            animate="visible"
            className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:mt-10 md:gap-x-6 md:gap-y-9 lg:grid-cols-4 xl:grid-cols-5"
          >
            {visible.map((store, i) => (
              <motion.div
                key={store.slug}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  duration: 0.4,
                  ease: EASE,
                  delay: Math.min(i, 15) * 0.03,
                }}
              >
                <StoreCard store={store} section={section} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
