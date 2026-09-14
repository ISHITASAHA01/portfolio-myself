import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Background, CursorGlow, LoadingScreen, ScrollProgress } from "@/components/portfolio/Atmosphere";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Journey } from "@/components/portfolio/Journey";
import { Achievements } from "@/components/portfolio/Achievements";
import { Gallery } from "@/components/portfolio/Gallery";
// import { Testimonials } from "@/components/portfolio/Testimonials";
import { Contact } from "@/components/portfolio/Contact";
import { BackToTop, FloatingSocials, Footer } from "@/components/portfolio/Footer";

const TITLE = "Ishita Saha — Game Developer & Gameplay Programmer";
const DESCRIPTION =
  "Portfolio of Ishita Saha, a game developer crafting immersive worlds, engaging gameplay and unforgettable experiences in Unity and Unreal Engine.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Ishita Saha",
          jobTitle: "Game Developer",
          description: DESCRIPTION,
          knowsAbout: ["Unity", "Unreal Engine", "C++", "C#", "Gameplay Programming", "Game AI"],
          sameAs: ["https://github.com", "https://linkedin.com"],
        }),
      },
    ],
  }),
});

function Index() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <LoadingScreen />
      <Background />
      <CursorGlow />
      <ScrollProgress />
      <Nav />
      <FloatingSocials />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Journey />
        <Gallery />
        {/* <Testimonials /> */}
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
