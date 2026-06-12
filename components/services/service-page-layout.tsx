import { SitePageShell } from "@/components/site-page-shell";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceOverview } from "@/components/services/service-overview";
import { ServiceSubServices } from "@/components/services/service-subservices";
import { ServiceDeepDiveSection } from "@/components/services/service-deep-dive";
import { ServicePageCtas } from "@/components/services/service-page-ctas";
import {
  isDeepDivePage,
  isSubServicesPage,
  type ServicePageContent,
} from "@/lib/services-content";

export type ServicePageLayoutProps = {
  content: ServicePageContent;
};

export function ServicePageLayout({ content }: ServicePageLayoutProps) {
  return (
    <SitePageShell>
      <ServiceHero
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        image={content.heroImage}
      />
      <ServiceOverview paragraphs={content.overview} />
      {isSubServicesPage(content) && (
        <ServiceSubServices subServices={content.subServices} />
      )}
      {isDeepDivePage(content) && (
        <ServiceDeepDiveSection deepDive={content.deepDive} />
      )}
      <ServicePageCtas content={content} />
    </SitePageShell>
  );
}
