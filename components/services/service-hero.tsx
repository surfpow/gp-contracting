import Image from "next/image";

import type { ServiceImage } from "@/lib/services-content";

export type ServiceHeroProps = {
  heading: string;
  subheading: string;
  image: ServiceImage;
};

export function ServiceHero({ heading, subheading, image }: ServiceHeroProps) {
  return (
    <section className="bg-brand-dark px-4 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24 lg:pb-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-24">
        <div className="lg:w-[48%]">
          <p className="text-sm font-medium tracking-widest text-brand-navy-light uppercase">
            Services
          </p>
          <div className="mt-4 h-px w-12 bg-brand-navy-light/60" aria-hidden="true" />
          <h1 className="mt-6 font-serif text-4xl leading-tight tracking-tight text-neutral-50 md:text-5xl lg:text-6xl">
            {heading}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-300 md:mt-8 md:text-lg md:leading-8">
            {subheading}
          </p>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[3/4] lg:w-[52%]">
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
