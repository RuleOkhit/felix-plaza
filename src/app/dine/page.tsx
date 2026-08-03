import type { Metadata } from "next";
import DirectoryPage from "@/components/directory/DirectoryPage";
import { getSection } from "@/data/directory";

export const metadata: Metadata = { title: "Dine" };

export default function DinePage() {
  return <DirectoryPage section={getSection("dine")!} />;
}
