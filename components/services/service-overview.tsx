export type ServiceOverviewProps = {
  paragraphs: string[];
};

export function ServiceOverview({ paragraphs }: ServiceOverviewProps) {
  return (
    <section className="bg-neutral-50 px-4 py-20 md:px-8 md:py-28 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
          Overview
        </p>
        <div className="mt-8 space-y-6">
          {paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "text-lg leading-relaxed text-neutral-700 md:text-xl md:leading-8"
                  : "text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
