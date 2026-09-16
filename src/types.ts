export type Tier = 'budget' | 'mid' | 'pro';

/** Airframe family — the duct/wheelbase class that decides how a quad flies. */
export type DroneClass =
  | 'tiny-whoop'
  | 'cinewhoop'
  | '3-inch'
  | '4-inch'
  | '5-inch'
  | '7-inch';

export type CategoryId =
  | 'drones'
  | 'bundles'
  | 'goggles'
  | 'radios'
  | 'batteries'
  | 'chargers'
  | 'props'
  | 'tools';

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
}

export interface FPVProduct {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  tier: Tier;
  /** Only set on drones and bundles — drives the type filter. */
  droneClass?: DroneClass;
  price: number | null; // USD; null when not listed
  url: string; // retailer product page
  note: string; // terse why-buy line
  image?: string;
}

export const TIERS: { id: Tier; label: string }[] = [
  { id: 'budget', label: 'Budget' },
  { id: 'mid', label: 'Mid' },
  { id: 'pro', label: 'Pro' },
];

export const DRONE_CLASSES: { id: DroneClass; label: string; hint: string }[] = [
  { id: 'tiny-whoop', label: 'Tiny Whoop', hint: '65–85mm ducted, 1–2S — fly it indoors' },
  { id: 'cinewhoop', label: 'Cinewhoop', hint: 'Ducted 2–3.5" built for smooth video' },
  { id: '3-inch', label: '3"', hint: '3–3.5" micro freestyle and park flyers' },
  { id: '4-inch', label: '4"', hint: 'Sub-250g long range cruisers' },
  { id: '5-inch', label: '5"', hint: 'The freestyle standard' },
  { id: '7-inch', label: '7"', hint: 'Long range and heavy lift' },
];
