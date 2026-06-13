import { ServiceSubPageLayout } from "@/components/services/service-sub-page-layout";
import { getSubServicePageContent } from "@/lib/services-content";

export default function AccessibilityOutdoorLivingPage() {
  return (
    <ServiceSubPageLayout
      content={getSubServicePageContent(
        "specialized",
        "accessibility-outdoor-living",
      )}
    />
  );
}
