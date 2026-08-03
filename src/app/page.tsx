import HeroSlider from "@/components/home/HeroSlider";
import CardCarousel from "@/components/home/CardCarousel";
import PromoBanner from "@/components/home/PromoBanner";
import EntertainGrid from "@/components/home/EntertainGrid";
import ContactSection from "@/components/home/ContactSection";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { DINE_SPOTS, SECTION_INTROS, TOP_SHOPS } from "@/data/home";

// Homepage — section order mirrors the reference site:
// hero → top shops carousel → promo banner → dine carousel (grey) →
// entertainment grid → app promo → footer (in layout).
export default function Home() {
  return (
    <>
      <HeroSlider />

      {/* Top shops */}
      <section className="py-[50px] md:py-[70px]">
        <div className="px-4 md:px-[60px]">
          <SectionHeader
            title={SECTION_INTROS.shops.title}
            text={SECTION_INTROS.shops.text}
            cta={SECTION_INTROS.shops.cta}
            href={SECTION_INTROS.shops.href}
          />
          <CardCarousel items={TOP_SHOPS} id="shops" />
          <div className="mt-8 text-center md:hidden">
            <Button href={SECTION_INTROS.shops.href}>
              {SECTION_INTROS.shops.cta}
            </Button>
          </div>
        </div>
      </section>

      <PromoBanner />

      {/* Dine (grey background) */}
      <section className="bg-surface py-[50px] md:py-[70px]">
        <div className="px-4 md:px-[60px]">
          <SectionHeader
            title={SECTION_INTROS.dine.title}
            text={SECTION_INTROS.dine.text}
            cta={SECTION_INTROS.dine.cta}
            href={SECTION_INTROS.dine.href}
            ctaVariant="accent"
          />
          <CardCarousel items={DINE_SPOTS} variant="dine" id="dine" />
          <div className="mt-8 text-center md:hidden">
            <Button href={SECTION_INTROS.dine.href} variant="accent">
              {SECTION_INTROS.dine.cta}
            </Button>
          </div>
        </div>
      </section>

      <EntertainGrid />
      <ContactSection />
    </>
  );
}
