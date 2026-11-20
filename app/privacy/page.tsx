import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/site.config";

export const metadata = {
  title: "Privacy",
  description: `Privacy policy for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <main className="pb-24 md:pb-16">
      <PageHero
        title="Privacy"
        description="TODO: confirm with legal — this is a draft placeholder, not a finished policy."
      />
      <article className="mx-auto max-w-3xl space-y-6 px-4 pb-16 text-sm leading-relaxed text-muted-foreground sm:px-6">
        <p>
          {siteConfig.name} ({siteConfig.url}) is a TikTok-first growth agency
          for apps. We collect only what we need to reply to you and run the
          site.
        </p>
        <p>
          Contact form submissions (when live) go to{" "}
          {siteConfig.emails.general} and {siteConfig.emails.sales}. We do not
          sell personal data.
        </p>
        <p>
          Analytics (GA4 and TikTok Pixel) will only run after you set the IDs
          in environment variables. A consent banner is planned before those
          pixels fire for EU visitors.
        </p>
        <p>
          TODO: confirm legal entity name, registered address, and governing
          law.
        </p>
      </article>
    </main>
  );
}
