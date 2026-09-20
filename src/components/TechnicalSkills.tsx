import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  SVG Icons for each skill category                                  */
/* ------------------------------------------------------------------ */

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
        fill="currentColor"
        opacity="0.15"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1" fill="currentColor" opacity="0.15" />
      <rect x="14" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1" fill="currentColor" opacity="0.15" />
      <path d="M10 17h4M14 7h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 14V10h10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="3" width="20" height="14" rx="2" fill="currentColor" opacity="0.15" />
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94L6.73 20.2a2 2 0 0 1-2.83 0l-.1-.1a2 2 0 0 1 0-2.83l6.73-6.73a6 6 0 0 1 7.94-7.94L14.7 6.3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94L6.73 20.2a2 2 0 0 1-2.83 0l-.1-.1a2 2 0 0 1 0-2.83l6.73-6.73a6 6 0 0 1 7.94-7.94L14.7 6.3z"
        fill="currentColor"
        opacity="0.12"
      />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.55a11 11 0 0 1 14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.53 16.11a6 6 0 0 1 6.94 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        fill="currentColor"
        opacity="0.15"
      />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polyline points="16,18 22,12 16,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="8,6 2,12 8,18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="14" y1="4" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Skill data                                                         */
/* ------------------------------------------------------------------ */
const SKILLS = [
  {
    id: "network-security",
    title: "Network Security",
    description:
      "Palo Alto (PAN-OS) · Check Point · Firewall Policy Management · VPN (IPSec) · Proxy (Squid) · NAT · URL Filtering · Threat Prevention · Network Troubleshooting",
    icon: ShieldIcon,
  },
  {
    id: "networking",
    title: "Networking",
    description:
      "TCP/IP · Routing & Switching · VLAN · DNS · DHCP · VPN · Network Security Fundamentals",
    icon: NetworkIcon,
  },
  {
    id: "siem-monitoring",
    title: "SIEM & Monitoring",
    description: "Splunk · Log Analysis · Security Event Monitoring",
    icon: MonitorIcon,
  },
  {
    id: "pentesting-tools",
    title: "Pentesting & Security Tools",
    description:
      "Nmap/NSE · Metasploit · Nessus Essentials · Burp Suite · Gobuster · Nikto · Wireshark · Hashcat · John the Ripper · CVE Analysis & Reporting · ServiceNow · Tufin",
    icon: ToolsIcon,
  },
  {
    id: "wireless-security",
    title: "Wireless Security",
    description:
      "IEEE 802.11 Protocol Analysis · Aircrack-ng · Wireless Reconnaissance · WPA2/WPA3 & WPS Security Assessment · Scapy",
    icon: WifiIcon,
  },
  {
    id: "operating-systems",
    title: "Operating Systems",
    description: "Kali Linux · Windows · Linux",
    icon: GearIcon,
  },
  {
    id: "programming-scripting",
    title: "Programming / Scripting",
    description: "Python · Bash",
    icon: CodeIcon,
  },
];

/* ------------------------------------------------------------------ */
/*  Network Background Canvas                                          */
/* ------------------------------------------------------------------ */
type NetworkNode = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  pulseSpeed: number;
};

function useNetworkBackground(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const nodesRef = useRef<NetworkNode[]>([]);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    /* Create nodes */
    const nodeCount = 35;
    const nodes: NetworkNode[] = [];
    const rect = canvas.getBoundingClientRect();

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 1.5 + 0.8,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.005 + Math.random() * 0.01,
      });
    }
    nodesRef.current = nodes;

    const connectionDist = 180;

    const draw = () => {
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      /* Update & draw nodes */
      for (const node of nodes) {
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          /* Keep within drift range */
          const dx = node.x - node.baseX;
          const dy = node.y - node.baseY;
          if (Math.abs(dx) > 3) node.vx *= -1;
          if (Math.abs(dy) > 3) node.vy *= -1;

          node.pulsePhase += node.pulseSpeed;
        }

        const pulse = prefersReducedMotion
          ? 0.5
          : 0.3 + 0.2 * Math.sin(node.pulsePhase);

        /* Draw node */
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${pulse * 0.4})`;
        ctx.fill();

        /* Node glow */
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${pulse * 0.08})`;
        ctx.fill();
      }

      /* Draw connections */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i]!;
          const nodeB = nodes[j]!;
          const ddx = nodeA.x - nodeB.x;
          const ddy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.06;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(220, 38, 38, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(draw);
    };

    /* Only animate when visible */
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          rafIdRef.current = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(rafIdRef.current);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function TechnicalSkills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useNetworkBackground(canvasRef);

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardsRef.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      /* Show everything immediately */
      [
        headingRef.current,
        accentLineRef.current,
        microLabelRef.current,
        bottomLeftRef.current,
        bottomRightRef.current,
      ].forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0, x: 0 });
      });
      if (accentLineRef.current) gsap.set(accentLineRef.current, { scaleX: 1 });
      cardsRef.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      /* Set initial states */
      gsap.set(headingRef.current, { opacity: 0, y: 20 });
      gsap.set(accentLineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(microLabelRef.current, { opacity: 0, y: 10 });
      gsap.set(bottomLeftRef.current, { opacity: 0, y: 10 });
      gsap.set(bottomRightRef.current, { opacity: 0, y: 10 });

      cardsRef.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 18 });
      });

      /* Build timeline */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 20%",
          scrub: false,
          once: true,
        },
      });

      /* 1 — Section fades from 0.7 to 1 */
      tl.fromTo(
        sectionRef.current,
        { opacity: 0.7 },
        { opacity: 1, duration: 0.5, ease: "power2.inOut" },
        0
      );

      /* 2 — Heading */
      tl.to(
        headingRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.1
      );

      /* 3 — Accent line draws */
      tl.to(
        accentLineRef.current,
        { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
        0.25
      );

      /* Micro label */
      tl.to(
        microLabelRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.3
      );

      /* 4 — Cards sequentially: reading order across rows */
      const cardOrder = [0, 1, 2, 3, 4, 5, 6];
      cardOrder.forEach((idx, i) => {
        const el = cardsRef.current[idx];
        if (el) {
          tl.to(
            el,
            { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
            0.4 + i * 0.1
          );
        }
      });

      /* Bottom labels */
      tl.to(
        bottomLeftRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        1.0
      );
      tl.to(
        bottomRightRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        1.05
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="technical-skills"
      className="ts-section"
      aria-label="Technical Skills"
    >
      {/* Network topology background */}
      <canvas
        ref={canvasRef}
        className="ts-bg-canvas"
        aria-hidden="true"
      />

      {/* Red atmospheric gradients */}
      <div className="ts-atmosphere" aria-hidden="true" />

      <div className="ts-inner">
        {/* Header row */}
        <div className="ts-header">
          <div className="ts-header-left">
            <div ref={headingRef} className="ts-title-row">
              <span className="ts-title-slash" aria-hidden="true">/</span>
              <h2 className="ts-title">
                TECHNICAL <span className="ts-title-red">SKILLS</span>
              </h2>
            </div>
            <div ref={accentLineRef} className="ts-accent-line" aria-hidden="true" />
          </div>
          <div ref={microLabelRef} className="ts-micro-label">
            SECURITY &nbsp;·&nbsp; NETWORK &nbsp;·&nbsp; OFFENSIVE
          </div>
        </div>

        {/* Card grid */}
        <div className="ts-grid">
          {SKILLS.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={skill.id}
                ref={setCardRef(index)}
                className="ts-card"
                tabIndex={0}
                role="article"
                aria-label={skill.title}
              >
                {/* Red sweep line (hover) */}
                <div className="ts-card-sweep" aria-hidden="true" />

                <div className="ts-card-content">
                  <div className="ts-card-icon-wrap">
                    <IconComponent />
                  </div>
                  <div className="ts-card-body">
                    <h3 className="ts-card-title">{skill.title}</h3>
                    <p className="ts-card-desc">{skill.description}</p>
                  </div>
                  <div className="ts-card-arrow">
                    <ChevronRight />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom labels */}
        <div className="ts-footer">
          <div ref={bottomLeftRef} className="ts-footer-left">
            <span>BUILD</span>
            <span>EXPLORE</span>
            <span>SECURE</span>
          </div>
          <div ref={bottomRightRef} className="ts-footer-right">
            <span>TOOLS</span>
            <span>KNOWLEDGE</span>
            <span>REAL-WORLD IMPACT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
