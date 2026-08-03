"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CONTACT_TOPICS, SITE, whatsappLink } from "@/data/site";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const ICONS = {
  whatsapp: (
    <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.37-.28.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.12 4.52.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35M12 2a10 10 0 0 0-8.55 15.2L2 22.5l5.42-1.42A10 10 0 1 0 12 2m0 18.16c-1.62 0-3.2-.43-4.57-1.25l-.33-.2-3.4.9.9-3.32-.21-.34A8.15 8.15 0 1 1 12 20.16" />
  ),
  phone: (
    <path d="M6.6 2h3l1.5 4-2 1.4a12 12 0 0 0 5.5 5.5l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17.8 17.8 0 0 1 4.6 4.2 2 2 0 0 1 6.6 2Z" />
  ),
  mail: <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2.4.5L12 12.2 19.6 6H4.4Z" />,
  clock: (
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 10.6V6h-2v7.4l5.2 3.1 1-1.7-4.2-2.2Z" />
  ),
  pin: (
    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 6.2 12.3 6.5 12.6a.7.7 0 0 0 1 0C12.8 21.3 19 14.2 19 9a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
  ),
};

function Glyph({ d, size = 18 }: { d: keyof typeof ICONS; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      {ICONS[d]}
    </svg>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: keyof typeof ICONS;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
        <Glyph d={icon} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-white/50">
          {label}
        </p>
        <div className="mt-1 font-semibold text-white">{children}</div>
      </div>
    </li>
  );
}

// Contact section: a direct line to guest services over WhatsApp, with
// quick-start topics that pre-fill the first message, plus the essential
// call / email / hours / location details.
export default function ContactSection() {
  return (
    <section className="bg-ink py-[50px] text-white md:py-[70px]">
      <div className="px-4 md:px-[60px]">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          {/* Pitch + WhatsApp actions */}
          <div>
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-whatsapp" />
              Here To Help
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-6 font-display text-[28px] uppercase leading-tight md:text-[40px]"
            >
              We’re One Message Away
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-lg text-lg leading-relaxed text-white/70"
            >
              Store timings, today’s offers, lost &amp; found, or booking a space
              for your next event — send us a WhatsApp and our guest services
              team will take it from there.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              <a
                href={whatsappLink(
                  `Hi ${SITE.name}! I’d like some help, please.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border-2 border-whatsapp bg-whatsapp px-7 py-2.5 text-base font-bold text-white transition-all duration-500 ease-in-out hover:bg-transparent hover:text-whatsapp md:text-lg"
              >
                <Glyph d="whatsapp" size={22} />
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Quick-start topics — each opens WhatsApp with the message ready */}
            <motion.div variants={fadeUp} className="mt-9">
              <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                Start with
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {CONTACT_TOPICS.map((topic) => (
                  <li key={topic.label}>
                    <a
                      href={whatsappLink(topic.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full border border-white/25 px-4 py-1.5 text-sm font-semibold text-white/85 transition-all duration-300 hover:border-whatsapp hover:bg-whatsapp hover:text-white"
                    >
                      {topic.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Details card */}
          <motion.div variants={fadeUp}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-sm md:p-10">
              <h3 className="font-display text-xl uppercase tracking-wide text-white">
                Reach Us Directly
              </h3>
              <ul className="mt-7 space-y-6">
                <ContactRow icon="whatsapp" label="WhatsApp">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-whatsapp"
                  >
                    {SITE.phone}
                  </a>
                </ContactRow>
                <ContactRow icon="phone" label="Call us">
                  <a
                    href={`tel:${SITE.phoneLink}`}
                    className="transition-colors duration-300 hover:text-primary"
                  >
                    {SITE.phone}
                  </a>
                </ContactRow>
                <ContactRow icon="mail" label="Email">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="break-all transition-colors duration-300 hover:text-primary"
                  >
                    {SITE.email}
                  </a>
                </ContactRow>
                <ContactRow icon="clock" label="Open daily">
                  {SITE.hours}
                </ContactRow>
                <ContactRow icon="pin" label="Find us">
                  {SITE.address}
                </ContactRow>
              </ul>

              <div className="mt-8 border-t border-white/10 pt-6">
                <Link
                  href="/plan-your-visit"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:text-primary"
                >
                  Plan your visit
                  <span className="transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
