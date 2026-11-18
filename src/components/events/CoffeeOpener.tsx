"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

// The opener for Coffee Fest (an event's `opener: "coffee"`), drawn in the
// creative's colours: dark roast brown, cream and caramel.
//
// While the artwork loads, a stream of coffee pours into a cream cup seen from
// above and fills it, steam curls up from the rim and a few beans tumble past.
// When the artwork is ready, latte art blooms on the surface, the cup swells
// and the picture opens out from it as a circle (EventsHero).
//
// As in the rest of EventsHero, nothing relies on an `initial`: the page
// transition skips initial states on first load, so every animation is
// switched on by state (`drawn`, `open`).

const CREAM = "#f3e6d2";
const CARAMEL = "#c98a4b";
const COFFEE = "#5a3220";
const CREMA = "#b9773f";

// A coffee bean: an oval with its seam.
function Bean({ size }: { size: number }) {
  return (
    <svg viewBox="-10 -14 20 28" width={size} height={size * 1.4} aria-hidden>
      <ellipse rx="9" ry="13" fill="#6b3a22" />
      <path d="M0 -12 C 4 -5 -4 5 0 12" stroke="#3a1e12" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Beans drifting past while it brews, fixed so nothing random runs in render.
const BEANS = [
  { x: -150, y: -120, r: 25, s: 22, d: 0 },
  { x: 160, y: -60, r: -40, s: 18, d: 0.4 },
  { x: -170, y: 90, r: 60, s: 16, d: 0.8 },
  { x: 140, y: 130, r: -15, s: 24, d: 0.2 },
];

/** The cup filling while the artwork loads, and the latte art once it opens. */
export function CoffeeCup({ drawn, open }: { drawn: boolean; open: boolean }) {
  return (
    <div className="relative grid h-56 w-56 place-items-center md:h-80 md:w-80">
      {/* Warm light behind the cup */}
      <span className="absolute inset-[-35%] rounded-full bg-[radial-gradient(circle,rgba(201,138,75,0.28),transparent_62%)]" />

      {/* Beans drifting around it */}
      {BEANS.map((b, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2"
          style={{ x: b.x, y: b.y, rotate: b.r, opacity: 0 }}
          animate={
            open
              ? { opacity: 0, scale: 0.6 }
              : drawn
                ? { opacity: [0, 0.9, 0.9], y: [b.y - 14, b.y + 14, b.y - 14], rotate: [b.r, b.r + 25, b.r] }
                : { opacity: 0 }
          }
          transition={
            open
              ? { duration: 0.3 }
              : { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: b.d }
          }
        >
          <Bean size={b.s} />
        </motion.span>
      ))}

      <motion.svg
        viewBox="0 0 200 200"
        className="relative h-full w-full overflow-visible"
        animate={open ? { scale: 1.15, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={open ? { duration: 0.7, ease: EASE, delay: 0.55 } : { duration: 0.3 }}
      >
        <defs>
          <clipPath id="coffee-surface">
            <circle cx="100" cy="112" r="56" />
          </clipPath>
          <radialGradient id="coffee-fill" cx="0.45" cy="0.4" r="0.7">
            <stop offset="0" stopColor={CREMA} />
            <stop offset="0.6" stopColor="#8a5130" />
            <stop offset="1" stopColor={COFFEE} />
          </radialGradient>
        </defs>

        {/* Saucer and cup, seen from above */}
        <motion.circle
          cx="100"
          cy="112"
          r="84"
          fill="none"
          stroke={CREAM}
          strokeOpacity={0.55}
          strokeWidth={3}
          animate={{ pathLength: drawn ? 1 : 0, opacity: drawn ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.circle
          cx="100"
          cy="112"
          r="66"
          fill={CREAM}
          animate={{ opacity: drawn ? 1 : 0, scale: drawn ? 1 : 0.8 }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        />
        {/* Handle */}
        <motion.path
          d="M164 100 C 188 98 188 128 164 126"
          fill="none"
          stroke={CREAM}
          strokeWidth={9}
          strokeLinecap="round"
          animate={{ pathLength: drawn ? 1 : 0, opacity: drawn ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />

        {/* The coffee rising in the cup */}
        <g clipPath="url(#coffee-surface)">
          <motion.circle
            cx="100"
            cy="112"
            r="56"
            fill="url(#coffee-fill)"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={{ scale: drawn ? 1 : 0 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.75 }}
          />
          {/* Latte art: a rosetta of cream hearts, drawn once it opens */}
          {[0, 1, 2, 3].map((i) => (
            <motion.path
              key={i}
              d={`M${100 - 26 + i * 4} ${84 + i * 14} C ${100 - 10} ${72 + i * 14} ${100 + 10} ${72 + i * 14} ${100 + 26 - i * 4} ${84 + i * 14}`}
              fill="none"
              stroke={CREAM}
              strokeWidth={5 - i * 0.6}
              strokeLinecap="round"
              animate={{ pathLength: open ? 1 : 0, opacity: open ? 1 : 0 }}
              transition={{ duration: 0.35, delay: open ? i * 0.08 : 0 }}
            />
          ))}
          <motion.path
            d="M100 74 L100 146"
            stroke={CREAM}
            strokeWidth={3}
            strokeLinecap="round"
            animate={{ pathLength: open ? 1 : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.4, delay: open ? 0.3 : 0 }}
          />
        </g>

        {/* The pour, a thin stream from above that stops once the cup is full */}
        <motion.rect
          x="96.5"
          y="-80"
          width="7"
          rx="3.5"
          fill={COFFEE}
          animate={drawn && !open ? { height: [0, 192, 192, 0], y: [-80, -80, -80, 112] } : { height: 0 }}
          transition={drawn && !open ? { duration: 2.2, times: [0, 0.2, 0.75, 1], delay: 0.6 } : { duration: 0.2 }}
        />

        {/* Steam curling up from the rim */}
        {[-22, 0, 22].map((dx, i) => (
          <motion.path
            key={dx}
            d={`M${100 + dx} 40 C ${92 + dx} 28 ${108 + dx} 16 ${100 + dx} 2 C ${92 + dx} -10 ${108 + dx} -22 ${100 + dx} -34`}
            fill="none"
            stroke={CREAM}
            strokeOpacity={0.6}
            strokeWidth={3.5}
            strokeLinecap="round"
            animate={
              drawn && !open
                ? { pathLength: [0, 1, 1], opacity: [0, 0.8, 0], y: [8, -4, -16] }
                : { opacity: 0 }
            }
            transition={
              drawn && !open
                ? { duration: 2.2, repeat: Infinity, delay: 1.6 + i * 0.35, ease: "easeOut" }
                : { duration: 0.3 }
            }
          />
        ))}
      </motion.svg>
    </div>
  );
}

// A ripple of crema rings spreading from the cup as it opens.
export function CoffeeRipple({ open }: { open: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2">
      {[CARAMEL, CREAM, CARAMEL].map((c, i) => (
        <motion.span
          key={i}
          className="absolute -left-16 -top-16 h-32 w-32 rounded-full border-[3px]"
          style={{ borderColor: c, opacity: 0 }}
          animate={open ? { scale: [0.6, 7], opacity: [0.85, 0] } : { opacity: 0 }}
          transition={{ duration: 1.3, delay: 0.45 + i * 0.16, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}
