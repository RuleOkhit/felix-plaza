# Lifestyle Destination Template

A reusable Next.js template for a mall / lifestyle-destination website. All
content is placeholder — invented names, generic copy and five abstract SVG
images reused across the whole site — so you can drop in your own brand
without untangling anything.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Swiper

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all routes prerender statically)
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Full homepage: hero slider → shops carousel → promo banner → dine carousel → entertainment grid → app promo |
| `/shop`, `/dine`, `/entertain`, `/offers` | Shared directory template: short hero, featured carousel, category filter pills, A–Z sortable card grid |
| `/events` | Immersive featured-event hero (kinetic title, parallax, live countdown, marquee) + current-year archive in a lead-story layout |
| `/shop/atlas-supply` | Store profile: about, tag pills, gallery with lightbox, sticky info card (live open/closed badge, expandable hours), related-stores carousel |
| `/plan-your-visit` | Info cards + find-us strip |

## Where to change things

Everything you'd customize lives in three places:

- **`src/data/site.ts`** — site name, tagline, contact details (phone,
  WhatsApp number, email, address, hours), the WhatsApp quick-topic chips,
  nav/footer/social links, and the `IMG` map of placeholder images.
- **`src/data/home.ts`** — every homepage card/slide as plain arrays
  (`HERO_SLIDES`, `TOP_SHOPS`, `DINE_SPOTS`, `ENTERTAINMENT`, promos).
- **`src/data/directory.ts`** — the inner directory pages. Add an entry to
  `DIRECTORY_SECTIONS` and a tiny `page.tsx` and you have a new section page.
- **`src/data/events.ts`** — the featured event (name, meta, countdown
  target, highlight chips) and the current-year archive list.
- **`src/data/store.ts`** — the store profile (about, tags, hours, gallery,
  contact) and its related-stores list.

Design tokens (colors, fonts) are CSS variables in
**`src/app/globals.css`** (`@theme` block) — `--color-primary`,
`--color-accent`, `--color-ink`, `--color-surface`. Fonts are loaded in
**`src/app/layout.tsx`** via `next/font` (currently Marcellus + Mulish).

The 5 placeholder images live in `public/images/`. Replace the files (keep
the names) to re-skin every card, hero and banner at once.

## Component map

```
src/components/
  layout/   Navbar (fixed, transparent→solid on scroll, off-canvas mobile menu)
            SearchOverlay (full-screen, Esc to close)
            Footer (link columns + newsletter + legal bar)
            PageTransition (cross-route fade)
            SmoothScroll (Lenis inertia scrolling; respects reduced motion,
            self-disables where animation frames don't fire)
  home/     HeroSlider (Swiper fade, autoplay, bar dots, round arrows)
            CardCarousel (loop carousel, "shop"/"dine" variants, hover zoom)
            PromoBanner  EntertainGrid
            ContactSection (WhatsApp CTA + pre-filled topics + details card)
  directory/ DirectoryPage (hero + featured + filterable grid, used by
             shop/dine/entertain/offers)
  events/   EventsHero (kinetic title, parallax, countdown, marquee)
            EventArchive (lead story + supporting cards)
  store/    StoreProfile (info card, hours accordion, gallery + lightbox)
  ui/       Button (pill, color-invert hover)  SectionHeader  PageHero
            Reveal (scroll-triggered fade-up)
```

Shared animation variants (easing, fade-up, stagger) are in `src/lib/motion.ts`.

## Interaction notes

- Card images zoom `scale(1.1)` over 500 ms ease-in-out on hover.
- Pill buttons invert colors over 500 ms.
- Sections fade up once when scrolled into view (Framer Motion `whileInView`).
- Hero and card carousels autoplay; carousels pause on hover.
- The navbar is transparent over the homepage hero and gains a white
  background + shadow after 40 px of scroll (always solid on inner pages).
