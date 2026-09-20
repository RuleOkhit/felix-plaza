"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

// A row of event cards that scrolls sideways when a month has more than fits.
// Arrows only appear on the side there is more to see, so a month that fits
// shows none at all. Swipe on phones, arrows or trackpad on desktop.
export default function EventRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdges({
        left: el.scrollLeft > 4,
        right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const button =
    "absolute top-[180px] z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_30px_-12px_rgba(23,22,31,0.45)] transition-colors duration-300 hover:bg-ink hover:text-white md:flex lg:top-[210px]";

  return (
    <div className="relative">
      <div
        ref={ref}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:mx-0 md:gap-6 md:scroll-px-0 md:px-0"
      >
        {children}
      </div>
      {edges.left && (
        <button type="button" aria-label="Earlier events" onClick={() => nudge(-1)} className={`${button} -left-5`}>
          <Arrow dir="left" />
        </button>
      )}
      {edges.right && (
        <button type="button" aria-label="More events" onClick={() => nudge(1)} className={`${button} -right-5`}>
          <Arrow dir="right" />
        </button>
      )}
    </div>
  );
}
