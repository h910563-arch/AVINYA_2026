import { FEST } from "@/lib/site-data";
import { Link } from "@tanstack/react-router";
import { useSiteContent } from "@/lib/site-content-context";
import { Reveal, RevealText } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

export function Footer() {
  const { contact } = useSiteContent();
  const CONTACT_BLURB = contact.blurb;
  return (
    <footer id="contact" className="relative px-6 pb-16 pt-24 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="glass grain relative overflow-hidden rounded-[2rem] px-8 py-14 sm:px-14 sm:py-20">
          <div
            className="pointer-events-none absolute -top-1/2 left-1/4 h-[500px] w-[500px] rounded-full opacity-40 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--azure) 40%, transparent), transparent 65%)",
              animation: "drift-a 40s ease-in-out infinite",
            }}
          />
          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="font-display text-[clamp(2rem,5.5vw,3.4rem)] font-semibold">
                <RevealText text="Let's build something" />
                <br />
                <RevealText text="worth remembering." delay={0.1} />
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-7 max-w-lg text-[15px] leading-[1.9] text-muted-foreground">
                  {CONTACT_BLURB}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-10">
                  <MagneticButton href={`mailto:${contact.email}`}>Say hello</MagneticButton>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col justify-end gap-8">
              <Reveal delay={0.15}>
                <p className="eyebrow mb-2">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[15px] tracking-tight text-foreground/90 transition-opacity duration-500 hover:opacity-70"
                >
                  {contact.email}
                </a>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="eyebrow mb-2">Campus</p>
                <p className="text-[15px] leading-relaxed text-foreground/90">{contact.campus}</p>
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
