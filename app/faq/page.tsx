import { PageHero } from "@/components/page-hero";
import { faqs } from "@/content/faqs";

export const metadata = {
  title: "FAQ",
  description:
    "Answers on faceless TikTok content, multi-account growth, timing, and how ViralBizz works with app founders.",
};

export default function FaqPage() {
  return (
    <main className="pb-24 md:pb-16">
      <PageHero
        title="FAQ"
        description="Straight answers. No agency fog."
      />
      <section className="mx-auto max-w-3xl space-y-8 px-4 pb-16 sm:px-6">
        {faqs.map((faq) => (
          <article key={faq.question}>
            <h2 className="text-lg font-bold">{faq.question}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {faq.answer}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
