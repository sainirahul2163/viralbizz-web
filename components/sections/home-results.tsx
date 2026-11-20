import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { caseStudies } from "@/content/caseStudies";
import { siteConfig } from "@/site.config";

export function HomeResults() {
  return (
    <section id="work" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-sm font-medium tracking-wide text-lime">
            App install growth on TikTok
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-extrabold md:text-4xl">
            {siteConfig.resultsHeadline}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.05}>
              <Link
                href={`/work/${study.slug}`}
                aria-label={`${study.name} case study — ${study.totalViews} TikTok views`}
                className="block h-full rounded-2xl border border-border bg-card p-6 transition motion-safe:hover:-translate-y-1 hover:border-lime/40"
              >
                <div className="inline-flex rounded-lg bg-white px-2.5 py-1.5">
                  <Image
                    src={study.logo}
                    alt=""
                    width={140}
                    height={48}
                    className="h-7 w-auto object-contain"
                  />
                </div>
                <span className="mt-6 block font-display text-5xl font-extrabold tracking-tight text-lime">
                  {study.totalViews}
                </span>
                <h3 className="mt-3 text-xl font-bold">{study.name}</h3>
                <span className="mt-1 block text-sm text-muted-foreground">
                  Total TikTok views generated
                  {study.avgEngagementRate
                    ? ` · ${study.avgEngagementRate} avg. engagement`
                    : ""}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
