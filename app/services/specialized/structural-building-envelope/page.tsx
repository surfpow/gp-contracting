import { ServiceSubPageLayout } from "@/components/services/service-sub-page-layout";
import { getSubServicePageContent } from "@/lib/services-content";

export default function StructuralBuildingEnvelopePage() {
  return (
    <ServiceSubPageLayout
      content={getSubServicePageContent(
        "specialized",
        "structural-building-envelope",
      )}
    />
  );
}
