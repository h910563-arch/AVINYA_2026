import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { TIMELINE } from "@/lib/site-data";
import { Reveal, RevealText, revealVariant } from "./Reveal";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 24, mass: 0.6 });

  return (
    <section id="timeline" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-16 font-display text-[clamp(2.2rem,6vw,4rem)] font-semibold">
          <RevealText text="The Sequence" />
        </h2>

        <div ref={ref} className="relative pl-8 sm:pl-14">
          <div className="absolute left-[3px] top-2 h-full w-px bg-white/8 sm:left-[27px]" />
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-[3px] top-2 h-full w-px bg-gradient-to-b from-azure via-violet to-transparent sm:left-[27px]"
          />

          {TIMELINE.map((item, i) => (
            <Reveal key={item.phase} delay={i * 0.06} variant={revealVariant(i * 3)} className="relative pb-14 last:pb-0">
              <span className="absolute -left-8 top-2 h-[7px] w-[7px] rounded-full bg-silver shadow-[0_0_0_5px_oklch(0.72_0.15_252/14%)] sm:-left-[46px]" />
              <p className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-muted-foreground">
                {item.phase} · {item.meta}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold sm:text-[1.75rem]">
                {item.title}
              </h3>
              <p className="mt-3 max-w-xl text-[15px] leading-[1.85] text-muted-foreground">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
