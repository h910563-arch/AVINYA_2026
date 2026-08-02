import { useEffect, useState } from "react";
import { FEST } from "@/lib/site-data";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Timeline", href: "#timeline" },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-700 sm:px-6 ${
          solid ? "glass" : "border border-transparent"
        }`}
        style={{ transitionTimingFunction: "var(--ease-lux)" }}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/12 bg-white/6 text-base leading-none">
            {FEST.glyph}
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">{FEST.name}</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-[13px] text-muted-foreground transition-colors duration-500 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={FEST.registerUrl}
          className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[12.5px] font-medium tracking-tight transition-colors duration-500 hover:bg-white/14"
        >
          Register
        </a>
      </nav>
    </header>
  );
}
