import type { Metadata } from "next";

import { About } from "@/components/sections/about";
import { SitePageShell } from "@/components/site-page-shell";

export const metadata: Metadata = {
  title: "About | GP Contracting Group",
  description:
    "Learn about GP Contracting Group — family-owned construction across Greater Vancouver, Vancouver Island, and the Fraser Valley.",
};

export default function AboutPage() {
  return (
    <SitePageShell>
      <About />
    </SitePageShell>
  );
}
