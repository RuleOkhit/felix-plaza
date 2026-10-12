import type { Metadata } from "next";
import EntertainmentDirectory from "@/components/directory/EntertainmentDirectory";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cinépolis, FunCity and Games at Felix Plaza, Gurugram",
  absoluteTitle: true,
  description: "Movies at Cinépolis, rides and arcade games at FunCity, soft play at Fun Block, and arcade games, VR and bowling at Game X, all at Felix Plaza, Sector 82A, Gurugram.",
  path: "/entertain/",
});

export default function EntertainPage() {
  return <EntertainmentDirectory />;
}
