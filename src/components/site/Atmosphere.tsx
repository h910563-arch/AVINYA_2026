import { useEffect, useRef } from "react";
import { THEME_WEB } from "@/lib/site-data";
import { StarField } from "./StarField";
import { Ufos } from "./Ufos";

// Living environment: Spider Web Night Theme & cosmic fallback
export function Atmosphere() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight * 0.35;
    let cx = tx;
    let cy = ty;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      cx += (tx - cx) * 0.045;
      cy += (ty - cy) * 0.045;
      if (glow.current) {
        glow.current.style.transform = `translate3d(${cx - 340}px, ${cy - 340}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden md:grain">
      <div className="absolute inset-0 bg-background" />
      {THEME_WEB ? (
        /* ================= SPIDER WEB NIGHT ATMOSPHERE ================= */
        <>
          {/* Subtle geometric spider web pattern overlay across the viewport */}
          <div className="absolute inset-0 bg-web-pattern opacity-[0.38]" />

          {/* ══════════════════════════════════════════════════════════════
              LARGE SPIDER WEBS & NETS IN THE CORNERS & BACKGROUND
          ══════════════════════════════════════════════════════════════ */}
          {/* Top-Left Corner Spider Web */}
          <div className="pointer-events-none absolute top-0 left-0 h-[170px] w-[170px] sm:h-[280px] sm:w-[280px] md:h-[440px] md:w-[440px] opacity-[0.38] sm:opacity-[0.55] select-none">
            <svg
              viewBox="0 0 400 400"
              className="h-full w-full overflow-visible"
              fill="none"
              stroke="#2f6bff"
            >
              <defs>
                <filter id="corner-web-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.8" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g filter="url(#corner-web-glow)" strokeWidth="1.1" strokeOpacity="0.85">
                {/* Radial spokes from (0,0) */}
                <line x1="0" y1="0" x2="400" y2="40" stroke="#4a7fff" />
                <line x1="0" y1="0" x2="380" y2="110" />
                <line x1="0" y1="0" x2="340" y2="190" />
                <line x1="0" y1="0" x2="280" y2="280" stroke="#e62429" strokeOpacity="0.7" />
                <line x1="0" y1="0" x2="190" y2="340" />
                <line x1="0" y1="0" x2="110" y2="380" />
                <line x1="0" y1="0" x2="40" y2="400" stroke="#4a7fff" />

                {/* Concentric sagging web spirals */}
                {[50, 100, 160, 230, 310, 390].map((r, i) => (
                  <path
                    key={i}
                    d={`M ${r} 0 
                        Q ${r * 0.95} ${r * 0.18} ${r * 0.92} ${r * 0.28}
                        Q ${r * 0.85} ${r * 0.42} ${r * 0.78} ${r * 0.52}
                        Q ${r * 0.65} ${r * 0.68} ${r * 0.55} ${r * 0.75}
                        Q ${r * 0.42} ${r * 0.85} ${r * 0.28} ${r * 0.92}
                        Q ${r * 0.18} ${r * 0.95} 0 ${r}`}
                    stroke={i % 2 === 0 ? "#4a7fff" : "#7aaaff"}
                    strokeWidth={i === 2 || i === 4 ? "1.4" : "0.9"}
                    strokeOpacity={0.75}
                    fill="none"
                  />
                ))}

                {/* Light nodes / dew points at intersections */}
                {[
                  [70, 18], [140, 38], [220, 60], [300, 80],
                  [50, 50], [110, 110], [180, 180], [250, 250],
                  [18, 70], [38, 140], [60, 220], [80, 300]
                ].map(([cx, cy], idx) => (
                  <circle
                    key={idx}
                    cx={cx}
                    cy={cy}
                    r={idx % 3 === 0 ? "2.5" : "1.8"}
                    fill={idx % 2 === 0 ? "#ffffff" : "#4a7fff"}
                    filter="drop-shadow(0 0 4px #2f6bff)"
                  />
                ))}
              </g>
            </svg>
          </div>

          {/* Top-Right Corner Spider Web */}
          <div className="pointer-events-none absolute top-0 right-0 h-[150px] w-[150px] sm:h-[260px] sm:w-[260px] md:h-[400px] md:w-[400px] opacity-[0.32] sm:opacity-[0.5] select-none">
            <svg
              viewBox="0 0 400 400"
              className="h-full w-full overflow-visible"
              fill="none"
              stroke="#2f6bff"
            >
              <g strokeWidth="1" strokeOpacity="0.8">
                {/* Radial spokes from (400,0) */}
                <line x1="400" y1="0" x2="0" y2="40" stroke="#4a7fff" />
                <line x1="400" y1="0" x2="20" y2="120" />
                <line x1="400" y1="0" x2="60" y2="200" stroke="#e62429" strokeOpacity="0.6" />
                <line x1="400" y1="0" x2="120" y2="280" />
                <line x1="400" y1="0" x2="210" y2="340" />
                <line x1="400" y1="0" x2="290" y2="380" />
                <line x1="400" y1="0" x2="360" y2="400" stroke="#4a7fff" />

                {/* Concentric sagging web spirals */}
                {[60, 120, 190, 270, 360].map((r, i) => (
                  <path
                    key={i}
                    d={`M ${400 - r} 0 
                        Q ${400 - r * 0.95} ${r * 0.2} ${400 - r * 0.9} ${r * 0.3}
                        Q ${400 - r * 0.8} ${r * 0.45} ${400 - r * 0.72} ${r * 0.55}
                        Q ${400 - r * 0.6} ${r * 0.7} ${400 - r * 0.5} ${r * 0.78}
                        Q ${400 - r * 0.35} ${r * 0.88} ${400 - r * 0.2} ${r * 0.93}
                        Q ${400 - r * 0.1} ${r * 0.98} 400 ${r}`}
                    stroke={i % 2 === 0 ? "#4a7fff" : "#e62429"}
                    strokeWidth="1.1"
                    strokeOpacity={0.7}
                    fill="none"
                  />
                ))}

                {/* Dew nodes */}
                {[
                  [320, 25], [240, 50], [160, 80],
                  [340, 80], [280, 140], [210, 200],
                  [370, 140], [330, 220], [280, 290]
                ].map(([cx, cy], idx) => (
                  <circle
                    key={idx}
                    cx={cx}
                    cy={cy}
                    r="2"
                    fill="#ffffff"
                    filter="drop-shadow(0 0 3px #4a7fff)"
                  />
                ))}
              </g>
            </svg>
          </div>

          {/* Bottom-Right Corner Spider Web Net */}
          <div className="pointer-events-none absolute bottom-0 right-0 h-[140px] w-[140px] sm:h-[240px] sm:w-[240px] md:h-[300px] md:w-[300px] opacity-[0.28] sm:opacity-[0.45] select-none">
            <svg
              viewBox="0 0 300 300"
              className="h-full w-full overflow-visible"
              fill="none"
              stroke="#2f6bff"
            >
              <g strokeWidth="0.95" strokeOpacity="0.75">
                <line x1="300" y1="300" x2="0" y2="270" stroke="#4a7fff" />
                <line x1="300" y1="300" x2="30" y2="180" />
                <line x1="300" y1="300" x2="90" y2="100" stroke="#e62429" strokeOpacity="0.5" />
                <line x1="300" y1="300" x2="170" y2="40" />
                <line x1="300" y1="300" x2="260" y2="0" stroke="#4a7fff" />

                {[50, 110, 180, 250].map((r, i) => (
                  <path
                    key={i}
                    d={`M ${300 - r} 300
                        Q ${300 - r * 0.9} ${300 - r * 0.25} ${300 - r * 0.75} ${300 - r * 0.5}
                        Q ${300 - r * 0.5} ${300 - r * 0.75} ${300 - r * 0.25} ${300 - r * 0.9}
                        Q ${300 - r * 0.1} ${300 - r * 0.98} 300 ${300 - r}`}
                    stroke="#4a7fff"
                    strokeWidth="1"
                    strokeOpacity="0.7"
                    fill="none"
                  />
                ))}
              </g>
            </svg>
          </div>

          {/* Sagging Diagonal Spider Web Cables spanning the screen */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.28]">
            <path
              d="M0 180 Q35vw 340 100vw 220"
              stroke="rgba(74, 127, 255, 0.45)"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="8 6"
            />
            <path
              d="M0 65vh Q55vw 85vh 100vw 60vh"
              stroke="rgba(230, 36, 41, 0.35)"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="10 8"
            />
          </svg>

          {/* Spider Red deep ambient glow (top left) */}
          <div
            className="absolute -top-[25%] left-[-15%] h-[85vw] w-[85vw] rounded-full opacity-[0.42] will-change-transform"
            style={{
              background:
                "radial-gradient(circle at 45% 45%, rgba(230, 36, 41, 0.42), transparent 64%)",
              animation: "drift-a 38s ease-in-out infinite",
            }}
          />

          {/* Electric Blue ambient glow (mid right) */}
          <div
            className="absolute top-[18%] right-[-20%] h-[75vw] w-[75vw] rounded-full opacity-[0.38] will-change-transform"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(47, 107, 255, 0.45), transparent 66%)",
              animation: "drift-b 48s ease-in-out infinite",
            }}
          />

          {/* Deep Navy/Crimson horizon glow (bottom) */}
          <div
            className="absolute bottom-[-20%] left-[10%] h-[70vw] w-[70vw] rounded-full opacity-[0.3] will-change-transform"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(230, 36, 41, 0.28), transparent 65%)",
              animation: "drift-c 60s ease-in-out infinite",
            }}
          />

          {/* Subtle vertical light sweeps (night city searchlight style) */}
          <div
            className="hidden lg:block absolute inset-x-0 top-[-20%] h-[140%] opacity-[0.08] will-change-transform"
            style={{
              background:
                "repeating-linear-gradient(105deg, transparent 0 100px, rgba(47, 107, 255, 0.15) 100px 103px, transparent 103px 240px)",
              animation: "drift-c 72s ease-in-out infinite",
            }}
          />

          {/* Interactive pointer light in spider blue/white */}
          <div
            ref={glow}
            className="hidden md:block absolute h-[680px] w-[680px] rounded-full opacity-[0.32] will-change-transform"
            style={{
              background:
                "radial-gradient(circle, rgba(47, 107, 255, 0.25), rgba(230, 36, 41, 0.12) 40%, transparent 68%)",
            }}
          />

          {/* Dark edge vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 0%, transparent 35%, rgba(5, 7, 16, 0.75) 100%)",
            }}
          />
        </>
      ) : (
        /* ================= LEGACY COSMIC ATMOSPHERE ================= */
        <>
          <StarField />
          <div className="hidden lg:block"><Ufos /></div>

          <div className="hidden lg:block">
            <div
              className="absolute -top-[30%] left-[-15%] h-[80vw] w-[80vw] rounded-full opacity-[0.5] will-change-transform"
              style={{
                background:
                  "radial-gradient(circle at 40% 40%, color-mix(in oklab, var(--azure) 55%, transparent), transparent 62%)",
                animation: "drift-a 34s ease-in-out infinite",
              }}
            />
            <div
              className="absolute top-[10%] right-[-20%] h-[70vw] w-[70vw] rounded-full opacity-[0.42] will-change-transform"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--violet) 55%, transparent), transparent 64%)",
                animation: "drift-b 46s ease-in-out infinite",
              }}
            />
            <div
              className="absolute bottom-[-25%] left-[20%] h-[65vw] w-[65vw] rounded-full opacity-[0.3] will-change-transform"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--cyan) 40%, transparent), transparent 66%)",
                animation: "drift-c 58s ease-in-out infinite",
              }}
            />
            <div
              className="absolute inset-x-0 top-[-20%] h-[140%] opacity-[0.14] will-change-transform"
              style={{
                background:
                  "repeating-linear-gradient(102deg, transparent 0 90px, oklch(1 0 0 / 5%) 90px 92px, transparent 92px 220px)",
                animation: "drift-c 70s ease-in-out infinite",
              }}
            />
          </div>

          <div className="block lg:hidden">
            <div
              className="absolute -top-[30%] left-[-15%] h-[80vw] w-[80vw] rounded-full opacity-[0.35]"
              style={{
                background:
                  "radial-gradient(circle at 40% 40%, color-mix(in oklab, var(--azure) 40%, transparent), transparent 62%)",
              }}
            />
            <div
              className="absolute top-[10%] right-[-20%] h-[70vw] w-[70vw] rounded-full opacity-[0.28]"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--violet) 40%, transparent), transparent 64%)",
              }}
            />
          </div>

          <div
            ref={glow}
            className="hidden md:block absolute h-[680px] w-[680px] rounded-full opacity-[0.35] will-change-transform"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--silver) 22%, transparent), transparent 62%)",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 0%, transparent 30%, oklch(0.1 0.01 265 / 60%) 100%)",
            }}
          />
        </>
      )}
    </div>
  );
}
