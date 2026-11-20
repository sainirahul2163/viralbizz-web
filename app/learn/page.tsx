import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { DraftBadge } from "@/components/draft-badge";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { FinalCta } from "@/components/sections/final-cta";
import { articles } from "@/content/articles";
import { isDraftArticle } from "@/lib/draft";

const published = articles.filter((article) => !isDraftArticle(article));

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Straight answers on organic TikTok for apps — what it costs, how much to post, how to tell whether it is working.",
  alternates: { canonical: "/learn" },
  // A hub with nothing published on it is a thin page. It becomes indexable on
  // its own as soon as one guide is confirmed.
  ...(published.length === 0 ? { robots: { index: false, follow: true } } : {}),
};

export default function LearnPage() {
  return (
    <main className="pb-24 md:pb-16">
      <PageHero
        title="Learn"
        description="Straight answers on organic TikTok for apps. No agency fog."
      />
      <Container className="pb-16">
        <ul className="grid gap-5 md:grid-cols-2">
          {articles.map((article, i) => {
            const isDraft = isDraftArticle(article);
            return (
              <li key={article.slug}>
                <Reveal delay={i * 0.05}>
                  <Link
                    href={`/learn/${article.slug}`}
                    className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition motion-safe:hover:-translate-y-1 hover:border-lime/40"
                  >
                    {isDraft ? (
                      <span className="mb-3">
                        <DraftBadge />
                      </span>
                    ) : null}
                    <h2 className="text-xl font-bold">{article.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {article.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-lime">
                      Read the guide
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
      <FinalCta />
    </main>
  );
}
