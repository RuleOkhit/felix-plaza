import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import CardCarousel from "@/components/home/CardCarousel";
import DirectoryBand from "@/components/home/DirectoryBand";
import EntertainGrid from "@/components/home/EntertainGrid";
import ContactSection from "@/components/home/ContactSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { DINE_SPOTS, SECTION_INTROS, TOP_SHOPS } from "@/data/home";
import { STORES } from "@/data/stores";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Felix Plaza | Shopping Mall in Sector 82A, Gurugram",
  absoluteTitle: true,
  description: `Felix Plaza is a shopping mall on NH 48 in Sector 82A, Gurugram, with ${STORES.length} stores, restaurants and entertainment venues, including Cinépolis and FunCity. Open daily, 11 AM to 10 PM.`,
  path: "/",
});

// Homepage — hero → top shops → store directory band → dine → entertainment
// → contact card → footer (in layout). Section grounds alternate between a
// near-white wash and a light tint (see globals.css) so nothing sits on
// flat white, while the tints stay far below the strength of the logos.
// Section CTAs live inside SectionHeader (pill on desktop, inline arrow
// link on mobile) so nothing is duplicated below the carousels.
export default function Home() {
  return (
    <>
      {/* The page's main heading. The hero artwork carries the words
          visually, so this one is for screen readers and search engines. */}
      <h1 className="sr-only">Felix Plaza, a shopping mall in Sector 82A, Gurugram</h1>
      <HeroSlider />

      {/* Top shops */}
      <section className="ground-soft py-[44px] md:py-[70px]">
        <div className="px-4 md:px-[60px]">
          <SectionHeader
            title={SECTION_INTROS.shops.title}
            text={SECTION_INTROS.shops.text}
            cta={SECTION_INTROS.shops.cta}
            href={SECTION_INTROS.shops.href}
            highlightCta
          />
          <CardCarousel items={TOP_SHOPS} id="shops" />
        </div>
      </section>

      <DirectoryBand />

      {/* Grounds alternate down the page (near-white, tint, white, tint)
          so neighbouring sections never run into one another */}
      <section className="bg-white py-[44px] md:py-[70px]">
        <div className="px-4 md:px-[60px]">
          <SectionHeader
            title={SECTION_INTROS.dine.title}
            text={SECTION_INTROS.dine.text}
            cta={SECTION_INTROS.dine.cta}
            href={SECTION_INTROS.dine.href}
            ctaVariant="accent"
          />
          <CardCarousel items={DINE_SPOTS} variant="dine" id="dine" />
        </div>
      </section>

      <EntertainGrid />
      <ContactSection />
    </>
  );
}
