import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/site.config";

export function AboutTeaser() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <h2 className="max-w-3xl text-3xl font-extrabold text-balance sm:text-4xl md:text-5xl">
            {siteConfig.aboutTeaser}
          </h2>
          <div>
            <p className="text-muted-foreground leading-relaxed">
              {siteConfig.aboutTeaserBody}
            </p>
            <Link
              href="/about"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-lime hover:underline"
            >
              About ViralBizz
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
