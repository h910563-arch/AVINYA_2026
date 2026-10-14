import { useState, useEffect } from "react";
import { useSiteContent } from "@/lib/site-content-context";
import { THEME_WEB } from "@/lib/site-data";
import { RevealText } from "./Reveal";
import DomeGallery from "./DomeGallery";

export function Gallery() {
  const { gallery: GALLERY } = useSiteContent();
  const [openedSize, setOpenedSize] = useState("520px");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setOpenedSize(window.innerWidth < 640 ? "320px" : "520px");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const galleryImages = GALLERY.map((src) => ({
    src,
    alt: "Avinya Fest Moment",
  }));

  return (
    <section id="gallery" className="relative px-6 pt-12 pb-0 sm:pt-16 sm:pb-0">
      <div className="mx-auto max-w-6xl">
        {/* Header with Title and Drag Hint */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span
              className={`font-mono text-xs font-semibold uppercase tracking-[0.25em] ${
                THEME_WEB ? "text-[#e62429]" : "text-cyan"
              }`}
            >
              Visual Archives
            </span>
            <h2
              className={`mt-2 font-display text-[clamp(2.2rem,6vw,4rem)] font-semibold ${
                THEME_WEB ? "section-heading-spider" : ""
              }`}
            >
              <RevealText text="Moments" />
            </h2>
          </div>

          <div
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[11px] backdrop-blur-xl ${
              THEME_WEB
                ? "border-[#2f6bff]/35 bg-[#080d24]/75 text-[#e8ecff] shadow-[0_0_12px_rgba(47,107,255,0.2)]"
                : "border-white/12 bg-white/5 text-muted-foreground"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                THEME_WEB ? "bg-[#e62429] shadow-[0_0_8px_#e62429]" : "bg-cyan shadow-[0_0_8px_var(--color-cyan)]"
              }`}
            />
            <span>Drag to rotate • Click tile to expand</span>
          </div>
        </div>

        {/* Dome Gallery 3D Viewport floating seamlessly on page */}
        <div className="relative h-[560px] w-full sm:h-[640px] lg:h-[700px]">
          <DomeGallery
            images={galleryImages}
            fit={0.82}
            fitBasis="width"
            minRadius={650}
            maxRadius={1300}
            overlayBlurColor="transparent"
            grayscale={false}
            imageBorderRadius="18px"
            openedImageBorderRadius="24px"
            openedImageWidth={openedSize}
            openedImageHeight={openedSize}
            dragSensitivity={18}
            dragDampening={1.8}
            segments={isMobile ? 14 : 35}
            autoRotate={!isMobile}
            autoRotateSpeed={0.16}
          />
        </div>
      </div>
    </section>
  );
}
