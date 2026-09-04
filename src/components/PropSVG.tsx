const SPOKES = 4;
const ANGLE = (Math.PI * 2) / SPOKES;
const BLADES = 10;
const R = 90;
const HUB = 14;

function blade(rot: number, span: number) {
  const pts: string[] = [];
  for (let i = 0; i <= BLADES; i++) {
    const a = rot + (i / BLADES) * Math.PI;
    const r = HUB + (span / BLADES) * i;
    pts.push(`${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`);
  }
  return pts.join(' ');
}

export default function PropSVG() {
  const arms = Array.from({ length: SPOKES }, (_, s) => s);
  return (
    <svg
      width="620"
      height="620"
      viewBox="-140 -140 280 280"
      fill="none"
      aria-hidden
    >
      {arms.map((s) => (
        <polygon
          key={s}
          points={blade(s * ANGLE, R - HUB)}
          transform={`rotate(${(s * 360) / SPOKES})`}
          stroke="var(--accent)"
          strokeWidth="0.7"
          fill="var(--accent-soft)"
        />
      ))}
      <circle
        cx="0"
        cy="0"
        r={HUB}
        stroke="var(--accent)"
        strokeWidth="1"
        fill="var(--accent-soft)"
      />
      <circle cx="0" cy="0" r="3.4" fill="var(--text-muted)" />
    </svg>
  );
}