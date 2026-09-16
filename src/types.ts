export type Tier = 'budget' | 'mid' | 'pro';

export type CategoryId =
  | 'drones'
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