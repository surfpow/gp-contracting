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
};

/**
 * Bare accordion list — embedded inside bundled sections, which provide
 * their own heading and section wrapper.
 */
export function ServiceFaqList({ faqs, className }: ServiceFaqListProps) {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <Accordion
      type="single"
      collapsible
      className={cn("border-t border-neutral-200", className)}
    >
      {faqs.map((faq) => (
        <AccordionItem key={faq.question} value={faq.question}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-600 md:leading-7">
              {faq.answer}
            </p>
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
};

export function ServiceFaqSection({
  faqs,
  eyebrow = "FAQ",
  heading = "Frequently Asked Questions",
  background = "neutral",
}: ServiceFaqSectionProps) {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section
      className={cn(
        "px-4 py-16 md:px-8 md:py-24 lg:py-32",
        background === "white" ? "bg-white" : "bg-neutral-50",
      )}
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl">
          {heading}
        </h2>

        <ServiceFaqList faqs={faqs} className="mt-10 md:mt-12" />
      </div>
    </section>
  );
}
