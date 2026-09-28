"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

// Inner-page banner, in the same language as the homepage hero: finished
// 4:1 artwork with the page name set large on the left, a thin rule under it
// ending in a small ring.
//
// Most banners carry that title in the artwork itself (`titled`), so the page
// only keeps its heading for screen readers and draws nothing over the top.
// For artwork without one, the title is set here in the same style.
//
// The banner sits below the fixed navigation bar and keeps the artwork's 4:1
// shape on desktop, so nothing is cropped. Phones get a taller 5:2 slice,
// cut according to `focus`: titled artwork is anchored left, where its words
// are.
export default function PageHero({
  title,
  image,
  focus = "center",
  titled = false,
}: {
  title: string;
  image: string;
  focus?: string;
  titled?: boolean;
}) {
  return (
    <section className="relative mt-[64px] flex aspect-[5/2] items-end overflow-hidden md:mt-[72px] md:aspect-[4/1]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: focus }}
      />

      {titled ? (
        <h1 className="sr-only">{title}</h1>
      ) : (
        <div className="relative z-10 w-full px-4 pb-[12%] md:px-[3.6%] md:pb-[3.4%]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.15 }}
            className="font-display text-[34px] uppercase leading-none text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] md:text-[6.6vw]"
          >
            {title}
          </motion.h1>
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mt-2 flex w-[48%] items-center md:mt-[0.6vw] md:w-[24%]"
          >
            <span className="h-px flex-1 bg-white/85" />
            <span className="h-2 w-2 shrink-0 rounded-full border border-white/85 md:h-[0.55vw] md:w-[0.55vw]" />
          </motion.span>
        </div>
      )}
    </section>
  );
}
