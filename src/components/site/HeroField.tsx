import { THEME_WEB } from "@/lib/site-data";

/** Constellation of web nodes: red/blue glowing nodes linked by thin web threads. */

const WEB_NODES = [
  { cx: "18%", cy: "22%", r: 3, color: "#e62429", glow: "rgba(230,36,41,0.6)" },
  { cx: "32%", cy: "15%", r: 2.5, color: "#2f6bff", glow: "rgba(47,107,255,0.6)" },
  { cx: "48%", cy: "28%", r: 3, color: "#e62429", glow: "rgba(230,36,41,0.6)" },
  { cx: "25%", cy: "42%", r: 2, color: "#2f6bff", glow: "rgba(47,107,255,0.6)" },
  { cx: "75%", cy: "20%", r: 3, color: "#2f6bff", glow: "rgba(47,107,255,0.6)" },
  { cx: "88%", cy: "35%", r: 3.5, color: "#e62429", glow: "rgba(230,36,41,0.6)" },
  { cx: "68%", cy: "48%", r: 2.5, color: "#2f6bff", glow: "rgba(47,107,255,0.6)" },
  { cx: "82%", cy: "62%", r: 2, color: "#e62429", glow: "rgba(230,36,41,0.6)" },
];

const WEB_THREADS = [
  { x1: "18%", y1: "22%", x2: "32%", y2: "15%" },
  { x1: "32%", y1: "15%", x2: "48%", y2: "28%" },
  { x1: "18%", y1: "22%", x2: "25%", y2: "42%" },
  { x1: "25%", y1: "42%", x2: "48%", y2: "28%" },
  { x1: "75%", y1: "20%", x2: "88%", y2: "35%" },
  { x1: "88%", y1: "35%", x2: "82%", y2: "62%" },
  { x1: "75%", y1: "20%", x2: "68%", y2: "48%" },
  { x1: "68%", y1: "48%", x2: "82%", y2: "62%" },
];

const SPARKS = [
  { left: "10%", delay: 0, dur: 14, size: 2.5, color: "#e62429", o: 0.5 },
  { left: "22%", delay: 3.5, dur: 18, size: 2, color: "#2f6bff", o: 0.4 },
  { left: "38%", delay: 7, dur: 13, size: 3, color: "#e62429", o: 0.45 },
  { left: "52%", delay: 1.5, dur: 20, size: 2, color: "#2f6bff", o: 0.35 },
  { left: "68%", delay: 9.5, dur: 15, size: 3, color: "#e62429", o: 0.45 },
  { left: "84%", delay: 4.8, dur: 17, size: 2, color: "#2f6bff", o: 0.35 },
];

export function HeroField() {
  if (!THEME_WEB) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {SPARKS.map((s, i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full bg-azure"
            style={{
              left: s.left,
              height: s.size,
              width: s.size,
              opacity: s.o,
              boxShadow: "0 0 12px color-mix(in oklab, var(--azure) 70%, transparent)",
              animation: `spark-rise ${s.dur}s linear ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Constellation SVG of interconnected web nodes */}
      <svg className="absolute inset-0 h-full w-full opacity-60">
        <defs>
          <linearGradient id="thread-grad-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e62429" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2f6bff" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="thread-grad-b" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2f6bff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#e62429" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* Thin web connecting threads */}
        {WEB_THREADS.map((th, i) => (
          <line
            key={`th-${i}`}
            x1={th.x1}
            y1={th.y1}
            x2={th.x2}
            y2={th.y2}
            stroke={i % 2 === 0 ? "url(#thread-grad-a)" : "url(#thread-grad-b)"}
            strokeWidth="0.8"
            strokeDasharray="2 3"
            className="animate-pulse"
            style={{ animationDuration: `${4 + i}s` }}
          />
        ))}

        {/* Web node points */}
        {WEB_NODES.map((n, i) => (
          <circle
            key={`node-${i}`}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill={n.color}
            style={{
              filter: `drop-shadow(0 0 6px ${n.glow})`,
            }}
          />
        ))}
      </svg>

      {/* Floating red and blue sparks */}
      {SPARKS.map((s, i) => (
        <span
          key={`spk-${i}`}
          className="absolute bottom-0 rounded-full"
          style={{
            left: s.left,
            height: s.size,
            width: s.size,
            backgroundColor: s.color,
            opacity: s.o,
            boxShadow: `0 0 10px ${s.color}`,
            animation: `spark-rise ${s.dur}s linear ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Subtle sweeping light in spider red & blue */}
      <div
        className="absolute inset-y-0 w-[30%] blur-3xl opacity-30"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(230, 36, 41, 0.22), transparent)",
          animation: "sweep 20s var(--ease-lux) infinite",
        }}
      />
      <div
        className="absolute inset-y-0 w-[24%] blur-3xl opacity-30"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(47, 107, 255, 0.22), transparent)",
          animation: "sweep 28s var(--ease-lux) 7s infinite",
        }}
      />
    </div>
  );
}
