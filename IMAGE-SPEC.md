# Image Spec — Felix Plaza

Developer-facing record of what artwork the site uses and what is still
outstanding. The designer-facing version of this list (with shot
suggestions and composition notes) is the **Shot List** artifact.

---

## ✅ Done

| Asset | Detail |
| --- | --- |
| Tenant logos | 106 files in `public/images/logos/`, ~2.2 MB total. Imported from `Final Store Infos`, trimmed and normalised to WebP, max 640 px. |
| Felix Plaza logo | `logo-felix-plaza.png` (brand purple) and `logo-felix-plaza-white.png` (knockout). Brand purple is **#352761**. |
| Favicon | `src/app/icon.png` |
| Adidas store page | `public/images/stores/adidas/` — banner + 3 gallery images |

Logos are displayed **contained** on a light tile so any proportion sits
correctly. Three carry their own solid ground and are painted to match
rather than framed in white:

| Logo | Panel colour |
| --- | --- |
| FunCity | `#4d3873` |
| Game X | `#030306` |
| Fun Block | `#ffffff` |

`NYKD BY NYKAA` is the only true white-knockout mark and renders on a dark
tile (`knockout: true` in `store-directory.ts`).

---

## ⏳ Outstanding

All still pointing at the placeholder SVGs in `public/images/`.

| # | Slot | Where | Export | Ratio |
| --- | --- | --- | --- | --- |
| 4 | Hero slider | Homepage | 2560 × 1440 | 16:9 |
| 1 | Page header | `/plan-your-visit` | 2400 × 900 | 3.4:1 |
| 1 | Page header | `/offers` | 2400 × 900 | 3.4:1 |
| 1 | Promo banner | Homepage | 2300 × 620 | 3.7:1 |
| 1 | Featured event | `/events` | 2560 × 1440 | 16:9 |
| 1 | Archive lead | `/events` | 2400 × 1030 | 21:9 → 4:5 |
| 3 | Archive cards | `/events` | 1200 × 900 | 4:3 |
| 6 | Offer cards | `/offers` | 1000 × 1000 | 1:1 |
| 1 | Find Us panel | `/plan-your-visit` | 1400 × 1100 | 1.3:1 |
| 1 | Social share | site-wide | 1200 × 630 | 1.91:1 |

⚠️ **The four hero photos need re-supplying.** They are saved at
2560 × 1440 but contain no detail beyond 1280 × 720 — verified by
round-tripping each through a 1280 downscale, which produced a mean pixel
delta of 0.00. They were upscaled and will look soft on large displays.

### Per-store template (repeatable)

| Asset | Export | Ratio |
| --- | --- | --- |
| Banner | 2000 × 540 | 3.7:1 |
| Gallery | 1000 × 1000 × 3 | 1:1 |

Only Adidas has a page so far. Its gallery files are 500 × 500 — fine as
thumbnails, soft in the lightbox; use 1000 × 1000 going forward.

---

## Also outstanding (not artwork)

- **Copy:** the six offer cards, the featured-event details, the four event
  recap lines, and the promo-banner headline are still placeholder text.
- **Open Graph metadata** is not configured — add it once the share card
  lands.
- **`/shop/atlas-supply`** is a fictional demo store used to prototype the
  store-page layout. Delete before launch.

---

## Conventions

- JPG or WebP, sRGB, quality ~80. Supply the largest size listed.
- **No text baked into images** — every headline is live type on top.
- The site is a static export with **no image optimizer**, so files are
  served as-is. Keep them compressed.
- Drop files in `public/images/` and wire them up in `src/data/`.
