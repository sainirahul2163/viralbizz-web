import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { processSteps } from "@/content/process";

export function HowWeWork() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-sm font-medium tracking-wide text-lime">
            TikTok organic growth for apps
          </p>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
            How we work
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-6 md:grid-cols-5">
          {processSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.04}>
              <li className="relative">
                <span className="font-display text-4xl font-extrabold text-lime/80">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
