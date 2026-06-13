import { ServiceSubPageLayout } from "@/components/services/service-sub-page-layout";
import { getSubServicePageContent } from "@/lib/services-content";

export default function MultiFamilyDevelopmentPage() {
  return (
    <ServiceSubPageLayout
      content={getSubServicePageContent("residential", "multi-family-development")}
    />
  );
}
