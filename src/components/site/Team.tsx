import { useSiteContent } from "@/lib/site-content-context";
import { THEME_WEB } from "@/lib/site-data";
import { Reveal, RevealText, revealVariant } from "./Reveal";
import { TiltCard } from "./TiltCard";

const FALLBACK_TEAM_IMAGE = "/team/avatar-default.svg";

export function Team() {
  const { teams: TEAMS } = useSiteContent();
  return (
    <section id="team" className="relative px-4 sm:px-6 pt-24 pb-16 sm:pt-28 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <h2
          className={`mb-12 font-display text-[clamp(2.2rem,6vw,4rem)] font-semibold sm:mb-14 ${
            THEME_WEB ? "section-heading-spider" : ""
          }`}
        >
          <RevealText text="The Crew" />
        </h2>

        <div className="space-y-20">
          {TEAMS.map((group) => (
            <div key={group.title}>
              <Reveal>
                <div className="mb-8 flex items-baseline gap-5">
                  <h3 className="font-display text-xl font-semibold sm:text-2xl">{group.title}</h3>
                  <span
                    className={`flex-1 h-px ${
                      THEME_WEB
                        ? "bg-gradient-to-r from-[#e62429]/50 via-[#2f6bff]/30 to-transparent"
                        : "hairline"
                    }`}
                  />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground">
                    {group.count}
                  </span>
                </div>
              </Reveal>

              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
                {group.members.map((m, i) => (
                  <Reveal
                    key={`${group.title}-${m.name}-${i}`}
                    delay={(i % 4) * 0.06}
                    y={18}
                    variant={revealVariant(i + group.title.length)}
                    className="w-[calc(50%-0.6rem)] max-w-[155px] sm:w-[170px] sm:max-w-none"
                  >
                    <TiltCard>
                      <article
                        className={`${
                          THEME_WEB
                            ? "glass-web border-[#2f6bff]/30 hover:border-[#e62429]/70 hover:shadow-[0_0_24px_rgba(230,36,41,0.35)]"
                            : "glass sheen neon-card-always"
                        } h-full w-full overflow-hidden rounded-[1.4rem] p-2 transition-all duration-500`}
                      >
                        <div className="overflow-hidden rounded-[1rem]">
                          <img
                            src={m.image}
                            alt={m.name}
                            loading="lazy"
                            onError={(e) => {
                              if (e.currentTarget.dataset["fallbackApplied"] === "true") return;
                              e.currentTarget.dataset["fallbackApplied"] = "true";
                              e.currentTarget.src = "/team/avatar-default.svg";
                            }}
                            className="aspect-[4/5] w-full object-cover object-top transition-transform duration-[1400ms] group-hover:scale-[1.08]"
                            style={{ transitionTimingFunction: "var(--ease-lux)" }}
                          />
                        </div>
                        <div className="px-3 pb-3 pt-4">
                          <h4
                            className="font-display text-[15px] font-semibold tracking-tight"
                            style={{ transform: "translateZ(20px)" }}
                          >
                            {m.name}
                          </h4>
                          {m.role ? (
                            <p
                              className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.24em] text-muted-foreground"
                              style={{ transform: "translateZ(10px)" }}
                            >
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
