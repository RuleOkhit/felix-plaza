/**
 * Brands held back from the site.
 *
 * Nothing is deleted: the directory entry, the write up in store-copy.ts and
 * the logo file all stay exactly where they are. Removing a slug from this
 * set puts the brand back on every surface at once — directory grid, store
 * page, search, homepage rows and the related strips.
 *
 * The filter lives here rather than in store-directory.ts because that file
 * is generated from the mall's data.js, so an edit there would be lost the
 * next time it is rebuilt.
 */
export const PARKED = new Set<string>(["skechers"]);

/** Drops any parked brand from a list of directory entries. */
export function onSite<T extends { slug: string }>(stores: T[]): T[] {
  return stores.filter((s) => !PARKED.has(s.slug));
}
