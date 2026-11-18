import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Finlayer.css";

const VIEWPORT_BG =
  "https://aruyghvpjdiiuiesaupw.supabase.co/storage/v1/object/public/finlayer-hero/Editorial%20Screenprint_02.png";

const NAV_LINKS = ["Portfolio", "Company", "Careers"];

/**
 * Browser-frame hero.
 * Preview: /browser-frame
 */
export default function FinlayerLanding() {
  const rootRef = useRef(null);

  useEffect(() => {
    const nodes = [document.documentElement, document.body, document.getElementById("root")];
    nodes.forEach((node) => node?.classList.add("finlayer-active"));
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
      nodes.forEach((node) => node?.classList.remove("finlayer-active"));
      document.title = prevTitle;
      preload.remove();
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const hatches = ".fl-hatch";
      const header = ".fl-header-inner";
      const lines = gsap.utils.toArray(".fl-line-inner");
      const copy = [".fl-copy p", ".fl-cta"];
      const brands = ".fl-brand-text";
      const browser = ".fl-browser";
      const curtain = ".fl-card-curtain";
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set([header, copy, brands], { autoAlpha: 1, y: 0 });
        gsap.set(lines, { yPercent: 0 });
        gsap.set(hatches, { autoAlpha: 1 });
        gsap.set(browser, { clipPath: "none" });
        gsap.set(curtain, { autoAlpha: 0 });
        return;
      }

      gsap.set(hatches, { autoAlpha: 0 });
      gsap.set(header, { autoAlpha: 0, y: 10 });
      gsap.set(lines, { yPercent: 118 });
      gsap.set(copy, { autoAlpha: 0, y: 10 });
      gsap.set(brands, { autoAlpha: 0, y: 8 });
      gsap.set(browser, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(curtain, { clipPath: "inset(0% 0% 0% 0%)" });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(hatches, { autoAlpha: 1, duration: 0.9, stagger: 0.08 }, 0)
        .to(header, { autoAlpha: 1, y: 0, duration: 1.15 }, 0.06)
        .to(lines, { yPercent: 0, duration: 1.2, stagger: 0.13 }, 0.38)
        .to(copy, { autoAlpha: 1, y: 0, duration: 1.15, stagger: 0.08 }, 0.82)
        .to(brands, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06 }, 1.02)
        .to(browser, { clipPath: "inset(0% 0 0 0)", duration: 1.2 }, 0.92)
        .to(
          curtain,
          { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9 },
          ">+=0.35",
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="top" className="fl">
      <div className="fl-hatch fl-hatch-left" aria-hidden />
      <div className="fl-hatch fl-hatch-right" aria-hidden />

      <header className="fl-header">
        <div className="fl-header-inner">
          <div className="fl-brand-row">
            <a href="#top" className="fl-logo">
              <FinlayerMark className="fl-mark" />
              <span>Reticle</span>
            </a>

            <nav className="fl-nav" aria-label="Primary">
              {NAV_LINKS.map((label) => (
                <a key={label} href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}>
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <a href="#start" className="fl-signin">
            Request Info
          </a>
        </div>
      </header>

      <div className="fl-main">
        <div className="fl-intro">
          <h1>
            <span className="fl-line">
              <span className="fl-line-inner">In-line inspection</span>
            </span>
            <span className="fl-line">
              <span className="fl-line-inner">built for yield</span>
            </span>
          </h1>

          <div className="fl-copy">
            <p>
              Catch killer defects before they leave the line,
              <br />
              with models trained on real fab imagery across nodes and tools.
            </p>
            <a id="start" href="#start" className="fl-cta">
              Request Info
            </a>
            <div className="fl-brands">
              <BrandWordmark label="TSMC" />
              <BrandWordmark label="ASML" />
              <BrandWordmark label="KLA" />
              <BrandWordmark label="Applied" />
            </div>
          </div>
        </div>

        <div className="fl-browser-wrap">
          <BrowserFrame />
        </div>
      </div>
    </section>
  );
}

const VIEWPORT_ART_STYLE = {
  backgroundColor: "#0b0818",
  backgroundImage: `url("${VIEWPORT_BG}"), radial-gradient(90% 80% at 55% 30%, #ff7a2f 0%, #c44a8a 28%, #6b3fd4 52%, #1e1448 78%, #0b0818 100%)`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

function ViewportScene() {
  return (
    <>
      <div className="fl-viewport-art" aria-hidden style={VIEWPORT_ART_STYLE} />
      <div className="fl-viewport-tint" aria-hidden />
      <div className="fl-viewport-shade" aria-hidden />
    </>
  );
}

function BrowserFrame() {
  return (
    <div className="fl-browser">
      <div className="fl-chrome">
        <div className="fl-dots" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div className="fl-url">
          <span>/reticle.ai</span>
        </div>
        <div className="fl-chrome-end" aria-hidden />
      </div>

      <div className="fl-viewport">
        <ViewportScene />
        <GlassAiCard />
        <div className="fl-card-curtain" aria-hidden>
          <ViewportScene />
        </div>
      </div>
    </div>
  );
}

function GlassAiCard() {
  const cardRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const clampOffset = (nextX, nextY) => {
    const card = cardRef.current;
    const parent = card?.parentElement;
    if (!card || !parent) return { x: nextX, y: nextY };

    const parentRect = parent.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const pad = 8;
    const current = offsetRef.current;

    const baseLeft = cardRect.left - parentRect.left - current.x;
    const baseTop = cardRect.top - parentRect.top - current.y;
    const width = cardRect.width;
    const height = cardRect.height;

    const minX = pad - baseLeft;
    const maxX = parentRect.width - width - pad - baseLeft;
    const minY = pad - baseTop;
    const maxY = parentRect.height - height - pad - baseTop;

    return {
      x: Math.min(Math.max(nextX, Math.min(minX, maxX)), Math.max(minX, maxX)),
      y: Math.min(Math.max(nextY, Math.min(minY, maxY)), Math.max(minY, maxY)),
    };
  };

  const onHandlePointerDown = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offsetRef.current.x,
      originY: offsetRef.current.y,
    };
    setDragging(true);
  };

  const onHandlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const next = clampOffset(
      drag.originX + (event.clientX - drag.startX),
      drag.originY + (event.clientY - drag.startY),
    );
    offsetRef.current = next;
    setOffset(next);
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`fl-card${dragging ? " is-dragging" : ""}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: dragging ? "none" : "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: dragging ? "transform" : undefined,
      }}
    >
      <button
        type="button"
        aria-label="Drag inspection card"
        className={`fl-handle${dragging ? " is-dragging" : ""}`}
        onPointerDown={onHandlePointerDown}
        onPointerMove={onHandlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <FinlayerMark className="fl-handle-mark" />
      </button>

      <div className="fl-glass">
        <div className="fl-glass-body">
          <h2>Q. Is this a killer defect, or can the die still ship?</h2>
          <div className="fl-status">
            <SettingsIcon />
            <span>classified 12 inspection signals…</span>
          </div>
          <p>
            Based on in-line imagery and production-qualified models, this pattern matches killer
            defects seen at this process step. Rank it for engineering review before the lot
            leaves the line. Waiting for a later inspection often misses the yield hit; catching
            it here keeps high-volume production protected.
          </p>
        </div>

        <div className="fl-glass-foot">
          <div className="fl-chips">
            <span className="fl-chip">
              <GlobeIcon />
              fab imagery
            </span>
            <span className="fl-chip">
              <FileTextIcon />
              ranked review
            </span>
          </div>
          <span className="fl-chevron">
            <ChevronIcon />
          </span>
        </div>
      </div>
    </div>
  );
}

function FinlayerMark({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      aria-hidden
      className={className}
    >
      <path d="M5 18c3.5-2.2 5.8-5.4 6.8-9.2" />
      <path d="M9.5 19c3.2-2 5.4-4.8 6.5-8.4" />
      <path d="M14.2 19.5c2.8-1.6 4.8-4 5.8-7.2" />
    </svg>
  );
}

function BrandWordmark({ label }) {
  return (
    <span className="fl-brand-text" aria-label={label}>
      {label}
    </span>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="fl-ico" aria-hidden>
      <path
        fill="currentColor"
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8.06-4.22-1.7-.3a6.8 6.8 0 0 0-.62-1.5l1-1.42-1.7-1.7-1.42 1a6.8 6.8 0 0 0-1.5-.62l-.3-1.7h-2.44l-.3 1.7a6.8 6.8 0 0 0-1.5.62l-1.42-1-1.7 1.7 1 1.42c-.26.47-.47.97-.62 1.5l-1.7.3v2.44l1.7.3c.15.53.36 1.03.62 1.5l-1 1.42 1.7 1.7 1.42-1c.47.26.97.47 1.5.62l.3 1.7h2.44l.3-1.7c.53-.15 1.03-.36 1.5-.62l1.42 1 1.7-1.7-1-1.42c.26-.47.47-.97.62-1.5l1.7-.3Z"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="fl-ico fl-ico-fill" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2c.7 0 2.3 1.7 3.1 5H8.9C9.7 5.7 11.3 4 12 4Zm-4.3 7a15 15 0 0 0 0 2h8.6a15 15 0 0 0 0-2H7.7ZM8.9 15h6.2c-.8 3.3-2.4 5-3.1 5s-2.3-1.7-3.1-5Z"
      />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg viewBox="0 0 24 24" className="fl-ico" aria-hidden>
      <path
        fill="currentColor"
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 12h8v1.5H8V12Zm0 3h8v1.5H8V15Zm0 3h5v1.5H8V18Z"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" className="fl-ico" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9 6 6 6-6 6"
      />
    </svg>
  );
}
