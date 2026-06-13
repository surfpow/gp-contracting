import type { Metadata } from "next";

import { ServiceHubLayout } from "@/components/services/service-hub-layout";
import { buildServiceMetadata } from "@/lib/service-schema";
import { getServiceHubContent } from "@/lib/services-content";

const content = getServiceHubContent("residential");

export const metadata: Metadata = buildServiceMetadata(content);

export default function ResidentialServicePage() {
  return <ServiceHubLayout content={content} />;
}
