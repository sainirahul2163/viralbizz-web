import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/caseStudies";
import { isDraftCaseStudy } from "@/lib/draft";
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
  const staticRoutes = routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: CONTENT_UPDATED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Case studies still carrying placeholder copy are left out. They are also
  // noindex, so listing them would be telling crawlers to fetch a page we have
  // asked them to ignore. They appear here automatically once the TODO copy in
  // content/caseStudies.ts is confirmed.
  const published = caseStudies
    .filter((study) => !isDraftCaseStudy(study))
    .map((study) => ({
      url: absoluteUrl(`/work/${study.slug}`),
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...published];
}
