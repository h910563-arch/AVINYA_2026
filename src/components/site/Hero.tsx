import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FEST, HERO_INTRO, THEME_WEB } from "@/lib/site-data";
import { MagneticButton } from "./MagneticButton";
import { Robot } from "./Robot";
import { WebSlinger } from "./WebSlinger";
import { HeroField } from "./HeroField";
import { RevealText } from "./Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;
const UNITS = ["Days", "Hrs", "Min", "Sec"] as const;

function useCountdown(target: string) {
  const [parts, setParts] = useState<number[] | null>(null);
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, new Date(target).getTime() - Date.now());
      const s = Math.floor(diff / 1000);
      setParts([
        Math.floor(s / 86400),
        Math.floor((s % 86400) / 3600),
        Math.floor((s % 3600) / 60),
        s % 60,
      ]);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return parts;
}

export function Hero() {
  const parts = useCountdown(FEST.targetDate);

  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] items-center px-6 pt-32 pb-12 sm:pb-16"
    >
      <HeroField />

      {/* floating glass objects */}
      <div
        className="pointer-events-none absolute right-[26%] top-[14%] -z-10 hidden h-28 w-28 rounded-[2.2rem] border border-white/10 bg-white/4 backdrop-blur-2xl xl:block"
        style={{ animation: "float-soft 12s ease-in-out infinite", transform: "rotate(-12deg)" }}
      />
      <div
        className="pointer-events-none absolute right-[6%] bottom-[10%] -z-10 hidden h-28 w-28 rounded-full border border-white/10 bg-white/4 backdrop-blur-2xl lg:block"
        style={{ animation: "float-soft 16s ease-in-out infinite 1.5s" }}
      />

      <div
        className={`mx-auto grid w-full max-w-6xl items-center gap-16 ${
          !THEME_WEB ? "lg:grid-cols-[1.25fr_0.75fr]" : "lg:grid-cols-[1.2fr_0.8fr]"
        }`}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className={`mb-6 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 backdrop-blur-xl ${
              THEME_WEB
                ? "border-[#2f6bff]/30 bg-[#080e24]/70 shadow-[0_0_15px_rgba(47,107,255,0.25)]"
                : "border-white/10 bg-white/5"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                THEME_WEB ? "bg-[#e62429] shadow-[0_0_8px_#e62429]" : "bg-azure"
              }`}
              style={{ animation: "twinkle 2.4s ease-in-out infinite" }}
            />

            <span className="eyebrow !text-[10.5px] !tracking-[0.28em] text-foreground/80">
              {FEST.tagline}
            </span>
          </motion.div>

          <h1 className="text-[clamp(2.75rem,9.5vw,8.5rem)] font-semibold break-words leading-none">
            <RevealText
              text={FEST.name}
              wordClassName={THEME_WEB ? "text-lux glitch-title" : "text-lux"}
            />
          </h1>

          {THEME_WEB && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: EASE }}
              className="mt-3 font-mono text-[11px] sm:text-[13px] tracking-[0.15em] sm:tracking-[0.2em] text-[#9aa4c8] flex items-center gap-2 uppercase leading-snug"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#e62429] shadow-[0_0_8px_#e62429] shrink-0" />
              Swing into the future. Get caught in the web of innovation.
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.45, ease: EASE }}
            className="mt-5 sm:mt-6 max-w-xl text-[14.5px] sm:text-[15px] leading-[1.85] text-[#9aa4c8]"
          >
            {HERO_INTRO}
          </motion.p>

          {/* countdown */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-8"
          >
            <div className="grid flex-1 min-w-[260px] max-w-[400px] grid-cols-4 gap-2 sm:gap-3">
              {UNITS.map((unit, i) => (
                <div
                  key={unit}
                  className={`${
                    THEME_WEB ? "glass-web" : "glass"
                  } sheen glass-hover rounded-xl sm:rounded-2xl px-1.5 py-4 sm:px-2 sm:py-5 text-center`}
                >
                  <div className="font-display text-[clamp(1.4rem,4.4vw,2.4rem)] font-semibold tabular-nums tracking-tight">
                    {parts ? String(parts[i]).padStart(2, "0") : "--"}
                  </div>
                  <div className="mt-1.5 sm:mt-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.28em] text-muted-foreground">
                    {unit}
                  </div>
                </div>
              ))}
            </div>

            <div className="font-display text-base sm:text-xl font-bold tracking-widest text-white/40 uppercase whitespace-nowrap">
              to <span className="text-white/80">FINALE</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.75, ease: EASE }}
            className="mt-3 py-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4"
          >
            <MagneticButton href={FEST.registerUrl}>Register Now</MagneticButton>
            <MagneticButton href={FEST.eventsUrl} variant="ghost">
              Explore Events
            </MagneticButton>
            <MagneticButton href="#timeline" variant="ghost">
              Click for the Timeline & Never Miss the Opportunity
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.1 }}
            className="mt-12 sm:mt-14 flex items-center gap-3"
          >
            <span className="relative block h-9 w-px overflow-hidden bg-white/12">
              <span
                className={`absolute inset-x-0 h-3 ${THEME_WEB ? "bg-[#e62429]" : "bg-azure"}`}
                style={{ animation: "scan 2.6s ease-in-out infinite" }}
              />
            </span>
            <span className="eyebrow">Scroll to Enter</span>
          </motion.div>
        </div>

        {/* Right companion column: WebSlinger in web theme, Robot in cosmic theme */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
          className={`relative mx-auto ${
            THEME_WEB
              ? "w-[280px] sm:w-[380px] md:w-[440px] lg:w-full lg:max-w-[480px] xl:max-w-[520px]"
              : "w-[240px] sm:w-[300px] lg:w-full lg:max-w-[340px]"
          }`}
        >
          {THEME_WEB ? (
            <WebSlinger className="h-auto w-full" />
          ) : (
            <>
              <div
                className="pointer-events-none absolute inset-6 -z-10 rounded-full glow-pulse"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--azure) 38%, transparent), transparent 68%)",
                }}
              />
              <div style={{ animation: "tilt-soft 14s ease-in-out infinite" }}>
                <Robot className="h-auto w-full" />
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
