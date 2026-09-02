import { useState } from "react";
import { FEST, getEventRegistrationUrl } from "@/lib/site-data";
import { useSiteContent, } from "@/lib/site-content-context";
import type { EventItem } from "@/lib/site-content";
import { Reveal, RevealText, revealVariant } from "./Reveal";

const FALLBACK_EVENT_IMAGE =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80";

function EventCard({ event, index }: { event: EventItem; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Reveal delay={index * 0.1} variant={revealVariant(index)}>
      <div
        className="perspective-1000 group h-[315px] sm:h-[330px] w-full cursor-pointer select-none"
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <div
          className={`transform-style-3d relative h-full w-full rounded-[1.5rem] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-y-180 ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ================= FRONT FACE ================= */}
          <article
            className="backface-hidden absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b0f17] p-3 shadow-[var(--shadow-soft)] transition-all duration-500 group-hover:border-azure/40 group-hover:shadow-[var(--shadow-lift)] sm:p-3.5"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
          >
            {/* Top glowing neon accent line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-80" />

            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden rounded-[1.5rem]">
              <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                onError={(event) => {
                  if (event.currentTarget.dataset["fallbackApplied"] === "true") return;
                  event.currentTarget.dataset["fallbackApplied"] = "true";
                  event.currentTarget.src = FALLBACK_EVENT_IMAGE;
                }}
                className="h-full w-full object-cover opacity-95 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/60" />
            </div>

            {/* FLOATING INNER BOX (FRONT - Transparent Highlighted Glass) */}
            <div className="relative z-10 flex flex-1 flex-col justify-between rounded-xl border border-white/25 bg-black/10 p-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-[1px] sm:p-4">
              <div>
                {/* Category */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/80 px-2.5 py-0.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.25)] backdrop-blur-md">
                    {event.category}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_10px_var(--color-cyan)]" />
                </div>

                {/* Title */}
                <h3 className="mt-2.5 font-display text-base font-extrabold uppercase tracking-wide text-white [text-shadow:_0_2px_8px_rgba(0,0,0,1),_0_0_20px_rgba(0,0,0,0.9)] sm:text-lg">
                  {event.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-1.5 font-sans text-[12px] font-medium leading-relaxed text-slate-100 [text-shadow:_0_1px_6px_rgba(0,0,0,1),_0_2px_4px_rgba(0,0,0,0.95)] line-clamp-2">
                  {event.description}
                </p>
              </div>

              {/* Venue badge */}
              <div className="mt-2 flex items-center gap-1.5 border-t border-white/15 pt-1.5">
                <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
                  {event.venue}
                </span>
              </div>
            </div>

            {/* Bottom Outer Card Footer (FRONT: Date on left, Register button on right) */}
            <div className="relative z-10 flex items-center justify-between gap-2 px-1 pt-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-950/80 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)] backdrop-blur-md whitespace-nowrap">
                <span className="text-[8px]">★</span>
                <span>{event.date}</span>
              </span>

              <a
                href={getEventRegistrationUrl(event.title) ?? "/register"}
                target={getEventRegistrationUrl(event.title) ? "_blank" : undefined}
                rel={getEventRegistrationUrl(event.title) ? "noopener noreferrer" : undefined}
                onClick={(e) => e.stopPropagation()}
                className="group/btn relative inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/15 px-3.5 py-1 text-[11.5px] font-bold text-white shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-azure/80 hover:bg-azure/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] active:scale-[0.98] whitespace-nowrap"
              >
                <span>Register</span>
                <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">→</span>
              </a>
            </div>
          </article>

          {/* ================= BACK FACE (FLIPPED - Full content, no scrollbar) ================= */}
          <article
            className="backface-hidden rotate-y-180 absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#0b0f17] p-3 shadow-[var(--shadow-lift)] transition-all duration-500 sm:p-3.5"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Top glowing neon accent line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet to-transparent opacity-80" />

            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden rounded-[1.5rem]">
              <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                onError={(event) => {
                  if (event.currentTarget.dataset["fallbackApplied"] === "true") return;
                  event.currentTarget.dataset["fallbackApplied"] = "true";
                  event.currentTarget.src = FALLBACK_EVENT_IMAGE;
                }}
                className="h-full w-full object-cover opacity-90 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-black/70" />
            </div>

            {/* FLOATING INNER BOX (BACK - Transparent Highlighted Glass) */}
            <div className="relative z-10 flex flex-1 flex-col justify-between rounded-xl border border-white/25 bg-black/15 p-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-[1px] sm:p-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/80 px-2.5 py-0.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.25)] backdrop-blur-md">
                    {event.category}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-violet shadow-[0_0_10px_var(--color-violet)]" />
                </div>

                <h3 className="mt-2 font-display text-sm font-extrabold uppercase tracking-wide text-white [text-shadow:_0_2px_8px_rgba(0,0,0,1),_0_0_20px_rgba(0,0,0,0.9)] sm:text-base">
                  {event.title}
                </h3>

                {/* Complete description text with bright contrast */}
                <p className="mt-1.5 font-sans text-[12px] font-medium leading-relaxed text-slate-100 [text-shadow:_0_1px_6px_rgba(0,0,0,1),_0_2px_4px_rgba(0,0,0,0.95)]">
                  {event.description}
                </p>
              </div>

              {/* Venue Tag */}
              <div className="mt-2 flex items-center gap-1.5 border-t border-white/15 pt-1.5">
                <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
                  {event.venue}
                </span>
              </div>
            </div>

            {/* Bottom Action Bar (FLIPPED: Date on left, Register on right) */}
            <div className="relative z-10 flex items-center justify-between gap-2 px-1 pt-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-950/80 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)] backdrop-blur-md whitespace-nowrap">
                <span className="text-[8px]">★</span>
                <span>{event.date}</span>
              </span>

              <a
                href={getEventRegistrationUrl(event.title) ?? "/register"}
                target={getEventRegistrationUrl(event.title) ? "_blank" : undefined}
                rel={getEventRegistrationUrl(event.title) ? "noopener noreferrer" : undefined}
                onClick={(e) => e.stopPropagation()}
                className="group/btn relative inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/15 px-3.5 py-1 text-[11.5px] font-bold text-white shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-azure/80 hover:bg-azure/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] active:scale-[0.98] whitespace-nowrap"
              >
                <span>Register</span>
                <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">→</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </Reveal>
  );
}

export function Events() {
  const { events: EVENTS } = useSiteContent();
  return (
    <section id="events" className="relative px-6 pt-14 pb-16 sm:pt-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2.2rem,6vw,4rem)] font-semibold">
            <RevealText text="Flagship Events" />
          </h2>
          <Reveal delay={0.2}>
            <a
              href={FEST.eventsUrl}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/20 bg-white/[0.08] px-5 py-2.5 text-[13.5px] font-medium text-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-azure/60 hover:bg-white/[0.14] hover:text-white hover:shadow-[0_0_25px_rgba(56,189,248,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)] active:scale-[0.98]"
            >
              {/* animated light sweep shine */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-[350%]"
              />
              <span className="relative z-10 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-azure shadow-[0_0_8px_var(--color-azure)]" />
                <span>View all events</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
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
