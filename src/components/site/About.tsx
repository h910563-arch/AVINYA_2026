import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ABOUT_PARAGRAPHS, FEST } from "@/lib/site-data";
import { Reveal } from "./Reveal";

export function About() {
  const [open, setOpen] = useState(false);

  return (
    <section id="about" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-6">Official Poster</p>
            <button
              onClick={() => setOpen(true)}
              className="group relative block w-full overflow-hidden rounded-[1.75rem] glass sheen glass-hover p-2 text-left"
            >
              <img
                src={FEST.bannerUrl}
                alt="अVINYA 2026 Official Banner"
                loading="lazy"
                className="w-full rounded-[1.4rem] object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]"
                style={{ transitionTimingFunction: "var(--ease-lux)" }}
              />
            </button>
            <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.28em] text-muted-foreground">
              Tap to Expand Banner
            </p>
          </Reveal>

          <div className="flex flex-col justify-center">
            {ABOUT_PARAGRAPHS.map((p, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <p
                  className={`text-[15.5px] leading-[1.95] ${
                    i === 0 ? "text-foreground/85" : "mt-7 text-muted-foreground"
                  }`}
                >
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="hairline mt-12 w-full" />
            </Reveal>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-6 backdrop-blur-2xl"
          >
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              src={FEST.bannerUrl}
              alt="अVINYA 2026 Official Banner"
              className="max-h-[86vh] w-auto rounded-2xl border border-white/12"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
