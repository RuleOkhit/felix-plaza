"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { OfferView } from "@/data/offers";
import Reveal from "@/components/ui/Reveal";
import OfferViewer from "./OfferViewer";

// The offers, poster first: each one is shown whole at its own shape, with
// the store and the deal written underneath. A tap opens the viewer.
export default function OffersGrid({ offers }: { offers: OfferView[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  if (!offers.length) {
    return (
      <p className="px-4 pb-24 pt-6 text-ink/55 md:px-[60px] md:text-lg">
        New offers are on their way. Check back soon.
      </p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-10 px-4 pb-20 pt-4 md:grid-cols-3 md:gap-x-6 md:gap-y-14 md:px-[60px] md:pb-28 lg:grid-cols-4">
        {offers.map((o, i) => (
          <li key={o.slug}>
            <Reveal delay={(i % 4) * 0.06}>
              <button
                type="button"
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setIndex(i);
                }}
                className="group block w-full text-left"
              >
                <span
                  className="relative block overflow-hidden rounded-2xl bg-ink/5 shadow-[0_18px_40px_-24px_rgba(23,22,31,0.55)]"
                  style={{ aspectRatio: o.poster.width / o.poster.height }}
                >
                  <Image
                    src={o.poster.src}
                    alt={`${o.store.name}: ${o.title} ${o.detail}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={i < 4}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </span>
                <span className="mt-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45 md:text-[11px]">
                  {o.store.name}
                </span>
                <span className="mt-1 block font-display text-lg uppercase leading-tight text-ink transition-colors duration-300 group-hover:text-primary md:text-[22px]">
                  {o.title}
                </span>
                <span className="mt-1 block text-sm leading-snug text-ink/60">{o.detail}</span>
                {(o.store.floor || o.ends) && (
                  <span className="mt-2 block text-xs text-ink/40">
                    {[o.store.floor, o.ends].filter(Boolean).join(" · ")}
                  </span>
                )}
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <OfferViewer
        offers={offers}
        index={index}
        onIndex={setIndex}
        onClose={() => {
          setIndex(null);
          opener.current?.focus();
        }}
      />
    </>
  );
}
