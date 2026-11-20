import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Keep `next build` on the security-upgrade track. Without this, a clean
    // build (every Vercel deployment) exits 1 on an open advisory.
    agentUpgrade: "security",
  },
  // There was a permanent /work/:slug -> /work redirect here. It threw away
  // the site's strongest SEO asset: four case studies with real numbers, whose
  // full narrative already exists in content/caseStudies.ts. Detail pages now
  // live at /work/[slug]; ones whose copy is still unconfirmed are noindex and
  // kept out of the sitemap rather than redirected away.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
