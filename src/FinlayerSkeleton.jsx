import { useEffect } from "react";
import "./Finlayer.css";
import "./Skeleton.css";

function Bone({ className = "", delay = 0 }) {
  return <div className={`bone ${className}`} style={{ "--delay": `${delay}ms` }} />;
}

/**
 * Skeleton for the Reticle dark marketing hero.
 * Preview: /browser-frame/skeleton
 */
export default function FinlayerSkeleton() {
  useEffect(() => {
    const nodes = [document.documentElement, document.body, document.getElementById("root")];
    nodes.forEach((node) => node?.classList.add("finlayer-active"));
    const prevTitle = document.title;
    document.title = "Reticle";
    return () => {
      nodes.forEach((node) => node?.classList.remove("finlayer-active"));
      document.title = prevTitle;
    };
  }, []);

  return (
    <section className="fl fl-skel" aria-busy="true" aria-label="Loading">
      <div className="fl-hatch fl-hatch-left" aria-hidden />
      <div className="fl-hatch fl-hatch-right" aria-hidden />

      <header className="fl-header">
        <div className="fl-header-inner">
          <div className="fl-brand-row">
            <div className="fl-logo" aria-hidden="true">
              <Bone className="fl-skel-mark" delay={0} />
              <Bone className="fl-skel-brand" delay={40} />
            </div>
            <nav className="fl-nav" aria-hidden="true">
              <Bone className="fl-skel-nav" delay={60} />
              <Bone className="fl-skel-nav" delay={90} />
              <Bone className="fl-skel-nav" delay={120} />
            </nav>
          </div>
          <Bone className="fl-skel-signin" delay={150} />
        </div>
      </header>

      <div className="fl-main">
        <div className="fl-intro">
          <div className="fl-skel-headline">
            <Bone className="fl-skel-h1" delay={80} />
            <Bone className="fl-skel-h1-short" delay={120} />
          </div>

          <div className="fl-copy">
            <div className="fl-skel-body">
              <Bone className="fl-skel-line" delay={160} />
              <Bone className="fl-skel-line-short" delay={190} />
            </div>
            <Bone className="fl-skel-cta" delay={230} />
            <div className="fl-brands">
              <Bone className="fl-skel-logo" delay={260} />
              <Bone className="fl-skel-logo" delay={290} />
              <Bone className="fl-skel-logo" delay={320} />
              <Bone className="fl-skel-logo" delay={350} />
            </div>
          </div>
        </div>

        <div className="fl-browser-wrap">
          <div className="fl-browser" aria-hidden="true">
            <div className="fl-chrome">
              <div className="fl-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="fl-url">
                <Bone className="fl-skel-url" delay={200} />
              </div>
              <div className="fl-chrome-end" />
            </div>
            <div className="fl-viewport">
              <Bone className="fl-skel-viewport" delay={180} />
              <div className="fl-card">
                <Bone className="fl-skel-handle" delay={280} />
                <div className="fl-skel-glass">
                  <Bone className="fl-skel-q" delay={300} />
                  <Bone className="fl-skel-status" delay={330} />
                  <Bone className="fl-skel-line" delay={360} />
                  <Bone className="fl-skel-line" delay={390} />
                  <Bone className="fl-skel-line-short" delay={420} />
                  <div className="fl-skel-foot">
                    <Bone className="fl-skel-chip" delay={450} />
                    <Bone className="fl-skel-chip" delay={480} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
