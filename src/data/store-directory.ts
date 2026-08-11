// ---------------------------------------------------------------------------
// Full store directory, taken from the supplied brand list.
// Names are kept in the exact spelling and capitalisation provided.
//   darkTile    — the supplied logo is a white knockout, so its tile is
//                 rendered on the dark brand colour instead of white.
//   logoPending — no artwork supplied yet; showing a temporary text
//                 wordmark. Drop the real file into public/images/logos,
//                 point `image` at it and remove this flag.
// ---------------------------------------------------------------------------

export type DirectoryBrand = {
  name: string;
  image: string;
  darkTile?: boolean;
  logoPending?: boolean;
};

const LOGO_DIR = "/images/logos/";

export const SHOP_DIRECTORY: DirectoryBrand[] = [
  { name: "ADIDAS", image: LOGO_DIR + "adidas.webp" },
  { name: "ALDO", image: LOGO_DIR + "aldo.webp" },
  { name: "AMERICAN TOURISTER", image: LOGO_DIR + "american-tourister.webp" },
  { name: "ARETTO", image: LOGO_DIR + "aretto.webp" },
  { name: "ARROW", image: LOGO_DIR + "arrow.webp" },
  { name: "ASICS", image: LOGO_DIR + "asics.webp" },
  { name: "BABYSHOP", image: LOGO_DIR + "babyshop.webp" },
  { name: "BARARA ETHNIC", image: LOGO_DIR + "barara-ethnic.svg", logoPending: true },
  { name: "BATH & BODY WORKS", image: LOGO_DIR + "bath-and-body-works.webp" },
  { name: "BIBA", image: LOGO_DIR + "biba.webp" },
  { name: "BIRKENSTOCK", image: LOGO_DIR + "birkenstock.webp" },
  { name: "BLACKBERRYS", image: LOGO_DIR + "blackberrys.webp" },
  { name: "BLUESTONE", image: LOGO_DIR + "bluestone.svg" },
  { name: "BONKERS CORNER", image: LOGO_DIR + "bonkers-corner.webp", darkTile: true },
  { name: "CALVIN KLEIN", image: LOGO_DIR + "calvin-klein.webp" },
  { name: "CARATLANE", image: LOGO_DIR + "caratlane.svg" },
  { name: "CROCS", image: LOGO_DIR + "crocs.webp" },
  { name: "ETHERA", image: LOGO_DIR + "ethera.webp" },
  { name: "FOREST ESSENTIALS", image: LOGO_DIR + "forest-essentials.webp" },
  { name: "FRIDO", image: LOGO_DIR + "frido.webp" },
  { name: "GEETANJALI SALON", image: LOGO_DIR + "geetanjali-salon.webp" },
  { name: "GIVA", image: LOGO_DIR + "giva.webp" },
  { name: "GO COLORS", image: LOGO_DIR + "go-colors.webp" },
  { name: "H&M", image: LOGO_DIR + "h-and-m.webp" },
  { name: "HAPPYNEST", image: LOGO_DIR + "happynest.svg", logoPending: true },
  { name: "HELIOS", image: LOGO_DIR + "helios.webp" },
  { name: "HIDESIGN", image: LOGO_DIR + "hidesign.svg" },
  { name: "INC.5", image: LOGO_DIR + "inc5.webp" },
  { name: "LEVI'S", image: LOGO_DIR + "levis.webp" },
  { name: "LIBAS", image: LOGO_DIR + "libas.svg" },
  { name: "LIFESTYLE", image: LOGO_DIR + "lifestyle.webp" },
  { name: "LIMELIGHT", image: LOGO_DIR + "limelight.webp" },
  { name: "LOUIS PHILIPPE", image: LOGO_DIR + "louis-philippe.webp" },
  { name: "MADAME", image: LOGO_DIR + "madame.webp" },
  { name: "MARKET99", image: LOGO_DIR + "market99.webp" },
  { name: "MARKS & SPENCER", image: LOGO_DIR + "marks-and-spencer.webp" },
  { name: "MAX", image: LOGO_DIR + "max.svg" },
  { name: "MEENA BAZAAR", image: LOGO_DIR + "meena-bazaar.webp" },
  { name: "MINISO", image: LOGO_DIR + "miniso.webp" },
  { name: "MOCHI", image: LOGO_DIR + "mochi.webp" },
  { name: "MR. D.I.Y.", image: LOGO_DIR + "mr-diy.webp" },
  { name: "NYKAA LUXE", image: LOGO_DIR + "nykaa-luxe.svg", logoPending: true },
  { name: "NYKD BY NYKAA", image: LOGO_DIR + "nykd-by-nykaa.webp" },
  { name: "OM BOOK SHOP", image: LOGO_DIR + "om-book-shop.webp" },
  { name: "PALMONAS", image: LOGO_DIR + "palmonas.webp" },
  { name: "PEPE JEANS", image: LOGO_DIR + "pepe-jeans.webp" },
  { name: "PUMA", image: LOGO_DIR + "puma.webp" },
  { name: "R&B", image: LOGO_DIR + "r-and-b.webp" },
  { name: "RARE RABBIT", image: LOGO_DIR + "rare-rabbit.webp" },
  { name: "RAREISM", image: LOGO_DIR + "rareism.webp" },
  { name: "RUNWAY", image: LOGO_DIR + "runway.svg" },
  { name: "SABHYATA", image: LOGO_DIR + "sabhyata.webp" },
  { name: "SAFARI", image: LOGO_DIR + "safari.webp" },
  { name: "SAMSONITE", image: LOGO_DIR + "samsonite.webp" },
  { name: "SAMSUNG", image: LOGO_DIR + "samsung.webp" },
  { name: "SKECHERS", image: LOGO_DIR + "skechers.webp" },
  { name: "SKINBAE", image: LOGO_DIR + "skinbae.webp" },
  { name: "SNITCH", image: LOGO_DIR + "snitch.webp" },
  { name: "STYLE UNION", image: LOGO_DIR + "style-union.svg" },
  { name: "TASVA", image: LOGO_DIR + "tasva.webp" },
  { name: "THE BEAR HOUSE", image: LOGO_DIR + "the-bear-house.svg" },
  { name: "THE SLEEP COMPANY", image: LOGO_DIR + "the-sleep-company.webp" },
  { name: "TISSOT", image: LOGO_DIR + "tissot.webp" },
  { name: "TISSOT MBO", image: LOGO_DIR + "tissot-mbo.webp" },
  { name: "TOMMY HILFIGER", image: LOGO_DIR + "tommy-hilfiger.webp" },
  { name: "U.S. POLO ASSN.", image: LOGO_DIR + "us-polo-assn.webp" },
  { name: "WAKEFIT", image: LOGO_DIR + "wakefit.svg" },
  { name: "WESTSIDE", image: LOGO_DIR + "westside.svg" },
  { name: "ZUDIO", image: LOGO_DIR + "zudio.webp", darkTile: true },
];

export const DINE_DIRECTORY: DirectoryBrand[] = [
  { name: "AMRITSARI EXPRESS", image: LOGO_DIR + "amritsari-express.webp" },
  { name: "BLUE TOKAI", image: LOGO_DIR + "blue-tokai.webp" },
  { name: "BURGER KING", image: LOGO_DIR + "burger-king.svg" },
  { name: "CAFÉ CHENNAI", image: LOGO_DIR + "cafe-chennai.webp" },
  { name: "CHAAYOS", image: LOGO_DIR + "chaayos.webp" },
  { name: "HALDIRAM'S", image: LOGO_DIR + "haldirams.webp" },
  { name: "KEVENTERS", image: LOGO_DIR + "keventers.webp" },
  { name: "KFC", image: LOGO_DIR + "kfc.webp" },
  { name: "TACO BELL", image: LOGO_DIR + "taco-bell.webp" },
  { name: "THE INDIAN STORIES", image: LOGO_DIR + "the-indian-stories.webp" },
  { name: "THIRD WAVE COFFEE", image: LOGO_DIR + "third-wave-coffee.webp" },
  { name: "TONIQ", image: LOGO_DIR + "toniq.webp" },
  { name: "WOW! CHINA", image: LOGO_DIR + "wow-china.webp" },
  { name: "WOW! KULFI", image: LOGO_DIR + "wow-kulfi.webp" },
  { name: "WOW! MOMO", image: LOGO_DIR + "wow-momo.webp" },
];
