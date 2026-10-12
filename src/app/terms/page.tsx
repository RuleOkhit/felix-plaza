import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "The terms for using the Felix Plaza website.",
  path: "/terms/",
});

// DRAFT for legal review.
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="12 October 2026"
      intro={`These terms apply to your use of the ${SITE.name} website (felixplaza.com). By using the site you agree to them.`}
      sections={[
        {
          heading: "About the information on this site",
          body: [
            "We keep the store directory, timings, events and offers up to date, but details can change at short notice. Stores may open, move or close, and event dates may change. Please check with us or the store before making a special trip.",
          ],
        },
        {
          heading: "Offers",
          body: [
            "Offers shown on the site are run by the individual stores, on their own terms and conditions, and for as long as they choose. Any question about an offer is best taken to the store running it.",
          ],
        },
        {
          heading: "Events",
          body: [
            "Events may be changed, postponed or cancelled. Where an event needs registration or has its own rules, those apply as well.",
          ],
        },
        {
          heading: "Names, logos and content",
          body: [
            `The ${SITE.name} name, logo, photographs and text on this site belong to ${SITE.name}. Store names and logos belong to their brands. Please do not copy or reuse them without permission.`,
          ],
        },
        {
          heading: "Links to other websites",
          body: ["Links to other websites are provided for convenience. We are not responsible for their content or how they work."],
        },
        {
          heading: "Liability",
          body: [
            "The site is provided as it is. We are not liable for any loss arising from using it or relying on the information it contains, to the extent the law allows.",
          ],
        },
        {
          heading: "Governing law",
          body: ["These terms are governed by the laws of India, and the courts at Gurugram, Haryana have jurisdiction."],
        },
        {
          heading: "Contact",
          body: [`For any question about these terms, email ${SITE.email} or call ${SITE.phone}.`],
        },
      ]}
    />
  );
}
