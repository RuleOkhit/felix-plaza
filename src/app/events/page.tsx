import type { Metadata } from "next";
import EventsHero from "@/components/events/EventsHero";
import EventMonths from "@/components/events/EventMonths";
import { FEATURED_EVENT_SLUG, eventGroups, getEvent } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Events at Felix Plaza, month by month.",
};

// Events: the featured event full screen, then every event by month.
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
