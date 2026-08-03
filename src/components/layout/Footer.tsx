import Link from "next/link";
import {
  FOOTER_INFO_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_QUICK_LINKS,
  SITE,
  SOCIAL_LINKS,
  whatsappLink,
} from "@/data/site";

const SOCIAL_PATHS: Record<string, string> = {
  instagram:
    "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Zm5.2-1.2a.9.9 0 1 0 0 .01Z",
  facebook:
    "M14 8h2.5l.5-3h-3V3.5c0-.9.3-1.5 1.6-1.5H17V-.3A21 21 0 0 0 14.7 0C12.4 0 10.8 1.4 10.8 4v1H8v3h2.8v8h3.2Z",
  x: "M3 3l7.1 9.5L3.4 21h2.6l5.3-6.7L16 21h5l-7.5-10L20.2 3h-2.6l-4.8 6.1L8 3Z",
  youtube:
    "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3Z",
};

function SocialRow() {
  return (
    <ul className="flex items-center gap-4">
      {SOCIAL_LINKS.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            aria-label={s.label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-all duration-500 hover:border-primary hover:bg-primary hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d={SOCIAL_PATHS[s.icon]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

// Two-tier footer: grey link block + white legal bar
// (logo & blurb / quick links / info / contact details).
export default function Footer() {
  return (
    <footer>
      <div className="bg-surface pb-14 pt-16">
        <div className="px-4 md:px-[60px]">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Brand + social */}
            <div className="lg:col-span-4">
              <p className="font-display text-3xl uppercase tracking-[0.3em] text-ink">
                {SITE.name}
              </p>
              <p className="mt-5 max-w-sm leading-relaxed text-ink/70">
                {SITE.description}
              </p>
              <div className="mt-8 hidden items-center gap-5 md:flex">
                <h6 className="font-bold uppercase tracking-wider text-ink">
                  Follow Us
                </h6>
                <SocialRow />
              </div>
            </div>

            {/* Quick links */}
            <div className="col-span-1 lg:col-span-2">
              <h6 className="mb-5 font-bold uppercase tracking-wider text-ink">
                Quick Links
              </h6>
              <ul className="space-y-3">
                {FOOTER_QUICK_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-ink/70 transition-colors duration-300 hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div className="col-span-1 lg:col-span-2">
              <h6 className="mb-5 font-bold uppercase tracking-wider text-ink">
                Information
              </h6>
              <ul className="space-y-3">
                {FOOTER_INFO_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-ink/70 transition-colors duration-300 hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get in touch */}
            <div className="lg:col-span-4">
              <h6 className="mb-5 font-bold uppercase tracking-wider text-ink">
                Get In Touch
              </h6>
              <ul className="space-y-4">
                <li>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/45">
                    WhatsApp &amp; Phone
                  </p>
                  <a
                    href={`tel:${SITE.phoneLink}`}
                    className="mt-0.5 inline-block font-semibold text-ink transition-colors duration-300 hover:text-primary"
                  >
                    {SITE.phone}
                  </a>
                </li>
                <li>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/45">
                    Email
                  </p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="mt-0.5 inline-block font-semibold text-ink transition-colors duration-300 hover:text-primary"
                  >
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/45">
                    Open Daily
                  </p>
                  <p className="mt-0.5 font-semibold text-ink">{SITE.hours}</p>
                </li>
                <li>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/45">
                    Address
                  </p>
                  <p className="mt-0.5 font-semibold text-ink">{SITE.address}</p>
                </li>
              </ul>
              <a
                href={whatsappLink(`Hi ${SITE.name}! I’d like some help, please.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 rounded-full border-2 border-whatsapp bg-whatsapp px-6 py-2 text-sm font-bold text-white transition-all duration-500 ease-in-out hover:bg-transparent hover:text-whatsapp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.37-.28.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.12 4.52.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35M12 2a10 10 0 0 0-8.55 15.2L2 22.5l5.42-1.42A10 10 0 1 0 12 2m0 18.16c-1.62 0-3.2-.43-4.57-1.25l-.33-.2-3.4.9.9-3.32-.21-.34A8.15 8.15 0 1 1 12 20.16" />
                </svg>
                Chat on WhatsApp
              </a>
              <div className="mt-8 flex items-center gap-5 md:hidden">
                <h6 className="font-bold uppercase tracking-wider text-ink">
                  Follow Us
                </h6>
                <SocialRow />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-white py-6">
        <div className="flex flex-col items-center justify-between gap-4 px-4 md:px-[60px] lg:flex-row">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {FOOTER_LEGAL_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-sm text-ink/60 transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-center text-sm text-ink/60">
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink/60">
            <li>
              <a
                href={`tel:${SITE.phoneLink}`}
                className="transition-colors hover:text-ink"
              >
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="transition-colors hover:text-ink"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
