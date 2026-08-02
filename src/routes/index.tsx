import { createFileRoute } from "@tanstack/react-router";
import { Atmosphere } from "@/components/site/Atmosphere";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Events } from "@/components/site/Events";
import { Timeline } from "@/components/site/Timeline";
import { Gallery } from "@/components/site/Gallery";
import { Team } from "@/components/site/Team";
import { Sponsors } from "@/components/site/Sponsors";
import { Footer } from "@/components/site/Footer";

const TITLE = "अvinya'26 — Infinity Unleashed | Annual Tech Fest";
const DESC =
  "अVINYA'26, the annual tech fest by The Empirical Society at GTB 4th Centenary Engineering College. Flagship events, workshops and an inter-college showcase, 04–06 March 2026.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://avinya-26.vercel.app/assets/banner-u2Q6ufGC.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://avinya-26.vercel.app/assets/banner-u2Q6ufGC.webp" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen">
      <SmoothScroll />
      <Atmosphere />
      <Nav />
      <main>
        <Hero />
        <About />
        <Events />
        <Timeline />
        <Gallery />
        <Team />
        <Sponsors />
      </main>
      <Footer />
    </div>
  );
}
