import { ServiceSubPageLayout } from "@/components/services/service-sub-page-layout";
import { getSubServicePageContent } from "@/lib/services-content";

export default function BuildingSystemsUpgradesPage() {
  return (
    <ServiceSubPageLayout
      content={getSubServicePageContent("specialized", "building-systems-upgrades")}
    />
  );
}
