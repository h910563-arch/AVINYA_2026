/** Moving light field behind the hero: rising sparks, a slow light sweep and orbiting glass dots. */

const SPARKS = [
  { left: "8%", delay: 0, dur: 15, size: 3, o: 0.5 },
  { left: "17%", delay: 4.5, dur: 19, size: 2, o: 0.38 },
  { left: "26%", delay: 8, dur: 13, size: 4, o: 0.42 },
  { left: "34%", delay: 2.2, dur: 21, size: 2, o: 0.32 },
  { left: "45%", delay: 10.5, dur: 16, size: 3, o: 0.45 },
  { left: "56%", delay: 6, dur: 18, size: 2, o: 0.3 },
  { left: "64%", delay: 13, dur: 14, size: 4, o: 0.4 },
  { left: "73%", delay: 1.4, dur: 20, size: 2, o: 0.34 },
  { left: "82%", delay: 9.2, dur: 17, size: 3, o: 0.44 },
  { left: "91%", delay: 5.1, dur: 22, size: 2, o: 0.28 },
];

export function HeroField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* rising sparks */}
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

      {/* slow light sweep */}
      <div
        className="absolute inset-y-0 w-[38%] blur-3xl"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--azure) 14%, transparent), transparent)",
          animation: "sweep 18s var(--ease-lux) infinite",
        }}
      />
      <div
        className="absolute inset-y-0 w-[26%] blur-3xl"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--violet) 16%, transparent), transparent)",
          animation: "sweep 26s var(--ease-lux) 6s infinite",
        }}
      />

      {/* orbiting glass dots */}
      <div className="absolute right-[16%] top-[46%] hidden lg:block">
        <span
          className="absolute block h-2.5 w-2.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-md"
          style={{ ["--orbit-r" as string]: "190px", animation: "orbit 28s linear infinite" }}
        />
        <span
          className="absolute block h-1.5 w-1.5 rounded-full bg-cyan/70"
          style={{
            ["--orbit-r" as string]: "250px",
            animation: "orbit 44s linear reverse infinite",
          }}
        />
      </div>
    </div>
  );
}
