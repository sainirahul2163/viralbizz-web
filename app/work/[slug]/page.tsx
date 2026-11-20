import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { CtaLink } from "@/components/cta-link";
import { DraftBadge } from "@/components/draft-badge";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { FinalCta } from "@/components/sections/final-cta";
import { PhoneFrame, VideoCard } from "@/components/video-card";
import { caseStudies, getCaseStudy, getOtherCaseStudies } from "@/content/caseStudies";
import { getTestimonial } from "@/content/testimonials";
import type { CaseStudy } from "@/content/types";
import { draftCopy, isDraftCaseStudy } from "@/lib/draft";
import { breadcrumbSchema, caseStudySchema } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

/**
 * Case studies are a fixed set in content/caseStudies.ts, so any other slug is
 * a dead URL and must say so immediately.
 *
 * Without this, an unknown slug falls through to dynamic rendering and partial
 * prefetching serves the prerendered fallback first — committing a 200 —
 * before `notFound()` runs. Measured: the *first* request to /work/anything
 * returned 200 with "This page could not be found" in the body, and only later
 * cached requests returned a real 404. That is a soft 404, which is exactly
 * what a crawler should never be handed.
 *
 * `ensureStatic: 'navigation'` makes the first request wait for the complete
 * render, so the 404 status is set before anything is sent. (`dynamicParams`,
 * the pre-Cache-Components answer, now fails the build outright.)
 */
export const ensureStatic = "navigation";

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const summary = draftCopy(study.oneLiner).display;
  const title = `${study.name} — ${study.totalViews} TikTok views`;
  const description = `How ViralBizz grew ${study.name} to ${study.totalViews} TikTok views. ${summary}`;

  return {
    title,
    description,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/work/${study.slug}`,
    },
    // Unconfirmed copy must not reach the index. Removing the TODO prefixes in
    // content/caseStudies.ts flips this automatically.
    ...(isDraftCaseStudy(study)
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const isDraft = isDraftCaseStudy(study);
  const oneLiner = draftCopy(study.oneLiner);
  const testimonial = study.testimonialId
    ? getTestimonial(study.testimonialId)
    : undefined;
  const others = getOtherCaseStudies(study.slug);

  return (
    <main className="pb-24 md:pb-16">
      <JsonLd
        data={caseStudySchema({
          slug: study.slug,
          name: study.name,
          totalViews: study.totalViews,
          summary: oneLiner.display,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: study.name, path: `/work/${study.slug}` },
        ])}
      />

      <section className="relative overflow-hidden pt-10 pb-10 md:pt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at top left, ${study.accent}22, transparent 55%)`,
          }}
        />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/work" className="hover:text-foreground">
                  Work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">{study.name}</li>
            </ol>
          </nav>

          {isDraft ? (
            <p className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/5 px-4 py-3 text-sm text-amber-200">
              <DraftBadge />
              <span>
                Narrative copy on this page is unconfirmed placeholder text.
                It is hidden from search engines until the client signs it off —
                see CONTENT_TODO.md.
              </span>
            </p>
          ) : null}

          <div className="inline-flex rounded-lg bg-white px-3 py-2">
            <Image
              src={study.logo}
              alt=""
              width={160}
              height={48}
              className="h-8 w-auto object-contain"
            />
          </div>

          <h1 className="mt-8 max-w-3xl text-4xl font-extrabold tracking-tight text-balance md:text-6xl">
            How {study.name} reached{" "}
            <span className="text-lime">{study.totalViews}</span> TikTok views
          </h1>

          <p className="mt-5 flex max-w-2xl flex-wrap items-center gap-2 text-base leading-relaxed text-muted-foreground md:text-lg">
            {oneLiner.isDraft ? <DraftBadge /> : null}
            <span>{oneLiner.display}</span>
          </p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            <Metric label="Total TikTok views" value={study.totalViews} />
            {study.topVideos[0] ? (
              <Metric label="Top video" value={study.topVideos[0]} />
            ) : null}
            {study.avgEngagementRate ? (
              <Metric
                label="Avg. engagement"
                value={study.avgEngagementRate}
              />
            ) : null}
          </dl>
        </Container>
      </section>

      <Container className="pb-12">
        <h2 className="sr-only">Top performing videos</h2>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {study.videos.map((video, i) => (
            <li key={`${study.slug}-video-${i}`}>
              <PhoneFrame>
                <VideoCard
                  appName={study.name}
                  viewsLabel={video.viewsLabel}
                  poster={video.poster}
                  src={video.src}
                  embedUrl={video.embedUrl}
                  accent={study.accent}
                  showAppTab={false}
                  showPlay={i === 0}
                  showActions={i === 0}
                />
              </PhoneFrame>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="grid gap-10 pb-12 md:grid-cols-2 md:gap-14">
        <Narrative title="The challenge" body={study.challenge} />
        <Narrative title="What we did" body={study.whatWeDid} />
      </Container>

      <Container className="grid gap-10 pb-16 md:grid-cols-2 md:gap-14">
        <section>
          <h2 className="text-2xl font-extrabold">Formats</h2>
          <ul className="mt-5 space-y-3">
            {study.formats.map((format) => {
              const copy = draftCopy(format);
              return (
                <li
                  key={format}
                  className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-neutral-300"
                >
                  {copy.isDraft ? <DraftBadge /> : null}
                  <span>{copy.display}</span>
                </li>
              );
            })}
          </ul>
        </section>
        <Narrative title="Posting strategy" body={study.postingStrategy} />
      </Container>

      {testimonial ? (
        <Container className="pb-16">
          <Reveal>
            <figure className="rounded-3xl border border-border bg-card p-6 md:p-10">
              <blockquote className="max-w-3xl text-lg leading-relaxed text-pretty md:text-xl">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {testimonial.name}
                </span>
                {" — "}
                {testimonial.role}, {testimonial.company}
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      ) : null}

      <Container className="pb-16">
        <div className="flex flex-wrap gap-3">
          <CtaLink href={siteConfig.cta.href}>{siteConfig.cta.label}</CtaLink>
          <CtaLink href="/services" variant="ghost">
            See how we work
          </CtaLink>
        </div>
      </Container>

      {others.length ? (
        <Container className="pb-8">
          <h2 className="text-2xl font-extrabold">More work</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/work/${other.slug}`}
                  className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-5 transition hover:border-lime/40"
                >
                  <span className="font-display text-3xl font-extrabold text-lime">
                    {other.totalViews}
                  </span>
                  <span className="mt-2 font-bold">{other.name}</span>
                  <span className="mt-1 text-sm text-muted-foreground">
                    Total TikTok views
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      ) : null}

      <FinalCta />
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card px-5 py-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-display text-3xl font-extrabold tracking-tight text-lime">
        {value}
      </dd>
    </div>
  );
}

function Narrative({ title, body }: { title: string; body: CaseStudy["challenge"] }) {
  const copy = draftCopy(body);

  return (
    <section>
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <p className="mt-5 flex flex-wrap items-center gap-2 leading-relaxed text-muted-foreground">
        {copy.isDraft ? <DraftBadge /> : null}
        <span>{copy.display}</span>
      </p>
    </section>
  );
}
