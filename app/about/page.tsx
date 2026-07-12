import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { About } from "@/components/sections/about";
import { SitePageShell } from "@/components/site-page-shell";
import { buildAboutPageSchema } from "@/lib/service-schema";

export const metadata: Metadata = {
  title: "About | GP Contracting Group",
  description:
    "Learn about GP Contracting Group — family-owned construction across Greater Vancouver, Vancouver Island, and the Fraser Valley.",
};

export default function AboutPage() {
  return (
    <SitePageShell>
      <JsonLd data={buildAboutPageSchema()} />
      <About />
    </SitePageShell>
  );
}
