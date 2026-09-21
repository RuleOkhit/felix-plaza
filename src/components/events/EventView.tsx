import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Art, FelixEvent } from "@/data/events";
import Reveal from "@/components/ui/Reveal";
import EventArt, { artRatio } from "./EventArt";

// Public files need the deploy sub-path in front of them (see image-loader).
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function tint(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/**
 * Photos laid out in justified rows, the way a picture desk would: each row
 * is filled to the same width and every photo in it shares a height, with
 * widths following the photo's own proportions. Nothing is cropped, and a
 * row of wide shots simply sits shorter than a row of tall ones.
 *
 * `target` is the total width over height a full row aims for, so a bigger
 * number means more photos per row and a shorter row.
 */
function justify(photos: Art[], target: number, max: number) {
  const rows: { photos: Art[]; sum: number }[] = [];
  let current: Art[] = [];
  let sum = 0;
  for (const p of photos) {
    current.push(p);
    sum += p.width / p.height;
    if (sum >= target || current.length === max) {
      rows.push({ photos: current, sum });
      current = [];
      sum = 0;
    }
  }
  if (current.length) rows.push({ photos: current, sum });
  return rows;
}

function PhotoRows({
  event,
  photos,
  target,
  max,
  gapY,
  gapX,
}: {
  event: FelixEvent;
  photos: Art[];
  target: number;
  max: number;
  // Written out in full because Tailwind only sees class names it can read
  // in the source.
  gapY: string;
  gapX: string;
}) {
  return (
    <div className={`flex flex-col ${gapY}`}>
      {justify(photos, target, max).map((row, r) => {
        // A short last row keeps the same rhythm by taking only the width it
        // needs, tucked to alternating sides rather than stretched.
        const partial = row.sum < target * 0.8;
        const style: CSSProperties = partial
          ? { width: `${Math.min(100, (row.sum / target) * 100).toFixed(1)}%`, marginLeft: r % 2 ? "auto" : undefined }
          : {};
        return (
          <Reveal key={r}>
            <div className={`flex ${gapX}`} style={style}>
              {row.photos.map((p, i) => {
                const ratio = p.width / p.height;
                return (
                  <div
                    key={p.src}
                    className="relative overflow-hidden rounded-xl bg-ink/5"
                    style={{ flexGrow: ratio, flexBasis: 0, aspectRatio: ratio }}
                  >
                    <Image
                      src={p.src}
                      alt={`${event.title}, photo ${r * max + i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

// A photo slot waiting for a picture: a soft wash of the event's colours.
function PhotoPlaceholder({ event, index }: { event: FelixEvent; index: number }) {
  const { from, to } = event.theme;
  const angle = [135, 200, 60, 160, 20, 110][index % 6];
  const wash = [
    `linear-gradient(${angle}deg, ${tint(from, 0.6)}, ${tint(to, 0.5)}), #ffffff`,
    `linear-gradient(${angle}deg, ${tint(from, 0.18)}, ${tint(to, 0.12)}), #faf8fc`,
    `linear-gradient(${angle}deg, ${tint(to, 0.38)}, rgba(53, 39, 97, 0.28)), #ffffff`,
  ][index % 3];
  const label = index % 3 === 1 ? "text-ink/45" : "text-white/90";
  return (
    <div className="absolute inset-0 flex items-end p-4" style={{ background: wash }}>
      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${label}`}>
        Photo coming soon
      </span>
    </div>
  );
}

const SHAPES = ["4 / 5", "1 / 1", "3 / 4", "5 / 4", "4 / 5", "1 / 1"];

// The photo spread: justified rows on desktop, shorter rows on phones so the
// page does not turn into a long scroll. Events still waiting on photos show
// empty slots instead.
function Photos({ event }: { event: FelixEvent }) {
  const photos = event.gallery ?? [];
  const waiting = event.galleryPlaceholders ?? 0;
  if (!photos.length && !waiting) return null;

  const { from, to } = event.theme;
  // No band and no hard edge: a soft bloom of the event's colours that fades
  // out into the page on every side.
  const bloom: CSSProperties = {
    background: `radial-gradient(55% 60% at 72% 30%, ${tint(from, 0.13)}, transparent 70%), radial-gradient(45% 55% at 20% 80%, ${tint(to, 0.09)}, transparent 70%)`,
  };

  return (
    <section className="px-4 pb-16 pt-10 md:px-[60px] md:pb-24 md:pt-14" style={bloom}>
      {photos.length > 0 ? (
        <>
          <div className="md:hidden">
            <PhotoRows event={event} photos={photos} target={1.6} max={2} gapY="gap-y-3" gapX="gap-x-3" />
          </div>
          <div className="hidden md:block">
            <PhotoRows event={event} photos={photos} target={2.7} max={3} gapY="gap-y-6" gapX="gap-x-6" />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {Array.from({ length: waiting }, (_, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: SHAPES[i % SHAPES.length] }}>
                <PhotoPlaceholder event={event} index={i} />
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

function NeighbourLink({ event, dir }: { event: FelixEvent; dir: "previous" | "next" }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className={`group flex items-center gap-4 py-6 md:py-8 ${dir === "next" ? "flex-row-reverse text-right" : ""}`}
    >
      <div className="relative h-24 w-[54px] shrink-0 overflow-hidden rounded-lg md:h-28 md:w-[63px]">
        <EventArt event={event} format="portrait" sizes="64px" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/45">
          {dir === "next" ? "Next event" : "Previous event"}
        </p>
        <p className="mt-1 font-display text-lg uppercase leading-tight text-ink transition-colors duration-300 group-hover:text-primary md:text-xl">
          {event.title}
        </p>
        <p className="mt-0.5 text-sm text-ink/55">{event.when}</p>
      </div>
    </Link>
  );
}

// A single event: the poster beside the write up, the photos underneath, then
// a way on to the events either side. The poster is never stretched across
// the top; it keeps its own proportions next to the words.
export default function EventView({
  event,
  previous,
  next,
}: {
  event: FelixEvent;
  previous?: FelixEvent;
  next?: FelixEvent;
}) {
  const { from, to } = event.theme;
  const ratio = artRatio(event, "portrait");
  const cover: CSSProperties = {
    aspectRatio: ratio,
    // Very tall artwork is held back so it does not tower over the text.
    maxWidth: ratio < 0.7 ? "420px" : undefined,
  };

  return (
    <>
      <section className="px-4 pt-[84px] md:px-[60px] md:pt-[104px]">
        <nav aria-label="Breadcrumb" className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40">
          <Link href="/events" className="transition-colors hover:text-ink">
            Events
          </Link>
          <span className="mx-2 text-ink/20">/</span>
          <span className="text-ink/70">{event.title}</span>
        </nav>

        <div className="mt-6 grid gap-8 md:mt-8 lg:grid-cols-12 lg:gap-14">
          {/* The poster (or the event video), beside the words rather than
              stretched across the top */}
          <div className="lg:col-span-5">
            <div
              className="relative mx-auto w-full overflow-hidden rounded-2xl shadow-[0_26px_60px_-30px_rgba(23,22,31,0.6)] lg:mx-0"
              style={cover}
            >
              {event.video ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={`${BASE}${event.video}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <EventArt
                  event={event}
                  format="portrait"
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  priority
                />
              )}
            </div>
          </div>

          {/* The write up */}
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
            <span
              aria-hidden
              className="block h-1 w-16 rounded-full"
              style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
            />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-felix-pink">
              {event.when}
            </p>
            <h1 className="mt-3 font-display text-[36px] uppercase leading-[0.95] tracking-wide text-ink md:text-[54px]">
              {event.title}
            </h1>
            {event.subtitle && (
              <p className="mt-4 font-display text-lg uppercase tracking-[0.1em] text-ink/55 md:text-xl">
                {event.subtitle}
              </p>
            )}
            <p className="mt-6 text-lg leading-relaxed text-ink md:text-xl">{event.summary}</p>
            {event.description.map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-ink/70 md:text-lg">
                {p}
              </p>
            ))}

            <dl className="mt-8 grid gap-x-10 gap-y-5 border-t border-ink/10 pt-6 sm:grid-cols-2">
              {event.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45">
                    {f.label}
                  </dt>
                  <dd className="mt-1 font-semibold text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/plan-your-visit"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:text-ink"
            >
              Plan your visit
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Photos event={event} />

      <section className="px-4 md:px-[60px]">
        <div className="grid border-y border-ink/10 md:grid-cols-2">
          <div className="border-b border-ink/10 md:border-b-0 md:border-r">
            {previous && <NeighbourLink event={previous} dir="previous" />}
          </div>
          <div className="md:pl-8">{next && <NeighbourLink event={next} dir="next" />}</div>
        </div>
        <div className="py-10 text-center md:py-14">
          <Link
            href="/events"
            className="inline-block rounded-full border-2 border-primary bg-primary px-7 py-2.5 text-base font-bold text-white transition-all duration-500 ease-in-out hover:bg-transparent hover:text-primary md:text-lg"
          >
            All Events
          </Link>
        </div>
      </section>
    </>
  );
}
