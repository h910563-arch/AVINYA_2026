import { useSiteContent } from "@/lib/site-content-context";
import { RevealText } from "./Reveal";
import DomeGallery from "./DomeGallery";

export function Gallery() {
  const { gallery: GALLERY } = useSiteContent();

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
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan">
              Visual Archives
            </span>
            <h2 className="mt-2 font-display text-[clamp(2.2rem,6vw,4rem)] font-semibold">
              <RevealText text="Moments" />
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 font-mono text-[11px] text-muted-foreground backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]" />
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
            openedImageWidth="520px"
            openedImageHeight="520px"
            dragSensitivity={18}
            dragDampening={1.8}
            autoRotate={true}
            autoRotateSpeed={0.16}
          />
        </div>
      </div>
    </section>
  );
}
