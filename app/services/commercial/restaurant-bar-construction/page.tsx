import type { Metadata } from "next";

import { ServiceSubPageLayout } from "@/components/services/service-sub-page-layout";
import { ServiceJsonLd } from "@/components/services/service-json-ld";
import { buildServiceMetadata } from "@/lib/service-schema";
import { getSubServicePageContent } from "@/lib/services-content";

const content = getSubServicePageContent(
  "commercial",
  "restaurant-bar-construction",
);

export const metadata: Metadata = buildServiceMetadata(content);

export default function RestaurantBarConstructionPage() {
  return (
    <>
      <ServiceJsonLd content={content} />
      <ServiceSubPageLayout content={content} />
    </>
  );
}
