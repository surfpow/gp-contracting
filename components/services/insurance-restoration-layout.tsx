"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Check, Home, Shield } from "lucide-react";
import { useReducedMotion, type Variants } from "framer-motion";

import { CredentialsStrip } from "@/components/services/credentials-strip";
import { SitePageShell } from "@/components/site-page-shell";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFaqSection } from "@/components/services/service-faq-section";
import { ServiceLinkingCards } from "@/components/services/service-linking-cards";
import { servicePrimaryButtonClass } from "@/components/services/service-page-ctas";
import { Button } from "@/components/ui/button";
import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";
import type { InsuranceRestorationServicePage } from "@/lib/services-content";

export type InsuranceRestorationLayoutProps = {
  content: InsuranceRestorationServicePage;
};

function revealVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
    };
  }
  return {
    hidden: {
      opacity: 0,
      transform: "translateY(14px)",
      filter: "blur(4px)",
    },
    visible: (i: number) => ({
      opacity: 1,
      transform: "translateY(0px)",
      filter: "blur(0px)",
      transition: {
        delay: i * STAGGER_MARKETING_S,
        duration: DURATION_MARKETING_S,
        ease: EASE_OUT,
      },
    }),
  };
}

function ScopeReviewCta({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Button asChild className={servicePrimaryButtonClass}>
      <Link
        href={href}
        className="group inline-flex items-center justify-center gap-2.5"
      >
        {label}
        <ArrowRight className="size-4 transition-transform duration-150 [transition-timing-function:var(--ease-out)] group-hover:translate-x-0.5" />
      </Link>
    </Button>
  );
}

function WhatWeRestoreSection({
  section,
}: {
  section: InsuranceRestorationServicePage["whatWeRestore"];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);
  const groupIcons = [Home, Building2] as const;

  return (
    <section
      ref={ref}
      className="bg-white px-4 py-20 md:px-8 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
          className="text-sm font-medium tracking-widest text-brand-navy uppercase"
        >
          What We Restore
        </TimelineContent>
        <TimelineContent
          as="h2"
          animationNum={1}
          timelineRef={ref}
          customVariants={variants}
          className="mt-4 max-w-3xl font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl lg:text-[2.75rem] lg:leading-tight"
        >
          {section.heading}
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={2}
          timelineRef={ref}
          customVariants={variants}
          className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8"
        >
          {section.body}
        </TimelineContent>

        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-2 md:gap-14 lg:gap-20">
          {section.listGroups.map((group, groupIndex) => {
            const Icon = groupIcons[groupIndex] ?? Shield;
            return (
              <TimelineContent
                key={group.heading}
                animationNum={3 + groupIndex}
                timelineRef={ref}
                customVariants={variants}
                className="relative"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex size-10 items-center justify-center rounded-md bg-brand-navy/[0.08] text-brand-navy"
                    aria-hidden="true"
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-serif text-xl tracking-tight text-neutral-900 md:text-2xl">
                    {group.heading}
                  </h3>
                </div>
                <ul className="mt-8 space-y-0">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 border-t border-neutral-200/80 py-4 text-base leading-relaxed text-neutral-600 first:border-t-0 first:pt-0"
                    >
                      <Check
                        className="mt-1 size-4 shrink-0 text-brand-navy/55"
                        aria-hidden="true"
                        strokeWidth={2}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </TimelineContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContractorChoiceSection({
  section,
}: {
  section: InsuranceRestorationServicePage["contractorChoice"];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-brand-dark px-4 py-20 md:px-8 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-16 xl:gap-20">
        <div className="lg:col-span-5">
          <TimelineContent
            as="p"
            animationNum={0}
            timelineRef={ref}
            customVariants={variants}
            className="text-sm font-medium tracking-widest text-brand-navy-light uppercase"
          >
            Your Choice
          </TimelineContent>
          <TimelineContent
            animationNum={1}
            timelineRef={ref}
            customVariants={variants}
            className="mt-4 h-px w-12 bg-brand-navy-light/60"
            aria-hidden="true"
          />
          <TimelineContent
            as="h2"
            animationNum={2}
            timelineRef={ref}
            customVariants={variants}
            className="mt-6 font-serif text-3xl leading-tight tracking-tight text-neutral-50 md:text-4xl"
          >
            {section.heading}
          </TimelineContent>
        </div>

        <div className="mt-12 lg:col-span-7 lg:mt-0">
          <TimelineContent
            as="blockquote"
            animationNum={3}
            timelineRef={ref}
            customVariants={variants}
            className="border-l-2 border-brand-navy-light/70 pl-6 font-serif text-2xl leading-snug tracking-tight text-neutral-100 italic md:pl-8 md:text-3xl md:leading-snug"
          >
            {section.pullQuote}
          </TimelineContent>
          <div className="mt-8 space-y-5">
            {section.body.map((paragraph, index) => (
              <TimelineContent
                as="p"
                key={paragraph}
                animationNum={4 + index}
                timelineRef={ref}
                customVariants={variants}
                className="text-base leading-relaxed text-neutral-300 md:text-lg md:leading-8"
              >
                {paragraph}
              </TimelineContent>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection({
  section,
}: {
  section: InsuranceRestorationServicePage["process"];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-white px-4 py-20 md:px-8 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
          className="text-sm font-medium tracking-widest text-brand-navy uppercase"
        >
          The Process
        </TimelineContent>
        <TimelineContent
          as="h2"
          animationNum={1}
          timelineRef={ref}
          customVariants={variants}
          className="mt-4 max-w-3xl font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl lg:text-[2.75rem] lg:leading-tight"
        >
          {section.heading}
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={2}
          timelineRef={ref}
          customVariants={variants}
          className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8"
        >
          {section.intro}
        </TimelineContent>

        <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-x-12">
          {section.steps.map((step, index) => (
            <TimelineContent
              as="li"
              key={step.title}
              animationNum={3 + index}
              timelineRef={ref}
              customVariants={variants}
              className="border-t-2 border-brand-navy/20 pt-6"
            >
              <span className="text-sm font-medium tabular-nums tracking-wide text-neutral-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-xl tracking-tight text-neutral-900 md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                {step.description}
              </p>
            </TimelineContent>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WarrantySection({
  warranty,
}: {
  warranty: InsuranceRestorationServicePage["warranty"];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);
  const telHref = `tel:${warranty.contactPhone.replace(/[^\d+]/g, "")}`;

  return (
    <section
      ref={ref}
      className="bg-brand-dark px-4 py-20 md:px-8 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-16 xl:gap-20">
        <div className="lg:col-span-5">
          <TimelineContent
            as="p"
            animationNum={0}
            timelineRef={ref}
            customVariants={variants}
            className="text-sm font-medium tracking-widest text-brand-navy-light uppercase"
          >
            Warranty
          </TimelineContent>
          <TimelineContent
            animationNum={1}
            timelineRef={ref}
            customVariants={variants}
            className="mt-4 h-px w-12 bg-brand-navy-light/60"
            aria-hidden="true"
          />
          <TimelineContent
            as="h2"
            animationNum={2}
            timelineRef={ref}
            customVariants={variants}
            className="mt-6 font-serif text-3xl leading-tight tracking-tight text-neutral-50 md:text-4xl"
          >
            {warranty.heading}
          </TimelineContent>
        </div>

        <div className="mt-12 lg:col-span-7 lg:mt-0">
          <TimelineContent
            as="p"
            animationNum={3}
            timelineRef={ref}
            customVariants={variants}
            className="text-lg leading-relaxed text-neutral-200 md:text-xl md:leading-9"
          >
            {warranty.body}
          </TimelineContent>

          <TimelineContent
            animationNum={4}
            timelineRef={ref}
            customVariants={variants}
            className="mt-10 border-t border-neutral-700/80 pt-8"
          >
            <p className="text-xs font-medium tracking-[0.16em] text-brand-navy-light uppercase">
              Direct warranty contact
            </p>
            <p className="mt-3 font-serif text-2xl tracking-tight text-neutral-50">
              {warranty.contactName}
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
              <a
                href={telHref}
                className="text-base text-neutral-300 transition-colors duration-200 [transition-timing-function:var(--ease-out)] hover:text-neutral-50"
              >
                {warranty.contactPhone}
              </a>
              <span
                className="hidden text-neutral-600 sm:inline"
                aria-hidden="true"
              >
                ·
              </span>
              <a
                href={`mailto:${warranty.contactEmail}`}
                className="text-base text-neutral-300 transition-colors duration-200 [transition-timing-function:var(--ease-out)] hover:text-neutral-50"
              >
                {warranty.contactEmail}
              </a>
            </div>
          </TimelineContent>
        </div>
      </div>
    </section>
  );
}

function CredentialsAndFactsSection({
  credentials,
  section,
}: {
  credentials: string[];
  section: InsuranceRestorationServicePage["companyFacts"];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-white px-4 py-20 md:px-8 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-4xl">
        <TimelineContent
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
          className="rounded-sm border border-neutral-200 bg-neutral-50 px-5 py-8 md:px-8 md:py-10"
        >
          <CredentialsStrip items={credentials} variant="embedded" />
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={1}
          timelineRef={ref}
          customVariants={variants}
          className="mt-14 text-sm font-medium tracking-widest text-brand-navy uppercase"
        >
          Company Facts
        </TimelineContent>
        <TimelineContent
          as="h2"
          animationNum={2}
          timelineRef={ref}
          customVariants={variants}
          className="mt-4 font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl"
        >
          {section.heading}
        </TimelineContent>

        <dl className="mt-10 divide-y divide-neutral-200/90 border-t border-neutral-200">
          {section.facts.map((fact) => (
            <div
              key={fact.label}
              className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-12 sm:gap-8 sm:py-6"
            >
              <dt className="text-sm font-medium tracking-wide text-neutral-500 uppercase sm:col-span-4">
                {fact.label}
              </dt>
              <dd className="text-base leading-relaxed text-neutral-800 sm:col-span-8">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ServiceAreaSection({
  section,
}: {
  section: InsuranceRestorationServicePage["serviceArea"];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-neutral-50 px-4 py-20 md:px-8 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
          className="text-sm font-medium tracking-widest text-brand-navy uppercase"
        >
          Service Area
        </TimelineContent>
        <TimelineContent
          as="h2"
          animationNum={1}
          timelineRef={ref}
          customVariants={variants}
          className="mt-4 font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl"
        >
          {section.heading}
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={2}
          timelineRef={ref}
          customVariants={variants}
          className="mt-6 text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8"
        >
          {section.body}
        </TimelineContent>
      </div>
    </section>
  );
}

function ClosingCtaSection({
  closingCta,
}: {
  closingCta: InsuranceRestorationServicePage["closingCta"];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="border-t border-neutral-800 bg-brand-dark px-4 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-8">
        <div>
          <TimelineContent
            as="h2"
            animationNum={0}
            timelineRef={ref}
            customVariants={variants}
            className="font-serif text-3xl tracking-tight text-neutral-50 md:text-4xl lg:text-[2.75rem] lg:leading-tight"
          >
            {closingCta.heading}
          </TimelineContent>
          <TimelineContent
            as="p"
            animationNum={1}
            timelineRef={ref}
            customVariants={variants}
            className="mt-6 text-base leading-relaxed text-neutral-300 md:text-lg md:leading-8"
          >
            {closingCta.body}
          </TimelineContent>
        </div>
        <TimelineContent
          animationNum={2}
          timelineRef={ref}
          customVariants={variants}
        >
          <ScopeReviewCta
            label={closingCta.ctaLabel}
            href={closingCta.ctaHref ?? "/#contact"}
          />
        </TimelineContent>
      </div>
    </section>
  );
}

export function InsuranceRestorationLayout({
  content,
}: InsuranceRestorationLayoutProps) {
  return (
    <SitePageShell>
      <ServiceHero
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        image={content.heroImage}
        icon={content.heroIcon}
        eyebrow="Insurance Restoration"
        cta={{
          label: content.primaryCtaLabel,
          href: content.primaryCtaHref,
        }}
      />
      <WhatWeRestoreSection section={content.whatWeRestore} />
      <ContractorChoiceSection section={content.contractorChoice} />
      <ProcessSection section={content.process} />
      {content.linkingCards.length > 0 && (
        <ServiceLinkingCards
          cards={content.linkingCards}
          eyebrow={content.linkingCardsEyebrow ?? "Loss Types"}
          heading={
            content.linkingCardsHeading ?? "Start With the Damage You Are Facing"
          }
          background="neutral"
        />
      )}
      <WarrantySection warranty={content.warranty} />
      <CredentialsAndFactsSection
        credentials={content.credentialsStrip}
        section={content.companyFacts}
      />
      <ServiceAreaSection section={content.serviceArea} />
      <ServiceFaqSection
        faqs={content.faqs}
        heading={content.faqHeading}
        background="white"
      />
      <ClosingCtaSection closingCta={content.closingCta} />
    </SitePageShell>
  );
}
