// ---------------------------------------------------------------------------
// OFFERS
//
// One entry per offer. The offers page shows each poster whole, with the
// store and the deal written out underneath, and opens it large on a tap.
// The store's own page shows its offers too, beside its write up.
//
// To add an offer: drop the poster in public/images/offers/ and add an entry
// to OFFERS with its pixel size. `store` is the store's slug from
// store-directory.ts, which supplies its name, floor and page link.
//
// `ends` is the last day of the offer ("2026-10-31"). The site leaves an
// offer out once that day has passed, counted from the day it was built, so
// a rebuild clears expired offers on its own. Leave it out for offers
// without an end date.
// ---------------------------------------------------------------------------

import type { Art } from "./events";
import {
  DINE_STORES,
  ENTERTAINMENT_STORES,
  FLOOR_LABELS,
  SHOP_STORES,
} from "./store-directory";
import { onSite } from "./parked";

export type Offer = {
  slug: string;
  /** Store slug from store-directory.ts */
  store: string;
  /** The deal, as the poster states it */
  title: string;
  /** What it applies to */
  detail: string;
  /** The poster's own line, where it has one */
  tagline?: string;
  /** Last day of the offer, "YYYY-MM-DD" */
  ends?: string;
  /** Small print, where the poster mentions it */
  terms?: string;
  poster: Art;
};

const OFFERS: Offer[] = [
  {
    slug: "caratlane-diamond-designs",
    store: "caratlane",
    title: "Flat 20% Off",
    detail: "On MRP of all diamond designs",
    tagline: "It's a big deal",
    terms: "T&C apply",
    poster: { src: "/images/offers/caratlane.webp", width: 720, height: 1080 },
  },
];

// TEMPORARY: the first offer repeated, to preview the offers page with
// several offers on it. Only the offers page shows these. Set to [] (or
// delete) before the page goes live.
const PREVIEW_REPEATS: Offer[] = Array.from({ length: 7 }, (_, i) => ({
  ...OFFERS[0],
  slug: `${OFFERS[0].slug}-${i + 2}`,
}));

function running(offers: Offer[], now: Date) {
  const today = now.toISOString().slice(0, 10);
  return offers.filter((o) => !o.ends || o.ends >= today);
}

/** Everything for the offers page, still running on the day of the build. */
export function currentOffers(now = new Date()): Offer[] {
  return running([...OFFERS, ...PREVIEW_REPEATS], now);
}

/** One store's running offers, for its own page. */
export function storeOffers(store: string, now = new Date()): Offer[] {
  return running(OFFERS, now).filter((o) => o.store === store);
}

const SECTIONS = [
  { path: "shop", stores: onSite(SHOP_STORES) },
  { path: "dine", stores: onSite(DINE_STORES) },
  { path: "entertain", stores: onSite(ENTERTAINMENT_STORES) },
];

/** The store behind an offer: its name, floor and page. */
function offerStore(offer: Offer) {
  for (const { path, stores } of SECTIONS) {
    const s = stores.find((x) => x.slug === offer.store);
    if (s) {
      return {
        name: s.name,
        floor: s.floors.map((f) => FLOOR_LABELS[f]?.name ?? f.toUpperCase()).join(", "),
        href: `/${path}/${s.slug}`,
      };
    }
  }
  return { name: offer.store, floor: "", href: undefined };
}

/** "Till 31 October", for offers with an end date. */
function offerEnds(offer: Offer) {
  if (!offer.ends) return undefined;
  const d = new Date(`${offer.ends}T00:00:00`);
  return `Till ${d.getDate()} ${d.toLocaleString("en-GB", { month: "long" })}`;
}

/** An offer with its store looked up, ready for the page to show. */
export type OfferView = {
  slug: string;
  title: string;
  detail: string;
  tagline?: string;
  terms?: string;
  ends?: string;
  poster: Art;
  store: { name: string; floor: string; href?: string };
};

export function offerView(o: Offer): OfferView {
  return {
    slug: o.slug,
    title: o.title,
    detail: o.detail,
    tagline: o.tagline,
    terms: o.terms,
    ends: offerEnds(o),
    poster: o.poster,
    store: offerStore(o),
  };
}
