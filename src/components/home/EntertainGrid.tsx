"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ENTERTAINMENT, SECTION_INTROS } from "@/data/home";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

// Three-column grid of entertainment cards with a staggered scroll reveal.
export default function EntertainGrid() {
  const intro = SECTION_INTROS.entertain;
  return (
    <section className="py-[50px] md:py-[70px]">
      <div className="px-4 md:px-[60px]">
        <SectionHeader
          title={intro.title}
          text={intro.text}
          cta={intro.cta}
          href={intro.href}
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 md:grid-cols-3"
        >
          {ENTERTAINMENT.map((item) => (
            <motion.div key={item.name} variants={fadeUp}>
              <Link href={item.href} className="group block">
                {/* Logo tile — contained so each mark keeps its proportions */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-ink/10 bg-white transition-all duration-500 ease-in-out group-hover:border-primary/40 group-hover:shadow-[0_14px_34px_-14px_rgba(23,22,31,0.3)]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-8 transition-transform duration-500 ease-in-out group-hover:scale-105 md:p-12"
                  />
                </div>
                <h3 className="mt-5 text-[21px] font-semibold text-ink transition-colors duration-300 group-hover:text-primary">
                  {item.name}
                </h3>
                <p className="mt-2 leading-relaxed text-ink/60">{item.blurb}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 text-center md:hidden">
          <Button href={intro.href}>{intro.cta}</Button>
        </div>
      </div>
    </section>
  );
}
