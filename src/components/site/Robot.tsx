import { useEffect, useRef, useState } from "react";

/** Premium companion: brushed-metal shell, soft idle breathing, eyes that follow the pointer. */
export function Robot({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      setPupil({
        x: Math.max(-1, Math.min(1, dx)) * 5,
        y: Math.max(-1, Math.min(1, dy)) * 3.4,
      });
      setTilt({
        x: Math.max(-1, Math.min(1, dy)) * -5,
        y: Math.max(-1, Math.min(1, dx)) * 7,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={wrap} className={className} style={{ perspective: "1000px" }}>
      <div style={{ animation: "robot-hover 11s var(--ease-lux) infinite" }}>
      <div
        className="relative transition-transform duration-[900ms]"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transitionTimingFunction: "var(--ease-lux)",
          animation: "breathe 6.5s ease-in-out infinite",
        }}
      >

        <svg viewBox="0 0 240 260" className="h-full w-full" role="img" aria-label="Avinya companion robot">
          <defs>
            <linearGradient id="shell" x1="0" y1="0" x2="0.4" y2="1">
              <stop offset="0%" stopColor="oklch(0.42 0.012 265)" />
              <stop offset="45%" stopColor="oklch(0.27 0.012 265)" />
              <stop offset="100%" stopColor="oklch(0.19 0.012 265)" />
            </linearGradient>
            <linearGradient id="visor" x1="0" y1="0" x2="0.2" y2="1">
              <stop offset="0%" stopColor="oklch(0.24 0.03 265)" />
              <stop offset="100%" stopColor="oklch(0.13 0.02 265)" />
            </linearGradient>
            <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(1 0 0 / 45%)" />
              <stop offset="60%" stopColor="oklch(1 0 0 / 6%)" />
              <stop offset="100%" stopColor="oklch(1 0 0 / 18%)" />
            </linearGradient>
            <radialGradient id="eyeGlow">
              <stop offset="0%" stopColor="oklch(0.9 0.09 240)" />
              <stop offset="60%" stopColor="oklch(0.72 0.15 252)" />
              <stop offset="100%" stopColor="oklch(0.5 0.12 258 / 0%)" />
            </radialGradient>
            <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          {/* floor light */}
          <ellipse cx="120" cy="240" rx="66" ry="10" fill="oklch(0.72 0.15 252 / 22%)" filter="url(#soft)" />

          {/* body */}
          <rect x="72" y="150" width="96" height="72" rx="30" fill="url(#shell)" stroke="url(#rim)" strokeWidth="1.2" />
          <rect x="96" y="176" width="48" height="6" rx="3" fill="oklch(1 0 0 / 8%)" />

          {/* neck */}
          <rect x="108" y="138" width="24" height="20" rx="8" fill="oklch(0.23 0.012 265)" />

          {/* head */}
          <rect x="52" y="42" width="136" height="104" rx="42" fill="url(#shell)" stroke="url(#rim)" strokeWidth="1.4" />

          {/* visor */}
          <rect x="70" y="62" width="100" height="64" rx="30" fill="url(#visor)" stroke="oklch(1 0 0 / 12%)" />

          {/* eyes */}
          <g style={{ transform: `translate(${pupil.x}px, ${pupil.y}px)`, transition: "transform 500ms var(--ease-lux)" }}>
            <circle cx="100" cy="94" r="16" fill="url(#eyeGlow)" opacity="0.55" />
            <circle cx="140" cy="94" r="16" fill="url(#eyeGlow)" opacity="0.55" />
            <g style={{ transformOrigin: "120px 94px", animation: "blink 7s ease-in-out infinite" }}>
              <circle cx="100" cy="94" r="7" fill="oklch(0.97 0.02 240)" />
              <circle cx="140" cy="94" r="7" fill="oklch(0.97 0.02 240)" />
            </g>
          </g>

          {/* visor highlight */}
          <path d="M78 74 Q104 58 150 66" stroke="oklch(1 0 0 / 20%)" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* antenna */}
          <line x1="120" y1="42" x2="120" y2="24" stroke="oklch(0.5 0.01 265)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="120" cy="19" r="6" fill="oklch(0.72 0.15 252)" opacity="0.9" />
          <circle cx="120" cy="19" r="12" fill="oklch(0.72 0.15 252 / 30%)" filter="url(#soft)" />

          {/* arms */}
          <rect x="52" y="160" width="16" height="44" rx="8" fill="oklch(0.24 0.012 265)" stroke="oklch(1 0 0 / 8%)" />
          <rect
            x="172"
            y="160"
            width="16"
            height="44"
            rx="8"
            fill="oklch(0.24 0.012 265)"
            stroke="oklch(1 0 0 / 8%)"
            style={{ transformOrigin: "180px 166px", animation: "arm-wave 9s ease-in-out infinite" }}
          />
        </svg>

        {/* soft key light */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--azure) 26%, transparent), transparent)",
          }}
        />
      </div>
      </div>
    </div>
  );

}
