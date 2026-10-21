"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { OfferView } from "@/data/offers";
import { isRunning } from "@/lib/offer-time";

// Offers come and go on their own dates while the site sits unchanged on the
// server. The page is built with whatever was running that day; this keeps
// it honest afterwards, in the visitor's browser:
//   - straight after the page loads, offers that have ended since the build
//     (or have started since) are dropped (or added);
//   - while the page stays open, a timer fires at the next start or end, so
//     an offer disappears at its exact time and the grid closes up;
//   - coming back to the tab (after a phone sleeps, say) checks again, since
//     timers can drift while a device sleeps.
// The very first render matches the built page, so nothing jumps while the
// page loads.

function clock(boundaries: number[]) {
  let now: number | null = null;
  return {
    subscribe(changed: () => void) {
      let timer = 0;
      const tick = () => {
        now = Date.now();
        changed();
        window.clearTimeout(timer);
        const next = boundaries.find((b) => b > Date.now());
        // A little after the moment itself, and never past what a timer can hold.
        if (next !== undefined) timer = window.setTimeout(tick, Math.min(next - Date.now() + 250, 2_147_483_647));
      };
      const onReturn = () => {
        if (document.visibilityState === "visible") tick();
      };
      tick();
      document.addEventListener("visibilitychange", onReturn);
      window.addEventListener("focus", onReturn);
      return () => {
        window.clearTimeout(timer);
        document.removeEventListener("visibilitychange", onReturn);
        window.removeEventListener("focus", onReturn);
      };
    },
    getSnapshot: () => now,
  };
}

/**
 * The offers running right now, kept up to date while the page is open.
 * `offers` were running when the site was built (and are what the page first
 * shows); `upcoming` had not started yet and join at their start time.
 */
export function useLiveOffers(offers: OfferView[], upcoming: OfferView[] = []): OfferView[] {
  const all = useMemo(() => [...offers, ...upcoming], [offers, upcoming]);
  const store = useMemo(
    () =>
      clock(
        all
          .flatMap((o) => [o.startsAt, o.endsAt])
          .filter((t): t is number => t !== undefined)
          .sort((a, b) => a - b),
      ),
    [all],
  );
  const now = useSyncExternalStore(store.subscribe, store.getSnapshot, () => null);
  return useMemo(() => (now === null ? offers : all.filter((o) => isRunning(o, now))), [offers, all, now]);
}
