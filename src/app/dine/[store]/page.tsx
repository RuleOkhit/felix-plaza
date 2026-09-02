import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StorePageView from "@/components/store/StorePageView";
import { getStore, storesIn } from "@/data/stores";

type Params = { store: string };

// One page per store in this section, generated from the directory data.
export function generateStaticParams(): Params[] {
  return storesIn("dine").map((s) => ({ store: s.slug }));
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
  if (!store || store.section !== "dine") notFound();
  return <StorePageView store={store} />;
}
