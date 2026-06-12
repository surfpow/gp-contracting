import { SitePageShell } from "@/components/site-page-shell";
import type { ServicePageContent } from "@/lib/services-content";

export type ServicePageLayoutProps = {
  content: ServicePageContent;
};

export function ServicePageLayout({ content }: ServicePageLayoutProps) {
  return (
    <SitePageShell>
      <div className="flex flex-1 flex-col bg-brand-dark px-4 py-24 md:py-32">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="text-sm font-medium tracking-widest text-brand-navy-light uppercase">
            Services
          </p>
          <h1 className="mt-4 font-serif text-4xl tracking-tight text-neutral-50 md:text-5xl">
            {content.heroHeading}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-neutral-300 md:text-lg">
            {content.heroSubheading}
          </p>
        </div>

        <div className="mx-auto mt-12 w-full max-w-3xl space-y-6 text-center">
          {content.overview.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-relaxed text-neutral-400 md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </SitePageShell>
  );
}
