import type { Metadata } from "next";
import DirectoryPage from "@/components/directory/DirectoryPage";
import { getSection } from "@/data/directory";

export const metadata: Metadata = { title: "Offers" };

export default function OffersPage() {
  return <DirectoryPage section={getSection("offers")!} />;
}
