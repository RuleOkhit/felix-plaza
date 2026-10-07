"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { FelixEvent } from "@/data/events";
import { artRatio } from "./EventArt";
import { getLenis } from "@/components/layout/SmoothScroll";
import { EASE, smoothScrollTo } from "@/lib/motion";
import { DandiyaBurst, DandiyaSticks } from "./DandiyaOpener";

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

// Shortest time the loader stays up, so a cached image still gets its moment.
// The dandiya sticks get long enough for a couple of beats.
// (Every animated value below is driven by state rather than an `initial`,
// because the site's page transition skips initial states on first load.)
const MIN_SWIRL_MS = 900;
const MIN_DANDIYA_MS = 1700;

// How far the artwork may be zoomed past its own shape to fill the space:
// 1.12 crops at most about 5% off each side, which keeps the type on the
// creatives clear of the edges.
const FILL = 1.12;

// The drift down after the reveal, gentle at both ends.
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Full-screen opener for the featured event.
//
// The creative carries all of its own type, so it is never cropped hard: the
// wide artwork on desktop and the 9:16 one on phones. The hero takes its
// height from the artwork (up to the height of the screen) and the artwork
// fills it edge to edge, zoomed in slightly where the screen's shape differs
// from the artwork's (see FILL). On the rare screen where even that is not
// enough, a soft, blurred copy fills the sides.
//
// While the artwork loads, a loader plays in the middle of the frame: the
// Naruto swirl, or for a festive event (`opener: "dandiya"`) a pair of
// dandiya sticks striking in rhythm. Once the artwork is ready the picture
// opens up from the centre, and the page then drifts down a little on its
// own so the events below come into view. Both are skipped for anyone who
// prefers less motion, and the drift is cancelled if the visitor scrolls
// first. The artwork itself is the way into the event: the hero now fits
// the artwork closely, so a button would sit on top of its type.
export default function EventsHero({ event }: { event: FelixEvent }) {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [minDone, setMinDone] = useState(false);
  // Flipped straight after mount to start the loader.
  const [drawn, setDrawn] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const touched = useRef(false);
  const open = Boolean(reduced) || (loaded && minDone);
  const dandiya = event.opener === "dandiya";

  const deskArt = event.poster.landscape ?? event.poster.portrait!;
  const phoneArt = event.poster.portrait ?? event.poster.landscape!;
  const common = { alt: "", sizes: "100vw", priority: true };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, ...deskArt });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, ...phoneArt });

  // --ratio is the artwork's width over height (the phone cut below md, the
  // desktop cut from md up) and --nav the height of the navigation bar.
  const sizing = {
    "--ratio-phone": artRatio(event, event.poster.portrait ? "portrait" : "landscape"),
    "--ratio-desk": artRatio(event, event.poster.landscape ? "landscape" : "portrait"),
    height: `calc(var(--nav) + min(100svh - var(--nav), 100vw / var(--ratio) * ${FILL}))`,
    background: dandiya
      ? "radial-gradient(60% 55% at 50% 52%, #5c1322 0%, #2a070e 62%, #14040a 100%)"
      : undefined,
  } as CSSProperties;
  // The frame fills the height under the navigation bar and as much of the
  // width as FILL allows.
  const frame = { width: `min(100%, 100cqh * var(--ratio) * ${FILL})` } as CSSProperties;

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
    const raf = requestAnimationFrame(() => setDrawn(true));
    const t1 = window.setTimeout(() => setMinDone(true), dandiya ? MIN_DANDIYA_MS : MIN_SWIRL_MS);
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
  }, [dandiya]);

  // The drift: a slow glide down, a good moment after the reveal settles.
  const onRevealed = () => {
    if (reduced) return;
    window.setTimeout(() => {
      if (touched.current || window.scrollY > 40) return;
      const target = Math.round(Math.min(window.innerHeight * 0.16, 150));
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target, { duration: 2.6, easing: easeInOutCubic });
      else smoothScrollTo(target, 2600, easeInOutCubic);
    }, 1400);
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
    <section
      style={sizing}
      className="relative overflow-hidden bg-[#150c10] [--nav:64px] [--ratio:var(--ratio-phone)] md:[--nav:72px] md:[--ratio:var(--ratio-desk)]"
    >
      {/* The artwork, opened from the centre once it is ready */}
      <motion.div
        className="absolute inset-x-0 bottom-0 top-(--nav) [container-type:size]"
        animate={{ clipPath: open ? "circle(75% at 50% 50%)" : "circle(0% at 50% 50%)" }}
        transition={reduced ? { duration: 0 } : { duration: 1.1, ease: EASE, delay: 0.12 }}
        onAnimationComplete={open ? onRevealed : undefined}
      >
        {/* Only seen at the sides on screens far wider than the artwork */}
        {picture("pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-90")}
        <div className="absolute inset-0 flex justify-center">
          <Link href={`/events/${event.slug}`} style={frame} className="relative block h-full overflow-hidden">
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

      {/* The loader, above the artwork as it opens */}
      {!reduced &&
        (dandiya ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 top-(--nav) grid place-items-center">
            <DandiyaBurst open={open} />
            <DandiyaSticks started={drawn} open={open} />
          </div>
        ) : (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 top-(--nav) grid place-items-center"
            animate={open ? { opacity: 0, scale: 3.2 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <motion.svg
              viewBox="0 0 100 100"
              className="h-32 w-32 md:h-40 md:w-40"
              animate={{ rotate: drawn ? 360 : 0 }}
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
        ))}
    </section>
  );
}
