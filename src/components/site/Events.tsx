import { useState } from "react";
import { FEST, getEventRegistrationUrl, THEME_WEB } from "@/lib/site-data";
import { useSiteContent } from "@/lib/site-content-context";
import type { EventItem } from "@/lib/site-content";
import { Reveal, RevealText, revealVariant } from "./Reveal";

const FALLBACK_EVENT_IMAGE =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80";

function EventCard({ event, index }: { event: EventItem; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Reveal delay={index * 0.08} variant={revealVariant(index)}>
      <div
        className="perspective-1000 group h-[340px] sm:h-[360px] w-full cursor-pointer select-none"
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <div
          className={`transform-style-3d relative h-full w-full rounded-[1.5rem] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:rotate-y-180 ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ================= FRONT FACE: POSTER SHOWCASE ================= */}
          <article
            className={`backface-hidden absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.5rem] p-3 sm:p-3.5 transition-all duration-500 ${
              THEME_WEB
                ? "glass-web border-[#2f6bff]/30 group-hover:border-[#e62429]/80 shadow-[0_10px_35px_rgba(0,0,0,0.7)] group-hover:shadow-[0_0_28px_rgba(230,36,41,0.35)]"
                : "border border-white/15 bg-[#0b0f17] shadow-[var(--shadow-soft)] group-hover:border-azure/60 group-hover:shadow-[var(--shadow-lift)]"
            }`}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
          >
            {/* Top glowing neon accent line */}
            <div
              className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${
                THEME_WEB ? "via-[#e62429]" : "via-cyan"
              } to-transparent opacity-90`}
            />

            {/* Poster Background Image */}
            <div className="absolute inset-0 overflow-hidden rounded-[1.5rem]">
              <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                onError={(e) => {
                  if (e.currentTarget.dataset["fallbackApplied"] === "true") return;
                  e.currentTarget.dataset["fallbackApplied"] = "true";
                  e.currentTarget.src = "/events/Turing Trial.jpeg";
                }}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-105"
              />
              {/* Subtle top & bottom gradients for readability while keeping the poster visible */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85" />
            </div>

            {/* Top Bar: Category badge on left, flip hint on right */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/50 bg-black/70 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)] backdrop-blur-md">
                {event.category}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white/80 backdrop-blur-md transition-colors group-hover:border-cyan/50 group-hover:text-cyan">
                <span>Details</span>
                <span className="text-[11px]">↻</span>
              </span>
            </div>

            {/* Middle spacer to keep the poster artwork completely clear */}
            <div className="flex-1" />

            {/* Bottom Glass Overlay Bar */}
            <div className="relative z-10 flex flex-col gap-2 rounded-2xl border border-white/20 bg-black/65 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-md">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white drop-shadow-md sm:text-base">
                    {event.title}
                  </h3>
                  {event.venue ? (
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-cyan-300/90 leading-snug">
                      📍 {event.venue}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-950/80 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)] backdrop-blur-md whitespace-nowrap">
                  <span className="text-[8px]">★</span>
                  <span>{event.date}</span>
                </span>

                <a
                  href={getEventRegistrationUrl(event.title) ?? "/register"}
                  target={getEventRegistrationUrl(event.title) ? "_blank" : undefined}
                  rel={getEventRegistrationUrl(event.title) ? "noopener noreferrer" : undefined}
                  onClick={(e) => e.stopPropagation()}
                  className="group/btn relative inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/20 px-3.5 py-1 text-[11px] font-bold text-white shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-azure/80 hover:bg-azure/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] active:scale-[0.98] whitespace-nowrap"
                >
                  <span>Register</span>
                  <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
                    →
                  </span>
                </a>
              </div>
            </div>
          </article>

          {/* ================= BACK FACE: EVENT DETAILS ================= */}
          <article
            className={`backface-hidden rotate-y-180 absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.5rem] p-3 sm:p-3.5 transition-all duration-500 ${
              THEME_WEB
                ? "glass-web border-[#2f6bff]/35 group-hover:border-[#e62429]/70 shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
                : "border border-white/20 bg-[#070a12] shadow-[var(--shadow-lift)]"
            }`}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Top glowing neon accent line */}
            <div
              className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${
                THEME_WEB ? "via-[#2f6bff]" : "via-violet"
              } to-transparent opacity-90`}
            />

            {/* Poster Background Image - Visible with contrast overlay */}
            <div className="absolute inset-0 overflow-hidden rounded-[1.5rem]">
              <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                onError={(e) => {
                  if (e.currentTarget.dataset["fallbackApplied"] === "true") return;
                  e.currentTarget.dataset["fallbackApplied"] = "true";
                  e.currentTarget.src = "/events/Turing Trial.jpeg";
                }}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-105"
              />
              {/* Dark gradient overlay to preserve poster artwork visibility while keeping text crisp */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-1 flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/50 bg-black/70 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300 backdrop-blur-md shadow-[0_0_10px_rgba(6,182,212,0.25)]">
                    {event.category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/80 backdrop-blur-md">
                    <span>Front</span>
                    <span className="text-[10px]">↻</span>
                  </span>
                </div>

                <h3 className="mt-2 font-display text-sm font-bold uppercase tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-base">
                  {event.title}
                </h3>

                {event.venue ? (
                  <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-wider text-cyan-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] leading-snug">
                    📍 Venue: {event.venue}
                  </p>
                ) : null}

                {/* Sleek semi-transparent glass panel for description to ensure 100% legibility */}
                <div className="mt-2 rounded-xl border border-white/15 bg-black/55 p-2.5 sm:p-3 shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md">
                  <p className="font-sans text-[11.5px] sm:text-[12px] leading-relaxed text-slate-100">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Back Face Footer */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-950/80 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)] backdrop-blur-md whitespace-nowrap">
                  <span className="text-[8px]">★</span>
                  <span>{event.date}</span>
                </span>

                <a
                  href={getEventRegistrationUrl(event.title) ?? "/register"}
                  target={getEventRegistrationUrl(event.title) ? "_blank" : undefined}
                  rel={getEventRegistrationUrl(event.title) ? "noopener noreferrer" : undefined}
                  onClick={(e) => e.stopPropagation()}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-bold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] whitespace-nowrap ${
                    THEME_WEB
                      ? "bg-[#e62429] shadow-[0_0_15px_rgba(230,36,41,0.6)] hover:bg-[#ff3344] hover:shadow-[0_0_22px_rgba(230,36,41,0.8)]"
                      : "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  }`}
                >
                  <span>Official Registration</span>
                  <span>→</span>
                </a>
              </div>
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
          <h2
            className={`font-display text-[clamp(2.2rem,6vw,4rem)] font-semibold ${
              THEME_WEB ? "section-heading-spider" : ""
            }`}
          >
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
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
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
