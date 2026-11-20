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

export type ProcessStep = {
  step: number;
  title: string;
  body: string;
};

export type Value = {
  title: string;
  body: string;
};
