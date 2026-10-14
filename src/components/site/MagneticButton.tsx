import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { THEME_WEB } from "@/lib/site-data";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
};

/** Physical button: magnetic pull, moving light reflection, soft press. */
export function MagneticButton({ href, children, variant = "solid", className }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [light, setLight] = useState({ x: 50, y: 50, on: false });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setLight({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      on: true,
    });
  };

  const reset = () => {
    setLight((l) => ({ ...l, on: false }));
  };

  const themeClasses = THEME_WEB
    ? variant === "solid"
      ? "bg-[#e62429] font-medium text-white border border-[#ff4d4f]/60 shadow-[0_0_22px_rgba(230,36,41,0.55)] hover:shadow-[0_0_34px_rgba(230,36,41,0.85)] hover:bg-[#ee2a2f]"
      : "border border-[#2f6bff]/50 bg-[#080d22]/75 font-medium text-[#e8ecff] hover:border-[#2f6bff] hover:text-white shadow-[0_0_18px_rgba(47,107,255,0.28)] hover:shadow-[0_0_28px_rgba(47,107,255,0.5)] backdrop-blur-md"
    : variant === "solid"
      ? "bg-primary font-medium text-primary-foreground shadow-[0_0_24px_rgba(255,255,255,0.5)] hover:shadow-[0_0_32px_rgba(255,255,255,0.7)]"
      : "glass font-medium text-foreground hover:border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_28px_rgba(255,255,255,0.4)]";

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn(
        "group relative inline-flex select-none items-center justify-center overflow-hidden rounded-full px-5 py-3 sm:px-6 text-[13px] sm:text-[13.5px] text-center sm:whitespace-nowrap tracking-tight transition-[transform,box-shadow,border-color,background-color] duration-500 active:scale-[0.97]",
        themeClasses,
        className,
      )}
      style={{
        transitionTimingFunction: "var(--ease-lux)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: light.on ? 1 : 0,
          background: THEME_WEB
            ? variant === "solid"
              ? `radial-gradient(140px circle at ${light.x}% ${light.y}%, rgba(255, 255, 255, 0.35), transparent 70%)`
              : `radial-gradient(160px circle at ${light.x}% ${light.y}%, rgba(47, 107, 255, 0.35), transparent 70%)`
            : variant === "solid"
              ? `radial-gradient(140px circle at ${light.x}% ${light.y}%, oklch(0.72 0.15 252 / 45%), transparent 70%)`
              : `radial-gradient(160px circle at ${light.x}% ${light.y}%, oklch(1 0 0 / 14%), transparent 70%)`,
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-18deg] bg-white/25 blur-md transition-transform duration-[1100ms] group-hover:translate-x-[380%]"
        style={{ transitionTimingFunction: "var(--ease-lux)" }}
      />
      <span className="relative z-10">{children}</span>
    </a>
  );
}
