import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FEST } from "@/lib/site-data";

const LINES = [
  `Welcome to ${FEST.name}!`,
  "Register yourself in the event!",
  "3 days. 20+ events. One infinity.",
  "Tap me — I like the attention.",
];

/** Premium companion: brushed-metal shell, soft idle breathing, eyes that follow the pointer,
 *  waves and greets visitors with a rotating speech bubble. */
export function Robot({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [line, setLine] = useState(0);
  const [waving, setWaving] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const say = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-IN";
      // Slower than the default (1) so the greeting is easy to make out.
      utterance.rate = 0.82;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find((voice) => voice.lang.toLowerCase() === "en-in") ??
        voices.find((voice) => voice.lang.toLowerCase().startsWith("en")) ??
        voices[0];
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    };

    // Voices can load asynchronously on first page visit — if none are
    // ready yet, wait for them once instead of speaking with no voice set
    // (which is what made the greeting sound rushed/unclear).
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener("voiceschanged", say, { once: true });
    } else {
      say();
    }
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      setPupil({
        x: Math.max(-1, Math.min(1, dx)) * 5,
        y: Math.max(-1, Math.min(1, dy)) * 3.4,
      });
      setTilt({
        x: Math.max(-1, Math.min(1, dy)) * -5,
        y: Math.max(-1, Math.min(1, dx)) * 7,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // greet once on mount
  useEffect(() => {
    const hello = setTimeout(() => {
      speakText(LINES[0] || "");
      setWaving(true);
      setTimeout(() => setWaving(false), 2600);
    }, 1200);

    return () => {
      clearTimeout(hello);
    };
  }, []);

  const poke = () => {
    setLine((l) => {
      const next = (l + 1) % LINES.length;
      speakText(LINES[next] || "");
      return next;
    });
    setWaving(true);
    setTimeout(() => setWaving(false), 2400);
  };

  return (
    <div ref={wrap} className={className} style={{ perspective: "1000px" }}>
      {/* speech bubble */}
      <div className="pointer-events-none relative z-20 h-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={line}
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute left-1/2 top-0 w-max max-w-[16rem] -translate-x-1/2 rounded-2xl px-4 py-2.5 text-center"
          >
            <p className="text-[12.5px] leading-snug tracking-tight text-foreground/90">
              {LINES[line]}
            </p>
            <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-[3px] border-b border-r border-white/10 bg-white/5 backdrop-blur-xl" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ animation: "robot-hover 11s var(--ease-lux) infinite" }}>
        <div
          role="button"
          tabIndex={0}
          aria-label="Talk to the Avinya companion robot"
          onClick={poke}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && poke()}
          onPointerEnter={() => setWaving(true)}
          onPointerLeave={() => setTimeout(() => setWaving(false), 1200)}
          className="relative cursor-pointer transition-transform duration-[900ms] active:scale-[0.97]"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transitionTimingFunction: "var(--ease-lux)",
            animation: "breathe 6.5s ease-in-out infinite",
          }}
        >
          <svg
            viewBox="0 0 240 260"
            className="h-full w-full"
            role="img"
            aria-label="Avinya companion robot"
          >
            <defs>
              <linearGradient id="shell" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0%" stopColor="oklch(0.42 0.012 265)" />
                <stop offset="45%" stopColor="oklch(0.27 0.012 265)" />
                <stop offset="100%" stopColor="oklch(0.19 0.012 265)" />
              </linearGradient>
              <linearGradient id="visor" x1="0" y1="0" x2="0.2" y2="1">
                <stop offset="0%" stopColor="oklch(0.24 0.03 265)" />
                <stop offset="100%" stopColor="oklch(0.13 0.02 265)" />
              </linearGradient>
              <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(1 0 0 / 45%)" />
                <stop offset="60%" stopColor="oklch(1 0 0 / 6%)" />
                <stop offset="100%" stopColor="oklch(1 0 0 / 18%)" />
              </linearGradient>
              <radialGradient id="eyeGlow">
                <stop offset="0%" stopColor="oklch(0.9 0.09 240)" />
                <stop offset="60%" stopColor="oklch(0.72 0.15 252)" />
                <stop offset="100%" stopColor="oklch(0.5 0.12 258 / 0%)" />
              </radialGradient>
              <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            {/* floor light */}
            <ellipse
              cx="120"
              cy="240"
              rx="66"
              ry="10"
              fill="oklch(0.72 0.15 252 / 22%)"
              filter="url(#soft)"
            />

            {/* body */}
            <rect
              x="72"
              y="150"
              width="96"
              height="72"
              rx="30"
              fill="url(#shell)"
              stroke="url(#rim)"
              strokeWidth="1.2"
            />
            <rect x="96" y="176" width="48" height="6" rx="3" fill="oklch(1 0 0 / 8%)" />

            {/* neck */}
            <rect x="108" y="138" width="24" height="20" rx="8" fill="oklch(0.23 0.012 265)" />

            {/* head */}
            <rect
              x="52"
              y="42"
              width="136"
              height="104"
              rx="42"
              fill="url(#shell)"
              stroke="url(#rim)"
              strokeWidth="1.4"
            />

            {/* visor */}
            <rect
              x="70"
              y="62"
              width="100"
              height="64"
              rx="30"
              fill="url(#visor)"
              stroke="oklch(1 0 0 / 12%)"
            />

            {/* eyes */}
            <g
              style={{
                transform: `translate(${pupil.x}px, ${pupil.y}px)`,
                transition: "transform 500ms var(--ease-lux)",
              }}
            >
              <circle cx="100" cy="94" r="16" fill="url(#eyeGlow)" opacity="0.55" />
              <circle cx="140" cy="94" r="16" fill="url(#eyeGlow)" opacity="0.55" />
              <g
                style={{
                  transformOrigin: "120px 94px",
                  animation: "blink 7s ease-in-out infinite",
                }}
              >
                <circle cx="100" cy="94" r="7" fill="oklch(0.97 0.02 240)" />
                <circle cx="140" cy="94" r="7" fill="oklch(0.97 0.02 240)" />
              </g>
            </g>

            {/* mouth: animates while speaking */}
            <rect
              x="106"
              y="118"
              width="28"
              height="5"
              rx="2.5"
              fill="oklch(0.72 0.15 252 / 75%)"
              style={{
                transformOrigin: "120px 120px",
                animation: "robot-talk 0.42s ease-in-out infinite",
              }}
            />

            {/* visor highlight */}
            <path
              d="M78 74 Q104 58 150 66"
              stroke="oklch(1 0 0 / 20%)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            {/* antenna */}
            <line
              x1="120"
              y1="42"
              x2="120"
              y2="24"
              stroke="oklch(0.5 0.01 265)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle
              cx="120"
              cy="19"
              r="6"
              fill="oklch(0.72 0.15 252)"
              opacity="0.9"
              style={{ animation: speaking ? "twinkle 1.1s ease-in-out infinite" : "none" }}
            />
            <circle cx="120" cy="19" r="12" fill="oklch(0.72 0.15 252 / 30%)" filter="url(#soft)" />

            {/* arms */}
            <rect
              x="52"
              y="160"
              width="16"
              height="44"
              rx="8"
              fill="oklch(0.24 0.012 265)"
              stroke="oklch(1 0 0 / 8%)"
            />
            <rect
              x="172"
              y="160"
              width="16"
              height="44"
              rx="8"
              fill="oklch(0.24 0.012 265)"
              stroke="oklch(1 0 0 / 8%)"
              style={{
                transformOrigin: "180px 166px",
                animation: waving
                  ? "hand-wave 0.9s ease-in-out infinite"
                  : "arm-wave 9s ease-in-out infinite",
              }}
            />
          </svg>

          {/* soft key light */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--azure) 26%, transparent), transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
