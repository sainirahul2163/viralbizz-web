import type { Testimonial } from "./types";

export const testimonials: Testimonial[] = [
  {
    id: "louis-david",
    quote:
      "ViralBizz TikTok expertise has been a game-changer for Glow Up. Their creative strategies and high-performing content consistently deliver results, and we're excited to scale even further together.",
    name: "Louis-David Paul-Hus",
    role: "Founder",
    company: "Glowup",
    photo: "/images/testimonials/louis-david-paul-hus.webp",
    // Street photo; face sits upper-right of frame.
    photoCrop: { naturalWidth: 800, naturalHeight: 900, x: 339, y: 70, size: 300 },
    logo: "/images/clients/glowup.webp",
    caseStudySlug: "glowup",
  },
  {
    id: "shlok",
    quote:
      "When we started with Viral Bizz, we had no idea how powerful TikTok could be. The content they created made Shoppin go from just another app to something people actually talk about.",
    name: "Shlok",
    role: "Founder",
    company: "Shoppin",
    photo: "/images/testimonials/shlok.webp",
    // Full-length photo; face sits near the top of frame.
    photoCrop: { naturalWidth: 433, naturalHeight: 655, x: 130, y: 10, size: 200 },
    logo: "/images/clients/shoppin.webp",
    caseStudySlug: "shoppin",
  },
];

export function getTestimonial(id: Testimonial["id"]) {
  return testimonials.find((item) => item.id === id);
}
