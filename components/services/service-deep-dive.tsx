import { Check } from "lucide-react";

import type { ServiceDeepDive } from "@/lib/services-content";

type ServiceDeepDiveSectionProps = {
  deepDive: ServiceDeepDive;
};

export function ServiceDeepDiveSection({ deepDive }: ServiceDeepDiveSectionProps) {
  return (
    <>
      {/* Focus areas */}
      <section className="bg-white px-4 py-16 md:px-8 md:py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 max-w-3xl">
            <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
              Focus Areas
            </p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl">
              How We Approach Every Build-Out
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8">
              {deepDive.intro}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-16 md:gap-10">
            {deepDive.focusAreas.map((area, index) => (
              <div
                key={area.title}
                className="border-t-2 border-brand-navy/20 pt-6"
              >
                <span className="text-sm font-medium tabular-nums text-neutral-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-serif text-xl tracking-tight text-neutral-900 md:text-2xl">
                  {area.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project contexts */}
      <section className="bg-brand-dark px-4 py-16 md:px-8 md:py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 md:mb-14">
            <p className="text-sm font-medium tracking-widest text-brand-navy-light uppercase">
              Project Types
            </p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight text-neutral-50 md:text-4xl">
              Where We Work
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {deepDive.projectContexts.map((context) => (
              <div
                key={context.title}
                className="border border-neutral-700 px-8 py-8 md:px-10 md:py-10"
              >
                <h3 className="font-serif text-xl tracking-tight text-neutral-50 md:text-2xl">
                  {context.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-400 md:leading-8">
                  {context.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes + process notes */}
      {(deepDive.outcomes || deepDive.processNotes) && (
        <section className="bg-neutral-50 px-4 py-16 md:px-8 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            {deepDive.outcomes && (
              <div>
                <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
                  What You Get
                </p>
                <h3 className="mt-4 font-serif text-2xl tracking-tight text-neutral-900 md:text-3xl">
                  Outcomes
                </h3>
                <ul className="mt-8 space-y-4">
                  {deepDive.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 size-5 shrink-0 text-brand-navy"
                        aria-hidden="true"
                      />
                      <span className="text-base leading-relaxed text-neutral-700">
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {deepDive.processNotes && (
              <div>
                <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
                  Our Process
                </p>
                <h3 className="mt-4 font-serif text-2xl tracking-tight text-neutral-900 md:text-3xl">
                  How We Work
                </h3>
                <ul className="mt-8 space-y-4">
                  {deepDive.processNotes.map((note) => (
                    <li key={note} className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 size-5 shrink-0 text-brand-navy"
                        aria-hidden="true"
                      />
                      <span className="text-base leading-relaxed text-neutral-700">
                        {note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
