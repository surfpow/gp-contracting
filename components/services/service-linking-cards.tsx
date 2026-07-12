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
  /** Section background. Pass `neutral` when the prior section is already white. */
  background?: "white" | "neutral";
};

export function ServiceLinkingCards({
  cards,
  heading = "Explore Our Services",
  eyebrow = "What We Offer",
  columns = 3,
  background = "white",
}: ServiceLinkingCardsProps) {
  return (
    <section
      className={cn(
        "px-4 py-16 md:px-8 md:py-24 lg:py-32",
        background === "neutral" ? "bg-neutral-50" : "bg-white",
      )}
    >
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
            "grid grid-cols-1 gap-8 lg:gap-10",
            cards.length === 1
              ? "mx-auto max-w-5xl"
              : cn(
                  "sm:grid-cols-2",
                  columns === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3",
                ),
          )}
        >
          {cards.map((card) => {
            const Icon = serviceIcons[card.icon];
            const isFeatured = cards.length === 1;

            return (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className={cn(
                    "group flex h-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_1px_0_rgba(18,24,38,0.04)] transition-[transform,border-color,box-shadow] duration-200 [transition-timing-function:var(--ease-out)] hover:border-brand-navy/50 hover:shadow-[0_18px_40px_-24px_rgba(45,52,112,0.35)] active:scale-[0.99]",
                    isFeatured ? "flex-col md:flex-row" : "flex-col",
                  )}
                >
                  {card.image && (
                    <div
                      className={cn(
                        "relative w-full overflow-hidden",
                        isFeatured
                          ? "aspect-[4/3] md:aspect-auto md:w-[46%] md:min-h-[300px] lg:min-h-[340px]"
                          : "aspect-[4/3]",
                      )}
                    >
                      <Image
                        src={card.image.src}
                        alt={card.image.alt}
                        fill
                        sizes={
                          isFeatured
                            ? "(max-width: 768px) 100vw, 560px"
                            : "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        }
                        className="object-cover transition-transform duration-200 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.03]"
                      />
                    </div>
                  )}

                  <div
                    className={cn(
                      "flex flex-1 flex-col px-6 py-8 md:px-8 md:py-9",
                      isFeatured && "md:justify-center md:py-10 lg:px-10 lg:py-12",
                    )}
                  >
                    <span
                      className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-navy/10 text-brand-navy transition-colors duration-200 [transition-timing-function:var(--ease-out)] group-hover:bg-brand-navy group-hover:text-white"
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
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-brand-navy transition-colors duration-200 [transition-timing-function:var(--ease-out)] group-hover:text-brand-dark">
                      Learn More
                      <ArrowRight className="size-4 transition-transform duration-150 [transition-timing-function:var(--ease-out)] group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
