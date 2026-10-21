import { SITE } from "@/data/site";
import { STORES, type Store } from "@/data/stores";
import { eventGroups } from "@/data/events";
import { liveOffers, offerView } from "@/data/offers";
import { ABOUT, FAQS } from "@/data/faq";
import { ADDRESS_LINE, absolute } from "@/lib/seo";

export const dynamic = "force-static";

// llms.txt: a plain summary of the mall for AI assistants and AI search
// (the llms.txt convention, https://llmstxt.org). It is written from the
// same data as the site, so it never falls out of step: every store with its
// category and floor, the events, the running offers and the visiting facts.

function storeLines(stores: Store[]) {
  return stores
    .map((s) => `- [${s.name}](${absolute(`/${s.section}/${s.slug}/`)}): ${s.category}, ${s.floorName}`)
    .join("\n");
}

export function GET() {
  const shop = STORES.filter((s) => s.section === "shop");
  const dine = STORES.filter((s) => s.section === "dine");
  const entertain = STORES.filter((s) => s.section === "entertain");
  const events = eventGroups().flatMap((g) => g.events);
  const offers = liveOffers().map(offerView);

  const text = `# ${SITE.name}

> ${SITE.name} is a shopping mall on NH 48 in Sector 82A, Gurugram (New Gurgaon), Haryana, India. It has ${SITE.storeCount} stores, a food court, a 4-screen Cinépolis, FunCity, Fun Block and Game X, and a 2-acre outdoor garden for events. It is fully air-conditioned and open every day from 11 AM to 10 PM.

${ABOUT.body}

${ABOUT.name}

## Visiting

- Address: ${ADDRESS_LINE}, India
- Map: ${SITE.mapsUrl} (latitude ${SITE.geo.lat}, longitude ${SITE.geo.lng})
- Opening hours: 11:00 AM to 10:00 PM, Monday to Sunday
- Phone: ${SITE.phone}
- Email: ${SITE.email}
- Parking: three levels of paid car parking, paid valet parking, two wheeler parking and EV charging
- Facilities: free wheelchairs and baby prams, baby feeding room, accessible washrooms, first aid and medical room, ambulance service, lost and found, free WiFi, clothes tailoring
- Plan your visit: ${absolute("/plan-your-visit/")}

## Sections

- [Shop](${absolute("/shop/")}): ${SITE.storeCount} stores across fashion, footwear, jewellery, beauty, electronics and home
- [Dine](${absolute("/dine/")}): a food court, cafés and restaurants
- [Entertain](${absolute("/entertain/")}): ${entertain.map((s) => s.name).join(", ")}
- [Offers](${absolute("/offers/")}): current offers from stores
- [Events](${absolute("/events/")}): events at the mall, month by month

## Questions and answers

${FAQS.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Shops

${storeLines(shop)}

## Food and drink

${storeLines(dine)}

## Entertainment

${storeLines(entertain)}

## Events

${events.map((e) => `- [${e.title}](${absolute(`/events/${e.slug}/`)}): ${e.when}. ${e.summary}`).join("\n")}
${
  offers.length
    ? `
## Current offers

${offers.map((o) => `- ${o.store.name}: ${o.title}, ${o.detail}${o.terms ? `. ${o.terms}` : ""}`).join("\n")}
`
    : ""
}`;

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
