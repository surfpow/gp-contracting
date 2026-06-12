"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const navItemClass = cn(
  navigationMenuTriggerStyle(),
  "h-11 bg-transparent px-5 text-base font-medium text-neutral-900 shadow-none",
  "[text-shadow:_0_0_1px_rgba(255,255,255,1),_0_0_6px_rgba(255,255,255,0.9),_0_1px_2px_rgba(0,0,0,0.15)]",
  "hover:bg-black/5 hover:text-neutral-900 focus:bg-black/5 data-[state=open]:bg-black/5",
  "data-[active]:bg-black/5"
)

const serviceLinks = [
  { title: "Custom Homes", href: "/#services-residential" },
  { title: "Commercial", href: "/#services-commercial" },
  { title: "Tenant Improvements", href: "/#services-tenant-improvements" },
]

const featuredProjects: { title: string; href: string; description: string }[] =
  [
    {
      title: "Custom Home Build",
      href: "#",
      description: "Luxury residential construction in Greater Vancouver.",
    },
    {
      title: "Restaurant Build",
      href: "#",
      description: "Full commercial build-out for dining and hospitality.",
    },
    {
      title: "Multi-Family Development",
      href: "#",
      description: "Multi-unit residential projects from framing to finish.",
    },
    {
      title: "Fitness Facility",
      href: "#",
      description: "Commercial gym and wellness space construction.",
    },
    {
      title: "Kitchen Remodel",
      href: "#",
      description: "High-end kitchen renovations with modern finishes.",
    },
    {
      title: "Commercial Renovation",
      href: "#",
      description: "Office and retail space transformations.",
    },
  ]

function MobileNav() {
  const [open, setOpen] = React.useState(false)

  const close = () => setOpen(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/50 bg-white/55 text-neutral-900 shadow-[0_2px_16px_rgba(0,0,0,0.08)] backdrop-blur-lg"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-[4.75rem] z-40 max-h-[calc(100vh-4.75rem)] overflow-y-auto border-t border-border bg-white/95 backdrop-blur-lg shadow-lg">
          <nav className="flex flex-col">
            <div className="border-b border-border/60">
              <Link
                href="#services"
                onClick={close}
                className="block px-6 py-4 text-base font-semibold text-neutral-900"
              >
                Services
              </Link>
              {serviceLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={close}
                  className="block px-10 py-3 text-sm text-neutral-600 hover:bg-muted"
                >
                  {link.title}
                </Link>
              ))}
            </div>

            <div className="border-b border-border/60">
              <span className="block px-6 py-4 text-base font-semibold text-neutral-900">
                Projects
              </span>
              {featuredProjects.map((project) => (
                <Link
                  key={project.title}
                  href={project.href}
                  onClick={close}
                  className="block px-10 py-3 text-sm text-neutral-600 hover:bg-muted"
                >
                  {project.title}
                </Link>
              ))}
            </div>

            <Link
              href="#about"
              onClick={close}
              className="border-b border-border/60 px-6 py-4 text-base font-semibold text-neutral-900 hover:bg-muted"
            >
              About
            </Link>
            <Link
              href="#"
              onClick={close}
              className="px-6 py-4 text-base font-semibold text-neutral-900 hover:bg-muted"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}

function DesktopNav() {
  return (
    <div className="hidden rounded-2xl border border-white/50 bg-white/55 px-1 py-0.5 shadow-[0_2px_16px_rgba(0,0,0,0.08)] backdrop-blur-lg backdrop-saturate-150 md:block">
      <NavigationMenu className="max-w-none flex-none">
        <NavigationMenuList className="gap-2 sm:gap-4">
          <NavigationMenuItem>
            <NavigationMenuTrigger className={navItemClass}>
              Services
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[640px] max-w-[calc(100vw-2rem)] gap-3 p-6 lg:grid-cols-[240px_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        GP Contracting Group
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Precision, craftsmanship, and integrity across every
                        project in Greater Vancouver.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/#services-residential" title="Custom Homes">
                  Residential builds rooted in family values and quality.
                </ListItem>
                <ListItem href="/#services-commercial" title="Commercial">
                  Offices, retail, and industrial spaces done right.
                </ListItem>
                <ListItem href="/#services-tenant-improvements" title="Tenant Improvements">
                  Restaurant, retail, and commercial build-outs.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={navItemClass}>
              Projects
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[680px] max-w-[calc(100vw-2rem)] gap-3 p-6 md:grid-cols-2">
                {featuredProjects.map((project) => (
                  <ListItem
                    key={project.title}
                    title={project.title}
                    href={project.href}
                  >
                    {project.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navItemClass}>
              <Link href="#about">About</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navItemClass}>
              <Link href="#">Contact</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export function SiteNav() {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
