"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BRAND, SITE, whatsappLink } from "@/data/site";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

// Closing contact section, styled like the thing it offers: a WhatsApp chat.
// It runs full width like every other section, on white, with a soft green
// glow behind the chat instead of a card around it. The change of ground
// from the tinted Entertainment section is the only separation it needs.
// The Felix insignia is the chat avatar, and the call to action is shaped as
// a message input bar: tap the input, start the conversation. Kept short so
// it costs little scroll, especially on phones.
export default function ContactSection() {
  const chatHref = whatsappLink(`Hi ${SITE.name}! I’d like some help, please.`);

  return (
    <section className="relative overflow-hidden py-[44px] md:py-[70px]">
      {/* Soft green glow, centred behind the chat */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_45%_at_50%_78%,rgba(37,211,102,0.13),transparent_70%)] md:bg-[radial-gradient(ellipse_45%_85%_at_76%_50%,rgba(37,211,102,0.13),transparent_70%)]"
      />

      <div className="relative px-4 md:px-[60px]">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
        >
          {/* Pitch */}
          <div className="text-center md:text-left">
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-[0.25em] text-[#128c7e]"
            >
              Customer Services
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-3 font-display text-[24px] uppercase leading-[1.1] text-ink md:text-[34px]"
            >
              Anything You Need, Just Ask
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 hidden max-w-sm leading-relaxed text-ink/60 md:block"
            >
              Store timings, offers, lost &amp; found or event bookings. We
              reply in minutes.
            </motion.p>
          </div>

          {/* Chat */}
          <div className="mx-auto w-full max-w-sm">
            {/* Header */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2.5"
              aria-hidden
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
                <Image
                  src={BRAND.insignia}
                  alt=""
                  width={BRAND.insigniaWidth}
                  height={BRAND.insigniaHeight}
                  className="h-5 w-auto"
                />
              </span>
              <span className="text-sm font-bold text-ink">{SITE.name}</span>
              <span className="flex items-center gap-1.5 text-xs text-ink/45">
                <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" />
                online
              </span>
            </motion.div>

            {/* Bubbles */}
            <div className="mt-3.5 space-y-2" aria-hidden>
              <motion.div
                variants={fadeUp}
                className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-whatsapp px-3.5 py-2 text-left text-[13px] leading-snug text-white shadow-sm"
              >
                Hi! Till what time are you open today?
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="mr-auto w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2 text-left text-[13px] leading-snug text-ink shadow-sm"
              >
                We’re open till {SITE.closes} tonight, see you soon! 🛍️
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="mr-auto flex w-fit items-center gap-1 rounded-2xl rounded-bl-md bg-white/80 px-3.5 py-2.5 shadow-sm"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/35" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/35 [animation-delay:200ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink/35 [animation-delay:400ms]" />
              </motion.div>
            </div>

            {/* Input-bar CTA — the real action */}
            <motion.a
              variants={fadeUp}
              href={chatHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3.5 flex items-center justify-between gap-3 rounded-full bg-white py-1.5 pl-5 pr-1.5 shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Says "Tap" on touch screens and "Click" where there is a
                  mouse, so the bar reads as a button rather than an
                  empty input. */}
              <span className="truncate text-sm font-semibold text-ink/75 transition-colors duration-300 group-hover:text-ink">
                <span className="pointer-fine:hidden">Tap</span>
                <span className="hidden pointer-fine:inline">Click</span>{" "}
                here to message us on WhatsApp
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white transition-transform duration-300 ease-in-out group-hover:scale-110">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M3.4 20.4 20.85 12 3.4 3.6v6.53L15 12 3.4 13.87Z" />
                </svg>
              </span>
            </motion.a>

            <motion.p
              variants={fadeUp}
              className="mt-3 text-center text-xs text-ink/45"
            >
              Prefer to call?{" "}
              <a
                href={`tel:${SITE.phoneLink}`}
                className="font-semibold text-ink/70 transition-colors duration-300 hover:text-ink"
              >
                {SITE.phone}
              </a>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
