"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { serviceIcons } from "@/components/services/service-icons";
import { SectionPhotoBackdrop } from "@/components/services/section-photo-backdrop";
import {
  servicePrimaryButtonClass,
  serviceCtaArrowClass,
} from "@/components/services/service-page-ctas";
import { Button } from "@/components/ui/button";
import { DURATION_MARKETING_S, EASE_OUT, STAGGER_MARKETING_S } from "@/lib/motion";
import type { ServiceHeroIconName, ServiceImage } from "@/lib/services-content";

export type StrategicUpgradesHeroProps = {
  eyebrow: string;
  eyebrowHref: string;
  heading: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
  icon?: ServiceHeroIconName;
  /** Full-bleed section background. Placeholder illustrative photo; swap for real GP work. */
  image?: ServiceImage;
};

type HeroVariants = {
  fadeUp: Variants;
  stagger: Variants;
};

function makeHeroVariants(reduced: boolean): HeroVariants {
  if (reduced) {
    return {
      fadeUp: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.2 },
        },
      },
      stagger: {
        hidden: {},
        visible: { transition: { staggerChildren: 0 } },
      },
    };
  }

  const fadeUp: Variants = {
    hidden: { opacity: 0, transform: "translateY(16px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: { duration: DURATION_MARKETING_S + 0.05, ease: EASE_OUT },
    },
  };

  return {
    fadeUp,
    stagger: {
      hidden: {},
      visible: { transition: { staggerChildren: STAGGER_MARKETING_S } },
    },
  };
}

/**
 * Strategy-guide hero: split-line H1 (question vs. question), text eyebrow
 * instead of a pill, full-bleed photo. Distinct from the sibling guide heroes.
 */
export function StrategicUpgradesHero({
  eyebrow,
  eyebrowHref,
  heading,
  subheading,
  ctaLabel,
  ctaHref,
  icon = "shield",
  image,
}: StrategicUpgradesHeroProps) {
  const reduced = useReducedMotion() ?? false;
  const variants = makeHeroVariants(reduced);
  const TextureIcon = serviceIcons[icon];

  const commaIndex = heading.indexOf(",");
  const firstLine =
    commaIndex >= 0 ? heading.slice(0, commaIndex + 1) : heading;
  const secondLine =
    commaIndex >= 0 ? heading.slice(commaIndex + 1).trim() : null;

  return (
    <section className="relative overflow-hidden bg-brand-dark px-4 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24 lg:pb-28">
      {image ? (
        // PLACEHOLDER: placeholder-strategic-hero-bath.png - swap for real GP photo
        <SectionPhotoBackdrop image={image} priority scrim="left" />
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute inset-x-0 bottom-0 h-[44%] bg-brand-navy/25 [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
          <TextureIcon
            strokeWidth={0.75}
            className="absolute -right-16 -bottom-16 size-[20rem] text-brand-navy-light opacity-[0.07] md:size-[28rem]"
          />
        </div>
      )}

      <motion.div
        className="relative mx-auto max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={variants.stagger}
      >
        <motion.div variants={variants.fadeUp}>
          <Link
            href={eyebrowHref}
            className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.18em] text-brand-navy-light uppercase transition-colors duration-150 [transition-timing-function:var(--ease-out)] hover:text-neutral-50"
          >
            <span
              aria-hidden="true"
              className="h-px w-8 bg-brand-navy-light/70"
            />
            {eyebrow}
          </Link>
        </motion.div>

        <motion.h1
          variants={variants.fadeUp}
          className="mt-8 max-w-3xl font-serif tracking-tight text-neutral-50"
        >
          <span className="block text-3xl leading-[1.15] text-neutral-300 md:text-4xl lg:text-5xl">
            {firstLine}
          </span>
          {secondLine ? (
            <span className="mt-2 block text-4xl leading-[1.1] md:mt-3 md:text-5xl lg:text-6xl">
              {secondLine}
            </span>
          ) : null}
        </motion.h1>

        <motion.p
          variants={variants.fadeUp}
          className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-200 md:text-lg md:leading-8"
        >
          {subheading}
        </motion.p>

        <motion.div variants={variants.fadeUp} className="mt-10">
          <Button asChild className={servicePrimaryButtonClass}>
            <Link
              href={ctaHref}
              className="group inline-flex items-center justify-center gap-2.5"
            >
              {ctaLabel}
              <ArrowRight className={serviceCtaArrowClass} />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
