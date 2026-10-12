import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { SITE } from "@/data/site";
import { ADDRESS_LINE, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How the Felix Plaza website handles information about its visitors.",
  path: "/privacy-policy/",
});

// DRAFT for legal review. It describes the site as it is built today: no
// forms, no accounts, no analytics and no cookies of its own. Update it if
// any of that changes (adding Google Analytics, for example).
export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="12 October 2026"
      intro={`This policy explains what information the ${SITE.name} website (felixplaza.com) collects and how it is used. In short: the site does not ask you for any personal information, and it does not track you.`}
      sections={[
        {
          heading: "Who we are",
          body: [`${SITE.name} is a shopping mall at ${ADDRESS_LINE}, India. In this policy, "we" and "us" mean ${SITE.name}.`],
        },
        {
          heading: "Information we collect",
          body: [
            "The website has no sign up, no account and no forms. We do not ask for your name, phone number, email address or any other personal details on the site.",
            "Like every website, our hosting and content delivery providers keep short technical logs of requests made to the site, such as an IP address, the browser used and the page asked for. These are used only to keep the site running and secure.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "The website does not set cookies of its own and does not use advertising or analytics trackers. Our content delivery provider may set a strictly necessary cookie to protect the site from automated abuse. It does not identify you and is not used for marketing.",
          ],
        },
        {
          heading: "When you contact us",
          body: [
            `If you call us, message us on WhatsApp or email us, we use the details you share only to reply to you and help with your request. We do not sell or share them for marketing.`,
          ],
        },
        {
          heading: "Links to other websites",
          body: [
            "The site links to other services, such as Google Maps, WhatsApp, Instagram, Facebook, LinkedIn, YouTube and the websites of the brands at the mall. Their own privacy policies apply when you use them.",
          ],
        },
        {
          heading: "Changes to this policy",
          body: ["If we change how the site handles information, we will update this page and the date at the top."],
        },
        {
          heading: "Contact",
          body: [`For any question about this policy, email ${SITE.email} or call ${SITE.phone}.`],
        },
      ]}
    />
  );
}
