import { Check } from "lucide-react";
import { Container } from "@/components/container";
import { CtaLink } from "@/components/cta-link";
import { FinalCta } from "@/components/sections/final-cta";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Reveal } from "@/components/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { services } from "@/content/services";
import { siteConfig } from "@/site.config";

export const metadata = {
  title: "Services",
  description: siteConfig.servicesIntro,
  alternates: { canonical: "/services" },
};

const fit = [
  {
    title: "Apps only",
    body: "We collaborate with app founders and growth teams to grow apps with TikTok — faceless videos, UGC, and account growth built for installs.",
  },
  {
    title: "TikTok only",
    body: "Staying on one platform lets us build sharper strategies and viral content that translates directly into user growth.",
  },
  {
    title: "Custom proposals",
    body: "Every engagement is custom — posting volume, number of accounts, and content formats. No prices on this site, on purpose.",
  },
];

export default function ServicesPage() {
  return (
    <main className="pb-24 md:pb-16">
      <section className="relative overflow-hidden pt-16 pb-10 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(138,222,72,0.12),_transparent_50%)]"
        />
        <Container className="relative">
          <p className="text-sm font-medium tracking-wide text-lime">
            Faceless TikTok content agency
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-balance md:text-6xl">
            What we do
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {siteConfig.servicesIntro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href={siteConfig.cta.href}>{siteConfig.cta.label}</CtaLink>
            <CtaLink href="#services-list" variant="ghost">
              See the four services
            </CtaLink>
          </div>
        </Container>
      </section>

      <Container className="pb-8">
        <nav aria-label="Services" className="flex flex-wrap gap-2">
          {services.map((service, i) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-lime/40 hover:text-foreground"
            >
              {String(i + 1).padStart(2, "0")} {shortTitle(service.title)}
            </a>
          ))}
        </nav>
      </Container>

      <section id="services-list">
        <Container className="space-y-6 pb-8">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.04}>
            <article
              id={service.slug}
              className="scroll-mt-24 rounded-3xl border border-border bg-card p-6 md:p-10"
            >
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
                <div className="flex shrink-0 items-center gap-3 md:w-16 md:flex-col md:items-start">
                  <span className="font-display text-sm font-bold tracking-widest text-lime">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ServiceIcon slug={service.slug} className="size-6 text-lime" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-extrabold md:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm text-neutral-300">
                        <Check className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
        </Container>
      </section>

      <HowWeWork />

      <section className="scroll-mt-24 pb-8">
        <Container>
          <Reveal>
            <p className="text-sm font-medium tracking-wide text-lime">
              Who this is for
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-extrabold md:text-4xl">
              Built for app teams on TikTok
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {fit.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <article className="h-full rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </main>
  );
}

function shortTitle(title: string) {
  if (title.startsWith("Faceless")) return "Faceless videos";
  if (title.startsWith("UGC")) return "UGC & reactions";
  if (title.startsWith("TikTok Account")) return "Account growth";
  if (title.startsWith("Performance")) return "Creative strategy";
  return title;
}
