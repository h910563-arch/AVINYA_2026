import { GALLERY } from "@/lib/site-data";
import { Reveal, RevealText } from "./Reveal";

export function Gallery() {
  return (
    <section id="gallery" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-14 font-display text-[clamp(2.2rem,6vw,4rem)] font-semibold">
          <RevealText text="Moments" />
        </h2>

        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {GALLERY.map((src, i) => (
            <Reveal key={src} delay={(i % 4) * 0.07} y={20}>
              <figure className="group relative overflow-hidden rounded-2xl border border-white/8">
                <img
                  src={src}
                  alt="Gallery image"
                  loading="lazy"
                  className="w-full object-cover opacity-80 transition-[transform,opacity] duration-[1400ms] group-hover:scale-[1.05] group-hover:opacity-100"
                  style={{ transitionTimingFunction: "var(--ease-lux)" }}
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-25" />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
