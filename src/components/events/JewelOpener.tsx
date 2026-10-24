"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

// The opener for a jewellery event (an event's `opener: "jewel"`), drawn to
// sit with the Jewel Fest creative: deep teal velvet, gold line work and
// diamond sparkle.
//
// While the artwork loads, a cut gem draws itself in gold line, facet by
// facet, a glint travels across its face and small stars twinkle around it.
// When the artwork is ready the gem flashes white, a few sparkles fly out and
// the picture opens in the shape of a diamond from the middle (EventsHero).
//
// As in the rest of EventsHero, nothing relies on an `initial`: the page
// transition skips initial states on first load, so every animation is
// switched on by state (`drawn`, `open`).

const GOLD = "#e6c37a";
const GOLD_DEEP = "#b8893a";
const ICE = "#dff6ff";

/** The diamond-shaped reveal the hero uses, closed and open. */
export const DIAMOND_CLOSED = "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)";
export const DIAMOND_OPEN = "polygon(50% -75%, 175% 50%, 50% 175%, -75% 50%)";

// A brilliant cut seen from the side: table, crown and pavilion.
const OUTLINE = "M30 30 L70 30 L84 44 L50 88 L16 44 Z";
const FACETS = [
  "M16 44 L84 44", // girdle
  "M30 30 L38 44 L50 30 L62 44 L70 30", // crown facets
  "M38 44 L50 88 M62 44 L50 88", // pavilion mains
  "M16 44 L50 88 M84 44 L50 88",
];

// Stars around the gem, worked out once (no randomness during render).
const STARS = [
  { x: -78, y: -54, s: 1, d: 0 },
  { x: 82, y: -38, s: 0.75, d: 0.5 },
  { x: -64, y: 58, s: 0.6, d: 0.9 },
  { x: 70, y: 66, s: 0.9, d: 0.25 },
  { x: 4, y: -96, s: 0.55, d: 0.7 },
  { x: -104, y: 6, s: 0.5, d: 1.1 },
  { x: 108, y: 14, s: 0.65, d: 0.4 },
];

function Star({ size, colour = "#fff" }: { size: number; colour?: string }) {
  return (
    <svg viewBox="-10 -10 20 20" width={size} height={size} aria-hidden>
      <path d="M0 -10 C1 -2 2 -1 10 0 C2 1 1 2 0 10 C-1 2 -2 1 -10 0 C-2 -1 -1 -2 0 -10Z" fill={colour} />
    </svg>
  );
}

/** The gem and its twinkling stars, until `open`. */
export function JewelGem({ drawn, open }: { drawn: boolean; open: boolean }) {
  const draw = (delay: number) => ({ duration: 0.7, ease: "easeInOut" as const, delay });
  return (
    <div className="relative grid h-48 w-48 place-items-center md:h-80 md:w-80">
      {/* Soft light behind the stone */}
      <motion.span
        className="absolute inset-[-30%] rounded-full bg-[radial-gradient(circle,rgba(160,225,255,0.28),transparent_62%)]"
        animate={open ? { opacity: 0, scale: 1.6 } : { opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] }}
        transition={open ? { duration: 0.6 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg
        viewBox="0 0 100 100"
        className="relative h-full w-full overflow-visible"
        animate={open ? { scale: 1.25, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={open ? { duration: 0.7, ease: EASE, delay: 0.15 } : { duration: 0.3 }}
      >
        <defs>
          <linearGradient id="jewel-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={GOLD} />
            <stop offset="0.5" stopColor="#f6e2b0" />
            <stop offset="1" stopColor={GOLD_DEEP} />
          </linearGradient>
          <linearGradient id="jewel-glint" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="jewel-shape">
            <path d={OUTLINE} />
          </clipPath>
        </defs>

        {/* A faint ice-blue body, filling in once the lines are drawn */}
        <motion.path
          d={OUTLINE}
          fill={ICE}
          animate={{ fillOpacity: open ? 0.9 : drawn ? 0.12 : 0 }}
          transition={{ duration: open ? 0.25 : 0.8, delay: open ? 0 : 1.1 }}
        />

        {/* The glint, sweeping across the face while it waits */}
        <g clipPath="url(#jewel-shape)">
          <motion.rect
            x={-40}
            y={20}
            width={30}
            height={80}
            fill="url(#jewel-glint)"
            transform="skewX(-20)"
            animate={drawn && !open ? { x: [-40, 120] } : { x: -40 }}
            transition={drawn && !open ? { duration: 1.4, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut", delay: 1.2 } : { duration: 0 }}
          />
        </g>

        <motion.path
          d={OUTLINE}
          fill="none"
          stroke="url(#jewel-gold)"
          strokeWidth={2.4}
          strokeLinejoin="round"
          animate={{ pathLength: drawn ? 1 : 0 }}
          transition={draw(0)}
        />
        {FACETS.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="url(#jewel-gold)"
            strokeWidth={1.3}
            strokeLinejoin="round"
            strokeOpacity={0.85}
            animate={{ pathLength: drawn ? 1 : 0 }}
            transition={draw(0.45 + i * 0.15)}
          />
        ))}
      </motion.svg>

      {/* Twinkling stars around it */}
      {STARS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2"
          style={{ x: s.x - 7, y: s.y - 7, opacity: 0 }}
          animate={
            open
              ? { opacity: 0, scale: 0 }
              : drawn
                ? { opacity: [0, 1, 0], scale: [0.3, s.s * 1.2, 0.3], rotate: [0, 45, 90] }
                : { opacity: 0 }
          }
          transition={
            open
              ? { duration: 0.3 }
              : { duration: 1.6, repeat: Infinity, delay: 0.8 + s.d, ease: "easeInOut" }
          }
        >
          <Star size={14} colour={i % 3 === 0 ? GOLD : "#fff"} />
        </motion.span>
      ))}
    </div>
  );
}

// Sparkles thrown out as the stone flashes, worked out once.
const BURST = Array.from({ length: 16 }, (_, i) => {
  const a = ((i * 22.5 + (i % 2 ? 9 : 0)) * Math.PI) / 180;
  const d = 220 + (i % 4) * 90;
  return { x: Math.cos(a) * d, y: Math.sin(a) * d, size: 10 + (i % 3) * 6, gold: i % 3 === 0, delay: (i % 4) * 0.04 };
});

/** The flash and the sparkles flying out once `open` turns true. */
export function JewelBurst({ open }: { open: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2">
      <motion.span
        className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[radial-gradient(circle,#ffffff_0%,rgba(200,240,255,0.7)_25%,transparent_65%)]"
        style={{ opacity: 0 }}
        animate={open ? { opacity: [0, 1, 0], scale: [0.4, 1.4, 2.2] } : { opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      {BURST.map((p, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ left: -p.size / 2, top: -p.size / 2, opacity: 0 }}
          animate={
            open
              ? { x: p.x, y: p.y, opacity: [0, 1, 1, 0], rotate: [0, 90], scale: [0.4, 1, 0.6] }
              : { x: 0, y: 0, opacity: 0 }
          }
          transition={{ duration: 1.2, delay: 0.1 + p.delay, ease: [0.16, 1, 0.3, 1] }}
        >
          <Star size={p.size} colour={p.gold ? GOLD : "#fff"} />
        </motion.span>
      ))}
    </div>
  );
}
