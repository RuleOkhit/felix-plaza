import type { Metadata } from "next";
import EventMonths from "@/components/events/EventMonths";
import { eventGroups } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Events at Felix Plaza, month by month.",
};

// Events: every event by month. The full-screen opener for a featured event
// (components/events/EventsHero, with the swirl reveal) is not in use while
// there is no upcoming event to lead with; put <EventsHero event={...} />
// back above the heading to bring it back.
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
