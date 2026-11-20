import Link from "next/link";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/site.config";

const socials = [
  { label: "LinkedIn", href: siteConfig.socials.linkedin },
  { label: "X", href: siteConfig.socials.x },
  ...(siteConfig.socials.instagram
    ? [{ label: "Instagram", href: siteConfig.socials.instagram }]
    : []),
  ...(siteConfig.socials.tiktok
    ? [{ label: "TikTok", href: siteConfig.socials.tiktok }]
    : []),
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-background-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm space-y-4">
          <Logo />
          <p className="text-sm leading-relaxed text-muted-foreground">
            {siteConfig.footerBlurb}
          </p>
        </div>
        <div>
          <p className="font-display text-sm font-semibold tracking-wide text-foreground">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {siteConfig.footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display text-sm font-semibold tracking-wide text-foreground">
            Talk to us
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.emails.general}`}
                className="text-muted-foreground hover:text-foreground"
              >
                {siteConfig.emails.general}
              </a>
              <span className="ml-2 text-muted-foreground/70">General</span>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.emails.sales}`}
                className="text-muted-foreground hover:text-foreground"
              >
                {siteConfig.emails.sales}
              </a>
              <span className="ml-2 text-muted-foreground/70">Sales</span>
            </li>
          </ul>
          <ul className="mt-6 flex flex-wrap gap-4">
            {socials.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-lime"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/80">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          © 2026 {siteConfig.name}. TikTok-first growth for apps.
        </p>
      </div>
    </footer>
  );
}
