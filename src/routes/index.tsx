import { createFileRoute } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import HeroCanvasSequence from "../components/HeroCanvasSequence";
import AboutMe from "../components/AboutMe";
import TechnicalSkills from "../components/TechnicalSkills";
import Certifications from "../components/Certifications";
import WorkExperience from "../components/WorkExperience";
import Education from "../components/Education";
import FeaturedProjects from "../components/FeaturedProjects";
import LetsConnect from "../components/LetsConnect";

function BrandLogo() {
  return (
    <span className="flex items-center gap-2.5" aria-label=" home">
      <svg
        width="26"
        height="26"
        viewBox="0 0 256 256"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
      </svg>
      <span className="font-playfair text-xl font-medium italic"></span>
    </span>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhaval.co — Nasha, UX/UI Designer" },
      {
        name: "description",
        content:
          "Portfolio of Nasha, a UX/UI designer who combines curiosity, code, and AI to create digital experiences that work.",
      },
      { property: "og:title", content: "Dhaval.co — Nasha, UX/UI Designer" },
      {
        property: "og:description",
        content: "UX/UI design, creative coding, and AI-powered digital experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const heroTrackRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="min-h-screen bg-page font-sans tracking-[-0.02em]">
      <section
        ref={heroTrackRef}
        className="relative w-full md:h-[300vh] h-[100dvh]"
      >
        <div
          className="sticky top-0 h-screen w-full overflow-hidden bg-hero bg-cover bg-center bg-no-repeat"
          style={{
            height: "100dvh",
            backgroundImage: "url(/images/hero_background.png)",
          }}
        >
          {/* Static Hero Background Layer */}
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url(/images/hero_background.png)",
            }}
            aria-hidden="true"
          />

          <HeroCanvasSequence
            containerRef={heroTrackRef}
            isDesktop={isDesktop}
          />

          <nav className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 text-hero-foreground sm:px-8 sm:py-7 md:px-14">
            <a href="/" className="shrink-0" aria-label="home">
              <BrandLogo />
            </a>

            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-hero-foreground/30 bg-hero-foreground/20 px-2 py-2 backdrop-blur-md md:flex">
              <a
                href="#about"
                className="rounded-full px-4 py-1.5 text-sm font-medium text-hero-foreground transition-colors hover:bg-hero-foreground/20"
              >
                About
              </a>
              <a
                href="#projects"
                className="rounded-full px-4 py-1.5 text-sm font-medium text-hero-foreground/80 transition-colors hover:bg-hero-foreground/20 hover:text-hero-foreground"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="rounded-full px-4 py-1.5 text-sm font-medium text-hero-foreground/80 transition-colors hover:bg-hero-foreground/20 hover:text-hero-foreground"
              >
                Contact
              </a>
            </div>

            <a
              href="#lets-connect"
              className="hidden rounded-full bg-hero-foreground px-6 py-2.5 text-sm font-semibold text-hero transition-colors hover:bg-hero-foreground/90 md:block"
            >
              Let's connect
            </a>
            <button
              type="button"
              className="rounded-full border border-hero-foreground/25 bg-hero-foreground/15 p-2 text-hero-foreground backdrop-blur-md md:hidden"
              aria-label="Open navigation"
            >
              <Menu size={22} strokeWidth={1.8} />
            </button>
          </nav>

          <div
            className="pointer-events-none absolute top-1/2 z-50 flex -translate-y-1/2 flex-col items-start px-5 text-left text-hero-foreground"
            style={{ left: "80px" }}
          >
            <h1>
              <span
                className="hero-anim hero-reveal font-playfair block text-5xl font-normal italic sm:text-7xl md:text-8xl"
                style={{ letterSpacing: "-0.05em", animationDelay: "0.25s" }}
              >
                I'm
              </span>
              <span
                className="hero-anim hero-reveal -mt-1 block text-5xl font-normal sm:text-7xl md:text-8xl"
                style={{ letterSpacing: "-0.08em", animationDelay: "0.42s" }}
              >
                SAI TEJA
              </span>
              <span
                className="hero-anim hero-reveal font-playfair mt-3 block text-base italic text-hero-foreground/90 sm:mt-4 sm:text-lg md:text-xl"
                style={{ letterSpacing: "-0.02em", animationDelay: "0.58s" }}
              >
                Network Security Engineer / Penetration Tester
              </span>
            </h1>
          </div>

          <div
            id="about"
            className="hero-anim hero-fade absolute bottom-14 z-50 hidden max-w-[260px] text-hero-foreground sm:block"
            style={{ left: "100px", animationDelay: "0.7s" }}
          >
            <p className="text-sm font-light leading-relaxed text-hero-foreground/75">
              3+ years defending enterprise firewalls — now I break them, ethically. Sharpening offensive skills through hands-on network pentesting, CTFs, and independent labs.
            </p>
          </div>

          <div
            id="contact"
            className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 text-hero-foreground sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[260px] sm:gap-5 md:right-14"
            style={{ animationDelay: "0.85s" }}
          >
            <p className="text-sm font-light leading-relaxed text-hero-foreground/75">
              Network security engineer turned penetration tester, pursuing an M.Sc. in Mathematical Data Science in Germany. Certified. Curious. Built for the network layer.
            </p>
          </div>

          <span id="projects" className="sr-only">Projects</span>
        </div>
      </section>

      {/* About Me Section */}
      <AboutMe />

      {/* Technical Skills Section */}
      <TechnicalSkills />

      {/* Certifications Section */}
      <Certifications />

      {/* Work Experience Section */}
      <WorkExperience />

      {/* Education Section */}
      <Education />

      {/* Featured Projects Section */}
      <FeaturedProjects />

      {/* Let's Connect Section */}
      <LetsConnect />
    </main>
  );
}
