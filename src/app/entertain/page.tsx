import type { Metadata } from "next";
import EntertainmentDirectory from "@/components/directory/EntertainmentDirectory";

export const metadata: Metadata = { title: "Entertain" };

export default function EntertainPage() {
  return <EntertainmentDirectory />;
}
