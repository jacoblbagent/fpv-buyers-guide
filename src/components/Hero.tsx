import { useCallback, useRef } from 'react';
import QuadSVG from './QuadSVG';

export default function Hero() {
  const artRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  // Cursor parallax: the quad banks toward the pointer. Values land on --px/--py
  // (-1..1) and the CSS does the rest — coalesced to one write per frame.
  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = artRef.current;
    if (!el || rafRef.current) return;
    const rect = el.getBoundingClientRect();
    const px = Math.min(1, Math.max(-1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
    const py = Math.min(1, Math.max(-1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      el.style.setProperty('--px', px.toFixed(3));
      el.style.setProperty('--py', py.toFixed(3));
    });
  }, []);

  const onLeave = useCallback(() => {
    const el = artRef.current;
    if (!el) return;
    el.style.setProperty('--px', '0');
    el.style.setProperty('--py', '0');
  }, []);

  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden />
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">First Build, No Guesswork</p>
          <h1>
            The FPV <span className="hero__hl">Buyers Guide</span>
          </h1>
          <p className="hero__sub">
            Seven boxes to tick before you fly. Honest picks for budget, mid, and
            pro — every one a real product, linked and verified.
          </p>
          <div className="hero__cta">
            <a className="btn btn--solid" href="#drones">
              Start Shopping
            </a>
            <a className="btn" href="#goggles">
              Skip to Goggles
            </a>
          </div>
        </div>
        <div
          className="hero__art"
          ref={artRef}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          aria-hidden
        >
          <QuadSVG />
        </div>
      </div>
    </section>
  );
}