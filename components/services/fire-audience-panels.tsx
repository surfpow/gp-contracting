"use client";

import Image from "next/image";

import {
  SCROLL_REVEAL_IMAGE_PANEL_CLASSNAME,
  ScrollRevealContentPanel,
  ScrollRevealImagePanel,
  useScrollRevealSplitPanels,
  useScrollRevealSplitRef,
} from "@/components/ui/scroll-reveal-split-panels";
import { cn } from "@/lib/utils";
import type { FireAudiencePanel } from "@/lib/services-content";

export type FireAudiencePanelsProps = {
  heading: string;
  lead: string;
  panels: FireAudiencePanel[];
};

function AudiencePanelRow({
  panel,
  index,
}: {
  panel: FireAudiencePanel;
  index: number;
}) {
  const ref = useScrollRevealSplitRef();
  const { shouldReduceMotion, opacity, clipPath, translateY } =
    useScrollRevealSplitPanels(ref);
  const reverse = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-10 md:items-start md:gap-24",
        reverse ? "md:flex-row" : "md:flex-row-reverse",
      )}
    >
      <ScrollRevealContentPanel
        shouldReduceMotion={shouldReduceMotion}
        translateY={translateY}
        className="w-full md:w-[55%] md:max-w-xl"
      >
        <h3 className="font-serif text-2xl tracking-tight text-neutral-900 md:text-3xl">
          {panel.title}
        </h3>
        <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8">
          {panel.body}
        </p>
      </ScrollRevealContentPanel>

      <ScrollRevealImagePanel
        shouldReduceMotion={shouldReduceMotion}
        opacity={opacity}
        clipPath={clipPath}
        className={SCROLL_REVEAL_IMAGE_PANEL_CLASSNAME}
      >
        <Image
          src={panel.image.src}
          alt={panel.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
        />
      </ScrollRevealImagePanel>
    </div>
  );
}

/**
 * Residential / commercial split bands using the shared scroll-reveal
 * primitives from `scroll-reveal-split-panels.tsx`.
 */
export function FireAudiencePanels({
  heading,
  lead,
  panels,
}: FireAudiencePanelsProps) {
  return (
    <section className="bg-neutral-50 px-4 py-16 md:px-8 md:py-24 lg:py-32">
      <div className="mx-auto mb-14 max-w-3xl md:mb-20">
        <h2 className="font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl">
          {heading}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8">
          {lead}
        </p>
      </div>

      <div className="flex flex-col gap-16 md:gap-24">
        {panels.map((panel, index) => (
          <AudiencePanelRow key={panel.title} panel={panel} index={index} />
        ))}
      </div>
    </section>
  );
}
