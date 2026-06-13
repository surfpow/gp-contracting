import type { Metadata } from "next";

import {
  isCombinedSubServicePage,
  type DeepDiveServicePage,
  type ServiceFaq,
  type SubServicePageContent,
} from "@/lib/services-content";

/**
 * Canonical production origin. JSON-LD `url`/`@id` values and the sitemap both
 * resolve against this, so absolute URLs stay consistent across the site.
 */
export const SITE_URL = "https://gpcontracting.ca";

export const BUSINESS_NAME = "GP Contracting Group";
export const BUSINESS_PHONE = "+1 778 891 9076";

export const SERVICE_AREAS = [
  "Greater Vancouver",
  "Vancouver Island",
  "Fraser Valley",
] as const;

/** Resolve a site-relative path (e.g. "/services") to an absolute URL. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Minimal organization reference reused as the `provider` of every Service
 * node so structured data ties services back to the business consistently.
 */
function providerReference() {
  return {
    "@type": "GeneralContractor",
    name: BUSINESS_NAME,
    telephone: BUSINESS_PHONE,
    areaServed: [...SERVICE_AREAS],
  };
}

export type ServiceSchemaInput = {
  serviceType: string;
  areaServed: string[];
  /** Site-relative path of the page the service is described on. */
  path: string;
  name?: string;
  description?: string;
};

/** Build a schema.org `Service` node for a sub-service / deep-dive page. */
export function buildServiceSchema(input: ServiceSchemaInput) {
  const url = absoluteUrl(input.path);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name ?? input.serviceType,
    serviceType: input.serviceType,
    url,
    areaServed: input.areaServed,
    provider: providerReference(),
    ...(input.description ? { description: input.description } : {}),
  };
}

/** Build a schema.org `FAQPage` node from a list of Q&A pairs. */
export function buildFaqPageSchema(faqs: ServiceFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Site-wide `LocalBusiness` node. Rendered once (in the root layout) — not on
 * individual service pages — so the business identity isn't duplicated.
 */
export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#localbusiness`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: BUSINESS_PHONE,
    email: "info@gpcontracting.ca",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Richmond",
      addressRegion: "BC",
      addressCountry: "CA",
    },
    areaServed: [...SERVICE_AREAS],
  };
}

/**
 * Collect every FAQ that belongs on a page into a single list: page-level FAQs
 * plus, for combined sub-pages, the FAQs from each bundled section. This drives
 * one consolidated `FAQPage` node per page.
 */
export function collectPageFaqs(
  content: SubServicePageContent | DeepDiveServicePage,
): ServiceFaq[] {
  if (content.contentMode === "combinedSubService") {
    return [
      ...content.faqs,
      ...content.bundledSections.flatMap((section) => section.faqs),
    ];
  }
  return content.faqs;
}

/** Map a page's SEO fields to a Next `Metadata` object. */
export function buildServiceMetadata(seo: {
  title: string;
  metaDescription: string;
  keywords?: string[];
}): Metadata {
  return {
    title: seo.title,
    description: seo.metaDescription,
    ...(seo.keywords && seo.keywords.length > 0
      ? { keywords: seo.keywords }
      : {}),
  };
}

/**
 * Resolve the canonical site path for a sub-service / deep-dive page so its
 * Service + FAQPage JSON-LD can carry an absolute `url`.
 */
export function servicePagePath(
  content: SubServicePageContent | DeepDiveServicePage,
): string {
  if (content.contentMode === "deepDive") {
    return "/services/tenant-improvements";
  }
  return `/services/${content.parentHub}/${content.slug}`;
}

export { isCombinedSubServicePage };
