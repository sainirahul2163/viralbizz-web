import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { cn } from "@/lib/utils";

export function CaseStudyCard({
  study,
  className,
}: {
  study: CaseStudy;
  className?: string;
}) {
  return (
    <Link
      href={`/work/${study.slug}`}
      aria-label={`${study.name} case study — ${study.totalViews} TikTok views`}
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition motion-safe:hover:-translate-y-1 hover:border-lime/40",
        className,
      )}
    >
      <div className="inline-flex self-start rounded-lg bg-white px-2.5 py-1.5">
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
      <h2 className="mt-3 text-xl font-bold">{study.name}</h2>
      <span className="mt-1 block text-sm text-muted-foreground">
        Total TikTok views generated
      </span>
      <div className="mt-4 flex flex-wrap gap-2">
        {study.topVideos.map((views) => (
          <span
            key={views}
            className="rounded-full border border-lime/30 bg-lime/5 px-2.5 py-1 text-xs font-semibold text-lime"
          >
            {views}
          </span>
        ))}
        {study.avgEngagementRate ? (
          <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {study.avgEngagementRate} engagement
          </span>
        ) : null}
      </div>
    </Link>
  );
}
