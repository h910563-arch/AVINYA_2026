import { useEffect, useRef, useState, useCallback } from "react";

/* ───────── Speech lines ───────── */
const WELCOME_LINE =
  "Welcome to AVINYA 2026, the annual tech fest of Guru Tegh Bahadur 4th Centenary Engineering College, organised by The Empirical Society!";

const LINES = [
  WELCOME_LINE,
  "Register yourself in the event — glory and innovation await!",
  "Your friendly neighbourhood Spider-Man is here at GTB4CEC! Tap me to swing!",
];

// Module-level reference to prevent Chromium garbage collection of utterance
let activeUtterance: SpeechSynthesisUtterance | null = null;

/**
 * WebSlinger — High-octane Spider-Man companion featuring:
 * - Large, prominent hero sizing
 * - Clean raised arm (no misaligned web overlay)
 * - Animated forward web-shooter on the outstretched hand
 * - High-reliability speech synthesis narration on page load and on click
 * - Interactive narration indicator & sound button
 * - 3D parallax tilt & heroic hover/breathing animation
 */
export function WebSlinger({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [line, setLine] = useState(0);
  const [webShot, setWebShot] = useState(false);
  const [spiderSense, setSpiderSense] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  /* ── Speech synthesis ── */
  const speakText = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-IN";
      utterance.rate = 0.86;
      utterance.pitch = 1.02;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setSpeaking(true);
      };
      utterance.onend = () => {
        setSpeaking(false);
        activeUtterance = null;
      };
      utterance.onerror = () => {
        setSpeaking(false);
        activeUtterance = null;
      };

      const selectAndSpeak = () => {
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice =
          voices.find((v) => v.name.includes("Ravi")) ??
          voices.find((v) => v.lang.toLowerCase() === "en-in") ??
          voices.find((v) => v.name.includes("Heera")) ??
          voices.find((v) => v.name.includes("David")) ??
          voices.find((v) => v.lang.toLowerCase().startsWith("en")) ??
          voices[0];

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        activeUtterance = utterance;
        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener("voiceschanged", selectAndSpeak, { once: true });
      } else {
        selectAndSpeak();
      }
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  }, []);

  /* ── 3D tilt tracking pointer (desktop fine pointer only) ── */
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let ticking = false;
    const onMove = (e: PointerEvent) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const el = wrap.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
        setTilt({
          x: Math.max(-1, Math.min(1, dy)) * -7,
          y: Math.max(-1, Math.min(1, dx)) * 9,
        });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  /* ── Pronounce on page load + fallback on first user action if blocked by autoplay policy ── */
  useEffect(() => {
    let played = false;

    // 1. Attempt immediately on mount
    const timer = setTimeout(() => {
      speakText(LINES[0] ?? "");
      setWebShot(true);
      setTimeout(() => setWebShot(false), 2400);
    }, 600);

    // 2. Fallback on first user interaction in case browser autoplay policy suppressed the silent mount attempt
    const onFirstUserAction = () => {
      if (!played && !window.speechSynthesis.speaking) {
        played = true;
        speakText(LINES[0] ?? "");
        setWebShot(true);
        setTimeout(() => setWebShot(false), 2400);
      }
      window.removeEventListener("pointerdown", onFirstUserAction);
      window.removeEventListener("keydown", onFirstUserAction);
      window.removeEventListener("scroll", onFirstUserAction);
      window.removeEventListener("touchstart", onFirstUserAction);
    };

    window.addEventListener("pointerdown", onFirstUserAction, { passive: true });
    window.addEventListener("keydown", onFirstUserAction, { passive: true });
    window.addEventListener("scroll", onFirstUserAction, { passive: true });
    window.addEventListener("touchstart", onFirstUserAction, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("pointerdown", onFirstUserAction);
      window.removeEventListener("keydown", onFirstUserAction);
      window.removeEventListener("scroll", onFirstUserAction);
      window.removeEventListener("touchstart", onFirstUserAction);
    };
  }, [speakText]);

  /* ── Tap / click interaction ── */
  const poke = () => {
    setLine((l) => {
      const next = (l + 1) % LINES.length;
      speakText(LINES[next] ?? "");
      return next;
    });
    setSpiderSense(true);
    setWebShot(true);
    setTimeout(() => setSpiderSense(false), 1400);
    setTimeout(() => setWebShot(false), 3000);
  };

  return (
    <div
      ref={wrap}
      className={`relative flex flex-col items-center select-none ${className ?? ""}`}
      style={{ perspective: "1000px" }}
    >
      {/* ── Keyframe Animations ── */}
      <style>{`
        @keyframes sp-hero-float {
          0% {
            transform: translateY(0px) rotate(-2deg);
          }
          30% {
            transform: translateY(-18px) rotate(3deg);
          }
          65% {
            transform: translateY(-9px) rotate(-1deg);
          }
          85% {
            transform: translateY(-22px) rotate(2.5deg);
          }
          100% {
            transform: translateY(0px) rotate(-2deg);
          }
        }

        @keyframes sp-hero-breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.028);
          }
        }

        @keyframes sp-hand-web-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes sp-web-shoot-line {
          0% {
            stroke-dashoffset: 450;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.95;
          }
        }

        @keyframes sp-shadow-scale {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          40% {
            transform: scale(0.78);
            opacity: 0.25;
          }
          85% {
            transform: scale(0.72);
            opacity: 0.2;
          }
        }

        @keyframes sp-sense-pulse {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
          100% {
            opacity: 0;
            transform: scale(1.35);
          }
        }

        @keyframes sp-equalizer-bar {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
      `}</style>

      {/* ── Action Figure Container (Hero Sizing) ── */}
      <div
        className="relative w-full max-w-[380px] sm:max-w-[460px] md:max-w-[500px] flex justify-center items-center"
        style={{
          animation: "sp-hero-float 5.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
        }}
      >
        {/* Spider-Sense comic waves (on tap) */}
        {spiderSense && (
          <div
            className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-30"
            style={{ animation: "sp-sense-pulse 0.9s ease-out forwards" }}
          >
            <svg width="150" height="75" viewBox="0 0 140 70" fill="none">
              <path d="M70 45 L50 15 M70 45 L35 25 M70 45 L20 40" stroke="#ffeb3b" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M70 45 L90 15 M70 45 L105 25 M70 45 L120 40" stroke="#ffeb3b" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M70 35 L70 8" stroke="#ff3b3b" strokeWidth="2.8" strokeLinecap="round" />
            </svg>
          </div>
        )}

        {/* 3D Tilt Wrapper */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Interactive Spider-Man companion. Click to hear welcome narration."
          onClick={poke}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && poke()}
          onPointerEnter={() => setWebShot(true)}
          onPointerLeave={() => setTimeout(() => setWebShot(false), 900)}
          className="relative cursor-pointer transition-transform duration-300 ease-out will-change-transform w-full"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Dual Neo-Tokyo Neon Backlight Bloom */}
          <div
            className="pointer-events-none absolute inset-[-12%] -z-10 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 45% 45%, rgba(230,36,41,0.38) 0%, rgba(47,107,255,0.28) 50%, transparent 75%)",
              filter: "blur(32px)",
            }}
          />

          {/* SPIDER-MAN IMAGE & OUTSTRETCHED WEB SHOOTER */}
          <div
            className="relative w-full will-change-transform"
            style={{
              animation: "sp-hero-breathe 3.6s ease-in-out infinite",
            }}
          >
            {/* Note: Misaligned web on the raised arm was removed as requested. */}

            {/* ═══════════════════════════════════════════════════════
                OUTSTRETCHED HAND (Forward Web Shooter)
                Coordinates: ~78%..88% X, ~54%..65% Y
            ═══════════════════════════════════════════════════════ */}
            <div className="pointer-events-none absolute right-[2%] top-[48%] z-30 h-[120px] w-[120px] sm:h-[150px] sm:w-[150px]">
              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 120 120"
              >
                <defs>
                  <filter id="hand-glow-r" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="3" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <g filter="url(#hand-glow-r)">
                  {/* Concentric rotating Web Net Vortex around palm */}
                  <g style={{ transformOrigin: "60px 60px", animation: "sp-hand-web-spin 14s linear infinite" }}>
                    <ellipse cx="60" cy="60" rx="36" ry="36" stroke="rgba(74,127,255,0.55)" strokeWidth="1.2" strokeDasharray="6 4" fill="none" />
                    <ellipse cx="60" cy="60" rx="24" ry="24" stroke="rgba(220,240,255,0.7)" strokeWidth="1.2" strokeDasharray="4 3" fill="none" />
                    <ellipse cx="60" cy="60" rx="14" ry="14" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" fill="none" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                      <line
                        key={idx}
                        x1="60"
                        y1="60"
                        x2={60 + Math.cos((angle * Math.PI) / 180) * 38}
                        y2={60 + Math.sin((angle * Math.PI) / 180) * 38}
                        stroke="rgba(180,215,255,0.6)"
                        strokeWidth="0.9"
                      />
                    ))}
                  </g>

                  {/* Web shooter muzzle sparkle */}
                  <circle cx="60" cy="60" r="5" fill="#ffffff" filter="drop-shadow(0 0 6px #2f6bff)" />
                  <circle cx="60" cy="60" r="2.5" fill="#ff4d4f" />

                  {/* Web strands wrapping fingers & wrist */}
                  <path
                    d="M35 50 Q50 68 85 58"
                    stroke="rgba(220,240,255,0.8)"
                    strokeWidth="1.4"
                    fill="none"
                  />
                  <path
                    d="M40 70 Q60 85 80 72"
                    stroke="rgba(140,190,255,0.7)"
                    strokeWidth="1.2"
                    fill="none"
                  />
                </g>
              </svg>

              {/* Dynamic Web Shoots firing outward when active/hover/tap */}
              {webShot && (
                <svg
                  className="pointer-events-none absolute -top-8 -right-24 sm:-right-36 w-[220px] h-[180px] z-40 overflow-visible"
                  viewBox="0 0 240 180"
                >
                  <g filter="url(#hand-glow-r)">
                    <path
                      d="M20 90 Q110 50 230 15"
                      stroke="rgba(240,248,255,0.98)"
                      strokeWidth="2.5"
                      fill="none"
                      strokeDasharray="450"
                      strokeDashoffset="450"
                      style={{ animation: "sp-web-shoot-line 0.45s ease-out forwards" }}
                    />
                    <path
                      d="M20 90 Q120 105 225 140"
                      stroke="rgba(190,225,255,0.9)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="450"
                      strokeDashoffset="450"
                      style={{ animation: "sp-web-shoot-line 0.55s ease-out 0.08s forwards" }}
                    />
                    <path
                      d="M20 90 Q110 90 215 80"
                      stroke="rgba(255,255,255,0.95)"
                      strokeWidth="1.8"
                      fill="none"
                      strokeDasharray="450"
                      strokeDashoffset="450"
                      style={{ animation: "sp-web-shoot-line 0.5s ease-out 0.04s forwards" }}
                    />
                    <path d="M110 68 Q125 85 130 98" stroke="rgba(200,225,255,0.75)" strokeWidth="1.2" fill="none" />
                    <path d="M170 48 Q182 78 188 105" stroke="rgba(200,225,255,0.75)" strokeWidth="1.2" fill="none" />
                    <circle cx="230" cy="15" r="4" fill="#ffffff" filter="drop-shadow(0 0 5px #ffffff)" />
                    <circle cx="225" cy="140" r="3.5" fill="#88b5ff" />
                    <circle cx="215" cy="80" r="3" fill="#ffffff" />
                  </g>
                </svg>
              )}
            </div>

            {/* THE MAIN SPIDER-MAN HERO IMAGE */}
            <img
              src="/assets/Spiderman.webp"
              alt="Spider-Man Avinya Companion"
              width={520}
              height={520}
              className="relative z-20 h-auto w-full object-contain select-none transition-all duration-300 filter drop-shadow-[0_0_26px_rgba(230,36,41,0.6)] drop-shadow-[0_0_55px_rgba(47,107,255,0.4)] hover:scale-[1.03] active:scale-[0.97]"
              draggable={false}
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* Ground Shadow */}
      <div
        className="pointer-events-none -mt-4 h-6 w-56 sm:w-64 rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(230,36,41,0.48) 0%, rgba(10,15,35,0.75) 45%, transparent 75%)",
          filter: "blur(9px)",
          animation: "sp-shadow-scale 5.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
        }}
      />

      {/* ── Prominent Audio Voice Narration Pill ── */}
      <button
        onClick={poke}
        className="mt-3 inline-flex items-center gap-2.5 rounded-full border border-[#2f6bff]/50 px-4 py-1.5 text-[11.5px] font-mono tracking-wider text-white shadow-[0_0_18px_rgba(47,107,255,0.35)] transition-all hover:scale-105 hover:border-[#e62429] hover:shadow-[0_0_22px_rgba(230,36,41,0.5)] cursor-pointer"
        style={{
          background: "linear-gradient(135deg, rgba(8,14,38,0.92) 0%, rgba(20,6,24,0.92) 100%)",
          backdropFilter: "blur(14px)",
        }}
        aria-label="Play welcome narration"
      >
        <span className="relative flex h-2.5 w-2.5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e62429] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e62429]" />
        </span>
        {speaking ? (
          <span className="flex items-center gap-1.5 text-azure font-medium">
            <span className="flex items-center gap-0.5">
              <span className="inline-block w-[2px] bg-[#4a7fff] rounded-full" style={{ animation: "sp-equalizer-bar 0.4s ease-in-out infinite" }} />
              <span className="inline-block w-[2px] bg-[#4a7fff] rounded-full" style={{ animation: "sp-equalizer-bar 0.5s ease-in-out infinite 0.15s" }} />
              <span className="inline-block w-[2px] bg-[#4a7fff] rounded-full" style={{ animation: "sp-equalizer-bar 0.45s ease-in-out infinite 0.3s" }} />
            </span>
          </span>
        ) : (
          <span className="text-[#e2e8ff] font-medium"> TAP TO HEAR </span>
        )}
      </button>
    </div>
  );
}