import type { Metadata } from "next";

import { InsuranceRestorationLayout } from "@/components/services/insurance-restoration-layout";
import { ServiceJsonLd } from "@/components/services/service-json-ld";
import { buildServiceMetadata } from "@/lib/service-schema";
import { getInsuranceRestorationContent } from "@/lib/services-content";

const content = getInsuranceRestorationContent();

export const metadata: Metadata = buildServiceMetadata(content);

export default function InsuranceRestorationPage() {
  return (
    <>
      <ServiceJsonLd content={content} />
      <InsuranceRestorationLayout content={content} />
    </>
  );
}
