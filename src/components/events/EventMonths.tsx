import Link from "next/link";
import type { EventGroup, FelixEvent } from "@/data/events";
import type { CSSProperties } from "react";
import EventArt, { artRatio, hasFormat } from "./EventArt";
import EventRow from "./EventRow";

// A hex colour at a given opacity, for the month grounds.
function tint(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

// One event. Every card in a row shares a height and keeps its artwork at the
// artwork's own proportions, so nothing is squeezed into a square: a 9:16 or
// 3:4 poster makes a tall, narrow card and a 16:9 banner a wide one. Desktop
// uses the wide version where there is one; phones use the tall one.
function EventCard({ event, priority }: { event: FelixEvent; priority: boolean }) {
  const wide = hasFormat(event, "landscape");
  const shape = {
    "--ratio-phone": artRatio(event, "portrait"),
    "--ratio-desk": artRatio(event, wide ? "landscape" : "portrait"),
  } as CSSProperties;
  return (
    <Link
      href={`/events/${event.slug}`}
      style={shape}
      className="group block w-[calc(min(64svh,520px)*var(--ratio-phone))] shrink-0 snap-start md:w-[calc(360px*var(--ratio-desk))] lg:w-[calc(420px*var(--ratio-desk))]"
    >
      <div className="relative h-[min(64svh,520px)] w-full overflow-hidden rounded-2xl shadow-[0_18px_40px_-24px_rgba(23,22,31,0.55)] md:hidden">
        <EventArt event={event} format="portrait" sizes="300px" priority={priority} className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
      </div>
      <div
        className="relative hidden w-full overflow-hidden rounded-2xl shadow-[0_22px_50px_-28px_rgba(23,22,31,0.6)] md:block md:h-[360px] lg:h-[420px]"
      >
        <EventArt
          event={event}
          format={wide ? "landscape" : "portrait"}
          sizes={wide ? "750px" : "240px"}
          priority={priority}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 pr-1">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/45">
            {event.when}
          </p>
          <h3 className="mt-1.5 font-display text-xl uppercase leading-tight text-ink transition-colors duration-300 group-hover:text-primary md:text-[22px]">
            {event.title}
          </h3>
        </div>
        <span
          aria-hidden
          className="mt-5 shrink-0 text-ink/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

// The gallery, one band per month. No filters: each month is set apart by
// its own heading and a faint wash of its events' colours, and the bands
// alternate between two base tones.
export default function EventMonths({ groups }: { groups: EventGroup[] }) {
  return (
    <div>
      {groups.map((group, i) => {
        const lead = group.events[0].theme;
        const base = i % 2 === 0 ? "#ffffff, #f8f7fb" : "#f7f6fb, #efeef6";
        return (
          <section
            key={group.key}
            aria-labelledby={`month-${group.key}`}
            className="py-12 md:py-16"
            style={{
              background: `radial-gradient(70% 90% at 100% 0%, ${tint(lead.from, 0.1)}, transparent 62%), radial-gradient(60% 80% at 0% 100%, ${tint(lead.to, 0.06)}, transparent 60%), linear-gradient(180deg, ${base})`,
            }}
          >
            <div className="px-4 md:px-[60px]">
              <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 md:mb-8 md:gap-x-4">
                <h2
                  id={`month-${group.key}`}
                  className="font-display text-[28px] uppercase leading-none tracking-wide text-ink md:text-[42px]"
                >
                  {group.title}
                </h2>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-felix-pink">
                  {group.note}
                </span>
              </div>

              <EventRow>
                {group.events.map((event, j) => (
                  <EventCard key={event.slug} event={event} priority={i === 0 && j === 0} />
                ))}
              </EventRow>
            </div>
          </section>
        );
      })}
    </div>
  );
}
