import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CashSettlementGuideHero } from "@/components/services/cash-settlement-guide-hero";
import { ServiceFaqSection } from "@/components/services/service-faq-section";
import { ServiceJsonLd } from "@/components/services/service-json-ld";
import { servicePrimaryButtonClass, serviceCtaArrowClass } from "@/components/services/service-page-ctas";
import { UpgradesEasierHarder } from "@/components/services/upgrades-easier-harder";
import {
  UpgradesBusinessSection,
  UpgradesDeadlineSection,
  UpgradesGpConversationSection,
  UpgradesLikeKindSection,
  UpgradesThreeOpeningsSection,
} from "@/components/services/upgrades-guide-sections";
import { UpgradesQuickAnswer } from "@/components/services/upgrades-quick-answer";
import { UpgradesThreePaths } from "@/components/services/upgrades-three-paths";
import { SitePageShell } from "@/components/site-page-shell";
import { Button } from "@/components/ui/button";
import { buildServiceMetadata } from "@/lib/service-schema";
import {
  getUpgradesDuringClaimGuideContent,
  type UpgradesDuringClaimGuidePage,
} from "@/lib/services-content";

const content = getUpgradesDuringClaimGuideContent();

export const metadata: Metadata = buildServiceMetadata({
  title: content.title,
  metaDescription: content.metaDescription,
  keywords: content.keywords,
  ogImage: content.ogImage?.src,
});

function ClosingCtaSection({
  closingCta,
}: {
  closingCta: UpgradesDuringClaimGuidePage["closingCta"];
}) {
  return (
    <section className="border-t border-neutral-200 bg-brand-dark px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-8">
        <div>
          <h2 className="font-serif text-3xl tracking-tight text-neutral-50 md:text-4xl">
            {closingCta.heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-neutral-300 md:text-lg md:leading-8">
            {closingCta.body}
          </p>
        </div>
        <Button asChild className={servicePrimaryButtonClass}>
          <Link
            href={closingCta.ctaHref ?? "/#contact"}
            className="group inline-flex items-center justify-center gap-2.5"
          >
            {closingCta.ctaLabel}
            <ArrowRight className={serviceCtaArrowClass} />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default function UpgradesDuringInsuranceClaimPage() {
  return (
    <>
      <ServiceJsonLd content={content} />
      <SitePageShell>
        <CashSettlementGuideHero
          eyebrow={content.heroEyebrow}
          eyebrowHref={content.heroEyebrowHref}
          heading={content.heroHeading}
          subheading={content.heroSubheading}
          ctaLabel={content.primaryCtaLabel}
          ctaHref={content.primaryCtaHref}
          icon={content.heroIcon}
          image={content.heroImage}
        />
        <UpgradesQuickAnswer section={content.quickAnswer} />
        <UpgradesLikeKindSection section={content.likeKind} />
        <UpgradesThreeOpeningsSection section={content.threeOpenings} />
        <UpgradesThreePaths section={content.threePaths} />
        <UpgradesEasierHarder section={content.easierHarder} />
        <UpgradesDeadlineSection section={content.deadline} />
        <UpgradesBusinessSection section={content.business} />
        <UpgradesGpConversationSection section={content.gpConversation} />
        <ServiceFaqSection
          faqs={content.faqs}
          heading={content.faqHeading}
          background="neutral"
        />
        <ClosingCtaSection closingCta={content.closingCta} />
      </SitePageShell>
    </>
  );
}
