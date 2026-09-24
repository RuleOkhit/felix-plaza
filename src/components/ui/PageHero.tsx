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
//
// `whole` is for artwork taller than the desktop banner that should not be
// cropped: on desktop the full image sits in the middle at its own
// proportions (`ratio`, width over height), its sides feathered into a
// blurred copy of itself. Phones still fill the banner as normal.
export default function PageHero({
  title,
  image,
  eyebrow,
  focus = "center",
  whole,
}: {
  title: string;
  image: string;
  eyebrow?: string;
  focus?: string;
  whole?: { ratio: number };
}) {
  return (
    <section className="relative flex h-[240px] items-end overflow-hidden md:h-[46vh] md:max-h-[480px] md:min-h-[300px]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover ${whole ? "md:scale-110 md:blur-2xl md:saturate-125" : ""}`}
        style={{ objectPosition: focus }}
      />
      {whole && (
        <div className="absolute inset-0 hidden justify-center md:flex">
          <div
            className="relative h-full shrink-0 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
            style={{ aspectRatio: whole.ratio }}
          >
            <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>
      )}

      {/* Readability, kept as light as the type allows. Weighted to the
          left where the words sit and cleared entirely on the right, so the
          artwork keeps its colour. The shade is the Felix purple rather than
          black, which sits more kindly on the pastel illustrations. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-felix/60 via-felix/15 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-felix/35 via-transparent to-transparent"
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
