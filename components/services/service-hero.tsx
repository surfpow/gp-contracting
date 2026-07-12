"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { serviceIcons } from "@/components/services/service-icons";
import { servicePrimaryButtonClass } from "@/components/services/service-page-ctas";
import { Button } from "@/components/ui/button";
import { DURATION_MARKETING_S, EASE_OUT } from "@/lib/motion";
import type { ServiceHeroIconName, ServiceImage } from "@/lib/services-content";

const heroIcons = serviceIcons;

/** Small icon badge hinting at one bundled service on combined pages. */
export type ServiceHeroScopeBadge = {
  icon: ServiceHeroIconName;
  label: string;
  /** In-page anchor (e.g. "#roofing") for the matching bundled section. */
  href?: string;
};

export type ServiceHeroCta = {
  label: string;
  href: string;
};

export type ServiceHeroProps = {
  heading: string;
  subheading: string;
  image?: ServiceImage;
  eyebrow?: string;
  /** Smaller qualifier line rendered inside the h1 (e.g. service-area suffix). */
  headingSuffix?: string;
  /**
   * Contextual service icon. Shown inside the eyebrow badge, and — on heroes
   * without an image — as a large low-opacity background texture.
   */
  icon?: ServiceHeroIconName;
  /** Combined-page badges (one per bundled service), rendered beside the eyebrow. */
  scopeBadges?: ServiceHeroScopeBadge[];
  /** Optional primary CTA rendered under the subheading. */
  cta?: ServiceHeroCta;
};

const EASE = EASE_OUT;

/**
 * Entrance variants for the hero copy. When the user prefers reduced motion
 * every transition collapses to zero duration and zero offset, so content
 * renders in its final state immediately on hydration. Keeping the `hidden`
 * state identical on server and client (instead of toggling `initial`) avoids
 * hydration mismatches, since `useReducedMotion()` is unknowable during SSR.
 */
type HeroVariants = {
  fadeUp: Variants;
  fadeUpWithChildren: Variants;
  stagger: Variants;
};

function makeHeroVariants(reduced: boolean): HeroVariants {
  const transition = reduced
    ? { duration: 0 }
    : { duration: DURATION_MARKETING_S + 0.05, ease: EASE };

  // The hidden state is intentionally the same for both modes (it only
  // affects pre-hydration markup, where content is invisible either way).
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
    // Same fade as `fadeUp`, but cascades nested motion children (the
    // location qualifier inside the h1) slightly after the heading itself.
    fadeUpWithChildren: {
      hidden: fadeUp.hidden,
      visible: {
        opacity: 1,
        transform: "translateY(0px)",
        transition: { ...transition, delayChildren: reduced ? 0 : 0.12 },
      },
    },
    stagger: {
      hidden: {},
      visible: { transition: { staggerChildren: reduced ? 0 : 0.09 } },
    },
  };
}

/**
 * Decorative angled bands echoing the brand's roofline/diagonal motif, plus an
 * optional oversized line-icon texture for heroes without a photo. Purely
 * presentational — kept behind the content and well below text contrast
 * thresholds (see contrast notes in the section styles).
 */
function HeroBackdrop({ icon }: { icon?: ServiceHeroIconName }) {
  const TextureIcon = icon ? heroIcons[icon] : undefined;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-x-0 bottom-0 h-[44%] bg-brand-navy/25 [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[26%] bg-brand-navy/20 [clip-path:polygon(100%_0,100%_100%,38%_100%)]" />
      {TextureIcon && (
        <TextureIcon
          strokeWidth={0.75}
          className="absolute -right-16 -bottom-16 size-[20rem] text-brand-navy-light opacity-[0.07] md:-right-20 md:-bottom-20 md:size-[28rem] lg:-right-12 lg:size-[32rem]"
        />
      )}
    </div>
  );
}

function HeroBadges({
  eyebrow,
  icon,
  scopeBadges,
  variants,
}: {
  eyebrow: string;
  icon?: ServiceHeroIconName;
  scopeBadges?: ServiceHeroScopeBadge[];
  variants: Variants;
}) {
  const EyebrowIcon = heroIcons[icon ?? "hardhat"];

  return (
    <motion.div
      variants={variants}
      className="flex flex-wrap items-center gap-x-2.5 gap-y-2"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-brand-navy-light/35 bg-brand-navy/30 px-3.5 py-1.5 text-xs font-medium tracking-[0.18em] text-brand-navy-light uppercase">
        <EyebrowIcon aria-hidden="true" className="size-3.5 shrink-0" />
        {eyebrow}
      </span>
      {scopeBadges?.map((badge) => {
        const BadgeIcon = heroIcons[badge.icon];
        const badgeClassName =
          "inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-50/[0.04] px-3 py-1.5 text-xs font-medium tracking-wide text-neutral-300";

        return badge.href ? (
          <a
            key={badge.label}
            href={badge.href}
            className={`${badgeClassName} transition-colors hover:border-brand-navy-light/60 hover:text-neutral-50`}
          >
            <BadgeIcon aria-hidden="true" className="size-3.5 shrink-0" />
            {badge.label}
          </a>
        ) : (
          <span key={badge.label} className={badgeClassName}>
            <BadgeIcon aria-hidden="true" className="size-3.5 shrink-0" />
            {badge.label}
          </span>
        );
      })}
    </motion.div>
  );
}

function HeroHeading({
  heading,
  headingSuffix,
  className,
  variants,
}: {
  heading: string;
  headingSuffix?: string;
  className: string;
  variants: HeroVariants;
}) {
  return (
    <motion.h1 variants={variants.fadeUpWithChildren} className={className}>
      {heading}
      {headingSuffix && (
        <motion.span
          variants={variants.fadeUp}
          className="mt-5 block font-serif text-xl leading-snug font-normal tracking-normal text-neutral-400 italic md:mt-6 md:text-2xl"
        >
          {headingSuffix}
        </motion.span>
      )}
    </motion.h1>
  );
}

function HeroCta({
  cta,
  variants,
}: {
  cta: ServiceHeroCta;
  variants: Variants;
}) {
  return (
    <motion.div variants={variants} className="mt-8 md:mt-10">
      <Button asChild className={servicePrimaryButtonClass}>
        <Link
          href={cta.href}
          className="group inline-flex items-center justify-center gap-2.5"
        >
          {cta.label}
          <ArrowRight className="size-4 transition-transform duration-150 [transition-timing-function:var(--ease-out)] group-hover:translate-x-0.5" />
        </Link>
      </Button>
    </motion.div>
  );
}

export function ServiceHero({
  heading,
  subheading,
  image,
  eyebrow = "Services",
  headingSuffix,
  icon,
  scopeBadges,
  cta,
}: ServiceHeroProps) {
  const reducedMotion = useReducedMotion();
  const variants = makeHeroVariants(reducedMotion ?? false);

  if (!image) {
    return (
      <section className="relative overflow-hidden bg-brand-dark px-4 pt-52 pb-20 md:px-8 md:pt-48 md:pb-28 lg:pb-32">
        <HeroBackdrop icon={icon} />
        <motion.div
          variants={variants.stagger}
          initial="hidden"
          animate="visible"
          className="relative mx-auto max-w-6xl"
        >
          <HeroBadges
            eyebrow={eyebrow}
            icon={icon}
            scopeBadges={scopeBadges}
            variants={variants.fadeUp}
          />
          <motion.div
            variants={variants.fadeUp}
            className="mt-4 h-px w-12 bg-brand-navy-light/60"
            aria-hidden="true"
          />
          <HeroHeading
            heading={heading}
            headingSuffix={headingSuffix}
            variants={variants}
            className="mt-8 max-w-4xl font-serif text-4xl leading-tight tracking-tight text-neutral-50 md:text-6xl lg:text-7xl"
          />
          <motion.p
            variants={variants.fadeUp}
            className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-300 md:mt-10 md:text-lg md:leading-8"
          >
            {subheading}
          </motion.p>
          {cta && <HeroCta cta={cta} variants={variants.fadeUp} />}
          <motion.div
            variants={variants.fadeUp}
            className="mt-14 h-px w-full bg-neutral-700/60 md:mt-20"
            aria-hidden="true"
          />
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-brand-dark px-4 pt-52 pb-16 md:px-8 md:pt-44 md:pb-24 lg:pb-32">
      <HeroBackdrop />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-24">
        <motion.div
          variants={variants.stagger}
          initial="hidden"
          animate="visible"
          className="lg:w-[48%]"
        >
          <HeroBadges
            eyebrow={eyebrow}
            icon={icon}
            scopeBadges={scopeBadges}
            variants={variants.fadeUp}
          />
          <motion.div
            variants={variants.fadeUp}
            className="mt-4 h-px w-12 bg-brand-navy-light/60"
            aria-hidden="true"
          />
          <HeroHeading
            heading={heading}
            headingSuffix={headingSuffix}
            variants={variants}
            className="mt-6 font-serif text-4xl leading-tight tracking-tight text-neutral-50 md:text-5xl lg:text-6xl"
          />
          <motion.p
            variants={variants.fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-neutral-300 md:mt-8 md:text-lg md:leading-8"
          >
            {subheading}
          </motion.p>
          {cta && <HeroCta cta={cta} variants={variants.fadeUp} />}
        </motion.div>

        {/* Angled leading edge echoes the diagonal motif of the backdrop bands.
            The image and text columns never overlap (stacked on mobile,
            side-by-side from lg), so no legibility overlay is needed. */}
        <div className="relative aspect-[4/3] w-full overflow-hidden [clip-path:polygon(0_2.5rem,100%_0,100%_100%,0_100%)] lg:aspect-[3/4] lg:w-[52%] lg:[clip-path:polygon(4.5rem_0,100%_0,100%_100%,0_100%)]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
