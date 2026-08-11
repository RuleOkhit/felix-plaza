import HeroSlider from "@/components/home/HeroSlider";
import CardCarousel from "@/components/home/CardCarousel";
import PromoBanner from "@/components/home/PromoBanner";
import EntertainGrid from "@/components/home/EntertainGrid";
import ContactSection from "@/components/home/ContactSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { DINE_SPOTS, SECTION_INTROS, TOP_SHOPS } from "@/data/home";

// Homepage — hero → top shops carousel → promo banner → dine carousel
// (grey) → entertainment → contact card → footer (in layout).
// Section CTAs live inside SectionHeader (pill on desktop, inline arrow
// link on mobile) so nothing is duplicated below the carousels.
export default function Home() {
  return (
    <>
      <HeroSlider />

      {/* Top shops */}
      <section className="py-[44px] md:py-[70px]">
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

      <PromoBanner />

      {/* Dine (grey background) */}
      <section className="bg-surface py-[44px] md:py-[70px]">
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
