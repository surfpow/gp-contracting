import {
  Accessibility,
  Building2,
  Droplets,
  Flame,
  Frame,
  Hammer,
  HardHat,
  Home,
  Layers,
  LayoutGrid,
  PlugZap,
  Shield,
  Store,
  Sun,
  TreePine,
  UtensilsCrossed,
  Warehouse,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { ServiceHeroIconName } from "@/lib/services-content";

/**
 * Single source of truth mapping semantic icon names (stored in content data)
 * to lucide components. Shared by `ServiceHero` and `ServiceLinkingCards` so
 * the hero and card grids stay visually consistent.
 */
export const serviceIcons: Record<ServiceHeroIconName, LucideIcon> = {
  home: Home,
  hammer: Hammer,
  building: Building2,
  warehouse: Warehouse,
  storefront: Store,
  restaurant: UtensilsCrossed,
  layers: Layers,
  frame: Frame,
  grid: LayoutGrid,
  plug: PlugZap,
  zap: Zap,
  accessibility: Accessibility,
  tree: TreePine,
  sun: Sun,
  wrench: Wrench,
  hardhat: HardHat,
  shield: Shield,
  flame: Flame,
  droplets: Droplets,
};
