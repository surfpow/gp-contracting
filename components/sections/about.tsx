import { ClaimsPartnersBand } from "@/components/about/claims-partners-band";
import { CredentialsSection } from "@/components/about/credentials-section";
import { WarrantyBand } from "@/components/about/warranty-band";
import AboutSection3 from "@/components/ui/about-section";
import { AboutLocation } from "@/components/sections/about-location";

export function About() {
  return (
    <>
      <AboutSection3 />
      <CredentialsSection />
      <ClaimsPartnersBand />
      <WarrantyBand />
      <AboutLocation />
    </>
  );
}
