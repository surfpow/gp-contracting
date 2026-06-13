"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  serviceHubLabels,
  servicePageHref,
  serviceSubPageHref,
  serviceSubPageLabels,
  serviceSubPages,
  type ServiceHubSlug,
} from "@/lib/service-sections"
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

const SERVICES_OVERVIEW_HREF = "/services"

type ServiceMenuColumn = {
  hub: ServiceHubSlug
  label: string
  href: string
  blurb: string
  subPages: { label: string; href: string }[]
}

const hubBlurbs: Record<ServiceHubSlug, string> = {
  residential: "Custom homes, renovations, and multi-family development.",
  commercial: "Offices, retail, and restaurant & bar construction.",
  specialized: "Structural, building systems, accessibility, and outdoor living.",
}

/** Hubs that own sub-service pages, rendered as mega-menu columns. */
const hubsWithSubPages: ServiceHubSlug[] = [
  "residential",
  "commercial",
  "specialized",
]

const serviceMenuColumns: ServiceMenuColumn[] = hubsWithSubPages.map((hub) => ({
  hub,
  label: serviceHubLabels[hub],
  href: servicePageHref(hub),
  blurb: hubBlurbs[hub],
  subPages: serviceSubPages
    .filter((page) => page.parentHub === hub)
    .map((page) => ({
      label: serviceSubPageLabels[page.slug],
      href: serviceSubPageHref(page.parentHub, page.slug),
    })),
}))

const TENANT_IMPROVEMENTS = {
  label: "Tenant Improvements",
  href: servicePageHref("tenant-improvements"),
  blurb: "Office and retail tenant build-outs, ready for business.",
} as const

const featuredProjects: { title: string; href: string; description: string }[] =
  [
    {
      title: "Custom Home Build",
      href: "/projects/residential",
      description: "Luxury residential construction in Greater Vancouver.",
    },
    {
      title: "Restaurant Build",
      href: "/projects/tenant-improvements",
      description: "Full commercial build-out for dining and hospitality.",
    },
    {
      title: "Multi-Family Development",
      href: "/projects/residential",
      description: "Multi-unit residential projects from framing to finish.",
    },
    {
      title: "Fitness Facility",
      href: "/projects/tenant-improvements",
      description: "Commercial gym and wellness space construction.",
    },
    {
      title: "Kitchen Remodel",
      href: "/projects/residential",
      description: "High-end kitchen renovations with modern finishes.",
    },
    {
      title: "Commercial Renovation",
      href: "/projects/commercial",
      description: "Office and retail space transformations.",
    },
  ]

function MobileServiceHub({
  column,
  onNavigate,
}: {
  column: ServiceMenuColumn
  onNavigate: () => void
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="border-b border-border/40 last:border-b-0">
      <div className="flex items-center">
        <Link
          href={column.href}
          onClick={onNavigate}
          className="flex-1 px-10 py-3 text-sm font-medium text-neutral-700 hover:bg-muted"
        >
          {column.label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={
            open
              ? `Collapse ${column.label} services`
              : `Expand ${column.label} services`
          }
          className="flex h-10 w-12 items-center justify-center text-neutral-500 hover:text-neutral-900"
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 motion-safe:transition-transform motion-safe:duration-200",
              open && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>
      </div>
      {open && (
        <ul className="pb-2">
          {column.subPages.map((subPage) => (
            <li key={subPage.href}>
              <Link
                href={subPage.href}
                onClick={onNavigate}
                className="block px-14 py-2.5 text-sm text-neutral-500 hover:bg-muted hover:text-neutral-900"
              >
                {subPage.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

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
                href={SERVICES_OVERVIEW_HREF}
                onClick={close}
                className="block px-6 py-4 text-base font-semibold text-neutral-900 hover:bg-muted"
              >
                Services
              </Link>
              {serviceMenuColumns.map((column) => (
                <MobileServiceHub
                  key={column.hub}
                  column={column}
                  onNavigate={close}
                />
              ))}
              <Link
                href={TENANT_IMPROVEMENTS.href}
                onClick={close}
                className="block px-10 py-3 text-sm font-medium text-neutral-700 hover:bg-muted"
              >
                {TENANT_IMPROVEMENTS.label}
              </Link>
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
              href="#contact"
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

function ServiceMenuColumnList({ column }: { column: ServiceMenuColumn }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={column.href}
          className="block rounded-md px-3 py-2 text-sm font-semibold text-neutral-900 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          {column.label}
        </Link>
      </NavigationMenuLink>
      <ul className="mt-1">
        {column.subPages.map((subPage) => (
          <li key={subPage.href}>
            <NavigationMenuLink asChild>
              <Link
                href={subPage.href}
                className="block rounded-md px-3 py-2 text-sm leading-snug text-muted-foreground no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                {subPage.label}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </li>
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
              <div className="w-[820px] max-w-[calc(100vw-2rem)] p-6">
                <NavigationMenuLink asChild>
                  <Link
                    href={SERVICES_OVERVIEW_HREF}
                    className="group flex items-center justify-between rounded-md bg-gradient-to-b from-muted/50 to-muted px-4 py-3 no-underline outline-none focus:shadow-md"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-neutral-900">
                        All Services
                      </span>
                      <span className="mt-0.5 block text-sm leading-tight text-muted-foreground">
                        Explore the full range of GP Contracting Group services.
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-4 text-neutral-400 transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </Link>
                </NavigationMenuLink>

                <ul className="mt-4 grid grid-cols-4 gap-x-4 gap-y-1">
                  {serviceMenuColumns.map((column) => (
                    <ServiceMenuColumnList key={column.hub} column={column} />
                  ))}
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href={TENANT_IMPROVEMENTS.href}
                        className="block rounded-md px-3 py-2 text-sm font-semibold text-neutral-900 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        {TENANT_IMPROVEMENTS.label}
                      </Link>
                    </NavigationMenuLink>
                    <p className="mt-1 px-3 text-sm leading-snug text-muted-foreground">
                      {TENANT_IMPROVEMENTS.blurb}
                    </p>
                  </li>
                </ul>
              </div>
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
              <Link href="#contact">Contact</Link>
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
