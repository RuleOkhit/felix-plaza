import Image from "next/image";
import Link from "next/link";
import {
  BRAND,
  FOOTER_LEGAL_LINKS,
  NAV_LINKS,
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

// Compact footer: one identity row (logo / links / socials), one contact
// row, one slim legal bar. Everything wraps and centres on mobile so the
// whole footer stays about a screen-quarter tall instead of a full page.
export default function Footer() {
  return (
    <footer className="bg-surface">
      <div className="px-4 py-8 md:px-[60px] md:py-12">
        {/* Identity row */}
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          <Link href="/" aria-label={SITE.name} className="shrink-0">
            <Image
              src={BRAND.logo}
              alt={SITE.name}
              width={BRAND.logoWidth}
              height={BRAND.logoHeight}
              className="h-10 w-auto md:h-12"
            />
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 md:gap-x-8">
            {NAV_LINKS.map((l) => {
              const cls =
                "text-sm font-semibold uppercase tracking-wider text-ink/70 transition-colors duration-300 hover:text-primary";
              return l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                >
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} href={l.href} className={cls}>
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <ul className="flex items-center gap-3">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 hover:border-primary hover:bg-primary hover:text-white"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d={SOCIAL_PATHS[s.icon]} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="my-6 h-px bg-ink/10 md:my-8" />

        {/* Contact row — every item is small, inline and tappable */}
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink/70">
          <li className="inline-flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {SITE.address}
          </li>
          <li className="inline-flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            Open daily {SITE.hours}
          </li>
          <li>
            <a
              href={`tel:${SITE.phoneLink}`}
              className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-primary"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
              </svg>
              {SITE.phone}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-primary"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 6L2 7" />
              </svg>
              {SITE.email}
            </a>
          </li>
          <li>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-whatsapp transition-colors duration-300 hover:text-ink"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.37-.28.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.12 4.52.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35M12 2a10 10 0 0 0-8.55 15.2L2 22.5l5.42-1.42A10 10 0 1 0 12 2m0 18.16c-1.62 0-3.2-.43-4.57-1.25l-.33-.2-3.4.9.9-3.32-.21-.34A8.15 8.15 0 1 1 12 20.16" />
              </svg>
              WhatsApp
            </a>
          </li>
        </ul>
      </div>

      {/* Legal bar */}
      <div className="border-t border-ink/5 bg-white px-4 py-4 md:px-[60px]">
        <div className="flex flex-col-reverse items-center justify-between gap-2.5 text-xs text-ink/55 md:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {FOOTER_LEGAL_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="transition-colors duration-300 hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
