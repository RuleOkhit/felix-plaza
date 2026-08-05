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
  email: "info@felixrealty.com",
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

export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Dine", href: "/dine" },
  { label: "Entertain", href: "/entertain" },
  { label: "Offers", href: "/offers" },
  { label: "Events", href: "/events" },
];

export const FOOTER_INFO_LINKS: NavLink[] = [
  { label: "About Us", href: "/plan-your-visit" },
  { label: "Plan Your Visit", href: "/plan-your-visit" },
  { label: "Careers", href: "/plan-your-visit" },
  { label: "Media Centre", href: "/plan-your-visit" },
  { label: "Contact Us", href: "/plan-your-visit" },
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

// Hero slider photography (shot at Felix Plaza).
export const HERO_IMG = {
  shop: "/images/hero/hero-shop.jpg",
  dine: "/images/hero/hero-dine.jpg",
  entertain: "/images/hero/hero-entertain.jpg",
  unwind: "/images/hero/hero-unwind.jpg",
} as const;

// Tenant logos (transparent PNG / SVG, displayed contained on a light tile).
// To add a brand: drop the file in public/images/logos and add it here.
export const LOGO = {
  hm: "/images/logos/hm.png",
  westside: "/images/logos/westside.png",
  calvinKlein: "/images/logos/calvin-klein.png",
  marksSpencer: "/images/logos/marks-spencer.png",
  lifestyle: "/images/logos/lifestyle.png",
  adidas: "/images/logos/adidas.png",
  tommyHilfiger: "/images/logos/tommy-hilfiger.png",
  haldirams: "/images/logos/haldirams.png",
  burgerKing: "/images/logos/burger-king.png",
  kfc: "/images/logos/kfc.png",
  tacoBell: "/images/logos/taco-bell.png",
  cinepolis: "/images/logos/cinepolis.png",
  // Placeholder wordmarks — swap for the real logos when supplied.
  funcity: "/images/logos/funcity.svg",
  gameX: "/images/logos/game-x.svg",
} as const;
