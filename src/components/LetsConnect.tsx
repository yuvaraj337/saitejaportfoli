import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Icons                                                             */
/* ------------------------------------------------------------------ */

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function LocationPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LetsConnect() {
  const sectionRef = useRef<HTMLElement>(null);
  const navLeftRef = useRef<HTMLDivElement>(null);
  const navRightRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const oppSpanRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btn1Ref = useRef<HTMLAnchorElement>(null);
  const btn2Ref = useRef<HTMLAnchorElement>(null);
  const quoteWrapRef = useRef<HTMLDivElement>(null);
  const quoteLineRef = useRef<HTMLDivElement>(null);
  const contactRowRef = useRef<HTMLDivElement>(null);
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
        headingRef.current,
        descRef.current,
        btn1Ref.current,
        btn2Ref.current,
        quoteWrapRef.current,
        contactRowRef.current,
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
      /* Initial setup */
      gsap.set(
        [
          navLeftRef.current,
          navRightRef.current,
          eyebrowRef.current,
          headingRef.current,
          descRef.current,
          btn1Ref.current,
          btn2Ref.current,
          quoteWrapRef.current,
          contactRowRef.current,
          bottomLeftRef.current,
          bottomRightRef.current,
        ],
        { opacity: 0, y: 20 }
      );

      gsap.set(quoteLineRef.current, { scaleY: 0, transformOrigin: "top center" });

      /* Master timeline */
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
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.18
      );

      /* Subtle crimson light sweep on Opportunities once */
      if (oppSpanRef.current) {
        tl.fromTo(
          oppSpanRef.current,
          { textShadow: "0 0 0px rgba(220,38,38,0)" },
          {
            textShadow: "0 0 20px rgba(255,31,53,0.8)",
            duration: 0.4,
            ease: "power2.out",
          },
          0.35
        );
        tl.to(
          oppSpanRef.current,
          {
            textShadow: "0 0 0px rgba(220,38,38,0)",
            duration: 0.5,
            ease: "power2.inOut",
          },
          0.75
        );
      }

      tl.to(
        descRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.28
      );

      /* 3. Buttons appear sequentially */
      tl.to(
        btn1Ref.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.35
      );
      tl.to(
        btn2Ref.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.43
      );

      /* 4. Quote on right */
      tl.to(
        quoteWrapRef.current,
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.32
      );
      tl.to(
        quoteLineRef.current,
        { scaleY: 1, duration: 0.35, ease: "power2.inOut" },
        0.38
      );

      /* 5. Contact information row */
      tl.to(
        contactRowRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.55
      );

      /* 6. Bottom micro text */
      tl.to(
        bottomLeftRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.65
      );
      tl.to(
        bottomRightRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.72
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="conn-section"
      aria-label="Let's Connect"
    >
      <span id="lets-connect" className="sr-only">Let's Connect</span>
      {/* Background ambient lighting */}
      <div className="conn-atmosphere" aria-hidden="true">
        <div className="conn-tl-glow" />
        <div className="conn-ambient-red" />
      </div>

      <div className="conn-inner">
        {/* ---- TOP NAV BAR ---- */}
        <div className="conn-nav">
          <div ref={navLeftRef} className="conn-nav-left">
            <span className="conn-nav-num">05</span>
            <span className="conn-nav-dash" aria-hidden="true" />
            <span className="conn-nav-label">
              LET'S <span className="conn-nav-red">CONNECT</span>
            </span>
          </div>

          <div ref={navRightRef} className="conn-nav-right">
            <span>OPPORTUNITIES • COLLABORATION • DISCUSSION</span>
            <span className="conn-nav-dash" aria-hidden="true" />
          </div>
        </div>

        {/* ---- MAIN CONTENT ROW ---- */}
        <div className="conn-content-row">
          {/* Left Column: Eyebrow, Heading, Description, Buttons */}
          <div className="conn-left">
            <div ref={eyebrowRef} className="conn-eyebrow">
              <span className="conn-eyebrow-red">ALWAYS</span> OPEN
            </div>

            <h2 ref={headingRef} className="conn-heading">
              Open to <span ref={oppSpanRef} className="conn-heading-red">Opportunities.</span>
            </h2>

            <p ref={descRef} className="conn-desc">
              Always open to discussions about Cybersecurity, Red Teaming, or
              interesting projects. Whether it's a potential opportunity,
              collaboration, or just a conversation — feel free to reach out.
            </p>

            {/* Buttons Group */}
            <div className="conn-btns">
              <a
                ref={btn1Ref}
                href="mailto:sailakavath390@gmail.com"
                className="conn-btn conn-btn-primary"
                aria-label="Get In Touch via Email"
              >
                <span className="conn-btn-icon" aria-hidden="true">
                  <MailIcon />
                </span>
                <span className="conn-btn-text">Get In Touch</span>
                <span className="conn-btn-arrow" aria-hidden="true">→</span>
              </a>

              <a
                ref={btn2Ref}
                href="https://www.linkedin.com/in/lakavath-sai-teja-757663209/"
                target="_blank"
                rel="noopener noreferrer"
                className="conn-btn conn-btn-secondary"
                aria-label="Visit LinkedIn Profile"
              >
                <span className="conn-btn-icon" aria-hidden="true">
                  <LinkedInIcon />
                </span>
                <span className="conn-btn-text">LinkedIn Profile</span>
                <span className="conn-btn-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Quote */}
          <div className="conn-right">
            <div ref={quoteWrapRef} className="conn-quote-wrap">
              <div ref={quoteLineRef} className="conn-quote-line" aria-hidden="true" />
              <div className="conn-quote-content">
                <span className="conn-quote-mark" aria-hidden="true">&ldquo;</span>
                <p className="conn-quote-text">
                  Security is a journey,
                  <br />
                  not a destination.
                  <span className="conn-quote-mark conn-quote-mark-close" aria-hidden="true">&rdquo;</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---- CONTACT INFORMATION ROW ---- */}
        <div ref={contactRowRef} className="conn-contact-row">
          <a
            href="mailto:sailakavath390@gmail.com"
            className="conn-contact-item"
            aria-label="Email address"
          >
            <span className="conn-contact-icon" aria-hidden="true">
              <MailIcon />
            </span>
            <span className="conn-contact-val">sailakavath390@gmail.com</span>
          </a>

          <a
            href="tel:+491638970174"
            className="conn-contact-item"
            aria-label="Phone number"
          >
            <span className="conn-contact-icon" aria-hidden="true">
              <PhoneIcon />
            </span>
            <span className="conn-contact-val">+49 1638970174</span>
          </a>

          <div className="conn-contact-item" aria-label="Location">
            <span className="conn-contact-icon" aria-hidden="true">
              <LocationPinIcon />
            </span>
            <span className="conn-contact-val">Berlin, Germany</span>
          </div>
        </div>

        {/* ---- BOTTOM LABELS ---- */}
        <div className="conn-footer">
          <div ref={bottomLeftRef} className="conn-footer-left">
            <span>IDEAS</span>
            <span className="conn-footer-slash">/</span>
            <span>CONVERSATIONS</span>
            <span className="conn-footer-slash">/</span>
            <span>OPPORTUNITIES</span>
          </div>

          <div ref={bottomRightRef} className="conn-footer-right">
            <span>LET'S BUILD A MORE SECURE TOMORROW.</span>
            <span className="conn-footer-dash" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
