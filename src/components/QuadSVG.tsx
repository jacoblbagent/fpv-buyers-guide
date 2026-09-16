const MOTOR_DIST = 66;
const MOTOR_R = 16;
const BODY = 15;
const HUB = 6;
const PROP_SPAN = 40;
const BLADES = 12;

function blade(rot: number, span: number) {
  const pts: string[] = [];
  for (let i = 0; i <= BLADES; i++) {
    const a = rot + (i / BLADES) * Math.PI;
    const r = HUB + (span / BLADES) * i;
    pts.push(`${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`);
  }
  return pts.join(' ');
}

const MOTORS: { x: number; y: number; dur: number; delay: string }[] = [
  { x: MOTOR_DIST, y: MOTOR_DIST, dur: 0.28, delay: '-0.00s' },
  { x: -MOTOR_DIST, y: MOTOR_DIST, dur: 0.3, delay: '-0.05s' },
  { x: MOTOR_DIST, y: -MOTOR_DIST, dur: 0.26, delay: '-0.02s' },
  { x: -MOTOR_DIST, y: -MOTOR_DIST, dur: 0.3, delay: '-0.08s' },
];

function Motor({ x, y, dur, delay }: { x: number; y: number; dur: number; delay: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <g>
        <polygon
          points={blade(0, PROP_SPAN)}
          stroke="var(--accent)"
          strokeWidth="0.7"
          fill="var(--accent-soft)"
        />
        <polygon
          points={blade(Math.PI, PROP_SPAN)}
          stroke="var(--accent)"
          strokeWidth="0.7"
          fill="var(--accent)"
          fillOpacity="0.28"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0"
          to="360"
          dur={`${dur}s`}
          begin={delay}
          repeatCount="indefinite"
        />
      </g>
      <circle
        r={MOTOR_R}
        stroke="var(--accent)"
        strokeWidth="1.4"
        fill="var(--bg-soft)"
      />
      <circle r="3.4" fill="var(--text-muted)" />
    </g>
  );
}

export default function QuadSVG() {
  return (
    <svg
      width="620"
      height="620"
      viewBox="-140 -140 280 280"
      fill="none"
      aria-hidden
    >
      {/* arms */}
      {MOTORS.map((m, i) => (
        <line
          key={`arm-${i}`}
          x1="0"
          y1="0"
          x2={m.x}
          y2={m.y}
          stroke="var(--border)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      ))}

      {/* motor + spinning props */}
      {MOTORS.map((m, i) => (
        <Motor key={`motor-${i}`} {...m} />
      ))}

      {/* central body */}
      <rect
        x={-BODY}
        y={-BODY}
        width={BODY * 2}
        height={BODY * 2}
        rx="6"
        stroke="var(--accent)"
        strokeWidth="1.4"
        fill="var(--accent-soft)"
      />
      <circle cx="0" cy="-5" r="4.4" fill="var(--text-muted)" />
      <rect
        x="-8"
        y="2"
        width="16"
        height="5"
        rx="2.4"
        fill="var(--surface-2)"
        stroke="var(--border)"
        strokeWidth="0.8"
      />
    </svg>
  );
}
