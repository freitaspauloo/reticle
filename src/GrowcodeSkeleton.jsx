import { useEffect } from "react";
import "./Growcode.css";
import "./Skeleton.css";

function Bone({ className = "", delay = 0 }) {
  return <div className={`bone ${className}`} style={{ "--delay": `${delay}ms` }} />;
}

/**
 * Skeleton for the Reticle marketing landing.
 * Preview: /magenta-landscape/skeleton
 */
export default function GrowcodeSkeleton() {
  useEffect(() => {
    const nodes = [document.documentElement, document.body, document.getElementById("root")];
    nodes.forEach((node) => node?.classList.add("growcode-active"));
    const prevTitle = document.title;
    document.title = "Reticle";
    return () => {
      nodes.forEach((node) => node?.classList.remove("growcode-active"));
      document.title = prevTitle;
    };
  }, []);

  return (
    <section className="gc gc-skel" aria-busy="true" aria-label="Loading">
      <header className="gc-header">
        <nav className="gc-nav" aria-hidden="true">
          <div className="gc-logo">
            <Bone className="gc-skel-sparkle" delay={0} />
            <Bone className="gc-skel-brand" delay={40} />
          </div>

          <div className="gc-links">
            <Bone className="gc-skel-nav" delay={60} />
            <Bone className="gc-skel-nav" delay={90} />
            <Bone className="gc-skel-nav" delay={120} />
            <Bone className="gc-skel-nav" delay={150} />
          </div>

          <Bone className="gc-skel-nav-cta" delay={180} />
        </nav>
      </header>

      <div className="gc-frame">
        <div className="gc-hero">
          <div className="gc-hero-clip">
            <Bone className="gc-skel-hero" delay={80} />
          </div>
        </div>

        <div className="gc-copy">
          <div className="gc-grid">
            <div className="gc-skel-headline">
              <Bone className="gc-skel-h1" delay={140} />
              <Bone className="gc-skel-h1-short" delay={180} />
            </div>

            <div className="gc-aside">
              <div className="gc-skel-body">
                <Bone className="gc-skel-line" delay={200} />
                <Bone className="gc-skel-line" delay={230} />
                <Bone className="gc-skel-line-short" delay={260} />
              </div>
              <Bone className="gc-skel-cta" delay={300} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
