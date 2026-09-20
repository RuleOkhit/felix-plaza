import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Art, FelixEvent } from "@/data/events";
import Reveal from "@/components/ui/Reveal";
import EventArt, { hasFormat } from "./EventArt";

// Public files need the deploy sub-path in front of them (see image-loader).
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function tint(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

// The frame at the top of the page is 4:5 on phones and 16:9 on desktop.
const FRAME = { phone: 4 / 5, desk: 16 / 9 };

/** How much of the frame an image of this shape fills when shown whole. */
function fit(art: Art, frame: number) {
  const r = art.width / art.height;
  return r >= frame
    ? { w: "100%", h: `${((frame / r) * 100).toFixed(2)}%` }
    : { w: `${((r / frame) * 100).toFixed(2)}%`, h: "100%" };
}

const FEATHER =
  "[mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent),linear-gradient(to_bottom,transparent,black_6%,black_94%,transparent)]";

// One piece of artwork shown whole inside the frame, its edges feathered into
// a blurred copy of itself so it blends into the frame instead of sitting in
// a box.
function Framed({ art, alt, frame }: { art: Art; alt: string; frame: number }) {
  const { w, h } = fit(art, frame);
  return (
    <>
      <Image src={art.src} alt="" aria-hidden fill sizes="50vw" className="scale-110 object-cover blur-3xl saturate-125" />
      <div className="absolute inset-0 grid place-items-center">
        <div className={`relative ${FEATHER}`} style={{ width: w, height: h }}>
          <Image src={art.src} alt={alt} fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>
    </>
  );
}

// The top of the page: the event's video, playing muted on a loop. Until a
// video is supplied the event's artwork stands in, drifting slowly so the
// frame still feels alive.
function EventMedia({ event }: { event: FelixEvent }) {
  const alt = `${event.title}, ${event.when}`;
  const phoneArt = event.poster.portrait ?? event.poster.landscape;
  const deskArt = event.poster.landscape ?? event.poster.portrait;
  const wide = hasFormat(event, "landscape");

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink md:aspect-video">
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
        <div className="absolute inset-0 animate-kenburns">
          <div className="absolute inset-0 md:hidden">
            {phoneArt ? (
              <Framed art={phoneArt} alt={alt} frame={FRAME.phone} />
            ) : (
              <EventArt event={event} format="portrait" sizes="100vw" />
            )}
          </div>
          <div className="absolute inset-0 hidden md:block">
            {deskArt ? (
              <Framed art={deskArt} alt={alt} frame={FRAME.desk} />
            ) : (
              <EventArt event={event} format={wide ? "landscape" : "portrait"} sizes="100vw" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// A photo slot waiting for a picture: a soft wash of the event's colours.
function PhotoPlaceholder({ event, index }: { event: FelixEvent; index: number }) {
  const { from, to } = event.theme;
  const angle = [135, 200, 60, 160, 20, 110][index % 6];
  // Three tones in turn, strong, pale and cool, so the spread has some rhythm.
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

// Placeholder slots take turns at different shapes, and the columns start at
// different heights, so the spread reads like a magazine page, not a grid.
const SHAPES = ["4 / 5", "1 / 1", "3 / 4", "5 / 4", "4 / 5", "1 / 1"];

type Slot = { art?: Art; i: number };

function Photo({ event, slot }: { event: FelixEvent; slot: Slot }) {
  const { art, i } = slot;
  return (
    <Reveal delay={(i % 3) * 0.08}>
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ aspectRatio: art ? `${art.width} / ${art.height}` : SHAPES[i % SHAPES.length] }}
      >
        {art ? (
          <Image src={art.src} alt={`${event.title}, photo ${i + 1}`} fill sizes="(max-width: 768px) 90vw, 40vw" className="object-cover" />
        ) : (
          <PhotoPlaceholder event={event} index={i} />
        )}
      </div>
    </Reveal>
  );
}

// The photos, straight after the text. A single picture is set off to one
// side at its own proportions; several are laid out in staggered columns.
function Photos({ event }: { event: FelixEvent }) {
  const slots: Slot[] = event.gallery?.length
    ? event.gallery.map((art, i) => ({ art, i }))
    : Array.from({ length: event.galleryPlaceholders ?? 0 }, (_, i) => ({ i }));
  if (!slots.length) return null;

  const { from, to } = event.theme;
  // No band and no hard edge: a soft bloom of the event's colours that fades
  // out into the page on every side.
  const bloom: CSSProperties = {
    background: `radial-gradient(55% 60% at 72% 40%, ${tint(from, 0.12)}, transparent 70%), radial-gradient(45% 50% at 22% 78%, ${tint(to, 0.08)}, transparent 70%)`,
  };

  if (slots.length === 1) {
    return (
      <section className="px-4 pb-16 md:px-[60px] md:pb-24" style={bloom}>
        <div className="grid items-end gap-6 md:grid-cols-12 md:gap-8">
          <div className="w-[82%] justify-self-end md:col-span-5 md:col-start-8 md:w-full">
            <Photo event={event} slot={slots[0]} />
          </div>
        </div>
      </section>
    );
  }

  const columns = (count: number) =>
    Array.from({ length: count }, (_, c) => slots.filter(({ i }) => i % count === c));

  return (
    <section className="px-4 pb-16 md:px-[60px] md:pb-24" style={bloom}>
      {/* Phones: two columns, the second set lower */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {columns(2).map((col, c) => (
          <div key={c} className={`flex flex-col gap-3 ${c === 1 ? "mt-12" : ""}`}>
            {col.map((slot) => (
              <Photo key={slot.i} event={event} slot={slot} />
            ))}
          </div>
        ))}
      </div>
      {/* Desktop: three columns at three different heights */}
      <div className="hidden grid-cols-3 gap-6 md:grid lg:gap-8">
        {columns(3).map((col, c) => (
          <div key={c} className={`flex flex-col gap-6 lg:gap-8 ${["", "mt-24", "mt-10"][c]}`}>
            {col.map((slot) => (
              <Photo key={slot.i} event={event} slot={slot} />
            ))}
          </div>
        ))}
      </div>
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

// A single event: the video (or its stand in) up top, the details beneath,
// the photos straight after, then a way on to the events either side.
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
  return (
    <>
      <section className="px-4 pt-[84px] md:px-[60px] md:pt-[100px]">
        <EventMedia event={event} />
      </section>

      <section className="px-4 pb-12 pt-12 md:px-[60px] md:pb-16 md:pt-20">
        <nav aria-label="Breadcrumb" className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40">
          <Link href="/events" className="transition-colors hover:text-ink">
            Events
          </Link>
          <span className="mx-2 text-ink/20">/</span>
          <span className="text-ink/70">{event.title}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <span
              aria-hidden
              className="block h-1 w-16 rounded-full"
              style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
            />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-felix-pink">
              {event.when}
            </p>
            <h1 className="mt-3 font-display text-[38px] uppercase leading-[0.95] tracking-wide text-ink md:text-[60px]">
              {event.title}
            </h1>
            {event.subtitle && (
              <p className="mt-4 font-display text-lg uppercase tracking-[0.1em] text-ink/55 md:text-xl">
                {event.subtitle}
              </p>
            )}
            <p className="mt-7 text-lg leading-relaxed text-ink md:text-xl">{event.summary}</p>
            {event.description.map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-ink/70 md:text-lg">
                {p}
              </p>
            ))}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <dl className="border-t border-ink/10">
              {event.facts.map((f) => (
                <div key={f.label} className="border-b border-ink/10 py-4">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45">
                    {f.label}
                  </dt>
                  <dd className="mt-1 font-semibold text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="/plan-your-visit"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:text-ink"
            >
              Plan your visit
              <span aria-hidden>→</span>
            </Link>
          </aside>
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
