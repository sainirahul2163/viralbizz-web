"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/site.config";

export function MobileCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-md md:hidden">
      <Link
        href={siteConfig.cta.href}
        className="flex h-12 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground"
      >
        {siteConfig.cta.label}
      </Link>
    </div>
  );
}
