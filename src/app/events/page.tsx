import type { Metadata } from "next";
import EventsHero from "@/components/events/EventsHero";
import EventMonths from "@/components/events/EventMonths";
import { FEATURED_EVENT_SLUG, eventGroups, getEvent } from "@/data/events";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Events at Felix Plaza, Gurugram",
  absoluteTitle: true,
  description: "Festivals, family days, workshops and live events at Felix Plaza, Sector 82A, Gurugram, month by month.",
  path: "/events/",
});

// Events: the featured event full screen (components/events/EventsHero),
// then every event by month. When there is no upcoming event to lead with,
// remove the hero and give the heading pt-[112px] md:pt-[148px] instead, so
// it clears the navigation bar.
export default function EventsPage() {
  const featured = getEvent(FEATURED_EVENT_SLUG)!;
  return (
    <>
      <EventsHero event={featured} />

      <h1 className="px-4 pb-4 pt-16 text-center font-display text-[24px] uppercase leading-tight tracking-[0.14em] text-ink/85 md:pb-6 md:pt-24 md:text-[32px]">
        Events at Felix Plaza
      </h1>

      <EventMonths groups={eventGroups()} />
    </>
  );
}
