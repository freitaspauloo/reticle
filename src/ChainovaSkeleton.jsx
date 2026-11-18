import { useEffect } from "react";
import "./Chainova.css";
import "./Skeleton.css";

function Bone({ className = "", delay = 0 }) {
  return <div className={`bone ${className}`} style={{ "--delay": `${delay}ms` }} />;
}

/**
 * Skeleton for the Reticle blueprint-grid hero.
 * Preview: /blueprint/skeleton
 */
export default function ChainovaSkeleton() {
  useEffect(() => {
    const nodes = [document.documentElement, document.body, document.getElementById("root")];
    nodes.forEach((node) => node?.classList.add("chainova-active"));
    const prevTitle = document.title;
    document.title = "Reticle";
    return () => {
      nodes.forEach((node) => node?.classList.remove("chainova-active"));
      document.title = prevTitle;
    };
  }, []);

  return (
    <section className="ch ch-skel" aria-busy="true" aria-label="Loading">
      <div className="ch-frame">
        <header className="ch-header" aria-hidden="true">
          <Bone className="ch-skel-logo" delay={0} />
          <div className="ch-header-cta">
            <Bone className="ch-skel-cta" delay={160} />
          </div>
          <nav className="ch-nav">
            <Bone className="ch-skel-nav" delay={40} />
            <Bone className="ch-skel-nav" delay={70} />
            <Bone className="ch-skel-nav" delay={100} />
          </nav>
        </header>

        <div className="ch-stats-row" aria-hidden="true">
          <div className="ch-hatch ch-stats-hatch" />
          <div className="ch-stats">
            <div className="ch-skel-stat">
              <Bone className="ch-skel-stat-num" delay={80} />
              <Bone className="ch-skel-stat-label" delay={110} />
            </div>
            <div className="ch-skel-stat">
              <Bone className="ch-skel-stat-num" delay={120} />
              <Bone className="ch-skel-stat-label" delay={150} />
            </div>
            <div className="ch-skel-stat">
              <Bone className="ch-skel-stat-num" delay={160} />
              <Bone className="ch-skel-stat-label" delay={190} />
            </div>
          </div>
        </div>

        <div className="ch-hero">
          <div className="ch-copy">
            <div className="ch-copy-inner" aria-hidden="true">
              <Bone className="ch-skel-eyebrow" delay={120} />
              <div className="ch-skel-headline">
                <Bone className="ch-skel-h1" delay={160} />
                <Bone className="ch-skel-h1-mid" delay={190} />
                <Bone className="ch-skel-h1-short" delay={220} />
              </div>
              <div className="ch-skel-body">
                <Bone className="ch-skel-line" delay={250} />
                <Bone className="ch-skel-line" delay={280} />
                <Bone className="ch-skel-line-short" delay={310} />
              </div>
              <div className="ch-skel-actions">
                <Bone className="ch-skel-btn" delay={340} />
                <Bone className="ch-skel-btn ch-skel-btn-pink" delay={370} />
              </div>
            </div>
          </div>

          <div className="ch-art">
            <Bone className="ch-skel-art" delay={180} />
          </div>
        </div>

        <div className="ch-logos-row" aria-hidden="true">
          <div className="ch-logos">
            <div className="ch-logos-inner">
              <Bone className="ch-skel-brand" delay={280} />
              <Bone className="ch-skel-brand" delay={310} />
              <Bone className="ch-skel-brand" delay={340} />
              <Bone className="ch-skel-brand" delay={370} />
            </div>
          </div>
          <div className="ch-hatch ch-logos-hatch" />
        </div>

        <div className="ch-wire" aria-hidden>
          <div className="ch-wire-cell ch-wire-cell-rule" />
          <div className="ch-wire-cell" />
        </div>
      </div>
    </section>
  );
}
