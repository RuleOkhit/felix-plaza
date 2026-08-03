import type { Metadata } from "next";
import DirectoryPage from "@/components/directory/DirectoryPage";
import { getSection } from "@/data/directory";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return <DirectoryPage section={getSection("shop")!} />;
}
