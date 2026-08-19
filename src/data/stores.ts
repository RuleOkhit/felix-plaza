import { IMG } from "./site";
import { TOP_SHOPS } from "./home";

// ---------------------------------------------------------------------------
// STORE PAGES — BASE FORMAT
//
// Every store page is generated from one entry in STORES below. To add a
// store: drop its images in public/images/stores/<slug>/, add an entry
// here, and point the brand's `href` in data/home.ts at /shop/<slug>.
// No new components or routes are needed — the page builds itself.
//
// How each field is used on the page:
//
//   slug        URL segment → /shop/<slug>
//   name        Shown in the banner AND as the heading of the description
//               section (that section is titled with the store's own name,
//               not a generic "About the store").
//   category    Small line above the name in the banner. Category ONLY —
//               no floor or unit here; location lives in the info card.
//   floor       Number driving the floor graphic in the info card.
//               0 = Ground Floor, 1 = 1st Floor, 2 = 2nd Floor …
//   unit        e.g. "Unit 112". Optional — omit if not known.
//   landmark    e.g. "Near the Central Atrium". Optional.
//   about       One paragraph per array entry.
//   tags        Pill list under the description.
//   banner      Wide hero image (~3.7:1). Darkened automatically.
//   gallery     Square images for the picture grid + lightbox.
//   galleryLabel  Heading for that grid. Defaults to "In Store".
//   hours       Rows in the expandable weekly-hours list.
//   opensAt / closesAt  24h numbers powering the live open/closed badge.
//   phone / email       Optional. Rows are hidden when omitted, and the
//                       card falls back to mall guest services.
// ---------------------------------------------------------------------------

export type StoreHours = { days: string; time: string };

export type Store = {
  slug: string;
  name: string;
  category: string;
  floor: number;
  unit?: string;
  landmark?: string;
  about: string[];
  tags: string[];
  banner: string;
  gallery: string[];
  galleryLabel?: string;
  hours: StoreHours[];
  opensAt: number;
  closesAt: number;
  phone?: string;
  email?: string;
};

// Mall-wide trading hours, reused unless a store differs.
const MALL_HOURS: StoreHours[] = [
  { days: "Monday – Thursday", time: "11:00 AM – 10:00 PM" },
  { days: "Friday – Sunday", time: "11:00 AM – 10:00 PM" },
];

// 0 → "Ground Floor", 1 → "1st Floor", 2 → "2nd Floor" …
export function floorLabel(floor: number) {
  if (floor === 0) return "Ground Floor";
  const suffix =
    floor % 100 >= 11 && floor % 100 <= 13
      ? "th"
      : ["th", "st", "nd", "rd"][floor % 10] ?? "th";
  return `${floor}${suffix} Floor`;
}

export const STORES: Store[] = [
  {
    slug: "adidas",
    name: "Adidas",
    category: "Sportswear & Footwear",
    floor: 1,
    about: [
      "Adidas designs, manufactures and markets athletic and sports lifestyle products. The company's product portfolio includes footwear, apparel and accessories such as bags, sunglasses, fitness equipment, and balls.",
    ],
    tags: ["Footwear", "Apparel", "Accessories", "Fitness Equipment"],
    banner: "/images/stores/adidas/banner.webp",
    gallery: [
      "/images/stores/adidas/gallery-1.webp",
      "/images/stores/adidas/gallery-2.webp",
      "/images/stores/adidas/gallery-3.webp",
    ],
    hours: [{ days: "Monday to Sunday", time: "11:00 AM – 11:00 PM" }],
    opensAt: 11,
    closesAt: 23,
    phone: "1800-570-3944",
    email: "service@onlineshop.adidas.co.in",
  },
  {
    // Original demo profile, kept on the same base format.
    slug: "atlas-supply",
    name: "Atlas Supply",
    category: "Sports & Outdoor",
    floor: 1,
    unit: "Unit 112",
    landmark: "Near the Central Atrium",
    about: [
      "Placeholder introduction for this store — two or three sentences describing what it offers and who it is for. Replace with the tenant's own brand story.",
      "Second placeholder paragraph with room for collection highlights, services such as fitting or repairs, and anything else a visitor should know before dropping in.",
    ],
    tags: ["Sportswear", "Footwear", "Outdoor Gear", "Equipment"],
    banner: IMG.hero,
    gallery: [IMG.squareB, IMG.wide, IMG.squareA],
    hours: MALL_HOURS,
    opensAt: 11,
    closesAt: 22,
  },
];

export function getStore(slug: string) {
  return STORES.find((s) => s.slug === slug);
}

// "You may also like" carousel — every other brand from the homepage list.
// Name compare is case-insensitive (cards are all-caps, profiles are not).
export function relatedStores(store: Store) {
  return TOP_SHOPS.filter(
    (s) => s.name.toLowerCase() !== store.name.toLowerCase(),
  ).slice(0, 8);
}
