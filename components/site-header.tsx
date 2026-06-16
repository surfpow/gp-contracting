import Image from "next/image";
import Link from "next/link";

import { SiteNav } from "@/components/site-nav";

const GP_LOGO_URL =
  "https://vfqcqhylftsunnhxqysq.supabase.co/storage/v1/object/public/puzzle-bucket/GPlogo-removebg.png";

export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-between px-4 py-4 md:px-8">
      <Link href="/" className="pointer-events-auto shrink-0">
        <Image
          src={GP_LOGO_URL}
          alt="GP Contracting Group"
          width={140}
          height={36}
          className="h-auto w-[180px] md:w-[140px]"
          priority
        />
      </Link>
      <div className="pointer-events-auto">
        <SiteNav />
      </div>
    </header>
  );
}
