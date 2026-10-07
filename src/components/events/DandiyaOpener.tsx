"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

// The festive opener for the events page (an event's `opener: "dandiya"`).
//
// While the artwork loads, two dandiya sticks strike together in a tak-tak
// rhythm, throwing a few sparks on every hit. When the artwork is ready they
// part, and a burst of mirror-work colours flies out from the point where
// they met, which is where the picture opens from.
//
// Like the rest of EventsHero, nothing here relies on an `initial`: the page
// transition skips initial states on first load, so every animation is
// switched on by state (`started`, `open`).

const GOLD = "#ffc93c";
const MAGENTA = "#e2336b";
const TEAL = "#17a589";
const BLUE = "#3552c9";
const SAFFRON = "#ef6c1a";

// The stage is 240 x 320. The sticks pivot near the bottom, 88px apart, and
// their tips meet at the centre of the stage on each hit.
const STAGE_W = 240;
const STAGE_H = 320;
const GAP = 44; // pivot to centre line
const LENGTH = 160;
const HIT = 14; // degrees, tips touching
const REST = -22; // degrees, sticks drawn back

// One beat: draw back, strike, lift a little, strike again, then a pause.
const BEAT = 1.1;
const SWING_TIMES = [0, 0.2, 0.32, 0.48, 1];
const SWING_EASE = ["easeIn", "easeOut", "easeIn", "easeInOut"] as const;
// The two hits land at 0.2 and 0.48 of the beat.
const FLASH_TIMES = [0, 0.19, 0.2, 0.3, 0.47, 0.48, 0.58, 1];

function Stick({ side, started, open }: { side: "left" | "right"; started: boolean; open: boolean }) {
  const id = useId().replace(/:/g, "");
  const s = side === "left" ? 1 : -1;
  return (
    <motion.div
      className="absolute bottom-[5px] w-3"
      style={{ height: LENGTH, left: STAGE_W / 2 - s * GAP - 6, originX: 0.5, originY: 1, rotate: REST * s }}
      animate={
        open
          ? { rotate: -70 * s, y: 40, opacity: 0 }
          : started
            ? { rotate: [REST, HIT, -4, HIT, REST].map((a) => a * s) }
            : { rotate: REST * s }
      }
      transition={
        open
          ? { duration: 0.75, ease: EASE }
          : { duration: BEAT, times: SWING_TIMES, ease: [...SWING_EASE], repeat: Infinity }
      }
    >
      <svg viewBox="0 0 12 160" className="h-full w-full overflow-visible" aria-hidden>
        <defs>
          {/* Thread wound round the stick in bands of colour */}
          <pattern id={`wrap-${id}`} patternUnits="userSpaceOnUse" width="12" height="24" patternTransform={`rotate(${-28 * s})`}>
            <rect width="12" height="6" fill={GOLD} />
            <rect y="6" width="12" height="6" fill={MAGENTA} />
            <rect y="12" width="12" height="6" fill={TEAL} />
            <rect y="18" width="12" height="6" fill={BLUE} />
          </pattern>
        </defs>
        <rect x="1.5" y="8" width="9" height="134" rx="4.5" fill={`url(#wrap-${id})`} />
        {/* Little mirrors along the stick */}
        {[26, 50, 74, 98, 122].map((y) => (
          <circle key={y} cx="6" cy={y} r="1.6" fill="#fff" opacity="0.9" />
        ))}
        {/* Grip and tassel */}
        <rect x="1" y="138" width="10" height="14" rx="3" fill="#7a1324" />
        <path d="M4 152v8M6 152v9M8 152v8" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
        {/* Brass cap on the striking end */}
        <circle cx="6" cy="7" r="5.5" fill={GOLD} stroke="#b9791a" strokeWidth="1" />
      </svg>
    </motion.div>
  );
}

// Sparks thrown on each hit, worked out once so nothing random runs in render.
const SPARKS = Array.from({ length: 10 }, (_, i) => {
  const a = ((i * 36 + (i % 2 ? 12 : 0)) * Math.PI) / 180;
  const d = 24 + (i % 3) * 7;
  return { x: Math.cos(a) * d, y: Math.sin(a) * d, colour: [GOLD, "#fff", SAFFRON][i % 3] };
});

/** The two sticks, striking until `open`. `started` switches the rhythm on. */
export function DandiyaSticks({ started, open }: { started: boolean; open: boolean }) {
  const beating = started && !open;
  const flash = { duration: BEAT, times: FLASH_TIMES, repeat: Infinity, ease: "linear" as const };
  return (
    <div className="relative scale-110 md:scale-150" style={{ width: STAGE_W, height: STAGE_H }}>
      {/* Lamp-light glow where the sticks meet, brighter on each hit */}
      <motion.span
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,201,60,0.32),transparent_65%)]"
        animate={beating ? { scale: [1, 1, 1.18, 1, 1, 1.18, 1, 1] } : { scale: 1, opacity: open ? 0 : 1 }}
        transition={beating ? flash : { duration: 0.5 }}
      />

      <Stick side="left" started={started} open={open} />
      <Stick side="right" started={started} open={open} />

      {/* The flash and sparks at the point of contact */}
      <div className="absolute left-1/2 top-1/2">
        <motion.span
          className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-[radial-gradient(circle,#fff_0%,rgba(255,201,60,0.9)_35%,transparent_70%)]"
          style={{ opacity: 0 }}
          animate={
            beating
              ? { opacity: [0, 0, 1, 0, 0, 1, 0, 0], scale: [0.3, 0.3, 1, 1.7, 0.3, 1, 1.7, 1.7] }
              : { opacity: 0 }
          }
          transition={beating ? flash : { duration: 0.2 }}
        />
        {SPARKS.map((p, i) => (
          <motion.span
            key={i}
            className="absolute -left-[2px] -top-[2px] h-1 w-1 rounded-full"
            style={{ background: p.colour, opacity: 0 }}
            animate={
              beating
                ? {
                    opacity: [0, 0, 1, 0, 0, 1, 0, 0],
                    x: [0, 0, 0, p.x, 0, 0, p.x, p.x],
                    y: [0, 0, 0, p.y, 0, 0, p.y, p.y],
                  }
                : { opacity: 0 }
            }
            transition={beating ? flash : { duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}

// The burst: mirror-work dots and diamonds flying out from the centre.
const BURST = (() => {
  let seed = 11;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const colours = [GOLD, MAGENTA, TEAL, BLUE, "#ffffff", SAFFRON];
  return Array.from({ length: 36 }, (_, i) => {
    const a = ((i * 10 + (rand() - 0.5) * 8) * Math.PI) / 180;
    const d = 200 + rand() * 380;
    return {
      x: Math.cos(a) * d,
      y: Math.sin(a) * d,
      size: 8 + rand() * 8,
      colour: colours[i % colours.length],
      diamond: i % 3 === 0,
      duration: 1.1 + rand() * 0.5,
      delay: rand() * 0.12,
    };
  });
})();

/** Rings and colour flying out from the centre once `open` turns true. */
export function DandiyaBurst({ open }: { open: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2">
      {[GOLD, MAGENTA].map((c, i) => (
        <motion.span
          key={c}
          className="absolute -left-8 -top-8 h-16 w-16 rounded-full border-[3px]"
          style={{ borderColor: c, opacity: 0 }}
          animate={open ? { scale: [0.3, 9], opacity: [0.95, 0] } : { opacity: 0 }}
          transition={{ duration: 1 + i * 0.25, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {BURST.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute ${p.diamond ? "rotate-45" : "rounded-full"}`}
          style={{
            width: p.size,
            height: p.size,
            left: -p.size / 2,
            top: -p.size / 2,
            background: p.colour,
            opacity: 0,
            boxShadow: `0 0 10px ${p.colour}`,
          }}
          animate={
            open
              ? { x: p.x, y: p.y, opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 0.6] }
              : { x: 0, y: 0, opacity: 0 }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: p.duration, delay: p.delay, times: [0, 0.08, 0.6, 1] },
            scale: { duration: p.duration, delay: p.delay, times: [0, 0.08, 0.6, 1] },
          }}
        />
      ))}
    </div>
  );
}
