import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyCard } from "@/components/case-study-card";
import { Container } from "@/components/container";
import { DraftBadge } from "@/components/draft-badge";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { PhoneFrame, VideoCard } from "@/components/video-card";
import { caseStudies } from "@/content/caseStudies";
import { draftCopy } from "@/lib/draft";
import { siteConfig } from "@/site.config";

export const metadata = {
  title: "Work",
  description: siteConfig.resultsHeadline,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const [featured, ...rest] = caseStudies;
  const featuredLine = featured ? draftCopy(featured.oneLiner) : null;

  return (
    <main className="pb-24 md:pb-16">
      <PageHero title="Work" description={siteConfig.resultsHeadline} />
      <Container className="pb-16">
        {featured && featuredLine ? (
          <Reveal>
            <article className="grid overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-[1.1fr_0.9fr]">
              <div className="flex flex-col p-6 md:p-10">
                <div className="inline-flex self-start rounded-lg bg-white px-3 py-2">
                  <Image
                    src={featured.logo}
                    alt=""
                    width={160}
                    height={48}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <p className="mt-8 font-display text-6xl font-extrabold tracking-tight text-lime md:text-7xl">
                  {featured.totalViews}
                </p>
                <h2 className="mt-4 text-3xl font-extrabold">{featured.name}</h2>
                <p className="mt-3 flex max-w-md flex-wrap items-center gap-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {featuredLine.isDraft ? <DraftBadge /> : null}
                  <span>{featuredLine.display}</span>
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.topVideos.map((views) => (
                    <span
                      key={views}
                      className="rounded-full border border-lime/30 bg-lime/5 px-3 py-1 text-xs font-semibold text-lime"
                    >
                      {views} top video
                    </span>
                  ))}
                </div>
                <Link
                  href={`/work/${featured.slug}`}
                  className="mt-8 inline-flex items-center gap-1 self-start text-sm font-semibold text-lime hover:underline"
                >
                  Read the {featured.name} case study
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="relative hidden items-end justify-center bg-[#0c0c0c] px-8 pt-10 pb-0 md:flex md:px-12">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(244,114,182,0.18),_transparent_55%)]"
                />
                <PhoneFrame className="relative z-10 w-[46%] max-w-[220px] translate-y-6 md:w-[52%]">
                  <VideoCard
                    appName={featured.name}
                    viewsLabel={featured.topVideos[0]}
                    accent={featured.accent}
                  />
                </PhoneFrame>
              </div>
            </article>
          </Reveal>
        ) : null}

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.05}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </Container>
    </main>
  );
}
