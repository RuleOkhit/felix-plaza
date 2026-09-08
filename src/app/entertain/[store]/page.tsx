import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StorePageView from "@/components/store/StorePageView";
import { getStore, storesIn } from "@/data/stores";

type Params = { store: string };

// Only the slugs listed below exist. This site is a static export, which
// does not support dynamicParams: true (the default), so a parked or
// unknown slug has to 404 rather than be rendered on demand.
export const dynamicParams = false;

// One page per store in this section, generated from the directory data.
export function generateStaticParams(): Params[] {
  return storesIn("entertain").map((s) => ({ store: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { store: slug } = await params;
  const store = getStore(slug);
  if (!store) return {};
  return { title: store.name, description: store.description };
}

export default async function StorePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { store: slug } = await params;
  const store = getStore(slug);
  if (!store || store.section !== "entertain") notFound();
  return <StorePageView store={store} />;
}
