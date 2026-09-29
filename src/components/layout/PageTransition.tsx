"use client";

import { usePathname } from "next/navigation";
import { motion, PresenceContext } from "framer-motion";
import { useState, type ReactNode } from "react";
import { EASE } from "@/lib/motion";

// Holds entrance animations at their end state, so the page someone lands on
// is on screen straight from the static HTML rather than waiting for scripts
// to fade it in. This is what <AnimatePresence initial={false}> hands its
// first child; it is provided directly here because AnimatePresence is not
// used any more (see below).
const SKIP_ENTRANCE = {
  id: "landing",
  isPresent: true,
  initial: false as const,
  register: () => () => {},
};

// Fades each page in when the route changes.
//
// This used to fade the old page out before the new one came in, through
// <AnimatePresence mode="wait">. That handover sometimes stalled after the
// fade out, leaving the new page in the DOM at opacity 0 until a refresh, so
// the transition is now fade in only: there is no exit step left to stall.
//
// The page someone lands on skips its entrance animations; every page
// reached by navigating plays them, as before.
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [landing] = useState(pathname);
  const [navigated, setNavigated] = useState(false);
  if (!navigated && pathname !== landing) setNavigated(true);

  return (
    <PresenceContext.Provider value={navigated ? null : SKIP_ENTRANCE}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {children}
      </motion.div>
    </PresenceContext.Provider>
  );
}
