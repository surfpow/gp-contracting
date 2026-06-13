import { JsonLd } from "@/components/json-ld";
import {
  buildFaqPageSchema,
  buildServiceSchema,
  collectPageFaqs,
  servicePagePath,
} from "@/lib/service-schema";
import type {
  DeepDiveServicePage,
  SubServicePageContent,
} from "@/lib/services-content";

export type ServiceJsonLdProps = {
  content: SubServicePageContent | DeepDiveServicePage;
};

/**
 * Emits Service + FAQPage structured data for a sub-service or the
 * tenant-improvements deep-dive page. For combined sub-pages the FAQPage merges
 * page-level FAQs with every bundled-section FAQ into a single node.
 */
export function ServiceJsonLd({ content }: ServiceJsonLdProps) {
  const path = servicePagePath(content);
  const faqs = collectPageFaqs(content);

  const serviceSchema = buildServiceSchema({
    serviceType: content.serviceType,
    areaServed: content.areaServed,
    path,
    name: content.heroHeading,
    description: content.metaDescription,
  });

  return (
    <>
      <JsonLd data={serviceSchema} />
      {faqs.length > 0 && <JsonLd data={buildFaqPageSchema(faqs)} />}
    </>
  );
}
