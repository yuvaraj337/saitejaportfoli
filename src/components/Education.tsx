import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Icons                                                             */
/* ------------------------------------------------------------------ */

function MortarboardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"
        fill="#dc2626"
      />
      <path
        d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"
        fill="#dc2626"
        opacity="0.85"
      />
    </svg>
  );
}

function InstitutionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function BookOpenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function TargetCrosshairIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="1" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="23" />
      <line x1="1" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="23" y2="12" />
    </svg>
  );
}

function TerminalLaptopIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="2.5" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const navLeftRef = useRef<HTMLDivElement>(null);
  const navRightRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const quoteWrapRef = useRef<HTMLDivElement>(null);
  const quoteLineRef = useRef<HTMLDivElement>(null);
  const currentFocusRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const booksImgRef = useRef<HTMLImageElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const els = [
        navLeftRef.current,
        navRightRef.current,
        eyebrowRef.current,
        line1Ref.current,
        line2Ref.current,
        descRef.current,
        quoteWrapRef.current,
        currentFocusRef.current,
        cardRef.current,
        focusRef.current,
        booksImgRef.current,
        bottomLeftRef.current,
        bottomRightRef.current,
      ];
      els.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      });
      if (quoteLineRef.current) gsap.set(quoteLineRef.current, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      /* Initial states */
      gsap.set(
        [
          navLeftRef.current,
          navRightRef.current,
          eyebrowRef.current,
          line1Ref.current,
          line2Ref.current,
          descRef.current,
          quoteWrapRef.current,
          currentFocusRef.current,
          bottomLeftRef.current,
          bottomRightRef.current,
        ].filter(Boolean),
        { opacity: 0, y: 20 }
      );

      gsap.set(quoteLineRef.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(cardRef.current, { opacity: 0, y: 25, scale: 0.97 });
      gsap.set(focusRef.current, { opacity: 0, y: 12 });
      gsap.set(booksImgRef.current, { opacity: 0, y: 20 });

      /* Master timeline */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          end: "top 15%",
          scrub: false,
          once: true,
        },
      });

      /* 1. Section background fades in */
      tl.fromTo(
        sectionRef.current,
        { opacity: 0.7 },
        { opacity: 1, duration: 0.5, ease: "power2.inOut" },
        0
      );

      /* 2. Header elements reveal */
      tl.to(
        navLeftRef.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.1
      );
      tl.to(
        navRightRef.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.15
      );

      /* 3. Left content reveals: Eyebrow then line-by-line heading */
      tl.to(
        eyebrowRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.2
      );
      tl.to(
        line1Ref.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.25
      );
      tl.to(
        line2Ref.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.35
      );

      /* 4. Description and quote line draw */
      tl.to(
        descRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.42
      );
      tl.to(
        quoteWrapRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.48
      );
      tl.to(
        quoteLineRef.current,
        { scaleY: 1, duration: 0.35, ease: "power2.inOut" },
        0.52
      );
      tl.to(
        currentFocusRef.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.56
      );

      /* 5. Education card enters with scale 0.97 -> 1 */
      tl.to(
        cardRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" },
        0.5
      );

      /* 6. Focus areas text reveals after the main card */
      tl.to(
        focusRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.65
      );

      /* 7. Graduation cap and books image entrance */
      tl.to(
        booksImgRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.4
      );

      /* 8. Bottom micro labels */
      tl.to(
        bottomLeftRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.75
      );
      tl.to(
        bottomRightRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.8
      );

      /* Parallax effect on graduation cap/books image */
      if (booksImgRef.current) {
        gsap.to(booksImgRef.current, {
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="edu-section"
      aria-label="Education"
    >
      {/* Background ambient lighting */}
      <div className="edu-atmosphere" aria-hidden="true">
        <div className="edu-tl-glow" />
        <div className="edu-ambient-red" />
      </div>

      <div className="edu-inner">
        {/* ---- TOP NAV BAR ---- */}
        <div className="edu-nav">
          <div ref={navLeftRef} className="edu-nav-left">
            <span className="edu-nav-num">03</span>
            <span className="edu-nav-dash" aria-hidden="true" />
            <span className="edu-nav-label">
              EDUC<span className="edu-nav-red">ATION</span>
            </span>
          </div>

          <div ref={navRightRef} className="edu-nav-right">
            <span>KNOWLEDGE • DISCIPLINE • PROGRESS</span>
            <span className="edu-nav-dash" aria-hidden="true" />
          </div>
        </div>

        {/* ---- MAIN CONTENT GRID ---- */}
        <div className="edu-grid">
          {/* LEFT: Heading, Description & Quote */}
          <div className="edu-left">
            <div ref={eyebrowRef} className="edu-eyebrow">
              <span className="edu-eyebrow-red">ACADEMIC</span> FOUNDATION
            </div>

            <h2 className="edu-heading">
              <span ref={line1Ref} className="edu-heading-line">
                Continuous Learning
              </span>
              <span ref={line2Ref} className="edu-heading-line edu-heading-red">
                Stronger Security.
              </span>
            </h2>

            <p ref={descRef} className="edu-desc">
              A strong academic foundation in data science, combined with
              hands-on cybersecurity experience, helps me approach security
              challenges with analytical thinking and a problem-solving mindset.
            </p>

            {/* Editorial Quote */}
            <div ref={quoteWrapRef} className="edu-quote-wrap">
              <div ref={quoteLineRef} className="edu-quote-line" aria-hidden="true" />
              <div className="edu-quote-content">
                <span className="edu-quote-mark" aria-hidden="true">&ldquo;</span>
                <p className="edu-quote-text">
                  Learning never stops.
                  <br />
                  It only gets more interesting.
                  <span className="edu-quote-mark edu-quote-mark-close" aria-hidden="true">&rdquo;</span>
                </p>
              </div>
            </div>

            {/* CURRENT FOCUS Card */}
            <div ref={currentFocusRef} className="edu-focus-card">
              <div className="edu-focus-top">
                <div className="edu-focus-icon" aria-hidden="true">
                  <TargetCrosshairIcon />
                </div>
                <div className="edu-focus-content">
                  <span className="edu-focus-label">CURRENT FOCUS</span>
                  <h4 className="edu-focus-title">
                    <span className="edu-focus-title-white">Actively Learning Towards</span>
                    <span className="edu-focus-title-red">Red Team &amp; Penetration Testing.</span>
                  </h4>
                </div>
              </div>

              <div className="edu-focus-strip">
                <div className="edu-focus-item">
                  <span className="edu-focus-item-icon" aria-hidden="true">
                    <TerminalLaptopIcon />
                  </span>
                  <span className="edu-focus-item-text">
                    Network
                    <br />
                    Pentesting
                  </span>
                </div>

                <div className="edu-focus-item">
                  <span className="edu-focus-item-icon" aria-hidden="true">
                    <ShieldCheckIcon />
                  </span>
                  <span className="edu-focus-item-text">
                    Offensive
                    <br />
                    Security
                  </span>
                </div>

                <div className="edu-focus-item">
                  <span className="edu-focus-item-icon" aria-hidden="true">
                    <FlagIcon />
                  </span>
                  <span className="edu-focus-item-text">
                    CTFs &amp;
                    <br />
                    Labs
                  </span>
                </div>

                <div className="edu-focus-item">
                  <span className="edu-focus-item-icon" aria-hidden="true">
                    <WifiIcon />
                  </span>
                  <span className="edu-focus-item-text">
                    Wireless
                    <br />
                    Security
                  </span>
                </div>

                <div className="edu-focus-item">
                  <span className="edu-focus-item-icon" aria-hidden="true">
                    <SearchIcon />
                  </span>
                  <span className="edu-focus-item-text">
                    Vulnerability
                    <br />
                    Assessment
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: Main Education Card */}
          <div className="edu-center">
            <div ref={cardRef} className="edu-card" tabIndex={0} role="article">
              {/* Card top banner */}
              <div className="edu-card-header">
                <div className="edu-card-icon">
                  <MortarboardIcon />
                </div>
                <div className="edu-card-titles">
                  <h3 className="edu-card-degree">
                    M.Sc. Mathematical Data Science
                  </h3>
                  <div className="edu-card-meta">
                    <span>Germany</span>
                    <span className="edu-card-dot">•</span>
                    <span className="edu-card-status">Pursuing</span>
                  </div>
                </div>
                <div className="edu-card-arrow" aria-hidden="true">
                  <ChevronRight />
                </div>
              </div>

              {/* Supporting rows */}
              <div className="edu-card-rows">
                <div className="edu-row">
                  <div className="edu-row-icon" aria-hidden="true">
                    <InstitutionIcon />
                  </div>
                  <div className="edu-row-content">
                    <span className="edu-row-label">Institution</span>
                    <span className="edu-row-value">(To be updated)</span>
                  </div>
                </div>

                <div className="edu-row">
                  <div className="edu-row-icon" aria-hidden="true">
                    <CalendarIcon />
                  </div>
                  <div className="edu-row-content">
                    <span className="edu-row-label">Duration</span>
                    <span className="edu-row-value">2024 — Present</span>
                  </div>
                </div>

                <div ref={focusRef} className="edu-row edu-row-focus">
                  <div className="edu-row-icon" aria-hidden="true">
                    <BookOpenIcon />
                  </div>
                  <div className="edu-row-content">
                    <span className="edu-row-label">Focus Areas</span>
                    <span className="edu-row-value">
                      Mathematics • Data Science • Algorithms
                      <br />
                      • Machine Learning • Analytical Methods
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Graduation Cap & Stacked Books Image */}
          <div className="edu-right">
            <div className="edu-books-container">
              <img
                ref={booksImgRef}
                src="/images/education_graduation_books.png"
                alt="Graduation cap resting on books: Mathematics, Data Science, Cyber Security, A Brighter Tomorrow"
                className="edu-books-img"
                width={364}
                height={450}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* ---- BOTTOM LABELS ---- */}
        <div className="edu-footer">
          <div ref={bottomLeftRef} className="edu-footer-left">
            <span>STUDY</span>
            <span className="edu-footer-slash">/</span>
            <span>ANALYZE</span>
            <span className="edu-footer-slash">/</span>
            <span>APPLY</span>
            <span className="edu-footer-slash">/</span>
            <span>GROW</span>
            <span className="edu-footer-dash" aria-hidden="true" />
          </div>

          <div ref={bottomRightRef} className="edu-footer-right">
            <span>SAME CURIOSITY. HIGHER IMPACT.</span>
            <span className="edu-footer-dash" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
