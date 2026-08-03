"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, SITE } from "@/data/site";
import { EASE } from "@/lib/motion";
import SearchOverlay from "./SearchOverlay";

// Fixed header: transparent over the hero, gains a solid surface + shadow
// once the page scrolls. On inner pages (no full-height hero) it is always
// solid. Mobile uses an off-canvas panel sliding in from the right.
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the off-canvas menu on navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const linkColor = overHero
    ? "text-white hover:text-white/70"
    : "text-ink hover:text-primary";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          overHero ? "bg-transparent py-5" : "bg-white py-3 shadow-md"
        }`}
      >
        <div className="mx-auto flex items-center justify-between px-4 md:px-[60px]">
          {/* Logo — simple typographic mark, replace with your own */}
          <Link
            href="/"
            className={`font-display text-2xl uppercase tracking-[0.3em] transition-colors duration-500 md:text-3xl ${
              overHero ? "text-white" : "text-ink"
            }`}
          >
            {SITE.name}
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[15px] font-semibold uppercase tracking-wider transition-colors duration-300 ${linkColor} ${
                  pathname === link.href ? "underline underline-offset-8" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            <button
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
              className={`transition-colors duration-300 ${linkColor}`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.8-3.8" />
              </svg>
            </button>
            <Link
              href="/plan-your-visit"
              aria-label="Mall map"
              className={`hidden transition-colors duration-300 md:block ${linkColor}`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2Z" />
                <path d="M9 3v16M15 5v16" />
              </svg>
            </Link>
            <span
              className={`hidden cursor-pointer text-[15px] font-semibold uppercase tracking-wider md:block ${linkColor}`}
            >
              AR
            </span>
            {/* Hamburger */}
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="flex flex-col gap-1.5 lg:hidden"
            >
              <span className={`h-0.5 w-7 ${overHero ? "bg-white" : "bg-ink"}`} />
              <span className={`h-0.5 w-7 ${overHero ? "bg-white" : "bg-ink"}`} />
              <span className={`h-0.5 w-5 self-end ${overHero ? "bg-white" : "bg-ink"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Off-canvas mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[85%] max-w-sm flex-col bg-white p-8"
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="font-display text-xl uppercase tracking-[0.3em] text-ink">
                  {SITE.name}
                </span>
                <button
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl leading-none text-ink"
                >
                  &times;
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      className="font-display text-2xl uppercase tracking-wide text-ink transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <p className="mt-auto text-sm text-ink/50">{SITE.hours}</p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
