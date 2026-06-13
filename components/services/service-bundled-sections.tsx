import { ServiceFaqList } from "@/components/services/service-faq-section";
import { ServiceFeatureSteps } from "@/components/services/service-features-section";
import type { ServiceBundledSection } from "@/lib/services-content";

export type ServiceBundledSectionsProps = {
  sections: ServiceBundledSection[];
};

/**
 * Combined-page renderer: each bundled service gets an anchored H2
 * (`id={anchorId}` for crawlable in-page links), overview prose, a numbered
 * step grid, and section-scoped FAQs — rendered as one continuous flow rather
 * than stitched-together cards. Section `keywords` stay data-only for the
 * Phase 7 SEO pass.
 */
export function ServiceBundledSections({ sections }: ServiceBundledSectionsProps) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        {sections.map((section, index) => (
          <div
            key={section.anchorId}
            className={
              index > 0
                ? "mt-20 border-t border-neutral-200 pt-20 md:mt-28 md:pt-28 lg:mt-32 lg:pt-32"
                : undefined
            }
          >
            <p className="text-sm font-medium tracking-widest text-neutral-400 uppercase">
              <span className="tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true"> — </span>
              In This Service
            </p>
            {/* scroll-mt keeps anchored headings clear of the fixed header
                (large floating logo: ~192px tall on mobile, ~153px from md up) */}
            <h2
              id={section.anchorId}
              className="mt-4 scroll-mt-52 font-serif text-3xl tracking-tight text-neutral-900 md:scroll-mt-44 md:text-4xl"
            >
              {section.heading}
            </h2>

            <div className="mt-6 max-w-3xl space-y-5">
              {section.overview.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraph}
                  className={
                    paragraphIndex === 0
                      ? "text-lg leading-relaxed text-neutral-700 md:text-xl md:leading-8"
                      : "text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <ServiceFeatureSteps
              steps={section.processSteps}
              className="mt-12 md:mt-16"
            />

            {section.faqs.length > 0 && (
              <div className="mt-14 max-w-3xl md:mt-20">
                <h3 className="font-serif text-xl tracking-tight text-neutral-900 md:text-2xl">
                  {section.heading} — Common Questions
                </h3>
                <ServiceFaqList faqs={section.faqs} className="mt-6 md:mt-8" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
