import { TEAMS } from "@/lib/site-data";
import { Reveal, RevealText } from "./Reveal";

export function Team() {
  return (
    <section id="team" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 font-display text-[clamp(2.2rem,6vw,4rem)] font-semibold">
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

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {group.members.map((m, i) => (
                  <Reveal key={`${group.title}-${m.name}-${i}`} delay={(i % 4) * 0.06} y={18}>
                    <article className="glass sheen glass-hover group h-full overflow-hidden rounded-[1.4rem] p-2">
                      <div className="overflow-hidden rounded-[1rem]">
                        <img
                          src={m.image}
                          alt={m.name}
                          loading="lazy"
                          className="aspect-[4/5] w-full object-cover opacity-85 grayscale transition-[transform,filter,opacity] duration-[1400ms] group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
                          style={{ transitionTimingFunction: "var(--ease-lux)" }}
                        />
                      </div>
                      <div className="px-3 pb-3 pt-4">
                        <h4 className="font-display text-[15px] font-semibold tracking-tight">
                          {m.name}
                        </h4>
                        {m.role ? (
                          <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.24em] text-muted-foreground">
                            {m.role}
                          </p>
                        ) : null}
                      </div>
                    </article>
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
