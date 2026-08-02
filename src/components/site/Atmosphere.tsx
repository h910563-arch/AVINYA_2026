import { useEffect, useRef } from "react";
import { StarField } from "./StarField";
import { Ufos } from "./Ufos";

/**
 * Living environment: slow aurora meshes, drifting light rays, grain,
 * and a soft light that follows the pointer.
 */
export function Atmosphere() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight * 0.35;
    let cx = tx;
    let cy = ty;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      cx += (tx - cx) * 0.045;
      cy += (ty - cy) * 0.045;
      if (glow.current) {
        glow.current.style.transform = `translate3d(${cx - 340}px, ${cy - 340}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden grain">
      <div className="absolute inset-0 bg-background" />

      <StarField />
      <Ufos />


      {/* aurora meshes */}
      <div
        className="absolute -top-[30%] left-[-15%] h-[80vw] w-[80vw] rounded-full opacity-[0.5] blur-[130px]"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, color-mix(in oklab, var(--azure) 55%, transparent), transparent 62%)",
          animation: "drift-a 34s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[10%] right-[-20%] h-[70vw] w-[70vw] rounded-full opacity-[0.42] blur-[150px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--violet) 55%, transparent), transparent 64%)",
          animation: "drift-b 46s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-25%] left-[20%] h-[65vw] w-[65vw] rounded-full opacity-[0.3] blur-[160px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--cyan) 40%, transparent), transparent 66%)",
          animation: "drift-c 58s ease-in-out infinite",
        }}
      />

      {/* slow light rays */}
      <div
        className="absolute inset-x-0 top-[-20%] h-[140%] opacity-[0.14] blur-[2px]"
        style={{
          background:
            "repeating-linear-gradient(102deg, transparent 0 90px, oklch(1 0 0 / 5%) 90px 92px, transparent 92px 220px)",
          animation: "drift-c 70s ease-in-out infinite",
        }}
      />

      {/* pointer light */}
      <div
        ref={glow}
        className="absolute h-[680px] w-[680px] rounded-full opacity-[0.35] blur-[110px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--silver) 22%, transparent), transparent 62%)",
        }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, transparent 30%, oklch(0.1 0.01 265 / 60%) 100%)",
        }}
      />
    </div>
  );
}
