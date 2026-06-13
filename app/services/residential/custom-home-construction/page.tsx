import { ServiceSubPageLayout } from "@/components/services/service-sub-page-layout";
import { getSubServicePageContent } from "@/lib/services-content";

export default function CustomHomeConstructionPage() {
  return (
    <ServiceSubPageLayout
      content={getSubServicePageContent("residential", "custom-home-construction")}
    />
  );
}
