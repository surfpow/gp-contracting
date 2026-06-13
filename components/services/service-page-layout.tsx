import { SitePageShell } from "@/components/site-page-shell";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceOverview } from "@/components/services/service-overview";
import { ServiceDeepDiveSection } from "@/components/services/service-deep-dive";
import { ServiceFaqSection } from "@/components/services/service-faq-section";
import { ServicePageCtas } from "@/components/services/service-page-ctas";
import type { DeepDiveServicePage } from "@/lib/services-content";

export type ServicePageLayoutProps = {
  content: DeepDiveServicePage;
};

export function ServicePageLayout({ content }: ServicePageLayoutProps) {
  return (
    <SitePageShell>
      <ServiceHero
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        image={content.heroImage}
        icon={content.heroIcon}
      />
      <ServiceOverview paragraphs={content.overview} />
      <ServiceDeepDiveSection deepDive={content.deepDive} />
      <ServiceFaqSection faqs={content.faqs} background="white" />
      <ServicePageCtas content={content} />
    </SitePageShell>
  );
}
