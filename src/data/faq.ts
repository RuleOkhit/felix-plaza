// ---------------------------------------------------------------------------
// ABOUT AND FAQ
//
// The homepage "about" words and the questions answered at the end of Plan
// Your Visit. Both are written answer-first and name Felix Plaza in full,
// because search engines and AI assistants quote a single answer on its own.
// The same questions are given to search engines as FAQ structured data and
// listed in llms.txt, so they only ever need editing here.
//
// House rule: the store count is always "150+", never an exact number.
// Approved by the mall in the "Felix Plaza FAQ and About" doc, 19 Oct 2026.
// ---------------------------------------------------------------------------

import { SOCIAL_LINKS } from "./site";

export const ABOUT = {
  body: "Felix Plaza is built for however you feel today. On a good-energy day, that's a film at Cinépolis, a round of bowling at Game X, rides at FunCity or an afternoon across 150+ stores. On a low-energy day, it's a slow coffee at Blue Tokai, a quiet hour in our outdoor garden, or dinner with nowhere else to be. Fully air-conditioned and open every day from 11 AM to 10 PM, in Sector 82A, Gurugram.",
  name: "About the name? Felix is Latin for lucky, the same word behind Felix Felicis, the \"liquid luck\" potion in Harry Potter. So Felix Plaza is, quite literally, the lucky plaza!",
};

/** Words in an answer to show as a link on the page. */
export type FaqLink = { text: string; href: string; external?: boolean };

export type Faq = { q: string; a: string; links?: FaqLink[] };

const INSTAGRAM = SOCIAL_LINKS.find((s) => s.icon === "instagram")!.href;

export const FAQS: Faq[] = [
  {
    q: "What are Felix Plaza's timings?",
    a: "Felix Plaza is open every day from 11 AM to 10 PM, weekends and public holidays included.",
  },
  {
    q: "Where is Felix Plaza and how do I get there?",
    a: "Felix Plaza is in Sector 82A, Gurugram, Haryana 122012. By car it's about 12 km from Rajiv Chowk, 5 km from Sector 84 and 39 km from Delhi airport via the Dwarka Expressway.",
  },
  {
    q: "Is there parking at Felix Plaza?",
    a: "Yes. Felix Plaza has three levels of paid car parking, paid valet parking, two wheeler parking and EV charging.",
  },
  {
    q: "Which brands are in Felix Plaza?",
    a: "Felix Plaza has 150+ stores, including H&M, Westside, Marks & Spencer, Lifestyle, Zudio, Tommy Hilfiger, adidas, Biba, Samsung and CaratLane. The store directory lists every store and its floor.",
    links: [{ text: "store directory", href: "/shop" }],
  },
  {
    q: "Does Felix Plaza have a food court?",
    a: "Yes. The food court is on the Third Floor, with Haldiram's, Burger King, KFC, Taco Bell, Wow! Momo and more. Nando's, Punjab Grill and Rajwada Bhog are sit-down restaurants.",
    links: [{ text: "food court", href: "/dine" }],
  },
  {
    q: "Is there a cinema at Felix Plaza?",
    a: "Yes. Felix Plaza has a 4-screen Cinépolis on the Third Floor.",
    links: [{ text: "Cinépolis", href: "/entertain/cinepolis" }],
  },
  {
    q: "What is there for kids at Felix Plaza?",
    a: "FunCity has rides and arcade games, Fun Block is soft play for younger children, and Game X has arcade games, VR and bowling. Free prams and a baby feeding room are available.",
    links: [
      { text: "FunCity", href: "/entertain/funcity" },
      { text: "Fun Block", href: "/entertain/fun-block" },
      { text: "Game X", href: "/entertain/game-x" },
    ],
  },
  {
    q: "How do I find out what's on at Felix Plaza?",
    a: "Every event is listed on the Events page at felixplaza.com/events and announced on Instagram at @felixplazaggm.",
    links: [
      { text: "Events page", href: "/events" },
      { text: "@felixplazaggm", href: INSTAGRAM, external: true },
    ],
  },
  {
    q: "Is Felix Plaza fully air-conditioned?",
    a: "Yes. Felix Plaza is fully air-conditioned, which makes it an easy place to spend a summer afternoon in Gurugram.",
  },
  {
    q: "Does Felix Plaza have an outdoor area for events?",
    a: "Yes. Felix Plaza has a 2-acre outdoor garden that hosts festivals and family events through the year, such as Mango Fest, YOG Mahotsav and NAV-UTSAV.",
  },
];
