import { useState } from 'react';
import type { Category, FPVProduct, Tier } from '../types';
import { TIERS } from '../types';
import ProductCard from './ProductCard';

interface Props {
  category: Category;
  products: FPVProduct[];
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
            {TIERS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={tier === t.id ? 'is-active' : ''}
                onClick={() => setTier(t.id)}
              >
                {t.label}
              </button>
            ))}
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