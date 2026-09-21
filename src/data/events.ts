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
    title: "Raas Rhythm",
    subtitle: "A Celebration Of Music & Bhakti",
    month: "2026-09",
    when: "5 September 2026",
    summary: "Some evenings are meant to be heard. Some are meant to be felt.",
    description: [
      "Raas Rhythm brought music and bhakti together for an evening of soulful melodies, positive energy and moments of connection.",
      "Come for the music. Stay for the feeling.",
    ],
    facts: [
      { label: "When", value: "5 September 2026" },
      WHERE,
    ],
    theme: { from: "#d4b872", to: "#2c5738" },
    poster: {
      portrait: { src: "/images/events/bhajan-jamming/cover.webp", width: 1200, height: 1600 },
    },
    gallery: [
      { src: "/images/events/bhajan-jamming/photo-1.webp", width: 1200, height: 1600 },
      { src: "/images/events/bhajan-jamming/photo-2.webp", width: 1200, height: 1600 },
      { src: "/images/events/bhajan-jamming/photo-3.webp", width: 1200, height: 1600 },
      { src: "/images/events/bhajan-jamming/photo-4.webp", width: 1600, height: 1067 },
      { src: "/images/events/bhajan-jamming/photo-5.webp", width: 1600, height: 1067 },
      { src: "/images/events/bhajan-jamming/photo-6.webp", width: 1600, height: 1067 },
      { src: "/images/events/bhajan-jamming/photo-7.webp", width: 1600, height: 1067 },
    ],
  },
  {
    slug: "family-run-club",
    title: "Family Run Club",
    subtitle: "Lace Up, Together",
    month: "2026-08",
    when: "30 August 2026",
    summary: "Some Sundays are for brunch. Some are for passing the baton.",
    description: [
      "The Felix Plaza Family Run brought families and friends together for a fun filled Sunday of teamwork, movement and friendly competition.",
      "Participants picked their teams, took on the relay and made the morning one to remember.",
    ],
    facts: [
      { label: "When", value: "30 August 2026" },
      WHERE,
    ],
    theme: { from: "#cdf24a", to: "#3f8f2c" },
    poster: {
      portrait: { src: "/images/events/family-run-club/cover.webp", width: 1200, height: 1600 },
    },
    gallery: [
      { src: "/images/events/family-run-club/photo-1.webp", width: 1067, height: 1600 },
      { src: "/images/events/family-run-club/photo-2.webp", width: 1600, height: 1067 },
      { src: "/images/events/family-run-club/photo-3.webp", width: 1600, height: 1067 },
      { src: "/images/events/family-run-club/photo-4.webp", width: 1067, height: 1600 },
      { src: "/images/events/family-run-club/photo-5.webp", width: 1600, height: 1067 },
      { src: "/images/events/family-run-club/photo-6.webp", width: 1600, height: 1067 },
    ],
  },
  {
    slug: "feathers-of-freedom",
    title: "Feathers Of Freedom",
    subtitle: "Every Feather Tells A Story",
    month: "2026-08",
    when: "August 2026",
    summary: "Every feather tells a story. Every colour reflects the spirit of our nation.",
    description: [
      "Feathers of Freedom celebrated India's pride, culture and togetherness through experiences inspired by the spirit of the nation.",
      "A celebration of colours, stories and moments that brought the spirit of India to life.",
    ],
    facts: [
      { label: "When", value: "August 2026" },
      { label: "Highlights", value: "Kids activity zone" },
      WHERE,
    ],
    theme: { from: "#f4801f", to: "#1a8a46" },
    poster: {
      portrait: { src: "/images/events/feathers-of-freedom/cover.webp", width: 1200, height: 1600 },
    },
    gallery: [
      { src: "/images/events/feathers-of-freedom/photo-1.webp", width: 1201, height: 1600 },
      { src: "/images/events/feathers-of-freedom/photo-2.webp", width: 1600, height: 1067 },
      { src: "/images/events/feathers-of-freedom/photo-3.webp", width: 1600, height: 1067 },
    ],
  },
  {
    slug: "yog-mahotsav",
    title: "YOG Mahotsav",
    subtitle: "Pause. Breathe. Reconnect.",
    month: "2026-06",
    when: "20 June 2026",
    summary: "A day of movement, mindfulness and positive energy.",
    description: [
      "On Yoga Day, Felix Plaza hosted an experience dedicated to health, harmony and holistic well being.",
      "A refreshing celebration of yoga, mindfulness and wellness, bringing people together to pause, reconnect and embrace a healthier way of living.",
    ],
    facts: [
      { label: "When", value: "20 June 2026" },
      WHERE,
    ],
    theme: { from: "#8a6fe0", to: "#4b3aa8" },
    poster: {
      portrait: { src: "/images/events/yog-mahotsav/cover.webp", width: 1200, height: 1600 },
    },
    gallery: [
      { src: "/images/events/yog-mahotsav/photo-1.webp", width: 669, height: 1600 },
      { src: "/images/events/yog-mahotsav/photo-2.webp", width: 1200, height: 1600 },
      { src: "/images/events/yog-mahotsav/photo-3.webp", width: 1600, height: 900 },
    ],
  },
  {
    slug: "mango-fest",
    title: "Mango Fest",
    subtitle: "Flavours Of Summer",
    month: "2026-06",
    when: "13–14 June 2026",
    summary: "A weekend given over to the king of fruits.",
    description: [
      "Mango Fest brought the flavours of summer to life with a vibrant celebration dedicated to the king of fruits.",
      "From delicious bites and refreshing treats to fun experiences and summer vibes, the weekend was all about good food, great energy and mango lovers coming together.",
    ],
    facts: [
      { label: "When", value: "13–14 June 2026" },
      WHERE,
    ],
    theme: { from: "#ffc233", to: "#f2760c" },
    poster: {
      portrait: { src: "/images/events/mango-fest/cover.webp", width: 1200, height: 1600 },
    },
    gallery: [
      { src: "/images/events/mango-fest/photo-1.webp", width: 1200, height: 1600 },
      { src: "/images/events/mango-fest/photo-2.webp", width: 1200, height: 1600 },
      { src: "/images/events/mango-fest/photo-3.webp", width: 1200, height: 1600 },
      { src: "/images/events/mango-fest/photo-4.webp", width: 1600, height: 1200 },
      { src: "/images/events/mango-fest/photo-5.webp", width: 1600, height: 1200 },
      { src: "/images/events/mango-fest/photo-6.webp", width: 1200, height: 1600 },
    ],
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
      { label: "Activities", value: "Tote bag painting and glow jar making, with treats along the way" },
      WHERE,
    ],
    theme: { from: "#f7a1bd", to: "#e23d73" },
    poster: {
      portrait: { src: "/images/events/moments-with-mom/cover.webp", width: 1200, height: 1600 },
    },
    gallery: [
      { src: "/images/events/moments-with-mom/photo-1.webp", width: 1201, height: 1600 },
      { src: "/images/events/moments-with-mom/photo-2.webp", width: 1201, height: 1600 },
      { src: "/images/events/moments-with-mom/photo-3.webp", width: 1201, height: 1600 },
      { src: "/images/events/moments-with-mom/photo-4.webp", width: 1201, height: 1600 },
      { src: "/images/events/moments-with-mom/photo-5.webp", width: 1201, height: 1600 },
    ],
  },
];

/*
 * Parked: Felix Fun Club is out of the listing for now. Its artwork is still
 * in public/images/events/felix-fun-club, so adding this entry back to EVENTS
 * brings the event and its page straight back.
 *
 * {
 *   slug: "felix-fun-club",
 *   title: "Felix Fun Club",
 *   subtitle: "Make, Discover, Experiment, Create",
 *   month: "2026-08",
 *   when: "August 2026",
 *   ...
 * }
 */

/*
 * Parked: Felix Fun Club is out of the listing for now. Its artwork is still
 * in public/images/events/felix-fun-club, so adding this entry back to EVENTS
 * brings the event and its page straight back.
 *
 * {
 *   slug: "felix-fun-club",
 *   title: "Felix Fun Club",
 *   subtitle: "Make, Discover, Experiment, Create",
 *   month: "2026-08",
 *   when: "August 2026",
 *   ...
 * }
 */

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
