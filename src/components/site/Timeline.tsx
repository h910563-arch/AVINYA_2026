import { useSiteContent } from "@/lib/site-content-context";
import { Reveal, RevealText, revealVariant } from "./Reveal";

const EVENT_TIMELINE = [
  {
    phase: "Phase 01",
    date: "03 Sept 2026",
    mode: "REGISTRATION",
    title: "Registration & Online Elimination",
    description: "Registration and side by side Online elimination round starts.",
  },
  {
    phase: "Phase 02",
    date: "19 Oct 2026",
    mode: "DEADLINE",
    title: "Registration Ends",
    description: "Final deadline for registrations.",
  },
  {
    phase: "Phase 03",
    date: "22 Oct 2026",
    mode: "RESULT",
    title: "Result of Shortlisted Teams",
    description: "Result of Shortlisted team for Offline round (declared in the separate eventwise whatsapp groups).",
  },
  {
    phase: "Phase 04",
    date: "27 Oct 2026",
    mode: "FINALE",
    title: "Finale Rounds",
    description: "Finale rounds for the shortlisted teams/participants (Held offline at Guru Tegh Bahadur 4th Centenary Engineering College , Campus)",
  },
  {
    phase: "Phase 05",
    date: "27 Oct 2026",
    mode: "FELICITATION",
    title: "Announcements Of Winners & Felicitation",
    description: "Announcement of fest winners, award distribution ceremony, and felicitations.",
  },
  {
    phase: "Phase 06",
    date: "27 Oct 2026",
    mode: "THE END",
    title: "THE END",
    description: "",
  },
];

export function Timeline() {
  const items = EVENT_TIMELINE;

  return (
    <section id="timeline" className="relative px-6 pt-14 pb-14 sm:pt-20 sm:pb-16 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-14 text-center sm:text-left">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan">
            Event Roadmap
          </span>
          <h2 className="mt-2 font-display text-[clamp(2.2rem,5vw,3.75rem)] font-bold tracking-tight text-white">
            <RevealText text="The Sequence" />
          </h2>
          <p className="mt-2.5 max-w-xl font-mono text-xs sm:text-sm text-muted-foreground">
            Complete schedule and milestone progression from registration to the grand felicitation.
          </p>
        </div>

        {/* Roadmap Grid with Snake Connecting Branch Flow */}
        <div className="relative">
          {/* DESKTOP SNAKE ROADMAP (3 columns x 2 rows on lg screens) */}
          <div className="hidden lg:grid grid-cols-3 gap-y-14 gap-x-10 relative">
            
            {/* --- ROW 1: Phase 01 -> Phase 02 -> Phase 03 --- */}
            {/* Phase 01 */}
            <div className="relative">
              {items[0] && <TimelineCard item={items[0]} index={0} isFinale={false} />}
              {/* Branch Connector: Phase 01 -> Phase 02 */}
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-10 h-1 flex items-center justify-center z-10">
                <div className="w-full h-[2px] bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <div className="absolute w-3 h-3 rounded-full bg-cyan-300 border-2 border-[#0b0f17] shadow-[0_0_10px_rgba(6,182,212,1)]" />
              </div>
            </div>

            {/* Phase 02 */}
            <div className="relative">
              {items[1] && <TimelineCard item={items[1]} index={1} isFinale={false} />}
              {/* Branch Connector: Phase 02 -> Phase 03 */}
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-10 h-1 flex items-center justify-center z-10">
                <div className="w-full h-[2px] bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <div className="absolute w-3 h-3 rounded-full bg-cyan-300 border-2 border-[#0b0f17] shadow-[0_0_10px_rgba(6,182,212,1)]" />
              </div>
            </div>

            {/* Phase 03 */}
            <div className="relative">
              {items[2] && <TimelineCard item={items[2]} index={2} isFinale={false} />}
              {/* Vertical Branch Connector: Phase 03 -> Phase 04 (Drops down to Row 2, Col 3) */}
              <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-1 h-14 flex items-center justify-center z-10">
                <div className="h-full w-[2px] bg-gradient-to-b from-cyan-400 via-cyan-300 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <div className="absolute w-3 h-3 rounded-full bg-cyan-300 border-2 border-[#0b0f17] shadow-[0_0_10px_rgba(6,182,212,1)]" />
              </div>
            </div>

            {/* Empty space in Col 1 to keep grid alignment */}
            <div className="relative">
              {items[5] && <TimelineCard item={items[5]} index={5} isFinale={true} />}
            </div>

            {/* Phase 05 (The Finale in Col 2) */}
            <div className="relative">
              {items[4] && <TimelineCard item={items[4]} index={4} isFinale={false} />}
              {/* Branch Connector: Phase 05 -> Phase 06 (Leftward branch) */}
              <div className="absolute top-1/2 -left-10 -translate-y-1/2 w-10 h-1 flex items-center justify-center z-10">
                <div className="w-full h-[2px] bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                <div className="absolute w-3 h-3 rounded-full bg-amber-300 border-2 border-[#0b0f17] shadow-[0_0_10px_rgba(245,158,11,1)]" />
              </div>
            </div>

            {/* Phase 04 (Result in Col 3) */}
            <div className="relative">
              {items[3] && <TimelineCard item={items[3]} index={3} isFinale={false} />}
              {/* Branch Connector: Phase 04 -> Phase 05 (Leftward branch) */}
              <div className="absolute top-1/2 -left-10 -translate-y-1/2 w-10 h-1 flex items-center justify-center z-10">
                <div className="w-full h-[2px] bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <div className="absolute w-3 h-3 rounded-full bg-cyan-300 border-2 border-[#0b0f17] shadow-[0_0_10px_rgba(6,182,212,1)]" />
              </div>
            </div>

          </div>

          {/* TABLET / MOBILE CONNECTED ROADMAP (sm & md screens) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:hidden relative">
            {items.map((item, i) => {
              const isFinale = i === 5;
              return (
                <div key={item.phase || i} className="relative">
                  <TimelineCard item={item} index={i} isFinale={isFinale} />
                  {i < items.length - 1 && (
                    <div className="hidden md:flex absolute -bottom-8 left-1/2 -translate-x-1/2 w-1 h-8 items-center justify-center z-10">
                      <div className="h-full w-[2px] bg-gradient-to-b from-cyan-400 to-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-cyan-300 border-2 border-[#0b0f17]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable Subcomponent for each Timeline Card
function TimelineCard({
  item,
  index,
  isFinale,
}: {
  item: (typeof EVENT_TIMELINE)[0];
  index: number;
  isFinale: boolean;
}) {
  const stepNum = String(index + 1).padStart(2, "0");

  return (
    <Reveal
      delay={index * 0.08}
      variant={revealVariant(index)}
      className={`group relative h-full rounded-2xl sm:rounded-3xl p-[1px] transition-all duration-500 hover:-translate-y-1.5 ${
        isFinale
          ? "bg-gradient-to-br from-amber-400/80 via-amber-500/30 to-yellow-300/60 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(245,158,11,0.25)] hover:from-amber-300 hover:via-yellow-400 hover:to-orange-400 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_45px_rgba(245,158,11,0.45)]"
          : "bg-gradient-to-br from-cyan-400/50 via-white/10 to-azure-400/40 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(6,182,212,0.15)] hover:from-cyan-300 hover:via-azure-400 hover:to-violet-400 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_40px_rgba(56,189,248,0.35)]"
      }`}
    >
      {/* Inner Card Core with Deep Frosted Backdrop */}
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] bg-[#0b0f17]/90 p-6 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(0,0,0,0.8)]">
        {/* Top glowing neon accent line */}
        <div
          className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${
            isFinale ? "via-amber-400" : "via-cyan"
          } to-transparent opacity-90`}
        />

        {/* Corner ambient neon aura on hover */}
        <div
          className={`pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full blur-2xl transition-all duration-500 ${
            isFinale ? "bg-amber-500/10 group-hover:bg-amber-400/25" : "bg-cyan/10 group-hover:bg-cyan/25"
          }`}
        />

        {/* Big Watermark Step Number in Background */}
        <span className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[5.5rem] font-black tracking-tighter text-white/[0.04] transition-colors duration-300 group-hover:text-cyan/[0.08] sm:text-[6.5rem]">
          {stepNum}
        </span>

        {/* Top Row: Phase Tag Badge & Mode (Single Line) */}
        <div>
          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider whitespace-nowrap shrink-0 ${
                isFinale
                  ? "border-amber-400/50 bg-amber-950/80 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                  : "border-cyan-400/40 bg-cyan-950/80 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isFinale ? "bg-amber-400 shadow-[0_0_6px_var(--color-amber-400)]" : "bg-cyan shadow-[0_0_6px_var(--color-cyan)]"
                }`}
              />
              <span>{item.phase}</span>
              <span className="opacity-40">•</span>
              <span className="text-[9px] sm:text-[9.5px]">{item.mode}</span>
            </span>

            {/* Prominent Date Tag */}
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 ${
                isFinale
                  ? "border-amber-400/60 bg-amber-950/90 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.35)]"
                  : "border-white/25 bg-white/10 text-white shadow-sm"
              } backdrop-blur-md`}
            >
              <span>{item.date}</span>
            </span>
          </div>

          {/* Phase Title */}
          {index === 5 ? (
            <div className="flex flex-1 items-center justify-center py-8">
              <h3 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-widest text-amber-400 transition-colors duration-300 group-hover:text-amber-300 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                {item.title}
              </h3>
            </div>
          ) : (
            <>
              <h3 className="mt-4 font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-white transition-colors duration-300 group-hover:text-cyan">
                {item.title}
              </h3>

              {/* Phase Description */}
              {item.description && (
                <p className="mt-2.5 font-mono text-xs sm:text-[12.5px] leading-relaxed text-white/80">
                  {item.description}
                </p>
              )}
            </>
          )}
        </div>

        {/* Bottom Step Indicator Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10.5px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/25 bg-white/10 text-[9.5px] font-bold text-white shadow-[0_0_8px_rgba(255,255,255,0.15)]">
              {index + 1}
            </span>
            <span className="uppercase tracking-widest text-white/60">
              {index === 5 ? "The End" : index === 4 ? "Final Step" : `Milestone 0${index + 1}`}
            </span>
          </div>

          {index < 4 && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan/90 transition-transform duration-300 group-hover:translate-x-1">
              <span>Next Phase</span>
              <span>→</span>
            </span>
          )}
          {index === 4 && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300">
              <span>★ Grand Finale</span>
            </span>
          )}
        </div>
      </div>
    </Reveal>
  );
}
