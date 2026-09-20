import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventView from "@/components/events/EventView";
import { EVENTS, getEvent, neighbours } from "@/data/events";

type Params = { event: string };

// Static export: only the events listed in data/events.ts exist, and any
// other slug is a 404 rather than being rendered on demand.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return EVENTS.map((e) => ({ event: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { event: slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  return { title: event.title, description: event.summary };
}

export default async function EventPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { event: slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  const { previous, next } = neighbours(slug);
  return <EventView event={event} previous={previous} next={next} />;
}
