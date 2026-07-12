import { JsonLd } from "@/components/json-ld";
import {
  buildArticleSchema,
  buildFaqPageSchema,
  buildServiceSchema,
  collectPageFaqs,
  servicePagePath,
} from "@/lib/service-schema";
import type {
  CashSettlementGuidePage,
  DeepDiveServicePage,
  FireDamageRebuildsServicePage,
  InsuranceRestorationServicePage,
  StrategicUpgradesGuidePage,
  SubServicePageContent,
  WaterFloodDamageServicePage,
  UpgradesDuringClaimGuidePage,
} from "@/lib/services-content";

export type ServiceJsonLdProps = {
  content:
    | SubServicePageContent
    | DeepDiveServicePage
    | InsuranceRestorationServicePage
    | FireDamageRebuildsServicePage
    | WaterFloodDamageServicePage
    | CashSettlementGuidePage
    | UpgradesDuringClaimGuidePage
    | StrategicUpgradesGuidePage;
};

/**
 * Emits Service + FAQPage structured data for a sub-service, deep-dive, or
 * insurance overview page. For combined sub-pages the FAQPage merges
 * page-level FAQs with every bundled-section FAQ into a single node.
 *
 * Editorial guide pages emit Article + FAQPage instead of Service, with the
 * same LocalBusiness publisher details.
 */
export function ServiceJsonLd({ content }: ServiceJsonLdProps) {
  const path = servicePagePath(content);
  const faqs = collectPageFaqs(content);

  if (
    content.contentMode === "cashSettlementGuide" ||
    content.contentMode === "upgradesDuringClaimGuide" ||
    content.contentMode === "strategicUpgradesGuide"
  ) {
    const articleSchema = buildArticleSchema({
      headline: content.heroHeading,
      description: content.metaDescription,
      path,
      datePublished: "2026-07-11",
      image: content.ogImage?.src ?? content.heroImage?.src,
    });

    return (
      <>
        <JsonLd data={articleSchema} />
        {faqs.length > 0 && <JsonLd data={buildFaqPageSchema(faqs)} />}
      </>
    );
  }

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
