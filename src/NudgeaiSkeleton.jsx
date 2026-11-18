import { useEffect } from "react";
import "./Nudgeai.css";
import "./Skeleton.css";

const FEATURE_PINS = [
  { id: "defects", side: "left", x: "5.5%", size: "short", width: 168 },
  { id: "classify", side: "left", x: "21%", size: "tall", width: 156 },
  { id: "review", side: "right", x: "21%", size: "tall", width: 132 },
  { id: "yield", side: "right", x: "5.5%", size: "short", width: 176 },
];

function Bone({ className = "", delay = 0, style }) {
  return <div className={`bone ${className}`} style={{ "--delay": `${delay}ms`, ...style }} />;
}

/**
 * Skeleton for the Reticle cinematic hero.
 * Preview: /spaceman-moon/skeleton
 */
export default function NudgeaiSkeleton() {
  useEffect(() => {
    const nodes = [document.documentElement, document.body, document.getElementById("root")];
    nodes.forEach((node) => node?.classList.add("nudgeai-active"));
    const prevTitle = document.title;
    document.title = "Reticle";
    return () => {
      nodes.forEach((node) => node?.classList.remove("nudgeai-active"));
      document.title = prevTitle;
    };
  }, []);

  return (
    <section className="nudge nudge-skel" aria-busy="true" aria-label="Loading">
      <div className="nudge-media" aria-hidden>
        <Bone className="nudge-skel-bg" delay={0} />
        <div className="nudge-glow" />
        <div className="nudge-vignette" />
      </div>

      <header className="nudge-header" aria-hidden="true">
        <div className="nudge-nav-bar">
          <div className="nudge-brand">
            <Bone className="nudge-skel-mark" delay={0} />
            <Bone className="nudge-skel-brand" delay={40} />
          </div>

          <nav className="nudge-nav-desktop">
            <Bone className="nudge-skel-nav" delay={60} />
            <Bone className="nudge-skel-nav" delay={90} />
            <Bone className="nudge-skel-nav" delay={120} />
          </nav>

          <div className="nudge-nav-end">
            <Bone className="nudge-skel-nav-cta" delay={150} />
            <Bone className="nudge-skel-menu" delay={160} />
          </div>
        </div>
      </header>

      <div className="nudge-copy" aria-hidden="true">
        <Bone className="nudge-skel-h1" delay={80} />
        <div className="nudge-skel-body">
          <Bone className="nudge-skel-line" delay={140} />
          <Bone className="nudge-skel-line" delay={170} />
          <Bone className="nudge-skel-line-short" delay={200} />
        </div>
        <div className="nudge-actions">
          <Bone className="nudge-skel-btn" delay={230} />
          <Bone className="nudge-skel-btn-primary" delay={260} />
        </div>
        <Bone className="nudge-skel-trusted" delay={290} />
        <ul className="nudge-brands">
          <li>
            <Bone className="nudge-skel-logo" delay={320} />
          </li>
          <li>
            <Bone className="nudge-skel-logo" delay={350} />
          </li>
          <li>
            <Bone className="nudge-skel-logo" delay={380} />
          </li>
          <li>
            <Bone className="nudge-skel-logo" delay={410} />
          </li>
        </ul>
      </div>

      <div className="nudge-pins" aria-hidden="true">
        {FEATURE_PINS.map((pin, index) => (
          <div
            key={pin.id}
            className={`nudge-pin ${pin.size === "tall" ? "nudge-pin-tall" : "nudge-pin-short"}`}
            style={{ [pin.side]: pin.x }}
          >
            <Bone
              className="nudge-skel-chip"
              delay={280 + index * 40}
              style={{ width: pin.width }}
            />
            <div className="nudge-line" />
          </div>
        ))}
      </div>

      <div className="nudge-mobile-chips" aria-hidden="true">
        {FEATURE_PINS.map((pin, index) => (
          <Bone
            key={pin.id}
            className="nudge-skel-chip"
            delay={280 + index * 40}
            style={{ width: pin.width }}
          />
        ))}
      </div>
    </section>
  );
}
