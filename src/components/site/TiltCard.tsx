"use client";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";

export function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  // Glare effect transforms
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [100, -100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [100, -100]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ y: [0, -15, 0], rotateZ: [-2, 2, -2] }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full w-full cursor-pointer group"
    >
      <div
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        className="h-full w-full relative rounded-[1.4rem] overflow-hidden"
      >
        {/* Continuous shine overlay */}
        <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-[1.4rem]">
          <div className="absolute top-0 left-0 h-[250%] w-[50%] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.4)] to-transparent animate-shine mix-blend-overlay" />
        </div>

        {/* Interactive glare overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.4rem]"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 60%)",
            x: glareX,
            y: glareY,
          }}
        />
        {children}
      </div>
    </motion.div>
  );
}
