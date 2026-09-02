// ---------------------------------------------------------------------------
// STORE DIRECTORY — generated from the mall's data.js (the source of truth).
// Names, floors and categories are reproduced exactly as they appear there.
// Logos come from the "Final Store Infos" artwork, trimmed and normalised.
//
// To change a store, edit data.js and re-import; do not hand-edit names here
// or the two will drift apart.
//
//   cat       category key, matched against the filter lists below
//   floors    one or more of con | gf | 1f | 2f | 3f
//   knockout  logo is white-on-transparent, so its tile renders dark
//   icon      inline SVG body for the filter chip, taken from data.js
// ---------------------------------------------------------------------------

export type DirectoryStore = {
  name: string;
  slug: string;
  cat: string;
  floors: string[];
  logo: string;
  knockout?: boolean;
  /** The artwork's own background colour, so a panel can match it. */
  bg?: string;
};

export type CategoryFilter = { key: string; label: string; icon: string };

/* Floors, in building order. */
export const FLOOR_LABELS: Record<string, { short: string; name: string }> = {
  con: { short: "CC", name: "Concourse" },
  gf: { short: "GF", name: "Ground Floor" },
  "1f": { short: "1F", name: "First Floor" },
  "2f": { short: "2F", name: "Second Floor" },
  "3f": { short: "3F", name: "Third Floor" },
};

export function floorShort(floors: string[]) {
  return floors.map((f) => FLOOR_LABELS[f]?.short ?? f.toUpperCase()).join(" · ");
}

/* Friendly names for each category key, used on store pages. */
export const CATEGORY_LABELS: Record<string, string> = {
  apparel: "Apparel", ethnic: "Ethnic Wear", footwear: "Footwear",
  sportswear: "Sportswear", food: "Food Court", restaurants: "Restaurant",
  cafe: "Café", jewellery: "Jewellery", watches: "Watches",
  eyewear: "Eyewear", beauty: "Beauty & Skincare", salon: "Salon",
  kids: "Kids", home: "Home & Lifestyle", bags: "Bags & Accessories",
  mobile: "Mobile & Electronics", books: "Books & Stationery",
  entertainment: "Entertainment", lingerie: "Lingerie",
};

/* Filters. "All" is prepended by the UI. */
export const SHOP_FILTERS: CategoryFilter[] = [
  { key: "apparel", label: "Apparel", icon: "<path d=\"M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46l-2 5.5L5 10v12h14V10l3.38-1.04-2-5.5z\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linejoin=\"round\"/>" },
  { key: "ethnic", label: "Ethnic", icon: "<path d=\"M9 3l3 2 3-2 2 4-2 2v11H7V9L5 7l4-4z\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linejoin=\"round\"/>" },
  { key: "footwear", label: "Footwear", icon: "<path d=\"M2 15c0-2 1.5-3.5 4-4l3-1.5V6a2 2 0 0 1 4 0v3.5l5 1c2 .5 4 2 4 4v1H2v-1z\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linejoin=\"round\"/>" },
  { key: "sportswear", label: "Sportswear", icon: "<circle cx=\"12\" cy=\"5\" r=\"2\" stroke=\"currentColor\" stroke-width=\"1.4\"/><path d=\"M6 14l3-6h6l1 4-4 1v5\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M9 22l-2-4\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/>" },
  { key: "jewellery", label: "Jewelry", icon: "<path d=\"M6 3h12l3 6-9 12L3 9l3-6z\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linejoin=\"round\"/><path d=\"M3 9h18M8 3l-2 6M16 3l2 6\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/>" },
  { key: "watches", label: "Watches", icon: "<circle cx=\"12\" cy=\"12\" r=\"7\" stroke=\"currentColor\" stroke-width=\"1.4\"/><path d=\"M12 8.5v4l2.5 1.5\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M9 2h6M9 22h6\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/>" },
  { key: "eyewear", label: "Eyewear", icon: "<circle cx=\"6.5\" cy=\"13.5\" r=\"4\" stroke=\"currentColor\" stroke-width=\"1.4\"/><circle cx=\"17.5\" cy=\"13.5\" r=\"4\" stroke=\"currentColor\" stroke-width=\"1.4\"/><path d=\"M10.5 12.5h3M2 12l1.7-3M22 12l-1.7-3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/>" },
  { key: "beauty", label: "Beauty", icon: "<path d=\"M12 2c2.5 4 5 7 5 11a5 5 0 1 1-10 0c0-4 2.5-7 5-11z\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linejoin=\"round\"/>" },
  { key: "salon", label: "Salon", icon: "<path d=\"M6 3c0 5 4 7 4 11a2 2 0 0 1-4 0M18 3c0 5-4 7-4 11a2 2 0 0 0 4 0M6 21h12\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/>" },
  { key: "kids", label: "Kids", icon: "<circle cx=\"12\" cy=\"6\" r=\"3\" stroke=\"currentColor\" stroke-width=\"1.4\"/><path d=\"M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/>" },
  { key: "home", label: "Home", icon: "<path d=\"M4 11.5L12 4l8 7.5\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M6 10v10h12V10\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linejoin=\"round\"/>" },
  { key: "bags", label: "Bags", icon: "<rect x=\"3\" y=\"8\" width=\"18\" height=\"13\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"1.4\"/><path d=\"M8 8V6a4 4 0 0 1 8 0v2\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/>" },
  { key: "mobile", label: "Mobile", icon: "<rect x=\"6\" y=\"2\" width=\"12\" height=\"20\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"1.4\"/><circle cx=\"12\" cy=\"17.5\" r=\"1\" fill=\"currentColor\"/>" },
  { key: "books", label: "Books", icon: "<path d=\"M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 1 0-4h14\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" },
  { key: "lingerie", label: "Lingerie", icon: "<path d=\"M12 6c-2 0-4 1.5-5 3.5C6 11.5 5 13 5 15a7 7 0 0 0 14 0c0-2-1-3.5-2-5.5C16 7.5 14 6 12 6z\" stroke=\"currentColor\" stroke-width=\"1.4\"/>" },
];

export const DINE_FILTERS: CategoryFilter[] = [
  { key: "food", label: "Food Court", icon: "<path d=\"M3 2v7c0 2.2 1.8 4 4 4v9M14 2v20M20 2c0 3-2 5-2 5v13\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" },
  { key: "restaurants", label: "Restaurant", icon: "<circle cx=\"12\" cy=\"6\" r=\"1\" fill=\"currentColor\"/><path d=\"M4 17a8 8 0 0 1 16 0\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linejoin=\"round\"/><path d=\"M2.5 17h19M6 20.5h12\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/>" },
  { key: "cafe", label: "Cafe", icon: "<path d=\"M5 3h11v9a4 4 0 0 1-8 0V3M2 21h16\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M16 5h2a2 2 0 0 1 0 4h-2\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/>" },
];

/* 77 stores — food, cafés, restaurants and entertainment excluded. */
export const SHOP_STORES: DirectoryStore[] = [
  { name: "ADIDAS", slug: "adidas", cat: "sportswear", floors: ["1f"], logo: "/images/logos/adidas.webp" },
  { name: "ALDO", slug: "aldo", cat: "footwear", floors: ["gf"], logo: "/images/logos/aldo.webp" },
  { name: "AMERICAN TOURISTER", slug: "american-tourister", cat: "bags", floors: ["con"], logo: "/images/logos/american-tourister.webp" },
  { name: "ARETTO", slug: "aretto", cat: "kids", floors: ["2f"], logo: "/images/logos/aretto.webp" },
  { name: "ARROW", slug: "arrow", cat: "apparel", floors: ["1f"], logo: "/images/logos/arrow.webp" },
  { name: "ASICS", slug: "asics", cat: "sportswear", floors: ["1f"], logo: "/images/logos/asics.webp" },
  { name: "BABYSHOP", slug: "babyshop", cat: "kids", floors: ["2f"], logo: "/images/logos/babyshop.webp" },
  { name: "BARARA ETHNIC", slug: "barara-ethnic", cat: "ethnic", floors: ["2f"], logo: "/images/logos/barara-ethnic.webp" },
  { name: "BATH & BODY WORKS", slug: "bath-and-body-works", cat: "beauty", floors: ["gf"], logo: "/images/logos/bath-and-body-works.webp" },
  { name: "BIBA", slug: "biba", cat: "ethnic", floors: ["2f"], logo: "/images/logos/biba.webp" },
  { name: "BIRKENSTOCK", slug: "birkenstock", cat: "footwear", floors: ["gf"], logo: "/images/logos/birkenstock.webp" },
  { name: "BLACKBERRYS", slug: "blackberrys", cat: "apparel", floors: ["1f"], logo: "/images/logos/blackberrys.webp" },
  { name: "BLUESTONE", slug: "bluestone", cat: "jewellery", floors: ["gf"], logo: "/images/logos/bluestone.webp" },
  { name: "BONKERS CORNER", slug: "bonkers-corner", cat: "apparel", floors: ["1f"], logo: "/images/logos/bonkers-corner.webp" },
  { name: "CALVIN KLEIN", slug: "calvin-klein", cat: "apparel", floors: ["gf"], logo: "/images/logos/calvin-klein.webp" },
  { name: "CARATLANE", slug: "caratlane", cat: "jewellery", floors: ["gf"], logo: "/images/logos/caratlane.webp" },
  { name: "CROCS", slug: "crocs", cat: "footwear", floors: ["1f"], logo: "/images/logos/crocs.webp" },
  { name: "DEVO", slug: "devo", cat: "ethnic", floors: ["2f"], logo: "/images/logos/devo.webp", bg: "#560103" },
  { name: "ETHERA", slug: "ethera", cat: "jewellery", floors: ["gf"], logo: "/images/logos/ethera.webp" },
  { name: "FOREST ESSENTIALS", slug: "forest-essentials", cat: "beauty", floors: ["gf"], logo: "/images/logos/forest-essentials.webp" },
  { name: "FRIDO", slug: "frido", cat: "home", floors: ["con"], logo: "/images/logos/frido.webp" },
  { name: "GEETANJALI SALON", slug: "geetanjali-salon", cat: "salon", floors: ["1f"], logo: "/images/logos/geetanjali-salon.webp" },
  { name: "GIVA", slug: "giva", cat: "jewellery", floors: ["gf"], logo: "/images/logos/giva.webp" },
  { name: "GO COLORS", slug: "go-colors", cat: "apparel", floors: ["2f"], logo: "/images/logos/go-colors.webp" },
  { name: "H&M", slug: "h-and-m", cat: "apparel", floors: ["gf","1f"], logo: "/images/logos/h-and-m.webp" },
  { name: "HAPPYNEST", slug: "happynest", cat: "home", floors: ["con"], logo: "/images/logos/happynest.webp", bg: "#597a65" },
  { name: "HELIOS", slug: "helios", cat: "watches", floors: ["gf"], logo: "/images/logos/helios.webp" },
  { name: "HIDESIGN", slug: "hidesign", cat: "bags", floors: ["gf"], logo: "/images/logos/hidesign.webp" },
  { name: "INC.5", slug: "inc5", cat: "footwear", floors: ["1f"], logo: "/images/logos/inc5.webp" },
  { name: "JACK & JONES", slug: "jack-and-jones", cat: "apparel", floors: ["gf"], logo: "/images/logos/jack-and-jones.webp" },
  { name: "LEVI'S", slug: "levis", cat: "apparel", floors: ["gf"], logo: "/images/logos/levis.webp" },
  { name: "LIBAS", slug: "libas", cat: "ethnic", floors: ["2f"], logo: "/images/logos/libas.webp" },
  { name: "LIFESTYLE", slug: "lifestyle", cat: "apparel", floors: ["gf","1f","2f"], logo: "/images/logos/lifestyle.webp" },
  { name: "LIMELIGHT", slug: "limelight", cat: "jewellery", floors: ["gf"], logo: "/images/logos/limelight.webp" },
  { name: "LOUIS PHILIPPE", slug: "louis-philippe", cat: "apparel", floors: ["1f"], logo: "/images/logos/louis-philippe.webp" },
  { name: "MADAME", slug: "madame", cat: "apparel", floors: ["1f"], logo: "/images/logos/madame.webp" },
  { name: "MARKET99", slug: "market99", cat: "home", floors: ["3f"], logo: "/images/logos/market99.webp" },
  { name: "MARKS & SPENCER", slug: "marks-and-spencer", cat: "apparel", floors: ["gf"], logo: "/images/logos/marks-and-spencer.webp" },
  { name: "MAX", slug: "max", cat: "apparel", floors: ["1f"], logo: "/images/logos/max.webp" },
  { name: "MEENA BAZAAR", slug: "meena-bazaar", cat: "ethnic", floors: ["2f"], logo: "/images/logos/meena-bazaar.webp" },
  { name: "MINISO", slug: "miniso", cat: "home", floors: ["1f"], logo: "/images/logos/miniso.webp" },
  { name: "MOCHI", slug: "mochi", cat: "footwear", floors: ["1f"], logo: "/images/logos/mochi.webp" },
  { name: "MR. D.I.Y.", slug: "mr-diy", cat: "home", floors: ["con"], logo: "/images/logos/mr-diy.webp" },
  { name: "NEW U", slug: "new-u", cat: "beauty", floors: ["con"], logo: "/images/logos/new-u.webp", bg: "#ec008b" },
  { name: "NYKAA LUXE", slug: "nykaa-luxe", cat: "beauty", floors: ["gf"], logo: "/images/logos/nykaa-luxe.webp" },
  { name: "NYKD BY NYKAA", slug: "nykd-by-nykaa", cat: "lingerie", floors: ["2f"], logo: "/images/logos/nykd-by-nykaa.webp", knockout: true },
  { name: "OM BOOK SHOP", slug: "om-book-shop", cat: "books", floors: ["2f"], logo: "/images/logos/om-book-shop.webp" },
  { name: "ONLY", slug: "only", cat: "apparel", floors: ["gf"], logo: "/images/logos/only.webp" },
  { name: "PALMONAS", slug: "palmonas", cat: "jewellery", floors: ["gf"], logo: "/images/logos/palmonas.webp" },
  { name: "PEPE JEANS", slug: "pepe-jeans", cat: "apparel", floors: ["1f"], logo: "/images/logos/pepe-jeans.webp" },
  { name: "PUMA", slug: "puma", cat: "sportswear", floors: ["1f"], logo: "/images/logos/puma.webp" },
  { name: "R&B", slug: "r-and-b", cat: "apparel", floors: ["1f"], logo: "/images/logos/r-and-b.webp" },
  { name: "RARE RABBIT", slug: "rare-rabbit", cat: "apparel", floors: ["gf"], logo: "/images/logos/rare-rabbit.webp" },
  { name: "RAREISM", slug: "rareism", cat: "apparel", floors: ["gf"], logo: "/images/logos/rareism.webp" },
  { name: "RUNWAY", slug: "runway", cat: "eyewear", floors: ["gf"], logo: "/images/logos/runway.webp" },
  { name: "SABHYATA", slug: "sabhyata", cat: "ethnic", floors: ["2f"], logo: "/images/logos/sabhyata.webp" },
  { name: "SAFARI", slug: "safari", cat: "bags", floors: ["con"], logo: "/images/logos/safari.webp" },
  { name: "SAMSONITE", slug: "samsonite", cat: "bags", floors: ["1f"], logo: "/images/logos/samsonite.webp" },
  { name: "SAMSUNG", slug: "samsung", cat: "mobile", floors: ["1f"], logo: "/images/logos/samsung.webp" },
  { name: "SKECHERS", slug: "skechers", cat: "sportswear", floors: ["1f"], logo: "/images/logos/skechers.webp" },
  { name: "SKINBAE", slug: "skinbae", cat: "beauty", floors: ["gf"], logo: "/images/logos/skinbae.webp" },
  { name: "SNITCH", slug: "snitch", cat: "apparel", floors: ["1f"], logo: "/images/logos/snitch.webp" },
  { name: "STYLE UNION", slug: "style-union", cat: "apparel", floors: ["con"], logo: "/images/logos/style-union.webp" },
  { name: "SWEET DREAMS", slug: "sweet-dreams", cat: "apparel", floors: ["2f"], logo: "/images/logos/sweet-dreams.webp" },
  { name: "TASVA", slug: "tasva", cat: "ethnic", floors: ["2f"], logo: "/images/logos/tasva.webp", bg: "#000000" },
  { name: "THE BEAR HOUSE", slug: "the-bear-house", cat: "apparel", floors: ["1f"], logo: "/images/logos/the-bear-house.webp", bg: "#ef4843" },
  { name: "THE SLEEP COMPANY", slug: "the-sleep-company", cat: "home", floors: ["con"], logo: "/images/logos/the-sleep-company.webp" },
  { name: "TISSOT", slug: "tissot", cat: "watches", floors: ["gf"], logo: "/images/logos/tissot.webp" },
  { name: "TISSOT MBO", slug: "tissot-mbo", cat: "watches", floors: ["gf"], logo: "/images/logos/tissot-mbo.webp" },
  { name: "TOMMY HILFIGER", slug: "tommy-hilfiger", cat: "apparel", floors: ["gf"], logo: "/images/logos/tommy-hilfiger.webp" },
  { name: "U.S. POLO ASSN.", slug: "us-polo-assn", cat: "apparel", floors: ["1f"], logo: "/images/logos/us-polo-assn.webp" },
  { name: "VAN HEUSEN", slug: "van-heusen", cat: "apparel", floors: ["1f"], logo: "/images/logos/van-heusen.webp" },
  { name: "VERO MODA", slug: "vero-moda", cat: "apparel", floors: ["gf"], logo: "/images/logos/vero-moda.webp" },
  { name: "VIVO", slug: "vivo", cat: "mobile", floors: ["con"], logo: "/images/logos/vivo.webp" },
  { name: "WAKEFIT", slug: "wakefit", cat: "home", floors: ["con"], logo: "/images/logos/wakefit.webp", bg: "#48338e" },
  { name: "WESTSIDE", slug: "westside", cat: "apparel", floors: ["gf"], logo: "/images/logos/westside.webp" },
  { name: "ZUDIO", slug: "zudio", cat: "apparel", floors: ["1f"], logo: "/images/logos/zudio.webp", bg: "#120417" },
];

/* 18 outlets. */
export const DINE_STORES: DirectoryStore[] = [
  { name: "AMRITSARI EXPRESS", slug: "amritsari-express", cat: "food", floors: ["3f"], logo: "/images/logos/amritsari-express.webp" },
  { name: "BLUE TOKAI", slug: "blue-tokai", cat: "cafe", floors: ["gf"], logo: "/images/logos/blue-tokai.webp" },
  { name: "BURGER KING", slug: "burger-king", cat: "food", floors: ["3f"], logo: "/images/logos/burger-king.webp" },
  { name: "CAFÉ CHENNAI", slug: "cafe-chennai", cat: "food", floors: ["3f"], logo: "/images/logos/cafe-chennai.webp" },
  { name: "CHAAYOS", slug: "chaayos", cat: "cafe", floors: ["1f"], logo: "/images/logos/chaayos.webp", bg: "#018c36" },
  { name: "GIANI ICE CREAM", slug: "giani-ice-cream", cat: "food", floors: ["3f"], logo: "/images/logos/giani-ice-cream.webp" },
  { name: "HALDIRAM'S", slug: "haldirams", cat: "food", floors: ["3f"], logo: "/images/logos/haldirams.webp" },
  { name: "HOUSE OF CANDY", slug: "house-of-candy", cat: "food", floors: ["3f"], logo: "/images/logos/house-of-candy.webp" },
  { name: "KEVENTERS", slug: "keventers", cat: "food", floors: ["3f"], logo: "/images/logos/keventers.webp", bg: "#000000" },
  { name: "KFC", slug: "kfc", cat: "food", floors: ["3f"], logo: "/images/logos/kfc.webp" },
  { name: "PUNJAB GRILL", slug: "punjab-grill", cat: "restaurants", floors: ["2f"], logo: "/images/logos/punjab-grill.webp" },
  { name: "TACO BELL", slug: "taco-bell", cat: "food", floors: ["3f"], logo: "/images/logos/taco-bell.webp" },
  { name: "THE INDIAN STORIES", slug: "the-indian-stories", cat: "food", floors: ["3f"], logo: "/images/logos/the-indian-stories.webp" },
  { name: "THIRD WAVE COFFEE", slug: "third-wave-coffee", cat: "cafe", floors: ["1f"], logo: "/images/logos/third-wave-coffee.webp" },
  { name: "TONIQ", slug: "toniq", cat: "food", floors: ["3f"], logo: "/images/logos/toniq.webp" },
  { name: "WOW! CHINA", slug: "wow-china", cat: "food", floors: ["3f"], logo: "/images/logos/wow-china.webp" },
  { name: "WOW! KULFI", slug: "wow-kulfi", cat: "food", floors: ["3f"], logo: "/images/logos/wow-kulfi.webp" },
  { name: "WOW! MOMO", slug: "wow-momo", cat: "food", floors: ["3f"], logo: "/images/logos/wow-momo.webp" },
];

/* 4 venues — too few to need filtering. */
export const ENTERTAINMENT_STORES: DirectoryStore[] = [
  { name: "CINÉPOLIS", slug: "cinepolis", cat: "entertainment", floors: ["3f"], logo: "/images/logos/cinepolis.webp" },
  { name: "FUN BLOCK", slug: "fun-block", cat: "entertainment", floors: ["2f"], logo: "/images/logos/fun-block.webp", bg: "#ffffff" },
  { name: "FUNCITY", slug: "funcity", cat: "entertainment", floors: ["3f"], logo: "/images/logos/funcity.webp", bg: "#4d3873" },
  { name: "GAME X", slug: "game-x", cat: "entertainment", floors: ["2f"], logo: "/images/logos/game-x.webp", bg: "#030306" },
];
