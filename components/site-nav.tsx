"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  OUR_WORK_NAV_LABEL,
  PROJECTS_HREF,
  SEE_RECENT_PROJECTS,
} from "@/lib/projects"
import { CONTACT_HREF } from "@/lib/contact"
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
  commercial: "Tenant improvements for offices, retail, and commercial spaces.",
  specialized:
    "Structural envelope, building systems, accessibility, and outdoor living.",
  "insurance-restoration":
    "Claims-funded rebuilds after fire, water, and storm damage.",
}

/** Sub-pages that should not appear in the header Services mega-menu. */
const navHiddenSubPageSlugs = new Set(["restaurant-bar-construction"])

/** Extra nav links per hub (not under /services/{hub}/{slug}). */
const supplementalNavSubPages: Partial<
  Record<ServiceHubSlug, { label: string; href: string }[]>
> = {
  commercial: [
    {
      label: "Tenant Improvements",
      href: servicePageHref("tenant-improvements"),
    },
  ],
}

/** Hubs that own sub-service pages, rendered as mega-menu columns. */
const hubsWithSubPages: ServiceHubSlug[] = [
  "residential",
  "commercial",
  "insurance-restoration",
  "specialized",
]

const serviceMenuColumns: ServiceMenuColumn[] = hubsWithSubPages.map((hub) => ({
  hub,
  label: serviceHubLabels[hub],
  href: servicePageHref(hub),
  blurb: hubBlurbs[hub],
  subPages: [
    ...(supplementalNavSubPages[hub] ?? []),
    ...serviceSubPages
      .filter((page) => page.parentHub === hub)
      .filter((page) => !navHiddenSubPageSlugs.has(page.slug))
      .map((page) => ({
        label: serviceSubPageLabels[page.slug],
        href: serviceSubPageHref(page.parentHub, page.slug),
      })),
  ],
}))

const featuredProjects = [SEE_RECENT_PROJECTS] as const

const mobileNavLinkClass =
  "flex min-h-11 w-full items-center px-5 py-3 text-[15px] font-medium text-neutral-900 transition-colors hover:bg-neutral-50 active:bg-neutral-100"

const mobileSubLinkClass =
  "flex min-h-10 w-full items-center border-l-2 border-transparent py-2 pl-8 pr-5 text-sm text-neutral-600 transition-colors hover:border-brand-navy/25 hover:bg-neutral-50 hover:text-neutral-900"

const mobileSectionLabelClass =
  "px-5 pt-5 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400 first:pt-4"

function MobileServiceHub({
  column,
  onNavigate,
}: {
  column: ServiceMenuColumn
  onNavigate: () => void
}) {
  const [open, setOpen] = React.useState(false)
  const panelId = `mobile-service-${column.hub}`

  return (
    <div className="border-t border-neutral-100">
      <button
        type="button"
        id={`${panelId}-trigger`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className="flex min-h-11 w-full items-center justify-between px-5 py-3 text-left text-[15px] font-medium text-neutral-900 transition-colors hover:bg-neutral-50 active:bg-neutral-100"
      >
        <span>{column.label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-neutral-400 motion-safe:transition-transform motion-safe:duration-200",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div id={panelId} role="region" aria-labelledby={`${panelId}-trigger`}>
          <Link
            href={column.href}
            onClick={onNavigate}
            className={mobileSubLinkClass}
          >
            Overview
          </Link>
          {column.subPages.map((subPage) => (
            <Link
              key={subPage.href}
              href={subPage.href}
              onClick={onNavigate}
              className={mobileSubLinkClass}
            >
              {subPage.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileNav() {
  const [open, setOpen] = React.useState(false)

  const close = () => setOpen(false)

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

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
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="fixed inset-0 top-[4.75rem] z-30 bg-neutral-900/20 backdrop-blur-[1px]"
          />
          <div className="fixed inset-x-0 top-[4.75rem] z-40 max-h-[calc(100dvh-4.75rem)] overflow-y-auto border-t border-neutral-200 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
            <nav className="pb-6">
              <p className={mobileSectionLabelClass}>Services</p>
              <Link
                href={SERVICES_OVERVIEW_HREF}
                onClick={close}
                className={mobileNavLinkClass}
              >
                All Services
              </Link>
              {serviceMenuColumns.map((column) => (
                <MobileServiceHub
                  key={column.hub}
                  column={column}
                  onNavigate={close}
                />
              ))}

              <p className={mobileSectionLabelClass}>Company</p>
              <Link href={PROJECTS_HREF} onClick={close} className={mobileNavLinkClass}>
                {OUR_WORK_NAV_LABEL}
              </Link>
              <Link href="/about" onClick={close} className={mobileNavLinkClass}>
                About
              </Link>
              <Link href={CONTACT_HREF} onClick={close} className={mobileNavLinkClass}>
                Contact
              </Link>
            </nav>
          </div>
        </>
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
              <div className="w-[1080px] max-w-[calc(100vw-2rem)] p-6">
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

                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 lg:grid-cols-4">
                  {serviceMenuColumns.map((column) => (
                    <ServiceMenuColumnList key={column.hub} column={column} />
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={navItemClass}>
              {OUR_WORK_NAV_LABEL}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[420px] max-w-[calc(100vw-2rem)] gap-3 p-6">
                {featuredProjects.map((project) => (
                  <ListItem
                    key={project.label}
                    title={project.label}
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
              <Link href="/about">About</Link>
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
