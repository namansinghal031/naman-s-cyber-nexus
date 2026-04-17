import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [clicked, setClicked] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = 0, my = 0, rx = 0, ry = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;

      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, input, textarea, [data-cursor]");
      if (interactive) {
        setHovering(true);
        const customLabel = interactive.getAttribute("data-cursor");
        setLabel(customLabel);
      } else {
        setHovering(false);
        setLabel(null);
      }
    };

    const animate = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    const raf = requestAnimationFrame(animate);

    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-[var(--neon-pink)] mix-blend-screen"
        style={{ boxShadow: "0 0 12px var(--neon-pink), 0 0 24px var(--neon-purple)" }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border transition-[width,height,background,border-color] duration-200 ease-out ${
          hovering ? "w-14 h-14 bg-[var(--neon-pink)]/10 border-[var(--neon-pink)]" : "w-9 h-9 bg-transparent border-[var(--neon-cyan)]/60"
        } ${clicked ? "scale-75" : "scale-100"}`}
        style={{
          backdropFilter: "invert(0.05)",
          boxShadow: hovering ? "0 0 30px var(--neon-pink)" : "0 0 15px var(--neon-cyan)",
        }}
      >
        {label && (
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-background bg-[var(--neon-pink)] px-2 py-0.5 rounded-full">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
