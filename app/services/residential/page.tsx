import { ServicePageLayout } from "@/components/services/service-page-layout";
import { getServicePageContent } from "@/lib/services-content";

export default function ResidentialServicePage() {
  return <ServicePageLayout content={getServicePageContent("residential")} />;
}
