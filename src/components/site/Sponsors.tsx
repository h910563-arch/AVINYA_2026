import { useEffect, useState } from "react";
import { Reveal, RevealText } from "./Reveal";
import CircularCarousel from "./CircularCarousel";

/** Returns the current window inner-width, updated on every resize. */
function useWindowWidth() {
  const [w, setW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const update = () => setW(window.innerWidth);
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);
  return w;
}

export function Sponsors() {
  const vw = useWindowWidth();

  // ── Responsive carousel props ──────────────────────────────────────────────
  // Breakpoints:  ≤480 (phones) | ≤640 (large phones / foldable)
  //               ≤768 (tablets) | ≤1024 (iPad Pro / small laptop) | >1024 (desktop)
  const cardWidth = vw <= 480 ? 120 : vw <= 640 ? 148 : vw <= 768 ? 175 : vw <= 1024 ? 215 : 280;
  const gap       = vw <= 480 ? 14  : vw <= 640 ? 20  : vw <= 768 ? 30  : vw <= 1024 ? 45  : 65;
  const height    = vw <= 480 ? 260 : vw <= 640 ? 300 : vw <= 768 ? 360 : vw <= 1024 ? 420 : 480;
  // ──────────────────────────────────────────────────────────────────────────

  const items = [
    { src: "/logo/66b21b1a0d87de951a125c3c.png",        alt: "IIElevenLabs",     title: "IIElevenLabs" },
    { src: "/logo/AlteredSecurity-2048x594--1-.png",     alt: "Altered Security", title: "Altered Security" },
    { src: "/logo/DEVNOVATE.png",                        alt: "Devnovate",        title: "Devnovate" },
    { src: "/logo/IBlogo_light.png",                     alt: "IB",               title: "IB" },
    { src: "/logo/UptoSkills.png",                       alt: "UptoSkills",       title: "UptoSkills" },
    { src: "/logo/logo.png",                             alt: "Partner",          title: "Partner" },
    { src: "/logo/skillstory-text.png",                  alt: "Skillstory",       title: "Skillstory" },
    { src: "/logo/indiebox logo.PNG",                    alt: "Indiebox",         title: "Indiebox" },
    { src: "/logo/xyz logo.png",                         alt: "XYZ",              title: "XYZ" },
    { src: "/logo/shekunj logo.png",                     alt: "Shekunj",          title: "Shekunj" },
  ];

  return (
    <section className="relative px-4 pt-28 pb-4 sm:px-6 sm:pt-36 sm:pb-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-0 font-display text-[clamp(1.6rem,5vw,4rem)] font-semibold sm:mb-1">
          <RevealText text="Community Partners & Sponsors" />
        </h2>
      </div>

      <Reveal>
        <div style={{ width: "100%", height: `${height}px`, position: "relative" }}>
          <CircularCarousel
            items={items}
            preset="cylinder"
            intro="rise"
            cardWidth={cardWidth}
            aspectRatio={1.6}
            gap={gap}
            curve={0}
            speed={20}
            autoplay="drift"
            pauseOnHover={true}
            draggable={true}
            depthFade={0.45}
            fadeColor="#0e0e1a"
            cornerRadius={vw <= 480 ? 12 : 18}
            captions={false}
          />
        </div>
      </Reveal>
    </section>
  );
}
