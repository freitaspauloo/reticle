import { useEffect, useRef } from "react";

export default function Stage({
  children,
  width = 1920,
  height = 1080,
  background,
  className = "",
}) {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const fit = () => {
      const sx = window.innerWidth / width;
      const sy = window.innerHeight / height;
      const scale = Math.min(sx, sy);
      stage.style.setProperty("--stage-scale", String(scale));
      stage.style.transform = `scale(${scale})`;
    };

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [width, height]);

  return (
    <div className={`viewport ${className}`.trim()} style={background ? { background } : undefined}>
      <div
        className="stage"
        ref={stageRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          ...(background ? { background } : null),
        }}
      >
        {children}
      </div>
    </div>
  );
}
