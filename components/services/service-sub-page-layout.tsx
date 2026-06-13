import { SitePageShell } from "@/components/site-page-shell";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceOverview } from "@/components/services/service-overview";
import { ServiceFeaturesSection } from "@/components/services/service-features-section";
import { ServiceWhyGpSection } from "@/components/services/service-why-gp-section";
import { ServiceBundledSections } from "@/components/services/service-bundled-sections";
import { ServiceFaqSection } from "@/components/services/service-faq-section";
import { ServiceRelatedLinks } from "@/components/services/service-related-links";
import { ServicePageCtas } from "@/components/services/service-page-ctas";
import { serviceHubLabels } from "@/lib/service-sections";
import {
  isCombinedSubServicePage,
  type SubServicePageContent,
} from "@/lib/services-content";

export type ServiceSubPageLayoutProps = {
  content: SubServicePageContent;
};

export function ServiceSubPageLayout({ content }: ServiceSubPageLayoutProps) {
  const isCombined = isCombinedSubServicePage(content);
  const hubLabel = serviceHubLabels[content.parentHub];

  // Specialized sub-pages are quote-only (no projects CTA), per hub policy.
  const projectsHref =
    content.parentHub === "specialized" ? undefined : content.projectsHref;

  // The data model pairs `heroHeading` (service name) with a location-paired
  // SEO `h1`; the shared suffix renders as a smaller line inside the same h1.
  const headingSuffix = content.h1.startsWith(content.heroHeading)
    ? content.h1.slice(content.heroHeading.length).trim()
    : undefined;

  // Combined pages surface one badge per bundled service in the hero, each
  // anchoring to its section further down the page.
  const scopeBadges = isCombined
    ? content.bundledSections.map((section) => ({
        icon: section.icon,
        label: section.heading,
        href: `#${section.anchorId}`,
      }))
    : undefined;

  return (
    <SitePageShell>
      <ServiceHero
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        image={content.heroImage}
        eyebrow={`${hubLabel} Services`}
        headingSuffix={headingSuffix}
        icon={content.heroIcon}
        scopeBadges={scopeBadges}
      />
      <ServiceOverview
        paragraphs={content.overview}
        image={content.overviewImage}
        beforeAfterImage={content.overviewBeforeAfterImage}
      />
      <ServiceFeaturesSection steps={content.processSteps} />
      <ServiceWhyGpSection whyGp={content.whyGp} />
      {isCombined && (
        <ServiceBundledSections sections={content.bundledSections} />
      )}
      <ServiceFaqSection
        faqs={content.faqs}
        heading={isCombined ? "General Questions" : "Frequently Asked Questions"}
      />
      <ServiceRelatedLinks
        parentHub={content.parentHub}
        related={content.relatedSubServices}
        projectsHref={projectsHref}
      />
      <ServicePageCtas
        content={{
          projectsHref,
          projectsCtaLabel: projectsHref
            ? `View ${hubLabel} Projects`
            : undefined,
        }}
      />
    </SitePageShell>
  );
}
