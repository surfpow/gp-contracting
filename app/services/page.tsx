import type { Metadata } from "next";

import { ServicesOverviewLayout } from "@/components/services/services-overview-layout";
import { buildServiceMetadata } from "@/lib/service-schema";
import { getServicesOverviewContent } from "@/lib/services-content";

const content = getServicesOverviewContent();

export const metadata: Metadata = buildServiceMetadata(content);

export default function ServicesOverviewPage() {
  return <ServicesOverviewLayout content={content} />;
}
