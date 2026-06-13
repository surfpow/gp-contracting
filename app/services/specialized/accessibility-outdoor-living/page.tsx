import type { Metadata } from "next";

import { ServiceSubPageLayout } from "@/components/services/service-sub-page-layout";
import { ServiceJsonLd } from "@/components/services/service-json-ld";
import { buildServiceMetadata } from "@/lib/service-schema";
import { getSubServicePageContent } from "@/lib/services-content";

const content = getSubServicePageContent(
  "specialized",
  "accessibility-outdoor-living",
);

export const metadata: Metadata = buildServiceMetadata(content);

export default function AccessibilityOutdoorLivingPage() {
  return (
    <>
      <ServiceJsonLd content={content} />
      <ServiceSubPageLayout content={content} />
    </>
  );
}
