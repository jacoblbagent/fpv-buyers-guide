export function formatPrice(p: number | null): string {
  if (p === null) return '—';
  return p >= 1000 ? `$${p.toLocaleString('en-US')}` : `$${p}`;
}