import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

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

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn(
        "group relative inline-flex select-none items-center justify-center overflow-hidden rounded-full px-6 py-3 text-[13.5px] whitespace-nowrap tracking-tight transition-[transform,box-shadow,border-color] duration-500 active:scale-[0.97]",
        variant === "solid"
          ? "bg-primary font-medium text-primary-foreground shadow-[0_0_24px_rgba(255,255,255,0.5)] hover:shadow-[0_0_32px_rgba(255,255,255,0.7)]"
          : "glass font-medium text-foreground hover:border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_28px_rgba(255,255,255,0.4)]",
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
          background:
            variant === "solid"
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
