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
// Timing: `starts` and `ends` put an offer up and take it down by
// themselves, with no rebuild or upload needed. Write either a day,
// "2026-10-31" (the whole day, India time), or an exact moment,
// "2026-10-21T11:30+05:30". The site leaves out offers that have ended (or
// not begun) when it is built, and the visitor's browser checks again on
// every visit, and at the very moment an offer ends while a page is open, so
// the grid closes up around it. The dates are never shown to visitors.
// Leave them out for an offer that has no end.
// ---------------------------------------------------------------------------

import type { Art } from "./events";
import {
  DINE_STORES,
  ENTERTAINMENT_STORES,
  FLOOR_LABELS,
  SHOP_STORES,
} from "./store-directory";
import { onSite } from "./parked";
import { isRunning } from "@/lib/offer-time";

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
  /** When it goes up: "YYYY-MM-DD" (from the start of that day, IST) or an exact time */
  starts?: string;
  /** When it comes down: "YYYY-MM-DD" (to the end of that day, IST) or an exact time */
  ends?: string;
  /** Small print, where the poster mentions it */
  terms?: string;
  poster: Art;
};

// An `ends` day is the last day the offer runs: it comes down at midnight
// at the end of that day, India time (ends "2026-11-15" = gone from 16 Nov).
// Ordered as they appear on the page; ended ones drop out and the rest close up.
const OFFERS: Offer[] = [
  // ----- Black Friday 2026 (to 28 November unless stated) -----
  {
    slug: "biba-black-friday",
    store: "biba",
    title: "30% Off",
    detail: "On selected items, Black Friday sale",
    tagline: "Black Friday",
    terms: "T&C apply",
    ends: "2026-11-28",
    poster: { src: "/images/offers/biba-bf.webp", width: 900, height: 1600 },
  },
  {
    slug: "babyshop-black-friday",
    store: "babyshop",
    title: "Flat 40% Off",
    detail: "On a purchase of 4 products, storewide",
    tagline: "The big Friday sale",
    terms: "On select apparel. T&C apply",
    starts: "2026-11-26",
    ends: "2026-11-29",
    poster: { src: "/images/offers/babyshop-bf.webp", width: 900, height: 1600 },
  },
  {
    slug: "runway-black-friday",
    store: "runway",
    title: "Buy 2, Get 35% Off",
    detail: "On the 2nd pair of sunglasses",
    tagline: "Black Friday",
    terms: "On 25+ international sunglass brands",
    ends: "2026-11-28",
    poster: { src: "/images/offers/runway-bf.webp", width: 1080, height: 1440 },
  },
  {
    slug: "geetanjali-black-friday",
    store: "geetanjali-salon",
    title: "Buy 2 Facials, Get the 3rd Free",
    detail: "Facials starting at ₹5,500",
    tagline: "Black Friday",
    terms: "T&C apply",
    ends: "2026-11-28",
    poster: { src: "/images/offers/geetanjali-bf.webp", width: 900, height: 1600 },
  },
  {
    slug: "sweet-dreams-black-friday",
    store: "sweet-dreams",
    title: "Up to 50% Off",
    detail: "On sleepwear and loungewear",
    tagline: "Black Friday",
    terms: "T&C apply",
    ends: "2026-11-28",
    poster: { src: "/images/offers/sweet-dreams-bf.webp", width: 900, height: 1600 },
  },
  {
    slug: "miniso-black-friday",
    store: "miniso",
    title: "Up to 50% Off",
    detail: "Black Friday super sale",
    tagline: "Black Friday",
    ends: "2026-11-28",
    poster: { src: "/images/offers/miniso-bf.webp", width: 1074, height: 1600 },
  },
  {
    slug: "us-polo-assn-black-friday",
    store: "us-polo-assn",
    title: "Flat 25% Off",
    detail: "On select styles",
    tagline: "The Black Friday event",
    ends: "2026-11-28",
    poster: { src: "/images/offers/us-polo-assn-bf.webp", width: 1080, height: 1620 },
  },
  {
    slug: "r-and-b-black-friday",
    store: "r-and-b",
    title: "Flat 30% Off",
    detail: "On everything, plus an extra 5% off with HDFC Bank cards",
    tagline: "Black Friday",
    terms: "HDFC offer on purchases above ₹4,999. T&C apply",
    ends: "2026-11-29",
    poster: { src: "/images/offers/r-and-b-bf.webp", width: 900, height: 1600 },
  },
  {
    slug: "blackberrys-black-friday",
    store: "blackberrys",
    title: "Buy One, Get the Second at 50% Off",
    detail: "Flat 50% off your second piece",
    tagline: "Black Friday",
    terms: "T&C apply",
    ends: "2026-11-28",
    poster: { src: "/images/offers/blackberrys-bf.webp", width: 1080, height: 1526 },
  },
  // ----- Earlier offers -----
  {
    slug: "caratlane-diamond-designs",
    store: "caratlane",
    title: "Flat 20% Off",
    detail: "On MRP of all diamond designs",
    tagline: "It's a big deal",
    terms: "T&C apply",
    ends: "2026-11-15",
    poster: { src: "/images/offers/caratlane.webp", width: 720, height: 1080 },
  },
  {
    slug: "ethera-festive-season",
    store: "ethera",
    title: "Up to 30% Off On Diamonds",
    detail: "50% off making charges, plus a free gold coin",
    tagline: "This festive season, sparkle smarter",
    terms: "T&C apply",
    ends: "2026-11-10",
    poster: { src: "/images/offers/ethera.webp", width: 1024, height: 673 },
  },
  {
    slug: "runway-ray-ban-meta",
    store: "runway",
    title: "20% Off Ray-Ban Meta",
    detail: "On Ray-Ban Meta (Gen 2) smart glasses",
    terms: "Some styles excluded",
    ends: "2026-11-08",
    poster: { src: "/images/offers/runway.webp", width: 1024, height: 1536 },
  },
  {
    slug: "madame-travel-vanity-combo",
    store: "madame",
    title: "Travel + Vanity Combo at ₹99",
    detail: "On shopping worth ₹14,999",
    terms: "More offers in store",
    ends: "2026-11-30",
    poster: { src: "/images/offers/madame.webp", width: 922, height: 1280 },
  },
  {
    slug: "r-and-b-free-travel-bag",
    store: "r-and-b",
    title: "Free Travel Bag",
    detail: "On a spend of ₹3,999",
    tagline: "Love it. Wear it.",
    ends: "2026-11-10",
    poster: { src: "/images/offers/r-and-b.webp", width: 720, height: 1280 },
  },
  {
    slug: "the-bear-house-festive-edit",
    store: "the-bear-house",
    title: "The Festive Edit",
    detail: "Festive menswear for the young gentlemen",
    terms: "T&C apply",
    ends: "2026-11-30",
    poster: { src: "/images/offers/the-bear-house.webp", width: 1080, height: 1920 },
  },
  {
    slug: "us-polo-assn-on-the-move",
    store: "us-polo-assn",
    title: "Travel Bags From ₹499",
    detail: "A trolley, duffle, backpack or sling bag at a special price when you shop",
    tagline: "USPA on the move",
    ends: "2026-12-31",
    poster: { src: "/images/offers/us-polo-assn.webp", width: 720, height: 1280 },
  },
];

// Preview only: repeats of the first offer, to see a full page while there
// were few real offers. Off now; leave empty for the live site.
const PREVIEW_REPEATS: Offer[] = [];

/** A day means the whole day in India; anything else is an exact moment. */
function moment(value: string | undefined, edge: "start" | "end") {
  if (!value) return undefined;
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? `${value}T${edge === "start" ? "00:00:00" : "23:59:59.999"}+05:30`
    : value;
  return new Date(iso).getTime();
}

function running(offers: Offer[], now: Date) {
  const t = now.getTime();
  return offers.filter((o) => isRunning({ startsAt: moment(o.starts, "start"), endsAt: moment(o.ends, "end") }, t));
}

/** Everything for the offers page, still running on the day of the build. */
export function currentOffers(now = new Date()): Offer[] {
  return running([...OFFERS, ...PREVIEW_REPEATS], now);
}

/** Offers not up yet when the site is built; the browser shows each at its start. */
export function upcomingOffers(now = new Date()): Offer[] {
  const t = now.getTime();
  return [...OFFERS, ...PREVIEW_REPEATS].filter((o) => {
    const s = moment(o.starts, "start");
    return s !== undefined && s > t;
  });
}

/** One store's offers not up yet, for its own page. */
export function storeUpcomingOffers(store: string, now = new Date()): Offer[] {
  return upcomingOffers(now).filter((o) => o.store === store && OFFERS.includes(o));
}

/** Real offers still running (never the preview repeats). */
export function liveOffers(now = new Date()): Offer[] {
  return running(OFFERS, now);
}

/** One store's running offers, for its own page. */
export function storeOffers(store: string, now = new Date()): Offer[] {
  return liveOffers(now).filter((o) => o.store === store);
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

/** An offer with its store looked up, ready for the page to show. */
export type OfferView = {
  slug: string;
  title: string;
  detail: string;
  tagline?: string;
  terms?: string;
  /** When it goes up and comes down, in milliseconds; never shown */
  startsAt?: number;
  endsAt?: number;
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
    startsAt: moment(o.starts, "start"),
    endsAt: moment(o.ends, "end"),
    poster: o.poster,
    store: offerStore(o),
  };
}
