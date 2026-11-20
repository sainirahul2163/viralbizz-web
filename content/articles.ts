import type { Article } from "./types";

/**
 * Evergreen guides, deliberately not a dated blog.
 *
 * SEO_RESEARCH.md flags the risk: a blog with four posts from 2026 and nothing
 * after reads as abandoned. A guide library has no implied cadence — a page
 * that is still accurate is still current — so the shape itself removes the
 * failure mode rather than relying on anyone keeping to a schedule.
 *
 * Anything still containing "TODO:" is noindex and kept out of the sitemap.
 * See lib/draft.ts.
 */
export const articles: Article[] = [
  {
    slug: "organic-tiktok-agency-cost-for-apps",
    title: "What does an organic TikTok agency cost for an app?",
    description:
      "Nobody publishes a rate for organic-only TikTok work on apps. Here is what the public numbers actually say, what moves the price, and what to ask before you sign.",
    summary:
      "There is no list price for this work, and the figures that circulate are mostly written by agencies about themselves. This is what the public numbers actually say, what genuinely drives the cost of an organic TikTok engagement for an app, and the questions worth asking before you sign anything.",
    updated: "2026-11-20",
    relatedCaseStudies: ["glowup", "rayz"],
    sections: [
      {
        heading: "Why nobody publishes a price",
        body: [
          "Search for what an organic TikTok agency charges and you will not find a rate card. You will find ranges, written by agencies, in posts designed to rank for the question. We looked for a published price for organic-only TikTok work on apps and could not find one.",
          "That is not purely evasion. Organic TikTok is not a product with a unit. Two apps asking for \"organic TikTok\" can mean a few videos a month on one account, or a daily posting operation across a dozen warmed accounts in four countries. Those are different businesses to run, and a single number would be wrong for both.",
          "It does mean the buyer has to do more work, which is what the rest of this guide is for.",
        ],
      },
      {
        heading: "What the public numbers actually say",
        body: [
          "These are the ranges we found in public sources. Treat them as orientation, not quotes. Almost every one comes from an agency writing about its own category, the figures disagree with each other, and several blur organic work with paid media — which is a different cost structure entirely.",
        ],
        bullets: [
          "Organic content management, roughly $2,000–$8,000 a month, described as covering a posting calendar and 8–12 videos a month.",
          "Organic plus paid advertising, roughly $5,000–$15,000 a month, from the same source.",
          "One roundup puts agency retainers at $5,000 to $50,000+ a month depending on scope — far wider than the others and worth treating sceptically.",
          "Another agency-reported breakdown gives $1,000–$10,000 a month, or $50–$250 an hour.",
          "One app-focused TikTok agency publishes creative from €6,000 a month for five video concepts, with media buying and ad spend billed separately.",
          "Minimum commitments of three to six months are common across sources.",
        ],
      },
      {
        heading: "What actually moves the number",
        body: [
          "Ignore the headline range and price the work instead. Almost all of the variance in an organic TikTok engagement comes from five things, and you can estimate your own position on each before you talk to anyone.",
        ],
        bullets: [
          "Posting volume. The single biggest driver. Output is roughly linear in cost, because every video is edited by someone.",
          "Number of accounts. More accounts mean more surfaces and more parallel tests, but each one needs warming, its own identity and its own monitoring. Multi-account operations cost more than their video count suggests.",
          "Format mix. A screen recording with a voiceover and a scripted UGC-style reaction are not the same amount of work, and neither is a slideshow.",
          "Localisation. Running the same strategy in four markets is closer to four engagements than one, because the hooks, audio and comments do not transfer.",
          "Whether creators are involved. Paying humans to appear on camera adds a cost line that faceless production does not have.",
        ],
      },
      {
        heading: "What you are actually buying",
        body: [
          "The invoice looks like videos. The work is mostly everything around them: deciding what to test, watching which hooks hold attention, killing the formats that do not, and keeping accounts healthy enough to keep getting distribution.",
          "This matters for comparing quotes. An agency producing thirty videos a month with no testing discipline will look cheaper per video than one producing twenty and iterating on what the algorithm rewarded. The second is usually the better buy, and the per-video comparison actively hides that.",
        ],
      },
      {
        heading: "What to ask before you sign",
        body: [
          "The answers to these separate operators from content mills faster than any price comparison.",
        ],
        bullets: [
          "What does a month of output actually look like — videos, accounts, formats?",
          "Who owns the accounts, and what happens to them if we stop working together?",
          "How do you decide what to make next, and what evidence do you use?",
          "What will you report, and how will we know whether it worked? \"Views\" alone is not an answer.",
          "What is the minimum commitment, and what is the thinking behind it?",
          "Can you show work in a category adjacent to ours, with the numbers attached?",
        ],
      },
      {
        heading: "How ViralBizz prices this",
        body: [
          "TODO: confirm with the team — typical engagement shape (posting volume, number of accounts), minimum commitment length, and what is and is not included. This section is why the page is still unpublished; everything above is researched and sourced, but this part has to come from how we actually work rather than from a competitor's blog.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is organic TikTok cheaper than TikTok ads?",
        answer:
          "The retainer is often lower, but the comparison is misleading because there is no media spend on top. An ads engagement adds a budget that frequently dwarfs the agency fee. Compare total monthly outlay, not the fee.",
      },
      {
        question: "Why do agencies insist on a three to six month minimum?",
        answer:
          "Organic distribution takes time to compound, and the first month is largely setup and testing. A one-month engagement mostly buys you the least productive part of the process. Minimums are common across the category, not a quirk of any one agency.",
      },
      {
        question: "Does more posting always mean more views?",
        answer:
          "No. Volume helps you find a winning hook faster, but volume without testing discipline just produces more videos nobody watches. What matters is how quickly the agency identifies what is working and redirects output toward it.",
      },
      {
        question: "Do we need our own TikTok account to start?",
        answer:
          "Not necessarily. Work can run on new accounts that are warmed from scratch, on your existing page, or both. Which makes sense depends on whether your current account already has distribution worth keeping.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
