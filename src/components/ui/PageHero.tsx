"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

// Inner-page banner. The title sits bottom left rather than dead centre:
// every one of these photographs carries its subject in the middle or to
// the right, so centred type would land on a face, a handbag or a bowl of
// pasta. Left aligning it also lines the title up with the page content
// underneath, which is left aligned throughout.
//
// `focus` is the object-position for the crop. Desktop crops these images
// vertically and the phone crops them horizontally, so each one carries both
// axes: without them the crop takes the middle and clips hands, feet and the
// bottom of a bag.
export default function PageHero({
  title,
  image,
  eyebrow,
  focus = "center",
}: {
  title: string;
  image: string;
  eyebrow?: string;
  focus?: string;
}) {
  return (
    <section className="relative flex h-[240px] items-end overflow-hidden md:h-[46vh] md:max-h-[480px] md:min-h-[300px]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: focus }}
      />

      {/* Readability. Weighted to the left, where the type sits, and eased
          off to the right so the photograph is still the photograph. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20"
      />

      <div className="relative z-10 w-full px-4 pb-8 md:px-[60px] md:pb-12">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white/70 md:mb-3"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}
          className="font-display text-[32px] uppercase leading-[0.95] tracking-[0.05em] text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.45)] sm:text-[42px] sm:tracking-[0.06em] md:text-[62px]"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}
