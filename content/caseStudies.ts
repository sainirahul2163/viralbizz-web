import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "glowup",
    name: "Glowup",
    oneLiner:
      "TODO: confirm with client — beauty and self-care consumer app.",
    logo: "/images/clients/glowup.webp",
    accent: "#F472B6",
    totalViews: "500M+",
    topVideos: ["15M"],
    challenge:
      "TODO: confirm with client — Glowup needed organic TikTok reach that felt native to a beauty audience, without looking like ads and without a paid-social budget to lean on.",
    whatWeDid:
      "TODO: confirm with client — We built a faceless, trend-first content engine: hook-led edits, beauty POVs, and a posting cadence tuned for the For You page.",
    formats: [
      "TODO: confirm with client — faceless demos",
      "TODO: confirm with client — POV hooks",
      "TODO: confirm with client — trend-led edits",
    ],
    postingStrategy:
      "TODO: confirm with client — Consistent posting, rapid hook tests, and doubling down on the formats that held attention.",
    videos: [{ viewsLabel: "15M" }, {}, {}, {}],
    testimonialId: "louis-david",
  },
  {
    slug: "rayz",
    name: "RAYZ",
    oneLiner: "TODO: confirm with client — one-line description of RAYZ.",
    logo: "/images/clients/rayz.webp",
    accent: "#F5B301",
    totalViews: "50M+",
    topVideos: ["10M", "4M", "2.5M", "2M"],
    avgEngagementRate: "25%",
    challenge:
      "TODO: confirm with client — RAYZ needed a TikTok presence that could earn attention fast and turn views into app installs, not just vanity reach.",
    whatWeDid:
      "TODO: confirm with client — We ran a performance content system: native hooks, repeatable formats, and multi-video testing until winners were obvious.",
    formats: [
      "TODO: confirm with client — native hooks",
      "TODO: confirm with client — UGC-style reactions",
      "TODO: confirm with client — faceless product POVs",
    ],
    postingStrategy:
      "TODO: confirm with client — High-tempo posting, format tests, and scaling the hooks that drove both views and engagement.",
    videos: [
      { viewsLabel: "10M" },
      { viewsLabel: "4M" },
      { viewsLabel: "2.5M" },
      { viewsLabel: "2M" },
    ],
  },
  {
    slug: "shoppin",
    name: "Shoppin",
    oneLiner: "TODO: confirm with client — shopping / discovery consumer app.",
    logo: "/images/clients/shoppin.webp",
    accent: "#EF4444",
    totalViews: "10M+",
    topVideos: ["3M", "1M", "0.8M", "0.4M"],
    avgEngagementRate: "17%",
    challenge:
      "TODO: confirm with client — Shoppin was easy to scroll past. The app needed TikTok content people actually talked about, not generic product clips.",
    whatWeDid:
      "TODO: confirm with client — We built native shopping-culture TikToks: reaction formats, relatable voiceovers, and hooks that made the app feel like a trend, not a store.",
    formats: [
      "TODO: confirm with client — UGC-style reactions",
      "TODO: confirm with client — haul / discovery POVs",
      "TODO: confirm with client — relatable voiceovers",
    ],
    postingStrategy:
      "TODO: confirm with client — Trend-led posting, creative tests against shopping culture, and iterating on the videos that sparked comments.",
    videos: [
      { viewsLabel: "3M" },
      { viewsLabel: "1M" },
      { viewsLabel: "0.8M" },
      { viewsLabel: "0.4M" },
    ],
    testimonialId: "shlok",
  },
  {
    slug: "chef-ai",
    name: "Chef AI",
    oneLiner: "TODO: confirm with client — AI cooking / recipe app.",
    logo: "/images/clients/chef-ai.webp",
    accent: "#DC2626",
    totalViews: "7M+",
    topVideos: ["2M", "0.5M", "0.4M", "0.3M"],
    avgEngagementRate: "15%",
    challenge:
      "TODO: confirm with client — Chef AI needed food-native TikToks that showed the product in action and earned installs from people already watching cooking content.",
    whatWeDid:
      "TODO: confirm with client — We produced faceless, kitchen-first creatives: screen recordings, cooking POVs, and hooks built for food TikTok, then posted and iterated on what the algorithm rewarded.",
    formats: [
      "TODO: confirm with client — in-app screen recordings",
      "TODO: confirm with client — cooking POVs",
      "TODO: confirm with client — faceless recipe hooks",
    ],
    postingStrategy:
      "TODO: confirm with client — Consistent food-native posting, format tests, and scaling the hooks that drove views and engagement.",
    videos: [
      { viewsLabel: "2M" },
      { viewsLabel: "0.5M" },
      { viewsLabel: "0.4M" },
      { viewsLabel: "0.3M" },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getOtherCaseStudies(slug: string) {
  return caseStudies.filter((study) => study.slug !== slug);
}

export function getNextCaseStudy(slug: string) {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  if (index < 0) return undefined;
  return caseStudies[(index + 1) % caseStudies.length];
}
