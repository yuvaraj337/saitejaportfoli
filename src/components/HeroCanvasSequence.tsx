import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 180;
const FRAME_ASPECT = 1280 / 720; // 16:9
const SPOTLIGHT_RADIUS = 260; // Original radius from template
const REVEAL_IMAGE_SRC = "/images/Reveal_image.png";

interface HeroCanvasSequenceProps {
  containerRef: React.RefObject<HTMLElement | null>;
  isDesktop: boolean;
}

export default function HeroCanvasSequence({
  containerRef,
  isDesktop,
}: HeroCanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  const imageCache = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null),
  );
  const loadedFlags = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));

  // Scroll mapping refs
  const targetProgress = useRef<number>(0);
  const currentProgress = useRef<number>(0);
  const lastRenderedIndex = useRef<number>(-1);
  const needsResize = useRef<boolean>(true);
  const rafId = useRef<number | null>(null);

  // Mouse / hover tracking refs
  const mousePos = useRef<{ x: number; y: number }>({ x: -999, y: -999 });
  const smoothMouse = useRef<{ x: number; y: number }>({ x: -999, y: -999 });
  const isHovering = useRef<boolean>(false);

  // Track if first frame and reveal image are ready
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [revealReady, setRevealReady] = useState(false);

  // Helper to construct frame URL
  const getFrameUrl = (index: number) => {
    const frameNum = String(index + 1).padStart(5, "0");
    return `/hero-frames/frame_${frameNum}.webp`;
  };

  // Helper to find closest loaded frame so there is zero flicker or blank screen
  const getBestAvailableImage = (targetIdx: number): HTMLImageElement | null => {
    const cache = imageCache.current;
    const flags = loadedFlags.current;

    if (flags[targetIdx] && cache[targetIdx]) {
      return cache[targetIdx];
    }

    // Search outwards for nearest loaded frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const left = targetIdx - offset;
      if (left >= 0 && flags[left] && cache[left]) {
        return cache[left];
      }
      const right = targetIdx + offset;
      if (right < TOTAL_FRAMES && flags[right] && cache[right]) {
        return cache[right];
      }
    }

    return null;
  };

  // Draw frame to canvas with object-fit: cover and centered alignment
  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const clientW = canvas.clientWidth;
    const clientH = canvas.clientHeight;

    if (clientW === 0 || clientH === 0) return;

    const targetW = Math.round(clientW * dpr);
    const targetH = Math.round(clientH * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const canvasAspect = canvas.width / canvas.height;
    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    if (canvasAspect > FRAME_ASPECT) {
      drawW = canvas.width;
      drawH = canvas.width / FRAME_ASPECT;
      drawX = 0;
      drawY = (canvas.height - drawH) / 2;
    } else {
      drawH = canvas.height;
      drawW = canvas.height * FRAME_ASPECT;
      drawX = (canvas.width - drawW) / 2;
      drawY = 0;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  };

  // Preload reveal image
  useEffect(() => {
    const revealImg = new Image();
    revealImg.src = REVEAL_IMAGE_SRC;
    revealImg.onload = () => setRevealReady(true);
  }, []);

  // Progressive preloader with priority scheduling & concurrency limit
  useEffect(() => {
    let isCancelled = false;
    const MAX_CONCURRENT = 6;
    let activeRequests = 0;

    const keyframes: number[] = [];
    for (let k = 35; k < TOTAL_FRAMES; k += 10) {
      keyframes.push(k);
    }
    if (!keyframes.includes(TOTAL_FRAMES - 1)) {
      keyframes.push(TOTAL_FRAMES - 1);
    }

    const initialNearby: number[] = [];
    for (let i = 1; i <= 30 && i < TOTAL_FRAMES; i++) {
      initialNearby.push(i);
    }

    const keyframeSet = new Set(keyframes);
    const nearbySet = new Set(initialNearby);

    const remaining: number[] = [];
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      if (!keyframeSet.has(i) && !nearbySet.has(i)) {
        remaining.push(i);
      }
    }

    const queue: number[] = [...initialNearby, ...keyframes, ...remaining];

    const loadSingleFrame = (idx: number, onDone?: () => void) => {
      if (loadedFlags.current[idx]) {
        onDone?.();
        return;
      }

      const img = new Image();
      img.src = getFrameUrl(idx);

      img.onload = () => {
        if (isCancelled) return;
        imageCache.current[idx] = img;
        loadedFlags.current[idx] = true;

        if (idx === 0) {
          setFirstFrameReady(true);
          drawFrame(img);
          lastRenderedIndex.current = 0;
        } else if (idx === lastRenderedIndex.current) {
          drawFrame(img);
        }

        onDone?.();
      };

      img.onerror = () => {
        if (isCancelled) return;
        onDone?.();
      };
    };

    loadSingleFrame(0, () => {
      pumpQueue();
    });

    const pumpQueue = () => {
      if (isCancelled) return;

      while (activeRequests < MAX_CONCURRENT && queue.length > 0) {
        const nextIdx = queue.shift();
        if (nextIdx === undefined) break;

        if (loadedFlags.current[nextIdx]) {
          continue;
        }

        activeRequests++;
        loadSingleFrame(nextIdx, () => {
          activeRequests--;
          pumpQueue();
        });
      }
    };

    const handleScrollPrioritize = () => {
      if (queue.length === 0) return;
      const targetIdx = Math.min(
        Math.max(Math.round(currentProgress.current * (TOTAL_FRAMES - 1)), 0),
        TOTAL_FRAMES - 1,
      );

      const urgent: number[] = [];
      for (let offset = -5; offset <= 15; offset++) {
        const candidate = targetIdx + offset;
        if (
          candidate > 0 &&
          candidate < TOTAL_FRAMES &&
          !loadedFlags.current[candidate]
        ) {
          urgent.push(candidate);
        }
      }

      if (urgent.length > 0) {
        const urgentSet = new Set(urgent);
        const filteredQueue = queue.filter((item) => !urgentSet.has(item));
        queue.length = 0;
        queue.push(...urgent, ...filteredQueue);
        pumpQueue();
      }
    };

    window.addEventListener("scroll", handleScrollPrioritize, { passive: true });

    return () => {
      isCancelled = true;
      window.removeEventListener("scroll", handleScrollPrioritize);
    };
  }, []);

  // State flags for sequential interaction
  const heroAnimationComplete = useRef<boolean>(false);
  const hoverEnabled = useRef<boolean>(false);
  const mouseMovedAfterComplete = useRef<boolean>(false);

  // Pointer & Scroll Event Listeners + Unified Animation Loop
  useEffect(() => {
    // 1. Mouse Tracking
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = { x: event.clientX, y: event.clientY };
      isHovering.current = true;

      // Only mark mouse moved if hover is currently active (Frame 20+)
      if (heroAnimationComplete.current || hoverEnabled.current) {
        mouseMovedAfterComplete.current = true;
      }
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      mouseMovedAfterComplete.current = false;
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
    };

    // 2. Scroll Progress Calculation
    const calculateProgress = () => {
      if (!containerRef.current || !isDesktop) {
        targetProgress.current = 0;
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance =
        containerRef.current.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) {
        targetProgress.current = 0;
        return;
      }

      const rawProgress = -rect.top / scrollableDistance;
      targetProgress.current = Math.min(Math.max(rawProgress, 0), 1);
    };

    const handleResize = () => {
      needsResize.current = true;
      calculateProgress();
    };

    const handleScroll = () => {
      calculateProgress();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    calculateProgress();

    // 3. Unified Animation Loop
    const renderLoop = () => {
      // --- A. Smooth Scroll Lerp ---
      const diffProgress = targetProgress.current - currentProgress.current;
      if (Math.abs(diffProgress) < 0.0003) {
        currentProgress.current = targetProgress.current;
      } else {
        currentProgress.current += diffProgress * 0.16;
      }

      // Map progress to frame 0..179
      const frameIndex = Math.min(
        Math.max(Math.round(currentProgress.current * (TOTAL_FRAMES - 1)), 0),
        TOTAL_FRAMES - 1,
      );

      // Redraw canvas if frame changed or resized
      if (frameIndex !== lastRenderedIndex.current || needsResize.current) {
        needsResize.current = false;
        const img = getBestAvailableImage(frameIndex);
        if (img) {
          drawFrame(img);
          lastRenderedIndex.current = frameIndex;
        }
      }

      // --- B. Sequential State Evaluation ---
      // Hover activation condition: Active when scroll reaches Frame 20 or above
      const currentFrame = frameIndex + 1;

      if (currentFrame >= 20) {
        // Frame 20+ -> Hover effect enabled
        if (!hoverEnabled.current) {
          hoverEnabled.current = true;
          heroAnimationComplete.current = true;
          mouseMovedAfterComplete.current = false;
        }
      } else {
        // Frames 1–19 -> Hover effect disabled
        hoverEnabled.current = false;
        heroAnimationComplete.current = false;
        mouseMovedAfterComplete.current = false;
      }

      // --- C. Smooth Mouse Lerp (only when hover is active) ---
      if (mousePos.current.x > -500 && mousePos.current.y > -500) {
        if (smoothMouse.current.x < -500) {
          smoothMouse.current = { ...mousePos.current };
        } else {
          smoothMouse.current.x +=
            (mousePos.current.x - smoothMouse.current.x) * 0.14;
          smoothMouse.current.y +=
            (mousePos.current.y - smoothMouse.current.y) * 0.14;
        }
      }

      // --- D. Update Reveal Layer (Cyber Transformation) ---
      if (revealRef.current) {
        // At End Frame 180, scale is locked at 1.0 (exact close-up portrait match)
        revealRef.current.style.transform = "scale(1)";

        // Hover effect is strictly permitted ONLY in Phase 4:
        // heroAnimationComplete === true AND user moved cursor intentionally
        const canHover =
          heroAnimationComplete.current &&
          hoverEnabled.current &&
          mouseMovedAfterComplete.current &&
          isHovering.current &&
          smoothMouse.current.x > -200 &&
          smoothMouse.current.y > -200;

        if (canHover) {
          const mx = Math.round(smoothMouse.current.x);
          const my = Math.round(smoothMouse.current.y);

          // Radial spotlight mask centered at cursor position over frame 180
          const mask = `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${mx}px ${my}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, rgba(0,0,0,0) 100%)`;

          revealRef.current.style.maskImage = mask;
          revealRef.current.style.webkitMaskImage = mask;
          revealRef.current.style.opacity = "1";
        } else {
          // When mouse leaves or while scrolling, return to normal Frame 180
          revealRef.current.style.opacity = "0";
        }
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [containerRef, isDesktop]);

  return (
    <div className="absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      {/* Layer 1 Fallback: Zero-delay first frame background so hero never flashes blank */}
      <img
        src="/hero-frames/frame_00001.webp"
        alt=""
        fetchPriority="high"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 pointer-events-none ${
          firstFrameReady ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />

      {/* Layer 2: Main cinematic scroll-controlled portrait frame sequence canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/* Layer 3: Cyber Hover Transformation Layer (Precisely masked to cursor spotlight & synced with zoom) */}
      <div
        ref={revealRef}
        className="pointer-events-none absolute inset-0 z-20 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
        style={{
          backgroundImage: `url(${REVEAL_IMAGE_SRC})`,
          transformOrigin: "53.5% 48%",
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          opacity: 0,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
