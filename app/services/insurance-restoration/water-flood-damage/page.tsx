import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ServiceFaqSection } from "@/components/services/service-faq-section";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceJsonLd } from "@/components/services/service-json-ld";
import { servicePrimaryButtonClass } from "@/components/services/service-page-ctas";
import { WaterHiddenDamage } from "@/components/services/water-hidden-damage";
import {
  WaterClaimSideSection,
  WaterMultiUnitSection,
} from "@/components/services/water-prose-sections";
import { WaterSourceCards } from "@/components/services/water-source-cards";
import { SitePageShell } from "@/components/site-page-shell";
import { Button } from "@/components/ui/button";
import { ParallaxScrollFeatureSection } from "@/components/ui/parallax-scroll-feature-section";
import { buildServiceMetadata } from "@/lib/service-schema";
import {
  getWaterFloodDamageContent,
  type WaterFloodDamageServicePage,
} from "@/lib/services-content";

const content = getWaterFloodDamageContent();

export const metadata: Metadata = buildServiceMetadata(content);

function ClosingCtaSection({
  closingCta,
}: {
  closingCta: WaterFloodDamageServicePage["closingCta"];
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
            <ArrowRight className="size-4 transition-transform duration-150 [transition-timing-function:var(--ease-out)] group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default function WaterFloodDamagePage() {
  return (
    <>
      <ServiceJsonLd content={content} />
      <SitePageShell>
        <ServiceHero
          heading={content.heroHeading}
          subheading={content.heroSubheading}
          icon={content.heroIcon}
          eyebrow="Insurance Restoration"
          cta={{
            label: content.primaryCtaLabel,
            href: content.primaryCtaHref,
          }}
        />
        <WaterHiddenDamage
          heading={content.hiddenDamage.heading}
          paragraphs={content.hiddenDamage.paragraphs}
          panelTitle={content.hiddenDamage.panelTitle}
          items={content.hiddenDamage.items}
        />
        <WaterSourceCards
          heading={content.waterSources.heading}
          lead={content.waterSources.lead}
          cards={content.waterSources.cards}
        />
        <WaterMultiUnitSection section={content.multiUnit} />
        <ParallaxScrollFeatureSection
          eyebrow={content.rebuildScope.eyebrow}
          heading={content.rebuildScope.heading}
          showCtas={false}
          rows={content.rebuildScope.rows.map((row, index) => ({
            title: row.title,
            description: row.body,
            imageUrl: row.image.src,
            imageAlt: row.image.alt,
            reverse: index % 2 === 1,
          }))}
        />
        <WaterClaimSideSection section={content.claimSide} />
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
