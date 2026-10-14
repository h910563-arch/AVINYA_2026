import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { THEME_WEB } from "@/lib/site-data";

interface WebSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

/**
 * WebSection — Wraps sections with a dynamic "Spider-Man web" scroll reveal.
 * As the user scrolls up and down:
 * - Sections spring into place with web-tensile elasticity.
 * - An electric blue & crimson spider-silk thread draws across the section boundary.
 * - Corner web brackets illuminate as the section is caught in the web of innovation.
 * - Safe for all nested forms, modals, buttons, and animations.
 */
export function WebSection({ children, id, className = "" }: WebSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Instant viewport check on mount to prevent any initial paint delay
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
    }

    // Observer triggers both when scrolling down into section and scrolling back up
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          } else {
            // Only reset when well out of view to avoid micro-flashing
            if (entry.intersectionRatio <= 0.01) {
              setInView(false);
            }
          }
        });
      },
      {
        threshold: [0.01, 0.08],
        rootMargin: "0px 0px -10px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!THEME_WEB) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div id={id} ref={ref} className={`relative ${className}`}>
      {/* ── Top Spider-Silk Boundary Thread (Shoots across as section loads) ── */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-8 -translate-y-4 z-10 flex items-center justify-center overflow-hidden">
        {/* Left Web Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 0.85 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1.5px] flex-1 origin-right bg-gradient-to-r from-transparent via-[#2f6bff]/50 to-[#2f6bff]"
          style={{
            boxShadow: inView ? "0 0 10px rgba(47,107,255,0.6)" : "none",
          }}
        />

        {/* Center Spider Web Node */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -45 }}
          animate={inView ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0, rotate: -45 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "backOut" }}
          className="mx-3 relative flex items-center justify-center h-6 w-6"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#2f6bff] drop-shadow-[0_0_8px_rgba(47,107,255,0.8)]" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="9" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="12" cy="12" r="4.5" strokeWidth="1.2" stroke="#e62429" />
            <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" strokeWidth="0.8" strokeOpacity="0.75" />
            <circle cx="12" cy="12" r="2" fill="#ffffff" />
          </svg>
        </motion.div>

        {/* Right Web Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 0.85 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1.5px] flex-1 origin-left bg-gradient-to-l from-transparent via-[#2f6bff]/50 to-[#2f6bff]"
          style={{
            boxShadow: inView ? "0 0 10px rgba(47,107,255,0.6)" : "none",
          }}
        />
      </div>

      {/* ── Subtle Web Corner Filaments on Section ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 0.45, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="pointer-events-none absolute top-2 left-3 h-14 w-14 z-0 text-[#2f6bff]"
      >
        <svg viewBox="0 0 60 60" className="h-full w-full overflow-visible" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M0 0 L60 0 Q30 30 0 60 Z" strokeOpacity="0.4" />
          <path d="M0 0 L40 0 Q20 20 0 40 Z" strokeOpacity="0.6" stroke="#4a7fff" />
          <line x1="0" y1="0" x2="50" y2="50" strokeOpacity="0.5" />
          <circle cx="50" cy="50" r="1.5" fill="#ffffff" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 0.45, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="pointer-events-none absolute top-2 right-3 h-14 w-14 z-0 text-[#2f6bff]"
      >
        <svg viewBox="0 0 60 60" className="h-full w-full overflow-visible" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M60 0 L0 0 Q30 30 60 60 Z" strokeOpacity="0.4" />
          <path d="M60 0 L20 0 Q40 20 60 40 Z" strokeOpacity="0.6" stroke="#4a7fff" />
          <line x1="60" y1="0" x2="10" y2="50" strokeOpacity="0.5" />
          <circle cx="10" cy="50" r="1.5" fill="#ffffff" />
        </svg>
      </motion.div>

      {/* ── Main Section Content with GPU-Accelerated Tensile Web Spring Reveal ── */}
      <motion.div
        initial={{ opacity: 0.5, y: 22 }}
        animate={
          inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0.5, y: 16 }
        }
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 22,
          mass: 0.8,
        }}
        className="relative z-10 will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
