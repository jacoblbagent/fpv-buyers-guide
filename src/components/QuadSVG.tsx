// Hero quadcopter. Geometry only — every motion lives in CSS (main.scss)
// so hover "throttle up" can retime without restarting the animation.
const MOTOR_DIST = 66;
const MOTOR_R = 15;
const BODY = 15;
const HUB = 7;
const TIP = 40; // prop radius

// Slim airfoil-ish blade, drawn pointing +x from the hub out to the tip.
const BLADE = 'M7 0 C15 -4.4 27 -5.4 40 -1.4 L40 1.4 C27 5.4 15 4.4 7 0 Z';
const BLADE_COUNT = 3; // tri-blade — what FPV quads actually fly

type MotorSpec = {
  x: number;
  y: number;
  reverse: boolean; // real quads counter-rotate adjacent props
  wash: number; // seconds per prop-wash pulse
};

// every prop turns at the same rate; only the wash rings are de-synced a little
const SPIN = 0.3;

const MOTORS: MotorSpec[] = [
  { x: MOTOR_DIST, y: -MOTOR_DIST, reverse: false, wash: 1.5 },
  { x: -MOTOR_DIST, y: -MOTOR_DIST, reverse: true, wash: 1.62 },
  { x: MOTOR_DIST, y: MOTOR_DIST, reverse: true, wash: 1.56 },
  { x: -MOTOR_DIST, y: MOTOR_DIST, reverse: false, wash: 1.7 },
];

function Rotor({ x, y, reverse, wash }: MotorSpec) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* prop wash, pushed down and outward — duration via var so hover can retime it */}
      <circle className="wash" r="30" style={{ '--wash': `${wash}s` } as React.CSSProperties} />

      {/* rotor diameter outline + spin-blur disc */}
      <circle className="rotor__ring" r={TIP} />
      <circle className="rotor__disc" r={TIP - 1.5} />

      {/* motor can (under the props) */}
      <circle className="motor" r={MOTOR_R} />
      <circle className="motor__cap" r="4.4" />

      {/* counter-rotating tri-blade props */}
      <g
        className="rotor__blades"
        style={{
          '--spin': `${SPIN}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        } as React.CSSProperties}
      >
        {Array.from({ length: BLADE_COUNT }, (_, b) => (
          <path
            key={b}
            className="rotor__blade"
            d={BLADE}
            transform={`rotate(${(360 / BLADE_COUNT) * b})`}
            style={{ fillOpacity: 0.26 - b * 0.07 }}
          />
        ))}
      </g>

      {/* prop nut on top */}
      <circle className="rotor__hub" r={HUB} />
      <circle className="rotor__hubdot" r="2.4" />
    </g>
  );
}

export default function QuadSVG() {
  return (
    <svg className="quad" viewBox="-150 -150 300 300" fill="none" aria-hidden>
      <defs>
        {/* strongest at the tips, where blade speed is highest */}
        <radialGradient id="quadRotor" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.055 }} />
          <stop offset="48%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.085 }} />
          <stop offset="82%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.17 }} />
          <stop offset="100%" style={{ stopColor: 'var(--accent)', stopOpacity: 0 }} />
        </radialGradient>
        {/* soft light pool — gradient, not a blur filter: filters clip to a box */}
        <radialGradient id="quadPool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.2 }} />
          <stop offset="42%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.1 }} />
          <stop offset="74%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.03 }} />
          <stop offset="100%" style={{ stopColor: 'var(--accent)', stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* soft light pool that breathes as the quad changes altitude */}
      <ellipse className="quad__pool" cx="0" cy="4" rx="112" ry="102" />

      <g className="quad__float">
        {/* arms: muted structural line over a faint accent core */}
        {MOTORS.map((m, i) => (
          <line
            key={`arm-${i}`}
            className="arm"
            x1="0"
            y1="0"
            x2={m.x}
            y2={m.y}
          />
        ))}
        {MOTORS.map((m, i) => (
          <line
            key={`arm-core-${i}`}
            className="arm__core"
            x1="0"
            y1="0"
            x2={m.x}
            y2={m.y}
          />
        ))}

        {MOTORS.map((m, i) => (
          <Rotor key={`rotor-${i}`} {...m} />
        ))}

        {/* central stack */}
        <rect className="body" x={-BODY} y={-BODY} width={BODY * 2} height={BODY * 2} rx="5" />
        <circle className="body__cam" cx="0" cy="-5.5" r="4.8" />
        <circle className="body__lens" cx="0" cy="-5.5" r="2" />
        <rect className="body__strap" x="-8.5" y="3" width="17" height="6" rx="1.5" />

        {/* rear antenna */}
        <line className="antenna__wire" x1="0" y1="13" x2="0" y2="25" />
        <circle className="antenna__tip" cx="0" cy="26.5" r="2.6" />
      </g>
    </svg>
  );
}