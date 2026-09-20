import { createFileRoute } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AboutMe from "../components/AboutMe";
import TechnicalSkills from "../components/TechnicalSkills";
import Certifications from "../components/Certifications";
import WorkExperience from "../components/WorkExperience";
import Education from "../components/Education";
import FeaturedProjects from "../components/FeaturedProjects";
import LetsConnect from "../components/LetsConnect";

const BASE_IMAGE = "./images/Base_image.png";
const REVEAL_IMAGE = "./images/Reveal_image.png";
const SPOTLIGHT_R = 260;

type Point = { x: number; y: number };

type RevealLayerProps = {
  image: string;
  cursorX: number;
  cursorY: number;
  radius: number;
};

function RevealLayer({ image, cursorX, cursorY, radius }: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);
    return () => window.removeEventListener("resize", sizeCanvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reveal = revealRef.current;
    if (!canvas || !reveal) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = window.devicePixelRatio || 1;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    const gradient = context.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      radius,
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,1)");
    gradient.addColorStop(0.6, "rgba(255,255,255,0.75)");
    gradient.addColorStop(0.75, "rgba(255,255,255,0.4)");
    gradient.addColorStop(0.88, "rgba(255,255,255,0.12)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    context.fillStyle = gradient;
    context.beginPath();
    context.arc(cursorX, cursorY, radius, 0, Math.PI * 2);
    context.fill();

    const mask = `url(${canvas.toDataURL()})`;
    reveal.style.maskImage = mask;
    reveal.style.webkitMaskImage = mask;
  }, [cursorX, cursorY, radius]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ display: "none" }}
        aria-hidden="true"
      />
      <div
        ref={revealRef}
        className="pointer-events-none absolute inset-0 z-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />
    </>
  );
}

function BrandLogo() {
  return (
    <span className="flex items-center gap-2.5" aria-label="Nasha.co home">
      <svg
        width="26"
        height="26"
        viewBox="0 0 256 256"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
      </svg>
      <span className="font-playfair text-xl font-medium italic">Nasha.co</span>
    </span>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
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
});

function Index() {
  const mouse = useRef<Point>({ x: -999, y: -999 });
  const smooth = useRef<Point>({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);
  const [cursorPos, setCursorPos] = useState<Point>({ x: -999, y: -999 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY };
    };

    const animate = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({ ...smooth.current });
      rafRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <main className="min-h-screen bg-page font-sans tracking-[-0.02em]">
      <section
        className="relative h-screen w-full overflow-hidden bg-hero"
        style={{ height: "100dvh" }}
      >
        <div
          className="hero-zoom absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${BASE_IMAGE})` }}
          aria-hidden="true"
        />

        <RevealLayer
          image={REVEAL_IMAGE}
          cursorX={cursorPos.x}
          cursorY={cursorPos.y}
          radius={SPOTLIGHT_R}
        />

        <nav className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 text-hero-foreground sm:px-8 sm:py-7 md:px-14">
          <a href="/" className="shrink-0" aria-label="Nasha.co home">
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
            href="mailto:hello@dhaval.co"
            className="hidden rounded-full bg-hero-foreground px-6 py-2.5 text-sm font-semibold text-hero transition-colors hover:bg-hero-foreground/90 md:block"
          >
            Let's talk
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
              NASHA
            </span>
            <span
              className="hero-anim hero-reveal font-playfair mt-3 block text-base italic text-hero-foreground/90 sm:mt-4 sm:text-lg md:text-xl"
              style={{ letterSpacing: "-0.02em", animationDelay: "0.58s" }}
            >
              UXUI Designer
            </span>
          </h1>
        </div>

        <div
          id="about"
          className="hero-anim hero-fade absolute bottom-14 z-50 hidden max-w-[260px] text-hero-foreground sm:block"
          style={{ left: "100px", animationDelay: "0.7s" }}
        >
          <p className="text-sm font-light leading-relaxed text-hero-foreground/75">
            I design with curiosity and build with code. Obsessed with AI tools, live coding,
            and finding new ways to make digital experiences feel alive.
          </p>
        </div>

        <div
          id="contact"
          className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 text-hero-foreground sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[260px] sm:gap-5 md:right-14"
          style={{ animationDelay: "0.85s" }}
        >
          <p className="text-sm font-light leading-relaxed text-hero-foreground/75">
            UX/UI designer who codes. I use AI to design faster, build smarter, and create
            digital experiences that actually work.
          </p>
        </div>

        <span id="projects" className="sr-only">Projects</span>
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
