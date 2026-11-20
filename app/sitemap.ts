import type { MetadataRoute } from "next";
import { absoluteUrl, routes } from "@/lib/seo";

/**
 * Deliberately a fixed date rather than `new Date()`.
 *
 * Build time would mark every page as modified on every deploy, including
 * deploys that changed nothing on them — crawlers learn to ignore a `lastmod`
 * that behaves like that. Bump this when the site's content actually changes.
 */
const CONTENT_UPDATED = new Date("2026-11-20T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: CONTENT_UPDATED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
