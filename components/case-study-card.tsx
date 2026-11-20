import Image from "next/image";
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
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-card p-6",
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
      <p className="mt-6 font-display text-5xl font-extrabold tracking-tight text-lime">
        {study.totalViews}
      </p>
      <h2 className="mt-3 text-xl font-bold">{study.name}</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Total TikTok views generated
      </p>
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
    </article>
  );
}
