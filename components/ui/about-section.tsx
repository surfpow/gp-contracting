"use client";

import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { Button } from "@/components/ui/button";
import { servicePrimaryButtonClass } from "@/components/services/service-page-ctas";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const GP_LOGO_URL =
  "https://vfqcqhylftsunnhxqysq.supabase.co/storage/v1/object/public/puzzle-bucket/GPlogo-removebg.png";

export default function AboutSection3() {
  const heroRef = useRef<HTMLDivElement>(null);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };
  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };
  return (
    <section className="bg-[#f9f9f9] px-4 pt-28 pb-8 md:px-8 md:pt-36 md:pb-12 lg:pt-40" ref={heroRef}>
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <div className="absolute top-0 z-10 mb-8 flex w-[85%] items-center justify-between lg:top-4">
            <div className="flex items-center gap-2 text-xl">
              <Image
                src={GP_LOGO_URL}
                alt=""
                width={24}
                height={24}
                className="h-6 w-auto shrink-0"
              />
              <TimelineContent
                as="span"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-sm font-medium text-gray-600"
              >
                WHO WE ARE
              </TimelineContent>
            </div>
            <div className="flex gap-4">
              <TimelineContent
                as="a"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-gray-100 sm:h-6 sm:w-6 md:h-8 md:w-8"
              >
                <img
                  src="https://pro-section.ui-layouts.com/facebook.svg"
                  alt="fb"
                  width={24}
                  height={24}
                />
              </TimelineContent>
              <TimelineContent
                as="a"
                animationNum={1}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-gray-100 sm:h-6 sm:w-6 md:h-8 md:w-8"
              >
                <img
                  src="https://pro-section.ui-layouts.com/instagram.svg"
                  alt="insta"
                  width={24}
                  height={24}
                />
              </TimelineContent>
              <TimelineContent
                as="a"
                animationNum={2}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.linkedin.com/naymur-rahman"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-gray-100 sm:h-6 sm:w-6 md:h-8 md:w-8"
              >
                <img
                  src="https://pro-section.ui-layouts.com/linkedin.svg"
                  alt="linkedin"
                  width={24}
                  height={24}
                />
              </TimelineContent>
              <TimelineContent
                as="a"
                animationNum={3}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.youtube.com/naymurweb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-gray-100 sm:h-6 sm:w-6 md:h-8 md:w-8"
              >
                <img
                  src="https://pro-section.ui-layouts.com/youtube.svg"
                  alt="youtube"
                  width={24}
                  height={24}
                />
              </TimelineContent>
            </div>
          </div>

          <TimelineContent
            as="figure"
            animationNum={4}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            className="group relative"
          >
            <svg className="w-full" width="100%" height="100%" viewBox="0 0 100 40">
              <defs>
                <clipPath id="clip-inverted" clipPathUnits="objectBoundingBox">
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#clip-inverted)"
                preserveAspectRatio="xMidYMid slice"
                width="100%"
                height="100%"
                href="https://images.unsplash.com/photo-1718601980986-0ce75101d52d?w=1200&auto=format&fit=crop"
              />
            </svg>
          </TimelineContent>

          <div className="flex flex-wrap items-center justify-between py-3 text-sm lg:justify-start">
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="mb-2 text-xs text-gray-600 sm:text-base"
            >
              Custom Homes · Renovations · Commercial · Tenant Improvements ·
              Specialized Trades
            </TimelineContent>
            <div className="bottom-16 right-0 flex flex-row-reverse gap-4 lg:absolute lg:flex-col lg:gap-0">
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-2 text-2xl font-semibold text-brand-navy sm:text-3xl lg:text-4xl"
              >
                One Standard
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={7}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-2 text-xs text-gray-600 sm:text-base"
              >
                Every Project
              </TimelineContent>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="mb-8 text-2xl font-semibold !leading-[1.2] text-gray-900 sm:text-4xl md:text-5xl">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                reverse={true}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 3,
                }}
              >
                Building Excellence, Rooted in Family Values.
              </VerticalCutReveal>
            </h1>

            <TimelineContent
              as="div"
              animationNum={9}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid gap-8 text-gray-600 md:grid-cols-2"
            >
              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="space-y-4 text-xs sm:text-base"
              >
                <p className="text-justify leading-relaxed">
                  GP Contracting Group LTD stands at the forefront of
                  construction excellence in the Greater Vancouver area, built on
                  the foundation of family values and a legacy of integrity and
                  honesty passed down from our grandparents. Their unwavering
                  commitment to doing what is right continues to inspire
                  everything we do.
                </p>
                <p className="text-justify leading-relaxed">
                  What sets us apart is not just our forward-thinking approach
                  to construction, but the deep sense of trust and transparency
                  we foster in every project. We believe in open communication,
                  honesty, and delivering results that exceed expectations while
                  staying true to our values.
                </p>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="space-y-4 text-xs sm:text-base"
              >
                <p className="text-justify leading-relaxed">
                  Our team of skilled professionals approaches each project as
                  if it were for our own family, with meticulous attention to
                  detail and a commitment to excellence. By combining expertise,
                  innovation, and a dedication to craftsmanship, we create spaces
                  that reflect the dreams and aspirations of our clients while
                  upholding the highest standards of quality.
                </p>
                <p className="text-justify leading-relaxed">
                  At GP Contracting, we honor our family&apos;s legacy by
                  treating every client like part of our extended family—building
                  trust, transforming spaces, and creating lasting relationships
                  along the way.
                </p>
              </TimelineContent>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="text-right">
              <TimelineContent
                as="div"
                animationNum={12}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-2 text-2xl font-bold text-brand-navy"
              >
                PJ Saini
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={13}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-8 text-sm text-gray-600"
              >
                Owner & Principal
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={14}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-6"
              >
                <p className="mb-4 text-sm leading-relaxed text-neutral-600 md:text-base">
                  Ready to discuss your next project?
                </p>
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={15}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="ml-auto w-fit"
              >
                <Button asChild className={servicePrimaryButtonClass}>
                  <Link
                    href="/#contact"
                    className="group inline-flex items-center justify-center gap-2.5"
                  >
                    Get A Free Consultation
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
