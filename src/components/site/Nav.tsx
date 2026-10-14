import { useEffect, useState } from "react";
import { FEST, THEME_WEB } from "@/lib/site-data";
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

  // Auto-close menu on scroll
  useEffect(() => {
    if (!menuOpen) return;
    const handleScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  const navClasses = THEME_WEB
    ? solid
      ? "border border-[#2f6bff]/55 bg-[#040614]/94 shadow-[0_12px_42px_rgba(0,0,0,0.9),0_0_25px_rgba(47,107,255,0.3)] backdrop-blur-2xl"
      : "border border-[#2f6bff]/40 bg-[#06091b]/82 shadow-[0_8px_32px_rgba(0,0,0,0.75),0_0_18px_rgba(47,107,255,0.2)] backdrop-blur-xl ring-1 ring-white/10"
    : solid
    ? "glass"
    : "border border-transparent";

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <nav
        className={`relative flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 sm:px-7 ${navClasses}`}
        style={{ transitionTimingFunction: "var(--ease-lux)" }}
      >
        <a href="#top" className="flex items-center gap-2.5 group">
          <span
            className={`grid h-8 w-8 place-items-center rounded-full text-base leading-none transition-all duration-500 ${
              THEME_WEB
                ? "border border-[#e62429]/70 bg-[#e62429]/20 text-white shadow-[0_0_14px_rgba(230,36,41,0.6)] group-hover:scale-105"
                : "border border-white/12 bg-white/6"
            }`}
          >
            {FEST.glyph}
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-white group-hover:text-azure transition-colors">
            {FEST.name}
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`group relative py-1 text-[13px] font-medium transition-colors duration-300 ${
                THEME_WEB
                  ? "text-[#dce4ff] hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{l.label}</span>
              {THEME_WEB && (
                <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-[#e62429] shadow-[0_0_8px_#e62429] transition-all duration-300 group-hover:w-full" />
              )}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden flex items-center justify-center h-9 w-9 rounded-full border transition-colors duration-500 ${
            THEME_WEB
              ? "border-[#2f6bff]/40 bg-[#080d24]/80 text-white hover:border-[#e62429]/70 hover:shadow-[0_0_12px_rgba(230,36,41,0.4)]"
              : "border border-white/12 bg-white/8 text-white hover:bg-white/14"
          }`}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Tap-outside backdrop */}
              <div
                className="fixed inset-0 z-40 md:hidden"
                onClick={() => setMenuOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                style={{ transformOrigin: "top right" }}
                className={`absolute right-0 top-[calc(100%+10px)] z-50 flex w-[calc(100vw-32px)] max-w-[320px] flex-col gap-3 rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl md:hidden ${
                  THEME_WEB
                    ? "border border-[#2f6bff]/40 bg-[#070b1e]/96 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_24px_rgba(47,107,255,0.22)]"
                    : "border border-white/15 bg-background/96"
                }`}
              >
                <div className="grid grid-cols-2 gap-2">
                  {LINKS.map((l, i) => (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      initial={{ opacity: 0, scale: 0.85, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 22,
                        delay: i * 0.03 + 0.04,
                      }}
                      className={`flex items-center justify-center text-center rounded-xl px-3 py-3 text-[13.5px] font-semibold tracking-wide transition-all active:scale-95 ${
                        THEME_WEB
                          ? "bg-[#0b1028]/85 border border-[#2f6bff]/20 text-[#e8ecff] hover:border-[#e62429]/60 hover:bg-[#e62429]/10 hover:shadow-[0_0_14px_rgba(230,36,41,0.3)]"
                          : "bg-white/5 border border-white/10 text-foreground/90 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      {l.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
