"use client";

import { motion } from "framer-motion";

// The festive opener for the events page (an event's `opener: "rangoli"`):
// a rangoli that draws itself while the artwork loads, and a light fall of
// marigold petals once it opens.
//
// Like the rest of EventsHero, every value is driven by state rather than an
// `initial`, because the page transition skips initial states on first load.

const MARIGOLD = "#f5a524";
const SAFFRON = "#ef6c1a";
const GOLD = "#ffd36b";
const MAGENTA = "#e2336b";

/** A petal pointing out from the centre, between radius r1 and r2. */
function petal(r1: number, r2: number, w: number) {
  const len = r2 - r1;
  const y1 = 50 - r1;
  const y2 = 50 - r2;
  return `M50 ${y1} C${50 + w} ${y1 - len * 0.3} ${50 + w * 0.8} ${y2 + len * 0.25} 50 ${y2} C${50 - w * 0.8} ${y2 + len * 0.25} ${50 - w} ${y1 - len * 0.3} 50 ${y1}Z`;
}

const OUTER = petal(25, 45, 8.5);
const INNER = petal(10, 27, 7);
const around = (n: number, offset = 0) => Array.from({ length: n }, (_, i) => offset + (360 / n) * i);

/**
 * Two rings of petals turning in opposite directions, drawn in from the
 * centre outwards. `drawn` starts the drawing.
 */
export function Rangoli({ drawn }: { drawn: boolean }) {
  const draw = (delay: number) => ({ duration: 0.55, ease: "easeOut" as const, delay });
  return (
    <div className="relative grid h-44 w-44 place-items-center md:h-56 md:w-56">
      {/* A warm glow behind it, like a diya in the dark */}
      <span className="absolute -inset-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,165,36,0.28),transparent_62%)]" />

      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
      >
        {around(12).map((a, i) => (
          <g key={a} transform={`rotate(${a} 50 50)`}>
            <motion.path
              d={OUTER}
              fill="none"
              stroke={MARIGOLD}
              strokeWidth={2.2}
              strokeLinejoin="round"
              animate={{ pathLength: drawn ? 1 : 0 }}
              transition={draw(0.3 + i * 0.035)}
            />
          </g>
        ))}
        {around(12, 15).map((a, i) => (
          <motion.circle
            key={a}
            cx={50 + 47 * Math.sin((a * Math.PI) / 180)}
            cy={50 - 47 * Math.cos((a * Math.PI) / 180)}
            r={1.6}
            fill={GOLD}
            animate={{ opacity: drawn ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.75 + i * 0.03 }}
          />
        ))}
      </motion.svg>

      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
      >
        {around(8, 22.5).map((a, i) => (
          <g key={a} transform={`rotate(${a} 50 50)`}>
            <motion.path
              d={INNER}
              fill="none"
              stroke={MAGENTA}
              strokeWidth={2.2}
              strokeLinejoin="round"
              animate={{ pathLength: drawn ? 1 : 0 }}
              transition={draw(0.1 + i * 0.04)}
            />
          </g>
        ))}
        <motion.circle
          cx={50}
          cy={50}
          r={6}
          fill="none"
          stroke={SAFFRON}
          strokeWidth={2.2}
          animate={{ pathLength: drawn ? 1 : 0 }}
          transition={draw(0)}
        />
        <circle cx={50} cy={50} r={2.4} fill={GOLD} />
      </motion.svg>
    </div>
  );
}

// The petals, worked out once with a fixed seed so every visit looks the
// same and nothing random runs during render.
const PETALS = (() => {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const colours = [MARIGOLD, SAFFRON, GOLD, MARIGOLD, SAFFRON, MAGENTA];
  return Array.from({ length: 18 }, (_, i) => ({
    left: 2 + ((i * 5.5 + rand() * 5) % 96),
    size: 13 + rand() * 10,
    colour: colours[i % colours.length],
    duration: 5.5 + rand() * 3,
    delay: 0.4 + rand() * 2.2,
    sway: 14 + rand() * 18,
    spin: (rand() > 0.5 ? 1 : -1) * (220 + rand() * 260),
  }));
})();

/** Marigold petals drifting down once, after `open` turns true. */
export function PetalShower({ open }: { open: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PETALS.map((p, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 10 14"
          className="absolute -top-[4%]"
          style={{ left: `${p.left}%`, width: p.size, height: p.size * 1.4 }}
          animate={
            open
              ? {
                  y: ["0vh", "108vh"],
                  x: [0, p.sway, -p.sway * 0.6, p.sway * 0.4, 0],
                  rotate: [0, p.spin],
                  opacity: [0, 0.95, 0.95, 0],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "linear",
            opacity: { duration: p.duration, delay: p.delay, times: [0, 0.08, 0.78, 1] },
          }}
        >
          <path d="M5 0C9.2 3.6 9.2 10 5 14 0.8 10 0.8 3.6 5 0Z" fill={p.colour} />
          <path d="M5 2.2V11.8" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7" />
        </motion.svg>
      ))}
    </div>
  );
}
