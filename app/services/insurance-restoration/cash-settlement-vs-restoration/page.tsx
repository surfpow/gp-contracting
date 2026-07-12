import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CashSettlementComparison } from "@/components/services/cash-settlement-comparison";
import { CashSettlementFramework } from "@/components/services/cash-settlement-framework";
import { CashSettlementGuideHero } from "@/components/services/cash-settlement-guide-hero";
import {
  CashSettlementBusinessSection,
  CashSettlementOptionCash,
  CashSettlementOptionRestore,
  CashSettlementRiskSection,
  CashSettlementWhereGpFits,
} from "@/components/services/cash-settlement-guide-sections";
import { ServiceFaqSection } from "@/components/services/service-faq-section";
import { ServiceJsonLd } from "@/components/services/service-json-ld";
import { servicePrimaryButtonClass, serviceCtaArrowClass } from "@/components/services/service-page-ctas";
import { SitePageShell } from "@/components/site-page-shell";
import { Button } from "@/components/ui/button";
import { buildServiceMetadata } from "@/lib/service-schema";
import {
  getCashSettlementGuideContent,
  type CashSettlementGuidePage,
} from "@/lib/services-content";

const content = getCashSettlementGuideContent();

export const metadata: Metadata = buildServiceMetadata({
  title: content.title,
  metaDescription: content.metaDescription,
  keywords: content.keywords,
  ogImage: content.ogImage?.src,
});

function ClosingCtaSection({
  closingCta,
}: {
  closingCta: CashSettlementGuidePage["closingCta"];
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

export default function CashSettlementVsRestorationPage() {
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
        <CashSettlementComparison section={content.comparison} />
        <CashSettlementRiskSection section={content.risk} />
        <CashSettlementOptionRestore section={content.optionRestore} />
        <CashSettlementOptionCash section={content.optionCash} />
        <CashSettlementBusinessSection section={content.business} />
        <CashSettlementFramework section={content.framework} />
        <CashSettlementWhereGpFits section={content.whereGpFits} />
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
