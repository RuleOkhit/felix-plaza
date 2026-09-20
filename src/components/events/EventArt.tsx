import Image from "next/image";
import type { FelixEvent } from "@/data/events";

export type ArtFormat = "portrait" | "landscape";

/** Whether an event has artwork (real or placeholder) in this format. */
export function hasFormat(event: FelixEvent, format: ArtFormat) {
  if (format === "portrait") return true;
  return Boolean(event.poster.landscape || event.placeholderLandscape);
}

/**
 * Width over height of an event's artwork in this format: the real file's
 * proportions where there is one, 9:16 or 16:9 for the placeholder.
 */
export function artRatio(event: FelixEvent, format: ArtFormat) {
  const art = event.poster[format];
  if (art) return art.width / art.height;
  return format === "portrait" ? 9 / 16 : 16 / 9;
}

// A poster drawn in the event's colours, standing in until the real creative
// arrives. Type sizes follow the width of the card (container units), so the
// same poster reads correctly as a small card or a full-width banner.
function PlaceholderPoster({
  event,
  format,
}: {
  event: FelixEvent;
  format: ArtFormat;
}) {
  const { from, to } = event.theme;
  const tall = format === "portrait";
  return (
    <div
      className="@container absolute inset-0 overflow-hidden text-white"
      style={{ background: `linear-gradient(${tall ? 160 : 120}deg, ${from} 0%, ${to} 100%)` }}
    >
      <span
        aria-hidden
        className={`absolute rounded-full bg-white/12 ${
          tall ? "-right-[30%] top-[16%] h-[85cqw] w-[85cqw]" : "-right-[8%] -top-[30%] h-[52cqw] w-[52cqw]"
        }`}
      />
      <span
        aria-hidden
        className={`absolute rounded-full border border-white/25 ${
          tall ? "-left-[22%] bottom-[20%] h-[60cqw] w-[60cqw]" : "left-[46%] top-[38%] h-[30cqw] w-[30cqw]"
        }`}
      />
      <div
        className={`relative flex h-full flex-col justify-between ${
          tall ? "p-[8cqw]" : "p-[5cqw]"
        }`}
      >
        <p className={`font-bold uppercase text-white/85 ${tall ? "text-[4cqw] tracking-[0.25em]" : "text-[1.6cqw] tracking-[0.3em]"}`}>
          Felix Plaza presents
        </p>
        <div>
          <p
            className={`font-display uppercase leading-[0.95] ${
              tall ? "text-[13cqw]" : "max-w-[60%] text-[6.4cqw]"
            }`}
          >
            {event.title}
          </p>
          <p className={`mt-[2cqw] font-semibold text-white/85 ${tall ? "text-[4.4cqw]" : "text-[1.9cqw]"}`}>
            {event.when}
          </p>
          <p className={`uppercase text-white/55 ${tall ? "mt-[7cqw] text-[3cqw] tracking-[0.2em]" : "mt-[3cqw] text-[1.2cqw] tracking-[0.25em]"}`}>
            Artwork coming soon
          </p>
        </div>
      </div>
    </div>
  );
}

// An event's creative in one format: the real file where there is one, the
// placeholder poster otherwise. Fills a positioned parent, so the parent
// decides the size and shape.
export default function EventArt({
  event,
  format,
  sizes,
  priority = false,
  className = "",
}: {
  event: FelixEvent;
  format: ArtFormat;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const art = event.poster[format];
  if (!art) return <PlaceholderPoster event={event} format={format} />;
  return (
    <Image
      src={art.src}
      alt={`${event.title}, ${event.when}`}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
