import type { Metadata } from "next";
import { Marcellus, Mulish } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { SITE } from "@/data/site";
import JsonLd from "@/components/seo/JsonLd";
import { NOINDEX, SHARE_IMAGE, VERIFICATION, mallJsonLd, websiteJsonLd } from "@/lib/seo";

// Display + body pairing (replace to rebrand — both load via next/font).
const display = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Mulish({
  subsets: ["latin"],
  variable: "--font-body",
});

// Defaults for every page. Each page sets its own title, description and
// canonical address on top (see pageMetadata in lib/seo.ts).
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_IN",
    images: [SHARE_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [SHARE_IMAGE.url] },
  // The GitHub Pages test copy asks to be left out of search results.
  robots: NOINDEX
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  verification: {
    google: VERIFICATION.google || undefined,
    other: VERIFICATION.bing ? { "msvalidate.01": VERIFICATION.bing } : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${display.variable} ${body.variable} bg-white font-body text-ink antialiased`}
      >
        {/* What the mall is, for search engines and AI tools, on every page */}
        <JsonLd data={[mallJsonLd(), websiteJsonLd()]} />
        <SmoothScroll />
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
