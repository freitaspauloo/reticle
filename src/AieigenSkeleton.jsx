import { useEffect } from "react";
import "./Aieigen.css";
import "./Skeleton.css";

function Bone({ className = "", delay = 0 }) {
  return <div className={`bone ${className}`} style={{ "--delay": `${delay}ms` }} />;
}

/**
 * Skeleton for the Reticle Aieigen hero.
 * Preview: /light-rays/skeleton
 */
export default function AieigenSkeleton() {
  useEffect(() => {
    const nodes = [document.documentElement, document.body, document.getElementById("root")];
    nodes.forEach((node) => node?.classList.add("aieigen-active"));
    const prevTitle = document.title;
    document.title = "Reticle";
    return () => {
      nodes.forEach((node) => node?.classList.remove("aieigen-active"));
      document.title = prevTitle;
    };
  }, []);

  return (
    <section className="ae ae-skel" aria-busy="true" aria-label="Loading">
      <div className="ae-frame">
        <div className="ae-bg" aria-hidden>
          <Bone className="ae-skel-bg" delay={0} />
        </div>

        <header className="ae-header" aria-hidden="true">
          <div className="ae-logo">
            <Bone className="ae-skel-mark" delay={0} />
            <Bone className="ae-skel-brand" delay={40} />
          </div>

          <nav className="ae-nav">
            <Bone className="ae-skel-nav" delay={60} />
            <Bone className="ae-skel-nav" delay={90} />
            <Bone className="ae-skel-nav" delay={120} />
            <Bone className="ae-skel-nav" delay={150} />
            <Bone className="ae-skel-nav" delay={180} />
          </nav>

          <Bone className="ae-skel-nav-cta" delay={200} />
        </header>

        <main className="ae-main">
          <div className="ae-copy" aria-hidden="true">
            <Bone className="ae-skel-badge" delay={80} />

            <div className="ae-skel-headline">
              <Bone className="ae-skel-h1" delay={140} />
              <Bone className="ae-skel-h1-long" delay={180} />
            </div>

            <div className="ae-skel-body">
              <Bone className="ae-skel-line" delay={220} />
              <Bone className="ae-skel-line" delay={250} />
              <Bone className="ae-skel-line-short" delay={280} />
            </div>

            <div className="ae-ctas">
              <Bone className="ae-skel-btn" delay={310} />
              <Bone className="ae-skel-btn-solid" delay={340} />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
