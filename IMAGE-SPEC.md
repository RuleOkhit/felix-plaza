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

| Where | Brands |
| --- | --- |
| `/shop` — full directory | 69 stores (66 with real logos) |
| `/dine` — full directory | 15 outlets (all with real logos) |
| Homepage Store Spotlight | curated 7 |
| Homepage Time to Dine | curated 4 |
| Homepage Entertainment | FUNCITY · CINÉPOLIS (+ GAME X placeholder) |

All were trimmed of baked-in padding, capped at 600 px on the long edge and
converted to WebP (vector kept as SVG) — 87 files, 1.3 MB total. Three
knockout logos (BONKERS CORNER, ZUDIO, FUNCITY) are flagged `darkTile` and
render on the dark brand colour so they stay visible.

---

## ✅ Supplied — hero photography (4)

Live on the hero slider as Shop / Dine / Entertain / Unwind.

`Shop.jpeg` arrived at 7008 × 4672 (22.7 MB) and was downscaled to
2560 × 1707 (493 KB) — the site is a static export with no image
optimizer, so the original would have been downloaded in full by every
visitor. The other three were already 1280 × 720 and are used as-is (no
re-encode, to avoid a second generation of JPEG loss).

⚠️ **Worth re-shooting eventually:** three of the four are only 1280 px
wide, so they will look soft on large desktop displays. 2560 px masters
would sharpen them noticeably.

## ✅ Supplied — Felix Plaza logo

Extracted from the supplied vector PDF into three web assets:

| File | Use |
| --- | --- |
| `logo-felix-plaza.png` | Brand purple — solid navbar, footer |
| `logo-felix-plaza-white.png` | White knockout — navbar over the hero, contact band |
| `src/app/icon.png` | Favicon, white logo on a brand-purple tile |

For reference, the brand purple sampled from the artwork is **#352761**.

---

## ⏳ Still needed

### A. Promo banner — 1 photo

| | |
| --- | --- |
| Where | Wide banner between Store Spotlight and Time to Dine |
| Aspect ratio | ~3.7:1 (1150 : 311) |
| **Export** | **2300 × 622** (minimum 1600 × 433) |
| Format | JPG or WebP |

Headline and copy sit on the **left** over a dark gradient with a button on
the right — keep the left third simple, and bake no text into the image.
Goes nearly square on mobile, so keep the subject centred.

### B. Missing logos — 4 brands

Everything else from the store list is in. These four show a **temporary
text wordmark** and are marked `logoPending` in
`src/data/store-directory.ts`:

| Brand | Placeholder file |
| --- | --- |
| BARARA ETHNIC | `logos/barara-ethnic.svg` |
| HAPPYNEST | `logos/happynest.svg` |
| NYKAA LUXE | `logos/nykaa-luxe.svg` |
| GAME X | `logos/game-x.svg` (homepage only — not in the store list) |
| TASVA · FRIDO · CARATLANE | removed from Store Spotlight |
| AMRITSARI EXPRESS · KEVENTERS | removed from Time to Dine |

**Spec for these:** SVG, or transparent PNG at **1000 px or more on the
longest side**. Any aspect ratio is fine. The mark must be **dark or
full-colour** — a white/knockout version will be invisible on the white
tile. To add one: drop the file in `public/images/logos/`, add it to the
`LOGO` map in `src/data/site.ts`, and add the brand back to `TOP_SHOPS` or
`DINE_SPOTS` in `src/data/home.ts`.

### C. Social share image

**1200 × 630** JPG or PNG — the preview card shown when the link is shared.
Matters here given the WhatsApp focus. Include the logo and keep text well
inside the edges.

---

## Summary

| | Count |
| --- | --- |
| ✅ Tenant logos live | 83 |
| ✅ Hero photos live | 4 |
| ✅ Brand logo + favicon | done |
| ⏳ Promo banner needed | 1 |
| ⏳ Tenant logos still missing | 4 |
| ⏳ Social share image | 1 |
| ⚠️ Hero re-shoot (optional) | 3 low-res |
