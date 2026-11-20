import type { MetadataRoute } from "next";
import { faqs } from "@/content/faqs";
import { siteConfig } from "@/site.config";

/**
 * Every indexable route, in one place. `app/sitemap.ts` is generated from this
 * list, so a new page cannot quietly go missing from the sitemap — add it here
 * and both the sitemap and any future nav derive from the same source.
 */
export const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/work", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
] as const satisfies ReadonlyArray<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}>;

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

/**
 * Only the socials that actually exist. `instagram` and `tiktok` are still
 * `null` in site.config.ts, and a `sameAs` entry pointing at nothing is worse
 * than a short list.
 */
export function sameAs() {
  return [
    siteConfig.socials.linkedin,
    siteConfig.socials.x,
    siteConfig.socials.instagram,
    siteConfig.socials.tiktok,
  ].filter((url): url is string => Boolean(url));
}

const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/brand/og-image.jpg"),
      width: 1024,
      height: 1024,
    },
    // `siteConfig.legalName` is still a TODO placeholder, so it is deliberately
    // left out — a literal "TODO:" string in structured data is worse than an
    // absent field. Add `legalName` here once the entity is confirmed.
    email: siteConfig.emails.general,
    sameAs: sameAs(),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.emails.sales,
      url: absoluteUrl("/contact"),
      availableLanguage: "English",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
  };
}

/** Built from content/faqs.ts so the page and the schema cannot disagree. */
export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/faq")}#faq`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Article schema for a case study.
 *
 * `image` is deliberately absent. Article rich results want one, but the only
 * images we hold per study are small client logos, and attaching the generic
 * brand card to all four would describe none of them. Add it here once the
 * per-study video stills in CONTENT_TODO.md land — that is what unlocks the
 * rich result.
 */
export function caseStudySchema(study: {
  slug: string;
  name: string;
  totalViews: string;
  summary: string;
}) {
  const url = absoluteUrl(`/work/${study.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: `How ${study.name} reached ${study.totalViews} TikTok views`,
    description: study.summary,
    mainEntityOfPage: url,
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    about: { "@type": "Organization", name: study.name },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(
  trail: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
