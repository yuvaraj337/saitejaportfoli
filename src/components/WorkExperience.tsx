import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Icons                                                             */
/* ------------------------------------------------------------------ */

function BuildingIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Main tower */}
      <rect x="3" y="3" width="10" height="18" rx="1" fill="#dc2626" />
      {/* Windows on main tower */}
      <rect x="5" y="6" width="2" height="2" rx="0.3" fill="#0d0406" />
      <rect x="9" y="6" width="2" height="2" rx="0.3" fill="#0d0406" />
      <rect x="5" y="10" width="2" height="2" rx="0.3" fill="#0d0406" />
      <rect x="9" y="10" width="2" height="2" rx="0.3" fill="#0d0406" />
      <rect x="5" y="14" width="2" height="2" rx="0.3" fill="#0d0406" />
      <rect x="9" y="14" width="2" height="2" rx="0.3" fill="#0d0406" />
      {/* Entrance doorway */}
      <rect x="7" y="18" width="2" height="3" rx="0.2" fill="#0d0406" />
      {/* Annex building */}
      <rect x="14" y="9" width="7" height="12" rx="1" fill="#dc2626" opacity="0.9" />
      <rect x="16.5" y="12" width="2" height="2" rx="0.3" fill="#0d0406" />
      <rect x="16.5" y="16" width="2" height="2" rx="0.3" fill="#0d0406" />
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

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const RESPONSIBILITIES = [
  "Managed and troubleshot Next-Generation Firewalls (Check Point, Palo Alto), implementing security policies and supporting incident and change management.",
  "Analyzed firewall logs to detect, investigate, and resolve security incidents.",
  "Performed Palo Alto firewall upgrades with minimal downtime.",
  "Handled day-to-day incidents and change requests within SLA timelines.",
  "Configured and administered Squid Proxy for controlled domain access.",
  "Configured and maintained IPSec VPNs for secure site-to-site and remote access.",
  "Used Tufin for automated firewall policy management and risk analysis.",
  "Monitored and analyzed security events with Splunk.",
  "Troubleshot connectivity issues across firewalls, VPNs, proxies, and load balancers.",
  "Decommissioned servers and F5 components (Virtual Servers, Pools, SNATs, Nodes).",
  "Maintained technical documentation and change records.",
];

const TECH_TAGS = [
  "Palo Alto",
  "Check Point",
  "Tufin",
  "Squid Proxy",
  "IPSec VPN",
  "Splunk",
  "F5",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const navLeftRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headLine1Ref = useRef<HTMLSpanElement>(null);
  const headLine2Ref = useRef<HTMLSpanElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);
  const quoteWrapperRef = useRef<HTMLDivElement>(null);
  const quoteLineRef = useRef<HTMLDivElement>(null);

  /* Timeline Elements */
  const datesContainerRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const travelNodeRef = useRef<HTMLDivElement>(null);
  const topNodeRef = useRef<HTMLDivElement>(null);
  const bottomNodeRef = useRef<HTMLDivElement>(null);

  /* Experience Card Elements */
  const cardRef = useRef<HTMLDivElement>(null);
  const companyIconRef = useRef<HTMLDivElement>(null);
  const jobTitleRef = useRef<HTMLHeadingElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const bulletRefs = useRef<(HTMLLIElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);

  /* Right-side Environment (Exact Reference Image) */
  const rightColRef = useRef<HTMLDivElement>(null);
  const rightImgRef = useRef<HTMLImageElement>(null);
  const ambientLightRef = useRef<HTMLDivElement>(null);
  const impactHighlightRef = useRef<HTMLDivElement>(null);

  /* Bottom Labels & Background Rays */
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRaysRef = useRef<HTMLDivElement>(null);

  const setBulletRef = useCallback(
    (index: number) => (el: HTMLLIElement | null) => {
      bulletRefs.current[index] = el;
    },
    []
  );

  const setDotRef = useCallback(
    (index: number) => (el: HTMLSpanElement | null) => {
      dotRefs.current[index] = el;
    },
    []
  );

  const setTagRef = useCallback(
    (index: number) => (el: HTMLSpanElement | null) => {
      tagRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const els = [
        navLeftRef.current,
        eyebrowRef.current,
        headLine1Ref.current,
        headLine2Ref.current,
        supportRef.current,
        quoteWrapperRef.current,
        cardRef.current,
        companyIconRef.current,
        jobTitleRef.current,
        companyRef.current,
        locationRef.current,
        rightColRef.current,
        bottomLeftRef.current,
        datesContainerRef.current,
        travelNodeRef.current,
        topNodeRef.current,
        bottomNodeRef.current,
        bottomRaysRef.current,
      ];
      els.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0, x: 0 });
      });
      if (lineFillRef.current) gsap.set(lineFillRef.current, { height: "100%" });
      if (quoteLineRef.current) gsap.set(quoteLineRef.current, { scaleY: 1 });
      bulletRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0 });
      });
      tagRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, scale: 1 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      /* Initial state setup */
      gsap.set(
        [
          navLeftRef.current,
          eyebrowRef.current,
          headLine1Ref.current,
          headLine2Ref.current,
          supportRef.current,
          quoteWrapperRef.current,
          rightColRef.current,
          bottomLeftRef.current,
          datesContainerRef.current,
          bottomRaysRef.current,
        ],
        { opacity: 0, y: 15 }
      );

      gsap.set(quoteLineRef.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(lineFillRef.current, { height: "0%" });
      gsap.set(travelNodeRef.current, { top: "0%", opacity: 0, scale: 0.5 });
      gsap.set(cardRef.current, {
        opacity: 0,
        y: 20,
        borderColor: "rgba(220,38,38,0.12)",
      });
      gsap.set([companyIconRef.current, arrowRef.current], { opacity: 0, scale: 0.8 });
      gsap.set([jobTitleRef.current, companyRef.current, locationRef.current], {
        opacity: 0,
        y: 8,
      });

      bulletRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 10 });
      });

      tagRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, scale: 0.95 });
      });

      /* ========================================================== */
      /*  MAIN SCROLLTRIGGER TIMELINE: SECURITY OPERATIONS TIMELINE */
      /* ========================================================== */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 85%",
          scrub: false,
          once: true,
        },
      });

      /* 1. Start with section slightly darkened, gradually lift to full brightness */
      tl.fromTo(
        sectionRef.current,
        { opacity: 0.65 },
        { opacity: 1, duration: 0.5, ease: "power2.inOut" },
        0
      );

      /* 2. Gradually reveal right-side server-room / workstation environment */
      tl.to(
        rightColRef.current,
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
        0.1
      );

      /* 3. Reveal top WORK EXPERIENCE heading with smooth horizontal/opacity entrance */
      tl.to(
        navLeftRef.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.15
      );

      /* 4. Reveal PROFESSIONAL JOURNEY eyebrow */
      tl.to(
        eyebrowRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.22
      );

      /* 5. Reveal main heading line by line */
      tl.to(
        headLine1Ref.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.28
      );

      tl.to(
        headLine2Ref.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.36
      );

      /* 6. Reveal supporting paragraph and quote */
      tl.to(
        supportRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.44
      );

      tl.to(
        quoteWrapperRef.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.5
      );

      tl.to(
        quoteLineRef.current,
        { scaleY: 1, duration: 0.4, ease: "power2.inOut" },
        0.55
      );

      /* 7. ACTIVATE TIMELINE: Timeline dates and traveling crimson circular node */
      tl.to(
        datesContainerRef.current,
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
        0.6
      );

      tl.to(
        travelNodeRef.current,
        { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" },
        0.65
      );

      /* Card border activates */
      tl.to(
        cardRef.current,
        {
          opacity: 1,
          y: 0,
          borderColor: "rgba(220,38,38,0.35)",
          duration: 0.5,
          ease: "power3.out",
        },
        0.7
      );

      /* Company/job icon appears */
      tl.to(
        companyIconRef.current,
        { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.4)" },
        0.76
      );

      tl.to(
        arrowRef.current,
        { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" },
        0.8
      );

      /* Job title, company, location appear */
      tl.to(
        jobTitleRef.current,
        { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
        0.82
      );

      tl.to(
        companyRef.current,
        { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
        0.88
      );

      tl.to(
        locationRef.current,
        { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
        0.94
      );

      /* Continuous smooth travel of timeline node down the rail */
      const timelineDuration = 2.4;
      const timelineStartTime = 1.0;

      /* Line draws downward */
      tl.to(
        lineFillRef.current,
        {
          height: "100%",
          duration: timelineDuration,
          ease: "none",
        },
        timelineStartTime
      );

      /* Node travels smoothly down the line */
      tl.to(
        travelNodeRef.current,
        {
          top: "100%",
          duration: timelineDuration,
          ease: "none",
        },
        timelineStartTime
      );

      /* Ambient light pulse on right environment */
      if (ambientLightRef.current) {
        tl.to(
          ambientLightRef.current,
          { opacity: 0.45, duration: 1.0, ease: "power2.inOut" },
          timelineStartTime
        );
        tl.to(
          ambientLightRef.current,
          { opacity: 0.15, duration: 1.0, ease: "power2.inOut" },
          timelineStartTime + 1.2
        );
      }

      /* Responsibilities reveal sequentially as node moves down */
      const bulletInterval = timelineDuration / (RESPONSIBILITIES.length + 1);
      RESPONSIBILITIES.forEach((_, i) => {
        const bulletTime = timelineStartTime + i * bulletInterval;
        const bulletEl = bulletRefs.current[i];
        const dotEl = dotRefs.current[i];

        if (bulletEl) {
          /* Bullet reveals with 8-12px upward movement */
          tl.to(
            bulletEl,
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power3.out",
            },
            bulletTime
          );

          /* Dot briefly flashes bright crimson, then settles */
          if (dotEl) {
            tl.to(
              dotEl,
              {
                scale: 1.4,
                backgroundColor: "#ff2a3b",
                boxShadow: "0 0 10px rgba(255, 42, 59, 0.75)",
                duration: 0.15,
                ease: "power2.out",
              },
              bulletTime
            );
            tl.to(
              dotEl,
              {
                scale: 1,
                backgroundColor: "#dc2626",
                boxShadow: "0 0 0px rgba(255, 42, 59, 0)",
                duration: 0.25,
                ease: "power2.inOut",
              },
              bulletTime + 0.18
            );
          }
        }
      });

      /* Technology tags activate sequentially after responsibilities */
      const tagsStartTime = timelineStartTime + timelineDuration - 0.45;
      TECH_TAGS.forEach((_, i) => {
        const tagTime = tagsStartTime + i * 0.08;
        const tagEl = tagRefs.current[i];
        if (tagEl) {
          tl.to(
            tagEl,
            {
              opacity: 1,
              scale: 1.025,
              borderColor: "rgba(220, 38, 38, 0.55)",
              color: "#ffffff",
              duration: 0.2,
              ease: "power2.out",
            },
            tagTime
          );
          tl.to(
            tagEl,
            {
              scale: 1.0,
              borderColor: "rgba(220, 38, 38, 0.25)",
              color: "rgba(255, 255, 255, 0.75)",
              duration: 0.25,
              ease: "power2.inOut",
            },
            tagTime + 0.2
          );
        }
      });

      /* FINAL TIMELINE MOMENT: Endpoint pulse */
      const finishTime = timelineStartTime + timelineDuration;
      tl.to(
        bottomNodeRef.current,
        {
          scale: 1.35,
          boxShadow: "0 0 16px rgba(220,38,38,0.75)",
          borderColor: "#ff2a3b",
          duration: 0.25,
          ease: "power2.out",
        },
        finishTime + 0.08
      );

      tl.to(
        bottomNodeRef.current,
        {
          scale: 1,
          boxShadow: "0 0 0px rgba(220,38,38,0)",
          borderColor: "#dc2626",
          duration: 0.4,
          ease: "power2.inOut",
        },
        finishTime + 0.33
      );

      /* Highlight pulse on the impact metrics panel area of the background */
      if (impactHighlightRef.current) {
        tl.fromTo(
          impactHighlightRef.current,
          { opacity: 0 },
          { opacity: 0.35, duration: 0.35, ease: "power2.out" },
          finishTime + 0.2
        );
        tl.to(
          impactHighlightRef.current,
          { opacity: 0, duration: 0.6, ease: "power2.inOut" },
          finishTime + 0.55
        );
      }

      /* Bottom labels and background rays */
      tl.to(
        bottomLeftRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        finishTime + 0.3
      );

      tl.to(
        bottomRaysRef.current,
        { opacity: 0.85, y: 0, duration: 0.5, ease: "power3.out" },
        finishTime + 0.35
      );

      /* Subtle parallax depth on right scene */
      if (rightImgRef.current && rightColRef.current) {
        gsap.to(rightImgRef.current, {
          yPercent: -4,
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
      id="work-experience"
      className="work-section"
      aria-label="Work Experience"
    >
      {/* Background atmosphere */}
      <div className="work-atmosphere" aria-hidden="true">
        {/* Subtle burgundy ambient glow in top-left */}
        <div className="work-tl-glow" />
        {/* Bottom-left angled rays from reference image */}
        <div ref={bottomRaysRef} className="work-bottom-rays">
          <img
            src="/images/work_bottom_left_art.png"
            alt=""
            className="work-bottom-rays-img"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="work-inner">
        {/* ================================================================== */}
        {/*  LEFT COLUMN: UI, HEADING, QUOTE, TIMELINE & EXPERIENCE CARD      */}
        {/* ================================================================== */}
        <div className="work-left-col">
          {/* Top navigation bar */}
          <div className="work-nav-left" ref={navLeftRef}>
            <span className="work-nav-num">02</span>
            <span className="work-nav-dash" aria-hidden="true" />
            <span className="work-nav-label">
              WORK <span className="work-nav-red">EXPERIENCE</span>
            </span>
          </div>

          {/* Header row: Eyebrow + Heading + Supporting Text (Left) & Quote (Right) */}
          <div className="work-header-row">
            <div className="work-header-left">
              <div ref={eyebrowRef} className="work-eyebrow">
                <span className="work-eyebrow-red">PROF</span>ESSIONAL JOURNEY
              </div>

              <h2 className="work-heading">
                <span ref={headLine1Ref} className="work-heading-line">
                  Real-World Experience
                </span>
                <span ref={headLine2Ref} className="work-heading-line work-heading-red">
                  Stronger Defenses.
                </span>
              </h2>

              <p ref={supportRef} className="work-support">
                Hands-on experience in enterprise network security, firewall management, and
                threat mitigation. Solving real problems, securing critical infrastructure, and
                continuously learning from evolving threats.
              </p>
            </div>

            {/* Editorial Quote */}
            <div ref={quoteWrapperRef} className="work-quote-wrapper">
              <div ref={quoteLineRef} className="work-quote-line" aria-hidden="true" />
              <div className="work-quote-content">
                <span className="work-quote-mark work-quote-mark-open" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="work-quote-text">
                  Each challenge
                  <br />
                  in production
                  <br />
                  made me a better
                  <br />
                  security engineer.
                  <span className="work-quote-mark work-quote-mark-close" aria-hidden="true">
                    &rdquo;
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Content Row: Timeline + Experience Card */}
          <div className="work-card-row">
            {/* Timeline Column */}
            <div className="work-timeline-col">
              {/* Stacked dates on left: JAN 2022 & JUL 2025 */}
              <div ref={datesContainerRef} className="work-timeline-dates">
                <div className="work-timeline-date work-timeline-date-start">JAN 2022</div>
                <div className="work-timeline-date work-timeline-date-end">JUL 2025</div>
              </div>

              {/* Vertical timeline track */}
              <div className="work-timeline-track">
                {/* Background line */}
                <div className="work-rail-line-bg" />
                {/* Animated filling line */}
                <div ref={lineFillRef} className="work-rail-line-fill" />

                {/* Top starting node */}
                <div ref={topNodeRef} className="work-rail-node-start" aria-hidden="true">
                  <span className="work-rail-node-dot" />
                  <span className="work-rail-node-ping" />
                </div>

                {/* Smoothly travelling crimson node */}
                <div ref={travelNodeRef} className="work-rail-travel-node" aria-hidden="true">
                  <span className="work-travel-halo" />
                  <span className="work-travel-dot" />
                </div>

                {/* Bottom endpoint ring */}
                <div ref={bottomNodeRef} className="work-rail-node-end" aria-hidden="true">
                  <span className="work-rail-end-ring" />
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <div ref={cardRef} className="work-card" tabIndex={0} role="article">
              {/* Card top banner */}
              <div className="work-card-header">
                <div ref={companyIconRef} className="work-card-icon">
                  <BuildingIcon />
                </div>

                <div className="work-card-titles">
                  <h3 ref={jobTitleRef} className="work-card-role">
                    ICT Network Engineer
                  </h3>
                  <div ref={companyRef} className="work-card-company">
                    Ice Data Services Pvt Ltd
                  </div>
                  <div ref={locationRef} className="work-card-location">
                    Hyderabad, India
                  </div>
                </div>

                <div ref={arrowRef} className="work-card-arrow">
                  <ChevronRight />
                </div>
              </div>

              {/* Responsibilities bullet list */}
              <ul className="work-card-bullets" role="list">
                {RESPONSIBILITIES.map((resp, i) => (
                  <li
                    key={i}
                    ref={setBulletRef(i)}
                    className="work-card-bullet"
                  >
                    <span
                      ref={setDotRef(i)}
                      className="work-bullet-dot"
                      aria-hidden="true"
                    />
                    <span className="work-bullet-text">{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Technology tags */}
              <div className="work-card-tags">
                {TECH_TAGS.map((tag, i) => (
                  <span
                    key={tag}
                    ref={setTagRef(i)}
                    className="work-tag-pill"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Left Label */}
          <div ref={bottomLeftRef} className="work-footer-left">
            <span>PEOPLE</span>
            <span className="work-footer-slash">/</span>
            <span>PROCESSES</span>
            <span className="work-footer-slash">/</span>
            <span>TECHNOLOGY</span>
            <span className="work-footer-dash" aria-hidden="true" />
          </div>
        </div>

        {/* ================================================================== */}
        {/*  RIGHT COLUMN: EXACT REFERENCE IMAGE BACKGROUND SCENE             */}
        {/* ================================================================== */}
        <div ref={rightColRef} className="work-right-col">
          <div className="work-scene-wrap">
            {/* Ambient red breathing glow */}
            <div ref={ambientLightRef} className="work-scene-ambient" />
            
            {/* Exact Reference Background Scene */}
            <img
              ref={rightImgRef}
              src="/images/work_experience_bg_right.png"
              alt="Security Operations Center workstation with threat map monitor, technical books, coffee mug, and impact metrics"
              className="work-scene-img"
              width={591}
              height={918}
              loading="lazy"
            />

            {/* Impact panel highlight overlay for timeline finish moment */}
            <div ref={impactHighlightRef} className="work-impact-highlight" />

            {/* Hidden accessibility tree markup for screen readers */}
            <div className="sr-only">
              <h3>Impact Metrics</h3>
              <ul>
                <li>3+ Years Experience</li>
                <li>Enterprise Environment</li>
                <li>Real-World Problem Solving</li>
              </ul>
              <span>MORE THAN WORK. REAL IMPACT.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
