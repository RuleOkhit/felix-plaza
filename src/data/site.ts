// ---------------------------------------------------------------------------
// Global site configuration — the single place to change brand-level details.
// ---------------------------------------------------------------------------

export const SITE = {
  name: "Felix Plaza",
  tagline: "Shopping, Dining and Entertainment in Gurugram",
  description: "Shop. Dine. Unwind. It’s All About the Vibe.",
  phone: "+91 93557 78800",
  phoneLink: "+919355778800", // tel: href (digits only, with country code)
  whatsapp: "919355778800", // wa.me path (no +, no spaces)
  email: "info.desk@felixrealty.com",
  address: "NH-48, Sector 82A, Gurugram",
  hours: "11:00 AM to 10:00 PM",
  mapsUrl: "https://maps.app.goo.gl/4qgFhVqp1fYWG3KQ7",
};

// Builds a WhatsApp deep link, optionally pre-filling the first message.
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// The Felix Plaza lockup, extracted from the supplied vector artwork.
// Two colourways: brand purple for light surfaces, white for dark ones.
export const BRAND = {
  logo: "/images/logo-felix-plaza.png",
  logoWhite: "/images/logo-felix-plaza-white.png",
  logoWidth: 700,
  logoHeight: 528,
  // The standalone geometric mark, used as an avatar/badge.
  insignia: "/images/insignia-felix.webp",
  insigniaWidth: 256,
  insigniaHeight: 244,
};

export type NavLink = {
  label: string;
  href: string;
  /** Lives on another domain, so it opens in a new tab. */
  external?: boolean;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Dine", href: "/dine" },
  { label: "Entertain", href: "/entertain" },
  // Offers is parked for now: the page still exists under src/app/_offers
  // (an underscore folder is invisible to the router) and comes back by
  // renaming the folder and restoring this line.
  { label: "Events", href: "https://events.felixplaza.com/", external: true },
  { label: "Plan Your Visit", href: "/plan-your-visit" },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "X", href: "#", icon: "x" },
  { label: "YouTube", href: "#", icon: "youtube" },
] as const;

// Placeholder imagery. Swap these paths (or the files themselves) for real
// photography; per-store logos can point at their own files instead.
export const IMG = {
  hero: "/images/placeholder-hero.svg",
  squareA: "/images/placeholder-square-a.svg",
  squareB: "/images/placeholder-square-b.svg",
  wide: "/images/placeholder-wide.svg",
  banner: "/images/placeholder-banner.svg",
} as const;

export type ImgKey = keyof typeof IMG;

// Hero slider backgrounds. TEMPORARY: brand-coloured abstract artwork
// (generated at 2560x1440, one mood per slide, with the Felix insignia as
// a faint motif). Swap these files for real photography when it is shot —
// the paths and sizes stay the same. See IMAGE-SPEC.md for the brief.
export const HERO_IMG = {
  shop: "/images/hero/hero-shop.webp",
  dine: "/images/hero/hero-dine.webp",
  entertain: "/images/hero/hero-entertain.webp",
  unwind: "/images/hero/hero-unwind.webp",
} as const;

// Inner-page banner photography. Each entry carries the object-position its
// own composition needs: these are wide letterbox frames cut from squarer
// photographs, so a plain centre crop clips the subject.
export const BANNER = {
  shop: { src: "/images/banners/shop.webp", focus: "58% 44%" },
  dine: { src: "/images/banners/dine.webp", focus: "50% 50%" },
  entertain: { src: "/images/banners/entertain.webp", focus: "50% 38%" },
  visit: { src: "/images/banners/plan-your-visit.webp", focus: "62% 48%" },
} as const;

// Tenant logos (transparent PNG / SVG, displayed contained on a light tile).
// To add a brand: drop the file in public/images/logos and add it here.
export const LOGO = {
  hm: "/images/logos/h-and-m.webp",
  westside: "/images/logos/westside.webp",
  calvinKlein: "/images/logos/calvin-klein.webp",
  marksSpencer: "/images/logos/marks-and-spencer.webp",
  lifestyle: "/images/logos/lifestyle.webp",
  adidas: "/images/logos/adidas.webp",
  tommyHilfiger: "/images/logos/tommy-hilfiger.webp",
  haldirams: "/images/logos/haldirams.webp",
  burgerKing: "/images/logos/burger-king.webp",
  kfc: "/images/logos/kfc.webp",
  tacoBell: "/images/logos/taco-bell.webp",
  cinepolis: "/images/logos/cinepolis.webp",
  funcity: "/images/logos/funcity.webp",
  gameX: "/images/logos/game-x.webp",
} as const;
