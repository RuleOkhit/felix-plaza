import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export const dynamic = "force-static";

// robots.txt: every crawler is welcome, AI search and assistant crawlers
// included (named below so it is plain that they are allowed on purpose),
// and they are pointed at the sitemap.
//
// The GitHub Pages test copy is kept out of search results by a noindex tag
// on every page instead (see NOINDEX in lib/seo.ts): a robots.txt only
// counts at the root of a domain, which that copy does not have.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "Googlebot",
          "Google-Extended",
          "Bingbot",
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Perplexity-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "Applebot",
          "Applebot-Extended",
          "meta-externalagent",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
