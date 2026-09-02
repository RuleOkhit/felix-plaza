import { HERO_IMG } from "./site";
import {
  DINE_STORES,
  ENTERTAINMENT_STORES,
  SHOP_STORES,
  type DirectoryStore,
} from "./store-directory";
import { STORE_COPY } from "./store-copy";

// ---------------------------------------------------------------------------
// Homepage content.
//
// The brand cards are pulled straight from the directory, so a logo or a
// name only ever has to be corrected in one place and every card links to
// the store's own page. To change which brands are featured, edit the slug
// lists below.
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

function feature(
  source: DirectoryStore[],
  section: string,
  slugs: string[],
): BrandCard[] {
  return slugs.flatMap((slug) => {
    const s = source.find((x) => x.slug === slug);
    if (!s) return [];
    return [
      {
        name: s.name,
        category: s.cat,
        image: s.logo,
        href: `/${section}/${s.slug}`,
      },
    ];
  });
}

/* Featured on the homepage. Swap a slug to change the line up. */
export const TOP_SHOPS = feature(SHOP_STORES, "shop", [
  "h-and-m",
  "westside",
  "levis",
  "marks-and-spencer",
  "lifestyle",
  "adidas",
  "tommy-hilfiger",
  "calvin-klein",
  "puma",
  "biba",
]);

export const DINE_SPOTS = feature(DINE_STORES, "dine", [
  "haldirams",
  "burger-king",
  "kfc",
  "taco-bell",
  "blue-tokai",
  "wow-momo",
]);

export type EntertainCard = {
  name: string;
  blurb: string;
  image: string;
  href: string;
  /** The logo artwork's own background colour, so its tile can match it. */
  bg?: string;
  /** Hidden from the desktop grid, kept in the mobile carousel. */
  mobileOnly?: boolean;
};

export const ENTERTAINMENT: EntertainCard[] = ENTERTAINMENT_STORES.map((v) => ({
  name: v.name,
  blurb: STORE_COPY[v.slug]?.tagline ?? "",
  image: v.logo,
  href: `/entertain/${v.slug}`,
  bg: v.bg,
  // Four venues is one too many for the desktop row, so the weakest of
  // them drops out there and stays in the swipeable mobile carousel.
  mobileOnly: v.slug === "game-x",
}));

/*
 * Brands still fitting out. The marks below are STAND INS drawn from the
 * existing directory purely so the strip has something to show; swap
 * `brands` for the real opening soon line up when it is confirmed.
 */
export const OPENING_SOON = {
  eyebrow: "Opening Soon",
  cta: "Discover more",
  href: "/shop",
  brands: feature(SHOP_STORES, "shop", [
    "aldo",
    "birkenstock",
    "hidesign",
    "samsonite",
    "giva",
    "bluestone",
    "skechers",
    "asics",
    "mochi",
    "rareism",
  ]).map((b) => ({ name: b.name, slug: b.href.split("/").pop() ?? "", logo: b.image })),
};

export const SECTION_INTROS = {
  shops: {
    title: "Store Spotlight",
    text: "The kind of afternoon where you walk in for one thing and leave carrying three. Racks worth working through slowly, fitting rooms worth the wait, and staff who actually know what is in the back.",
    cta: "Explore Shops",
    href: "/shop",
  },
  dine: {
    title: "Time to Dine",
    text: "Coffee that pulls you in on the way past, a food court that settles every argument about what to eat, and a proper table when the occasion deserves one.",
    cta: "Explore Dining",
    href: "/dine",
  },
  entertain: {
    title: "Entertainment",
    text: "Big screens, loud arcades and somewhere for the children to burn off the afternoon. Usually the part of the day nobody wants to cut short.",
    cta: "Explore Entertainment",
    href: "/entertain",
  },
};
