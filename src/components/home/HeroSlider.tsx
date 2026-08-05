"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { HERO_SLIDES } from "@/data/home";
import { SITE } from "@/data/site";
import { EASE } from "@/lib/motion";

// Full-viewport hero: autoplaying fade slider with a huge display heading,
// gradient scrim, bar-style pagination inside a dark pill, round nav arrows
// and an info caption pinned to the bottom-left (hours / location rows).
export default function HeroSlider() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative h-svh min-h-[560px] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        pagination={{ el: ".hero-dots", clickable: true, bulletClass: "hero-dot", bulletActiveClass: "hero-dot-active" }}
        onSlideChange={(s) => setActive(s.realIndex)}
        className="h-full"
      >
        {HERO_SLIDES.map((slide, i) => (
          <SwiperSlide key={slide.title} className="relative h-full">
            <Image
              src={slide.image}
              alt=""
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
            {/* Layered scrim. The photography is bright (pale ceilings and
                walls), so a single flat gradient leaves white display type
                illegible. Base tint + vertical gradient covering the two
                text zones (navbar at top, caption and dots at bottom) + a
                soft centre vignette behind the title, which keeps the
                edges of the frame bright. */}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(0,0,0,0.55),transparent_75%)]" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Big animated heading — re-animates on every slide change */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={active}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-[64px] uppercase leading-none tracking-[0.08em] text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.55),0_1px_4px_rgba(0,0,0,0.35)] md:text-[110px]"
          >
            {HERO_SLIDES[active].title}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Bottom-left caption: hours + location rows */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
        className="absolute bottom-[85px] left-0 z-10 hidden px-[60px] md:block"
      >
        <ul className="space-y-2 text-white">
          <li className="flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            <span>
              Open daily <strong>{SITE.hours}</strong>
            </span>
          </li>
          <li className="flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span>
              <strong>{SITE.address}</strong>
            </span>
          </li>
        </ul>
      </motion.div>

      {/* Round nav arrows */}
      <button
        aria-label="Previous slide"
        className="hero-prev absolute left-6 top-1/2 z-10 hidden h-[60px] w-[60px] -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors duration-300 hover:bg-primary md:flex"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button
        aria-label="Next slide"
        className="hero-next absolute right-6 top-1/2 z-10 hidden h-[60px] w-[60px] -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors duration-300 hover:bg-primary md:flex"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Bar-style dots inside a dark rounded pill */}
      <div className="hero-dots absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-black/60 px-5 py-3" />
    </section>
  );
}
