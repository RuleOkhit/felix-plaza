"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Module-level handle so other components (e.g. anchor links) can drive
// eased scrolls through Lenis when it's active.
let lenis: Lenis | null = null;
export function getLenis() {
  return lenis;
}

// Inertia smooth-scrolling for the whole site (the "premium" glide feel).
// - Skipped for users who prefer reduced motion.
// - Self-disables in environments that never fire animation frames
//   (some embedded/automation browsers), falling back to native scroll.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      lerp: 0.1, // interpolation factor: lower = floatier, higher = tighter
      wheelMultiplier: 1,
    });
    lenis = instance;

    let alive = false;
    let rafId = 0;
    const loop = (time: number) => {
      alive = true;
      instance.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // If no frame arrived shortly after mount, rAF is dead here — hand
    // scrolling back to the browser.
    const watchdog = window.setTimeout(() => {
      if (!alive) {
        instance.destroy();
        lenis = null;
      }
    }, 500);

    return () => {
      window.clearTimeout(watchdog);
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
