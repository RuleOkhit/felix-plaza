import Button from "@/components/ui/Button";
import { DIRECTORY_BAND } from "@/data/home";

// Sends people to the in-house store directory on the main site.
//
// Adapted from the "Find your favourite store" story creative: its headline,
// its rounded tile pattern and the shopping bags drifting in at opposite
// corners, redrawn in quieter tones so the strip sits with the rest of the
// page. A soft blush ground sets it apart from the white sections either
// side. Nothing moves; it is one short strip with one button.

function ExternalArrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  );
}

// The creative's background: rounded tiles (quarter discs, a leaf, an arch)
// repeating across the strip, faded out behind the words.
function Tiles() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_62%_75%_at_50%_50%,transparent_35%,black_85%)]"
    >
      <defs>
        <pattern id="directory-tiles" width="112" height="112" patternUnits="userSpaceOnUse">
          <g className="fill-felix-pink/[0.07]">
            <path d="M4 52V4a48 48 0 0 1 48 48Z" />
            <path d="M60 52V28a24 24 0 0 1 24-24h24v24a24 24 0 0 1-24 24Z" />
            <path d="M4 108V84a24 24 0 0 1 48 0v24Z" />
            <path d="M108 60v48H60a48 48 0 0 1 48-48Z" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#directory-tiles)" />
    </svg>
  );
}

const BAG_TONES = {
  pink: { front: "#f5b8cf", side: "#eca0bd", band: "#f9cddd" },
  lilac: { front: "#d9d0f4", side: "#c8bcee", band: "#e6e0f9" },
};

// A carrier bag seen three-quarter on, like the ones in the creative.
function Bag({ tone, className }: { tone: keyof typeof BAG_TONES; className: string }) {
  const c = BAG_TONES[tone];
  return (
    <svg
      viewBox="0 0 100 130"
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
    >
      <path d="M8 44h70v82H8Z" fill={c.front} />
      <path d="M78 44l16 6v72l-16 4Z" fill={c.side} />
      <path d="M8 44h70v8H8Z" fill={c.band} />
      <path
        d="M28 50V38c0-21 30-21 30 0v12"
        fill="none"
        stroke="#352761"
        strokeOpacity="0.75"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <circle cx="28" cy="50" r="2.6" fill="#352761" fillOpacity="0.75" />
      <circle cx="58" cy="50" r="2.6" fill="#352761" fillOpacity="0.75" />
    </svg>
  );
}

export default function DirectoryBand() {
  const { title, text, cta, href } = DIRECTORY_BAND;

  return (
    <section className="relative overflow-hidden bg-[#fbeef3]">
      <Tiles />
      <Bag
        tone="pink"
        className="-bottom-10 -left-6 w-[70px] -rotate-[16deg] md:bottom-auto md:-left-3 md:-top-8 md:w-[112px] md:-rotate-[18deg]"
      />
      <Bag
        tone="lilac"
        className="-bottom-9 -right-5 w-[72px] rotate-[14deg] blur-[1.5px] md:-bottom-14 md:right-6 md:w-[122px]"
      />

      <div className="relative flex flex-col items-center gap-5 px-4 py-8 text-center md:px-[60px] md:py-10 lg:flex-row lg:justify-center lg:gap-14 lg:text-left">
        <div>
          <h2 className="text-balance font-display text-[24px] uppercase leading-[1.05] tracking-wide text-felix md:text-[34px]">
            {title}
          </h2>
          <p className="mt-2 text-[15px] text-ink/65 md:text-base">{text}</p>
        </div>
        <Button href={href} external variant="brand" className="shrink-0">
          <span className="inline-flex items-center gap-2">
            {cta}
            <ExternalArrow />
          </span>
        </Button>
      </div>
    </section>
  );
}
