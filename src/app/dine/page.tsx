import type { Metadata } from "next";
import StoreDirectory from "@/components/directory/StoreDirectory";
import { DINE_FILTERS, DINE_STORES } from "@/data/store-directory";
import { onSite } from "@/data/parked";
import { BANNER } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Restaurants, Cafés and Food Court at Felix Plaza, Gurugram",
  absoluteTitle: true,
  description: "A food court, cafés and sit-down restaurants at Felix Plaza, Sector 82A, Gurugram, from Haldiram's and KFC to Nando's and Blue Tokai. See every outlet and its floor.",
  path: "/dine/",
});

export default function DinePage() {
  return (
    <StoreDirectory
      title="Dine"
      eyebrow="Food & Drink"
      heroImage={BANNER.dine.src}
      heroFocus={BANNER.dine.focus}
      heroTitled={BANNER.dine.titled}
      intro="Filter coffee and slow mornings, a food court that settles every argument, and a proper sit down meal when the occasion calls for one."
      stores={onSite(DINE_STORES)}
      filters={DINE_FILTERS}
      noun="outlets"
      allLabel="All Outlets"
      section="dine"
    />
  );
}
