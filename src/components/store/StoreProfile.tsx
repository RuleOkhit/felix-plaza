"use client";

import type { Store } from "@/data/stores";
import { SITE, whatsappLink } from "@/data/site";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

function formatHour(h: number) {
  const hh = h % 24;
  const suffix = hh >= 12 ? "PM" : "AM";
  return `${hh % 12 === 0 ? 12 : hh % 12}:00 ${suffix}`;
}

const ICONS = {
  clock: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  phone: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  ),
  mail: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  ),
};

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-ink/8 py-4 last:border-0">
      <span className="mt-0.5 text-primary">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/45">
          {label}
        </p>
        <div className="mt-1 font-semibold text-ink">{children}</div>
      </div>
    </div>
  );
}

// Body of the store page. The header already carries the name, the line and
// the floor, so this is just the write up and the practical detail, kept in
// a light bordered panel rather than another filled box.
export default function StoreProfile({ store }: { store: Store }) {
  return (
    <section className="py-[40px] md:py-[64px]">
      <div className="px-4 md:px-[60px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Write up */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-4">
                <span aria-hidden className="h-px w-8 bg-primary/50" />
                <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink/50">
                  About {store.name}
                </h2>
              </div>
              <p className="mt-6 text-lg leading-relaxed text-ink/75 md:text-[19px] md:leading-[1.75]">
                {store.description}
              </p>
            </Reveal>
          </div>

          {/* Practical detail */}
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-ink/10 p-6 md:p-8">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink/50">
                  Visiting
                </h3>

                <div className="mt-2">
                  <DetailRow icon={ICONS.clock} label="Store timings">
                    {formatHour(store.opensAt)} to {formatHour(store.closesAt)}
                    <span className="block text-sm font-normal text-ink/55">
                      Monday to Sunday
                    </span>
                  </DetailRow>
                  {store.phone && (
                    <DetailRow icon={ICONS.phone} label="Phone">
                      <a
                        href={`tel:${store.phone.replace(/\s/g, "")}`}
                        className="transition-colors hover:text-primary"
                      >
                        {store.phone}
                      </a>
                    </DetailRow>
                  )}
                  {store.email && (
                    <DetailRow icon={ICONS.mail} label="Email">
                      <a
                        href={`mailto:${store.email}`}
                        className="break-all transition-colors hover:text-primary"
                      >
                        {store.email}
                      </a>
                    </DetailRow>
                  )}
                </div>

                <div className="mt-7 flex flex-col gap-3">
                  <Button href="/plan-your-visit" className="block w-full text-center">
                    Get Directions
                  </Button>
                  <a
                    href={whatsappLink(
                      `Hi ${SITE.name}! I have a question about ${store.name}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full border-2 border-whatsapp py-2.5 text-sm font-bold uppercase tracking-wider text-whatsapp transition-colors duration-500 hover:bg-whatsapp hover:text-white"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.37-.28.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.12 4.52.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35M12 2a10 10 0 0 0-8.55 15.2L2 22.5l5.42-1.42A10 10 0 1 0 12 2m0 18.16c-1.62 0-3.2-.43-4.57-1.25l-.33-.2-3.4.9.9-3.32-.21-.34A8.15 8.15 0 1 1 12 20.16" />
                    </svg>
                    Message us
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
