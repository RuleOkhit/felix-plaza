import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StoreHero from "@/components/store/StoreHero";
import StoreProfile from "@/components/store/StoreProfile";
import CardCarousel from "@/components/home/CardCarousel";
import SectionHeader from "@/components/ui/SectionHeader";
import { STORES, getStore, relatedStores } from "@/data/stores";

type Params = { store: string };

// One page per entry in STORES — adding a store to the data file is all
// that is needed to publish its page.
export function generateStaticParams(): Params[] {
  return STORES.map((s) => ({ store: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { store: slug } = await params;
  const store = getStore(slug);
  if (!store) return {};
  return {
    title: store.name,
    description: store.about[0],
  };
}

export default async function StorePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { store: slug } = await params;
  const store = getStore(slug);
  if (!store) notFound();

  return (
    <>
      <StoreHero store={store} />
      <StoreProfile store={store} />

      {/* Related stores */}
      <section className="bg-surface py-[50px] md:py-[70px]">
        <div className="px-4 md:px-[60px]">
          <SectionHeader
            title="You May Also Like"
            text="More brands to explore while you're here."
            cta="View All Shops"
            href="/shop"
          />
          <CardCarousel items={relatedStores(store)} id="related" />
        </div>
      </section>
    </>
  );
}
