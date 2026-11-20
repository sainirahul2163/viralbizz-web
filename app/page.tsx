import type { Metadata } from "next";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { FaqPreview } from "@/components/sections/faq-preview";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HomeResults } from "@/components/sections/home-results";
import { HomeServices } from "@/components/sections/home-services";
import { HomeTestimonials } from "@/components/sections/home-testimonials";
import { HowWeWork } from "@/components/sections/how-we-work";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { StatsBand } from "@/components/sections/stats-band";
import { siteConfig } from "@/site.config";

// The homepage previously had no metadata of its own and fell back to the
// layout default, so its description was never tuned for the query it targets.
export const metadata: Metadata = {
  title: `${siteConfig.name} — TikTok marketing agency for apps`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoMarquee />
      <StatsBand />
      <AboutTeaser />
      <HomeServices />
      <HomeResults />
      <HowWeWork />
      <HomeTestimonials />
      <FaqPreview />
      <FinalCta />
    </main>
  );
}
