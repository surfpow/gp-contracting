"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { Button } from "@/components/ui/button";
import { serviceOutlineButtonClass } from "@/components/services/service-page-ctas";
import {
  ScrollRevealContentPanel,
  ScrollRevealImagePanel,
  useScrollRevealSplitPanels,
  useScrollRevealSplitRef,
} from "@/components/ui/scroll-reveal-split-panels";
import type {
  ServiceBeforeAfterImage,
  ServiceImage,
} from "@/lib/services-content";

export type ServiceOverviewProps = {
  paragraphs: string[];
  images?: ServiceImage[];
  beforeAfterImage?: ServiceBeforeAfterImage;
  showConsultationCta?: boolean;
};

const OVERVIEW_IMAGE_FRAME_CLASSNAME =
  "relative aspect-[3/4] w-full min-h-[360px] shrink-0 overflow-hidden md:min-h-[520px]";

const OVERVIEW_STACKED_IMAGE_FRAME_CLASSNAME =
  "relative aspect-[3/4] w-full min-h-[240px] shrink-0 overflow-hidden md:min-h-[320px]";

const OVERVIEW_IMAGE_COLUMN_CLASSNAME = "w-full shrink-0 md:w-[40%]";

const OVERVIEW_TEXT_COLUMN_CLASSNAME = "w-full md:w-[55%] md:max-w-xl";

function OverviewCopy({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
        Overview
      </p>
      <div className="mt-8 space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            className={
              index === 0
                ? "text-lg leading-relaxed text-neutral-700 md:text-xl md:leading-8"
                : "text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8"
            }
          >
            {paragraph}
          </p>
        ))}
      </div>
    </>
  );
}

function OverviewConsultationCta() {
  return (
    <div className="mt-8">
      <Button asChild variant="outline" className={serviceOutlineButtonClass}>
        <Link
          href="/#contact"
          className="group inline-flex items-center justify-center gap-2.5"
        >
          Schedule a consultation
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </Button>
    </div>
  );
}

function OverviewTextColumn({
  paragraphs,
  showConsultationCta = true,
}: {
  paragraphs: string[];
  showConsultationCta?: boolean;
}) {
  return (
    <div className={OVERVIEW_TEXT_COLUMN_CLASSNAME}>
      <OverviewCopy paragraphs={paragraphs} />
      {showConsultationCta && <OverviewConsultationCta />}
    </div>
  );
}

function OverviewSingleImage({ image }: { image: ServiceImage }) {
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

function OverviewStackedImages({ images }: { images: ServiceImage[] }) {
  return (
    <div className="flex flex-col gap-6">
      {images.map((image) => (
        <div key={image.src} className={OVERVIEW_STACKED_IMAGE_FRAME_CLASSNAME}>
          <OverviewSingleImage image={image} />
        </div>
      ))}
    </div>
  );
}

function OverviewImagePanel({
  images,
  beforeAfterImage,
}: {
  images?: ServiceImage[];
  beforeAfterImage?: ServiceBeforeAfterImage;
}) {
  if (beforeAfterImage) {
    return <BeforeAfterSlider images={beforeAfterImage} />;
  }

  if (!images?.length) return null;

  if (images.length === 1) {
    return <OverviewSingleImage image={images[0]} />;
  }

  return <OverviewStackedImages images={images} />;
}

function OverviewImageColumn({ children }: { children: ReactNode }) {
  return (
    <div className={OVERVIEW_IMAGE_COLUMN_CLASSNAME}>
      <div className={OVERVIEW_IMAGE_FRAME_CLASSNAME}>{children}</div>
    </div>
  );
}

export function ServiceOverview({
  paragraphs,
  images,
  beforeAfterImage,
  showConsultationCta = true,
}: ServiceOverviewProps) {
  const hasVisual = Boolean(
    beforeAfterImage || (images && images.length > 0),
  );

  if (!hasVisual) {
    return (
      <section className="bg-neutral-50 px-4 py-20 md:px-8 md:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <OverviewCopy paragraphs={paragraphs} />
        </div>
      </section>
    );
  }

  if (beforeAfterImage) {
    return (
      <section className="bg-neutral-50 px-4 py-20 md:px-8 md:py-28 lg:py-32">
        <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-10 md:flex-row-reverse md:items-start md:gap-24">
          <OverviewTextColumn
            paragraphs={paragraphs}
            showConsultationCta={showConsultationCta}
          />
          <OverviewImageColumn>
            <OverviewImagePanel
              beforeAfterImage={beforeAfterImage}
              images={images}
            />
          </OverviewImageColumn>
        </div>
      </section>
    );
  }

  return (
    <OverviewWithScrollReveal
      paragraphs={paragraphs}
      images={images}
      showConsultationCta={showConsultationCta}
    />
  );
}

function OverviewWithScrollReveal({
  paragraphs,
  images,
  showConsultationCta = true,
}: {
  paragraphs: string[];
  images?: ServiceImage[];
  showConsultationCta?: boolean;
}) {
  const ref = useScrollRevealSplitRef();
  const { shouldReduceMotion, opacity, clipPath, translateY } =
    useScrollRevealSplitPanels(ref);
  const isStacked = (images?.length ?? 0) > 1;

  return (
    <section className="bg-neutral-50 px-4 py-20 md:px-8 md:py-28 lg:py-32">
      <div
        ref={ref}
        className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-10 md:flex-row-reverse md:items-start md:gap-24"
      >
        <ScrollRevealContentPanel
          shouldReduceMotion={shouldReduceMotion}
          translateY={translateY}
          className={OVERVIEW_TEXT_COLUMN_CLASSNAME}
        >
          <OverviewCopy paragraphs={paragraphs} />
          {showConsultationCta && <OverviewConsultationCta />}
        </ScrollRevealContentPanel>

        <div className={OVERVIEW_IMAGE_COLUMN_CLASSNAME}>
          <ScrollRevealImagePanel
            shouldReduceMotion={shouldReduceMotion}
            opacity={opacity}
            clipPath={clipPath}
            className={isStacked ? "w-full" : OVERVIEW_IMAGE_FRAME_CLASSNAME}
          >
            <OverviewImagePanel images={images} />
          </ScrollRevealImagePanel>
        </div>
      </div>
    </section>
  );
}
