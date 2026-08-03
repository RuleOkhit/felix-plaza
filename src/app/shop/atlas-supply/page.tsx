import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import StoreProfile from "@/components/store/StoreProfile";
import CardCarousel from "@/components/home/CardCarousel";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { RELATED_STORES, STORE_PROFILE } from "@/data/store";

export const metadata: Metadata = { title: STORE_PROFILE.name };

// Dedicated store profile page (placeholder store: Atlas Supply).
export default function AtlasSupplyPage() {
  return (
    <>
      <PageHero
        title={STORE_PROFILE.name}
        image={STORE_PROFILE.heroImage}
        eyebrow={`${STORE_PROFILE.category} · ${STORE_PROFILE.floor}`}
      />
      <StoreProfile />

      {/* Related stores */}
      <section className="bg-surface py-[50px] md:py-[70px]">
        <div className="px-4 md:px-[60px]">
          <SectionHeader
            title="You May Also Like"
            text="Placeholder line suggesting more stores to explore."
            cta="View All Shops"
            href="/shop"
          />
          <CardCarousel items={RELATED_STORES} id="related" />
          <div className="mt-8 text-center md:hidden">
            <Button href="/shop">View All Shops</Button>
          </div>
        </div>
      </section>
    </>
  );
}
