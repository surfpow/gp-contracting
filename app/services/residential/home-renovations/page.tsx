import { ServiceSubPageLayout } from "@/components/services/service-sub-page-layout";
import { getSubServicePageContent } from "@/lib/services-content";

export default function HomeRenovationsPage() {
  return (
    <ServiceSubPageLayout
      content={getSubServicePageContent("residential", "home-renovations")}
    />
  );
}
