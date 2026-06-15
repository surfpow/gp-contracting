"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  serviceOutlineButtonClass,
  servicePrimaryButtonClass,
} from "@/components/services/service-page-ctas";
import { Button } from "@/components/ui/button";
import {
  ScrollRevealContentPanel,
  ScrollRevealImagePanel,
  useScrollRevealSplitPanels,
  useScrollRevealSplitRef,
} from "@/components/ui/scroll-reveal-split-panels";
import type {
  ServiceBundledOverviewCta,
  ServiceBundledSection,
  ServiceImage,
} from "@/lib/services-content";

const BUNDLED_OVERVIEW_IMAGE_FRAME_CLASSNAME =
  "relative aspect-[3/4] w-full min-h-[360px] shrink-0 overflow-hidden md:min-h-[520px]";

const BUNDLED_OVERVIEW_IMAGE_COLUMN_CLASSNAME = "w-full shrink-0 md:w-[40%]";

const BUNDLED_OVERVIEW_TEXT_COLUMN_CLASSNAME = "w-full md:w-[55%] md:max-w-xl";

function BundledOverviewCopy({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-5">
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p
          key={paragraph}
          className={
            paragraphIndex === 0
              ? "text-lg leading-relaxed text-neutral-700 md:text-xl md:leading-8"
              : "text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8"
          }
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function BundledOverviewCtaButton({
  cta,
}: {
  cta: Required<Pick<ServiceBundledOverviewCta, "label">> &
    ServiceBundledOverviewCta;
}) {
  const href = cta.href ?? "/#contact";
  const variant = cta.variant ?? "primary";
  const buttonClass =
    variant === "outline" ? serviceOutlineButtonClass : servicePrimaryButtonClass;

  return (
    <div className="mt-6">
      <Button
        asChild
        variant={variant === "outline" ? "outline" : "default"}
        className={buttonClass}
      >
        <Link
          href={href}
          className="group inline-flex items-center justify-center gap-2.5"
        >
          {cta.label}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </Button>
    </div>
  );
}

function BundledOverviewImage({ image }: { image: ServiceImage }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes="(max-width: 768px) 100vw, 40vw"
      className="object-cover"
    />
  );
}

function resolveOverviewCta(
  overviewCta?: ServiceBundledOverviewCta,
): Required<Pick<ServiceBundledOverviewCta, "label" | "placement" | "variant">> &
  ServiceBundledOverviewCta {
  return {
    label: overviewCta?.label ?? "Get a Quote",
    href: overviewCta?.href,
    placement: overviewCta?.placement ?? "text",
    variant: overviewCta?.variant ?? "primary",
  };
}

function BundledSectionOverviewPlain({
  overview,
}: Pick<ServiceBundledSection, "overview">) {
  return (
    <div className="mt-6 max-w-3xl">
      <BundledOverviewCopy paragraphs={overview} />
    </div>
  );
}

function BundledSectionOverviewWithReveal({
  overview,
  overviewImage,
  overviewCta,
}: Pick<
  ServiceBundledSection,
  "overview" | "overviewImage" | "overviewCta"
>) {
  const ref = useScrollRevealSplitRef();
  const { shouldReduceMotion, opacity, clipPath, translateY } =
    useScrollRevealSplitPanels(ref);
  const cta = resolveOverviewCta(overviewCta);
  const ctaButton = <BundledOverviewCtaButton cta={cta} />;

  return (
    <div
      ref={ref}
      className="mt-6 flex flex-col-reverse items-center gap-10 md:flex-row-reverse md:items-start md:gap-16"
    >
      <ScrollRevealContentPanel
        shouldReduceMotion={shouldReduceMotion}
        translateY={translateY}
        className={BUNDLED_OVERVIEW_TEXT_COLUMN_CLASSNAME}
      >
        <BundledOverviewCopy paragraphs={overview} />
        {cta.placement === "text" && ctaButton}
      </ScrollRevealContentPanel>

      <div className={BUNDLED_OVERVIEW_IMAGE_COLUMN_CLASSNAME}>
        <ScrollRevealImagePanel
          shouldReduceMotion={shouldReduceMotion}
          opacity={opacity}
          clipPath={clipPath}
          className={BUNDLED_OVERVIEW_IMAGE_FRAME_CLASSNAME}
        >
          {overviewImage && <BundledOverviewImage image={overviewImage} />}
        </ScrollRevealImagePanel>
        {cta.placement === "image" && ctaButton}
      </div>
    </div>
  );
}

export function BundledSectionOverview({
  overview,
  overviewImage,
  overviewCta,
}: Pick<
  ServiceBundledSection,
  "overview" | "overviewImage" | "overviewCta"
>) {
  if (!overviewImage) {
    return <BundledSectionOverviewPlain overview={overview} />;
  }

  return (
    <BundledSectionOverviewWithReveal
      overview={overview}
      overviewImage={overviewImage}
      overviewCta={overviewCta}
    />
  );
}
