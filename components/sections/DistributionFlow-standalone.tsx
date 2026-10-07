"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface OutputNode {
  id: string;
  label: string;
  solution: string;
  desc: string;
  x: number;
  y: number;
  rot?: number;
  scale?: number;
  videoSrc?: string;
  posterSrc?: string;
}

export interface ProblemBadge {
  text: string;
  x: number;
  y: number;
}

export interface DistributionFlowProps {
  videoSrc?: string;
  videoPoster?: string;
  showIntroHeader?: boolean;
  headlinePrefix?: string;
  headlineAccent?: string;
  punchlinePrimary?: string;
  punchlineAccent?: string;
  outputs?: OutputNode[];
  problemLabels?: ProblemBadge[];
  flowSteps?: string[];
  className?: string;
}

const DEFAULT_OUTPUTS: OutputNode[] = [
  {
    id: "clip-1",
    label: "01",
    solution: "",
    desc: "",
    x: 100,
    y: -140,
    rot: -5.5,
    scale: 0.94,
    videoSrc: "/assets/Reels/New/reel-1.mp4",
    posterSrc: "/assets/Reels/New/reel-1-cover.webp",
  },
  {
    id: "clip-2",
    label: "02",
    solution: "",
    desc: "",
    x: 280,
    y: -260,
    rot: 4.5,
    scale: 1.02,
    videoSrc: "/assets/Reels/New/reel-2.mp4",
    posterSrc: "/assets/Reels/New/reel-2-cover.webp",
  },
  {
    id: "clip-3",
    label: "03",
    solution: "",
    desc: "",
    x: 520,
    y: -150,
    rot: -6,
    scale: 1.05,
    videoSrc: "/assets/Reels/New/reel-3.mp4",
    posterSrc: "/assets/Reels/New/reel-3-cover.webp",
  },
  {
    id: "clip-4",
    label: "04",
    solution: "",
    desc: "",
    x: 360,
    y: 15,
    rot: 6.5,
    scale: 0.98,
    videoSrc: "/assets/Reels/New/reel-4.mp4",
    posterSrc: "/assets/Reels/New/reel-4-cover.webp",
  },
  {
    id: "clip-5",
    label: "05",
    solution: "",
    desc: "",
    x: 130,
    y: 190,
    rot: 4,
    scale: 0.95,
    videoSrc: "/assets/Reels/New/reel-5.mp4",
    posterSrc: "/assets/Reels/New/reel-5-cover.webp",
  },
  {
    id: "clip-6",
    label: "06",
    solution: "",
    desc: "",
    x: 490,
    y: 230,
    rot: -5,
    scale: 1.03,
    videoSrc: "/assets/Reels/New/reel-6.mp4",
    posterSrc: "/assets/Reels/New/reel-6-cover.webp",
  },
];

const CONNECTION_SEGMENTS = [
  { id: "line-1", path: "M 368 360 C 425 360, 470 260, 537 260", startX: 368, startY: 360, endX: 537, endY: 260, delay: 0 },
  { id: "line-2", path: "M 360 339 C 480 230, 590 140, 717 140", startX: 360, startY: 339, endX: 717, endY: 140, delay: 0.2 },
  { id: "line-3", path: "M 368 380 C 560 380, 760 250, 957 250", startX: 368, startY: 380, endX: 957, endY: 250, delay: 0.35 },
  { id: "line-4", path: "M 368 405 C 510 405, 650 415, 797 415", startX: 368, startY: 405, endX: 797, endY: 415, delay: 0.5 },
  { id: "line-5", path: "M 368 435 C 440 435, 490 590, 567 590", startX: 368, startY: 435, endX: 567, endY: 590, delay: 0.65 },
  { id: "line-6", path: "M 360 461 C 550 540, 740 630, 927 630", startX: 360, startY: 461, endX: 927, endY: 630, delay: 0.8 },
];

const DEFAULT_PROBLEM_LABELS: ProblemBadge[] = [
  { text: "Low Reach", x: -260, y: -70 },
  { text: "Lost Moments", x: 260, y: -70 },
  { text: "Limited Distribution", x: 0, y: 150 },
];

const DEFAULT_FLOW_STEPS: string[] = [
  "EXTRACT",
  "OPTIMIZE",
  "REPURPOSE",
  "DISTRIBUTE",
];

export default function DistributionFlow({
  videoSrc = "/assets/clipping.mp4",
  videoPoster = "/assets/clipping-poster.webp",
  showIntroHeader = true,
  headlinePrefix = "Your content isn't the problem",
  headlineAccent = "target the right audience",
  punchlinePrimary = "ONE PIECE OF CONTENT.",
  punchlineAccent = "INFINITE REACH.",
  outputs = DEFAULT_OUTPUTS,
  problemLabels = DEFAULT_PROBLEM_LABELS,
  flowSteps = DEFAULT_FLOW_STEPS,
  className = "",
}: DistributionFlowProps) {
  const statementRef = useRef<HTMLDivElement | null>(null);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentGroupRef = useRef<HTMLDivElement | null>(null);
  const sourceRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const pieceRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const labelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const problemLabelRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const flowStepRefs = useRef<Record<number, HTMLSpanElement | null>>({});
  const finalLineRef = useRef<HTMLDivElement | null>(null);
  const punchline1Ref = useRef<HTMLDivElement | null>(null);
  const punchline2Ref = useRef<HTMLDivElement | null>(null);
  const punchline3Ref = useRef<HTMLDivElement | null>(null);
  const punchline4Ref = useRef<HTMLDivElement | null>(null);
  const linesGroupRef = useRef<SVGSVGElement | null>(null);
  const sourceVideoRef = useRef<HTMLVideoElement | null>(null);
  const outputVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const [isInView, setIsInView] = useState(false);
  const [isPreloadNear, setIsPreloadNear] = useState(false);
  const [sourceLoaded, setSourceLoaded] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState<Record<string, boolean>>({});
  const [activeUserVideos, setActiveUserVideos] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      setIsPreloadNear(true);
      return;
    }

    // Preload videos 600px before the section enters viewport
    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPreloadNear(true);
        }
      },
      { rootMargin: "600px 0px" }
    );
    preloadObserver.observe(el);

    // Active viewport observer: pauses videos when scrolled away to save resources
    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        if (!inView) {
          if (sourceVideoRef.current && !sourceVideoRef.current.paused) {
            sourceVideoRef.current.pause();
          }
          Object.values(outputVideoRefs.current).forEach((video) => {
            if (video && !video.paused) {
              video.pause();
            }
          });
        }
      },
      { rootMargin: "100px 0px" }
    );
    viewObserver.observe(el);

    return () => {
      preloadObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  const handleSourceLoaded = useCallback(() => {
    setSourceLoaded(true);
    if (sourceVideoRef.current && sourceVideoRef.current.paused) {
      sourceVideoRef.current.play().catch(() => {});
    }
  }, []);

  const handleOutputLoaded = useCallback((id: string, shouldPlay: boolean) => {
    setLoadedVideos((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
    const videoEl = outputVideoRefs.current[id];
    if (videoEl && shouldPlay && videoEl.paused) {
      videoEl.play().catch(() => {});
    }
  }, []);

  // Sync if videos are already buffered in browser cache
  useEffect(() => {
    if (sourceVideoRef.current && sourceVideoRef.current.readyState >= 2) {
      setSourceLoaded(true);
      if (isInView && sourceVideoRef.current.paused) {
        sourceVideoRef.current.play().catch(() => {});
      }
    }
    outputs.forEach((item, idx) => {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const shouldPlay = isInView && (!isMobile || idx < 2);
      const v = outputVideoRefs.current[item.id];
      if (v && v.readyState >= 2) {
        setLoadedVideos((prev) => (prev[item.id] ? prev : { ...prev, [item.id]: true }));
        if (shouldPlay && v.paused) {
          v.play().catch(() => {});
        }
      }
    });
  }, [outputs, isInView, isPreloadNear]);

  const handleSourceMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = tiltRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateZ(12px)`;
    },
    []
  );

  const handleSourceMouseLeave = useCallback(() => {
    const el = tiltRef.current;
    if (el) {
      el.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
  }, []);

  const handlePieceEnter = useCallback((id: string) => {
    setActiveUserVideos((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
    const inner = pieceRefs.current[id]?.querySelector<HTMLElement>(".piece-inner");
    if (inner) {
      inner.style.transform = "translateY(-6px) scale(1.05)";
      inner.style.borderColor = "rgba(139, 163, 198, 0.7)";
      inner.style.boxShadow = "0 18px 36px rgba(139, 163, 198, 0.25)";
    }
    const video = outputVideoRefs.current[id];
    if (video && video.paused) {
      video.play().catch(() => {});
    }
  }, []);

  const handlePieceLeave = useCallback((id: string) => {
    const inner = pieceRefs.current[id]?.querySelector<HTMLElement>(".piece-inner");
    if (inner) {
      inner.style.transform = "translateY(0) scale(1)";
      inner.style.borderColor = "rgba(139, 163, 198, 0.35)";
      inner.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.4)";
    }
  }, []);

  useGSAP(
    () => {
      if (!sourceRef.current || !wrapperRef.current) return;
      gsap.set(sourceRef.current, { scale: 1, opacity: 1, x: 0, y: 0 });

      outputs.forEach((item) => {
        const el = pieceRefs.current[item.id];
        if (el) gsap.set(el, { scale: 0, opacity: 0, x: 0, y: 0 });
      });

      Object.values(problemLabelRefs.current).forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 10 });
      });

      Object.values(flowStepRefs.current).forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 12 });
      });

      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

      if (punchline1Ref.current) gsap.set(punchline1Ref.current, { opacity: 0, y: isMobile ? -14 : 20 });
      if (punchline2Ref.current) gsap.set(punchline2Ref.current, { opacity: 0, y: isMobile ? -14 : 20 });
      if (punchline3Ref.current) gsap.set(punchline3Ref.current, { opacity: 0, y: isMobile ? -14 : 20 });
      if (punchline4Ref.current) gsap.set(punchline4Ref.current, { opacity: 0, y: isMobile ? -14 : 20 });

      if (finalLineRef.current) {
        gsap.set(finalLineRef.current, {
          opacity: 1,
        });
      }

      if (statementRef.current) {
        gsap.set(statementRef.current, { opacity: 1, y: 0 });
      }

      if (linesGroupRef.current) {
        gsap.set(linesGroupRef.current, { opacity: 0 });
      }

      if (contentGroupRef.current) {
        gsap.set(contentGroupRef.current, { x: 0, y: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: isMobile ? "+=140%" : "+=400%",
          scrub: isMobile ? 0.2 : 0.3,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });

      // 1. Establish problem badges with a clean pop-in
      problemLabels.forEach((_, i) => {
        const el = problemLabelRefs.current[i];
        if (el) tl.to(el, { opacity: 1, y: 0, duration: 0.045, ease: "power2.out" }, 0.01 + i * 0.015);
      });

      // 2. Hold badges established so user comfortably reads "Low Reach", "Lost Moments", "Limited Distribution"
      // Badges fully visible from ~0.045 to ~0.11 before exiting

      if (statementRef.current) {
        tl.to(
          statementRef.current,
          { opacity: 0, y: -20, duration: 0.05, ease: "power2.in" },
          0.10
        );
      }

      problemLabels.forEach((_, i) => {
        const el = problemLabelRefs.current[i];
        if (el) tl.to(el, { opacity: 0, y: -10, duration: 0.04, ease: "power2.in" }, 0.11 + i * 0.012);
      });

      // 3. Source shrinks & moves left into distribution hub
      tl.to(
        sourceRef.current,
        { scale: 0.58, x: -240, duration: 0.09, ease: "power2.inOut" },
        0.13
      );

      // 4. Distribution lines and output reels fan out
      if (linesGroupRef.current) {
        tl.to(
          linesGroupRef.current,
          { opacity: 1, duration: 0.10, ease: "power2.out" },
          0.17
        );
      }

      outputs.forEach((item, i) => {
        const el = pieceRefs.current[item.id];
        if (!el) return;
        tl.to(
          el,
          {
            x: item.x,
            y: item.y,
            rotation: item.rot || 0,
            scale: item.scale || 1,
            opacity: 1,
            duration: 0.13,
            ease: "back.out(1.2)",
          },
          0.17 + i * 0.018
        );
      });

      if (contentGroupRef.current) {
        const isClient = typeof window !== "undefined";
        const winWidth = isClient ? window.innerWidth : 390;
        const mobileScale = Math.min(0.37, Math.max(0.34, (winWidth - 24) / 950));
        const mobileX = -Math.round(113.2 * mobileScale);

        tl.to(
          contentGroupRef.current,
          isMobile
            ? { x: mobileX, y: 18, scale: mobileScale, duration: 0.09, ease: "power2.out" }
            : { x: 70, y: -20, scale: 0.85, duration: 0.09, ease: "power2.out" },
          0.23
        );
      }

      flowSteps.forEach((_, i) => {
        const el = flowStepRefs.current[i];
        const stepMilestones = [0.25, 0.45, 0.65, 0.85];
        if (el) tl.to(el, { opacity: 1, y: 0, duration: 0.04 }, stepMilestones[i] ?? (0.25 + i * 0.2));
      });

      if (punchline1Ref.current) {
        tl.to(
          punchline1Ref.current,
          { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" },
          0.25
        );
        tl.to(
          punchline1Ref.current,
          { opacity: 0, y: isMobile ? 12 : -16, duration: 0.04, ease: "power2.in" },
          0.41
        );
      }

      if (punchline2Ref.current) {
        tl.to(
          punchline2Ref.current,
          { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" },
          0.45
        );
        tl.to(
          punchline2Ref.current,
          { opacity: 0, y: isMobile ? 12 : -16, duration: 0.04, ease: "power2.in" },
          0.61
        );
      }

      if (punchline3Ref.current) {
        tl.to(
          punchline3Ref.current,
          { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" },
          0.65
        );
        tl.to(
          punchline3Ref.current,
          { opacity: 0, y: isMobile ? 12 : -16, duration: 0.04, ease: "power2.in" },
          0.81
        );
      }

      if (punchline4Ref.current) {
        tl.to(
          punchline4Ref.current,
          { opacity: 1, y: 0, duration: 0.08, ease: "back.out(1.3)" },
          0.85
        );
      }

      if (!isMobile) {
        tl.to({}, { duration: 0.45 });
      }
    },
    { scope: wrapperRef, dependencies: [outputs, problemLabels, flowSteps] }
  );

  return (
    <section id="distribution" className={classNames("relative w-full overflow-hidden bg-[#090e14] text-[#f2ece1] z-20 isolate", className)}>
      <div
        ref={wrapperRef}
        className="relative w-full h-[100dvh] min-h-[100dvh] bg-[#090e14] overflow-hidden select-none"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[750px] w-[750px] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,163,198,0.12),transparent_70%)] blur-none md:blur-2xl z-[1]"
        />

        {showIntroHeader && (
          <div
            ref={statementRef}
            className="absolute top-[3.5%] sm:top-[4.5%] md:top-[5%] inset-x-0 mx-auto text-center z-20 pointer-events-none px-6 max-w-4xl"
          >
            <p className="text-base sm:text-lg md:text-xl text-[#f2ece1]/75 tracking-tight font-sans mb-1 leading-tight font-normal">
              {headlinePrefix}
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-[44px] font-semibold tracking-tight text-[#f2ece1] font-display leading-[1.1]">
              We make sure we{" "}
              <span className="text-[#8BA3C6]">
                target the right audience
              </span>
            </h2>
          </div>
        )}

        <div
          ref={finalLineRef}
          className="absolute top-[4.5%] sm:top-[6%] md:top-1/2 md:-translate-y-1/2 inset-x-4 md:inset-x-auto md:left-[9%] lg:left-[11%] xl:left-[12%] text-center md:text-left max-w-sm sm:max-w-md md:max-w-[420px] lg:max-w-[460px] mx-auto md:mx-0 z-20 pointer-events-none"
        >
          <div className="relative h-[96px] sm:h-[110px] md:h-[130px] w-full flex items-center justify-center md:justify-start">
            <div
              ref={punchline1Ref}
              className="absolute inset-0 flex flex-col justify-center text-center md:text-left font-display text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium leading-[1.15] text-[#f2ece1] tracking-tight"
            >
              <span className="whitespace-nowrap">You want</span>
              <span className="whitespace-nowrap text-[#8BA3C6] font-semibold">leads?</span>
            </div>

            <div
              ref={punchline2Ref}
              className="absolute inset-0 flex flex-col justify-center text-center md:text-left font-display text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium leading-[1.15] text-[#f2ece1] tracking-tight"
            >
              <span className="whitespace-nowrap">You want</span>
              <span className="whitespace-nowrap text-[#8BA3C6] font-semibold">conversion?</span>
            </div>

            <div
              ref={punchline3Ref}
              className="absolute inset-0 flex flex-col justify-center text-center md:text-left font-display text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium leading-[1.15] text-[#f2ece1] tracking-tight"
            >
              <span className="whitespace-nowrap">You want</span>
              <span className="whitespace-nowrap text-[#8BA3C6] font-semibold">reach?</span>
            </div>

            <div
              ref={punchline4Ref}
              className="absolute inset-0 flex flex-col justify-center text-center md:text-left font-display text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium leading-[1.15] text-[#f2ece1] tracking-tight"
            >
              <span className="whitespace-nowrap">We have</span>
              <span className="whitespace-nowrap text-[#8BA3C6] font-semibold">done it before</span>
            </div>
          </div>
        </div>

        <div
          ref={contentGroupRef}
          className="absolute top-1/2 left-1/2 w-[1000px] h-[800px] -ml-[500px] -mt-[400px] max-w-none scale-[0.38] xs:scale-[0.44] sm:scale-70 md:scale-90 lg:scale-100 origin-center"
        >
          <svg
            ref={linesGroupRef}
            viewBox="0 0 1000 800"
            className="pointer-events-none absolute inset-0 w-full h-full max-w-none z-[2] overflow-visible"
            fill="none"
          >
            <style>{`
              @keyframes flowDotsOutward {
                from {
                  stroke-dashoffset: 0;
                }
                to {
                  stroke-dashoffset: -24;
                }
              }
              .animate-flowing-dots {
                animation: flowDotsOutward 1.2s linear infinite;
              }
            `}</style>
            {CONNECTION_SEGMENTS.map((seg) => (
              <g key={seg.id}>
                <path
                  d={seg.path}
                  stroke="rgba(242, 236, 225, 0.18)"
                  strokeWidth="1.5"
                  strokeDasharray="2 6"
                  strokeLinecap="round"
                />
                <path
                  d={seg.path}
                  stroke="rgba(242, 236, 225, 0.7)"
                  strokeWidth="2"
                  strokeDasharray="4 8"
                  strokeLinecap="round"
                  className="animate-flowing-dots"
                />
                {!isMobile && isInView && (
                  <circle r="2.5" fill="#f2ece1">
                    <animateMotion
                      path={seg.path}
                      dur="1.8s"
                      repeatCount="indefinite"
                      begin={`${seg.delay}s`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.95;0.95;0"
                      keyTimes="0;0.12;0.88;1"
                      dur="1.8s"
                      repeatCount="indefinite"
                      begin={`${seg.delay}s`}
                    />
                  </circle>
                )}
                <circle cx={seg.startX} cy={seg.startY} r="3" fill="#f2ece1" opacity="0.85" />
                <circle cx={seg.endX} cy={seg.endY} r="2.5" fill="#f2ece1" opacity="0.65" />
              </g>
            ))}
          </svg>

          {problemLabels.map((p, i) => (
            <div
              key={p.text}
              ref={(el) => {
                problemLabelRefs.current[i] = el;
              }}
              style={{
                top: `calc(50% + ${p.y}px)`,
                left: `calc(50% + ${p.x}px)`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-xs tracking-wider uppercase text-black border border-white px-3.5 py-1.5 rounded-full bg-white font-medium shadow-lg z-[6] whitespace-nowrap"
            >
              {p.text}
            </div>
          ))}

          <div
            ref={sourceRef}
            className="absolute top-1/2 left-1/2 w-[360px] h-[203px] -ml-[180px] -mt-[101px] max-w-none rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.8)] z-[5]"
          >
            <div
              ref={tiltRef}
              onMouseMove={handleSourceMouseMove}
              onMouseLeave={handleSourceMouseLeave}
              className="relative w-full h-full transition-transform duration-300 ease-out"
            >
              {videoPoster && (
                <img
                  src={videoPoster}
                  alt="Source video cover"
                  className={classNames(
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out z-[1]",
                    sourceLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
                  )}
                  loading="eager"
                  decoding="async"
                />
              )}
              <video
                ref={sourceVideoRef}
                src={isPreloadNear || isInView ? videoSrc : undefined}
                poster={videoPoster}
                autoPlay={isInView}
                muted
                loop
                playsInline
                preload="auto"
                onLoadedData={handleSourceLoaded}
                onCanPlay={handleSourceLoaded}
                className={classNames(
                  "w-full h-full object-cover transition-opacity duration-700 ease-out z-[2]",
                  sourceLoaded ? "opacity-100" : "opacity-0"
                )}
              />
            </div>
          </div>

          {outputs.map((item, idx) => {
            const isUserActive = !!activeUserVideos[item.id];
            const shouldAttachSrc = !isMobile || idx < 2 || isUserActive;
            const shouldPlayOutput = isInView && (!isMobile || idx < 2 || isUserActive);
            const isLoaded = !!loadedVideos[item.id];
            const poster = item.posterSrc;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  pieceRefs.current[item.id] = el;
                }}
                onMouseEnter={() => handlePieceEnter(item.id)}
                onMouseLeave={() => handlePieceLeave(item.id)}
                onClick={() => handlePieceEnter(item.id)}
                className="absolute top-1/2 left-1/2 w-[126px] h-[224px] -ml-[63px] -mt-[112px] aspect-[9/16] z-[3] cursor-pointer group"
              >
                <div className="piece-inner relative w-full h-full rounded-xl overflow-hidden bg-[#070b10] border border-[#8BA3C6]/30 shadow-[0_12px_28px_rgba(0,0,0,0.6)] transition-all duration-350 ease-smooth group-hover:border-[#8BA3C6]/80 group-hover:shadow-[0_18px_40px_rgba(139,163,198,0.25)]">
                  {poster && (
                    <img
                      src={poster}
                      alt={item.label || "Clip cover"}
                      className={classNames(
                        "absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out z-[1]",
                        isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
                      )}
                      loading="eager"
                      decoding="async"
                    />
                  )}
                  {item.videoSrc ? (
                    <video
                      ref={(el) => {
                        outputVideoRefs.current[item.id] = el;
                      }}
                      src={shouldAttachSrc && (isPreloadNear || isInView) ? item.videoSrc : undefined}
                      poster={poster}
                      autoPlay={shouldPlayOutput}
                      muted
                      loop
                      playsInline
                      preload={isMobile ? "metadata" : "auto"}
                      onLoadedData={() => handleOutputLoaded(item.id, shouldPlayOutput)}
                      onCanPlay={() => handleOutputLoaded(item.id, shouldPlayOutput)}
                      className={classNames(
                        "w-full h-full object-cover transition-opacity duration-700 ease-out z-[2]",
                        isLoaded ? "opacity-100" : "opacity-0"
                      )}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-[#141d2b]/80 via-[#0a0f16]/95 to-[#06090d]" />
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-[3]" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-[3%] sm:bottom-[6%] inset-x-0 flex justify-center items-center gap-2 sm:gap-6 z-[8] flex-wrap px-2 sm:px-4">
          {flowSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-2 sm:gap-6">
              <span
                ref={(el) => {
                  flowStepRefs.current[i] = el;
                }}
                className="text-[9px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] text-[#8BA3C6] uppercase font-semibold font-mono"
              >
                {step}
              </span>
              {i < flowSteps.length - 1 && (
                <span className="text-[9px] sm:text-xs text-[#f2ece1]/40">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
