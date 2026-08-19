"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { floorLabel, type Store } from "@/data/stores";
import { SITE, whatsappLink } from "@/data/site";
import { EASE, fadeUp, stagger, viewportOnce } from "@/lib/motion";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

// 24h number → "10:00 PM"
function formatHour(h: number) {
  const hh = h % 24;
  const suffix = hh >= 12 ? "PM" : "AM";
  const display = hh % 12 === 0 ? 12 : hh % 12;
  return `${display}:00 ${suffix}`;
}

// Live open/closed badge, computed on the client from the store's hours.
function OpenBadge({ store }: { store: Store }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      const h = new Date().getHours();
      setOpen(h >= store.opensAt && h < store.closesAt);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, [store.opensAt, store.closesAt]);

  if (open === null) {
    return <span className="text-sm font-semibold text-ink/40">Checking hours…</span>;
  }
  // A quiet status chip — no flashing. The colour and the solid dot carry
  // the state; the time sits alongside as plain text.
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ring-1 ring-inset ${
          open
            ? "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20"
            : "bg-accent/10 text-accent ring-accent/25"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            open ? "bg-emerald-500" : "bg-accent"
          }`}
        />
        {open ? "Open now" : "Closed"}
      </span>
      <span className="text-sm text-ink/55">
        {open
          ? `until ${formatHour(store.closesAt)}`
          : `opens ${formatHour(store.opensAt)}`}
      </span>
    </div>
  );
}

// Escalator glyph — reads as "how you get to this floor" at a glance.
const EscalatorIcon = (
  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
    <path
      d="M3.5 25.5h4.6L21.4 9.6h7.1"
      stroke="currentColor"
      strokeWidth="2.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.4 25.5v-3M15.2 21v-3M19 16.4v-3"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      opacity="0.35"
    />
    <circle cx="15.4" cy="6.6" r="2.6" fill="currentColor" />
    <path
      d="M15.4 10.6v6.2"
      stroke="currentColor"
      strokeWidth="2.7"
      strokeLinecap="round"
    />
  </svg>
);

// Wayfinding block — the floor is the one thing a visitor really needs, so
// it gets a graphic and the boldest type in the card.
function FloorGraphic({ store }: { store: Store }) {
  const detail = [store.unit, store.landmark].filter(Boolean).join(" · ");
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-[0_3px_14px_-6px_rgba(23,22,31,0.25)]">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {EscalatorIcon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45">
          Location
        </p>
        <p className="text-xl font-bold leading-tight text-ink">
          {floorLabel(store.floor)}
        </p>
        {detail && <p className="mt-0.5 text-sm text-ink/60">{detail}</p>}
      </div>
    </div>
  );
}

// Expandable weekly hours (height-animated, chevron rotates).
function HoursAccordion({ store }: { store: Store }) {
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

// Full-screen gallery lightbox (dark backdrop, Esc to close, arrow keys).
function Lightbox({
  store,
  index,
  onClose,
  onStep,
}: {
  store: Store;
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
            className="relative aspect-square w-full max-w-2xl overflow-hidden rounded-2xl bg-white"
          >
            <Image
              src={store.gallery[index]}
              alt={`${store.name} image ${index + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 672px"
              className="object-contain"
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

// Store profile body: breadcrumb, description headed by the store's own
// name, tag pills and picture grid on the left; sticky info card with the
// floor badge on the right.
export default function StoreProfile({ store }: { store: Store }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((i) =>
        i === null ? i : (i + dir + store.gallery.length) % store.gallery.length,
      ),
    [store.gallery.length],
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

              {/* Section is headed by the store's own name */}
              <h2 className="mt-6 font-display text-[26px] uppercase leading-tight text-ink md:text-[34px]">
                {store.name}
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

            {/* Picture grid */}
            <Reveal className="mt-12">
              <h3 className="mb-5 font-display text-xl uppercase text-ink">
                {store.galleryLabel ?? "In Store"}
              </h3>
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
                  aria-label={`Open image ${i + 1}`}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-ink/10 bg-white"
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 33vw, 22vw"
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/25">
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
                  <OpenBadge store={store} />
                </div>

                {/* Location — the floor graphic does the talking */}
                <div className="mt-6">
                  <FloorGraphic store={store} />
                </div>

                <div className="mt-7 space-y-6">
                  <InfoRow icon={INFO_ICONS.clock} label="Today">
                    {formatHour(store.opensAt)} – {formatHour(store.closesAt)}
                  </InfoRow>
                  {store.phone && (
                    <InfoRow icon={INFO_ICONS.phone} label="Phone">
                      <a
                        href={`tel:${store.phone.replace(/\s/g, "")}`}
                        className="transition-colors hover:text-primary"
                      >
                        {store.phone}
                      </a>
                    </InfoRow>
                  )}
                  {store.email && (
                    <InfoRow icon={INFO_ICONS.mail} label="Email">
                      <a
                        href={`mailto:${store.email}`}
                        className="break-all transition-colors hover:text-primary"
                      >
                        {store.email}
                      </a>
                    </InfoRow>
                  )}
                </div>

                <div className="my-7 h-px bg-ink/10" />
                <HoursAccordion store={store} />
                <div className="my-7 h-px bg-ink/10" />

                <Button href="/plan-your-visit" className="block w-full text-center">
                  Get Directions
                </Button>
                <a
                  href={whatsappLink(
                    `Hi ${SITE.name}! I have a question about ${store.name}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-whatsapp transition-colors hover:text-ink"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.37-.28.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.12 4.52.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35M12 2a10 10 0 0 0-8.55 15.2L2 22.5l5.42-1.42A10 10 0 1 0 12 2m0 18.16c-1.62 0-3.2-.43-4.57-1.25l-.33-.2-3.4.9.9-3.32-.21-.34A8.15 8.15 0 1 1 12 20.16" />
                  </svg>
                  Ask guest services
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <Lightbox
        store={store}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onStep={step}
      />
    </section>
  );
}
