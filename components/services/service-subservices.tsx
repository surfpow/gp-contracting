import Image from "next/image";
import { Check } from "lucide-react";

import type { ServiceSubService } from "@/lib/services-content";

type ServiceSubServicesProps = {
  subServices: ServiceSubService[];
};

function ServiceSubServiceRow({
  service,
  reverse,
}: {
  service: ServiceSubService;
  reverse: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-10 py-16 md:py-20 lg:items-center lg:gap-20 xl:gap-28 ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden lg:aspect-[3/4] lg:w-[42%]">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-cover"
        />
      </div>

      <div className="lg:flex-1">
        <h3 className="font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl">
          {service.name}
        </h3>
        <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8">
          {service.summary}
        </p>
        <ul className="mt-8 space-y-3">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <Check
                className="mt-0.5 size-5 shrink-0 text-brand-navy"
                aria-hidden="true"
              />
              <span className="text-sm leading-relaxed text-neutral-700 md:text-base">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ServiceSubServices({ subServices }: ServiceSubServicesProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-8 md:pb-24">
        <div className="mb-4 border-t border-neutral-200 pt-16 text-center md:mb-0 md:pt-20">
          <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
            What We Offer
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl">
            Services Included
          </h2>
        </div>

        <div className="divide-y divide-neutral-100">
          {subServices.map((service, index) => (
            <ServiceSubServiceRow
              key={service.name}
              service={service}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
