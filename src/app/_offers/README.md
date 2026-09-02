# Offers (parked)

This route is intentionally switched off. Next.js treats a folder that starts
with an underscore as private, so nothing in here is built or served.

To bring it back:

1. Rename `src/app/_offers` to `src/app/offers`.
2. Restore `{ label: "Offers", href: "/offers" }` in `NAV_LINKS` in
   `src/data/site.ts`.
