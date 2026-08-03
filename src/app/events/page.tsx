import type { Metadata } from "next";
import EventsHero from "@/components/events/EventsHero";
import EventArchive from "@/components/events/EventArchive";

export const metadata: Metadata = { title: "Events" };

// Events: the featured event IS the hero (kinetic title, parallax,
// countdown, marquee), followed by the current-year archive.
export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <EventArchive />
    </>
  );
}
