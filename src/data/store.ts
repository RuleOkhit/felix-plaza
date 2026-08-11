import { IMG } from "./site";
import { TOP_SHOPS } from "./home";

// ---------------------------------------------------------------------------
// Store profile content. Currently one placeholder store (Atlas Supply);
// add more profiles by extending this shape and adding a route.
// ---------------------------------------------------------------------------

export const STORE_PROFILE = {
  slug: "atlas-supply",
  name: "Atlas Supply",
  category: "Sports & Outdoor",
  floor: "Level 1 · Unit 112",
  landmark: "Near the Central Atrium",
  phone: "+00 0 000 0001",
  email: "atlassupply@example.com",
  heroImage: IMG.hero,
  about: [
    "Placeholder introduction for this store — two or three sentences describing what it offers and who it is for. Replace with the tenant's own brand story.",
    "Second placeholder paragraph with room for collection highlights, services such as fitting or repairs, and anything else a visitor should know before dropping in.",
  ],
  tags: ["Sportswear", "Footwear", "Outdoor Gear", "Equipment"],
  gallery: [IMG.squareB, IMG.wide, IMG.squareA],
  hours: [
    { days: "Monday – Thursday", time: "10:00 AM – 12:00 AM" },
    { days: "Friday – Saturday", time: "10:00 AM – 1:00 AM" },
    { days: "Sunday", time: "10:00 AM – 12:00 AM" },
  ],
  // Used by the live "Open now" badge (24h clock, closing past midnight).
  opensAt: 10,
  closesAt: 24,
};

// Other stores shown in the "You may also like" carousel (name compare is
// case-insensitive — the homepage card is "ATLAS SUPPLY", the profile
// "Atlas Supply").
export const RELATED_STORES = TOP_SHOPS.filter(
  (s) => s.name.toLowerCase() !== STORE_PROFILE.name.toLowerCase(),
).slice(0, 8);
