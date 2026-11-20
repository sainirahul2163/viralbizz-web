import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { services } from "@/content/services";
import { siteConfig } from "@/site.config";

export function HomeServices() {
  return (
    <section id="services" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-sm font-medium tracking-wide text-lime">
            Faceless TikTok content agency
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-extrabold md:text-4xl">
            What we do
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            {siteConfig.servicesIntro}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.05}>
                <Link
                  href={`/services#${service.slug}`}
                  className="block h-full rounded-2xl border border-border bg-card p-6 transition motion-safe:hover:-translate-y-1 hover:border-lime/40"
                >
                  <ServiceIcon slug={service.slug} className="size-6 text-lime" />
                  <h3 className="mt-4 text-xl font-bold">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.summary}
                  </p>
                </Link>
              </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
