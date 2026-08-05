"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BRAND, SITE, whatsappLink } from "@/data/site";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

// Closing contact band. Deliberately short: one idea, one action. It sits
// on the brand purple so it reads as a signature moment between the white
// entertainment grid and the grey footer, and the contact details it would
// otherwise repeat already live in the footer directly below.
export default function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-[70px] md:py-[110px]">
      {/* Soft highlight so the flat colour has some depth */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(255,255,255,0.14),transparent_70%)]"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative mx-auto flex max-w-2xl flex-col items-center px-4 text-center"
      >
        <motion.div variants={fadeUp}>
          <Image
            src={BRAND.logoWhite}
            alt={SITE.name}
            width={BRAND.logoWidth}
            height={BRAND.logoHeight}
            className="h-16 w-auto md:h-20"
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-white/55"
        >
          Guest Services
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="mt-4 font-display text-[30px] uppercase leading-[1.05] text-white md:text-[48px]"
        >
          Anything You Need, Just Ask
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-md leading-relaxed text-white/70"
        >
          Store timings, offers, lost &amp; found or event bookings — message us
          and we’ll take care of it.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9">
          <a
            href={whatsappLink(`Hi ${SITE.name}! I’d like some help, please.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border-2 border-whatsapp bg-whatsapp px-8 py-3 text-base font-bold text-white transition-all duration-500 ease-in-out hover:bg-transparent hover:text-whatsapp md:text-lg"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.37-.28.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.12 4.52.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35M12 2a10 10 0 0 0-8.55 15.2L2 22.5l5.42-1.42A10 10 0 1 0 12 2m0 18.16c-1.62 0-3.2-.43-4.57-1.25l-.33-.2-3.4.9.9-3.32-.21-.34A8.15 8.15 0 1 1 12 20.16" />
            </svg>
            Chat on WhatsApp
          </a>
        </motion.div>

        {/* Quiet alternatives for anyone who would rather not use WhatsApp */}
        <motion.p
          variants={fadeUp}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-white/55"
        >
          <a
            href={`tel:${SITE.phoneLink}`}
            className="transition-colors duration-300 hover:text-white"
          >
            {SITE.phone}
          </a>
          <span aria-hidden className="text-white/30">
            ·
          </span>
          <a
            href={`mailto:${SITE.email}`}
            className="transition-colors duration-300 hover:text-white"
          >
            {SITE.email}
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
}
