"use client";

import Image from "next/image";

import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import {
  SCROLL_REVEAL_IMAGE_PANEL_CLASSNAME,
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
  image?: ServiceImage;
  beforeAfterImage?: ServiceBeforeAfterImage;
};

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

function OverviewImagePanel({
  image,
  beforeAfterImage,
}: {
  image?: ServiceImage;
  beforeAfterImage?: ServiceBeforeAfterImage;
}) {
  if (beforeAfterImage) {
    return <BeforeAfterSlider images={beforeAfterImage} />;
  }

  if (!image) return null;

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

export function ServiceOverview({
  paragraphs,
  image,
  beforeAfterImage,
}: ServiceOverviewProps) {
  const hasVisual = Boolean(image || beforeAfterImage);

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
          <div className="w-full md:w-[55%] md:max-w-xl">
            <OverviewCopy paragraphs={paragraphs} />
          </div>

          <div className={SCROLL_REVEAL_IMAGE_PANEL_CLASSNAME}>
            <OverviewImagePanel beforeAfterImage={beforeAfterImage} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <OverviewWithScrollReveal paragraphs={paragraphs} image={image} />
  );
}

function OverviewWithScrollReveal({
  paragraphs,
  image,
}: {
  paragraphs: string[];
  image?: ServiceImage;
}) {
  const ref = useScrollRevealSplitRef();
  const { shouldReduceMotion, opacity, clipPath, translateY } =
    useScrollRevealSplitPanels(ref);

  return (
    <section className="bg-neutral-50 px-4 py-20 md:px-8 md:py-28 lg:py-32">
      <div
        ref={ref}
        className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-10 md:flex-row-reverse md:items-start md:gap-24"
      >
        <ScrollRevealContentPanel
          shouldReduceMotion={shouldReduceMotion}
          translateY={translateY}
          className="w-full md:w-[55%] md:max-w-xl"
        >
          <OverviewCopy paragraphs={paragraphs} />
        </ScrollRevealContentPanel>

        <ScrollRevealImagePanel
          shouldReduceMotion={shouldReduceMotion}
          opacity={opacity}
          clipPath={clipPath}
          className={SCROLL_REVEAL_IMAGE_PANEL_CLASSNAME}
        >
          <OverviewImagePanel image={image} />
        </ScrollRevealImagePanel>
      </div>
    </section>
  );
}
