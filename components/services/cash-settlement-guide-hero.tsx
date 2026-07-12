"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { serviceIcons } from "@/components/services/service-icons";
import { SectionPhotoBackdrop } from "@/components/services/section-photo-backdrop";
import { servicePrimaryButtonClass, serviceCtaArrowClass } from "@/components/services/service-page-ctas";
import { Button } from "@/components/ui/button";
import { DURATION_MARKETING_S, EASE_OUT } from "@/lib/motion";
import type { ServiceHeroIconName, ServiceImage } from "@/lib/services-content";

export type GuideHeroProps = {
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
  const transition = reduced
    ? { duration: 0 }
    : { duration: DURATION_MARKETING_S + 0.05, ease: EASE_OUT };

  const fadeUp: Variants = {
    hidden: { opacity: 0, transform: "translateY(16px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition,
    },
  };

  return {
    fadeUp,
    stagger: {
      hidden: {},
      visible: { transition: { staggerChildren: reduced ? 0 : 0.09 } },
    },
  };
}

/**
 * Editorial guide hero: full-bleed photo + dark scrim, typographic-forward.
 */
export function CashSettlementGuideHero({
  eyebrow,
  eyebrowHref,
  heading,
  subheading,
  ctaLabel,
  ctaHref,
  icon = "shield",
  image,
}: GuideHeroProps) {
  const reduced = useReducedMotion() ?? false;
  const variants = makeHeroVariants(reduced);
  const TextureIcon = serviceIcons[icon];

  return (
    <section className="relative overflow-hidden bg-brand-dark px-4 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24 lg:pb-28">
      {image ? (
        // PLACEHOLDER: swap image.src for real GP photo
        <SectionPhotoBackdrop image={image} priority scrim="left" />
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute inset-x-0 bottom-0 h-[44%] bg-brand-navy/25 [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[26%] bg-brand-navy/20 [clip-path:polygon(100%_0,100%_100%,38%_100%)]" />
          <TextureIcon
            strokeWidth={0.75}
            className="absolute -right-16 -bottom-16 size-[20rem] text-brand-navy-light opacity-[0.07] md:-right-20 md:-bottom-20 md:size-[28rem] lg:-right-12 lg:size-[32rem]"
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
            className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium tracking-widest text-brand-navy-light uppercase transition-colors duration-150 [transition-timing-function:var(--ease-out)] hover:border-white/25 hover:bg-white/10"
          >
            <TextureIcon className="size-3.5" aria-hidden="true" />
            {eyebrow}
          </Link>
        </motion.div>

        <motion.h1
          variants={variants.fadeUp}
          className="mt-8 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-neutral-50 md:text-5xl lg:text-6xl"
        >
          {heading}
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
