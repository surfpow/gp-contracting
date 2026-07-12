import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FireAudiencePanels } from "@/components/services/fire-audience-panels";
import { FireComparisonPanels } from "@/components/services/fire-comparison-panels";
import { FireCredentialsStrip } from "@/components/services/fire-credentials-strip";
import { FireRebuildTimeline } from "@/components/services/fire-rebuild-timeline";
import { ServiceFaqSection } from "@/components/services/service-faq-section";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceJsonLd } from "@/components/services/service-json-ld";
import { servicePrimaryButtonClass } from "@/components/services/service-page-ctas";
import { SitePageShell } from "@/components/site-page-shell";
import { Button } from "@/components/ui/button";
import { buildServiceMetadata } from "@/lib/service-schema";
import { serviceSubPageHref } from "@/lib/service-sections";
import {
  getFireDamageRebuildsContent,
  type FireDamageRebuildsServicePage,
} from "@/lib/services-content";

const content = getFireDamageRebuildsContent();

export const metadata: Metadata = buildServiceMetadata(content);

function ClosingCtaSection({
  closingCta,
}: {
  closingCta: FireDamageRebuildsServicePage["closingCta"];
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
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

function DamageLayersSection({
  section,
}: {
  section: FireDamageRebuildsServicePage["damageLayers"];
}) {
  const waterHref = serviceSubPageHref(
    "insurance-restoration",
    "water-flood-damage",
  );

  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl">
          {section.heading}
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8">
          {section.intro}
        </p>
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-16 md:gap-10">
          {section.steps.map((step, index) => {
            const number = String(index + 1).padStart(2, "0");
            const isWaterStep = step.title === "Water damage.";

            return (
              <div
                key={`${step.title}-${step.description}`}
                className="border-t-2 border-brand-navy/20 pt-6"
              >
                <span className="text-sm font-medium tabular-nums text-neutral-400">
                  {number}
                </span>
                <h3 className="mt-2 font-serif text-xl tracking-tight text-neutral-900 md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">
                  {isWaterStep ? (
                    <>
                      Firefighting puts enormous volumes of water into a
                      building. Saturated drywall, insulation, and subfloors
                      frequently make up a large share of the final scope. Many
                      fire claims are also{" "}
                      <Link
                        href={waterHref}
                        className="font-medium text-brand-navy underline decoration-brand-navy/30 underline-offset-4 transition-colors duration-150 [transition-timing-function:var(--ease-out)] hover:decoration-brand-navy"
                      >
                        water claims
                      </Link>
                      , and we scope both from day one.
                    </>
                  ) : (
                    step.description
                  )}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-12 max-w-3xl text-base leading-relaxed text-neutral-600 md:mt-14 md:text-lg md:leading-8">
          {section.outro}
        </p>
      </div>
    </section>
  );
}

export default function FireDamageRebuildsPage() {
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
        <FireComparisonPanels
          heading={content.comparison.heading}
          lead={content.comparison.lead}
          left={content.comparison.left}
          right={content.comparison.right}
          closing={content.comparison.closing}
        />
        <DamageLayersSection section={content.damageLayers} />
        <FireAudiencePanels
          heading={content.audience.heading}
          lead={content.audience.lead}
          panels={content.audience.panels}
        />
        <FireRebuildTimeline
          eyebrow={content.timeline.eyebrow}
          heading={content.timeline.heading}
          stops={content.timeline.stops}
        />
        <FireCredentialsStrip
          items={content.credentials}
          overviewHref={content.overviewHref}
          overviewLinkLabel={content.overviewLinkLabel}
        />
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
