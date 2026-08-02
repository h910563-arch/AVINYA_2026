import { useRef, useState } from "react";
import { FEST } from "@/lib/site-data";
import { useSiteContent, } from "@/lib/site-content-context";
import type { EventItem } from "@/lib/site-content";
import { Reveal, RevealText, revealVariant } from "./Reveal";

function EventCard({ event, index }: { event: EventItem; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [style, setStyle] = useState({ rx: 0, ry: 0, lx: 50, ly: 50, on: false });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setStyle({ rx: (0.5 - py) * 6, ry: (px - 0.5) * 8, lx: px * 100, ly: py * 100, on: true });
  };

  return (
    <Reveal delay={index * 0.1} variant={revealVariant(index)}>
      <article
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={() => setStyle((s) => ({ ...s, rx: 0, ry: 0, on: false }))}
        className="glass sheen group relative h-full overflow-hidden rounded-[1.75rem] transition-[box-shadow,border-color] duration-700"
        style={{
          transform: `perspective(1100px) rotateX(${style.rx}deg) rotateY(${style.ry}deg)`,
          transition: "transform 700ms var(--ease-lux), box-shadow 700ms var(--ease-lux)",
          boxShadow: style.on ? "var(--shadow-lift)" : "var(--shadow-soft)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `radial-gradient(340px circle at ${style.lx}% ${style.ly}%, oklch(1 0 0 / 8%), transparent 65%)`,
          }}
        />

        <div className="relative overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="h-52 w-full object-cover opacity-70 transition-[transform,opacity] duration-[1400ms] group-hover:scale-[1.06] group-hover:opacity-90"
            style={{ transitionTimingFunction: "var(--ease-lux)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <span className="absolute left-5 top-5 rounded-full border border-white/12 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] backdrop-blur-xl">
            {event.category}
          </span>
        </div>

        <div className="relative z-10 px-6 pb-7 pt-1">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold">{event.title}</h3>
            <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground">
              {event.date}
            </span>
          </div>
          <p className="mt-4 text-[14px] leading-[1.8] text-muted-foreground">{event.description}</p>
          <div className="hairline my-6" />
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {event.venue}
            </span>
            <a
              href={FEST.registerUrl}
              className="text-[13px] font-medium tracking-tight text-foreground transition-opacity duration-500 hover:opacity-70"
            >
              Register →
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Events() {
  const { events: EVENTS } = useSiteContent();
  return (
    <section id="events" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2.2rem,6vw,4rem)] font-semibold">
            <RevealText text="Flagship Events" />
          </h2>
          <Reveal delay={0.2}>
            <a
              href={FEST.eventsUrl}
              className="group inline-flex items-center gap-2 text-[13.5px] text-muted-foreground transition-colors duration-500 hover:text-foreground"
            >
              View all events
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((e, i) => (
            <EventCard key={e.title} event={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
