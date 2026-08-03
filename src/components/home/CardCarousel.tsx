"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import type { BrandCard } from "@/data/home";
import Reveal from "@/components/ui/Reveal";

type CardCarouselProps = {
  items: BrandCard[];
  variant?: "shop" | "dine";
  id: string;
};

// Slides visible per breakpoint. Capped at the item count so a short list
// fills the row instead of leaving a gap at the end.
const PER_VIEW = { base: 1.4, sm: 2.2, md: 2.8, lg: 3.5 };

// Loop carousel of brand-logo tiles. Logos are contained (never cropped)
// on a light tile, so marks of any proportion — from wide wordmarks to
// tall stacked lockups — sit consistently. Hover lifts the tile and eases
// the logo up 5%.
export default function CardCarousel({ items, variant = "shop", id }: CardCarouselProps) {
  const cap = (n: number) => Math.min(n, items.length);
  // Swiper needs roughly double the visible slides to loop without gaps;
  // below that it warns and misbehaves, so drive both loop and autoplay
  // off the item count. Adding more brands re-enables them automatically.
  const canLoop = items.length >= PER_VIEW.lg * 2;

  return (
    <Reveal className="relative">
      <Swiper
        modules={[Autoplay, Navigation]}
        loop={canLoop}
        speed={700}
        autoplay={
          canLoop
            ? { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }
            : false
        }
        navigation={{ prevEl: `.${id}-prev`, nextEl: `.${id}-next` }}
        spaceBetween={24}
        slidesPerView={cap(PER_VIEW.base)}
        breakpoints={{
          640: { slidesPerView: cap(PER_VIEW.sm) },
          900: { slidesPerView: cap(PER_VIEW.md) },
          1200: { slidesPerView: cap(PER_VIEW.lg) },
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.name}>
            <Link href={item.href} className="group block">
              <div className="relative aspect-square overflow-hidden rounded-xl border border-ink/10 bg-white transition-all duration-500 ease-in-out group-hover:border-primary/40 group-hover:shadow-[0_14px_34px_-14px_rgba(23,22,31,0.3)]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 60vw, (max-width: 1200px) 40vw, 30vw"
                  className="object-contain p-8 transition-transform duration-500 ease-in-out group-hover:scale-105 md:p-11"
                />
              </div>
              {variant === "shop" ? (
                <p className="mt-4 text-center text-base font-semibold uppercase tracking-wider text-ink transition-colors duration-300 group-hover:text-primary">
                  {item.name}
                </p>
              ) : (
                <div className="mt-4 text-center">
                  <p className="text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-primary">
                    {item.name}
                  </p>
                  <span className="text-sm font-semibold uppercase tracking-wider text-primary underline-offset-4 transition-colors duration-300 group-hover:underline">
                    See Details
                  </span>
                </div>
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Round nav arrows (desktop) — fade out when there's nothing to scroll */}
      <button
        aria-label="Previous"
        className={`${id}-prev absolute -left-4 top-[38%] z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-white shadow-lg transition-all duration-300 hover:bg-primary lg:flex [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-0`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button
        aria-label="Next"
        className={`${id}-next absolute -right-4 top-[38%] z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-white shadow-lg transition-all duration-300 hover:bg-primary lg:flex [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-0`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </Reveal>
  );
}
