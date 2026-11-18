import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./Aieigen.css";

const HERO_SRC = "/aieigen/hero-bg.png";

const NAV_LINKS = ["Portfolio", "Company", "Careers", "Insights", "Help"];

/**
 * Light-rays hero.
 * Preview: /light-rays
 */
export default function AieigenLanding() {
  const rootRef = useRef(null);

  useEffect(() => {
    const nodes = [document.documentElement, document.body, document.getElementById("root")];
    nodes.forEach((node) => node?.classList.add("aieigen-active"));
    const prevTitle = document.title;
    document.title = "Reticle — Built for Yield";

    return () => {
      nodes.forEach((node) => node?.classList.remove("aieigen-active"));
      document.title = prevTitle;
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const logo = ".ae-logo";
      const nav = gsap.utils.toArray(".ae-nav a");
      const navCta = ".ae-nav-cta";
      const badge = ".ae-badge";
      const lines = gsap.utils.toArray(".ae-line-inner");
      const body = ".ae-body";
      const ctas = gsap.utils.toArray(".ae-ctas .ae-btn");
      const bg = ".ae-bg img";
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set([logo, nav, navCta, badge, body, ctas, bg], { autoAlpha: 1, y: 0, scale: 1 });
        gsap.set(lines, { yPercent: 0 });
        return;
      }

      gsap.set(bg, { scale: 1.08, autoAlpha: 0 });
      gsap.set(logo, { autoAlpha: 0, y: 8 });
      gsap.set(nav, { autoAlpha: 0, y: 8 });
      gsap.set(navCta, { autoAlpha: 0, y: 8 });
      gsap.set(badge, { autoAlpha: 0, y: 8 });
      gsap.set(lines, { yPercent: 118 });
      gsap.set(body, { autoAlpha: 0, y: 12 });
      gsap.set(ctas, { autoAlpha: 0, y: 12 });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(bg, { scale: 1, autoAlpha: 1, duration: 1.8 }, 0)
        .to(logo, { autoAlpha: 1, y: 0, duration: 1.05 }, 0.08)
        .to(nav, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.05 }, 0.16)
        .to(navCta, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.28)
        .to(badge, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.32)
        .to(lines, { yPercent: 0, duration: 1.2, stagger: 0.13 }, 0.42)
        .to(body, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.88)
        .to(ctas, { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.08 }, 1.02);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="top" className="ae">
      <div className="ae-frame">
        <div className="ae-bg" aria-hidden>
          <div className="ae-bg-fill" />
          <img src={HERO_SRC} alt="" />
          <div className="ae-bg-tint" />
        </div>

        <header className="ae-header">
          <a href="#top" className="ae-logo">
            <LogoMark className="ae-mark" />
            <span>Reticle</span>
          </a>

          <nav className="ae-nav" aria-label="Primary">
            {NAV_LINKS.map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`}>
                {label}
              </a>
            ))}
          </nav>

          <a href="#start" className="ae-btn ae-btn-ghost ae-nav-cta">
            Request Info
          </a>
        </header>

        <main className="ae-main">
          <div className="ae-copy">
            <div className="ae-badge">
              <span className="ae-badge-muted">Trained on</span>
              <LogoMark className="ae-badge-mark" />
              <span className="ae-badge-strong">40M+ dies</span>
            </div>

            <h1>
              <span className="ae-line">
                <span className="ae-line-inner">Your always-on inspection,</span>
              </span>
              <span className="ae-line">
                <span className="ae-line-inner">keeping every wafer clean.</span>
              </span>
            </h1>

            <p className="ae-body">
              Reticle continuously monitors the line for killer defects, process drift, and
              yield loss — then flags them before they leave the fab, with models trained on
              real imagery across nodes, tools, and process steps.
            </p>

            <div className="ae-ctas">
              <a href="#start" className="ae-btn ae-btn-ghost">
                Request Info
              </a>
              <a id="start" href="#start" className="ae-btn ae-btn-solid">
                Talk to us
              </a>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

function LogoMark({ className }) {
  const lines = Array.from({ length: 24 }, (_, i) => {
    const a = -Math.PI / 2 + (i / 24) * Math.PI * 2;
    const cx = 18.5;
    const cy = 18;
    const inner = 6.6;
    const outer = 16.4;
    return {
      x1: cx + Math.cos(a) * inner,
      y1: cy + Math.sin(a) * inner,
      x2: cx + Math.cos(a) * outer,
      y2: cy + Math.sin(a) * outer,
    };
  });

  return (
    <svg className={className} viewBox="0 0 37 36" aria-hidden="true">
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
