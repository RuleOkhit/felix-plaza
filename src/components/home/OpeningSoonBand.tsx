import Image from "next/image";
import Link from "next/link";
import { OPENING_SOON } from "@/data/home";

// A label, a rule, and the marks themselves. Nothing moves, nothing is in a
// box, and there is no band around it: a row of greyed logos under the words
// "Opening Soon" already says the whole thing. It scrolls by hand on a phone
// the way any row of items does.
//
// The marks are stand ins from the existing directory. Swap
// OPENING_SOON.brands once the real line up is confirmed.
export default function OpeningSoonBand() {
  return (
    <section className="bg-white pb-7 pt-1 md:pb-9 md:pt-2">
      <div className="px-4 md:px-[60px]">
        <div className="flex items-center gap-4">
          <p className="shrink-0 text-[11px] font-bold uppercase tracking-[0.2em] text-ink/50">
            {OPENING_SOON.eyebrow}
          </p>
          <span aria-hidden className="h-px flex-1 bg-ink/10" />
          <Link
            href={OPENING_SOON.href}
            className="shrink-0 text-[13px] font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-ink/40"
          >
            {OPENING_SOON.cta}
          </Link>
        </div>

        <div className="scrollbar-none -mx-4 mt-4 flex items-center gap-9 overflow-x-auto px-4 md:mx-0 md:mt-5 md:gap-14 md:px-0">
          {OPENING_SOON.brands.map((b) => (
            <span
              key={b.slug}
              title={b.name}
              className="relative h-6 w-[76px] shrink-0 opacity-40 grayscale md:h-7 md:w-[92px]"
            >
              <Image
                src={b.logo}
                alt={b.name}
                fill
                sizes="92px"
                className="object-contain"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
