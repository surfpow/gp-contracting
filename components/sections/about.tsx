import { ClaimsPartnersBand } from "@/components/about/claims-partners-band";
import { CredentialsSection } from "@/components/about/credentials-section";
import { WarrantyBand } from "@/components/about/warranty-band";
import AboutSection3 from "@/components/ui/about-section";
import { AboutLocation } from "@/components/sections/about-location";
import { ScrollToHash } from "@/components/scroll-to-hash";

export function About() {
  return (
    <>
      <ScrollToHash />
      <AboutSection3 />
      <CredentialsSection />
      <ClaimsPartnersBand />
      {/* Stable hash target for nav → /about#warranty (clears fixed mobile logo). */}
      <div id="warranty" className="scroll-mt-52 md:scroll-mt-36">
        <WarrantyBand />
      </div>
      <AboutLocation />
    </>
  );
}
