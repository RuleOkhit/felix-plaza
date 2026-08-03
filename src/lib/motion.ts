import type { Variants } from "framer-motion";

// Shared easing — a soft ease-out used across all reveals so the whole site
// moves with one rhythm (mirrors the reference site's AOS fade-up feel).
export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;

// Animated anchor scrolling with the site's ease-out feel. Timer-driven
// (not rAF, not native smooth) so it also works in environments that drop
// smooth-scroll animations or never fire animation frames; each step
// scrolls with behavior:"instant" to bypass CSS scroll-behavior.
export function smoothScrollTo(targetY: number, duration = 900) {
  const startY = window.scrollY;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const delta = Math.min(Math.max(targetY, 0), maxY) - startY;
  if (Math.abs(delta) < 1) return;
  const start = performance.now();
  const ease = (t: number) => 1 - Math.pow(1 - t, 5); // ≈ EASE curve
  const step = () => {
    const p = Math.min(1, (performance.now() - start) / duration);
    window.scrollTo({ top: startY + delta * ease(p), behavior: "instant" });
    if (p < 1) setTimeout(step, 16);
  };
  step();
}
