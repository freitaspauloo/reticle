import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Incredible.css";

const HERO_BG = "/incredible/hero-bg.png";
const AVATARS = [
  "/incredible/avatar-1.png",
  "/incredible/avatar-2.png",
  "/incredible/avatar-3.png",
];
const ATTACH_ICON = "/incredible/icon-attach.svg";
const CHEVRON_ICON = "/incredible/icon-chevron.svg";
const SEND_ICON = "/incredible/icon-send.svg";

const NAV_LINKS = ["Portfolio", "Company", "Careers"];
const BRANDS = ["TSMC", "ASML", "KLA", "Applied", "Lam"];
const TOOLS = ["Optical", "SEM", "E-beam"];
const PROMPTS = ["Classify this die", "Rank this defect", "Review this lot"];

/**
 * Prompt-bar hero.
 * Preview: /prompt-bar
 */
export default function IncredibleLanding() {
  const rootRef = useRef(null);
  const fileRef = useRef(null);
  const toolRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [tool, setTool] = useState(TOOLS[0]);
  const [toolOpen, setToolOpen] = useState(false);
  const [attached, setAttached] = useState(null);

  useEffect(() => {
    const nodes = [document.documentElement, document.body, document.getElementById("root")];
    nodes.forEach((node) => node?.classList.add("incredible-active"));
    const prevTitle = document.title;
    document.title = "Reticle — Built for Yield";

    return () => {
      nodes.forEach((node) => node?.classList.remove("incredible-active"));
      document.title = prevTitle;
    };
  }, []);

  useEffect(() => {
    const onPointer = (event) => {
      if (!toolRef.current?.contains(event.target)) setToolOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const header = ".ic-header-inner";
      const badge = ".ic-badge";
      const lines = gsap.utils.toArray(".ic-line-inner");
      const rest = [".ic-lede", ".ic-cta", ".ic-social", ".ic-prompt", ".ic-chips", ".ic-trust"];
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set([header, badge, rest], { autoAlpha: 1, y: 0 });
        gsap.set(lines, { yPercent: 0 });
        return;
      }

      gsap.set(header, { autoAlpha: 0, y: 10 });
      gsap.set(badge, { autoAlpha: 0, y: 8 });
      gsap.set(lines, { yPercent: 118 });
      gsap.set(rest, { autoAlpha: 0, y: 12 });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(header, { autoAlpha: 1, y: 0, duration: 1.05 }, 0)
        .to(badge, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.18)
        .to(lines, { yPercent: 0, duration: 1.2, stagger: 0.12 }, 0.32)
        .to(rest, { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.08 }, 0.72);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const onAttach = (event) => {
    const file = event.target.files?.[0];
    setAttached(file ? file.name : null);
  };

  return (
    <section ref={rootRef} id="top" className="ic">
      <div className="ic-orb ic-orb-wide" aria-hidden />
      <div className="ic-orb ic-orb-core" aria-hidden />

      <header className="ic-header">
        <div className="ic-header-inner">
          <div className="ic-brand">
            <a href="#top" className="ic-logo" aria-label="Reticle">
              <LogoMark className="ic-mark" />
            </a>
            <nav className="ic-nav" aria-label="Primary">
              {NAV_LINKS.map((label) => (
                <a key={label} href={`#${label.toLowerCase()}`}>
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className="ic-header-actions">
            <a href="#help" className="ic-help">
              Help
            </a>
            <a href="#start" className="ic-join">
              Request Info
            </a>
          </div>
        </div>
      </header>

      <div className="ic-shell">
        <div className="ic-hero">
          <div className="ic-hero-inner">
            <a href="#company" className="ic-badge">
              <span className="ic-live" aria-hidden>
                <span />
                <span />
              </span>
              <span>
                We have classified 40 million dies this quarter{" "}
                <span className="ic-badge-more">Read more</span>
              </span>
            </a>

            <h1>
              <span className="ic-line">
                <span className="ic-line-inner">Catch killer defects</span>
              </span>
              <span className="ic-line">
                <span className="ic-line-inner ic-line-fade">before they leave the line.</span>
              </span>
            </h1>

            <p className="ic-lede">
              In-line defect inspection for high-volume semiconductor manufacturing, with models
              trained on real fab imagery across nodes, tools, and process steps.
            </p>

            <a id="start" href="#start" className="ic-cta">
              Request Info
              <span className="ic-cta-arrow" aria-hidden>
                →
              </span>
            </a>

            <div className="ic-social">
              <div className="ic-avatars" aria-hidden>
                {AVATARS.map((src) => (
                  <span key={src} className="ic-avatar">
                    <img src={src} alt="" width={25} height={25} />
                  </span>
                ))}
              </div>
              <p>40M+ dies classified daily</p>
            </div>
          </div>
        </div>

        <div className="ic-vista">
          <div className="ic-vista-art" aria-hidden>
            <img src={HERO_BG} alt="" />
            <div className="ic-vista-tint" />
          </div>
          <div className="ic-vista-veil ic-vista-veil-bottom" aria-hidden />

          <form
            className="ic-prompt"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="ic-prompt-frame">
              <div className="ic-prompt-card">
                <label className="ic-prompt-field">
                  <span className="sr-only">Inspection prompt</span>
                  <input
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value)}
                    placeholder="Ask about a defect.."
                  />
                </label>

                <div className="ic-prompt-bar">
                  <div className="ic-prompt-tools">
                    <button
                      type="button"
                      className={`ic-tool${attached ? " is-on" : ""}`}
                      onClick={() => fileRef.current?.click()}
                    >
                      <span className="ic-ico ic-ico-attach">
                        <img src={ATTACH_ICON} alt="" width={18} height={18} />
                      </span>
                      {attached ? "Attached" : "Attach"}
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      hidden
                      onChange={onAttach}
                    />

                    <div ref={toolRef} className="ic-tool-wrap">
                      <button
                        type="button"
                        className={`ic-tool${toolOpen ? " is-on" : ""}`}
                        aria-expanded={toolOpen}
                        aria-haspopup="listbox"
                        onClick={() => setToolOpen((open) => !open)}
                      >
                        Select tool
                        <span className="ic-ico ic-ico-chevron">
                          <img src={CHEVRON_ICON} alt="" width={9} height={18} />
                        </span>
                      </button>
                      {toolOpen ? (
                        <ul className="ic-tool-menu" role="listbox" aria-label="Inspection tool">
                          {TOOLS.map((option) => (
                            <li key={option}>
                              <button
                                type="button"
                                role="option"
                                aria-selected={tool === option}
                                onClick={() => {
                                  setTool(option);
                                  setToolOpen(false);
                                }}
                              >
                                {option}
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>

                  <button type="submit" className="ic-send" aria-label="Submit prompt">
                    <span className="ic-ico ic-ico-send">
                      <img src={SEND_ICON} alt="" width={12} height={15} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="ic-chips">
            {PROMPTS.map((label) => (
              <button
                key={label}
                type="button"
                className="ic-chip"
                onClick={() => setPrompt(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="ic-trust">
          <p>Trusted on high-volume production lines</p>
          <div className="ic-brands">
            {BRANDS.map((label) => (
              <span key={label} className="ic-brand-mark">
                {label}
              </span>
            ))}
          </div>
        </div>
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
