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

function Fact({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/40">
        {label}
      </dt>
      <dd className="mt-1 truncate text-[13.5px] font-semibold text-ink">
        {children}
      </dd>
    </div>
  );
}

function List({ heading, items }: { heading: string; items: Amenity[] }) {
  return (
    <>
      <h2 className="font-display text-[19px] uppercase tracking-[0.1em] text-ink md:text-[22px]">
        {heading}
      </h2>
      <ul className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-3 border-t border-ink/10 py-3"
          >
            <svg
              width="18"
              height="18"
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
            <span className="text-[14px] font-medium leading-snug text-ink">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

// Everything a visitor needs, in the order they need it. The practical
// details sit in one slim bar directly under the banner, so they are the
// first thing on the page on a phone as well as on a desktop, and the two
// lists that are actually the content of this page follow immediately.
export default function PlanYourVisitPage() {
  return (
    <>
      <PageHero
        title="Plan Your Visit"
        image={HERO_IMG.unwind}
        eyebrow="Before You Set Off"
      />

      <section className="border-b border-ink/10 bg-white">
        <div className="px-4 py-4 md:px-[60px] md:py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
            <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-3.5 sm:grid-cols-4 md:gap-x-10">
              <Fact label="Open Daily">{SITE.hours}</Fact>
              <Fact label="Address">{SITE.address}</Fact>
              <Fact label="Phone">
                <a
                  href={`tel:${SITE.phoneLink}`}
                  className="transition-colors duration-300 hover:text-primary"
                >
                  {SITE.phone}
                </a>
              </Fact>
              <Fact label="Email">
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors duration-300 hover:text-primary"
                >
                  {SITE.email}
                </a>
              </Fact>
            </dl>

            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[13px] font-bold text-white transition-opacity duration-300 hover:opacity-90"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 md:px-[60px] md:py-11">
        <List heading="Parking" items={PARKING} />
      </section>

      <section className="ground-tint px-4 py-8 pb-11 md:px-[60px] md:py-11 md:pb-14">
        <List heading="Customer Services" items={SERVICES} />
      </section>
    </>
  );
}
