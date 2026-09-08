import type { Metadata } from "next";
import StoreDirectory from "@/components/directory/StoreDirectory";
import { DINE_FILTERS, DINE_STORES } from "@/data/store-directory";
import { onSite } from "@/data/parked";
import { BANNER } from "@/data/site";

export const metadata: Metadata = { title: "Dine" };

export default function DinePage() {
  return (
    <StoreDirectory
      title="Dine"
      eyebrow="Food & Drink"
      heroImage={BANNER.dine.src}
      heroFocus={BANNER.dine.focus}
      intro="Filter coffee and slow mornings, a food court that settles every argument, and a proper sit down meal when the occasion calls for one."
      stores={onSite(DINE_STORES)}
      filters={DINE_FILTERS}
      noun="outlets"
      allLabel="All Outlets"
      section="dine"
    />
  );
}
