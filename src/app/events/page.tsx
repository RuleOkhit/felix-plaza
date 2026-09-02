import type { Metadata } from "next";

const EVENTS_URL = "https://events.felixplaza.com/";

export const metadata: Metadata = {
  title: "Events",
  // Static export cannot issue a server redirect, so the old URL forwards
  // itself. Anyone arriving from a bookmark or a search result lands on the
  // events site rather than a dead page.
  other: { refresh: `0; url=${EVENTS_URL}` },
  robots: { index: false, follow: true },
};

export default function EventsRedirect() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink/45">
        Redirecting
      </p>
      <h1 className="font-display text-[28px] uppercase leading-tight text-ink md:text-[38px]">
        Events Have Moved
      </h1>
      <p className="max-w-sm leading-relaxed text-ink/65">
        Felix Plaza events now live on their own site. You should arrive there
        in a moment.
      </p>
      <a
        href={EVENTS_URL}
        className="mt-2 inline-block rounded-full border-2 border-primary bg-primary px-7 py-2.5 text-base font-bold text-white transition-all duration-500 ease-in-out hover:bg-transparent hover:text-primary"
      >
        Continue to Events
      </a>
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(EVENTS_URL)});`,
        }}
      />
    </main>
  );
}
