import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Atmosphere } from "@/components/site/Atmosphere";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { SectionSkeleton } from "@/components/site/SectionSkeleton";

const About = lazy(() => import("@/components/site/About").then((m) => ({ default: m.About })));
const Events = lazy(() => import("@/components/site/Events").then((m) => ({ default: m.Events })));
const Timeline = lazy(() => import("@/components/site/Timeline").then((m) => ({ default: m.Timeline })));
const Gallery = lazy(() => import("@/components/site/Gallery").then((m) => ({ default: m.Gallery })));
const Team = lazy(() => import("@/components/site/Team").then((m) => ({ default: m.Team })));
const Sponsors = lazy(() => import("@/components/site/Sponsors").then((m) => ({ default: m.Sponsors })));
const Footer = lazy(() => import("@/components/site/Footer").then((m) => ({ default: m.Footer })));

const TITLE = "अvinya'26 | Annual Tech Fest";
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
        <Suspense fallback={<SectionSkeleton height="50vh" />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height="100vh" />}>
          <Events />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height="80vh" />}>
          <Timeline />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height="80vh" />}>
          <Gallery />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height="100vh" />}>
          <Team />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height="50vh" />}>
          <Sponsors />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-64 bg-background" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
