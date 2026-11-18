"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// The opener for Coffee Fest (an event's `opener: "coffee"`), built from
// pieces cut out of the event's own creative (public/images/events/
// coffee-fest/opener): the latte, the iced coffee, the Coffee Fest lettering
// and real roasted beans, so it looks like the campaign rather than a drawing.
//
// While the artwork loads, the scene plays like a short title sequence: in a
// warm, dusty light the latte rises out of the dark and settles, steam curls
// off it, beans swing in on arcs and hang around it, then the lettering
// lands and the iced coffee slides in beside it. When the artwork is ready,
// the camera dives into the cup: the latte rushes towards the viewer and past,
// the beans fly out past the edges, and the creative comes into focus behind
// them (EventsHero handles that last part).
//
// As in the rest of EventsHero, nothing relies on an `initial`: the page
// transition skips initial states on first load, so every animation is
// switched on by state (`drawn`, `open`).

const DIR = "/images/events/coffee-fest/opener";
const DIVE = [0.5, 0, 0.75, 0.2] as const; // gathers speed towards the viewer
const SETTLE = [0.16, 1, 0.3, 1] as const; // fast start, soft landing
// How far out the beans hang, as a multiple of their own size.
const SPREAD = 5.6;

// Beans: where each comes from, where it hangs while the scene plays (as a
// share of the cup's size), how big it is and how it turns.
const BEANS = [
  {
    src: "bean-a",
    from: [-140, -90],
    at: [-62, -38],
    size: 22,
    r: -35,
    d: 0.55,
  },
  { src: "bean-c", from: [150, -110], at: [66, -46], size: 20, r: 25, d: 0.7 },
  { src: "bean-b", from: [-150, 80], at: [-70, 40], size: 15, r: 40, d: 0.85 },
  { src: "bean-a", from: [140, 120], at: [60, 52], size: 17, r: -20, d: 0.95 },
  { src: "bean-c", from: [-40, 160], at: [-22, 74], size: 12, r: 70, d: 1.05 },
  { src: "bean-b", from: [60, -170], at: [28, -78], size: 11, r: -60, d: 1.15 },
];

// Steam wisps, rising and curling off the cup.
const STEAM = [
  { x: -14, w: 34, d: 0, dur: 3.2, sway: 10 },
  { x: 8, w: 40, d: 0.9, dur: 3.6, sway: -12 },
  { x: -2, w: 30, d: 1.7, dur: 3.0, sway: 8 },
  { x: 16, w: 28, d: 2.4, dur: 3.4, sway: -9 },
];

// Specks of dust in the light, drifting up.
const DUST = Array.from({ length: 22 }, (_, i) => ({
  x: (i * 37) % 100,
  y: 30 + ((i * 53) % 70),
  s: 1.5 + (i % 4) * 0.8,
  d: (i % 7) * 0.45,
  dur: 6 + (i % 5),
}));

/** One bean: swings in on an arc, hangs and bobs, then flies past the camera. */
function FlyingBean({
  b,
  i,
  drawn,
  open,
}: {
  b: (typeof BEANS)[number];
  i: number;
  drawn: boolean;
  open: boolean;
}) {
  const on = drawn && !open;
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: `${b.size}%`,
        marginLeft: `-${b.size / 2}%`,
        marginTop: `-${b.size / 2}%`,
        opacity: 0,
      }}
      animate={
        open
          ? {
              x: `${b.at[0] * 6}%`,
              y: `${b.at[1] * 6}%`,
              scale: 3.2,
              rotate: b.r * 4,
              opacity: 0,
            }
          : drawn
            ? {
                x: [
                  `${b.from[0] * 4}%`,
                  `${b.at[0] * SPREAD}%`,
                  `${b.at[0] * SPREAD}%`,
                ],
                y: [
                  `${b.from[1] * 4}%`,
                  `${b.at[1] * SPREAD}%`,
                  `${b.at[1] * SPREAD - 8}%`,
                ],
                rotate: [b.r - 160, b.r, b.r + 12],
                opacity: [0, 1, 1],
                filter: ["blur(8px)", "blur(0px)", "blur(0px)"],
              }
            : { opacity: 0 }
      }
      transition={
        open
          ? { duration: 0.9, ease: DIVE }
          : {
              duration: 1.1,
              delay: b.d,
              ease: SETTLE,
              times: [0, 0.7, 1],
            }
      }
    >
      <motion.div
        animate={on ? { y: ["0%", "-14%", "0%"], rotate: [0, 8, 0] } : {}}
        transition={{
          duration: 3 + i * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.6 + i * 0.2,
        }}
      >
        <Image
          src={`${DIR}/${b.src}.webp`}
          alt=""
          width={220}
          height={165}
          className="h-auto w-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.55)]"
        />
      </motion.div>
    </motion.div>
  );
}

/** The whole loading scene. `drawn` starts it; `open` plays the dive. */
export function CoffeeScene({
  drawn,
  open,
}: {
  drawn: boolean;
  open: boolean;
}) {
  const on = drawn && !open;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 top-(--nav) overflow-hidden"
    >
      {/* A pool of warm light, as if from a café lamp above */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(45%_55%_at_50%_42%,rgba(214,150,86,0.32),transparent_70%)]"
        animate={{ opacity: open ? 0 : drawn ? 1 : 0 }}
        transition={{ duration: open ? 0.5 : 1.4 }}
      />

      {/* Dust drifting in the light */}
      {DUST.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#f1d3a8]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            opacity: 0,
          }}
          animate={on ? { y: [0, -140], opacity: [0, 0.7, 0] } : { opacity: 0 }}
          transition={
            on
              ? {
                  duration: p.dur,
                  delay: p.d,
                  repeat: Infinity,
                  ease: "linear",
                }
              : { duration: 0.3 }
          }
        />
      ))}

      {/* The stage: everything is sized from the cup, which fits the screen */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative aspect-square w-[min(62vw,46vh)] md:w-[min(34vw,48vh)]">
          {/* Beans behind the cup */}
          {BEANS.map((b, i) =>
            i % 2 === 0 ? (
              <FlyingBean key={i} b={b} i={i} drawn={drawn} open={open} />
            ) : null,
          )}

          {/* Steam curling off the cup */}
          {STEAM.map((s, i) => (
            <motion.span
              key={i}
              className="absolute bottom-[58%] h-[46%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,244,230,0.85),transparent)] blur-[8px] mix-blend-screen"
              style={{
                left: `${50 + s.x - s.w / 2}%`,
                width: `${s.w}%`,
                opacity: 0,
              }}
              animate={
                on
                  ? {
                      y: ["20%", "-70%"],
                      x: ["0%", `${s.sway}%`, `${-s.sway / 2}%`],
                      scaleX: [0.6, 1.3, 1.8],
                      opacity: [0, 0.95, 0],
                    }
                  : { opacity: 0 }
              }
              transition={
                on
                  ? {
                      duration: s.dur,
                      delay: 1.2 + s.d,
                      repeat: Infinity,
                      ease: "easeOut",
                    }
                  : { duration: 0.3 }
              }
            />
          ))}

          {/* The latte: rises out of the dark, turns slowly, then the camera dives in */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{ opacity: 0 }}
            animate={
              open
                ? {
                    // Kept under ~3x: the cut-out is only 500px, so a bigger
                    // zoom turns soft. It fades out as it passes the camera.
                    scale: 3.2,
                    rotate: 22,
                    opacity: [1, 1, 0],
                  }
                : drawn
                  ? {
                      y: ["40%", "0%"],
                      scale: [0.7, 1],
                      rotate: [-40, 0],
                      opacity: [0, 1],
                      filter: ["blur(12px)", "blur(0px)"],
                    }
                  : { opacity: 0 }
            }
            transition={
              open
                ? { duration: 0.95, ease: DIVE, opacity: { duration: 0.95, times: [0, 0.55, 1], ease: "easeIn" } }
                : { duration: 1.3, ease: SETTLE, delay: 0.15 }
            }
          >
            {/* Its shadow on the table */}
            <span className="absolute inset-[6%] translate-y-[7%] rounded-full bg-black/55 blur-2xl" />
            <motion.div
              className="relative h-full w-full"
              animate={on ? { rotate: [0, 360] } : {}}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <Image
                src={`${DIR}/cup.webp`}
                alt=""
                width={500}
                height={500}
                priority
                className="h-full w-full"
              />
            </motion.div>
            {/* A glint across the crema */}
            <motion.span
              className="absolute inset-[16%] rounded-full bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.35)_50%,transparent_65%)] mix-blend-overlay"
              style={{ backgroundSize: "250% 100%" }}
              animate={on ? { backgroundPosition: ["120% 0", "-120% 0"] } : {}}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                repeatDelay: 1.4,
                delay: 1.6,
              }}
            />
          </motion.div>

          {/* Beans in front of the cup, for depth */}
          {BEANS.map((b, i) =>
            i % 2 === 1 ? (
              <FlyingBean key={i} b={b} i={i} drawn={drawn} open={open} />
            ) : null,
          )}

          {/* The Coffee Fest lettering, landing over the cup */}
          <motion.div
            className="absolute left-1/2 top-[-34%] w-[92%] -translate-x-1/2"
            style={{ opacity: 0 }}
            animate={
              open
                ? { y: "-60%", opacity: 0, scale: 0.9 }
                : drawn
                  ? {
                      y: ["-40%", "0%"],
                      scale: [1.6, 1],
                      rotate: [-8, -3],
                      opacity: [0, 1],
                      filter: ["blur(10px)", "blur(0px)"],
                    }
                  : { opacity: 0 }
            }
            transition={
              open
                ? { duration: 0.5, ease: "easeIn" }
                : {
                    type: "spring",
                    stiffness: 140,
                    damping: 13,
                    delay: 1.45,
                    opacity: { duration: 0.3, delay: 1.45 },
                  }
            }
          >
            <Image
              src={`${DIR}/logo.webp`}
              alt=""
              width={478}
              height={263}
              className="h-auto w-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.6)]"
            />
          </motion.div>

          {/* The iced coffee, sliding in at the side */}
          <motion.div
            className="absolute right-[-12%] top-[58%] w-[24%] md:right-[-46%] md:top-[30%] md:w-[30%]"
            style={{ opacity: 0 }}
            animate={
              open
                ? { x: "120%", opacity: 0, rotate: 30 }
                : drawn
                  ? { x: ["140%", "0%"], rotate: [24, 9], opacity: [0, 1] }
                  : { opacity: 0 }
            }
            transition={
              open
                ? { duration: 0.6, ease: "easeIn" }
                : { duration: 0.9, ease: SETTLE, delay: 1.75 }
            }
          >
            <motion.div
              animate={on ? { y: ["0%", "-5%", "0%"] } : {}}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.6,
              }}
            >
              <Image
                src={`${DIR}/iced.webp`}
                alt=""
                width={159}
                height={282}
                className="h-auto w-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
