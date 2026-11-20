import { Container } from "@/components/container";
import { CtaLink } from "@/components/cta-link";
import { PhoneFrame, VideoCard } from "@/components/video-card";
import { siteConfig } from "@/site.config";

const heroVideos = [
  { appName: "Glowup", accent: "#F472B6" },
  { appName: "RAYZ", accent: "#F5B301" },
  { appName: "Shoppin", accent: "#EF4444" },
] as const;

const proof = ["15M views", "10M views", "25% engagement"] as const;

function HeroPhones() {
  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div className="relative mx-auto h-[340px] w-full sm:h-[400px] md:h-[540px]">
        <PhoneFrame className="absolute top-[16%] left-0 w-[42%] -rotate-12 opacity-75 motion-safe:animate-float">
          <VideoCard
            appName={heroVideos[0].appName}
            accent={heroVideos[0].accent}
            showAppTab={false}
            showPlay={false}
            showActions={false}
          />
        </PhoneFrame>
        <PhoneFrame className="absolute top-0 left-1/2 z-20 w-[50%] -translate-x-1/2 ring-1 ring-lime/20 motion-safe:animate-float [animation-delay:0.6s]">
          <VideoCard
            appName={heroVideos[1].appName}
            accent={heroVideos[1].accent}
            showAppTab={false}
            showPlay
            showActions
          />
        </PhoneFrame>
        <PhoneFrame className="absolute top-[20%] right-0 w-[42%] rotate-12 opacity-75 motion-safe:animate-float [animation-delay:1.1s]">
          <VideoCard
            appName={heroVideos[2].appName}
            accent={heroVideos[2].accent}
            showAppTab={false}
            showPlay={false}
            showActions={false}
          />
        </PhoneFrame>
      </div>
      <ul
        aria-label="Selected results"
        className="mt-6 flex flex-wrap items-center justify-center gap-2"
      >
        {proof.map((label) => (
          <li
            key={label}
            className="rounded-full border border-lime/25 bg-black/50 px-3 py-1.5 text-xs font-semibold text-lime backdrop-blur-md"
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(138,222,72,0.12),_transparent_55%)]"
      />
      <Container className="relative grid items-center gap-10 pt-12 pb-20 md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:py-24 lg:gap-20 lg:pb-28">
        <div className="min-w-0">
          <p className="mb-5 text-sm font-medium tracking-wide text-lime">
            TikTok marketing agency for apps
          </p>
          <h1 className="max-w-xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {siteConfig.description}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaLink href={siteConfig.cta.href}>{siteConfig.cta.label}</CtaLink>
            <CtaLink href="/work" variant="ghost">
              See the work
            </CtaLink>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            {siteConfig.trustLine}
          </p>
        </div>
        <HeroPhones />
      </Container>
    </section>
  );
}
