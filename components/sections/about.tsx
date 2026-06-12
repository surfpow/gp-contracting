"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "200+", label: "Projects Completed" },
  { value: "3", label: "Regions Served" },
  { value: "100%", label: "Family Owned" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="about"
      className="relative bg-brand-dark px-4 py-24 md:px-8 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          custom={0}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="font-serif text-4xl leading-tight tracking-tight text-neutral-50 md:text-5xl lg:text-6xl"
        >
          Building Trust.
          <br />
          Building Better Spaces.
        </motion.h2>

        <motion.p
          custom={0.15}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mt-10 max-w-3xl text-base leading-relaxed text-neutral-400 md:mt-12 md:text-lg md:leading-8"
        >
          GP Contracting Group is a family-owned construction company serving
          Greater Vancouver, Vancouver Island, and the Fraser Valley. We
          specialize in custom homes, commercial spaces, renovations, kitchens,
          bathrooms, and roofing — delivered with true craftsmanship and a
          transparent, honest process. From the initial plan to the final
          walkthrough, we treat every project as if we were building for our own
          family.
        </motion.p>

        <div className="mt-16 grid grid-cols-2 gap-10 md:mt-20 md:grid-cols-4 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              custom={0.3 + index * 0.1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="text-center md:text-left"
            >
              <div className="font-serif text-4xl tracking-tight text-neutral-50 md:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm tracking-wide text-neutral-500 uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          custom={0.75}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mt-16 md:mt-20"
        >
          <Link
            href="#"
            className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-neutral-300 transition-colors hover:text-brand-navy-light"
          >
            Our Story
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
