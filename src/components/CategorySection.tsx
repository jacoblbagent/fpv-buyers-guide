import { useMemo, useState } from 'react';
import type { Category, DroneClass, FPVProduct, Tier } from '../types';
import { DRONE_CLASSES, TIERS } from '../types';
import ProductCard from './ProductCard';
import { formatPrice } from '../format';

interface Props {
  category: Category;
  products: FPVProduct[];
}

function tierRange(products: FPVProduct[], t: Tier): string | null {
  const prices = products
    .filter((p) => p.tier === t && p.price != null)
    .map((p) => p.price as number);
  if (prices.length === 0) return null;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? formatPrice(min) : `${formatPrice(min)}–${formatPrice(max)}`;
}

export default function CategorySection({ category, products }: Props) {
  const [tier, setTier] = useState<Tier | 'all'>('all');
  const [droneClass, setDroneClass] = useState<DroneClass | 'all'>('all');

  const inTier = useMemo(
    () => (tier === 'all' ? products : products.filter((p) => p.tier === tier)),
    [products, tier],
  );

  // Only offer airframe types that exist inside the current budget band, so
  // combining the two filters can never land you on an empty grid.
  const classes = useMemo(
    () =>
      DRONE_CLASSES.map((c) => ({
        ...c,
        count: inTier.filter((p) => p.droneClass === c.id).length,
      })).filter((c) => c.count > 0),
    [inTier],
  );

  // A class that isn't available in the new tier silently falls back to All.
  const activeClass = classes.some((c) => c.id === droneClass) ? droneClass : 'all';
  const shown =
    activeClass === 'all' ? inTier : inTier.filter((p) => p.droneClass === activeClass);

  return (
    <section id={category.id} className="section">
      <div className="wrap">
        <header className="section__head">
          <div>
            <p className="eyebrow">{String(category.id).toUpperCase()}</p>
            <h2>{category.label}</h2>
            <p className="section__blurb">{category.blurb}</p>
          </div>
          <div className="filters">
            <div className="tiers" role="group" aria-label="Filter by budget">
              <button
                type="button"
                className={tier === 'all' ? 'is-active' : ''}
                onClick={() => setTier('all')}
              >
                <span className="tiers__label">All</span>
                <span className="tiers__range">{products.length}</span>
              </button>
              {/* Tiers with nothing in them would be a dead end — skip them. */}
              {TIERS.filter((t) => products.some((p) => p.tier === t.id)).map((t) => {
                const range = tierRange(products, t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={tier === t.id ? 'is-active' : ''}
                    onClick={() => setTier(t.id)}
                    title={range ? `${t.label} range: ${range}` : t.label}
                  >
                    <span className="tiers__label">{t.label}</span>
                    {range ? <span className="tiers__range">{range}</span> : null}
                  </button>
                );
              })}
            </div>
            {classes.length > 1 ? (
              <div
                className="tiers tiers--class"
                role="group"
                aria-label="Filter by drone type"
              >
                <button
                  type="button"
                  className={activeClass === 'all' ? 'is-active' : ''}
                  onClick={() => setDroneClass('all')}
                >
                  <span className="tiers__label">All types</span>
                  <span className="tiers__range">{inTier.length}</span>
                </button>
                {classes.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={activeClass === c.id ? 'is-active' : ''}
                    onClick={() => setDroneClass(c.id)}
                    title={c.hint}
                  >
                    <span className="tiers__label">{c.label}</span>
                    <span className="tiers__range">{c.count}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        {shown.length === 0 ? (
          <p className="section__empty">No picks in this range yet.</p>
        ) : (
          <div className="grid">
            {shown.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
