import { motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

function useSeen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

export type RevealVariant =
  | "up"
  | "left"
  | "right"
  | "scale"
  | "flip"
  | "flip-y"
  | "tilt"
  | "swing"
  | "zoom-blur";

/** Distinct entrance choreographies so each card arrives differently. */
export const REVEAL_VARIANTS: RevealVariant[] = [
  "up",
  "flip",
  "left",
  "scale",
  "swing",
  "right",
  "flip-y",
  "tilt",
  "zoom-blur",
];

export function revealVariant(i: number): RevealVariant {
  return REVEAL_VARIANTS[((i % REVEAL_VARIANTS.length) + REVEAL_VARIANTS.length) % REVEAL_VARIANTS.length] ?? "up";
}

function statesFor(variant: RevealVariant, y: number) {
  const to = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    filter: "blur(0px)",
  };
  const base = { opacity: 0, x: 0, y: 0, scale: 1, rotate: 0, rotateX: 0, rotateY: 0, filter: "blur(10px)" };

  switch (variant) {
    case "left":
      return { from: { ...base, x: -56, y: y * 0.3 }, to };
    case "right":
      return { from: { ...base, x: 56, y: y * 0.3 }, to };
    case "scale":
      return { from: { ...base, scale: 0.86, y: y * 0.5 }, to };
    case "flip":
      return { from: { ...base, rotateX: -42, y: y * 0.8 }, to };
    case "flip-y":
      return { from: { ...base, rotateY: 38, x: 26 }, to };
    case "tilt":
      return { from: { ...base, rotate: -6, y, scale: 0.94 }, to };
    case "swing":
      return { from: { ...base, rotate: 7, x: 34, y: y * 0.4 }, to };
    case "zoom-blur":
      return { from: { ...base, scale: 1.14, filter: "blur(18px)" }, to };
    default:
      return { from: { ...base, y }, to };
  }
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  variant?: RevealVariant;
}) {
  const { ref, seen } = useSeen<HTMLDivElement>();
  const { from, to } = statesFor(variant, y);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      initial={from}
      animate={seen ? to : from}
      transition={{ duration: 1.05, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word mask reveal for headlines. */
export function RevealText({
  text,
  className,
  wordClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);


  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pr-2 -mr-2 pb-1 -mb-1">
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 1.05, delay: delay + i * 0.06, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
