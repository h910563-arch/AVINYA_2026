import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useRef, useEffect, useState } from "react";

export function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    // Only enable interactive 3D physics on devices with fine pointer (mouse/trackpad)
    setHasPointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

  // Glare effect transforms
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [80, -80]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [80, -80]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!hasPointer) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  }

  function handleMouseLeave() {
    if (!hasPointer) return;
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: hasPointer ? rotateY : 0,
        rotateX: hasPointer ? rotateX : 0,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full w-full cursor-pointer group transition-transform duration-300 ease-out will-change-transform"
    >
      <div
        style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
        className="h-full w-full relative rounded-[1.4rem] overflow-hidden"
      >
        {/* Subtle shine sweep on hover (runs on GPU) */}
        <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-[1.4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 left-0 h-[220%] w-[45%] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
        </div>

        {/* Interactive glare overlay on fine pointer */}
        {hasPointer && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[1.4rem]"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, transparent 65%)",
              x: glareX,
              y: glareY,
            }}
          />
        )}
        {children}
      </div>
    </motion.div>
  );
}
