import { Container } from "@/components/container";
import { CountUp } from "@/components/count-up";
import { stats } from "@/content/stats";

export function StatsBand() {
  return (
    <section className="border-b border-border/80 py-16 md:py-20">
      <Container>
        <ul className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-4">
          {stats.map((stat) => (
            <li key={stat.id} className="text-center md:text-left">
              <p className="font-display text-4xl font-extrabold tracking-tight text-lime sm:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
