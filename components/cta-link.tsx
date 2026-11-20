import Link from "next/link";
import { cn } from "@/lib/utils";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
};

export function CtaLink({
  href,
  children,
  className,
  variant = "primary",
}: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition",
        variant === "primary" &&
          "bg-primary text-primary-foreground shadow-[0_0_32px_-8px_#8ADE48] hover:bg-primary/90",
        variant === "ghost" &&
          "border border-border text-foreground hover:border-lime/40 hover:text-lime",
        className,
      )}
    >
      {children}
    </Link>
  );
}
