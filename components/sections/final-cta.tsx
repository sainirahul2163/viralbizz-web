import { Container } from "@/components/container";
import { CtaLink } from "@/components/cta-link";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/site.config";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-border py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(138,222,72,0.14),_transparent_60%)]"
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold text-balance sm:text-5xl md:text-6xl">
            {siteConfig.finalCtaHeadline}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Tell us about the app. We’ll come back with a free strategy call —
            no prices, no retainers on this page, on purpose.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaLink href={siteConfig.cta.href}>{siteConfig.cta.label}</CtaLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
