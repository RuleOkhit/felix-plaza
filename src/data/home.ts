import { HERO_IMG, IMG, LOGO } from "./site";

// ---------------------------------------------------------------------------
// Homepage content. Cards and slides live in arrays so they can be
// re-ordered, extended or replaced without touching any JSX.
// Store images currently point at placeholders — swap each `image` for that
// brand's logo file (see README for sizes).
// ---------------------------------------------------------------------------

export type HeroSlide = {
  title: string;
  image: string;
  href: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  { title: "Shop", image: HERO_IMG.shop, href: "/shop" },
  { title: "Dine", image: HERO_IMG.dine, href: "/dine" },
  { title: "Entertain", image: HERO_IMG.entertain, href: "/entertain" },
  { title: "Unwind", image: HERO_IMG.unwind, href: "/plan-your-visit" },
];

export type BrandCard = {
  name: string;
  category: string;
  image: string;
  href: string;
};

// Brands awaiting logo files (TASVA, FRIDO, CARATLANE, AMRITSARI EXPRESS,
// KEVENTERS) are held back until artwork arrives — add them here with their
// logo path and they reappear on the homepage.
export const TOP_SHOPS: BrandCard[] = [
  { name: "H&M", category: "Fashion", image: LOGO.hm, href: "/shop" },
  { name: "WESTSIDE", category: "Fashion", image: LOGO.westside, href: "/shop" },
  { name: "CALVIN KLEIN", category: "Fashion", image: LOGO.calvinKlein, href: "/shop" },
  { name: "MARKS & SPENCER", category: "Fashion", image: LOGO.marksSpencer, href: "/shop" },
  { name: "LIFESTYLE", category: "Lifestyle", image: LOGO.lifestyle, href: "/shop" },
  { name: "ADIDAS", category: "Sports", image: LOGO.adidas, href: "/shop" },
  { name: "TOMMY HILFIGER", category: "Fashion", image: LOGO.tommyHilfiger, href: "/shop" },
];

export const DINE_SPOTS: BrandCard[] = [
  { name: "HALDIRAM'S", category: "Indian", image: LOGO.haldirams, href: "/dine" },
  { name: "BURGER KING", category: "Fast Food", image: LOGO.burgerKing, href: "/dine" },
  { name: "KFC", category: "Fast Food", image: LOGO.kfc, href: "/dine" },
  { name: "TACO BELL", category: "Fast Food", image: LOGO.tacoBell, href: "/dine" },
];

export type EntertainCard = {
  name: string;
  blurb: string;
  image: string;
  href: string;
};

export const ENTERTAINMENT: EntertainCard[] = [
  {
    name: "FUNCITY",
    blurb:
      "Rides, soft play and arcade favourites — a full day out for younger visitors and the whole family.",
    image: LOGO.funcity,
    href: "/entertain",
  },
  {
    name: "GAME X",
    blurb:
      "Arcade cabinets, racing rigs and multiplayer challenges for casual players and serious gamers alike.",
    image: LOGO.gameX,
    href: "/entertain",
  },
  {
    name: "CINÉPOLIS",
    blurb:
      "Blockbusters and new releases on the big screen, with premium seating and full-service snacks.",
    image: LOGO.cinepolis,
    href: "/entertain",
  },
];

export const OPENING_SOON = {
  title: "Something New Is Coming",
  text: "Placeholder announcement copy. Use this banner to promote a launch, campaign or seasonal moment.",
  cta: "Discover More",
  href: "/offers",
  image: IMG.banner,
};

export const SECTION_INTROS = {
  shops: {
    title: "Store Spotlight",
    text: "Fresh styles, exclusive offers, and must-have collections! See what our featured stores are bringing to the floor this week.",
    cta: "View All Shops",
    href: "/shop",
  },
  dine: {
    title: "Time to Dine",
    text: "From fast-casual food court favorites to refined fine dining experiences, discover flavors to satisfy every craving and occasion.",
    cta: "View All Dining",
    href: "/dine",
  },
  entertain: {
    title: "Entertainment For Everyone",
    text: "Unplug, play, and make memories. Explore a dynamic lineup of blockbuster movies, interactive arcades, and family-friendly attractions under one roof.",
    cta: "View All Entertainment",
    href: "/entertain",
  },
};
