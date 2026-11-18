import { useEffect } from "react";
import "./FeaturesSec.css";
import "./Skeleton.css";

function Bone({ className = "", delay = 0 }) {
  return <div className={`bone ${className}`} style={{ "--delay": `${delay}ms` }} />;
}

const CARDS = [0, 1, 2, 3];
const DEFAULT_ACTIVE = 1;

/**
 * Skeleton for the Reticle features rail.
 * Preview: /feature-rail/skeleton
 */
export default function FeaturesSecSkeleton() {
  useEffect(() => {
    const nodes = [document.documentElement, document.body, document.getElementById("root")];
    nodes.forEach((node) => node?.classList.add("features-sec-active"));
    const prevTitle = document.title;
    document.title = "Reticle";
    return () => {
      nodes.forEach((node) => node?.classList.remove("features-sec-active"));
      document.title = prevTitle;
    };
  }, []);

  return (
    <section className="features-sec features-sec-skel" aria-busy="true" aria-label="Loading">
      <div className="features-wrap">
        <div className="features-header">
          <div>
            <Bone className="fs-skel-badge" delay={40} />
            <div className="fs-skel-headline">
              <Bone className="fs-skel-h2" delay={80} />
              <Bone className="fs-skel-h2-short" delay={120} />
            </div>
          </div>

          <div className="features-header-copy">
            <div className="fs-skel-lede">
              <Bone className="fs-skel-line" delay={140} />
              <Bone className="fs-skel-line" delay={170} />
              <Bone className="fs-skel-line-short" delay={200} />
            </div>
            <Bone className="fs-skel-cta" delay={240} />
          </div>
        </div>

        <div className="features-rail">
          {CARDS.map((index) => (
            <article
              key={index}
              className={`features-card${index === DEFAULT_ACTIVE ? " is-active" : ""}`}
              aria-hidden="true"
            >
              {index === DEFAULT_ACTIVE ? <Bone className="fs-skel-card-fill" delay={280} /> : null}

              <div className="features-card-idle">
                <Bone className="fs-skel-num" delay={280 + index * 60} />
                <Bone className="fs-skel-title" delay={320 + index * 60} />
              </div>

              <div className="features-card-active">
                <div className="features-card-active-inner">
                  <Bone className="fs-skel-active-title" delay={340} />
                  <div className="fs-skel-desc">
                    <Bone className="fs-skel-line" delay={380} />
                    <Bone className="fs-skel-line" delay={410} />
                    <Bone className="fs-skel-line-short" delay={440} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
