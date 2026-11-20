import Image from "next/image";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import type { Testimonial } from "@/content/types";
import { testimonials } from "@/content/testimonials";

/**
 * Square avatar cropped to an arbitrary region of the source image.
 *
 * The image is blown up inside a clipping circle and offset, rather than
 * relying on object-position — see the note on `photoCrop` in content/types.ts
 * for why that does not work for these particular photos. Every value is a
 * percentage of the circle, so the crop holds at any avatar size.
 */
function Avatar({
  src,
  name,
  crop,
}: {
  src: string;
  name: string;
  crop: Testimonial["photoCrop"];
}) {
  const { naturalWidth, naturalHeight, x, y, size } = crop;

  return (
    <div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-border">
      <Image
        src={src}
        alt={name}
        width={naturalWidth}
        height={naturalHeight}
        sizes="96px"
        className="absolute"
        style={{
          width: `${(naturalWidth / size) * 100}%`,
          height: `${(naturalHeight / size) * 100}%`,
          left: `${(-x / size) * 100}%`,
          top: `${(-y / size) * 100}%`,
          maxWidth: "none",
        }}
      />
    </div>
  );
}

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
                  <Avatar
                    src={item.photo}
                    name={item.name}
                    crop={item.photoCrop}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.role}, {item.company}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white px-2 py-1">
                    <Image
                      src={item.logo}
                      // Decorative: the company name is in the text beside it.
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
