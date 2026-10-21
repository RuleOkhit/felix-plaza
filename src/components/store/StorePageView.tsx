import type { Store } from "@/data/stores";
import { offerView, storeOffers, storeUpcomingOffers } from "@/data/offers";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, storeJsonLd } from "@/lib/seo";
import StoreHero from "./StoreHero";
import StoreProfile from "./StoreProfile";
import RelatedStores from "./RelatedStores";

// One layout for every store page, whatever section it sits in. Any offers
// the store is running are looked up here and shown with its write up.
export default function StorePageView({ store }: { store: Store }) {
  const offers = storeOffers(store.slug).map(offerView);
  const upcoming = storeUpcomingOffers(store.slug).map(offerView);
  const section = { shop: "Shop", dine: "Dine", entertain: "Entertain" }[store.section];
  return (
    <>
      <JsonLd
        data={[
          storeJsonLd(store),
          breadcrumbJsonLd([
            { name: section, path: `/${store.section}/` },
            { name: store.name, path: `/${store.section}/${store.slug}/` },
          ]),
        ]}
      />
      <StoreHero store={store} />
      <StoreProfile store={store} offers={offers} upcomingOffers={upcoming} />
      <RelatedStores store={store} />
    </>
  );
}
