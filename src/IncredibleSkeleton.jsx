import { useEffect } from "react";
import "./Incredible.css";
import "./Skeleton.css";

function Bone({ className = "", delay = 0 }) {
  return <div className={`bone ${className}`} style={{ "--delay": `${delay}ms` }} />;
}

/**
 * Skeleton for the Reticle Incredible hero.
 * Preview: /prompt-bar/skeleton
 */
export default function IncredibleSkeleton() {
  useEffect(() => {
    const nodes = [document.documentElement, document.body, document.getElementById("root")];
    nodes.forEach((node) => node?.classList.add("incredible-active"));
    const prevTitle = document.title;
    document.title = "Reticle";
    return () => {
      nodes.forEach((node) => node?.classList.remove("incredible-active"));
      document.title = prevTitle;
    };
  }, []);

  return (
    <section className="ic ic-skel" aria-busy="true" aria-label="Loading">
      <header className="ic-header" aria-hidden="true">
        <div className="ic-header-inner">
          <div className="ic-brand">
            <Bone className="ic-skel-mark" delay={0} />
            <nav className="ic-nav">
              <Bone className="ic-skel-nav" delay={40} />
              <Bone className="ic-skel-nav" delay={70} />
              <Bone className="ic-skel-nav" delay={100} />
            </nav>
          </div>

          <div className="ic-header-actions">
            <Bone className="ic-skel-help" delay={130} />
            <Bone className="ic-skel-join" delay={160} />
          </div>
        </div>
      </header>

      <div className="ic-shell">
        <div className="ic-hero">
          <div className="ic-hero-inner" aria-hidden="true">
            <Bone className="ic-skel-badge" delay={80} />

            <div className="ic-skel-headline">
              <Bone className="ic-skel-h1" delay={140} />
              <Bone className="ic-skel-h1-long" delay={180} />
            </div>

            <div className="ic-skel-body">
              <Bone className="ic-skel-line" delay={220} />
              <Bone className="ic-skel-line" delay={250} />
              <Bone className="ic-skel-line-short" delay={280} />
            </div>

            <Bone className="ic-skel-cta" delay={310} />

            <div className="ic-social">
              <div className="ic-avatars">
                <Bone className="ic-skel-avatar" delay={340} />
                <Bone className="ic-skel-avatar" delay={360} />
                <Bone className="ic-skel-avatar" delay={380} />
              </div>
              <Bone className="ic-skel-social" delay={400} />
            </div>
          </div>
        </div>

        <div className="ic-vista" aria-hidden="true">
          <Bone className="ic-skel-vista" delay={60} />

          <div className="ic-prompt">
            <div className="ic-prompt-frame">
              <div className="ic-prompt-card">
                <Bone className="ic-skel-prompt-line" delay={200} />
                <div className="ic-prompt-bar">
                  <div className="ic-prompt-tools">
                    <Bone className="ic-skel-tool" delay={240} />
                    <Bone className="ic-skel-tool ic-skel-tool-wide" delay={270} />
                  </div>
                  <Bone className="ic-skel-send" delay={300} />
                </div>
              </div>
            </div>
          </div>

          <div className="ic-chips">
            <Bone className="ic-skel-chip" delay={330} />
            <Bone className="ic-skel-chip" delay={360} />
            <Bone className="ic-skel-chip" delay={390} />
          </div>
        </div>

        <div className="ic-trust" aria-hidden="true">
          <Bone className="ic-skel-trust-copy" delay={280} />
          <div className="ic-brands">
            <Bone className="ic-skel-brand" delay={320} />
            <Bone className="ic-skel-brand" delay={350} />
            <Bone className="ic-skel-brand" delay={380} />
            <Bone className="ic-skel-brand" delay={410} />
            <Bone className="ic-skel-brand" delay={440} />
          </div>
        </div>
      </div>
    </section>
  );
}
