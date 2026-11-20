export const siteConfig = {
  name: "ViralBizz",
  legalName: "TODO: confirm legal entity name",
  url: "https://www.viralbizz.com",
  tagline: "We grow apps with viral TikTok content.",
  description:
    "We create scroll-stopping, faceless TikTok videos that help app startups scale user acquisition and boost visibility. Without burning ad budgets.",
  trustLine: "Trusted by top app startups to go viral on TikTok.",
  footerBlurb:
    "We're a TikTok-first growth team helping app founders create viral content, reach millions, and turn installs into loyal users.",
  aboutTeaser:
    "Creating TikTok-first growth strategies that help app-based brands go viral, drive installs, and dominate their niche.",
  aboutTeaserBody:
    "We're creators and strategists who live on TikTok. Faceless videos, UGC-style reactions, and account growth — built for installs, not vanity views.",
  servicesIntro:
    "We collaborate with app founders and growth teams to create TikTok-native content strategies that drive real installs, boost user retention, and reflect your brand's unique identity, without feeling like ads.",
  aboutHeadline: "We help apps go viral on TikTok.",
  aboutIntro:
    "At Viral Bizz, we're a team of creators and strategists who live and breathe TikTok. We work with app founders to craft authentic content, grow communities, and turn installs into real users.",
  mission:
    "We exist to give app founders an edge on the world's fastest-growing platform. Our mission is to turn ideas into scroll-stopping TikToks that drive installs, spark conversations, and build loyal communities.",
  resultsHeadline: "Apps we've scaled to millions of TikTok views.",
  finalCtaHeadline: "Have an app you want to blow up on TikTok?",
  emails: {
    general: "admin@viralbizz.com",
    sales: "rahul@viralbizz.com",
  },
  socials: {
    linkedin: "https://linkedin.com/company/viralbizz",
    x: "https://x.com/itsviralbizz",
    // TODO: add Instagram URL
    instagram: null as string | null,
    // TODO: add TikTok URL
    tiktok: null as string | null,
  },
  nav: [
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
  ],
  footerNav: [
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
  cta: {
    label: "Get a free strategy call",
    href: "/contact",
  },
  contact: {
    headline: "Let's scale your app on TikTok 🚀",
    promises: [
      "Reply within 24 hours from our strategy team",
      "NDA-friendly, so your ideas stay protected",
      "Dedicated growth specialists for TikTok and app marketing",
    ],
    roles: ["Founder", "Growth", "Marketing", "Other"] as const,
    sources: ["TikTok", "LinkedIn", "X", "Referral", "Google", "Other"] as const,
  },
  keywords: [
    "TikTok marketing agency for apps",
    "TikTok organic growth for apps",
    "faceless TikTok content agency",
    "UGC TikTok agency for apps",
    "app install growth on TikTok",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
