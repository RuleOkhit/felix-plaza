import type { MetadataRoute } from "next";
import { STORES } from "@/data/stores";
import { EVENTS } from "@/data/events";
import { absolute } from "@/lib/seo";

export const dynamic = "force-static";

// sitemap.xml: every page on the site, built from the same data as the pages
// themselves, so a new store or event is listed as soon as it is added.
// The date is the day the site was built.
export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date();
  const page = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly" | "yearly") => ({
    url: absolute(path),
    lastModified: built,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    page("/shop/", 0.9, "weekly"),
    page("/dine/", 0.9, "weekly"),
    page("/entertain/", 0.9, "weekly"),
    page("/offers/", 0.8, "daily"),
    page("/events/", 0.8, "weekly"),
    page("/plan-your-visit/", 0.9, "monthly"),
    ...STORES.map((s) => page(`/${s.section}/${s.slug}/`, 0.6, "monthly")),
    ...EVENTS.map((e) => page(`/events/${e.slug}/`, 0.6, "monthly")),
    page("/privacy-policy/", 0.2, "yearly"),
    page("/terms/", 0.2, "yearly"),
  ];
}
