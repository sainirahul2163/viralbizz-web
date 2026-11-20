import { Clapperboard, LineChart, Smile, Smartphone } from "lucide-react";
import type { ServiceSlug } from "@/content/types";

const icons = {
  "faceless-tiktok-video-creation": Clapperboard,
  "ugc-reaction-content": Smile,
  "tiktok-account-growth": Smartphone,
  "creative-strategy": LineChart,
} as const;

export function ServiceIcon({
  slug,
  className,
}: {
  slug: ServiceSlug;
  className?: string;
}) {
  const Icon = icons[slug];
  return <Icon className={className} aria-hidden="true" />;
}
