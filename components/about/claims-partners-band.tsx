"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { LogoCloud } from "@/components/ui/logo-cloud-2";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";

const CLAIMS_PARTNER_LOGOS = [
  {
    src: "/images/partners/definity.png",
    alt: "Definity",
    width: 200,
    height: 60,
    imgClassName:
      "h-8 w-auto max-w-[180px] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-10 md:max-w-[220px]",
  },
  {
    src: "/images/partners/coast-claims.png",
    alt: "Coast Claims Insurance Services",
    width: 220,
    height: 80,
    imgClassName:
      "h-10 w-auto max-w-[200px] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-12 md:max-w-[240px]",
  },
] as const;

function makeRevealVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
    };
  }

  return {
    hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * STAGGER_MARKETING_S,
        duration: DURATION_MARKETING_S,
        ease: EASE_OUT,
      },
    }),
  };
}

export function ClaimsPartnersBand() {
  const reducedMotion = useReducedMotion() ?? false;
  const variants = makeRevealVariants(reducedMotion);

  return (
    <section className="bg-neutral-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={variants}
          className="text-center"
        >
          <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
            Claims Coordination
          </p>
          <h2 className="mt-3 font-serif text-2xl tracking-tight text-neutral-900 md:text-3xl">
            Working alongside BC&apos;s insurers and adjusters
          </h2>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={variants}
          className="mt-10 md:mt-12"
        >
          <LogoCloud logos={[...CLAIMS_PARTNER_LOGOS]} />
        </motion.div>

        <motion.p
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={variants}
          className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-neutral-600 md:mt-10 md:text-base md:leading-7"
        >
          On claims-funded projects we coordinate scope, documentation, and
          approvals directly with insurance carriers such as Definity and
          independent adjusting firms such as Coast Claims, so owners are not
          left translating between their insurer and their contractor.
        </motion.p>
      </div>
    </section>
  );
}
