import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* External link icon */
function ExternalLinkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* Chevron right */
function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Cert data with exact reference logos                              */
/* ------------------------------------------------------------------ */
const CERTIFICATIONS = [
  {
    id: "ccna",
    name: "Cisco Certified Network Associate",
    label: "CCNA",
    logoSrc: "/cert-logos/cisco.png",
    logoAlt: "Cisco",
  },
  {
    id: "ccsa",
    name: "Check Point Certified Security Administrator",
    label: "CCSA",
    logoSrc: "/cert-logos/checkpoint.png",
    logoAlt: "Check Point",
  },
  {
    id: "nmap",
    name: "Nmap Certified",
    label: "Nmap",
    logoSrc: "/cert-logos/nmap.png",
    logoAlt: "Nmap",
  },
  {
    id: "sec0",
    name: "TryHackMe SEC0 Certification",
    label: "SEC0",
    logoSrc: "/cert-logos/sec0.png",
    logoAlt: "TryHackMe SEC0",
  },
  {
    id: "sec1",
    name: "TryHackMe SEC1 Certification",
    label: "SEC1",
    logoSrc: "/cert-logos/sec1.png",
    logoAlt: "TryHackMe SEC1",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const navLabelRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (navLabelRef.current) gsap.set(navLabelRef.current, { opacity: 1, y: 0 });
      if (topRightRef.current) gsap.set(topRightRef.current, { opacity: 1, y: 0 });
      if (showcaseRef.current) gsap.set(showcaseRef.current, { opacity: 1, y: 0 });
      if (bottomRightRef.current) gsap.set(bottomRightRef.current, { opacity: 1, y: 0 });
      cardRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      /* Set initial states */
      gsap.set(
        [navLabelRef.current, topRightRef.current, bottomRightRef.current],
        { opacity: 0, y: 15 }
      );

      gsap.set(showcaseRef.current, { opacity: 0, y: 25 });

      cardRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 18 });
      });

      /* Build entrance timeline */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          end: "top 15%",
          scrub: false,
          once: true,
        },
      });

      /* 1 — Section darkening lift */
      tl.fromTo(
        sectionRef.current,
        { opacity: 0.7 },
        { opacity: 1, duration: 0.5, ease: "power2.inOut" },
        0
      );

      /* 2 — Nav label */
      tl.to(
        navLabelRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.1
      );

      tl.to(
        topRightRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.15
      );

      /* 3 — Left side exact showcase reveals */
      tl.to(
        showcaseRef.current,
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
        0.25
      );

      /* 9 — Certification cards: sequential verification animation */
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const scanLine = card.querySelector(".cert-card-scan") as HTMLElement;
        const logo = card.querySelector(".cert-card-logo") as HTMLElement;
        const title = card.querySelector(".cert-card-name") as HTMLElement;
        const arrow = card.querySelector(".cert-card-arrow") as HTMLElement;

        const startTime = 1.0 + i * 0.25;

        /* Card fades in */
        tl.to(
          card,
          { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
          startTime
        );

        /* Scan line sweeps */
        if (scanLine) {
          tl.fromTo(
            scanLine,
            { opacity: 0, x: "-100%" },
            {
              opacity: 1,
              x: "100%",
              duration: 0.6,
              ease: "power2.inOut",
            },
            startTime + 0.1
          );
          tl.to(
            scanLine,
            { opacity: 0, duration: 0.15 },
            startTime + 0.65
          );
        }

        /* Border brightens during scan */
        tl.to(
          card,
          {
            borderColor: "rgba(220,38,38,0.45)",
            duration: 0.3,
            ease: "power2.in",
          },
          startTime + 0.15
        );
        tl.to(
          card,
          {
            borderColor: "rgba(220,38,38,0.18)",
            duration: 0.4,
            ease: "power2.out",
          },
          startTime + 0.5
        );

        /* Logo illumination */
        if (logo) {
          tl.to(
            logo,
            { opacity: 1, scale: 1.03, duration: 0.25, ease: "power2.out" },
            startTime + 0.15
          );
          tl.to(
            logo,
            { scale: 1, duration: 0.3, ease: "power2.inOut" },
            startTime + 0.5
          );
        }

        /* Title brightens */
        if (title) {
          tl.to(
            title,
            { color: "#ffffff", duration: 0.2, ease: "none" },
            startTime + 0.15
          );
          tl.to(
            title,
            { color: "rgba(255,255,255,0.9)", duration: 0.3, ease: "none" },
            startTime + 0.55
          );
        }

        /* Arrow shifts right */
        if (arrow) {
          tl.to(
            arrow,
            { x: 4, duration: 0.25, ease: "power3.out" },
            startTime + 0.15
          );
          tl.to(
            arrow,
            { x: 0, duration: 0.3, ease: "power2.inOut" },
            startTime + 0.55
          );
        }
      });

      /* 10 — After all verified: subtle crimson pulse on container */
      const pulseTime = 1.0 + CERTIFICATIONS.length * 0.25 + 0.5;
      if (cardsContainerRef.current) {
        tl.fromTo(
          cardsContainerRef.current,
          { boxShadow: "0 0 0px rgba(220,38,38,0)" },
          {
            boxShadow: "0 0 30px rgba(220,38,38,0.08)",
            duration: 0.4,
            ease: "power2.in",
          },
          pulseTime
        );
        tl.to(
          cardsContainerRef.current,
          {
            boxShadow: "0 0 0px rgba(220,38,38,0)",
            duration: 0.6,
            ease: "power2.out",
          },
          pulseTime + 0.4
        );
      }

      /* Bottom right label */
      tl.to(
        bottomRightRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        pulseTime + 0.2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="cert-section"
      aria-label="Certifications"
    >
      {/* Atmospheric background */}
      <div className="cert-atmosphere" aria-hidden="true" />

      <div className="cert-inner">
        {/* ---- TOP NAV BAR ---- */}
        <div className="cert-nav">
          <div ref={navLabelRef} className="cert-nav-left">
            <span className="cert-nav-num">03</span>
            <span className="cert-nav-line" aria-hidden="true" />
            <span className="cert-nav-label">CERTIFICATIONS</span>
          </div>
          <div ref={topRightRef} className="cert-nav-right">
            VERIFIED SKILLS. REAL PROGRESS.
          </div>
        </div>

        {/* ---- MAIN CONTENT (two columns) ---- */}
        <div className="cert-content">
          {/* LEFT COLUMN — Exact Showcase Art & Typography */}
          <div className="cert-left">
            <div ref={showcaseRef} className="cert-left-showcase">
              <img
                src="/images/cert_left_showcase.png"
                alt="Certifications - Credentials That Validate My Skills. Industry-recognized certifications that strengthen my foundation in networking, security, and hands-on offensive skills. Certifications verify my foundation. Hands-on practice drives my growth. LEARN / PRACTICE / ADVANCE"
                className="cert-left-showcase-img"
                width={663}
                height={837}
                loading="eager"
              />
            </div>

            {/* Semantic accessible content for screen readers & SEO */}
            <div className="sr-only">
              <span>CERTIFICATIONS</span>
              <h2>Credentials That Validate My Skills.</h2>
              <p>
                Industry-recognized certifications that strengthen my foundation
                in networking, security, and hands-on offensive skills.
              </p>
              <blockquote>
                Certifications verify my foundation. Hands-on practice drives my growth.
              </blockquote>
              <div>LEARN / PRACTICE / ADVANCE</div>
            </div>
          </div>

          {/* RIGHT COLUMN — Certification cards */}
          <div className="cert-right">
            <div ref={cardsContainerRef} className="cert-cards">
              {CERTIFICATIONS.map((cert, index) => (
                <div
                  key={cert.id}
                  ref={setCardRef(index)}
                  className="cert-card"
                  tabIndex={0}
                  role="article"
                  aria-label={cert.name}
                >
                  {/* Scan line */}
                  <div className="cert-card-scan" aria-hidden="true" />

                  <div className="cert-card-content">
                    <div className="cert-card-logo">
                      <img
                        src={cert.logoSrc}
                        alt={cert.logoAlt}
                        className={`cert-logo-img cert-logo-${cert.id}`}
                        loading="lazy"
                      />
                    </div>
                    <div className="cert-card-body">
                      <h3 className="cert-card-name">{cert.name}</h3>
                      <span className="cert-card-label">{cert.label}</span>
                    </div>
                    <div className="cert-card-actions">
                      <span className="cert-card-ext">
                        <ExternalLinkIcon />
                      </span>
                      <span className="cert-card-arrow">
                        <ChevronRight />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right column bottom micro-label */}
            <div ref={bottomRightRef} className="cert-footer-right">
              <span>A MORE SECURE TOMORROW</span>
              <span className="cert-footer-line" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
