import { SitePageShell } from "@/components/site-page-shell";
import { ClientLogosBand } from "@/components/services/client-logos-band";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceOverview } from "@/components/services/service-overview";
import { ServiceLinkingCards } from "@/components/services/service-linking-cards";
import { ServicePageCtas } from "@/components/services/service-page-ctas";
import { getServiceClientLogos } from "@/lib/partner-logos";
import type { HubServicePage } from "@/lib/services-content";

export type ServiceHubLayoutProps = {
  content: HubServicePage;
};

export function ServiceHubLayout({ content }: ServiceHubLayoutProps) {
  const clientLogos = getServiceClientLogos(content.slug);

  return (
    <SitePageShell>
      <ServiceHero
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        image={content.heroImage}
        icon={content.heroIcon}
      />
      <ServiceOverview paragraphs={content.overview} />
      {clientLogos ? <ClientLogosBand {...clientLogos} /> : null}
      <ServiceLinkingCards cards={content.linkingCards} />
      <ServicePageCtas content={content} />
    </SitePageShell>
  );
}
