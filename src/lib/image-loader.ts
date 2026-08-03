// Custom next/image loader for static export.
//
// Next applies `basePath` to routes and /_next assets, but NOT to image
// srcs pointing at /public. On GitHub Pages the site is served from
// /<repo>/, so every image would 404 without this prefix. Empty locally.
const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({ src }: { src: string }) {
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;
  return `${prefix}${src}`;
}
