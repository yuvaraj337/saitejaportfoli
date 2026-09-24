import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    pdfUrl: "/certificates/Cisco Certified Network Associate certificate (1).pdf",
  },
  {
    id: "ccsa",
    name: "Check Point Certified Security Administrator",
    label: "CCSA",
    logoSrc: "/cert-logos/checkpoint.png",
    logoAlt: "Check Point",
    pdfUrl: "/certificates/PDFCertification - CCSA.pdf",
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
    name: "TryHackMe SECO Certification",
    label: "SECO",
    logoSrc: "/cert-logos/sec0.png",
    logoAlt: "TryHackMe SECO",
  },
  {
    id: "sec1",
    name: "TryHackMe SEC1 Certification",
    label: "SEC1",
    logoSrc: "/cert-logos/sec1.png",
    logoAlt: "TryHackMe SEC1",
  },
  {
    id: "wireshark",
    name: "Wireshark Essential Training",
    label: "LinkedIn Learning   |   Sep 01, 2026",
    logoSrc: "/cert-logos/linkedin.png",
    logoAlt: "LinkedIn Learning",
    pdfUrl: "/certificates/CertificateOfCompletion_Wireshark Essential Training.pdf",
  },
  {
    id: "nmap-packt",
    name: "Nmap",
    label: "Packt / Coursera   |   Feb 06, 2026",
    logoSrc: "/cert-logos/packt.png",
    logoAlt: "Packt / Coursera",
    pdfUrl: "/certificates/NMAP - PACKT.pdf",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const setCardRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      cardRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
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
        [topRightRef.current, bottomRightRef.current],
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

      /* 2 — Top right label */
      tl.to(
        topRightRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.15
      );

      /* 3 — Left side exact showcase background reveals */
      tl.to(
        showcaseRef.current,
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
        0.25
      );

      /* 4 — Certification cards: sequential verification animation */
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

      /* 5 — After all verified: subtle crimson pulse on container */
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

      {/* Bottom-right corner rays from reference image */}
      <div className="cert-br-rays" aria-hidden="true">
        <img
          src="/images/cert_bottom_right_rays.png"
          alt=""
          className="cert-br-rays-img"
        />
      </div>

      <div className="cert-inner">
        {/* ---- LEFT COLUMN — Exact Showcase Background Scene ---- */}
        <div ref={showcaseRef} className="cert-left">
          <img
            src="/images/cert_left_showcase.png"
            alt="Certifications - Credentials That Validate My Skills. Industry-recognized certifications that strengthen my foundation in networking, security, and hands-on offensive skills. Certifications verify my foundation. Hands-on practice drives my growth. LEARN / PRACTICE / ADVANCE"
            className="cert-left-img"
            width={658}
            height={915}
            loading="eager"
          />

          {/* Semantic accessible content for screen readers & SEO */}
          <div className="sr-only">
            <span>03 / CERTIFICATIONS</span>
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

        {/* ---- RIGHT COLUMN — Top Label, Cards & Bottom Label ---- */}
        <div className="cert-right">
          {/* Top-Right Label */}
          <div ref={topRightRef} className="cert-nav-right">
            <span>VERIFIED SKILLS. REAL PROGRESS.</span>
            <span className="cert-nav-dash" aria-hidden="true" />
          </div>

          {/* Cards Container */}
          <div ref={cardsContainerRef} className="cert-cards">
            {CERTIFICATIONS.map((cert, index) => {
              const CardTag = cert.pdfUrl ? "a" : "div";
              const linkProps = cert.pdfUrl
                ? {
                    href: encodeURI(cert.pdfUrl),
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {};

              return (
                <CardTag
                  key={cert.id}
                  ref={setCardRef(index) as any}
                  className="cert-card"
                  tabIndex={0}
                  role={cert.pdfUrl ? "link" : "article"}
                  aria-label={cert.name}
                  {...linkProps}
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
                  </div>
                </CardTag>
              );
            })}
          </div>

          {/* Bottom-Right Label */}
          <div ref={bottomRightRef} className="cert-footer-right">
            <span>A MORE SECURE TOMORROW</span>
            <span className="cert-footer-line" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
