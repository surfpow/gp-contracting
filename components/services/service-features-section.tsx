import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ServiceImage, ServiceProcessStep } from "@/lib/services-content";

function autoNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

type ServiceFeatureStepsProps = {
  steps: ServiceProcessStep[];
  className?: string;
};

/**
 * Numbered step / feature grid shared by the page-level features section and
 * combined-page bundled sections. Steps whose `title` is just the auto-number
 * (seeded from migrated bullets) render as numbered statements; steps with a
 * real title render as titled feature cells.
 */
export function ServiceFeatureSteps({ steps, className }: ServiceFeatureStepsProps) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10",
        className,
      )}
    >
      {steps.map((step, index) => {
        const hasTitle = step.title !== autoNumber(index);

        return (
          <div
            key={`${step.title}-${step.description}`}
            className="border-t-2 border-brand-navy/20 pt-6"
          >
            <span className="text-sm font-medium tabular-nums text-neutral-400">
              {autoNumber(index)}
            </span>
            {hasTitle && (
              <h3 className="mt-2 font-serif text-xl tracking-tight text-neutral-900 md:text-2xl">
                {step.title}
              </h3>
            )}
            <p
              className={
                hasTitle
                  ? "mt-3 text-base leading-relaxed text-neutral-600"
                  : "mt-3 text-base leading-relaxed text-neutral-700 md:text-lg md:leading-8"
              }
            >
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export type ServiceFeaturesSectionProps = {
  steps: ServiceProcessStep[];
  eyebrow?: string;
  heading?: string;
  image?: ServiceImage;
};

export function ServiceFeaturesSection({
  steps,
  eyebrow = "Scope of Work",
  heading = "What's Included",
  image,
}: ServiceFeaturesSectionProps) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl">
            {heading}
          </h2>
        </div>

        <ServiceFeatureSteps steps={steps} className="mt-14 md:mt-16" />

        {image && (
          <div className="relative mt-14 aspect-[3/4] w-full overflow-hidden md:mt-16 md:aspect-[16/10]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
