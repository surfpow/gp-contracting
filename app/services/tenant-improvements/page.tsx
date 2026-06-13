import type { Metadata } from "next";

import { ServicePageLayout } from "@/components/services/service-page-layout";
import { ServiceJsonLd } from "@/components/services/service-json-ld";
import { buildServiceMetadata } from "@/lib/service-schema";
import { getServicePageContent } from "@/lib/services-content";

const content = getServicePageContent("tenant-improvements");

export const metadata: Metadata = buildServiceMetadata(content);

export default function TenantImprovementsServicePage() {
  return (
    <>
      <ServiceJsonLd content={content} />
      <ServicePageLayout content={content} />
    </>
  );
}
