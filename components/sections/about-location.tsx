"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

import { AboutCallbackForm } from "@/components/sections/about-callback-form";
import {
  Map,
  MapControls,
  MapMarker,
  MapPopup,
  MarkerContent,
} from "@/components/ui/map";
import {
  GP_OFFICE_ADDRESS,
  GP_OFFICE_COORDINATES,
  GP_OFFICE_MAPS_URL,
} from "@/lib/business-location";

export function AboutLocation() {
  const { longitude, latitude } = GP_OFFICE_COORDINATES;

  return (
    <section
      id="contact"
      className="scroll-mt-28 bg-[#f9f9f9] px-4 py-16 md:scroll-mt-32 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
            Our Location
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-gray-900 md:text-4xl">
            Visit GP Contracting Group
          </h2>
          <p className="mt-4 text-sm text-neutral-600 md:text-base">
            {GP_OFFICE_ADDRESS.full}
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-2 md:items-stretch md:gap-10">
          <div className="h-[420px] overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm md:h-auto md:min-h-[480px]">
            <Map center={[longitude, latitude]} zoom={15} theme="light">
              <MapMarker longitude={longitude} latitude={latitude}>
                <MarkerContent>
                  <div className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-brand-navy text-white shadow-lg">
                    <MapPin className="size-5" aria-hidden="true" />
                  </div>
                </MarkerContent>
              </MapMarker>
              <MapPopup longitude={longitude} latitude={latitude} offset={28}>
                <div className="min-w-48 rounded-md border border-neutral-200 bg-white p-3 shadow-sm">
                  <p className="text-sm font-semibold text-neutral-900">
                    {GP_OFFICE_ADDRESS.line1}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">
                    {GP_OFFICE_ADDRESS.line2}
                  </p>
                  <Link
                    href={GP_OFFICE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex text-sm font-medium text-brand-navy transition-colors hover:text-brand-dark"
                  >
                    Get directions
                  </Link>
                </div>
              </MapPopup>
              <MapControls showZoom position="bottom-right" />
            </Map>
          </div>

          <AboutCallbackForm />
        </div>
      </div>
    </section>
  );
}
