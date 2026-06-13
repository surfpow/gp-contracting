import { ServiceHubLayout } from "@/components/services/service-hub-layout";
import { getServiceHubContent } from "@/lib/services-content";

export default function ResidentialServicePage() {
  return <ServiceHubLayout content={getServiceHubContent("residential")} />;
}
