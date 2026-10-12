import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import OffersGrid from "@/components/offers/OffersGrid";
import { currentOffers, offerView } from "@/data/offers";
import { BANNER } from "@/data/site";

export const metadata: Metadata = {
  title: "Offers",
  description: "Current offers from stores at Felix Plaza.",
};

// Offers: the banner, a line of introduction and every running offer, poster
// first. Store lookups happen here so the page's script does not have to
// carry the whole directory.
export default function OffersPage() {
  const offers = currentOffers().map(offerView);
  return (
    <>
      <PageHero title="Offers" image={BANNER.offers.src} focus={BANNER.offers.focus} titled={BANNER.offers.titled} />

      <section className="pb-6 pt-[36px] md:pb-10 md:pt-[50px]">
        <div className="px-4 md:px-[60px]">
          <Reveal>
            <p className="max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
              The latest deals from stores across Felix Plaza. Tap an offer to see it in full.
            </p>
          </Reveal>
        </div>
      </section>

      <OffersGrid offers={offers} />
    </>
  );
}
