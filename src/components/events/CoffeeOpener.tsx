"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";

// The opener for Coffee Fest (an event's `opener: "coffee"`), drawn in the
// creative's colours: dark roast, caramel and cream.
//
// The whole screen is the cup. While the artwork loads, a stream of coffee
// pours in from the top, beans tumble through it, and the coffee rises from
// the bottom with a live, rolling surface. When the artwork is ready, a
// wave of coffee surges up the screen and the creative rises right behind it,
// its own surface edged in crema, until it fills the screen.
//
// The surfaces are polygons recomputed every frame (a level plus a moving
// phase), so they keep rolling the whole time. As in the rest of EventsHero,
// nothing relies on an `initial`: the page transition skips initial states.

const CREMA = "#e7c79c";
const CARAMEL = "#c98a4b";

const POINTS = 28;

/** The surface of the liquid at `level` (0 = bottom, 1 = top), as points in %. */
function surface(level: number, phase: number, amp: number) {
  const pts: [number, number][] = [];
  for (let i = 0; i <= POINTS; i++) {
    const x = (i / POINTS) * 100;
    const u = x / 100;
    const y =
      (1 - level) * 100 +
      amp * Math.sin(phase + u * Math.PI * 3.2) +
      amp * 0.45 * Math.sin(phase * 1.7 + u * Math.PI * 7.4);
    pts.push([x, y]);
  }
  return pts;
}

const clipOf = (pts: [number, number][]) =>
  `polygon(${pts.map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`).join(", ")}, 100% 130%, 0% 130%)`;
const lineOf = (pts: [number, number][]) => `M ${pts.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(" L ")}`;

export type CoffeeWave = {
  /** Clip for the artwork, rising from the bottom on open */
  artClip: MotionValue<string>;
  liquidClip: MotionValue<string>;
  liquidLevel: MotionValue<number>;
  /** The crema line along the artwork's surface, in a 0–100 viewBox */
  foam: MotionValue<string>;
  foamOpacity: MotionValue<number>;
  surfaceLine: MotionValue<string>;
};

/**
 * Drives the rising coffee and the artwork's wave. `active` is false for every
 * other opener, in which case nothing runs.
 */
export function useCoffeeWave({
  active,
  drawn,
  open,
  reduced,
  onDone,
}: {
  active: boolean;
  drawn: boolean;
  open: boolean;
  reduced: boolean;
  onDone: () => void;
}): CoffeeWave {
  const liquidLevel = useMotionValue(-0.08);
  const artLevel = useMotionValue(reduced ? 1.3 : -0.08);
  const hidden = clipOf(surface(-0.08, 0, 0));
  const artClip = useMotionValue(reduced ? "none" : hidden);
  const liquidClip = useMotionValue(hidden);
  const foam = useMotionValue("");
  const surfaceLine = useMotionValue("");
  const foamOpacity = useTransform(artLevel, [-0.05, 0.03, 0.95, 1.12], [0, 1, 1, 0]);
  const done = useRef(false);
  const doneCb = useRef(onDone);
  useEffect(() => {
    doneCb.current = onDone;
  });

  // Fill the cup while the artwork loads.
  useEffect(() => {
    if (!active || !drawn || reduced) return;
    const c = animate(liquidLevel, 0.34, { duration: 2.3, ease: [0.3, 0, 0.25, 1], delay: 0.55 });
    return () => c.stop();
  }, [active, drawn, reduced, liquidLevel]);

  // Then the surge, with the creative rising right behind it.
  useEffect(() => {
    if (!active || !open) return;
    if (reduced) {
      artClip.set("none");
      doneCb.current();
      return;
    }
    const a = animate(liquidLevel, 1.2, { duration: 1.25, ease: [0.55, 0, 0.25, 1] });
    const b = animate(artLevel, 1.2, {
      duration: 1.65,
      ease: [0.5, 0, 0.2, 1],
      delay: 0.22,
      onComplete: () => {
        done.current = true;
        artClip.set("none");
        doneCb.current();
      },
    });
    return () => {
      a.stop();
      b.stop();
    };
  }, [active, open, reduced, liquidLevel, artLevel, artClip]);

  useAnimationFrame((t) => {
    if (!active || reduced || done.current) return;
    const p = t / 1000;
    const liquid = surface(liquidLevel.get(), p * 1.9 + 1.4, 1.5);
    liquidClip.set(clipOf(liquid));
    surfaceLine.set(lineOf(liquid));
    const art = surface(artLevel.get(), p * 2.3, 1.9);
    artClip.set(clipOf(art));
    foam.set(lineOf(art));
  });

  return { artClip, liquidClip, liquidLevel, foam, foamOpacity, surfaceLine };
}

// A coffee bean: an oval with its seam.
function Bean({ size }: { size: number }) {
  return (
    <svg viewBox="-10 -14 20 28" width={size} height={size * 1.4} aria-hidden>
      <ellipse rx="9" ry="13" fill="#6b3a22" />
      <ellipse rx="9" ry="13" fill="url(#bean-shine)" />
      <path d="M0 -12 C 4 -5 -4 5 0 12" stroke="#2c150d" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <defs>
        <radialGradient id="bean-shine" cx="0.35" cy="0.3" r="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// Beans tumbling down beside the stream, fixed so nothing random runs in render.
const BEANS = [
  { x: 45.5, s: 26, r: 220, d: 0.7, dur: 1.6 },
  { x: 53.5, s: 20, r: -260, d: 1.25, dur: 1.4 },
  { x: 48.5, s: 30, r: 180, d: 1.9, dur: 1.7 },
  { x: 56.5, s: 18, r: -200, d: 2.4, dur: 1.5 },
  { x: 42.5, s: 22, r: 240, d: 2.9, dur: 1.6 },
];

/** The coffee below the artwork: the stream, the beans and the rising cup. */
export function CoffeeLiquid({ wave, drawn, open }: { wave: CoffeeWave; drawn: boolean; open: boolean }) {
  const streamHeight = useTransform(wave.liquidLevel, (l) => `${Math.max(0, (1 - Math.max(l, 0)) * 100 + 2)}%`);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 top-(--nav) overflow-hidden">
      {/* The coffee, rising from the bottom */}
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: wave.liquidClip,
          background:
            "radial-gradient(70% 45% at 50% 85%, rgba(201,138,75,0.35), transparent 70%), linear-gradient(180deg, #7a4428 0%, #5a3220 35%, #2c150d 100%)",
        }}
      />
      {/* A caramel glint along its surface */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <motion.path
          d={wave.surfaceLine}
          fill="none"
          stroke={CARAMEL}
          strokeOpacity={0.75}
          strokeWidth={3}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* The pour */}
      <motion.div
        className="absolute left-1/2 top-0 w-[9px] -translate-x-1/2 rounded-b-full bg-[linear-gradient(90deg,#4a2618,#8a5130_45%,#5a3220)] md:w-[12px]"
        style={{ height: streamHeight }}
        animate={{ opacity: drawn && !open ? 1 : 0, scaleY: drawn ? 1 : 0 }}
        transition={{ opacity: { duration: open ? 0.25 : 0.4 }, scaleY: { duration: 0.6, ease: "easeIn", delay: 0.2 } }}
      />

      {/* Beans tumbling into the cup */}
      {BEANS.map((b, i) => (
        <motion.span
          key={i}
          className="absolute top-0"
          style={{ left: `${b.x}%`, opacity: 0 }}
          animate={
            drawn && !open
              ? { y: ["-6vh", "62vh"], rotate: [0, b.r], opacity: [0, 1, 1, 0] }
              : { opacity: 0 }
          }
          transition={
            drawn && !open
              ? { duration: b.dur, delay: b.d, repeat: Infinity, repeatDelay: 1.2, ease: "easeIn", opacity: { times: [0, 0.1, 0.85, 1], duration: b.dur, delay: b.d, repeat: Infinity, repeatDelay: 1.2 } }
              : { duration: 0.2 }
          }
        >
          <Bean size={b.s} />
        </motion.span>
      ))}
    </div>
  );
}

/** The crema edge riding on the creative's rising surface. */
export function CoffeeFoam({ wave }: { wave: CoffeeWave }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 top-(--nav) h-[calc(100%-var(--nav))] w-full"
      style={{ opacity: wave.foamOpacity }}
    >
      <motion.path d={wave.foam} fill="none" stroke={CREMA} strokeWidth={14} strokeOpacity={0.35} vectorEffect="non-scaling-stroke" />
      <motion.path d={wave.foam} fill="none" stroke={CREMA} strokeWidth={5} vectorEffect="non-scaling-stroke" />
    </motion.svg>
  );
}
