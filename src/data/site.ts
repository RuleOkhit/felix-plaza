// ---------------------------------------------------------------------------
// Global site configuration — the single place to change brand-level details.
// ---------------------------------------------------------------------------

export const SITE = {
  name: "Felix Plaza",
  tagline: "Shopping, Dining & Entertainment in Gurugram",
  description: "Shop. Dine. Unwind. It’s All About the Vibe.",
  phone: "+91 93557 78800",
  phoneLink: "+919355778800", // tel: href (digits only, with country code)
  whatsapp: "919355778800", // wa.me path (no +, no spaces)
  email: "info.desk@felixrealty.com",
  address: "NH-48, Sector 82A, Gurugram",
  hours: "11:00 AM – 10:00 PM",
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

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Dine", href: "/dine" },
  { label: "Entertain", href: "/entertain" },
  { label: "Offers", href: "/offers" },
  { label: "Events", href: "/events" },
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

// Tenant logos (transparent PNG / SVG, displayed contained on a light tile).
// To add a brand: drop the file in public/images/logos and add it here.
export const LOGO = {
  hm: "/images/logos/h-and-m.webp",
  westside: "/images/logos/westside.svg",
  calvinKlein: "/images/logos/calvin-klein.webp",
  marksSpencer: "/images/logos/marks-and-spencer.webp",
  lifestyle: "/images/logos/lifestyle.webp",
  adidas: "/images/logos/adidas.webp",
  tommyHilfiger: "/images/logos/tommy-hilfiger.webp",
  haldirams: "/images/logos/haldirams.webp",
  burgerKing: "/images/logos/burger-king.svg",
  kfc: "/images/logos/kfc.webp",
  tacoBell: "/images/logos/taco-bell.webp",
  cinepolis: "/images/logos/cinepolis.webp",
  funcity: "/images/logos/funcity.webp",
  // Placeholder wordmarks — swap for the real logos when supplied.
  gameX: "/images/logos/game-x.svg",
  atlasSupply: "/images/logos/atlas-supply.svg",
} as const;
