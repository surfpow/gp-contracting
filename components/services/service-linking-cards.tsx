import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { serviceIcons } from "@/components/services/service-icons";
import { cn } from "@/lib/utils";
import type { ServiceLinkingCard } from "@/lib/services-content";

type ServiceLinkingCardsProps = {
  cards: ServiceLinkingCard[];
  heading?: string;
  eyebrow?: string;
  /** Column count at the widest breakpoint. Use 4 for the services overview. */
  columns?: 3 | 4;
};

export function ServiceLinkingCards({
  cards,
  heading = "Explore Our Services",
  eyebrow = "What We Offer",
  columns = 3,
}: ServiceLinkingCardsProps) {
  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl">
            {heading}
          </h2>
        </div>

        <ul
          className={cn(
            "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-10",
            columns === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3",
          )}
        >
          {cards.map((card) => {
            const Icon = serviceIcons[card.icon];

            return (
              <li key={card.href}>
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition duration-300 hover:border-brand-navy hover:shadow-lg">
                  {card.image && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={card.image.src}
                        alt={card.image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col px-6 py-8 md:px-8 md:py-9">
                    <span
                      className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-navy/10 text-brand-navy transition-colors group-hover:bg-brand-navy group-hover:text-white"
                      aria-hidden="true"
                    >
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-5 font-serif text-2xl tracking-tight text-neutral-900 md:text-[1.65rem]">
                      {card.name}
                    </h3>
                    <p className="mt-4 flex-1 text-base leading-relaxed text-neutral-600">
                      {card.blurb}
                    </p>
                    <Link
                      href={card.href}
                      className="mt-8 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-brand-navy transition-colors group-hover:text-brand-dark"
                    >
                      Learn More
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
