import type { Store } from "@/data/stores";
import StoreHero from "./StoreHero";
import StoreProfile from "./StoreProfile";
import RelatedStores from "./RelatedStores";

// One layout for every store page, whatever section it sits in.
export default function StorePageView({ store }: { store: Store }) {
  return (
    <>
      <StoreHero store={store} />
      <StoreProfile store={store} />
      <RelatedStores store={store} />
    </>
  );
}
