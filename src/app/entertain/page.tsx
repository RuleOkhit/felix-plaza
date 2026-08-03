import type { Metadata } from "next";
import DirectoryPage from "@/components/directory/DirectoryPage";
import { getSection } from "@/data/directory";

export const metadata: Metadata = { title: "Entertain" };

export default function EntertainPage() {
  return <DirectoryPage section={getSection("entertain")!} />;
}
