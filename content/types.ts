export type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
};

export type Client = {
  name: string;
  slug: string;
  logo: string;
};

export type ServiceSlug =
  | "faceless-tiktok-video-creation"
  | "ugc-reaction-content"
  | "tiktok-account-growth"
  | "creative-strategy";

export type Service = {
  slug: ServiceSlug;
  title: string;
  summary: string;
  description: string;
  bullets: string[];
};

export type VideoCard = {
  viewsLabel?: string;
  poster?: string;
  src?: string;
  embedUrl?: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  oneLiner: string;
  logo: string;
  accent: string;
  totalViews: string;
  topVideos: string[];
  avgEngagementRate?: string;
  challenge: string;
  whatWeDid: string;
  formats: string[];
  postingStrategy: string;
  videos: VideoCard[];
  testimonialId?: "louis-david" | "shlok";
};

export type Testimonial = {
  id: "louis-david" | "shlok";
  quote: string;
  name: string;
  role: string;
  company: string;
  photo: string;
  /**
   * Square region of the source photo to use as the avatar, in source pixels.
   *
   * Both photos are casual full-length snapshots rather than headshots, so
   * neither `object-fit: cover` nor `object-position` can frame the face —
   * they are portrait, so scaling to cover leaves no horizontal overflow to
   * shift. This crops by scaling the image up inside the circle instead, which
   * leaves the source files untouched and stays tunable. Delete it and go back
   * to a plain cover once real headshots land.
   */
  photoCrop: {
    naturalWidth: number;
    naturalHeight: number;
    x: number;
    y: number;
    size: number;
  };
  logo: string;
  caseStudySlug: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type ArticleSection = {
  /**
   * Written as the question a reader would actually type. Competitors in this
   * niche win long-tail search with question-shaped H2s rather than noun
   * labels, and it is also what makes a section quotable by an assistant.
   */
  heading: string;
  body: string[];
  bullets?: string[];
};

export type Article = {
  slug: string;
  /** Used for <title>, the H1 and the Article headline. */
  title: string;
  description: string;
  /** Standfirst under the H1. Also the schema description. */
  summary: string;
  /** ISO date. Drives `dateModified`, not a "posted on" byline. */
  updated: string;
  sections: ArticleSection[];
  faqs?: Faq[];
  /** Slugs of case studies that evidence this article's claims. */
  relatedCaseStudies?: string[];
};

export type ProcessStep = {
  step: number;
  title: string;
  body: string;
};

export type Value = {
  title: string;
  body: string;
};
