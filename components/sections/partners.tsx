import { LogoCloud } from "@/components/ui/logo-cloud-2";

export function Partners() {
  return (
    <section className="relative px-4 pt-16 pb-24 md:py-32">
      <div className="relative mx-auto grid max-w-4xl">
        <h2 className="mb-10 text-center font-serif text-3xl tracking-tight text-balance text-neutral-900 md:mb-16 md:text-5xl">
          Companies we{" "}
          <span className="text-primary italic">collaborate</span> with.
        </h2>
        <LogoCloud />
      </div>
    </section>
  );
}
