import type { ServiceWhyGp } from "@/lib/services-content";

export type ServiceWhyGpSectionProps = {
  whyGp: ServiceWhyGp;
};

export function ServiceWhyGpSection({ whyGp }: ServiceWhyGpSectionProps) {
  return (
    <section className="bg-brand-dark px-4 py-16 md:px-8 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="text-sm font-medium tracking-widest text-brand-navy-light uppercase">
            Why Choose Us
          </p>
          <div className="mt-4 h-px w-12 bg-brand-navy-light/60" aria-hidden="true" />
          <h2 className="mt-6 font-serif text-3xl leading-tight tracking-tight text-neutral-50 md:text-4xl">
            {whyGp.heading}
          </h2>
        </div>

        <div className="mt-10 lg:col-span-7 lg:mt-0">
          {whyGp.pullQuote ? (
            <>
              <blockquote className="border-l-2 border-brand-navy-light/70 pl-6 font-serif text-2xl leading-snug tracking-tight text-neutral-100 italic md:pl-8 md:text-3xl">
                {whyGp.pullQuote}
              </blockquote>
              <p className="mt-8 text-base leading-relaxed text-neutral-300 md:text-lg md:leading-8">
                {whyGp.body}
              </p>
            </>
          ) : (
            <p className="text-lg leading-relaxed text-neutral-200 md:text-xl md:leading-9">
              {whyGp.body}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
