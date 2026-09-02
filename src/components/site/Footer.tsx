import { FEST } from "@/lib/site-data";
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
        <div className="glass grain relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute -top-1/2 left-1/4 h-[500px] w-[500px] rounded-full opacity-40 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--azure) 40%, transparent), transparent 65%)",
              animation: "drift-a 40s ease-in-out infinite",
            }}
          />
          <div className="relative mb-10">
            <h2 className="font-display text-[clamp(1.5rem,3.5vw,3rem)] font-semibold tracking-tight">
              <RevealText text="LET's CONNECT , AVINYA-26 is on the GOO!!" />
            </h2>
          </div>
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <Reveal delay={0.2}>
                <p className="mt-4 max-w-lg text-[15px] leading-[1.9] text-muted-foreground">
                  {CONTACT_BLURB.replace(" — ", " ").replace("—", "")}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-5 h-[180px] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 opacity-80 transition-opacity hover:opacity-100">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://maps.google.com/maps?q=Guru+Tegh+Bahadur+4th+Centenary+Engineering+College&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.1) grayscale(10%)" }}
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
