"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-1", className)} aria-label="Primary">
      {siteConfig.nav.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
              active ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <NavLinks className="hidden md:flex" />
        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden h-10 rounded-full px-4 text-sm font-semibold md:inline-flex"
          >
            <Link href={siteConfig.cta.href}>{siteConfig.cta.label}</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background px-6 py-8">
              <SheetHeader className="mb-8 text-left">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div onClick={() => setOpen(false)}>
                  <Logo />
                </div>
              </SheetHeader>
              <NavLinks className="flex-col items-stretch gap-1 text-lg [&_a]:px-2 [&_a]:py-3" />
              <Button asChild className="mt-8 h-12 w-full rounded-full font-semibold">
                <Link href={siteConfig.cta.href}>{siteConfig.cta.label}</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
