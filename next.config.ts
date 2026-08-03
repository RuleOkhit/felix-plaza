import type { NextConfig } from "next";

// Deployed to GitHub Pages, which serves plain static files from a
// sub-path (https://<user>.github.io/<repo>/). So:
//  - `output: "export"` emits a fully static site into /out
//  - `basePath`/`assetPrefix` prefix every route and asset with the repo
//    name (set via BASE_PATH in CI; empty locally so `npm run dev` works)
//  - images use a custom loader: the optimizer needs a Node server (which
//    Pages does not run), and the loader also prefixes /public image paths
//    with basePath, which Next does not do on its own
//  - `trailingSlash` emits <route>/index.html, which is how Pages
//    resolves nested URLs
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
