import { ServiceSubPageLayout } from "@/components/services/service-sub-page-layout";
import { getSubServicePageContent } from "@/lib/services-content";

export default function RestaurantBarConstructionPage() {
  return (
    <ServiceSubPageLayout
      content={getSubServicePageContent("commercial", "restaurant-bar-construction")}
    />
  );
}
