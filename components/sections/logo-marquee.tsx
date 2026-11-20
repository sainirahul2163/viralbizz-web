import Image from "next/image";
import { clients } from "@/content/clients";

export function LogoMarquee() {
  const row = [...clients, ...clients];

  return (
    <section
      aria-label="Brands we've partnered with"
      className="border-y border-border/80 bg-background-deep py-8"
    >
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex w-max gap-12 pr-12 motion-safe:animate-marquee motion-safe:hover:[animation-play-state:paused]">
          {row.map((client, index) => (
            <li
              key={`${client.slug}-${index}`}
              className="flex h-12 w-40 shrink-0 items-center justify-center rounded-xl bg-white px-3"
              aria-hidden={index >= clients.length}
            >
              <Image
                src={client.logo}
                alt={index >= clients.length ? "" : client.name}
                width={160}
                height={56}
                className="h-8 w-auto max-w-36 object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
