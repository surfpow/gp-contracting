import { Footer } from "@/components/sections/footer";
import { SiteHeader } from "@/components/site-header";

export function SitePageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-screen flex-col">{children}</main>
      <Footer />
    </>
  );
}
