import { useEffect, useState } from "react";
import { FEST } from "@/lib/site-data";
import { motion, AnimatePresence } from "motion/react";

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <nav
        className={`relative flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-700 sm:px-6 ${
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
          className="hidden md:block rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[12.5px] font-medium tracking-tight transition-colors duration-500 hover:bg-white/14"
        >
          Register
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center justify-center h-9 w-9 rounded-full border border-white/12 bg-white/8 text-white transition-colors duration-500 hover:bg-white/14"
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ transformOrigin: "top right" }}
              className="absolute right-4 top-[calc(100%+12px)] flex w-[280px] flex-col gap-3 rounded-2xl bg-background/95 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl border border-white/15 md:hidden"
            >
              <div className="grid grid-cols-2 gap-2">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, scale: 0.8, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: i * 0.04 + 0.05,
                    }}
                    className="flex items-center justify-center text-center rounded-xl bg-white/5 border border-white/10 px-3 py-3.5 text-[13.5px] font-semibold tracking-wide text-foreground/90 transition-all active:scale-95 hover:bg-white/10 hover:border-white/20"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </div>
              <div className="hairline my-1" />
              <motion.a
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: LINKS.length * 0.05 + 0.1,
                }}
                href={FEST.registerUrl}
                onClick={() => setMenuOpen(false)}
                className="inline-flex w-full justify-center rounded-xl bg-primary px-4 py-3 text-[14px] font-bold text-primary-foreground shadow-[0_0_15px_var(--color-primary)] transition-transform active:scale-95 hover:bg-primary/90"
              >
                Register Now
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
