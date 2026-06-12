import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

const GP_LOGO_URL =
  "https://vfqcqhylftsunnhxqysq.supabase.co/storage/v1/object/public/puzzle-bucket/GPlogo-removebg.png"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-brand-dark">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr] md:gap-8 lg:gap-16">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src={GP_LOGO_URL}
                alt="GP Contracting Group"
                width={160}
                height={42}
                className="h-auto w-[160px] brightness-0 invert"
              />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-neutral-400">
              Family-owned construction across Greater Vancouver, Vancouver
              Island, and the Fraser Valley — built with integrity since day
              one.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-sm tracking-wide text-neutral-200 uppercase">
              Navigation
            </h3>
            <nav className="mt-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-serif text-sm tracking-wide text-neutral-200 uppercase">
              Contact Info
            </h3>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=Richmond,BC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-navy-light" />
                  <span>Richmond, BC</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+17788919076"
                  className="group flex items-start gap-3 text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 size-4 shrink-0 text-brand-navy-light" />
                  <span>+1 (778) 891 9076</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@gpcontracting.ca"
                  className="group flex items-start gap-3 text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-brand-navy-light" />
                  <span>info@gpcontracting.ca</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs tracking-wide text-neutral-500">
            © {new Date().getFullYear()} GP Contracting Group. All rights
            reserved.
          </p>
          <p className="text-xs tracking-wide text-neutral-600">
            Built on a family legacy of doing what is right.
          </p>
        </div>
      </div>
    </footer>
  )
}
