"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FEATURED_EVENT } from "@/data/events";
import { EASE } from "@/lib/motion";
import Button from "@/components/ui/Button";

type Remaining = { d: number; h: number; m: number; s: number };

function remainingUntil(target: Date): Remaining {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor(diff / 3_600_000) % 24,
    m: Math.floor(diff / 60_000) % 60,
    s: Math.floor(diff / 1_000) % 60,
  };
}

// Live countdown in frosted-glass tiles. Renders dashes until mounted so
// server and client markup stay in sync.
function Countdown() {
  const [left, setLeft] = useState<Remaining | null>(null);

  useEffect(() => {
    const target = new Date(FEATURED_EVENT.startsAt);
    const tick = () => setLeft(remainingUntil(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const tiles: { label: string; value: string }[] = [
    { label: "Days", value: left ? String(left.d) : "––" },
    { label: "Hours", value: left ? String(left.h).padStart(2, "0") : "––" },
    { label: "Mins", value: left ? String(left.m).padStart(2, "0") : "––" },
    { label: "Secs", value: left ? String(left.s).padStart(2, "0") : "––" },
  ];

  return (
    <div className="flex gap-2.5" aria-label="Time until the event starts">
      {tiles.map((t) => (
        <div
          key={t.label}
          className="min-w-[68px] rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-center backdrop-blur-md"
        >
          <span className="block font-display text-2xl leading-none text-white md:text-4xl">
            {t.value}
          </span>
          <span className="mt-1.5 block text-[10px] uppercase tracking-widest text-white/60">
            {t.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// Staggered letter-mask reveal for the headline.
function KineticTitle({ text }: { text: string }) {
  return (
    <h1
      aria-label={text}
      className="flex flex-wrap justify-center gap-x-[0.3em] font-display text-[56px] uppercase leading-[1.05] tracking-[0.06em] text-white md:text-[104px]"
    >
      {text.split(" ").map((word, w) => (
        <span key={`${word}-${w}`} className="inline-flex overflow-hidden py-[0.08em]">
          {word.split("").map((letter, i) => (
            <motion.span
              key={`${letter}-${i}`}
              aria-hidden
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.85,
                ease: EASE,
                delay: 0.45 + (w * word.length + i) * 0.035,
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}

const META_ICONS = {
  date: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  ),
  time: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  location: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
};

// Full-screen featured-event hero: parallax image, kinetic headline,
// glass countdown and a slow editorial marquee along the bottom edge.
export default function EventsHero() {
  const ev = FEATURED_EVENT;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const marqueeText = `${ev.name} · ${ev.date} · ${ev.location} · `;

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      {/* Parallax background (oversized so the shift never shows edges) */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image src={ev.image} alt="" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/45 to-black/15" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center px-4 pb-32 pt-36 text-center md:pb-36"
      >
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          {ev.eyebrow}
        </motion.span>

        <div className="mt-6">
          <KineticTitle text={ev.name} />
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.15 }}
          className="mt-6 flex flex-wrap justify-center gap-2"
        >
          {ev.highlights.map((h) => (
            <li
              key={h}
              className="rounded-full border border-white/25 bg-white/10 px-4 py-1 text-sm font-semibold text-white/90 backdrop-blur-sm"
            >
              {h}
            </li>
          ))}
        </motion.ul>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.3 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-white/90"
        >
          <li className="flex items-center gap-2.5">
            {META_ICONS.date}
            <span className="font-semibold">{ev.date}</span>
          </li>
          <li className="flex items-center gap-2.5">
            {META_ICONS.time}
            <span className="font-semibold">{ev.time}</span>
          </li>
          <li className="flex items-center gap-2.5">
            {META_ICONS.location}
            <span className="font-semibold">{ev.location}</span>
          </li>
        </motion.ul>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.45 }}
          className="mt-5 hidden max-w-xl leading-relaxed text-white/75 sm:block"
        >
          {ev.text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.6 }}
          className="mt-9 flex flex-col items-center gap-7"
        >
          <Button href={ev.href}>{ev.cta}</Button>
          <Countdown />
        </motion.div>
      </motion.div>

      {/* Editorial marquee along the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-[5] w-full select-none overflow-hidden"
      >
        <div className="animate-marquee flex w-max">
          {[0, 1].map((n) => (
            <span
              key={n}
              className="whitespace-nowrap pr-6 font-display text-[56px] uppercase leading-[1.1] text-white/[0.08] md:text-[92px]"
            >
              {marqueeText.repeat(3)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
