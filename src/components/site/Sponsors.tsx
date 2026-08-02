import { SPONSORS } from "@/lib/site-data";
import { Reveal } from "./Reveal";

export function Sponsors() {
  const row = [...SPONSORS, ...SPONSORS];

  return (
    <section className="relative py-24 sm:py-32">
      <Reveal>
        <p className="eyebrow mb-10 text-center">Presented in partnership with</p>
      </Reveal>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex w-max gap-14 px-6" style={{ animation: "marquee 46s linear infinite" }}>
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-display text-lg font-medium tracking-tight text-foreground/35 transition-colors duration-700 hover:text-foreground/80 sm:text-xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
