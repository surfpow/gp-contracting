import { ServicePageLayout } from "@/components/services/service-page-layout";
import { getServicePageContent } from "@/lib/services-content";

export default function SpecializedServicePage() {
  return <ServicePageLayout content={getServicePageContent("specialized")} />;
}
