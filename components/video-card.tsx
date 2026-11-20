import Image from "next/image";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type VideoCardProps = {
  viewsLabel?: string;
  appName?: string;
  poster?: string;
  src?: string;
  embedUrl?: string;
  accent?: string;
  className?: string;
  showAppTab?: boolean;
  showPlay?: boolean;
  showActions?: boolean;
};

export function VideoCard({
  viewsLabel,
  appName,
  poster,
  src,
  embedUrl,
  accent = "#8ADE48",
  className,
  showAppTab = true,
  showPlay = true,
  showActions = true,
}: VideoCardProps) {
  return (
    <div
      className={cn(
        "relative aspect-[9/16] overflow-hidden rounded-[1.4rem] bg-[#111]",
        !embedUrl && !src && "pointer-events-none",
        className,
      )}
    >
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={appName ? `${appName} on TikTok` : "TikTok video"}
          className="absolute inset-0 size-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : src ? (
        <video
          className="absolute inset-0 size-full object-cover"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
        />
      ) : poster ? (
        <Image
          src={poster}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 768px) 240px, 180px"
        />
      ) : (
        <PlaceholderFace
          accent={accent}
          appName={appName}
          showPlay={showPlay}
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 to-transparent"
      />

      {showAppTab ? (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 text-[11px] font-medium text-white">
          <span className="rounded-full bg-white/15 px-2 py-0.5 backdrop-blur-sm">
            {appName ?? "TikTok"}
          </span>
        </div>
      ) : null}

      {viewsLabel ? (
        <div className="absolute top-3 right-3 z-10 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-lime backdrop-blur-sm">
          {viewsLabel} views
        </div>
      ) : null}

      {showActions ? (
        <div
          aria-hidden="true"
          className="absolute right-2.5 bottom-16 z-10 flex flex-col items-center gap-3 text-white"
        >
          <Heart className="size-6 fill-white" />
          <MessageCircle className="size-6" />
          <Share2 className="size-5" />
        </div>
      ) : null}

      {showAppTab ? (
        <p className="absolute bottom-3 left-3 z-10 max-w-[70%] text-[11px] leading-snug text-white/90">
          {appName ? `${appName} · faceless, For You native` : "Faceless TikTok"}
        </p>
      ) : null}
    </div>
  );
}

function PlaceholderFace({
  accent,
  appName,
  showPlay,
}: {
  accent: string;
  appName?: string;
  showPlay: boolean;
}) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(circle at 30% 20%, ${accent}55, transparent 42%), linear-gradient(165deg, #1a1a1a, #0a0a0a 60%)`,
      }}
    >
      <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay [background-image:repeating-linear-gradient(180deg,transparent,transparent_18px,rgba(255,255,255,0.4)_19px)]" />
      {showPlay ? (
        <div className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
          <span className="ml-0.5 block size-0 border-y-[7px] border-y-transparent border-l-[12px] border-l-white" />
        </div>
      ) : null}
      <span className="sr-only">
        {appName
          ? `Placeholder for a ${appName} TikTok. Video coming soon.`
          : "Placeholder for a TikTok video. Video coming soon."}
      </span>
    </div>
  );
}

export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border-[7px] border-[#1c1c1c] bg-black p-[3px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] ring-1 ring-white/10",
        className,
      )}
    >
      {children}
    </div>
  );
}
