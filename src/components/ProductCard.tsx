import type { FPVProduct } from '../types';
import { formatPrice } from '../format';

interface Props {
  product: FPVProduct;
}

export default function ProductCard({ product }: Props) {
  return (
    <a className="card" href={product.url} target="_blank" rel="noreferrer">
      <div className="card__media">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <span className="card__placeholder">{product.brand}</span>
        )}
      </div>
      <div className="card__body">
        <p className="card__brand">{product.brand}</p>
        <h3 className="card__name">{product.name}</h3>
        <p className="card__note">{product.note}</p>
        <div className="card__foot">
          <span className="card__price">{formatPrice(product.price)}</span>
          <span className="card__buy">
            See it <span aria-hidden>&rarr;</span>
          </span>
        </div>
      </div>
    </a>
  );
}