import { useState } from 'react';
import type { Category, FPVProduct, Tier } from '../types';
import { TIERS } from '../types';
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
  const shown =
    tier === 'all' ? products : products.filter((p) => p.tier === tier);

  return (
    <section id={category.id} className="section">
      <div className="wrap">
        <header className="section__head">
          <div>
            <p className="eyebrow">{String(category.id).toUpperCase()}</p>
            <h2>{category.label}</h2>
            <p className="section__blurb">{category.blurb}</p>
          </div>
          <div className="tiers" role="group" aria-label="Filter by budget">
            <button
              type="button"
              className={tier === 'all' ? 'is-active' : ''}
              onClick={() => setTier('all')}
            >
              All
            </button>
            {TIERS.map((t) => {
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
                  {range ? (
                    <span className="tiers__range">{range}</span>
                  ) : null}
                </button>
              );
            })}
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