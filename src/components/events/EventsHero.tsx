"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { FelixEvent } from "@/data/events";
import { artRatio } from "./EventArt";
import { getLenis } from "@/components/layout/SmoothScroll";
import { EASE, smoothScrollTo } from "@/lib/motion";

// A spiral in the spirit of the Uzumaki swirl, drawn once as a path.
const SPIRAL = (() => {
  const turns = 3.2;
  const max = 44;
  const steps = 180;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * turns * 2 * Math.PI;
    const r = (i / steps) * max;
    d += `${i ? "L" : "M"}${(50 + r * Math.cos(t)).toFixed(2)} ${(50 + r * Math.sin(t)).toFixed(2)}`;
  }
  return d;
})();

// Shortest time the swirl stays up, so a cached image still gets its moment.
// (Every animated value below is driven by state rather than an `initial`,
// because the site's page transition skips initial states on first load.)
const MIN_SWIRL_MS = 900;

// Full-screen opener for the featured event.
//
// The creative carries all of its own type, so it is shown whole rather than
// cropped: the 16:9 artwork on desktop and the 9:16 one on phones, sized to
// fit the screen. Its edges are feathered into a soft, blurred copy of itself
// that fills whatever space is left, so there is never a hard border.
//
// While the artwork loads, a swirl spins in the middle of the frame. Once it
// is ready the swirl bursts outwards and the picture opens up from the centre.
// The page then drifts down a touch on its own, so the events below are
// visible straight away. Both are skipped for anyone who prefers less motion,
// and the drift is cancelled if the visitor starts scrolling first.
export default function EventsHero({ event }: { event: FelixEvent }) {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [minDone, setMinDone] = useState(false);
  // Flipped straight after mount so the swirl draws itself in.
  const [drawn, setDrawn] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const touched = useRef(false);
  const open = Boolean(reduced) || (loaded && minDone);

  const deskArt = event.poster.landscape ?? event.poster.portrait!;
  const phoneArt = event.poster.portrait ?? event.poster.landscape!;
  const common = { alt: "", sizes: "100vw", priority: true };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, ...deskArt });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, ...phoneArt });
  // The frame takes the artwork's own proportions, as large as the screen
  // allows below the navigation bar.
  const shape = {
    "--ratio-phone": artRatio(event, event.poster.portrait ? "portrait" : "landscape"),
    "--ratio-desk": artRatio(event, event.poster.landscape ? "landscape" : "portrait"),
  } as CSSProperties;

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
    const raf = requestAnimationFrame(() => setDrawn(true));
    const t1 = window.setTimeout(() => setMinDone(true), MIN_SWIRL_MS);
    // Never leave the page waiting on a slow image.
    const t2 = window.setTimeout(() => setLoaded(true), 4000);
    const stop = () => (touched.current = true);
    const opts = { passive: true, once: true } as const;
    window.addEventListener("wheel", stop, opts);
    window.addEventListener("touchstart", stop, opts);
    window.addEventListener("keydown", stop, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, []);

  // The drift: a short glide down once the reveal has settled.
  const onRevealed = () => {
    if (reduced) return;
    window.setTimeout(() => {
      if (touched.current || window.scrollY > 40) return;
      const target = Math.round(Math.min(window.innerHeight * 0.16, 150));
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target, { duration: 1.4 });
      else smoothScrollTo(target, 1300);
    }, 850);
  };

  const picture = (className: string, ref?: React.Ref<HTMLImageElement>) => (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <img
        {...rest}
        ref={ref}
        srcSet={mobile}
        alt={ref ? `${event.title}, ${event.when}` : ""}
        aria-hidden={ref ? undefined : true}
        onLoad={ref ? () => setLoaded(true) : undefined}
        className={className}
      />
    </picture>
  );

  return (
    <section className="relative h-svh min-h-[560px] overflow-hidden bg-[#150c10]">
      {/* The artwork, opened from the centre once it is ready */}
      <motion.div
        className="absolute inset-x-0 bottom-0 top-[64px] md:top-[72px]"
        animate={{ clipPath: open ? "circle(75% at 50% 50%)" : "circle(0% at 50% 50%)" }}
        transition={reduced ? { duration: 0 } : { duration: 1.1, ease: EASE, delay: 0.12 }}
        onAnimationComplete={open ? onRevealed : undefined}
      >
        {/* A soft, blurred copy of the artwork fills the whole screen */}
        {picture("pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover blur-3xl saturate-125")}
        <div className="absolute inset-0 grid place-items-center">
          <Link
            href={`/events/${event.slug}`}
            style={shape}
            className="relative block aspect-[var(--ratio-phone)] w-[min(100%,calc((100svh-64px)*var(--ratio-phone)))] [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent),linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)] md:aspect-[var(--ratio-desk)] md:w-[min(100%,calc((100svh-72px)*var(--ratio-desk)))]"
          >
            <motion.div
              className="absolute inset-0"
              animate={{ scale: open ? 1 : 1.08 }}
              transition={reduced ? { duration: 0 } : { duration: 1.6, ease: EASE }}
            >
              {picture("absolute inset-0 h-full w-full object-cover", imgRef)}
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* The swirl: spins while the artwork loads, then bursts outwards */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[64px] grid place-items-center md:top-[72px]"
          animate={open ? { opacity: 0, scale: 3.2 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.svg
            viewBox="0 0 100 100"
            className="h-32 w-32 md:h-40 md:w-40"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
          >
            <motion.path
              d={SPIRAL}
              fill="none"
              stroke={event.theme.from}
              strokeWidth={4.5}
              strokeLinecap="round"
              animate={{ pathLength: drawn ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.svg>
        </motion.div>
      )}

      {/* Way into the event (on phones the artwork itself is the link) */}
      <motion.div
        className="absolute inset-x-0 bottom-8 z-10 hidden justify-center md:flex"
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : 12 }}
        transition={{ duration: 0.7, ease: EASE, delay: reduced ? 0 : 0.9 }}
      >
        <Link
          href={`/events/${event.slug}`}
          className="rounded-full border-2 border-white bg-white px-7 py-2.5 text-base font-bold text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] transition-all duration-500 ease-in-out hover:bg-transparent hover:text-white"
        >
          View Event
        </Link>
      </motion.div>
    </section>
  );
}
