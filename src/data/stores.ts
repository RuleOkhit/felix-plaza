import {
  CATEGORY_LABELS,
  DINE_STORES,
  ENTERTAINMENT_STORES,
  FLOOR_LABELS,
  SHOP_STORES,
  type DirectoryStore,
} from "./store-directory";
import { STORE_COPY } from "./store-copy";
import { onSite } from "./parked";

// ---------------------------------------------------------------------------
// STORE PAGES
//
// Every store in the directory gets a page. Nothing here is hand written per
// store: the name, category and floor come from the directory (which is
// generated from the mall's data.js), and the tagline and description come
// from store-copy.ts. To change a store, edit one of those two files.
//
// Trading hours are mall wide and identical for every store.
// Phone and email are only filled in where a number has actually been
// confirmed; the rows are hidden when they are missing rather than faked.
// ---------------------------------------------------------------------------

export type StoreHours = { days: string; time: string };

export type Store = {
  slug: string;
  name: string;
  /** URL section this store lives under: shop | dine | entertain */
  section: "shop" | "dine" | "entertain";
  category: string;
  floors: string[];
  /** e.g. "First Floor" or "Ground & First Floor" */
  floorName: string;
  logo: string;
  bg?: string;
  knockout?: boolean;
  tagline: string;
  description: string;
  hours: StoreHours[];
  opensAt: number;
  closesAt: number;
  phone?: string;
  email?: string;
};

/** Mall wide trading hours. Every store keeps the same times. */
export const STORE_HOURS: StoreHours[] = [
  { days: "Monday to Sunday", time: "11:00 AM to 11:00 PM" },
];
const OPENS_AT = 11;
const CLOSES_AT = 23;

// Only brands whose contact details have actually been confirmed. Everything
// else is deliberately left blank rather than guessed at.
const CONTACTS: Record<string, { phone?: string; email?: string }> = {
  adidas: { phone: "1800-570-3944", email: "service@onlineshop.adidas.co.in" },
};

function floorName(floors: string[]) {
  const names = floors.map((f) => FLOOR_LABELS[f]?.name ?? f.toUpperCase());
  if (names.length === 1) return names[0];
  // "Ground, First & Second Floor" reads better than three full names.
  const short = names.map((n) => n.replace(/ Floor$/, ""));
  const last = short.pop();
  return `${short.join(", ")} & ${last} Floor`;
}

function build(entry: DirectoryStore, section: Store["section"]): Store {
  const copy = STORE_COPY[entry.slug];
  const contact = CONTACTS[entry.slug] ?? {};
  return {
    slug: entry.slug,
    name: entry.name,
    section,
    category: CATEGORY_LABELS[entry.cat] ?? entry.cat,
    floors: entry.floors,
    floorName: floorName(entry.floors),
    logo: entry.logo,
    bg: entry.bg,
    knockout: entry.knockout,
    tagline: copy?.tagline ?? "",
    description: copy?.description ?? "",
    hours: STORE_HOURS,
    opensAt: OPENS_AT,
    closesAt: CLOSES_AT,
    ...contact,
  };
}

export const STORES: Store[] = [
  ...onSite(SHOP_STORES).map((s) => build(s, "shop")),
  ...onSite(DINE_STORES).map((s) => build(s, "dine")),
  ...onSite(ENTERTAINMENT_STORES).map((s) => build(s, "entertain")),
];

export function getStore(slug: string) {
  return STORES.find((s) => s.slug === slug);
}

export function storesIn(section: Store["section"]) {
  return STORES.filter((s) => s.section === section);
}

/** Path to a store's page, e.g. /shop/adidas */
export function storeHref(store: { section: Store["section"]; slug: string }) {
  return `/${store.section}/${store.slug}`;
}

/** Every slug that has a page, so directory cards know to link. */
export const STORE_PAGE_SLUGS = new Set(STORES.map((s) => s.slug));

/** Look up which section a slug belongs to, for building links. */
export const STORE_SECTION = new Map(STORES.map((s) => [s.slug, s.section]));

/**
 * Neighbours worth walking to next. A category with enough members stands
 * on its own; a thin one (Eyewear has a single store) falls back to the
 * wider section, and the caller is told so it can title the strip honestly.
 */
export function relatedStores(store: Store, limit = 8) {
  const sameCategory = STORES.filter(
    (s) => s.slug !== store.slug && s.category === store.category,
  );
  if (sameCategory.length >= 3) {
    return { stores: sameCategory.slice(0, limit), sameCategory: true };
  }
  const rest = STORES.filter(
    (s) =>
      s.slug !== store.slug &&
      s.section === store.section &&
      !sameCategory.includes(s),
  );
  return {
    stores: [...sameCategory, ...rest].slice(0, limit),
    sameCategory: false,
  };
}
