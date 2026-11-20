type PageHeroProps = {
  title: string;
  description?: string;
};

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6 md:pt-24">
      <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-balance md:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </section>
  );
}
