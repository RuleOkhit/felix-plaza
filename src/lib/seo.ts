// ---------------------------------------------------------------------------
// SEARCH ENGINES AND AI TOOLS
//
// Everything a crawler reads that a visitor never sees: page titles and
// descriptions, the one canonical address of each page, share previews, and
// structured data (JSON-LD) describing the mall, its stores and its events
// as facts. The facts themselves live in data/site.ts, data/stores.ts and
// data/events.ts, so they only ever need correcting in one place.
//
// Every URL here points at the live site (SITE.url), whichever copy is
// built. The GitHub Pages test copy is built with NOINDEX=1, which asks
// search engines to leave it out of their results entirely.
// ---------------------------------------------------------------------------

import type { Metadata } from "next";
import { SITE, SOCIAL_LINKS, BRAND } from "@/data/site";
import type { Store } from "@/data/stores";
import type { FelixEvent } from "@/data/events";

/** True for the test copy, which search engines are asked not to index. */
export const NOINDEX = process.env.NOINDEX === "1";

/**
 * Ownership codes from Google Search Console and Bing Webmaster Tools
 * (the "HTML tag" method: paste only the content="..." value). Empty until
 * the accounts are set up.
 */
export const VERIFICATION = { google: "", bing: "" };

/** Shared ids, so every page's structured data points at the same mall. */
export const MALL_ID = `${SITE.url}/#mall`;
const SITE_ID = `${SITE.url}/#website`;

/** The share image used wherever a page has none of its own. */
export const SHARE_IMAGE = { url: "/og/felix-plaza.jpg", width: 1200, height: 630, alt: "Felix Plaza, Sector 82A, Gurugram" };

/** Full address of a path on the live site, e.g. "/shop/" */
export function absolute(path: string) {
  return `${SITE.url}${path}`;
}

/** The address as one line: "NH 48, Sector 82A, Gurugram, Haryana 122012" */
export const ADDRESS_LINE = `${SITE.postal.street}, ${SITE.postal.locality}, ${SITE.postal.region} ${SITE.postal.postalCode}`;

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: SITE.postal.street,
  addressLocality: SITE.postal.locality,
  addressRegion: SITE.postal.region,
  postalCode: SITE.postal.postalCode,
  addressCountry: SITE.postal.country,
};

const GEO = { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng };

const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: SITE.open24.opens,
    closes: SITE.open24.closes,
  },
];

// Facilities, as listed on Plan Your Visit. Keep the two in step.
const AMENITIES = [
  "Three level car parking",
  "Two wheeler parking",
  "Valet parking",
  "EV charging",
  "Free wheelchairs",
  "Free baby prams",
  "Baby feeding room",
  "Accessible washrooms",
  "First aid and medical room",
  "Ambulance service",
  "Lost and found",
  "Free WiFi",
  "Clothes tailoring",
];

// ----------------------------------------------------------------- metadata

type PageMeta = {
  /** Shown in the browser tab and as the search result's headline */
  title: string;
  /** Used as is, without " | Felix Plaza" added after it */
  absoluteTitle?: boolean;
  /** The search result's summary, ideally under 160 characters */
  description: string;
  /** The page's path with its trailing slash, e.g. "/shop/adidas/" */
  path: string;
  /** A share image of the page's own, path from /public */
  image?: { url: string; width: number; height: number; alt?: string };
};

/**
 * A page's title, description, canonical address and share preview. Next
 * replaces (rather than merges) the share preview of the layout, so every
 * field is filled in here.
 */
export function pageMetadata({ title, absoluteTitle, description, path, image }: PageMeta): Metadata {
  const shareTitle = absoluteTitle ? title : `${title} | ${SITE.name}`;
  const images = [image ?? SHARE_IMAGE];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_IN",
      url: path,
      title: shareTitle,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: images.map((i) => i.url) },
  };
}

// ---------------------------------------------------------- structured data

/** The mall: what it is, where, when it is open, how to reach it. */
export function mallJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ShoppingCenter",
    "@id": MALL_ID,
    name: SITE.name,
    alternateName: ["Felix Plaza Mall", "Felix Plaza Gurugram"],
    description: `${SITE.name} is a shopping mall on NH 48 in Sector 82A, Gurugram, with ${SITE.storeCount} stores, a food court, a Cinépolis cinema and a 2-acre outdoor garden. It is fully air-conditioned.`,
    url: `${SITE.url}/`,
    logo: absolute(BRAND.logo),
    image: absolute(SHARE_IMAGE.url),
    telephone: SITE.phoneLink,
    email: SITE.email,
    address: POSTAL_ADDRESS,
    geo: GEO,
    hasMap: SITE.mapsUrl,
    openingHoursSpecification: OPENING_HOURS,
    publicAccess: true,
    isAccessibleForFree: true,
    amenityFeature: AMENITIES.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    sameAs: SOCIAL_LINKS.map((s) => s.href),
  };
}

/** The website itself, published by the mall. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE.name,
    url: `${SITE.url}/`,
    inLanguage: "en-IN",
    publisher: { "@id": MALL_ID },
  };
}

// The closest schema.org type for each store category.
const STORE_TYPES: Record<string, string> = {
  Apparel: "ClothingStore",
  "Ethnic Wear": "ClothingStore",
  Sportswear: "ClothingStore",
  Lingerie: "ClothingStore",
  Kids: "ClothingStore",
  Footwear: "ShoeStore",
  Jewellery: "JewelryStore",
  Watches: "JewelryStore",
  Eyewear: "Optician",
  "Beauty & Skincare": "HealthAndBeautyBusiness",
  Salon: "BeautySalon",
  "Home & Lifestyle": "HomeGoodsStore",
  "Mobile & Electronics": "ElectronicsStore",
  "Books & Stationery": "BookStore",
  "Food Court": "FastFoodRestaurant",
  Restaurant: "Restaurant",
  "Café": "CafeOrCoffeeShop",
};

function storeType(store: Store) {
  if (store.slug === "cinepolis") return "MovieTheater";
  if (store.section === "entertain") return "EntertainmentBusiness";
  return STORE_TYPES[store.category] ?? (store.section === "dine" ? "Restaurant" : "Store");
}

/** A store, placed inside the mall, on its floor. */
export function storeJsonLd(store: Store) {
  const url = absolute(`/${store.section}/${store.slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": storeType(store),
    "@id": `${url}#store`,
    name: store.name,
    url,
    description: store.description || undefined,
    image: absolute(store.logo),
    logo: absolute(store.logo),
    address: POSTAL_ADDRESS,
    geo: GEO,
    openingHoursSpecification: OPENING_HOURS,
    telephone: store.phone,
    email: store.email,
    containedInPlace: { "@id": MALL_ID },
    // Where in the mall, in plain words.
    additionalProperty: { "@type": "PropertyValue", name: "Floor", value: store.floorName },
  };
}

/** An event at the mall. Only events with confirmed dates are described. */
export function eventJsonLd(event: FelixEvent) {
  if (!event.dates) return null;
  const url = absolute(`/events/${event.slug}/`);
  const images = [event.poster.landscape, event.poster.portrait].filter(Boolean).map((a) => absolute(a!.src));
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${url}#event`,
    name: event.title,
    description: [event.summary, ...event.description].join(" "),
    url,
    image: images.length ? images : undefined,
    startDate: event.dates.start,
    endDate: event.dates.end ?? event.dates.start,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "ShoppingCenter",
      "@id": MALL_ID,
      name: SITE.name,
      address: POSTAL_ADDRESS,
    },
    organizer: { "@type": "Organization", name: SITE.name, url: `${SITE.url}/` },
  };
}

/** Questions and answers, as shown on the page they sit on. */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** The trail from the home page to this one, e.g. Home › Shop › ADIDAS. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: absolute(t.path),
    })),
  };
}

// ------------------------------------------------------- page-type metadata

const HOURS_LINE = "Open daily, 11 AM to 10 PM.";

/** A store page: what it is, which floor, and that it is at Felix Plaza. */
export function storeMetadata(store: Store): Metadata {
  return pageMetadata({
    title: `${store.name} at Felix Plaza, Gurugram`,
    absoluteTitle: true,
    description: [store.description, `${store.floorName}, Felix Plaza, Sector 82A, Gurugram.`, HOURS_LINE]
      .filter(Boolean)
      .join(" "),
    path: `/${store.section}/${store.slug}/`,
  });
}

/** An event page, shared with its own poster. */
export function eventMetadata(event: FelixEvent): Metadata {
  const art = event.poster.landscape ?? event.poster.portrait;
  return pageMetadata({
    title: `${event.title} at Felix Plaza, Gurugram`,
    absoluteTitle: true,
    description: `${event.summary} ${event.when}, Felix Plaza, Sector 82A, Gurugram.`,
    path: `/events/${event.slug}/`,
    image: art ? { url: art.src, width: art.width, height: art.height, alt: `${event.title}, ${event.when}` } : undefined,
  });
}
