import type { Metadata } from "next";
import EventMonths from "@/components/events/EventMonths";
import { eventGroups } from "@/data/events";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Events at Felix Plaza, Gurugram",
  absoluteTitle: true,
  description: "Festivals, family days, workshops and live events at Felix Plaza, Sector 82A, Gurugram, month by month.",
  path: "/events/",
});

// Events: every event by month. The full-screen opener for a featured
// upcoming event (components/events/EventsHero, with the swirl or dandiya
// loader) is not in use while there is no upcoming event to lead with; put
// <EventsHero event={getEvent(FEATURED_EVENT_SLUG)!} /> back above the
// heading, and give the heading pt-16 md:pt-24, to bring it back.
export default function EventsPage() {
  return (
    <>
      <h1 className="px-4 pb-4 pt-[112px] text-center font-display text-[24px] uppercase leading-tight tracking-[0.14em] text-ink/85 md:pb-6 md:pt-[148px] md:text-[32px]">
        Events at Felix Plaza
      </h1>

      <EventMonths groups={eventGroups()} />
    </>
  );
}
