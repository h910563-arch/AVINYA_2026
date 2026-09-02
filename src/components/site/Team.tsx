import { useSiteContent } from "@/lib/site-content-context";
import { Reveal, RevealText, revealVariant } from "./Reveal";
import { TiltCard } from "./TiltCard";

const FALLBACK_TEAM_IMAGE =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80";

export function Team() {
  const { teams: TEAMS } = useSiteContent();
  return (
    <section id="team" className="relative px-6 pt-24 pb-16 sm:pt-28 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 font-display text-[clamp(2.2rem,6vw,4rem)] font-semibold sm:mb-14">
          <RevealText text="The Crew" />
        </h2>

        <div className="space-y-20">
          {TEAMS.map((group) => (
            <div key={group.title}>
              <Reveal>
                <div className="mb-8 flex items-baseline gap-5">
                  <h3 className="font-display text-xl font-semibold sm:text-2xl">{group.title}</h3>
                  <span className="hairline flex-1" />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground">
                    {group.count}
                  </span>
                </div>
              </Reveal>

              <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                {group.members.map((m, i) => (
                  <Reveal key={`${group.title}-${m.name}-${i}`} delay={(i % 4) * 0.06} y={18} variant={revealVariant(i + group.title.length)} className="w-[130px] sm:w-[170px]">
                    <TiltCard>
                      <article className="glass sheen neon-card-always h-full w-full overflow-hidden rounded-[1.4rem] p-2">
                        <div className="overflow-hidden rounded-[1rem]">
                          <img
                            src={m.image}
                            alt={m.name}
                            loading="lazy"
                            onError={(e) => {
                              if (e.currentTarget.dataset["fallbackApplied"] === "true") return;
                              e.currentTarget.dataset["fallbackApplied"] = "true";
                              e.currentTarget.src =
                                "https://ivpzuptfcwezgqjnsrgs.supabase.co/storage/v1/object/public/site-media/fallback-team.jpg";
                            }}
                            className="aspect-[4/5] w-full object-cover object-top transition-transform duration-[1400ms] group-hover:scale-[1.08]"
                            style={{ transitionTimingFunction: "var(--ease-lux)" }}
                          />
                        </div>
                        <div className="px-3 pb-3 pt-4">
                          <h4 className="font-display text-[15px] font-semibold tracking-tight" style={{ transform: "translateZ(20px)" }}>
                          {m.name}
                        </h4>
                        {m.role ? (
                          <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.24em] text-muted-foreground" style={{ transform: "translateZ(10px)" }}>
                            {m.role}
                          </p>
                        ) : null}
                        </div>
                      </article>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
