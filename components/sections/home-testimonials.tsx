import Image from "next/image";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { testimonials } from "@/content/testimonials";

export function HomeTestimonials() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-sm font-medium tracking-wide text-lime">
            Founders, not vanity metrics
          </p>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
            What clients say
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <blockquote className="text-base leading-relaxed text-pretty">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground">
                      {item.role}, {item.company}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white px-2 py-1">
                    <Image
                      src={item.logo}
                      alt=""
                      width={96}
                      height={32}
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
