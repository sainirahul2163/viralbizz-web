import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { MobileCta } from "@/components/mobile-cta";
import { siteConfig } from "@/site.config";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import "./globals.css";

/** "https://x.com/itsviralbizz" -> "@itsviralbizz", which is what X expects. */
const X_HANDLE = `@${siteConfig.socials.x.split("/").pop()}`;

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const DEFAULT_TITLE = `${siteConfig.name} — TikTok marketing agency for apps`;

/** 1200×630, the ratio LinkedIn, X and Slack all crop to. */
const OG_IMAGE = {
  url: "/images/brand/og-cover.jpg",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — ${siteConfig.tagline}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: DEFAULT_TITLE,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  // Per-page metadata overrides this; it exists so the homepage and any route
  // that forgets to set one still emit a self-referencing canonical.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: DEFAULT_TITLE,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: siteConfig.description,
    images: [OG_IMAGE.url],
    site: X_HANDLE,
    creator: X_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Let Google use full-size image previews and untruncated snippets.
      // Without these it may show a thumbnail and a short snippet instead.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Only emitted once the token is set; an empty verification tag is noise.
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("dark", poppins.variable, inter.variable)}
    >
      <body className="grain min-h-dvh font-sans">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <div id="main" className="relative z-10 pb-20 md:pb-0">
          {children}
        </div>
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}
