/** Decorative UFOs slowly cruising across the background with pulsing tractor beams. */

type Ship = {
  top: string;
  scale: number;
  dur: number;
  delay: number;
  hue: string;
  reverse?: boolean;
  opacity: number;
};

const SHIPS: Ship[] = [
  { top: "14%", scale: 1, dur: 52, delay: 0, hue: "var(--azure)", opacity: 0.75 },
  {
    top: "38%",
    scale: 0.62,
    dur: 74,
    delay: 12,
    hue: "var(--violet)",
    reverse: true,
    opacity: 0.5,
  },
  { top: "66%", scale: 0.8, dur: 64, delay: 26, hue: "var(--cyan)", opacity: 0.55 },
];

function Saucer({ hue, uid }: { hue: string; uid: number }) {
  return (
    <svg viewBox="0 0 160 92" className="h-auto w-[130px]" aria-hidden="true">
      <defs>
        <linearGradient id={`hull-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.55 0.015 265)" />
          <stop offset="55%" stopColor="oklch(0.3 0.015 265)" />
          <stop offset="100%" stopColor="oklch(0.2 0.015 265)" />
        </linearGradient>
        <radialGradient id={`dome-${uid}`}>
          <stop offset="0%" stopColor={`color-mix(in oklab, ${hue} 70%, white)`} />
          <stop offset="100%" stopColor={`color-mix(in oklab, ${hue} 40%, transparent)`} />
        </radialGradient>
      </defs>

      {/* tractor beam */}
      <path
        d="M62 58 L98 58 L124 92 L36 92 Z"
        fill={`color-mix(in oklab, ${hue} 26%, transparent)`}
        style={{ animation: "beam-pulse 4.5s ease-in-out infinite" }}
      />

      {/* dome */}
      <path d="M56 42 A24 22 0 0 1 104 42 Z" fill={`url(#dome-${uid})`} opacity="0.85" />
      <ellipse cx="72" cy="32" rx="7" ry="4" fill="oklch(1 0 0 / 35%)" />

      {/* hull */}
      <ellipse
        cx="80"
        cy="48"
        rx="62"
        ry="14"
        fill={`url(#hull-${uid})`}
        stroke="oklch(1 0 0 / 22%)"
        strokeWidth="1"
      />
      <ellipse cx="80" cy="45" rx="52" ry="7" fill="oklch(1 0 0 / 6%)" />

      {/* lights */}
      {[30, 52, 80, 108, 130].map((cx, i) => (
        <circle
          key={cx}
          cx={cx}
          cy="53"
          r="3.2"
          fill={hue}
          style={{ animation: `twinkle ${1.6 + i * 0.25}s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </svg>
  );
}

export function Ufos() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {SHIPS.map((s, i) => (
        <div
          key={i}
          className="absolute left-0 will-change-transform"
          style={{
            top: s.top,
            opacity: s.opacity,
            transform: `scale(${s.scale})`,
            animation: `ufo-cruise ${s.dur}s linear ${s.delay}s infinite${s.reverse ? " reverse" : ""}`,
          }}
        >
          <div style={{ animation: `ufo-bob ${7 + i * 2}s ease-in-out infinite` }}>
            <Saucer hue={s.hue} uid={i} />
          </div>
        </div>
      ))}
    </div>
  );
}
