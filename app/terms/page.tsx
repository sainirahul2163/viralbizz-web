import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/site.config";

export const metadata = {
  title: "Terms",
  description: `Terms of use for ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="pb-24 md:pb-16">
      <PageHero
        title="Terms"
        description="TODO: confirm with legal — this is a draft placeholder, not a finished agreement."
      />
      <article className="mx-auto max-w-3xl space-y-6 px-4 pb-16 text-sm leading-relaxed text-muted-foreground sm:px-6">
        <p>
          The {siteConfig.name} website is for information only. Nothing here is
          a guarantee of views, installs, or ROI. Case-study numbers are
          historical results for named clients, not a promise of future
          performance.
        </p>
        <p>
          We do not publish pricing. Engagements start with a free strategy
          conversation.
        </p>
        <p>
          TODO: confirm legal entity name, registered address, and governing
          law.
        </p>
      </article>
    </main>
  );
}
