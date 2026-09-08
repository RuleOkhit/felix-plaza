"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { HERO_SLIDES } from "@/data/home";
import { SITE } from "@/data/site";
import { EASE } from "@/lib/motion";

// Full-bleed hero slider.
//
// The slides are finished artwork: the word (SHOP, DINE, ENTERTAIN, UNWIND),
// the rule beneath it and the chevron motif are all part of the image, and
// each frame is already colour graded. So this component draws no heading of
// its own and no heavy scrim; doing either would double up on the design.
//
// What the artwork costs us is freedom over the crop. The type sits in the
// left half, between 65% and 79% of the frame's height, so:
//   - the image is anchored left, never centred, or the first letter goes;
//   - the box keeps a near-square shape on phones, because a full-height
//     portrait crop of a 16:9 frame would show the middle third only and cut
//     the word out completely;
//   - the caption and dots sit low and compact, clear of the baked rule.
export default function HeroSlider() {
  return (
    <section className="relative h-[400px] w-full overflow-hidden lg:h-svh lg:min-h-[700px]">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        pagination={{ el: ".hero-dots", clickable: true, bulletClass: "hero-dot", bulletActiveClass: "hero-dot-active" }}
        className="h-full"
      >
        {HERO_SLIDES.map((slide, i) => (
          <SwiperSlide key={slide.title} className="relative h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-[0%_center] lg:object-[4%_center]"
            />
            {/* Only enough shading to hold the caption and the dots. The
                artwork is graded already, so anything more flattens it. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.2)_10%,transparent_24%)]"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hours and address, on one compact line so it always clears the rule
          drawn into the artwork above it */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
        className="absolute inset-x-0 bottom-[52px] z-10 px-4 lg:bottom-[58px] lg:px-[60px]"
      >
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-white/90 lg:text-sm">
          <li className="inline-flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            Open daily <strong className="font-bold">{SITE.hours}</strong>
          </li>
          <li className="hidden items-center gap-2 sm:inline-flex">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <strong className="font-bold">{SITE.address}</strong>
          </li>
        </ul>
      </motion.div>

      {/* Round nav arrows */}
      <button
        aria-label="Previous slide"
        className="hero-prev absolute left-6 top-1/2 z-10 hidden h-[60px] w-[60px] -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors duration-300 hover:bg-primary lg:flex"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button
        aria-label="Next slide"
        className="hero-next absolute right-6 top-1/2 z-10 hidden h-[60px] w-[60px] -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors duration-300 hover:bg-primary lg:flex"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Bar-style dots */}
      <div className="hero-dots absolute bottom-3.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-black/55 px-4 py-2.5 lg:bottom-4" />
    </section>
  );
}
