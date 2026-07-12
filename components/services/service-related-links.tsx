import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import {
  serviceHubLabels,
  servicePageHref,
  type ServiceHubSlug,
} from "@/lib/service-sections";
import { SEE_RECENT_PROJECTS } from "@/lib/projects";
import type { ServiceLinkingCard } from "@/lib/services-content";

export type ServiceRelatedLinksProps = {
  parentHub: ServiceHubSlug;
  related: ServiceLinkingCard[];
  /** Omit for quote-only pages (specialized hub policy). */
  projectsHref?: string;
  /**
   * `editorial` = flagship link rhythm. Default `standard` keeps the
   * original treatment for all non-opted-in pages.
   */
  variant?: "standard" | "editorial";
};

/**
 * Text-only cross-linking block (no images — sub-page image budget is spent
 * on the optional hero): sibling sub-services, back-to-hub, and an optional
 * projects down-link.
 */
export function ServiceRelatedLinks({
  parentHub,
  related,
  projectsHref,
  variant = "standard",
}: ServiceRelatedLinksProps) {
  const hubLabel = serviceHubLabels[parentHub];
  const isEditorial = variant === "editorial";

  if (!isEditorial) {
    return (
      <section className="bg-white px-4 py-16 md:px-8 md:py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
            Keep Exploring
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl">
            Related {hubLabel} Services
          </h2>

          {related.length > 0 && (
            <ul className="mt-10 md:mt-12">
              {related.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="group flex items-center justify-between gap-6 border-t border-neutral-200 py-6 transition-colors hover:bg-neutral-50 md:py-8"
                  >
                    <span>
                      <span className="block font-serif text-xl tracking-tight text-neutral-900 transition-colors group-hover:text-brand-navy md:text-2xl">
                        {service.name}
                      </span>
                      <span className="mt-2 block max-w-xl text-sm leading-relaxed text-neutral-500 md:text-base">
                        {service.blurb}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-5 shrink-0 text-brand-navy transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 flex flex-col gap-4 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-12">
            <Link
              href={servicePageHref(parentHub)}
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-neutral-600 transition-colors hover:text-brand-navy"
            >
              <ArrowLeft
                className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              Back to {hubLabel} Services
            </Link>

            {projectsHref && (
              <Link
                href={projectsHref}
                className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-brand-navy transition-colors hover:text-brand-dark"
              >
                {SEE_RECENT_PROJECTS.label}
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-4 py-20 md:px-8 md:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
          Keep Exploring
        </p>
        <h2 className="mt-4 font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl lg:text-[2.75rem] lg:leading-tight">
          Related {hubLabel} Services
        </h2>

        {related.length > 0 && (
          <ul className="mt-12 md:mt-14">
            {related.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="group flex items-center justify-between gap-6 border-t border-neutral-200 py-7 transition-colors duration-150 [transition-timing-function:var(--ease-out)] hover:bg-neutral-50 motion-safe:active:scale-[0.97] motion-safe:transition-[colors,transform] md:py-9"
                >
                  <span>
                    <span className="block font-serif text-xl tracking-tight text-neutral-900 transition-colors duration-150 [transition-timing-function:var(--ease-out)] group-hover:text-brand-navy md:text-[1.65rem] md:leading-snug">
                      {service.name}
                    </span>
                    <span className="mt-2 block max-w-xl text-sm leading-relaxed text-neutral-500 md:text-base md:leading-7">
                      {service.blurb}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-brand-navy transition-transform duration-150 [transition-timing-function:var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 flex flex-col gap-4 border-t border-neutral-200 pt-9 sm:flex-row sm:items-center sm:justify-between md:mt-14">
          <Link
            href={servicePageHref(parentHub)}
            className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-neutral-600 transition-colors duration-150 [transition-timing-function:var(--ease-out)] hover:text-brand-navy"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-150 [transition-timing-function:var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            Back to {hubLabel} Services
          </Link>

          {projectsHref && (
            <Link
              href={projectsHref}
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-brand-navy transition-colors duration-150 [transition-timing-function:var(--ease-out)] hover:text-brand-dark"
            >
              {SEE_RECENT_PROJECTS.label}
              <ArrowRight
                className="size-4 transition-transform duration-150 [transition-timing-function:var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
