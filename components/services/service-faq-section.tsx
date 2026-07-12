import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { ServiceFaq } from "@/lib/services-content";

type ServiceFaqListProps = {
  faqs: ServiceFaq[];
  className?: string;
  /**
   * `editorial` = flagship type scale and breathing room. Default `standard`
   * preserves the original accordion for all non-opted-in pages.
   */
  variant?: "standard" | "editorial";
};

/**
 * Bare accordion list — embedded inside bundled sections, which provide
 * their own heading and section wrapper.
 */
export function ServiceFaqList({
  faqs,
  className,
  variant = "standard",
}: ServiceFaqListProps) {
  if (faqs.length === 0) {
    return null;
  }

  const isEditorial = variant === "editorial";

  return (
    <Accordion
      type="single"
      collapsible
      className={cn(
        isEditorial ? "border-t border-neutral-300/80" : "border-t border-neutral-200",
        className,
      )}
    >
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.question}
          value={faq.question}
          className={isEditorial ? "border-neutral-300/80" : undefined}
        >
          <AccordionTrigger
            className={
              isEditorial
                ? "py-6 font-serif text-xl leading-snug tracking-tight md:py-7 md:text-[1.375rem] md:leading-snug"
                : undefined
            }
          >
            {faq.question}
          </AccordionTrigger>
          <AccordionContent
            className={isEditorial ? "pb-7 md:pb-8" : undefined}
          >
            <div className="max-w-2xl space-y-3">
              <p
                className={cn(
                  "leading-relaxed text-neutral-600",
                  isEditorial
                    ? "text-base md:text-[1.0625rem] md:leading-8"
                    : "text-base md:leading-7",
                )}
              >
                {faq.answer}
              </p>
              {faq.relatedLink ? (
                <p>
                  <Link
                    href={faq.relatedLink.href}
                    className="font-medium text-brand-navy underline underline-offset-4 decoration-brand-navy/30 transition-colors duration-150 [transition-timing-function:var(--ease-out)] hover:decoration-brand-navy"
                  >
                    {faq.relatedLink.label}
                  </Link>
                </p>
              ) : null}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export type ServiceFaqSectionProps = {
  faqs: ServiceFaq[];
  eyebrow?: string;
  heading?: string;
  /**
   * Section background. Defaults to `neutral-50`; pass `white` where the FAQ
   * follows another `neutral-50` section (e.g. the tenant-improvements
   * deep-dive) to preserve the page's background alternation rhythm.
   */
  background?: "neutral" | "white";
  /**
   * `editorial` = flagship FAQ treatment. Default `standard` keeps the
   * original look for all non-opted-in pages.
   */
  variant?: "standard" | "editorial";
};

export function ServiceFaqSection({
  faqs,
  eyebrow = "FAQ",
  heading = "Frequently Asked Questions",
  background = "neutral",
  variant = "standard",
}: ServiceFaqSectionProps) {
  if (faqs.length === 0) {
    return null;
  }

  const isEditorial = variant === "editorial";

  return (
    <section
      className={cn(
        "px-4 md:px-8",
        isEditorial ? "py-20 md:py-28 lg:py-36" : "py-16 md:py-24 lg:py-32",
        background === "white" ? "bg-white" : "bg-neutral-50",
      )}
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
          {eyebrow}
        </p>
        <h2
          className={cn(
            "mt-4 font-serif tracking-tight text-neutral-900",
            isEditorial
              ? "text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-tight"
              : "text-3xl md:text-4xl",
          )}
        >
          {heading}
        </h2>

        <ServiceFaqList
          faqs={faqs}
          variant={variant}
          className={isEditorial ? "mt-12 md:mt-14" : "mt-10 md:mt-12"}
        />
      </div>
    </section>
  );
}
