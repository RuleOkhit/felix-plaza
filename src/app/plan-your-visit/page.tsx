import type { Metadata } from "next";
import { BANNER, SITE } from "@/data/site";
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
    label: "3 Level Car Parking",
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
    // A motorbike rather than a bicycle: seat and tank on top, the engine
    // block between the wheels, and front forks up to the handlebar.
    icon: (
      <>
        <circle cx="5" cy="16.5" r="3" />
        <circle cx="19" cy="16.5" r="3" />
        <path d="M5 16.5 8.5 13" />
        <path d="M3.5 10.8h4.2c.9-1.4 2.6-2 4.4-1.6l1.4.3" />
        <path d="M8.3 12.5h4.9l1.2 3H9.2Z" />
        <path d="M14.2 8.2h2.3M15.6 8.2 19 16.5" />
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
  {
    label: "Free WiFi",
    icon: (
      <>
        <path d="M2.5 9a14 14 0 0 1 19 0" />
        <path d="M5.6 12.4a9.6 9.6 0 0 1 12.8 0" />
        <path d="M8.7 15.8a5 5 0 0 1 6.6 0" />
        <circle cx="12" cy="19.2" r="0.9" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Clothes Tailoring",
    icon: (
      <>
        <circle cx="6" cy="6" r="2.6" />
        <circle cx="6" cy="18" r="2.6" />
        <path d="M8.2 7.5 20 17M8.2 16.5 20 7" />
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

// Plain type on the page: no bordered bar, no card, no panel. The two lists
// are what this page is for, so they lead; the practical details close it
// out, with directions as the one thing given real weight.
export default function PlanYourVisitPage() {
  return (
    <>
      <PageHero
        title="Plan Your Visit"
        image={BANNER.visit.src}
        focus={BANNER.visit.focus}
        eyebrow="Before You Set Off"
      />

      <div className="px-4 md:px-[60px]">
        <section className="py-9 md:py-12">
          <List heading="Parking" items={PARKING} />
        </section>

        <section className="border-t border-ink/10 py-9 md:py-12">
          <List heading="Customer Services" items={SERVICES} />
        </section>

        {/* Hours and address, then the one action worth pressing */}
        <section className="border-t border-ink/10 py-9 pb-12 md:py-12 md:pb-16">
          <div className="flex flex-wrap items-start gap-x-16 gap-y-7">
            <div>
              <Label>Open Daily</Label>
              <p className="mt-2 text-ink">{SITE.hours}</p>
              <p className="mt-1 text-ink/55">Every day of the week</p>
            </div>

            <div>
              <Label>Address</Label>
              <p className="mt-2 text-ink">{SITE.address}</p>
            </div>
          </div>

          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full border-2 border-primary bg-primary px-8 py-3 text-base font-bold text-white transition-all duration-500 ease-in-out hover:bg-transparent hover:text-primary md:mt-9 md:text-lg"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            Get Directions
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </a>
        </section>
      </div>
    </>
  );
}
