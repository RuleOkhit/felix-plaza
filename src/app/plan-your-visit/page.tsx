import type { Metadata } from "next";
import { HERO_IMG, SITE } from "@/data/site";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Plan Your Visit" };

type Amenity = { label: string; icon: React.ReactNode };

const PARKING: Amenity[] = [
  {
    label: "Valet",
    icon: (
      <>
        <path d="M7 14.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M9.8 11.2 20 11.2l1.5 2.2M17 11.2v3.4" />
      </>
    ),
  },
  {
    label: "EV Charging",
    icon: (
      <>
        <path d="M5 21V7a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v14" />
        <path d="M3 21h13M9.6 9.6 7.8 12.8h2.6L8.6 16" />
        <path d="M14 11h3a2 2 0 0 1 2 2v3a1.6 1.6 0 0 0 3 0v-6l-2-2" />
      </>
    ),
  },
  {
    label: "Car Parking",
    icon: (
      <>
        <path d="M5 16.5h14M6.5 16.5V19a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1v-2.5" />
        <path d="M20.5 16.5V19a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-2.5" />
        <path d="M3.5 16.5v-4l2-5.5a1.5 1.5 0 0 1 1.4-1h10.2a1.5 1.5 0 0 1 1.4 1l2 5.5v4Z" />
        <path d="M6.5 12.5h1M16.5 12.5h1" />
      </>
    ),
  },
  {
    label: "Two Wheelers",
    icon: (
      <>
        <circle cx="5.5" cy="17" r="3.5" />
        <circle cx="18.5" cy="17" r="3.5" />
        <path d="M5.5 17 9 9h4l3 8M12 9h4M9.5 9 8 6H6" />
      </>
    ),
  },
];

const SERVICES: Amenity[] = [
  {
    label: "Free Wheelchairs",
    icon: (
      <>
        <circle cx="11" cy="17" r="4.5" />
        <circle cx="16.5" cy="4.5" r="1.6" />
        <path d="M15 9.5h-4.5V14H16l2.5 5.5M10.5 11.5H8" />
      </>
    ),
  },
  {
    label: "Free Baby Prams",
    icon: (
      <>
        <path d="M4 5h2l1.5 8h11" />
        <path d="M19 6a7 7 0 0 0-7 7h7Z" />
        <circle cx="9" cy="18.5" r="1.8" />
        <circle cx="17" cy="18.5" r="1.8" />
      </>
    ),
  },
  {
    label: "Lost and Found",
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m20 20-4.9-4.9" />
      </>
    ),
  },
  {
    label: "First Aid and Medical Room",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        <path d="M12 10.5v6M9 13.5h6" />
      </>
    ),
  },
  {
    label: "Ambulance Service",
    icon: (
      <>
        <path d="M3 16.5V8a1 1 0 0 1 1-1h9v9.5" />
        <path d="M13 10h3.6l3.4 3.8v2.7H13" />
        <circle cx="7.2" cy="17.6" r="1.9" />
        <circle cx="16.8" cy="17.6" r="1.9" />
        <path d="M6.6 11h3.4M8.3 9.3v3.4" />
      </>
    ),
  },
  {
    label: "Baby Feeding Room",
    icon: (
      <>
        <path d="M9.5 9.5h5V19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2Z" />
        <path d="M10.2 6.8h3.6v2.7h-3.6Z" />
        <path d="M11 3.4c.6.6 1.4.6 2 0" />
        <path d="M10.6 13.5h3.3" />
      </>
    ),
  },
  {
    label: "Accessible Washrooms",
    icon: (
      <>
        <path d="M5 21V4.2a1.2 1.2 0 0 1 1.2-1.2h11.6A1.2 1.2 0 0 1 19 4.2V21" />
        <path d="M3 21h18" />
        <circle cx="15.4" cy="12.2" r="1.1" />
      </>
    ),
  },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/45">
      {children}
    </p>
  );
}

function List({ heading, items }: { heading: string; items: Amenity[] }) {
  return (
    <>
      <h2 className="font-display text-[22px] uppercase tracking-[0.08em] text-ink md:text-[28px]">
        {heading}
      </h2>
      <ul className="mt-5 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-3 border-t border-ink/10 py-3.5"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="shrink-0 text-primary"
            >
              {item.icon}
            </svg>
            <span className="leading-snug text-ink">{item.label}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

// Plain type on the page: no bordered bar, no card, no panel. The details a
// visitor checks before setting off sit in three short columns at the top,
// with directions as a link under the address where it belongs, and the two
// lists follow. Body text stays at the site's normal size throughout.
export default function PlanYourVisitPage() {
  return (
    <>
      <PageHero
        title="Plan Your Visit"
        image={HERO_IMG.unwind}
        eyebrow="Before You Set Off"
      />

      <div className="px-4 md:px-[60px]">
        {/* The essentials */}
        <section className="grid gap-8 py-9 sm:grid-cols-2 md:gap-12 md:py-12 lg:grid-cols-3">
          <div>
            <Label>Open Daily</Label>
            <p className="mt-2 text-ink">{SITE.hours}</p>
            <p className="mt-1 text-ink/55">Every day of the week</p>
          </div>

          <div>
            <Label>Address</Label>
            <p className="mt-2 text-ink">{SITE.address}</p>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2.5 inline-flex items-center gap-1.5 font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-ink/40"
            >
              Get Directions
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <Label>Contact</Label>
            <p className="mt-2">
              <a
                href={`tel:${SITE.phoneLink}`}
                className="text-ink transition-colors duration-300 hover:text-primary"
              >
                {SITE.phone}
              </a>
            </p>
            <p className="mt-1">
              <a
                href={`mailto:${SITE.email}`}
                className="break-all text-ink transition-colors duration-300 hover:text-primary"
              >
                {SITE.email}
              </a>
            </p>
          </div>
        </section>

        <section className="border-t border-ink/10 py-9 md:py-12">
          <List heading="Parking" items={PARKING} />
        </section>

        <section className="border-t border-ink/10 py-9 pb-12 md:py-12 md:pb-16">
          <List heading="Customer Services" items={SERVICES} />
        </section>
      </div>
    </>
  );
}
