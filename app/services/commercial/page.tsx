import { ServiceHubLayout } from "@/components/services/service-hub-layout";
import { getServiceHubContent } from "@/lib/services-content";

export default function CommercialServicePage() {
  return <ServiceHubLayout content={getServiceHubContent("commercial")} />;
}
