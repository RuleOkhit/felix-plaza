"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND, NAV_LINKS, SITE, whatsappLink } from "@/data/site";
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
          {/* Logo — both colourways are rendered and cross-faded, so the
              swap on scroll never flashes an unloaded image */}
          <Link href="/" aria-label={SITE.name} className="shrink-0">
            <span
              className={`relative block transition-[height] duration-500 ease-in-out ${
                overHero ? "h-12 md:h-16" : "h-10 md:h-12"
              }`}
            >
              <Image
                src={BRAND.logo}
                alt={SITE.name}
                width={BRAND.logoWidth}
                height={BRAND.logoHeight}
                priority
                className={`h-full w-auto transition-opacity duration-500 ${
                  overHero ? "opacity-0" : "opacity-100"
                }`}
              />
              <Image
                src={BRAND.logoWhite}
                alt=""
                aria-hidden
                width={BRAND.logoWidth}
                height={BRAND.logoHeight}
                priority
                className={`absolute inset-0 h-full w-auto transition-opacity duration-500 ${
                  overHero ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
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
                <Image
                  src={BRAND.logo}
                  alt={SITE.name}
                  width={BRAND.logoWidth}
                  height={BRAND.logoHeight}
                  className="h-11 w-auto"
                />
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
              {/* Contact block — the two actions a phone visitor wants,
                  plus the essentials, pinned to the bottom of the panel */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
                className="mt-auto border-t border-ink/10 pt-6"
              >
                <div className="flex gap-3">
                  <a
                    href={`tel:${SITE.phoneLink}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-ink/15 py-2.5 text-sm font-bold text-ink transition-colors duration-300 hover:border-ink"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
                    </svg>
                    Call us
                  </a>
                  <a
                    href={whatsappLink(`Hi ${SITE.name}! I’d like some help, please.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp py-2.5 text-sm font-bold text-white transition-opacity duration-300 hover:opacity-90"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.37-.28.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.12 4.52.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35M12 2a10 10 0 0 0-8.55 15.2L2 22.5l5.42-1.42A10 10 0 1 0 12 2m0 18.16c-1.62 0-3.2-.43-4.57-1.25l-.33-.2-3.4.9.9-3.32-.21-.34A8.15 8.15 0 1 1 12 20.16" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-ink/50">
                  Open daily {SITE.hours}
                  <br />
                  {SITE.address}
                </p>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
