import { ServicesOverviewLayout } from "@/components/services/services-overview-layout";
import { getServicesOverviewContent } from "@/lib/services-content";

export default function ServicesOverviewPage() {
  return <ServicesOverviewLayout content={getServicesOverviewContent()} />;
}
