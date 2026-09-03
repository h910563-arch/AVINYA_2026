import { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; r: number; tw: number; ph: number };
type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  max: number;
  w: number;
};
type Rock = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  rot: number;
  vr: number;
  pts: number[];
  o: number;
};

/**
 * Canvas star field: twinkling stars, falling meteors and slowly tumbling asteroids.
 * Sits behind all content, purely decorative.
 */
export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let rocks: Rock[] = [];
    const meteors: Meteor[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const makeRock = (fromTop: boolean): Rock => {
      const r = rand(6, 26);
      const pts: number[] = [];
      for (let i = 0; i < 9; i++) pts.push(rand(0.68, 1.25));
      return {
        x: rand(-40, w + 40),
        y: fromTop ? rand(-h * 0.6, -40) : rand(-40, h),
        vx: rand(-0.08, 0.16),
        vy: rand(0.09, 0.32),
        r,
        rot: rand(0, Math.PI * 2),
        vr: rand(-0.0035, 0.0035),
        pts,
        o: rand(0.06, 0.2),
      };
    };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((w * h) / (mobile ? 19000 : 7000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: rand(0.25, 1),
        r: rand(0.35, mobile ? 1.1 : 1.5),
        tw: rand(0.6, 2.4),
        ph: rand(0, Math.PI * 2),
      }));

      rocks = Array.from({ length: mobile ? 2 : Math.max(5, Math.round(w / 190)) }, () =>
        makeRock(false),
      );
    };

    build();
    window.addEventListener("resize", build);

    let raf = 0;
    let last = performance.now();
    let nextMeteor = 900;

    const drawRock = (rk: Rock) => {
      ctx.save();
      ctx.translate(rk.x, rk.y);
      ctx.rotate(rk.rot);
      ctx.beginPath();
      const n = rk.pts.length;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const rr = rk.r * (rk.pts[i] ?? 1);
        const px = Math.cos(a) * rr;
        const py = Math.sin(a) * rr * 0.82;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      const g = ctx.createLinearGradient(-rk.r, -rk.r, rk.r, rk.r);
      g.addColorStop(0, `rgba(215,225,255,${rk.o})`);
      g.addColorStop(1, `rgba(120,140,190,${rk.o * 0.25})`);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = `rgba(200,215,255,${rk.o * 0.7})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();
      ctx.restore();
    };

    const frame = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      ctx.clearRect(0, 0, w, h);

      // stars
      for (const s of stars) {
        if (!reduced) s.y += s.z * 0.012 * dt;
        if (s.y > h + 2) {
          s.y = -2;
          s.x = Math.random() * w;
        }
        const t = reduced ? 1 : 0.55 + 0.45 * Math.sin((now / 1000) * s.tw + s.ph);
        const alpha = (0.25 + 0.6 * s.z) * t;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235,242,255,${alpha.toFixed(3)})`;
        ctx.fill();
        if (s.r > 1.1) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150,190,255,${(alpha * 0.09).toFixed(3)})`;
          ctx.fill();
        }
      }

      // asteroids
      if (!mobile) {
        for (const rk of rocks) {
          if (!reduced) {
            rk.x += rk.vx * dt * 0.06;
            rk.y += rk.vy * dt * 0.06;
            rk.rot += rk.vr * dt;
          }
          if (rk.y - rk.r > h + 30) Object.assign(rk, makeRock(true));
          drawRock(rk);
        }
      }

      // meteors
      if (!reduced && !mobile) {
        nextMeteor -= dt;
        if (nextMeteor <= 0) {
          nextMeteor = rand(1400, 4200);
          const speed = rand(0.55, 1.1);
          meteors.push({
            x: rand(-w * 0.1, w * 0.95),
            y: rand(-120, h * 0.35),
            vx: speed * rand(0.5, 0.8),
            vy: speed,
            len: rand(110, 260),
            life: 0,
            max: rand(900, 1500),
            w: rand(0.9, 1.9),
          });
        }
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        if (!m) continue;
        m.life += dt;
        m.x += m.vx * dt * 0.42;
        m.y += m.vy * dt * 0.42;
        const p = m.life / m.max;
        if (p >= 1 || m.y > h + 200) {
          meteors.splice(i, 1);
          continue;
        }
        const fade = Math.sin(Math.PI * p);
        const nx = m.vx / Math.hypot(m.vx, m.vy);
        const ny = m.vy / Math.hypot(m.vx, m.vy);
        const tailX = m.x - nx * m.len;
        const tailY = m.y - ny * m.len;
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255,255,255,${(0.85 * fade).toFixed(3)})`);
        grad.addColorStop(0.25, `rgba(150,200,255,${(0.42 * fade).toFixed(3)})`);
        grad.addColorStop(1, "rgba(150,200,255,0)");
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.w;
        ctx.lineCap = "round";
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.w * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(0.7 * fade).toFixed(3)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
