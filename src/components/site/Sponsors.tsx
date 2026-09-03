import { SPONSORS } from "@/lib/site-data";
import { Reveal, RevealText } from "./Reveal";

export function Sponsors() {
  const logos = [
    "/logo/66b21b1a0d87de951a125c3c.png",
    "/logo/AlteredSecurity-2048x594--1-.png",
    "/logo/DEVNOVATE.png",
    "/logo/IBlogo_light.png",
    "/logo/MAVERICK-BRANDS-PRIVATE-LIMITED-v1-230026.png",
    "/logo/UptoSkills.png",
    "/logo/gfg-gg-logo.png",
    "/logo/logo.png",
    "/logo/skillstory-text.png",
  ];

  const row = [...logos, ...logos, ...logos];

  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 font-display text-[clamp(2.2rem,6vw,4rem)] font-semibold sm:mb-14">
          <RevealText text="Community Partners & Sponsors" />
        </h2>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex w-max gap-16 px-6 items-center" style={{ animation: "marquee 30s linear infinite" }}>
          {row.map((src, i) => (
            <div 
              key={`${src}-${i}`}
              className="flex items-center justify-center h-20 md:h-24 px-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 shadow-[0_4px_30px_rgba(255,255,255,0.2)] transition-transform duration-300 hover:scale-110 hover:-translate-y-1 hover:bg-white/60"
            >
              <img
                src={src}
                alt="Sponsor Logo"
                className="h-10 md:h-12 w-auto object-contain drop-shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
