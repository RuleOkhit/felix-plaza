"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CATEGORY_LABELS,
  DINE_STORES,
  ENTERTAINMENT_STORES,
  FLOOR_LABELS,
  SHOP_STORES,
  type DirectoryStore,
} from "@/data/store-directory";
import { onSite } from "@/data/parked";
import { EASE } from "@/lib/motion";

// ---------------------------------------------------------------------------
// The index is built once at module load from the directory data only. It
// deliberately does NOT import from data/stores.ts: that file pulls in every
// store's long description, which would then ride along in the header bundle
// on every page for no benefit. Names, categories and floors are all a search
// box needs.
// ---------------------------------------------------------------------------

type Entry = {
  key: string;
  name: string;
  sub: string;
  href: string;
  logo?: string;
  bg?: string;
  knockout?: boolean;
  external?: boolean;
  haystack: string;
};

function floorName(floors: string[]) {
  return floors
    .map((f) => FLOOR_LABELS[f]?.name ?? f.toUpperCase())
    .join(" and ");
}

/*
 * Everyday words for each category. Someone searching "shoes" should land on
 * Footwear and someone searching "makeup" on Beauty, so these ride along in
 * the haystack without ever being shown.
 */
const SYNONYMS: Record<string, string> = {
  apparel: "clothes clothing fashion shirts jeans dresses menswear womenswear",
  ethnic: "traditional kurta saree lehenga sherwani indian wear",
  footwear: "shoes sneakers trainers sandals slippers heels boots",
  sportswear: "sports gym active activewear running fitness",
  food: "food court quick bites fast food",
  restaurants: "restaurant dining eat meal lunch dinner",
  cafe: "coffee tea bakery brunch",
  jewellery: "jewelry gold diamond rings earrings necklace",
  watches: "watch timepiece",
  eyewear: "glasses spectacles sunglasses optician lenses",
  beauty: "makeup cosmetics skincare perfume fragrance",
  salon: "haircut hair spa grooming beauty parlour",
  kids: "children toys baby babies",
  home: "furniture homeware decor mattress bedding kitchen",
  bags: "luggage suitcase backpack handbag trolley travel",
  mobile: "phone smartphone electronics gadgets laptop",
  books: "book stationery reading",
  entertainment: "cinema movies games arcade play",
  lingerie: "innerwear underwear nightwear",
};

function fromStores(stores: DirectoryStore[], section: string): Entry[] {
  return stores.map((s) => {
    const category = CATEGORY_LABELS[s.cat] ?? s.cat;
    return {
      key: `${section}-${s.slug}`,
      name: s.name,
      sub: `${category} · ${floorName(s.floors)}`,
      href: `/${section}/${s.slug}`,
      logo: s.logo,
      bg: s.bg,
      knockout: s.knockout,
      haystack:
        `${s.name} ${category} ${section} ${SYNONYMS[s.cat] ?? ""}`.toLowerCase(),
    };
  });
}

const PAGES: Entry[] = [
  {
    key: "page-shop",
    name: "Shop",
    sub: "Every store, by category",
    href: "/shop",
    haystack: "shop shops shopping stores clothes fashion directory",
  },
  {
    key: "page-dine",
    name: "Dine",
    sub: "Restaurants, cafes and the food court",
    href: "/dine",
    haystack: "dine dining food eat restaurant cafe coffee food court",
  },
  {
    key: "page-entertain",
    name: "Entertain",
    sub: "Cinema, arcade and play zones",
    href: "/entertain",
    haystack: "entertain entertainment cinema movies arcade games play kids",
  },
  {
    key: "page-visit",
    name: "Plan Your Visit",
    sub: "Hours, parking and customer services",
    href: "/plan-your-visit",
    haystack:
      "plan visit hours timings parking valet ev charging wheelchair pram lost and found first aid medical ambulance feeding room washroom accessible address directions contact",
  },
  {
    key: "page-events",
    name: "Events",
    sub: "Opens the events site",
    href: "https://events.felixplaza.com/",
    external: true,
    haystack: "events whats on",
  },
];

const INDEX: Entry[] = [
  ...fromStores(onSite(SHOP_STORES), "shop"),
  ...fromStores(onSite(DINE_STORES), "dine"),
  ...fromStores(onSite(ENTERTAINMENT_STORES), "entertain"),
  ...PAGES,
];

const LIMIT = 8;

/**
 * Ranks a match so exact and leading matches float to the top: typing "za"
 * should surface ZARA before a store that merely sits in a category
 * containing those letters.
 */
function score(entry: Entry, q: string) {
  const name = entry.name.toLowerCase();
  if (name === q) return 0;
  if (name.startsWith(q)) return 1;
  if (name.split(/[\s&·-]+/).some((w) => w.startsWith(q))) return 2;
  if (name.includes(q)) return 3;
  if (entry.haystack.includes(q)) return 4;
  return -1;
}

function search(query: string) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return INDEX.map((entry) => ({ entry, rank: score(entry, q) }))
    .filter((r) => r.rank >= 0)
    .sort((a, b) => a.rank - b.rank || a.entry.name.localeCompare(b.entry.name))
    .slice(0, LIMIT)
    .map((r) => r.entry);
}

function ResultThumb({ entry }: { entry: Entry }) {
  if (!entry.logo) {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/15 text-white/50">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 5h16M4 12h16M4 19h10" />
        </svg>
      </span>
    );
  }
  return (
    <span
      className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md border border-white/15"
      style={{
        backgroundColor: entry.knockout ? "#17161f" : entry.bg ?? "#ffffff",
      }}
    >
      <Image
        src={entry.logo}
        alt=""
        fill
        sizes="44px"
        className={`object-contain ${entry.bg ? "p-0" : "p-1.5"}`}
      />
    </span>
  );
}

// The panel mounts only while the overlay is open, so its query and cursor
// start clean every time without an effect having to reset them.
function SearchPanel({ onClose }: { onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const results = useMemo(() => search(query), [query]);
  const typed = query.trim().length >= 2;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const go = (entry: Entry) => {
      onClose();
      if (entry.external) {
        window.open(entry.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(entry.href);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (!results.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => (c + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => (c - 1 + results.length) % results.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        go(results[cursor] ?? results[0]);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, results, cursor, router]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-ink/95 px-4 pb-16 pt-[16vh] backdrop-blur-sm"
    >
      <button
        aria-label="Close search"
        onClick={onClose}
        className="absolute right-6 top-6 text-4xl leading-none text-white/70 transition-colors hover:text-white md:right-8 md:top-8"
      >
        &times;
      </button>

      <motion.div
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 28, opacity: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl"
      >
        <label
          htmlFor="site-search"
          className="mb-4 block text-[11px] font-bold uppercase tracking-[0.25em] text-white/55"
        >
          Search Felix Plaza
        </label>

        <div className="flex items-center gap-4 border-b-2 border-white/30 pb-4 focus-within:border-white">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.8-3.8" />
          </svg>
          <input
            id="site-search"
            ref={inputRef}
            type="search"
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            placeholder="Try a brand, a category or a floor"
            className="w-full bg-transparent font-display text-2xl text-white placeholder:text-white/35 focus:outline-none md:text-4xl"
          />
        </div>

        <div className="mt-6">
          {!typed && (
            <div>
              <p className="text-sm text-white/45">
                Start typing to search every store, or jump straight in.
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {PAGES.filter((p) => !p.external).map((p) => (
                  <Link
                    key={p.key}
                    href={p.href}
                    onClick={onClose}
                    className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition-colors duration-300 hover:border-white hover:text-white"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {typed && !results.length && (
            <p className="text-sm text-white/50">
              Nothing matched that. Try a shorter word, or browse the directory
              from the menu.
            </p>
          )}

          {typed && results.length > 0 && (
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {results.map((entry, i) => {
                const inner = (
                  <>
                    <ResultThumb entry={entry} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-white">
                        {entry.name}
                      </span>
                      <span className="block truncate text-[13px] text-white/50">
                        {entry.sub}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 text-white/40 transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      &rarr;
                    </span>
                  </>
                );
                const cls = `group flex w-full items-center gap-4 px-2 py-3 text-left transition-colors duration-200 ${
                  i === cursor ? "bg-white/10" : "hover:bg-white/[0.06]"
                }`;

                return (
                  <li key={entry.key}>
                    {entry.external ? (
                      <a
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        onMouseEnter={() => setCursor(i)}
                        className={cls}
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link
                        href={entry.href}
                        onClick={onClose}
                        onMouseEnter={() => setCursor(i)}
                        className={cls}
                      >
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Full-screen search. Types against the live store directory, moves with the
// arrow keys, opens on Enter and closes on Escape.
export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && <SearchPanel onClose={onClose} />}
    </AnimatePresence>
  );
}
