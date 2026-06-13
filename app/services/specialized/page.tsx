import { ServiceHubLayout } from "@/components/services/service-hub-layout";
import { getServiceHubContent } from "@/lib/services-content";

export default function SpecializedServicePage() {
  return <ServiceHubLayout content={getServiceHubContent("specialized")} />;
}
