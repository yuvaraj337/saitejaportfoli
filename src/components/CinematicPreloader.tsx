import { useEffect, useRef, useState } from "react";

interface CinematicPreloaderProps {
  onComplete?: () => void;
  duration?: number; // duration in ms, defaults to 3400ms (~3.4 seconds)
}

export default function CinematicPreloader({
  onComplete,
  duration = 3400,
}: CinematicPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. Lock scrolling while preloader is active
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  // 2. Play video continuously and reliably
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // In case of any browser autoplay policy, retry on interaction
          const unlock = () => {
            video.play().catch(() => {});
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("keydown", unlock);
          };
          window.addEventListener("pointerdown", unlock, { once: true });
          window.addEventListener("keydown", unlock, { once: true });
        });
      }
    };

    playVideo();
    video.addEventListener("canplay", playVideo);

    return () => {
      video.removeEventListener("canplay", playVideo);
    };
  }, []);

  // 3. Smooth animated progress from 0% -> 100% over the specified duration
  useEffect(() => {
    const startTime = performance.now();
    let rafId: number;
    let fadeTimer: NodeJS.Timeout;
    let completeTimer: NodeJS.Timeout;

    // Smooth cubic curve for cinematic pacing
    const ease = (t: number) => {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = ease(rawProgress);
      const currentPercent = Math.min(100, Math.round(easedProgress * 100));

      setProgress(currentPercent);

      if (rawProgress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Hold briefly at 100% so it feels crisp and deliberate
        fadeTimer = setTimeout(() => {
          setIsFading(true);

          completeTimer = setTimeout(() => {
            setIsCompleted(true);
            onComplete?.();
          }, 700); // 700ms fade-out transition
        }, 180);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  if (isCompleted) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] select-none transition-opacity duration-700 ease-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
      aria-label="Loading portfolio"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Subtle central ambient glow behind shield */}
      <div
        className="pointer-events-none absolute -translate-y-12 w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full bg-red-600/10 blur-[90px]"
        aria-hidden="true"
      />

      {/* Center Shield Video Container */}
      <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px]">
        <video
          ref={videoRef}
          className="w-full h-full object-contain pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          style={{
            mixBlendMode: "screen",
            maskImage: "radial-gradient(circle at 50% 50%, black 62%, transparent 96%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 62%, transparent 96%)",
          }}
          aria-hidden="true"
        >
          <source src="/videos/cybersecurity_shield.mp4" type="video/mp4" />
          <source src="/videos/shield.mp4" type="video/mp4" />
          <source src="/videos/WhatsApp%20Video%202026-09-23%20at%206.27.18%20PM.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Loading Information & Percentage (Direct match to reference image) */}
      <div className="mt-2 sm:mt-4 flex items-center justify-center gap-3.5 tracking-[0.28em] font-mono text-xs sm:text-sm font-semibold uppercase">
        <span className="text-neutral-200">LOADING</span>
        <span
          className="text-[#ff3333] font-bold"
          style={{
            textShadow: "0 0 10px rgba(255, 51, 51, 0.8), 0 0 20px rgba(239, 68, 68, 0.4)",
          }}
        >
          {progress}%
        </span>
      </div>

      {/* Futuristic Progress Bar with Circuit Accents */}
      <div className="w-[85vw] max-w-[480px] relative mt-3 flex items-center justify-center">
        {/* Left Circuit Accent */}
        <svg
          className="w-10 sm:w-12 h-5 text-red-600/70 shrink-0 select-none pointer-events-none"
          viewBox="0 0 48 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M 2 10 L 22 10 L 30 16 L 48 16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="3" cy="10" r="1.8" fill="currentColor" />
          <path
            d="M 12 10 L 16 6 L 26 6"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
        </svg>

        {/* Central Track & Animated Bar */}
        <div className="relative flex-1 h-[4px] bg-neutral-900/95 border border-white/10 rounded-full overflow-hidden mx-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
          <div
            className="h-full rounded-full transition-all duration-75 ease-out relative"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, #991b1b 0%, #dc2626 60%, #ff4d4d 100%)",
              boxShadow:
                "0 0 12px rgba(255, 51, 51, 0.9), 0 0 24px rgba(220, 38, 38, 0.5)",
            }}
          >
            {/* Glowing tip at front edge */}
            {progress > 0 && progress < 100 && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_14px_#ff4d4d]" />
            )}
          </div>
        </div>

        {/* Right Circuit Accent (Mirrored) */}
        <svg
          className="w-10 sm:w-12 h-5 text-red-600/70 shrink-0 select-none pointer-events-none"
          viewBox="0 0 48 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M 46 10 L 26 10 L 18 16 L 0 16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="45" cy="10" r="1.8" fill="currentColor" />
          <path
            d="M 36 10 L 32 6 L 22 6"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}
