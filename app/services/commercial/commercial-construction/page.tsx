import { ServiceSubPageLayout } from "@/components/services/service-sub-page-layout";
import { getSubServicePageContent } from "@/lib/services-content";

export default function CommercialConstructionPage() {
  return (
    <ServiceSubPageLayout
      content={getSubServicePageContent("commercial", "commercial-construction")}
    />
  );
}
