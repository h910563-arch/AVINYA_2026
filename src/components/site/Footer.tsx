import { FEST, THEME_WEB } from "@/lib/site-data";
import { Link } from "@tanstack/react-router";
import { useSiteContent } from "@/lib/site-content-context";
import { Reveal, RevealText } from "./Reveal";
import { ContactForm } from "./ContactForm";

export function Footer() {
  const { contact } = useSiteContent();
  const CONTACT_BLURB = contact.blurb;
  return (
    <footer id="contact" className="relative px-6 pb-16 pt-24 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <div
          className={`${
            THEME_WEB
              ? "glass-web border-[#2f6bff]/30 shadow-[0_16px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(47,107,255,0.15)]"
              : "glass"
          } grain relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12`}
        >
          <div
            className="pointer-events-none absolute -top-1/2 left-1/4 h-[500px] w-[500px] rounded-full opacity-40 blur-[120px]"
            style={{
              background: THEME_WEB
                ? "radial-gradient(circle, rgba(230, 36, 41, 0.4), transparent 65%)"
                : "radial-gradient(circle, color-mix(in oklab, var(--azure) 40%, transparent), transparent 65%)",
              animation: "drift-a 40s ease-in-out infinite",
            }}
          />
          <div className="relative mb-10">
            <h2
              className={`font-display text-[clamp(1.5rem,3.5vw,3rem)] font-semibold tracking-tight ${
                THEME_WEB ? "section-heading-spider" : ""
              }`}
            >
              <RevealText text="LET's CONNECT , AVINYA-26 is on the GOO!!" />
            </h2>
          </div>
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <Reveal delay={0.2}>
                <div className="mt-4 max-w-lg text-[15px] leading-[1.9] text-muted-foreground">
                  {(() => {
                    const rawBlurb = CONTACT_BLURB.replace(" — ", " ").replace("—", "");
                    const splitStr = "For any query Contact Team Heads :";
                    const splitIdx = rawBlurb.indexOf(splitStr);

                    if (splitIdx !== -1) {
                      const mainText = rawBlurb.slice(0, splitIdx).trim();
                      const contactText = rawBlurb.slice(splitIdx + splitStr.length).trim();

                      const contacts = contactText
                        .split(")")
                        .filter((c) => c.trim().length > 0)
                        .map((c) => c + ")");

                      return (
                        <>
                          <p>{mainText}</p>
                          <div
                            className={`mt-5 rounded-xl border p-4 backdrop-blur-sm ${
                              THEME_WEB
                                ? "border-[#2f6bff]/25 bg-[#080d24]/75 shadow-[0_0_15px_rgba(47,107,255,0.15)]"
                                : "border-white/10 bg-white/5"
                            }`}
                          >
                            <p className="font-semibold text-white/90 text-sm uppercase tracking-wider mb-2">
                              Team Heads Contact
                            </p>
                            <ul className="space-y-2">
                              {contacts.map((c, i) => {
                                const match = c.match(/(.*?)\(\s*(\+91.*?)\)/);
                                if (match) {
                                  return (
                                    <li key={i} className="flex items-center gap-2">
                                      <span
                                        className={`font-bold ${
                                          THEME_WEB ? "text-[#5ba4ff]" : "text-cyan"
                                        }`}
                                      >
                                        {match[1]?.trim() || ""}
                                      </span>
                                      <span className="text-white/40">—</span>
                                      <span className="font-mono text-[13.5px] font-medium text-white/90">
                                        {(match[2]?.trim() || "").replace(/-/g, "")}
                                      </span>
                                    </li>
                                  );
                                }
                                return (
                                  <li key={i} className="text-white/80">
                                    {c}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </>
                      );
                    }

                    return <p>{rawBlurb}</p>;
                  })()}
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-5 h-[180px] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 opacity-80 transition-opacity hover:opacity-100">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://maps.google.com/maps?q=Guru+Tegh+Bahadur+4th+Centenary+Engineering+College&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    style={{
                      border: 0,
                      filter: "invert(90%) hue-rotate(180deg) contrast(1.1) grayscale(10%)",
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col pt-4">
              <Reveal delay={0.15}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <span className="font-display text-sm font-semibold tracking-tight">{FEST.name}</span>
          <div className="flex items-center gap-5">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-muted-foreground">
              {FEST.tagline}
            </span>
            <Link
              to="/admin"
              className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-muted-foreground transition-colors duration-500 hover:text-foreground"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
