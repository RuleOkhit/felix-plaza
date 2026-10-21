"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { OfferView } from "@/data/offers";
import Reveal from "@/components/ui/Reveal";
import OfferViewer from "@/components/offers/OfferViewer";
import { useLiveOffers } from "@/components/offers/useLiveOffers";

// A store's running offers, set under its write up and beside the visiting
// panel: a small poster with the deal written out next to it. A tap opens the
// poster large, in the same viewer the offers page uses.
export default function StoreOffers({
  storeName,
  offers: built,
  upcoming,
}: {
  storeName: string;
  offers: OfferView[];
  upcoming?: OfferView[];
}) {
  // Only what is running right now; the block goes once the last offer ends.
  const offers = useLiveOffers(built, upcoming);
  const [index, setIndex] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  if (!offers.length) return null;

  return (
    <div className="mt-12 md:mt-14">
      <Reveal>
        <div className="flex items-center gap-4">
          <span aria-hidden className="h-px w-8 bg-primary/50" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink/50">
            {offers.length > 1 ? "Offers" : "Offer"} at {storeName}
          </h2>
          <Link
            href="/offers"
            className="ml-auto text-[10px] font-bold uppercase tracking-[0.22em] text-primary transition-colors hover:text-ink"
          >
            All offers
          </Link>
        </div>
      </Reveal>

      <div className="mt-6 flex flex-col gap-8">
        {offers.map((o, i) => (
          <Reveal key={o.slug} delay={i * 0.06}>
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setIndex(i);
              }}
              className="group flex w-full items-center gap-5 text-left md:gap-8"
            >
              <span
                className="relative block w-[112px] shrink-0 overflow-hidden rounded-xl shadow-[0_18px_40px_-22px_rgba(23,22,31,0.6)] md:w-[150px]"
                style={{ aspectRatio: o.poster.width / o.poster.height }}
              >
                <Image
                  src={o.poster.src}
                  alt={`${o.store.name}: ${o.title} ${o.detail}`}
                  fill
                  sizes="150px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </span>
              <span className="min-w-0">
                {o.tagline && <span className="block text-sm text-ink/50">{o.tagline}</span>}
                <span className="mt-1 block font-display text-[26px] uppercase leading-[1] text-ink transition-colors duration-300 group-hover:text-primary md:text-[34px]">
                  {o.title}
                </span>
                <span className="mt-2 block leading-snug text-ink/70 md:text-lg">{o.detail}</span>
                {o.terms && <span className="mt-2 block text-xs text-ink/45">{o.terms}</span>}
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                  View offer
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <OfferViewer
        offers={offers}
        index={index}
        onIndex={setIndex}
        storeLink={false}
        onClose={() => {
          setIndex(null);
          opener.current?.focus();
        }}
      />
    </div>
  );
}
