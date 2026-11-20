import { Suspense } from "react";
import { Clock, Mail, Shield } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { siteConfig } from "@/site.config";

export const metadata = {
  title: "Contact",
  description:
    "Tell us about the app. We’ll come back with a free strategy call or a custom proposal.",
  alternates: { canonical: "/contact" },
};

const promises = [
  { icon: Clock, text: siteConfig.contact.promises[0] },
  { icon: Shield, text: siteConfig.contact.promises[1] },
  { icon: Mail, text: siteConfig.contact.promises[2] },
];

const nextSteps = [
  {
    step: "01",
    title: "Send the brief",
    body: "App, audience, and what you want from TikTok — even a rough note is enough.",
  },
  {
    step: "02",
    title: "We reply within 24 hours",
    body: "A note from the strategy team, not an auto-reply.",
  },
  {
    step: "03",
    title: "Strategy call or proposal",
    body: "A free call or a custom plan. Prices stay off this site on purpose.",
  },
];

export default function ContactPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <main className="pb-24 md:pb-16">
      <section className="relative overflow-hidden pt-16 pb-10 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(138,222,72,0.12),_transparent_50%)]"
        />
        <Container className="relative">
          <p className="text-sm font-medium tracking-wide text-lime">
            Free strategy call
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-balance md:text-6xl">
            {siteConfig.contact.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Tell us about the app. We’ll come back with a free strategy call or
            a custom proposal — no prices on this site, on purpose.
          </p>
        </Container>
      </section>

      <Container className="grid items-start gap-10 pb-16 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        <div>
          <ol className="space-y-4">
            {nextSteps.map((item) => (
              <li key={item.step} className="flex gap-4">
                <span className="mt-0.5 font-display text-sm font-bold tracking-widest text-lime">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <ul className="mt-10 space-y-3">
            {promises.map((promise) => {
              const Icon = promise.icon;
              return (
                <li
                  key={promise.text}
                  className="flex gap-3 rounded-2xl border border-border bg-card px-4 py-4"
                >
                  <Icon className="mt-0.5 size-5 shrink-0 text-lime" />
                  <span className="text-sm leading-relaxed text-neutral-300">
                    {promise.text}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 grid gap-3">
            <EmailRow
              label="Sales"
              email={siteConfig.emails.sales}
            />
            <EmailRow
              label="General"
              email={siteConfig.emails.general}
            />
          </div>

          {calendlyUrl ? (
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold hover:border-lime/40 hover:text-lime"
            >
              Book a call
            </a>
          ) : null}
        </div>
        <Suspense
          fallback={
            <div className="min-h-[32rem] rounded-2xl border border-border bg-card" />
          }
        >
          <ContactForm />
        </Suspense>
      </Container>
    </main>
  );
}

function EmailRow({ label, email }: { label: string; email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm transition hover:border-lime/40"
    >
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-lime">{email}</span>
    </a>
  );
}
