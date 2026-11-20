import { useId } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  const id = useId();
  const gradientId = `vb-grad-${id}`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="8"
          y1="4"
          x2="56"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8ADE48" />
          <stop offset="0.5" stopColor="#57D661" />
          <stop offset="1" stopColor="#00C870" />
        </linearGradient>
      </defs>
      <path
        d="M32 5 L56.5 19.2 V44.8 L32 59 L7.5 44.8 V19.2 Z"
        stroke={`url(#${gradientId})`}
        strokeWidth="4.4"
        strokeLinejoin="round"
      />
      <path
        d="M22 41.5 L30.5 31.5 L37.5 38.5 L49.5 20"
        stroke={`url(#${gradientId})`}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.5 20 H49.5 V26.2"
        stroke={`url(#${gradientId})`}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 51 L46.5 31.5"
        stroke={`url(#${gradientId})`}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M40.5 31.5 H46.5 V37.5"
        stroke={`url(#${gradientId})`}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
};

export function Logo({ className, markClassName, wordmark = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-sm text-foreground no-underline",
        className,
      )}
      aria-label="ViralBizz home"
    >
      <LogoMark className={cn("size-8", markClassName)} />
      {wordmark ? (
        <span className="font-display text-lg font-bold tracking-tight md:text-xl">
          ViralBizz
        </span>
      ) : null}
    </Link>
  );
}
