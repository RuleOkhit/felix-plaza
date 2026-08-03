"use client";

import Image from "next/image";
import Link from "next/link";
import { OPENING_SOON } from "@/data/home";
import Reveal from "@/components/ui/Reveal";

// Full-width clickable promo banner: background image, heading + copy on the
// left, pill button on the right. The whole block is a single link and the
// background zooms subtly on hover.
export default function PromoBanner() {
  return (
    <section className="pb-[50px] md:pb-[70px]">
      <div className="px-4 md:px-[60px]">
        <Reveal>
          <Link
            href={OPENING_SOON.href}
            className="group relative block overflow-hidden rounded-2xl"
          >
            <div className="relative min-h-[260px] md:aspect-[1150/311] md:min-h-0">
              <Image
                src={OPENING_SOON.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 92vw"
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
              <div className="absolute inset-0 flex flex-col items-start justify-center gap-6 p-8 md:flex-row md:items-center md:justify-between md:px-14">
                <div className="max-w-xl">
                  <h3 className="font-display text-[26px] uppercase leading-tight text-white md:text-[36px]">
                    {OPENING_SOON.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-white/85 md:text-lg">
                    {OPENING_SOON.text}
                  </p>
                </div>
                <span className="inline-block shrink-0 rounded-full border-2 border-white bg-white px-7 py-2.5 text-base font-bold text-ink transition-all duration-500 ease-in-out group-hover:bg-transparent group-hover:text-white md:text-lg">
                  {OPENING_SOON.cta}
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
