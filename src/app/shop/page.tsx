import type { Metadata } from "next";
import StoreDirectory from "@/components/directory/StoreDirectory";
import { SHOP_FILTERS, SHOP_STORES } from "@/data/store-directory";
import { onSite } from "@/data/parked";
import { BANNER } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Shops at Felix Plaza, Sector 82A Gurugram",
  absoluteTitle: true,
  description: "Fashion, ethnic wear, footwear, jewellery, beauty, electronics and home at Felix Plaza, Sector 82A, Gurugram. See every store and its floor.",
  path: "/shop/",
});

export default function ShopPage() {
  return (
    <StoreDirectory
      title="Shop"
      eyebrow="Store Directory"
      heroImage={BANNER.shop.src}
      heroFocus={BANNER.shop.focus}
      heroTitled={BANNER.shop.titled}
      intro="Fashion, ethnic wear, jewellery, beauty, electronics, luggage and home across every floor. Choose a category to narrow the list, or browse every store."
      stores={onSite(SHOP_STORES)}
      filters={SHOP_FILTERS}
      noun="stores"
      allLabel="All Stores"
      section="shop"
    />
  );
}
