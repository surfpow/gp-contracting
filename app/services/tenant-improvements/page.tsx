import { ServicePageLayout } from "@/components/services/service-page-layout";
import { getServicePageContent } from "@/lib/services-content";

export default function TenantImprovementsServicePage() {
  return (
    <ServicePageLayout content={getServicePageContent("tenant-improvements")} />
  );
}
