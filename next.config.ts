import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Keep `next build` on the security-upgrade track. Without this, a clean
    // build (every Vercel deployment) exits 1 on an open advisory.
    agentUpgrade: "security",
  },
  async redirects() {
    return [
      {
        source: "/work/:slug",
        destination: "/work",
        permanent: true,
      },
    ];
  },
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
