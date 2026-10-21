// Shared by the build (data/offers.ts) and the browser (useLiveOffers), and
// kept on its own so the browser does not load the store directory with it.

/** Whether an offer with these times is up at `now` (milliseconds). */
export function isRunning(o: { startsAt?: number; endsAt?: number }, now: number) {
  return (o.startsAt === undefined || o.startsAt <= now) && (o.endsAt === undefined || now < o.endsAt);
}
