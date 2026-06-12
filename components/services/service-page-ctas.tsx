import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ServicePageContent } from "@/lib/services-content";

const primaryButtonClass =
  "h-12 w-full rounded-sm border border-brand-navy bg-brand-navy px-7 text-sm font-medium tracking-wide text-white shadow-[0_10px_28px_-12px_rgba(45,52,112,0.65)] transition-all duration-300 hover:border-brand-dark hover:bg-brand-dark hover:shadow-[0_14px_32px_-12px_rgba(18,24,38,0.55)] sm:w-auto";

const outlineButtonClass =
  "h-12 w-full rounded-sm border-neutral-300 bg-white/60 px-7 text-sm font-medium tracking-wide text-neutral-700 backdrop-blur-sm transition-all duration-300 hover:border-brand-navy/40 hover:bg-white hover:text-brand-navy sm:w-auto";

type ServicePageCtasProps = {
  content: ServicePageContent;
};

export function ServicePageCtas({ content }: ServicePageCtasProps) {
  const showProjectsCta = Boolean(content.projectsHref && content.projectsCtaLabel);

  return (
    <section className="border-t border-neutral-200 bg-neutral-50 px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 sm:flex-row">
        {showProjectsCta && (
          <Button asChild className={primaryButtonClass}>
            <Link
              href={content.projectsHref!}
              className="group inline-flex items-center justify-center gap-2.5"
            >
              {content.projectsCtaLabel}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        )}
        <Button
          asChild
          variant={showProjectsCta ? "outline" : "default"}
          className={showProjectsCta ? outlineButtonClass : primaryButtonClass}
        >
          <Link
            href="/#contact"
            className="group inline-flex items-center justify-center gap-2.5"
          >
            Get a Quote
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
