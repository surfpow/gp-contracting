import { LogoCloud } from "@/components/ui/logo-cloud-2";

export function Partners() {
  return (
    <section className="relative px-4 pt-10 pb-24 md:py-32">
      <div className="relative mx-auto grid max-w-3xl">
        <h2 className="mb-6 text-center text-lg font-medium tracking-tight text-muted-foreground md:mb-10 md:text-2xl">
          Companies we{" "}
          <span className="font-semibold text-primary">collaborate</span> with.
        </h2>
        <LogoCloud />
      </div>
    </section>
  );
}
