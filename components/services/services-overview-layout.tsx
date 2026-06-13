import { SitePageShell } from "@/components/site-page-shell";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceOverview } from "@/components/services/service-overview";
import { ServiceLinkingCards } from "@/components/services/service-linking-cards";
import type { ServicesOverviewContent } from "@/lib/services-content";

export type ServicesOverviewLayoutProps = {
  content: ServicesOverviewContent;
};

export function ServicesOverviewLayout({
  content,
}: ServicesOverviewLayoutProps) {
  return (
    <SitePageShell>
      <ServiceHero
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        eyebrow="All Services"
        icon={content.heroIcon}
      />
      <ServiceOverview paragraphs={content.overview} />
      <ServiceLinkingCards
        cards={content.hubCards}
        eyebrow="Browse by Category"
        heading="Our Service Categories"
        columns={4}
      />
    </SitePageShell>
  );
}
