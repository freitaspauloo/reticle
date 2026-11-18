import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./Growcode.css";

const GROWCODE_HERO =
  "https://aruyghvpjdiiuiesaupw.supabase.co/storage/v1/object/public/growcode-hero/growcode-bg.png";

const NAV_LINKS = ["Portfolio", "Company", "Careers", "Insights"];

/**
 * Magenta landscape hero.
 * Preview: /magenta-landscape
 */
export default function GrowcodeLanding() {
  const rootRef = useRef(null);

  useEffect(() => {
    const nodes = [document.documentElement, document.body, document.getElementById("root")];
    nodes.forEach((node) => node?.classList.add("growcode-active"));
    const prevTitle = document.title;
    document.title = "Reticle — Built for Yield";

    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "font";
    preload.type = "font/woff2";
    preload.crossOrigin = "anonymous";
    preload.href = "/fonts/manrope-latin.woff2";
    document.head.appendChild(preload);

    return () => {
      nodes.forEach((node) => node?.classList.remove("growcode-active"));
      document.title = prevTitle;
      preload.remove();
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const nav = ".gc-nav";
      const lines = gsap.utils.toArray(".gc-line-inner");
      const sub = ".gc-aside";
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(nav, { autoAlpha: 1, y: 0 });
        gsap.set(lines, { yPercent: 0 });
        gsap.set(sub, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(nav, { autoAlpha: 0, y: 10 });
      gsap.set(lines, { yPercent: 118 });
      gsap.set(sub, { autoAlpha: 0, y: 10 });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(nav, { autoAlpha: 1, y: 0, duration: 1.15 }, 0)
        .to(lines, { yPercent: 0, duration: 1.2, stagger: 0.13 }, 0.42)
        .to(sub, { autoAlpha: 1, y: 0, duration: 1.15 }, 0.92);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="top" className="gc">
      <header className="gc-header">
        <nav className="gc-nav" aria-label="Primary">
          <a href="#top" className="gc-logo">
            <SparkleMark className="gc-sparkle" />
            <span>Reticle</span>
          </a>

          <div className="gc-links">
            {NAV_LINKS.map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`}>
                {label}
              </a>
            ))}
          </div>

          <a href="#start" className="gc-nav-cta">
            Request Info
          </a>
        </nav>
      </header>

      <div className="gc-frame">
        <div className="gc-hero">
          <div className="gc-hero-clip">
            <img
              src={GROWCODE_HERO}
              alt="Pointillist green hills under a pale moon"
            />
            <div className="gc-hero-tint" aria-hidden />
          </div>
        </div>

        <div className="gc-copy">
          <div className="gc-grid">
            <h1>
              <span className="gc-line">
                <span className="gc-line-inner">Built for yield.</span>
              </span>
              <span className="gc-line">
                <span className="gc-line-inner">Before they leave the line.</span>
              </span>
            </h1>

            <div className="gc-aside">
              <p>
                In-line defect inspection for high-volume semiconductor manufacturing, with
                models trained on real fab imagery across nodes, tools, and process steps.
              </p>
              <a id="start" href="#start" className="gc-cta">
                Request Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SparkleMark({ className }) {
  return (
    <svg viewBox="0 0 10 10" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M5 0c.2 2.2 2.8 4.8 5 5-2.2.2-4.8 2.8-5 5-.2-2.2-2.8-4.8-5-5C2.2 4.8 4.8 2.2 5 0z"
      />
    </svg>
  );
}
