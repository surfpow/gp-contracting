import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ServiceFaqSection } from "@/components/services/service-faq-section";
import { ServiceJsonLd } from "@/components/services/service-json-ld";
import {
  servicePrimaryButtonClass,
  serviceCtaArrowClass,
} from "@/components/services/service-page-ctas";
import { StrategicEvaporates } from "@/components/services/strategic-evaporates";
import {
  StrategicCommercialSection,
  StrategicHonestySection,
  StrategicLeverageSection,
  StrategicResaleSection,
} from "@/components/services/strategic-guide-sections";
import { StrategicQuickAnswer } from "@/components/services/strategic-quick-answer";
import { StrategicSeriesNav } from "@/components/services/strategic-series-nav";
import { StrategicUpgradesHero } from "@/components/services/strategic-upgrades-hero";
import { StrategicValueMap } from "@/components/services/strategic-value-map";
import { SitePageShell } from "@/components/site-page-shell";
import { Button } from "@/components/ui/button";
import { buildServiceMetadata } from "@/lib/service-schema";
import {
  getStrategicUpgradesGuideContent,
  type StrategicUpgradesGuidePage,
} from "@/lib/services-content";

const content = getStrategicUpgradesGuideContent();

export const metadata: Metadata = buildServiceMetadata({
  title: content.title,
  metaDescription: content.metaDescription,
  keywords: content.keywords,
  ogImage: content.ogImage?.src,
});

function ClosingCtaSection({
  closingCta,
}: {
  closingCta: StrategicUpgradesGuidePage["closingCta"];
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

export default function StrategicUpgradesPage() {
  return (
    <>
      <ServiceJsonLd content={content} />
      <SitePageShell>
        <StrategicUpgradesHero
          eyebrow={content.heroEyebrow}
          eyebrowHref={content.heroEyebrowHref}
          heading={content.heroHeading}
          subheading={content.heroSubheading}
          ctaLabel={content.primaryCtaLabel}
          ctaHref={content.primaryCtaHref}
          icon={content.heroIcon}
          image={content.heroImage}
        />
        <StrategicQuickAnswer section={content.quickAnswer} />
        <StrategicLeverageSection section={content.leverage} />
        <StrategicValueMap section={content.valueMap} />
        <StrategicEvaporates section={content.evaporates} />
        <StrategicResaleSection section={content.resale} />
        <StrategicCommercialSection section={content.commercial} />
        <StrategicHonestySection section={content.honesty} />
        <StrategicSeriesNav section={content.series} />
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
