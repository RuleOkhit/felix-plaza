import { IMG } from "./site";
import { DINE_SPOTS, ENTERTAINMENT, TOP_SHOPS, type BrandCard } from "./home";

// ---------------------------------------------------------------------------
// Inner "directory" pages (Shop, Dine, Entertain, Offers, Events, Plan Your
// Visit) all share one template: short hero, featured carousel, card grid.
// Add a new page by adding an entry here — no new JSX required.
// ---------------------------------------------------------------------------

export type DirectorySection = {
  slug: string;
  title: string;
  heroTitle: string;
  intro: string;
  heroImage: string;
  categories: string[];
  items: BrandCard[];
  featured?: BrandCard[];
};

// Generic placeholder cards reused for offers/events grids.
const GENERIC_CARDS: BrandCard[] = [
  { name: "Placeholder Card One", category: "Category", image: IMG.squareA, href: "#" },
  { name: "Placeholder Card Two", category: "Category", image: IMG.squareB, href: "#" },
  { name: "Placeholder Card Three", category: "Category", image: IMG.wide, href: "#" },
  { name: "Placeholder Card Four", category: "Category", image: IMG.banner, href: "#" },
  { name: "Placeholder Card Five", category: "Category", image: IMG.squareB, href: "#" },
  { name: "Placeholder Card Six", category: "Category", image: IMG.squareA, href: "#" },
];

const entertainAsBrands: BrandCard[] = ENTERTAINMENT.map((e) => ({
  name: e.name,
  category: "Attraction",
  image: e.image,
  href: e.href,
}));

export const DIRECTORY_SECTIONS: DirectorySection[] = [
  {
    slug: "shop",
    title: "Shop",
    heroTitle: "Shop",
    intro:
      "Placeholder intro for the shopping directory. Describe the retail mix in one or two sentences.",
    heroImage: IMG.hero,
    categories: ["All", "Fashion", "Lifestyle", "Sports"],
    items: TOP_SHOPS,
    featured: TOP_SHOPS.slice(0, 6),
  },
  {
    slug: "dine",
    title: "Dine",
    heroTitle: "Dine",
    intro:
      "Placeholder intro for the dining directory. Describe the food offering in one or two sentences.",
    heroImage: IMG.wide,
    categories: ["All", "Indian", "Fast Food"],
    items: DINE_SPOTS,
    featured: DINE_SPOTS.slice(0, 6),
  },
  {
    slug: "entertain",
    title: "Entertain",
    heroTitle: "Play",
    intro:
      "Placeholder intro for the entertainment directory. Describe the attractions in one or two sentences.",
    heroImage: IMG.banner,
    categories: ["All", "Cinema", "Family", "Adventure"],
    items: entertainAsBrands,
  },
  {
    slug: "offers",
    title: "Offers",
    heroTitle: "Offers",
    intro:
      "Placeholder intro for offers. Describe current promotions in one or two sentences.",
    heroImage: IMG.squareB,
    categories: ["All", "Retail", "Dining", "Entertainment"],
    items: GENERIC_CARDS,
  },
];
// Note: /events now uses its own editorial template
// Events now live on a separate site at events.felixplaza.com.

export function getSection(slug: string) {
  return DIRECTORY_SECTIONS.find((s) => s.slug === slug);
}
