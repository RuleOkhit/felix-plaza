"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { STORE_PROFILE } from "@/data/store";
import { EASE, fadeUp, stagger, viewportOnce } from "@/lib/motion";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

const store = STORE_PROFILE;

// Live open/closed badge, computed on the client from the store's hours.
function OpenBadge() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      const h = new Date().getHours();
      setOpen(h >= store.opensAt && h < store.closesAt);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  if (open === null) {
    return <span className="text-sm font-semibold text-ink/40">Checking hours…</span>;
  }
  return open ? (
    <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      Open now · until 12:00 AM
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 text-sm font-bold text-accent">
      <span className="h-2.5 w-2.5 rounded-full bg-accent" />
      Closed · opens 10:00 AM
    </span>
  );
}

// Expandable weekly hours (height-animated, chevron rotates).
function HoursAccordion() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-ink/50">
          Weekly hours
        </span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="text-ink/50"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <ul className="pt-3">
              {store.hours.map((h) => (
                <li
                  key={h.days}
                  className="flex items-center justify-between border-b border-ink/5 py-2 text-sm last:border-0"
                >
                  <span className="text-ink/70">{h.days}</span>
                  <span className="font-semibold text-ink">{h.time}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const INFO_ICONS = {
  pin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  clock: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  phone: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  ),
};

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-primary">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-ink/50">{label}</p>
        <div className="mt-0.5 font-semibold text-ink">{children}</div>
      </div>
    </div>
  );
}

// Full-screen gallery lightbox in the search-overlay idiom (dark backdrop,
// Esc to close, round prev/next arrows).
function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onStep]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-6"
        >
          <button
            aria-label="Close gallery"
            className="absolute right-8 top-8 text-4xl leading-none text-white/80 transition-colors hover:text-white"
          >
            &times;
          </button>
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl"
          >
            <Image
              src={store.gallery[index]}
              alt={`${store.name} gallery image ${index + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </motion.div>
          <button
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              onStep(-1);
            }}
            className="absolute left-6 top-1/2 flex h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors duration-300 hover:bg-primary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              onStep(1);
            }}
            className="absolute right-6 top-1/2 flex h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors duration-300 hover:bg-primary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <span className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-sm text-white/80">
            {index + 1} / {store.gallery.length}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Store profile body: breadcrumb, about copy, tag pills and gallery on the
// left; sticky store-information card on the right.
export default function StoreProfile() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((i) =>
        i === null ? i : (i + dir + store.gallery.length) % store.gallery.length,
      ),
    [],
  );

  return (
    <section className="py-[50px] md:py-[70px]">
      <div className="px-4 md:px-[60px]">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-2">
            <Reveal>
              <nav aria-label="Breadcrumb" className="text-xs font-bold uppercase tracking-wider text-ink/50">
                <Link href="/shop" className="transition-colors hover:text-primary">
                  Shop
                </Link>
                <span className="mx-2">/</span>
                <span className="text-ink">{store.name}</span>
              </nav>

              <h2 className="mt-6 font-display text-[24px] uppercase leading-tight text-ink md:text-[32px]">
                About the store
              </h2>
              {store.about.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4 text-lg leading-relaxed text-ink/70">
                  {p}
                </p>
              ))}

              <div className="mt-7 flex flex-wrap gap-2">
                {store.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border-2 border-ink/10 px-4 py-1 text-sm font-semibold text-ink/70 transition-colors duration-300 hover:border-primary hover:text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Gallery */}
            <Reveal className="mt-12">
              <h3 className="mb-5 font-display text-xl uppercase text-ink">Gallery</h3>
            </Reveal>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-3 gap-4"
            >
              {store.gallery.map((img, i) => (
                <motion.button
                  key={`${img}-${i}`}
                  variants={fadeUp}
                  onClick={() => setLightbox(i)}
                  aria-label={`Open gallery image ${i + 1}`}
                  className="group relative aspect-square overflow-hidden rounded-xl"
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 33vw, 22vw"
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/30">
                    <svg
                      className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-3.8-3.8M11 8v6M8 11h6" />
                    </svg>
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Right column — sticky info card */}
          <div>
            <Reveal className="lg:sticky lg:top-28">
              <div className="rounded-2xl bg-surface p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl uppercase text-ink">
                    Store information
                  </h3>
                </div>
                <div className="mt-3">
                  <OpenBadge />
                </div>

                <div className="mt-7 space-y-6">
                  <InfoRow icon={INFO_ICONS.pin} label="Location">
                    {store.floor}
                    <span className="block text-sm font-normal text-ink/60">
                      {store.landmark}
                    </span>
                  </InfoRow>
                  <InfoRow icon={INFO_ICONS.clock} label="Today">
                    10:00 AM – 12:00 AM
                  </InfoRow>
                  <InfoRow icon={INFO_ICONS.phone} label="Phone">
                    <a href={`tel:${store.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-primary">
                      {store.phone}
                    </a>
                  </InfoRow>
                  <InfoRow icon={INFO_ICONS.mail} label="Email">
                    <a href={`mailto:${store.email}`} className="break-all transition-colors hover:text-primary">
                      {store.email}
                    </a>
                  </InfoRow>
                </div>

                <div className="my-7 h-px bg-ink/10" />
                <HoursAccordion />
                <div className="my-7 h-px bg-ink/10" />

                <Button href="/plan-your-visit" className="block w-full text-center">
                  Get Directions
                </Button>
                <Link
                  href="/offers"
                  className="mt-4 block text-center text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:text-ink"
                >
                  View current offers →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <Lightbox index={lightbox} onClose={() => setLightbox(null)} onStep={step} />
    </section>
  );
}
