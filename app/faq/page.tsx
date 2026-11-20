import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { faqs } from "@/content/faqs";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata = {
  title: "FAQ",
  description:
    "Answers on faceless TikTok content, multi-account growth, timing, and how ViralBizz works with app founders.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <main className="pb-24 md:pb-16">
      {/* Eight genuine Q&A pairs already live in content/faqs.ts; the schema is
          generated from the same array so the two can never disagree. */}
      <JsonLd data={faqSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
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
