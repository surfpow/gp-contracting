import type { Metadata } from "next";

import {
  isCombinedSubServicePage,
  type CashSettlementGuidePage,
  type DeepDiveServicePage,
  type FireDamageRebuildsServicePage,
  type InsuranceRestorationServicePage,
  type ServiceFaq,
  type StrategicUpgradesGuidePage,
  type SubServicePageContent,
  type UpgradesDuringClaimGuidePage,
  type WaterFloodDamageServicePage,
} from "@/lib/services-content";
import { GP_OFFICE_ADDRESS } from "@/lib/business-location";

/**
 * Canonical production origin. JSON-LD `url`/`@id` values and the sitemap both
 * resolve against this, so absolute URLs stay consistent across the site.
 */
export const SITE_URL = "https://gpcontracting.ca";

export const BUSINESS_NAME = "GP Contracting Group";
export const BUSINESS_PHONE = "+1 778 891 9076";

/** Broad regions — kept alongside municipalities for schema.org areaServed signals. */
export const SERVICE_AREA_REGIONS = [
  "Greater Vancouver",
  "Vancouver Island",
  "Fraser Valley",
] as const;

/** Specific municipalities served (SEO/schema — not surfaced in visible H1s/titles). */
export const SERVICE_AREA_MUNICIPALITIES = [
  "Richmond",
  "Vancouver",
  "Burnaby",
  "Surrey",
  "Coquitlam",
  "North Vancouver",
  "Delta",
  "New Westminster",
  "Langley",
  "Abbotsford",
  "Victoria",
  "Nanaimo",
] as const;

/** Full areaServed list for Service + LocalBusiness JSON-LD (regions + municipalities). */
export const SERVICE_AREAS = [
  ...SERVICE_AREA_REGIONS,
  ...SERVICE_AREA_MUNICIPALITIES,
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
    areaServed: [...SERVICE_AREAS],
    provider: providerReference(),
    ...(input.description ? { description: input.description } : {}),
  };
}

/** Build a schema.org `FAQPage` node from a list of Q&A pairs. */
export function buildFaqPageSchema(faqs: ServiceFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => {
      const related = faq.relatedLink
        ? ` ${faq.relatedLink.label}: ${absoluteUrl(faq.relatedLink.href)}`
        : "";
      return {
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${faq.answer}${related}`,
        },
      };
    }),
  };
}

/**
 * Organization / publisher block shared by Article schema, matching the
 * site-wide LocalBusiness address (Unit 138 - 11782 River Rd, Richmond, BC).
 */
function organizationPublisher() {
  return {
    "@type": "Organization",
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: BUSINESS_PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: GP_OFFICE_ADDRESS.line1,
      addressLocality: "Richmond",
      addressRegion: "BC",
      addressCountry: "CA",
    },
  };
}

export type ArticleSchemaInput = {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
};

/** Build a schema.org `Article` node for editorial guide pages. */
export function buildArticleSchema(input: ArticleSchemaInput) {
  const url = absoluteUrl(input.path);
  const publisher = organizationPublisher();

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: publisher,
    publisher,
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified
      ? { dateModified: input.dateModified }
      : input.datePublished
        ? { dateModified: input.datePublished }
        : {}),
    ...(input.image
      ? {
          image: [
            input.image.startsWith("http")
              ? input.image
              : absoluteUrl(input.image),
          ],
        }
      : {}),
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
      streetAddress: GP_OFFICE_ADDRESS.line1,
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
  content:
    | SubServicePageContent
    | DeepDiveServicePage
    | InsuranceRestorationServicePage
    | FireDamageRebuildsServicePage
    | WaterFloodDamageServicePage
    | CashSettlementGuidePage
    | UpgradesDuringClaimGuidePage
    | StrategicUpgradesGuidePage,
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
  ogImage?: string;
}): Metadata {
  return {
    title: seo.title,
    description: seo.metaDescription,
    ...(seo.keywords && seo.keywords.length > 0
      ? { keywords: seo.keywords }
      : {}),
    ...(seo.ogImage
      ? {
          openGraph: {
            title: seo.title,
            description: seo.metaDescription,
            images: [{ url: seo.ogImage }],
          },
          twitter: {
            card: "summary_large_image",
            title: seo.title,
            description: seo.metaDescription,
            images: [seo.ogImage],
          },
        }
      : {}),
  };
}

/**
 * Resolve the canonical site path for a sub-service / deep-dive / insurance
 * overview / spoke page so its Service + FAQPage JSON-LD can carry an absolute `url`.
 */
export function servicePagePath(
  content:
    | SubServicePageContent
    | DeepDiveServicePage
    | InsuranceRestorationServicePage
    | FireDamageRebuildsServicePage
    | WaterFloodDamageServicePage
    | CashSettlementGuidePage
    | UpgradesDuringClaimGuidePage
    | StrategicUpgradesGuidePage,
): string {
  if (
    content.contentMode === "deepDive" ||
    content.contentMode === "insuranceOverview"
  ) {
    return `/services/${content.slug}`;
  }
  if (
    content.contentMode === "fireDamageRebuilds" ||
    content.contentMode === "waterFloodDamage" ||
    content.contentMode === "cashSettlementGuide" ||
    content.contentMode === "upgradesDuringClaimGuide" ||
    content.contentMode === "strategicUpgradesGuide"
  ) {
    return `/services/${content.parentHub}/${content.slug}`;
  }
  return `/services/${content.parentHub}/${content.slug}`;
}

export { isCombinedSubServicePage };
