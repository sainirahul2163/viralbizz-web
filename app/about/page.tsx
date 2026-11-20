import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { team } from "@/content/team";
import { values } from "@/content/values";
import { siteConfig } from "@/site.config";

export const metadata = {
  title: "About",
  description: siteConfig.aboutIntro,
};

export default function AboutPage() {
  return (
    <main className="pb-24 md:pb-16">
      <PageHero
        title={siteConfig.aboutHeadline}
        description={siteConfig.aboutIntro}
      />
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="text-2xl font-bold">Mission</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          {siteConfig.mission}
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-lg font-bold">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="text-2xl font-bold">Team</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article key={member.slug} className="space-y-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-lime">{member.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
