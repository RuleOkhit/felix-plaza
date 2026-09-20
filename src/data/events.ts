// ---------------------------------------------------------------------------
// EVENTS
//
// One entry per event. The events page groups them by month and every entry
// gets its own page at /events/<slug>.
//
// Artwork: each event can have a tall creative (portrait, usually 9:16) and a
// wide one (landscape, usually 16:9). Drop the files in
// public/images/events/<slug>/ and list them below with their pixel size;
// cards and frames take their shape from the real proportions, so a 3:4
// poster or an extra wide banner is shown whole rather than squeezed.
// Anything left out is drawn as a placeholder poster in the event's colours.
// `video` plays at the top of the event page; `gallery` is the photo spread
// under the text. `galleryPlaceholders` holds slots open for photos to come.
//
// Real artwork so far: Naruto, Felix Fun Club and Moments With MoM. Copy for
// the other events is placeholder text, to be replaced when it is supplied.
// ---------------------------------------------------------------------------

export type EventTheme = {
  /** Gradient used for placeholder artwork and accents */
  from: string;
  to: string;
};

export type EventFact = { label: string; value: string };

/** An image file and its size in pixels. */
export type Art = { src: string; width: number; height: number };

export type FelixEvent = {
  slug: string;
  title: string;
  /** Second line under the title, where the event has one */
  subtitle?: string;
  /** "2026-09" style, or null while the dates are still to be announced */
  month: string | null;
  /** How the date reads on cards and on the event page */
  when: string;
  /** One line for the cards */
  summary: string;
  /** Paragraphs for the event page */
  description: string[];
  facts: EventFact[];
  theme: EventTheme;
  poster: { portrait?: Art; landscape?: Art };
  video?: string;
  gallery?: Art[];
  /** Empty photo slots to show until the photos arrive */
  galleryPlaceholders?: number;
  /** Whether the placeholder artwork should include a 16:9 version */
  placeholderLandscape?: boolean;
};

const WHERE: EventFact = { label: "Where", value: "Felix Plaza, Sector 82A, Gurugram" };

export const EVENTS: FelixEvent[] = [
  {
    slug: "naruto",
    title: "Naruto Meet & Greet",
    subtitle: "The Ultimate Shinobi Experience",
    month: "2026-09",
    when: "25–27 September 2026",
    summary: "Three days of workshops, games, self defence and challenges for young shinobi.",
    description: [
      "Felix Plaza presents The Ultimate Shinobi Experience, a Naruto meet and greet in association with Crunchyroll and Sony YAY!.",
      "Across the three days there are workshops, fun games, self defence sessions and exciting challenges for young fans and their families.",
      "Timings and entry details will be shared closer to the event.",
    ],
    facts: [
      { label: "When", value: "25–27 September 2026" },
      WHERE,
      { label: "Presented with", value: "Crunchyroll and Sony YAY!" },
      { label: "Highlights", value: "Workshops, fun games, self defence, exciting challenges" },
    ],
    theme: { from: "#ff7a1a", to: "#d91e3c" },
    poster: {
      portrait: { src: "/images/events/naruto/portrait.webp", width: 1080, height: 1920 },
      landscape: { src: "/images/events/naruto/landscape.webp", width: 1920, height: 1080 },
    },
  },
  {
    slug: "bhajan-jamming",
    title: "Bhajan Jamming",
    month: "2026-09",
    when: "September 2026",
    summary: "Devotional music, sung together.",
    description: [
      "Photos and highlights from Bhajan Jamming will be added here.",
    ],
    facts: [{ label: "When", value: "September 2026" }, WHERE],
    theme: { from: "#f2a93b", to: "#7a1f3d" },
    poster: {},
    galleryPlaceholders: 6,
  },
  {
    slug: "felix-fun-club",
    title: "Felix Fun Club",
    subtitle: "Make, Discover, Experiment, Create",
    month: "2026-08",
    when: "August 2026",
    summary: "Creative sessions for kids, with Magic Mondays and Talent Thursdays.",
    description: [
      "Felix Fun Club is a set of hands on creative sessions for kids, built around two themes.",
      "Magic Mondays are where imagination meets making, with Bappa's Little Clay Studio, Ninja Mission: Cape & Mask, Puzzle Play Lab and Wands & Wonder Slime.",
      "Talent Thursdays are where creativity meets inspiration, from Meet Pablo Picasso and Meet Vincent Van Gogh to Aero Modelling.",
    ],
    facts: [
      { label: "When", value: "August 2026" },
      WHERE,
      { label: "Sessions", value: "Magic Mondays and Talent Thursdays" },
    ],
    theme: { from: "#e0609a", to: "#2b2f86" },
    poster: {
      // The middle panel of the banner, cut out as a 3:4 poster for phones
      portrait: { src: "/images/events/felix-fun-club/portrait.webp", width: 1050, height: 1400 },
      landscape: { src: "/images/events/felix-fun-club/landscape.webp", width: 2600, height: 1156 },
    },
  },
  {
    slug: "feathers-of-freedom",
    title: "Feathers Of Freedom",
    month: "2026-08",
    when: "August 2026",
    summary: "An Independence Day celebration at Felix Plaza.",
    description: [
      "Photos and highlights from Feathers Of Freedom will be added here.",
    ],
    facts: [{ label: "When", value: "August 2026" }, WHERE],
    theme: { from: "#7cc4f5", to: "#2f5fb8" },
    poster: {},
    placeholderLandscape: true,
    galleryPlaceholders: 6,
  },
  {
    slug: "family-run-club",
    title: "Family Run Club",
    month: "2026-08",
    when: "August 2026",
    summary: "A run for the whole family.",
    description: [
      "Photos and highlights from the Family Run Club will be added here.",
    ],
    facts: [{ label: "When", value: "August 2026" }, WHERE],
    theme: { from: "#ff8a5c", to: "#8a3fd1" },
    poster: {},
    galleryPlaceholders: 6,
  },
  {
    slug: "mango-fest",
    title: "Mango Fest",
    month: "2026-06",
    when: "June 2026",
    summary: "A summer celebration of mangoes.",
    description: [
      "Photos and highlights from Mango Fest will be added here.",
    ],
    facts: [{ label: "When", value: "June 2026" }, WHERE],
    theme: { from: "#ffd24d", to: "#f07c1c" },
    poster: {},
    placeholderLandscape: true,
    galleryPlaceholders: 6,
  },
  {
    slug: "yog-mahotsav",
    title: "YOG Mahotsav",
    month: "2026-06",
    when: "June 2026",
    summary: "A celebration of yoga, marking International Yoga Day.",
    description: [
      "Photos and highlights from YOG Mahotsav will be added here.",
    ],
    facts: [{ label: "When", value: "June 2026" }, WHERE],
    theme: { from: "#f6b26b", to: "#2a7f7a" },
    poster: {},
    galleryPlaceholders: 6,
  },
  {
    slug: "moments-with-mom",
    title: "Moments With MoM",
    subtitle: "Made To Be Remembered",
    month: "2026-05",
    when: "May 2026",
    summary: "This Mother's Day, make memories she'll actually remember.",
    description: [
      "Bring her to Felix Plaza for creative moments, shared smiles and little experiences made special.",
      "From tote bag painting to glow jar making, with a few delicious treats in between, it's all about celebrating her with time well spent. Come along and create your own special moments together.",
    ],
    facts: [
      { label: "When", value: "May 2026" },
      WHERE,
      { label: "Activities", value: "Tote bag painting and glow jar making, with treats along the way" },
    ],
    theme: { from: "#f7a1bd", to: "#e23d73" },
    poster: {
      portrait: { src: "/images/events/moments-with-mom/cover.webp", width: 1440, height: 1920 },
    },
    gallery: [
      { src: "/images/events/moments-with-mom/activities.webp", width: 1440, height: 1920 },
    ],
  },
];

/** The event the page opens on. */
export const FEATURED_EVENT_SLUG = "naruto";

export function getEvent(slug: string) {
  return EVENTS.find((e) => e.slug === slug);
}

export type EventGroup = {
  key: string;
  /** Large heading, e.g. "September" or "Coming Soon" */
  title: string;
  /** Small line beside it, e.g. "2026" or "Dates to be announced" */
  note: string;
  /** Dated months before this one are in the past */
  past: boolean;
  events: FelixEvent[];
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Month groups in reading order: this month and later first, then events
 * still waiting on dates, then earlier months, most recent first. "Now" is
 * the build date, which is fine for a site that is rebuilt as events change.
 */
export function eventGroups(now = new Date()): EventGroup[] {
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const dated = new Map<string, FelixEvent[]>();
  const undated: FelixEvent[] = [];
  for (const e of EVENTS) {
    if (!e.month) undated.push(e);
    else dated.set(e.month, [...(dated.get(e.month) ?? []), e]);
  }
  const group = (month: string): EventGroup => {
    const [y, m] = month.split("-").map(Number);
    return {
      key: month,
      title: MONTH_NAMES[m - 1],
      note: String(y),
      past: month < thisMonth,
      events: dated.get(month)!,
    };
  };
  const months = [...dated.keys()];
  const upcoming = months.filter((m) => m >= thisMonth).sort().map(group);
  const earlier = months.filter((m) => m < thisMonth).sort().reverse().map(group);
  const tba: EventGroup[] = undated.length
    ? [{ key: "tba", title: "Coming Soon", note: "Dates to be announced", past: false, events: undated }]
    : [];
  return [...upcoming, ...tba, ...earlier];
}

/** The events either side of this one, in the order the page lists them. */
export function neighbours(slug: string) {
  const order = eventGroups().flatMap((g) => g.events);
  const i = order.findIndex((e) => e.slug === slug);
  return {
    previous: i > 0 ? order[i - 1] : undefined,
    next: i >= 0 && i < order.length - 1 ? order[i + 1] : undefined,
  };
}
