"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/container";
import { faqs } from "@/content/faqs";

const preview = faqs.slice(0, 5);

export function FaqPreview() {
  return (
    <section className="py-20 md:py-28">
      <Container className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-medium tracking-wide text-lime">FAQ</p>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
            Straight answers
          </h2>
          <p className="mt-4 text-muted-foreground">
            UGC TikTok agency for apps — without the agency fog.
          </p>
          <Link
            href="/faq"
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-lime hover:underline"
          >
            All FAQs
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <Accordion type="single" collapsible className="border-t border-border">
          {preview.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="py-5 text-base hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-neutral-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
