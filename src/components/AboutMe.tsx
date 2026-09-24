import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CybersecurityShield from "./CybersecurityShield";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Inline SVG icons for the info pills                                */
/* ------------------------------------------------------------------ */
function LocationIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function WorkPermitIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function NationalityIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Skill labels for the right column                                  */
/* ------------------------------------------------------------------ */
const SKILLS = [
  { label: "Network Security", isRed: false },
  { label: "Penetration Testing", isRed: false },
  { label: "Red Teaming", isRed: true },
  { label: "Cloud Security", isRed: false },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  /* Element refs for animation targets */
  const labelRef = useRef<HTMLDivElement>(null);
  const mottoRef = useRef<HTMLDivElement>(null);
  const headingLine1Ref = useRef<HTMLSpanElement>(null);
  const headingLine2Ref = useRef<HTMLSpanElement>(null);
  const headingLine3Ref = useRef<HTMLSpanElement>(null);
  const quoteLineRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const shieldRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Respect prefers-reduced-motion */
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion) {
      /* Show everything immediately */
      const els = [
        labelRef.current,
        mottoRef.current,
        headingLine1Ref.current,
        headingLine2Ref.current,
        headingLine3Ref.current,
        quoteLineRef.current,
        quoteTextRef.current,
        bioRef.current,
        pillsRef.current,
        skillsRef.current,
      ];
      els.forEach((el) => {
        if (el) {
          gsap.set(el, { opacity: 1, y: 0, x: 0 });
        }
      });
      if (quoteLineRef.current) gsap.set(quoteLineRef.current, { scaleY: 1 });
      /* Reveal pills children */
      if (pillsRef.current) {
        gsap.set(pillsRef.current.children, { opacity: 1, y: 0 });
      }
      if (skillsRef.current) {
        gsap.set(skillsRef.current.children, { opacity: 1, y: 0 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      /* ---- Set initial states ---- */
      gsap.set(
        [
          labelRef.current,
          mottoRef.current,
          headingLine1Ref.current,
          headingLine2Ref.current,
          headingLine3Ref.current,
          bioRef.current,
        ],
        { opacity: 0, y: 15 },
      );

      gsap.set(quoteTextRef.current, { opacity: 0, x: 20 });
      gsap.set(quoteLineRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      if (pillsRef.current) {
        gsap.set(Array.from(pillsRef.current.children), {
          opacity: 0,
          y: 12,
        });
      }

      if (skillsRef.current) {
        gsap.set(Array.from(skillsRef.current.children), {
          opacity: 0,
          y: 10,
        });
      }

      /* ---- Floating parallax on shield (desktop only) ---- */
      if (!isMobile && shieldRef.current) {
        gsap.to(shieldRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      /* ---- Master timeline with pin ---- */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 85%" : "top top",
          end: isMobile ? "+=400" : "+=1600",
          pin: !isMobile,
          pinSpacing: true,
          scrub: isMobile ? 0.5 : 1,
          anticipatePin: 1,
        },
      });

      /* 1 — Label + motto */
      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0.1);
      tl.to(mottoRef.current, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0.2);

      /* 3 — Heading lines */
      tl.to(headingLine1Ref.current, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.28);
      tl.to(headingLine2Ref.current, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.36);
      tl.to(headingLine3Ref.current, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.44);

      /* 4 — Quote vertical line draws in, then quote text slides */
      tl.to(quoteLineRef.current, { scaleY: 1, duration: 0.35, ease: "power2.inOut" }, 0.42);
      tl.to(quoteTextRef.current, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, 0.52);

      /* 5 — Bio paragraph */
      tl.to(bioRef.current, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0.58);

      /* 6 — Skills labels on right */
      if (skillsRef.current) {
        const skillEls = Array.from(skillsRef.current.children);
        skillEls.forEach((el, i) => {
          tl.to(el, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }, 0.55 + i * 0.06);
        });
      }

      /* 7 — Info pills sequentially */
      if (pillsRef.current) {
        const pillEls = Array.from(pillsRef.current.children);
        pillEls.forEach((el, i) => {
          tl.to(el, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.72 + i * 0.07);
        });
      }

      /* 8 — Hold completed composition */
      tl.to({}, { duration: 0.2 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section" aria-label="About Me">
      <span id="about-me" className="sr-only">About Sai Teja</span>
      {/* 1. REFERENCE 2 background image — bottom layer */}
      <div className="about-bg-layer" aria-hidden="true" />

      {/* 2. Very subtle dark/black readability overlay */}
      <div className="about-bg-overlay" aria-hidden="true" />

      <div ref={innerRef} className="about-inner">
        {/* ---- LEFT COLUMN ---- */}
        <div className="about-left">
          {/* Section label */}
          <div ref={labelRef} className="about-label">
            <span className="about-label-slash">/</span>
            <span className="about-label-text">ABOUT ME</span>
          </div>

          {/* Main heading */}
          <h2 className="about-heading">
            <span ref={headingLine1Ref} className="about-heading-line">
              Network Security
            </span>
            <span ref={headingLine2Ref} className="about-heading-line">
              Engineer Turned
            </span>
            <span ref={headingLine3Ref} className="about-heading-line about-heading-red">
              Penetration Tester.
            </span>
          </h2>

          {/* Quote */}
          <div className="about-quote-wrapper">
            <div className="about-quote-marks-open" aria-hidden="true">
              "
            </div>
            <div className="about-quote-block">
              <div ref={quoteLineRef} className="about-quote-line" aria-hidden="true" />
              <div ref={quoteTextRef} className="about-quote-text">
                <p>Same networks.</p>
                <p>Different perspective.</p>
                <p>Defend. Break. Learn. Repeat.</p>
              </div>
            </div>
            <div className="about-quote-marks-close" aria-hidden="true">
              "
            </div>
          </div>

          {/* Bio */}
          <div ref={bioRef} className="about-bio">
            <p>
              3+ years defending enterprise firewalls — now I break them, ethically. Sharpening
              offensive skills through hands-on network pentesting, CTFs, and independent labs.
              Pursuing an M.Sc. in Mathematical Data Science in Germany, alongside it.
            </p>
            <p>Certified. Curious. Built for the network layer.</p>
          </div>

          {/* Info Pills */}
          <div ref={pillsRef} className="about-pills">
            <div className="about-pill">
              <span className="about-pill-icon">
                <LocationIcon />
              </span>
              <span>Berlin, Germany</span>
            </div>
            <div className="about-pill">
              <span className="about-pill-icon">
                <WorkPermitIcon />
              </span>
              <span>Work Permit: German</span>
            </div>
            <div className="about-pill">
              <span className="about-pill-icon">
                <NationalityIcon />
              </span>
              <span>Nationality: Indian</span>
            </div>
          </div>
        </div>

        {/* ---- RIGHT COLUMN ---- */}
        <div className="about-right">
          {/* Motto text */}
          <div ref={mottoRef} className="about-motto">
            <span>DEFEND</span>
            <span className="about-motto-slash">/</span>
            <span>BREAK</span>
            <span className="about-motto-slash">/</span>
            <span>LEARN</span>
            <span className="about-motto-slash">/</span>
            <span>REPEAT</span>
          </div>

          {/* Skill labels */}
          <div ref={skillsRef} className="about-skills">
            {SKILLS.map((skill) => (
              <div
                key={skill.label}
                className={`about-skill ${skill.isRed ? "about-skill--red" : ""}`}
              >
                <span className="about-skill-bar" aria-hidden="true" />
                <span className="about-skill-label">{skill.label}</span>
                <span className="about-skill-braces" aria-hidden="true">
                  {"{ }"}
                </span>
              </div>
            ))}
          </div>

          {/* Rotating Cybersecurity Shield with Real-Time WebGL Transparency */}
          <CybersecurityShield wrapperRef={shieldRef} />
        </div>
      </div>
    </section>
  );
}
