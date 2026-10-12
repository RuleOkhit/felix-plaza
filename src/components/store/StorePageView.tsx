import type { Store } from "@/data/stores";
import { offerView, storeOffers } from "@/data/offers";
import StoreHero from "./StoreHero";
import StoreProfile from "./StoreProfile";
import RelatedStores from "./RelatedStores";

// One layout for every store page, whatever section it sits in. Any offers
// the store is running are looked up here and shown with its write up.
export default function StorePageView({ store }: { store: Store }) {
  const offers = storeOffers(store.slug).map(offerView);
  return (
    <>
      <StoreHero store={store} />
      <StoreProfile store={store} offers={offers} />
      <RelatedStores store={store} />
    </>
  );
}
