import { HERO_IMG, SITE } from "./site";
import {
  DINE_STORES,
  ENTERTAINMENT_STORES,
  SHOP_STORES,
  type DirectoryStore,
} from "./store-directory";
import { onSite } from "./parked";

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
export const TOP_SHOPS = feature(onSite(SHOP_STORES), "shop", [
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

export const DINE_SPOTS = feature(onSite(DINE_STORES), "dine", [
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

/*
 * What each venue is, in a line. Written for the homepage cards only, so the
 * taglines on the venue pages are left alone.
 */
const ENTERTAINMENT_BLURBS: Record<string, string> = {
  cinepolis: "The latest blockbusters on the big screen.",
  funcity: "Rides and arcade games for toddlers through to teens.",
  "fun-block": "Soft play and climbing zones for younger children.",
  "game-x": "Racing rigs, shooters and multiplayer arcade games.",
};

export const ENTERTAINMENT: EntertainCard[] = onSite(ENTERTAINMENT_STORES).map((v) => ({
  name: v.name,
  blurb: ENTERTAINMENT_BLURBS[v.slug] ?? "",
  image: v.logo,
  href: `/entertain/${v.slug}`,
  bg: v.bg,
  // Four venues is one too many for the desktop row, so the weakest of
  // them drops out there and stays in the swipeable mobile carousel.
  mobileOnly: v.slug === "game-x",
}));

/*
 * The strip that sends people to the in-house store directory on the main
 * site. Adapted from the "Find your favourite store" story creative.
 */
export const DIRECTORY_BAND = {
  title: "Find Your Favourite Store",
  text: "Your quick guide to every store at Felix Plaza.",
  cta: "Explore Store Directory",
  href: SITE.directoryUrl,
};

export const SECTION_INTROS = {
  shops: {
    title: "Store Spotlight",
    text: "Global labels and homegrown favourites under one roof, from fashion and footwear to beauty, jewellery and home.",
    cta: "Explore Shops",
    href: "/shop",
  },
  dine: {
    title: "Time to Dine",
    text: "From a quick coffee to a family meal, choose from cafés, a lively food court and sit-down restaurants.",
    cta: "Explore Dining",
    href: "/dine",
  },
  entertain: {
    title: "Entertainment",
    text: "Catch a movie, take on the arcade or let the little ones loose in a play zone. Fun for every age.",
    cta: "Explore Entertainment",
    href: "/entertain",
  },
};
