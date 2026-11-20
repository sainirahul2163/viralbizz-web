import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileCta } from "@/components/mobile-cta";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — TikTok marketing agency for apps`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("dark", poppins.variable, inter.variable)}
    >
      <body className="grain min-h-dvh font-sans">
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
