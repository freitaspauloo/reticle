import { useEffect, useState } from "react";
import "./FeaturesSec.css";

const CARD_BG = "/features/card-bg.png";

const FEATURES = [
  {
    n: "01",
    title: "Catch Killer Defects",
    description:
      "Inspection models trained on real fab imagery across nodes, tools, and process steps.",
  },
  {
    n: "02",
    title: "Built for Yield",
    description:
      "In-line inspection for high-volume manufacturing, qualified on production imagery rather than lab samples.",
  },
  {
    n: "03",
    title: "Faster Than Review",
    description:
      "Defects arrive ranked for engineering review, so each cycle protects yield at production volume.",
  },
  {
    n: "04",
    title: "Line-Level Assessment",
    description:
      "Reassess yield on the line over time with classified dies and measurable capture data.",
  },
];

const DEFAULT_ACTIVE = 1;

function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Feature rail — light canvas, 4-column cards, hover reveals pink halftone.
 * Preview: /feature-rail
 */
export default function FeaturesSec({ className }) {
  const [motionReady, setMotionReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false, card: -1 });

  useEffect(() => {
    const nodes = [document.documentElement, document.body, document.getElementById("root")];
    nodes.forEach((node) => node?.classList.add("features-sec-active"));
    const prevTitle = document.title;
    document.title = "Reticle — Features";

    const frame = requestAnimationFrame(() => setMotionReady(true));
    return () => {
      cancelAnimationFrame(frame);
      nodes.forEach((node) => node?.classList.remove("features-sec-active"));
      document.title = prevTitle;
    };
  }, []);

  return (
    <section className={cn("features-sec", motionReady && "features-motion-ready", className)}>
      <svg className="features-liquid-svg" aria-hidden>
        <defs>
          <filter
            id="features-liquid-distort"
            x="-12%"
            y="-12%"
            width="124%"
            height="124%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="3" result="noise">
              <animate
                attributeName="baseFrequency"
                dur="9s"
                values="0.011 0.018;0.016 0.028;0.013 0.02;0.011 0.018"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G">
              <animate attributeName="scale" dur="6s" values="10;18;12;10" repeatCount="indefinite" />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      <div className="features-wrap">
        <div className="features-header">
          <div>
            <div className="features-enter-soft features-d0 features-badge">
              <SparkIcon />
              Features
            </div>
            <h2 className="features-enter features-d1 features-headline">
              Everything You Need To Protect Yield at Scale
            </h2>
          </div>

          <div className="features-enter-soft features-d2 features-header-copy">
            <p className="features-lede">
              In-line inspection, ranked review, and production-qualified models unified into one
              fab-native operating view.
            </p>
            <a href="#demo" className="features-enter-soft features-d3 features-btn">
              Request Info
              <ArrowRight />
            </a>
          </div>
        </div>

        <div
          className="features-enter features-d4 features-rail"
          onMouseLeave={() => {
            setActiveIndex(DEFAULT_ACTIVE);
            setCursor((c) => ({ ...c, active: false, card: -1 }));
          }}
        >
          {FEATURES.map((feature, index) => (
            <article
              key={feature.n}
              tabIndex={0}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                setCursor({
                  x: event.clientX - rect.left,
                  y: event.clientY - rect.top,
                  active: true,
                  card: index,
                });
              }}
              onMouseLeave={() => {
                setCursor((c) => (c.card === index ? { ...c, active: false, card: -1 } : c));
              }}
              onFocus={() => setActiveIndex(index)}
              onBlur={(event) => {
                if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
                  setActiveIndex(DEFAULT_ACTIVE);
                }
              }}
              className={cn(
                "features-card",
                index === activeIndex && "is-active",
                `features-d${index + 5}`,
              )}
            >
              <div className="features-card-white" aria-hidden />
              <img src={CARD_BG} alt="" className="features-card-bg" />
              <div
                className={cn(
                  "features-card-liquid",
                  cursor.active && cursor.card === index && "is-live",
                )}
                style={
                  cursor.active && cursor.card === index
                    ? {
                        WebkitMaskImage: `radial-gradient(circle 96px at ${cursor.x}px ${cursor.y}px, #000 0%, #000 42%, transparent 72%)`,
                        maskImage: `radial-gradient(circle 96px at ${cursor.x}px ${cursor.y}px, #000 0%, #000 42%, transparent 72%)`,
                      }
                    : undefined
                }
                aria-hidden
              >
                <img src={CARD_BG} alt="" />
              </div>

              <div className="features-card-corners" aria-hidden>
                <span className="c-tl" />
                <span className="c-tr" />
                <span className="c-bl" />
                <span className="c-br" />
              </div>

              <div className="features-card-idle">
                <span className="features-card-num">{feature.n}</span>
                <h3 className="features-card-title">{feature.title}</h3>
              </div>

              <div className="features-card-active">
                <div className="features-card-active-inner">
                  <h3 className="features-card-title">{feature.title}</h3>
                  <p className="features-card-desc">{feature.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 1.2 9.1 6.1 14 7.2 9.1 8.3 8 13.2 6.9 8.3 2 7.2l4.9-1.1L8 1.2Z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8h9M8.5 4.5 12 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
