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

// The platforms' own app logos, in their brand colours, so each one is
// recognisable at a glance.
function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
          <defs>
            <radialGradient id="footer-ig" cx="0.3" cy="1.07" r="1.5">
              <stop offset="0" stopColor="#fdf497" />
              <stop offset="0.05" stopColor="#fdf497" />
              <stop offset="0.45" stopColor="#fd5949" />
              <stop offset="0.6" stopColor="#d6249f" />
              <stop offset="0.9" stopColor="#285aeb" />
            </radialGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="url(#footer-ig)" />
          <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.3" fill="none" stroke="#fff" strokeWidth="1.8" />
          <circle cx="16.1" cy="7.9" r="1" fill="#fff" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
          <circle cx="12" cy="12" r="11.5" fill="#fff" />
          <path
            fill="#0866ff"
            d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
          <rect width="24" height="24" rx="4" fill="#0a66c2" />
          <path
            fill="#fff"
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zm1.782 13.019H3.555V9h3.564v11.452z"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
          <path
            fill="#ff0000"
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
          />
          <path fill="#fff" d="M9.545 15.568V8.432L15.818 12z" />
        </svg>
      );
    default:
      return null;
  }
}

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

          <ul className="flex items-center gap-4">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="block h-8 w-8 transition-transform duration-300 ease-in-out hover:-translate-y-0.5"
                >
                  <SocialIcon icon={s.icon} />
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
