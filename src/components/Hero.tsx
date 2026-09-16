import QuadSVG from './QuadSVG';

export default function Hero() {
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
        <div className="hero__art" aria-hidden>
          <QuadSVG />
        </div>
      </div>
    </section>
  );
}