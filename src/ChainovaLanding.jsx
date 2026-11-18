import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./Chainova.css";

const PINK = "#D600BF";
const ILLUSTRATION_SRC =
  "https://aruyghvpjdiiuiesaupw.supabase.co/storage/v1/object/public/chainnova-hero/cn-hero-bg.png";

const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const NAV_LINKS = ["PORTFOLIO", "COMPANY", "CAREERS"];

const STATS = [
  { value: "98%", label: "DEFECT CAPTURE RATE" },
  { value: "6.2x", label: "FASTER REVIEW CYCLES" },
  { value: "40M+", label: "DIES CLASSIFIED DAILY" },
];

const BRANDS = ["TSMC", "ASML", "KLA", "Applied"];

/**
 * Blueprint-grid hero.
 * Preview: /blueprint
 */
export default function ChainovaLanding() {
  const rootRef = useRef(null);

  useEffect(() => {
    const nodes = [document.documentElement, document.body, document.getElementById("root")];
    nodes.forEach((node) => node?.classList.add("chainova-active"));
    const prevTitle = document.title;
    document.title = "Reticle — Built for Yield";

    return () => {
      nodes.forEach((node) => node?.classList.remove("chainova-active"));
      document.title = prevTitle;
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const hatches = ".ch-hatch";
      const headerBits = [".ch-logo", ".ch-nav", ".ch-header-cta"];
      const stats = gsap.utils.toArray(".ch-stat");
      const eyebrow = ".ch-eyebrow";
      const lines = gsap.utils.toArray(".ch-line-inner");
      const copy = [".ch-body", ".ch-actions"];
      const art = ".ch-art";
      const brands = ".ch-brand";
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set([headerBits, stats, eyebrow, copy, brands, hatches], { autoAlpha: 1, y: 0 });
        gsap.set(lines, { yPercent: 0 });
        gsap.set(art, { clipPath: "none" });
        return;
      }

      gsap.set(hatches, { autoAlpha: 0 });
      gsap.set(headerBits, { autoAlpha: 0, y: 8 });
      gsap.set(stats, { autoAlpha: 0, y: 8 });
      gsap.set(eyebrow, { autoAlpha: 0, y: 8 });
      gsap.set(lines, { yPercent: 118 });
      gsap.set(copy, { autoAlpha: 0, y: 10 });
      gsap.set(art, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(brands, { autoAlpha: 0, y: 8 });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(hatches, { autoAlpha: 1, duration: 0.9, stagger: 0.08 }, 0)
        .to(headerBits, { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.08 }, 0.06)
        .to(stats, { autoAlpha: 1, y: 0, duration: 0.95, stagger: 0.08 }, 0.2)
        .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.85 }, 0.32)
        .to(lines, { yPercent: 0, duration: 1.2, stagger: 0.12 }, 0.38)
        .to(art, { clipPath: "inset(0 0% 0 0)", duration: 1.25 }, 0.42)
        .to(copy, { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.08 }, 0.78)
        .to(brands, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06 }, 0.95);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="top" className="ch">
      <div className="ch-frame">
        <GridPlus edge="left" className="ch-plus-tl" />
        <GridPlus edge="right" className="ch-plus-tr" />
        <GridPlus edge="left" className="ch-plus-bl" />
        <GridPlus edge="right" className="ch-plus-br" />

        <header className="ch-header">
          <GridPlus edge="left" className="ch-plus-bl" />
          <GridPlus edge="right" className="ch-plus-br" />
          <a href="#top" className="ch-logo">
            Reticle
          </a>

          <div className="ch-header-cta">
            <a href="#start" className="ch-btn ch-btn-pink ch-btn-nav">
              <CtaCornerPluses tone="black" />
              Request Info
              <ArrowUpRight className="ch-icon" />
            </a>
          </div>

          <nav className="ch-nav" aria-label="Primary">
            {NAV_LINKS.map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`}>
                {label}
              </a>
            ))}
          </nav>
        </header>

        <div className="ch-stats-row">
          <GridPlus edge="left" className="ch-plus-bl" />
          <GridPlus edge="right" className="ch-plus-br" />
          <GridPlus edge="top" className="ch-split-plus ch-plus-split-top" />
          <GridPlus className="ch-split-plus ch-plus-split-bottom" />
          <div className="ch-hatch ch-stats-hatch" aria-hidden />
          <div className="ch-stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="ch-stat">
                <p className="ch-stat-value">{stat.value}</p>
                <p className="ch-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="ch-hero">
          <div className="ch-copy">
            <div className="ch-copy-inner">
              <span className="ch-eyebrow">We have classified 40 million dies this quarter</span>

              <h1 className="ch-title">
                <span className="ch-line">
                  <span className="ch-line-inner">Catch killer defects</span>
                </span>
                <span className="ch-line">
                  <span className="ch-line-inner">before they leave</span>
                </span>
                <span className="ch-line">
                  <span className="ch-line-inner">the line</span>
                </span>
              </h1>

              <p className="ch-body">
                Inspection models trained on real fab imagery across nodes, tools, and process
                steps — built for high-volume semiconductor manufacturing.
              </p>

              <div className="ch-actions">
                <a href="#portfolio" className="ch-btn ch-btn-soft ch-btn-hero">
                  <CtaCornerPluses tone="soft" />
                  See Portfolio
                </a>
                <a id="start" href="#start" className="ch-btn ch-btn-pink ch-btn-hero">
                  <CtaCornerPluses tone="black" />
                  Request Info
                  <ArrowUpRight className="ch-icon" />
                </a>
              </div>
            </div>
          </div>

          <div className="ch-art">
            <HeroDitherIllustration />
          </div>
        </div>

        <div className="ch-logos-row">
          <GridPlus edge="left" className="ch-plus-tl" />
          <GridPlus edge="right" className="ch-plus-tr" />
          <GridPlus className="ch-split-plus ch-plus-split-top" />
          <GridPlus edge="left" className="ch-plus-bl" />
          <GridPlus edge="right" className="ch-plus-br" />
          <GridPlus className="ch-split-plus ch-plus-split-bottom" />
          <div className="ch-logos">
            <div className="ch-logos-inner">
              {BRANDS.map((label) => (
                <span key={label} className="ch-brand">
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="ch-hatch ch-logos-hatch" aria-hidden />
        </div>

        <div className="ch-wire" aria-hidden>
          <GridPlus edge="bottom" className="ch-plus-split-bottom" />
          <div className="ch-wire-cell ch-wire-cell-rule" />
          <div className="ch-wire-cell" />
        </div>
      </div>
    </section>
  );
}

function CtaCornerPluses({ tone = "muted" }) {
  return (
    <span aria-hidden className="ch-cta-pluses">
      <GridPlus edge={["top", "left"]} tone={tone} className="ch-plus-tl" />
      <GridPlus edge={["top", "right"]} tone={tone} className="ch-plus-tr" />
      <GridPlus edge={["bottom", "left"]} tone={tone} className="ch-plus-bl" />
      <GridPlus edge={["bottom", "right"]} tone={tone} className="ch-plus-br" />
    </span>
  );
}

function GridPlus({ className = "", edge, tone = "muted" }) {
  const omit = new Set(Array.isArray(edge) ? edge : edge ? [edge] : []);
  const arm = `ch-plus-arm ch-plus-${tone}`;

  return (
    <span aria-hidden className={`ch-plus ${className}`.trim()}>
      {!omit.has("top") && <span className={`${arm} ch-plus-v ch-plus-v-top`} />}
      {!omit.has("bottom") && <span className={`${arm} ch-plus-v ch-plus-v-bottom`} />}
      {!omit.has("left") && <span className={`${arm} ch-plus-h ch-plus-h-left`} />}
      {!omit.has("right") && <span className={`${arm} ch-plus-h ch-plus-h-right`} />}
    </span>
  );
}

function HeroDitherIllustration({ cell = 3, dot = 1.7, src = ILLUSTRATION_SRC }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let dpr = 1;
    let width = 0;
    let height = 0;
    let pointerX = -9999;
    let pointerY = -9999;
    let targetX = -9999;
    let targetY = -9999;
    let hasPointer = false;
    let pixels = null;
    let drawRect = { dx: 0, dy: 0, drawW: 0, drawH: 0 };

    const shade = document.createElement("canvas");
    const shadeCtx = shade.getContext("2d", { willReadFrequently: true });
    if (!shadeCtx) return;

    const img = new window.Image();

    const layoutImage = () => {
      if (!img.naturalWidth || !img.naturalHeight || width < 1 || height < 1) {
        drawRect = { dx: 0, dy: 0, drawW: 0, drawH: 0 };
        return drawRect;
      }
      const scale = height / img.naturalHeight;
      const drawH = height;
      const drawW = Math.max(1, Math.round(img.naturalWidth * scale));
      const dx = Math.floor((width - drawW) / 2);
      const dy = 0;
      drawRect = { dx, dy, drawW, drawH };
      return drawRect;
    };

    const paintShade = () => {
      if (!img.complete || !img.naturalWidth || !img.naturalHeight || width < 1 || height < 1) {
        pixels = null;
        return;
      }

      const { dx, dy, drawW, drawH } = layoutImage();

      shade.width = width;
      shade.height = height;
      shadeCtx.setTransform(1, 0, 0, 1, 0, 0);
      shadeCtx.fillStyle = "#ffffff";
      shadeCtx.fillRect(0, 0, width, height);
      shadeCtx.imageSmoothingEnabled = true;
      shadeCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, dx, dy, drawW, drawH);

      try {
        pixels = shadeCtx.getImageData(0, 0, width, height).data;
      } catch {
        pixels = null;
      }
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      paintShade();
    };

    const render = () => {
      if (!running) return;
      pointerX += (targetX - pointerX) * 0.18;
      pointerY += (targetY - pointerY) * 0.18;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      if (img.complete && img.naturalWidth && drawRect.drawW > 0) {
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(
          img,
          0,
          0,
          img.naturalWidth,
          img.naturalHeight,
          drawRect.dx,
          drawRect.dy,
          drawRect.drawW,
          drawRect.drawH,
        );
      }

      if (!pixels) {
        raf = requestAnimationFrame(render);
        return;
      }

      const data = pixels;
      ctx.fillStyle = PINK;

      const disturbR = Math.min(width, height) * 0.3;
      const disturbR2 = disturbR * disturbR;
      const amp = disturbR * 0.24;
      const half = dot * 0.5;

      for (let y = cell * 0.5; y < height; y += cell) {
        for (let x = cell * 0.5; x < width; x += cell) {
          let sx = x;
          let sy = y;

          if (hasPointer) {
            const pdx = x - pointerX;
            const pdy = y - pointerY;
            const d2 = pdx * pdx + pdy * pdy;
            if (d2 < disturbR2 && d2 > 0.001) {
              const t = 1 - d2 / disturbR2;
              const falloff = t * t;
              const inv = (amp * falloff) / Math.sqrt(d2);
              sx = x + pdx * inv * 0.4;
              sy = y + pdy * inv * 0.4;
            }
          }

          const ix = Math.max(0, Math.min(width - 1, Math.round(sx)));
          const iy = Math.max(0, Math.min(height - 1, Math.round(sy)));
          const idx = (iy * width + ix) * 4;
          const r = data[idx] ?? 255;
          const g = data[idx + 1] ?? 255;
          const b = data[idx + 2] ?? 255;
          const a = data[idx + 3] ?? 255;
          if (a < 12) continue;

          const ink = Math.max(0, (Math.max(b, r) - g) / 255);
          const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
          const density = Math.min(1, Math.max(1 - lum, ink) * 1.25);
          if (density < 0.04) continue;

          const bx = Math.floor(x / cell) & 3;
          const by = Math.floor(y / cell) & 3;
          const threshold = ((BAYER4[by * 4 + bx] ?? 0) + 0.5) / 16;
          if (density < threshold * 0.9) continue;

          ctx.fillRect(x - half, y - half, dot, dot);
        }
      }

      raf = requestAnimationFrame(render);
    };

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      hasPointer = true;
    };
    const onLeave = () => {
      hasPointer = false;
      targetX = -9999;
      targetY = -9999;
    };

    const loadImage = (url) =>
      new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Illustration load failed"));
        img.crossOrigin = "anonymous";
        img.src = url;
      });

    void loadImage(src)
      .then(() => resize())
      .catch(() => resize());

    raf = requestAnimationFrame(render);

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onMove);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onMove);
    };
  }, [cell, dot, src]);

  return (
    <div ref={wrapRef} className="ch-art-clip" aria-label="Reticle dither isometric illustration">
      <canvas ref={canvasRef} className="ch-art-canvas" />
      <div className="ch-art-tint" aria-hidden />
    </div>
  );
}

function ArrowUpRight({ className }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
