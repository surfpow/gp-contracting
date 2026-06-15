"use client";

import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

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
              <span className="animate-spin text-red-500">✱</span>
              <TimelineContent
                as="span"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-sm font-medium text-gray-600"
              >
                WHO I AM
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
              className="flex gap-4"
            >
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-base">
                <span className="font-bold text-red-500">10+</span>
                <span className="text-gray-600">years of experience</span>
                <span className="text-gray-300">|</span>
              </div>
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-base">
                <span className="font-bold text-red-500">3 million</span>
                <span className="text-gray-600">words</span>
              </div>
            </TimelineContent>
            <div className="bottom-16 right-0 flex flex-row-reverse gap-4 lg:absolute lg:flex-col lg:gap-0">
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-2 flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl"
              >
                <span className="font-semibold text-red-500">100+</span>
                <span className="uppercase text-gray-600">brands</span>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={7}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-2 flex items-center gap-2 text-xs sm:text-base"
              >
                <span className="font-bold text-red-500">30%</span>
                <span className="text-gray-600">higher engagement</span>
                <span className="block text-gray-300 lg:hidden">|</span>
              </TimelineContent>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="mb-8 text-2xl font-semibold !leading-[110%] text-gray-900 sm:text-4xl md:text-5xl">
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
                Crafting Words That Make a Difference.
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
                className="text-xs sm:text-base"
              >
                <p className="text-justify leading-relaxed">
                  My journey began as a passionate writer and evolved into a
                  strategic copywriting career. I specialize in transforming
                  ideas into compelling content that helps brands grow.
                </p>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-xs sm:text-base"
              >
                <p className="text-justify leading-relaxed">
                  Every brand has a story, and I specialize in telling yours
                  with clarity and impact. By blending creativity with strategy,
                  I write content that resonates with audiences.
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
                className="mb-2 text-2xl font-bold text-red-500"
              >
                SANGVI
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={13}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-8 text-sm text-gray-600"
              >
                Copywriter | Content Strategist
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={14}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-6"
              >
                <p className="mb-4 font-medium text-gray-900">
                  Ready to transform your brand&apos;s message into results?
                </p>
              </TimelineContent>

              <TimelineContent
                as="button"
                animationNum={15}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="ml-auto flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-5 py-3 font-semibold text-white shadow-lg shadow-neutral-900 transition-all duration-300 ease-in-out hover:gap-4 hover:bg-neutral-950"
              >
                LET&apos;S COLLABORATE <ArrowRight className="" />
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
