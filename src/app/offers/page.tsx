import type { Metadata } from "next";
import OffersGrid from "@/components/offers/OffersGrid";
import { currentOffers, offerView, upcomingOffers } from "@/data/offers";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Offers and Deals at Felix Plaza, Gurugram",
  absoluteTitle: true,
  description: "The latest offers and deals from stores at Felix Plaza, Sector 82A, Gurugram.",
  path: "/offers/",
});

// Offers: a plain heading and a line of introduction, set like the events
// page, then every running offer, poster first. (The placeholder banner is
// kept as BANNER.offers in data/site.ts, should a real one arrive.) Store lookups happen here so the page's script does not have to
// carry the whole directory.
export default function OffersPage() {
  const offers = currentOffers().map(offerView);
  const upcoming = upcomingOffers().map(offerView);
  return (
    <>
      <header className="px-4 pb-8 pt-[112px] text-center md:pb-12 md:pt-[148px]">
        <h1 className="font-display text-[24px] uppercase leading-tight tracking-[0.14em] text-ink/85 md:text-[32px]">
          Offers at Felix Plaza
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-ink/55 md:text-lg">
          The latest deals from stores across the mall. Tap an offer to see it in full.
        </p>
      </header>

      <OffersGrid offers={offers} upcoming={upcoming} />
    </>
  );
}
