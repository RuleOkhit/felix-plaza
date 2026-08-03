# Homepage Image Spec — Felix Plaza

Status of every image on the homepage: what's already in, and what's still
needed. Files live in `public/images/` (logos in `public/images/logos/`) and
are wired up in `src/data/site.ts` (`IMG` and `LOGO` maps) and
`src/data/home.ts`.

**Global rules:** sRGB · photos as JPG/WebP (quality 75–85) · logos as
transparent PNG or SVG · everything is served through `next/image`, so
supply one large master per slot and Next generates the rest.

---

## ✅ Supplied — tenant logos (12)

Live on the homepage now, displayed **contained** on a white tile, so any
proportion works without cropping (the supplied files run from 4.5:1
Cinépolis to 0.7:1 Taco Bell and all sit correctly).

| Section | Brands |
| --- | --- |
| Store Spotlight (7) | H&M · WESTSIDE · CALVIN KLEIN · MARKS & SPENCER · LIFESTYLE · ADIDAS · TOMMY HILFIGER |
| Time to Dine (4) | HALDIRAM'S · BURGER KING · KFC · TACO BELL |
| Entertainment (1) | CINÉPOLIS |

---

## ⏳ Still needed

### A. Hero slider backgrounds — 4 photos

| | |
| --- | --- |
| Where | Full-screen hero: Shop / Dine / Play / Unwind |
| Aspect ratio | 16:9 master (cropped by `object-cover` to any screen) |
| **Export** | **2560 × 1440** (minimum 1920 × 1080) |
| Format | JPG or WebP, under ~400 KB each |

A dark gradient sits over the image (heaviest top-left) with the huge slide
title **dead centre**, hours + address **bottom-left**, progress bars
**bottom-centre** and the navbar **on top** — so keep the middle of the
frame calm. Phones crop the sides hard; keep the subject centred.

### B. Promo banner — 1 photo

| | |
| --- | --- |
| Where | Wide banner between Store Spotlight and Time to Dine |
| Aspect ratio | ~3.7:1 (1150 : 311) |
| **Export** | **2300 × 622** (minimum 1600 × 433) |
| Format | JPG or WebP |

Headline and copy sit on the **left** over a dark gradient with a button on
the right — keep the left third simple, and bake no text into the image.
Goes nearly square on mobile, so keep the subject centred.

### C. Missing logos — 7 brands

Currently held back from the homepage until artwork arrives. Two exceptions
sit on the page with **temporary text wordmarks**:

| Brand | Status |
| --- | --- |
| FUNCITY | placeholder wordmark on the page (`logos/funcity.svg`) |
| GAME X | placeholder wordmark on the page (`logos/game-x.svg`) |
| TASVA · FRIDO · CARATLANE | removed from Store Spotlight |
| AMRITSARI EXPRESS · KEVENTERS | removed from Time to Dine |

**Spec for these:** SVG, or transparent PNG at **1000 px or more on the
longest side**. Any aspect ratio is fine. The mark must be **dark or
full-colour** — a white/knockout version will be invisible on the white
tile. To add one: drop the file in `public/images/logos/`, add it to the
`LOGO` map in `src/data/site.ts`, and add the brand back to `TOP_SHOPS` or
`DINE_SPOTS` in `src/data/home.ts`.

### D. Brand assets

| Asset | Spec | Notes |
| --- | --- | --- |
| **Navbar logo** | SVG, or PNG at **height 120 px** (displays ~36–40 px) | Needs **two versions** — white for the transparent navbar over the hero, dark for the white navbar after scrolling. Max width ~260 px. Currently a text wordmark. |
| **Footer logo** | Same file, dark version | Displays ~200 px wide |
| **Favicon** | **512 × 512** PNG or SVG | Plus 180 × 180 (Apple touch icon) and 32 × 32 `.ico` |
| **Social share image** | **1200 × 630** JPG or PNG | The preview card when the link is shared — matters here given the WhatsApp focus |

---

## Summary

| | Count |
| --- | --- |
| ✅ Logos supplied and live | 12 |
| ⏳ Hero photos needed | 4 |
| ⏳ Promo banner needed | 1 |
| ⏳ Logos still missing | 7 |
| ⏳ Brand assets | logo (2 versions) + favicon set + share image |
