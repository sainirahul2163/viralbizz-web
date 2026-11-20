import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { CtaLink } from "@/components/cta-link";
import { DraftBadge } from "@/components/draft-badge";
import { JsonLd } from "@/components/json-ld";
import { FinalCta } from "@/components/sections/final-cta";
import { articles, getArticle } from "@/content/articles";
import { getCaseStudy } from "@/content/caseStudies";
import { draftCopy, isDraftArticle } from "@/lib/draft";
import {
  articleFaqSchema,
  articleSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import { siteConfig } from "@/site.config";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

/**
 * Same reasoning as /work/[slug]: guides are a fixed set, so an unknown slug
 * must 404 on the first request rather than streaming a prerendered fallback
 * with a 200 and only 404ing on later cached hits. `dynamicParams` is not
 * available under Cache Components.
 */
export const ensureStatic = "navigation";

export async function generateMetadata({
  params,
}: PageProps<"/learn/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/learn/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `/learn/${article.slug}`,
      modifiedTime: article.updated,
    },
    ...(isDraftArticle(article)
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}

export default async function ArticlePage({
  params,
}: PageProps<"/learn/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const isDraft = isDraftArticle(article);
  const related = (article.relatedCaseStudies ?? [])
    .map((caseSlug) => getCaseStudy(caseSlug))
    .filter((study) => study !== undefined);

  return (
    <main className="pb-24 md:pb-16">
      <JsonLd data={articleSchema(article)} />
      {article.faqs?.length && !isDraft ? (
        <JsonLd data={articleFaqSchema(article.slug, article.faqs)} />
      ) : null}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Learn", path: "/learn" },
          { name: article.title, path: `/learn/${article.slug}` },
        ])}
      />

      {/* Same max-w as the body below, so the H1, the prose and the FAQ all
          share one left edge. */}
      <Container className="max-w-3xl pt-10 pb-6 md:pt-16">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/learn" className="hover:text-foreground">
                Learn
              </Link>
            </li>
          </ol>
        </nav>

        {isDraft ? (
          <p className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/5 px-4 py-3 text-sm text-amber-200">
            <DraftBadge />
            <span>
              This guide is unfinished — at least one section is still a
              placeholder. It is hidden from search engines until that is
              filled in.
            </span>
          </p>
        ) : null}

        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-balance md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {article.summary}
        </p>
      </Container>

      <Container className="max-w-3xl pb-12">
        {article.sections.map((section) => {
          const heading = draftCopy(section.heading);
          return (
            <section key={section.heading} className="mt-12 first:mt-0">
              <h2 className="flex flex-wrap items-center gap-2 text-2xl font-extrabold">
                {heading.isDraft ? <DraftBadge /> : null}
                <span>{heading.display}</span>
              </h2>
              {section.body.map((paragraph) => {
                const copy = draftCopy(paragraph);
                return (
                  <p
                    key={paragraph}
                    className="mt-4 flex flex-wrap items-center gap-2 leading-relaxed text-muted-foreground"
                  >
                    {copy.isDraft ? <DraftBadge /> : null}
                    <span>{copy.display}</span>
                  </p>
                );
              })}
              {section.bullets?.length ? (
                <ul className="mt-5 space-y-3">
                  {section.bullets.map((bullet) => {
                    const copy = draftCopy(bullet);
                    return (
                      <li
                        key={bullet}
                        className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm leading-relaxed text-neutral-300"
                      >
                        {copy.isDraft ? <DraftBadge /> : null}
                        <span>{copy.display}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </section>
          );
        })}
      </Container>

      {article.faqs?.length ? (
        <Container className="max-w-3xl pb-12">
          <h2 className="text-2xl font-extrabold">Common questions</h2>
          <dl className="mt-6 space-y-6">
            {article.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-bold">{faq.question}</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      ) : null}

      {related.length ? (
        <Container className="max-w-3xl pb-12">
          <h2 className="text-2xl font-extrabold">The work behind this</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map((study) => (
              <li key={study.slug}>
                <Link
                  href={`/work/${study.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition hover:border-lime/40"
                >
                  <span className="font-display text-3xl font-extrabold text-lime">
                    {study.totalViews}
                  </span>
                  <span className="mt-2 font-bold">{study.name}</span>
                  <span className="mt-1 text-sm text-muted-foreground">
                    Total TikTok views
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      ) : null}

      <Container className="max-w-3xl pb-8">
        <div className="flex flex-wrap gap-3">
          <CtaLink href={siteConfig.cta.href}>{siteConfig.cta.label}</CtaLink>
          <CtaLink href="/learn" variant="ghost">
            More guides
          </CtaLink>
        </div>
      </Container>

      <FinalCta />
    </main>
  );
}
