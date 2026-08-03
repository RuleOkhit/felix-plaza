import { IMG } from "./site";

// ---------------------------------------------------------------------------
// Events page content. The featured event doubles as the page hero; the
// archive below it covers the current year only. All placeholder data.
// ---------------------------------------------------------------------------

export const FEATURED_EVENT = {
  eyebrow: "What's On · Featured Event",
  name: "Mall Marathon",
  date: "Sunday, 20 September 2026",
  time: "Flag-off 6:30 AM",
  location: "Starts at the North Entrance",
  highlights: ["10K Race", "5K Fun Run", "Kids Dash"],
  text: "Placeholder copy for the featured event — one or two sentences inviting visitors to take part. Add route details or highlights here.",
  cta: "Register Now",
  href: "#",
  image: IMG.banner,
  // Countdown target (local time). Keep in sync with `date` and `time`.
  startsAt: "2026-09-20T06:30:00",
};

export type ArchivedEvent = {
  name: string;
  date: string;
  blurb: string;
  image: string;
  href: string;
};

const BLURB = "Placeholder recap — one short line about this event.";

export const ARCHIVE_LABEL = "2026 – So Far";

// First entry is the lead story in the archive layout; the rest render as
// supporting cards.
export const ARCHIVE_EVENTS: ArchivedEvent[] = [
  {
    name: "Kids Carnival",
    date: "3–5 Jul 2026",
    blurb:
      "Placeholder recap for the lead story — a sentence or two celebrating the destination's most recent highlight moment.",
    image: IMG.wide,
    href: "#",
  },
  { name: "Summer Film Nights", date: "12–20 Jun 2026", blurb: BLURB, image: IMG.squareB, href: "#" },
  { name: "Wellness Weekend", date: "18–19 Apr 2026", blurb: BLURB, image: IMG.squareA, href: "#" },
  { name: "Spring Bloom Market", date: "6–8 Mar 2026", blurb: BLURB, image: IMG.hero, href: "#" },
];
