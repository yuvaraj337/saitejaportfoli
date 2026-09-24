import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    num: "01",
    category: "NETWORK SECURITY",
    title: "Network Vulnerability\nAssessment Lab",
    description:
      "Built a virtual lab using Kali Linux, Metasploitable 2 and Windows/Linux VMs. Performed network reconnaissance, exploitation and CVE-based reporting.",
    tags: ["Nmap", "Metasploit", "VirtualBox"],
    image: "/images/project_network_vuln.png",
    imageAlt: "Network Vulnerability Assessment Lab diagram and node topology",
  },
  {
    num: "02",
    category: "WIRELESS SECURITY",
    title: "Wireless Security\nAssessment Lab",
    description:
      "Analyzed 802.11 protocols, performed wireless reconnaissance and tested WPA2/WPA3 & WPS security.",
    tags: ["Aircrack-ng", "Scapy", "Wireshark"],
    image: "/images/project_wireless_sec.png",
    imageAlt: "Wireless Security Assessment Lab hardware and Wi-Fi signals",
  },
  {
    num: "03",
    category: "TRAFFIC ANALYSIS",
    title: "Network Traffic Analysis\n& Password Assessment",
    description:
      "Captured and analyzed network traffic, identified credentials and hashes, and performed password cracking.",
    tags: ["Wireshark", "Hashcat", "John the Ripper"],
    image: "/images/project_traffic_analysis.png",
    imageAlt: "Network Traffic Analysis and packet inspection console",
  },
  {
    num: "04",
    category: "CTF / RED TEAMING",
    title: "Capture The Flag\nPortfolio",
    description:
      "Regularly practice on TryHackMe and other CTF platforms to strengthen offensive security skills.",
    tags: ["TryHackMe", "CTFs", "Hands-on"],
    image: "/images/project_ctf_portfolio.jpg",
    imageAlt: "Capture The Flag Portfolio red banner on dark terrain",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const navLeftRef = useRef<HTMLDivElement>(null);
  const navRightRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const quoteWrapRef = useRef<HTMLDivElement>(null);
  const quoteLineRef = useRef<HTMLDivElement>(null);
  const headerSceneRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scanLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    []
  );

  const setScanLineRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      scanLineRefs.current[index] = el;
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
        navRightRef.current,
        eyebrowRef.current,
        headingRef.current,
        descRef.current,
        quoteWrapRef.current,
        headerSceneRef.current,
        bottomLeftRef.current,
        bottomRightRef.current,
      ];
      els.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      });
      if (quoteLineRef.current) gsap.set(quoteLineRef.current, { scaleY: 1 });
      cardRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      /* Initial setup */
      gsap.set(
        [
          navLeftRef.current,
          navRightRef.current,
          eyebrowRef.current,
          headingRef.current,
          descRef.current,
          quoteWrapRef.current,
          headerSceneRef.current,
          bottomLeftRef.current,
          bottomRightRef.current,
        ],
        { opacity: 0, y: 20 }
      );

      gsap.set(quoteLineRef.current, { scaleY: 0, transformOrigin: "top center" });

      cardRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 35, scale: 0.97 });
      });

      /* Main entrance timeline */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          end: "top 10%",
          scrub: false,
          once: true,
        },
      });

      /* 1. Header elements reveal */
      tl.to(
        navLeftRef.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0
      );
      tl.to(
        navRightRef.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.08
      );

      /* 2. Eyebrow, Heading, Description */
      tl.to(
        eyebrowRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.12
      );
      tl.to(
        headingRef.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.18
      );
      tl.to(
        descRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.26
      );

      /* 3. Quote and Header scene */
      tl.to(
        quoteWrapRef.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.28
      );
      tl.to(
        quoteLineRef.current,
        { scaleY: 1, duration: 0.35, ease: "power2.inOut" },
        0.32
      );
      tl.to(
        headerSceneRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.35
      );

      /* 4. Sequential Project Cards Entrance (Left -> Right) */
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const scanLine = scanLineRefs.current[i];
        const cardStartTime = 0.45 + i * 0.16;

        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          cardStartTime
        );

        /* Thin crimson security scan highlight traveling across card top */
        if (scanLine) {
          tl.fromTo(
            scanLine,
            { x: "-100%", opacity: 0 },
            {
              x: "100%",
              opacity: 1,
              duration: 0.65,
              ease: "power2.inOut",
            },
            cardStartTime + 0.12
          );
          tl.to(
            scanLine,
            { opacity: 0, duration: 0.15 },
            cardStartTime + 0.72
          );
        }
      });

      /* 5. Bottom micro text */
      const footerTime = 0.45 + PROJECTS.length * 0.16 + 0.1;
      tl.to(
        bottomLeftRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        footerTime
      );
      tl.to(
        bottomRightRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        footerTime + 0.1
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="proj-section"
      aria-label="Featured Projects"
    >
      <span id="featured-projects" className="sr-only">Featured Projects</span>
      {/* Background ambient lighting */}
      <div className="proj-atmosphere" aria-hidden="true">
        <div className="proj-ambient-red" />
      </div>

      <div className="proj-inner">
        {/* ---- TOP NAV BAR ---- */}
        <div className="proj-nav">
          <div ref={navLeftRef} className="proj-nav-left">
            <span className="proj-nav-num">04</span>
            <span className="proj-nav-dash" aria-hidden="true" />
            <span className="proj-nav-label">
              FEATURED <span className="proj-nav-red">PROJECTS</span>
            </span>
          </div>

          <div ref={navRightRef} className="proj-nav-right">
            <span>PRACTICE • BUILD • LEARN • IMPROVE</span>
            <span className="proj-nav-dash" aria-hidden="true" />
          </div>
        </div>

        {/* ---- HEADER ROW ---- */}
        <div className="proj-header-row">
          <div className="proj-header-left">
            <div ref={eyebrowRef} className="proj-eyebrow">
              <span className="proj-eyebrow-red">PROJECTS</span> THAT MATTER
            </div>

            <h2 ref={headingRef} className="proj-heading">
              From Labs to <span className="proj-heading-red">Real-World Skills.</span>
            </h2>

            <p ref={descRef} className="proj-desc">
              A collection of hands-on projects that showcase my skills in
              networking, security, and penetration testing. Each project
              represents a real problem, a practical approach, and valuable
              lessons learned.
            </p>
          </div>

          {/* Header Right: Quote and Mug/Monitor graphic */}
          <div className="proj-header-right">
            <div ref={quoteWrapRef} className="proj-quote-wrap">
              <div ref={quoteLineRef} className="proj-quote-line" aria-hidden="true" />
              <div className="proj-quote-content">
                <span className="proj-quote-mark" aria-hidden="true">&ldquo;</span>
                <p className="proj-quote-text">
                  Practical projects
                  <br />
                  turn knowledge
                  <br />
                  into capability.
                  <span className="proj-quote-mark proj-quote-mark-close" aria-hidden="true">&rdquo;</span>
                </p>
              </div>
            </div>

            {/* Mug & Monitor scene */}
            <div ref={headerSceneRef} className="proj-header-scene">
              <img
                src="/images/projects_header_mug_monitor.png"
                alt="Cybersecurity mission mug and monitor"
                className="proj-header-scene-img"
                width={167}
                height={95}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* ---- FOUR PROJECT CARDS ---- */}
        <div ref={cardsContainerRef} className="proj-cards-grid">
          {PROJECTS.map((proj, i) => (
            <div
              key={proj.num}
              ref={setCardRef(i)}
              className="proj-card"
              tabIndex={0}
              role="article"
              aria-label={proj.title.replace("\n", " ")}
            >
              {/* Laser Security Scan Line across top border */}
              <div
                ref={setScanLineRef(i)}
                className="proj-card-scan"
                aria-hidden="true"
              />

              {/* Card Meta: Number & Category */}
              <div className="proj-card-meta">
                <span className="proj-card-num">{proj.num}</span>
                <span className="proj-card-category">{proj.category}</span>
              </div>

              {/* Project Image */}
              <div className="proj-card-img-wrap">
                <img
                  src={proj.image}
                  alt={proj.imageAlt}
                  className="proj-card-img"
                  width={352}
                  height={175}
                  loading="lazy"
                />
                <div className="proj-card-img-overlay" aria-hidden="true" />
              </div>

              {/* Title & Description */}
              <div className="proj-card-body">
                <h3 className="proj-card-title">
                  {proj.title.split("\n").map((line, idx) => (
                    <span key={idx} className="block">
                      {line}
                    </span>
                  ))}
                </h3>

                <p className="proj-card-desc">{proj.description}</p>
              </div>

              {/* Tags */}
              <div className="proj-card-tags">
                {proj.tags.map((tag) => (
                  <span key={tag} className="proj-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ---- BOTTOM LABELS ---- */}
        <div className="proj-footer">
          <div ref={bottomLeftRef} className="proj-footer-left">
            <span>REAL PROBLEMS</span>
            <span className="proj-footer-slash">/</span>
            <span>PRACTICAL SOLUTIONS</span>
            <span className="proj-footer-slash">/</span>
            <span>CONTINUOUS GROWTH</span>
          </div>

          <div ref={bottomRightRef} className="proj-footer-right">
            <span>FROM LABS TO REAL-WORLD SKILLS.</span>
            <span className="proj-footer-dash" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
