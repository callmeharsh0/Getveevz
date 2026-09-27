"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useDeferredValue,
} from "react";
import { cn } from "@/lib/utils";

export interface GlobeProps {
  /** Width of the globe container in pixels, or "auto" to match parent width */
  width?: number | "auto";
  /** Height of the globe container in pixels, or "auto" to match width */
  height?: number | "auto";
  /** Color for animated arcs and markers (any valid CSS color) */
  primaryColor?: string;
  /** Color for land dots and subtle elements (any valid CSS color) */
  neutralColor?: string;
  /** Color for atmosphere (defaults to neutralColor or primaryColor) */
  atmosphereColor?: string;
  /** Base globe sphere color */
  globeColor?: string;
  /** Show atmosphere glow around the globe */
  showAtmosphere?: boolean;
  /** Auto-rotation speed (0 = no rotation, higher = faster) */
  autoRotateSpeed?: number;
  /** Allow mouse-wheel or pinch zoom */
  enableZoom?: boolean;
  /** Enable mouse drag / touch rotation */
  interactive?: boolean;
  /** Number of simultaneous animated arcs */
  arcCount?: number;
  /** Interval in ms between new arc animations */
  arcInterval?: number;
  /** Duration of each arc flight in ms */
  arcAnimationDuration?: number;
  /** Distance of camera from center (lower = closer) */
  cameraAltitude?: number;
  /** Density of land dots grid */
  landDotRows?: number;
  /** Size of land dots */
  pointSize?: number;
  /** Altitude/thickness of atmosphere glow */
  atmosphereAltitude?: number;
  /** URL for the equirectangular land alpha map */
  landMapUrl?: string;
  /** Additional CSS class names */
  className?: string;
  /** Callback fired when globe is fully initialized and mounted */
  onReady?: () => void;
  /** Click handler returning latitude and longitude */
  onGlobeClick?: (
    coords: { lat: number; lng: number },
    event: MouseEvent
  ) => void;
  /** Polygon resolution for point dots */
  pointResolution?: number;
  /** Opacity of base globe sphere (0 to 1) */
  globeOpacity?: number;
}

interface LandPoint {
  lat: number;
  lng: number;
}

// In-memory cache for sampled land map points
const pointsCache = new Map<string, LandPoint[]>();

// Helper to convert hex / rgb string to rgb components for rgba rings
function parseRgb(colorStr: string): string {
  if (!colorStr) return "0, 56, 226";
  const hexMatch = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorStr);
  if (hexMatch) {
    return `${parseInt(hexMatch[1], 16)}, ${parseInt(hexMatch[2], 16)}, ${parseInt(hexMatch[3], 16)}`;
  }
  const rgbMatch = /rgba?\((\d+),\s*(\d+),\s*(\d+)/i.exec(colorStr);
  if (rgbMatch) {
    return `${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}`;
  }
  return "0, 56, 226";
}

/**
 * React Bits Pro Globe Component
 * Interactive 3D globe with animated arcs and location markers.
 */
export const Globe: React.FC<GlobeProps> = ({
  width = "auto",
  height = "auto",
  primaryColor = "#0038E2",
  neutralColor = "#1C3252",
  atmosphereColor,
  globeColor = "#F3EFEA",
  showAtmosphere = true,
  autoRotateSpeed = 0.75,
  enableZoom = false,
  interactive = true,
  arcCount = 10,
  arcInterval = 5500,
  arcAnimationDuration = 2200,
  cameraAltitude = 2.2,
  landDotRows = 190,
  pointSize = 0.28,
  atmosphereAltitude = 0.25,
  landMapUrl = "/images/globe-map.png",
  className,
  onReady,
  onGlobeClick,
  pointResolution = 4,
  globeOpacity = 0.35,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeInstanceRef = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isAnimatingArcsRef = useRef<boolean>(false);
  const cleanupCallbackRef = useRef<(() => void) | null>(null);
  const isMountedRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);
  const landPointsRef = useRef<LandPoint[]>([]);

  const [isLoadingScript, setIsLoadingScript] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRendered, setIsRendered] = useState<boolean>(false);

  const clickHandlerRef = useRef(onGlobeClick);
  useEffect(() => {
    clickHandlerRef.current = onGlobeClick;
  }, [onGlobeClick]);

  const defPrimaryColor = useDeferredValue(primaryColor);
  const defNeutralColor = useDeferredValue(neutralColor);
  const defAtmosphereColor = useDeferredValue(atmosphereColor || primaryColor);
  const defGlobeColor = useDeferredValue(globeColor);

  const DEG2RAD = Math.PI / 180;

  // Load globe.gl dynamically if not already available on window
  useEffect(() => {
    let isCancelled = false;

    async function ensureGlobeScript() {
      if (typeof window === "undefined") return;

      if ((window as any).Globe) {
        if (!isCancelled) setIsLoadingScript(false);
        return;
      }

      // Check if globe.gl npm module is importable directly
      try {
        const globeModule = await import("globe.gl");
        const GlobeFactory = globeModule.default || globeModule;
        (window as any).Globe = GlobeFactory;
        if (!isCancelled) setIsLoadingScript(false);
        return;
      } catch (importErr) {
        // Fallback to loading via unpkg CDN
      }

      const scriptUrl = "https://unpkg.com/globe.gl";
      const existingScript = document.querySelector<HTMLScriptElement>(
        `script[src="${scriptUrl}"]`
      );

      if (existingScript) {
        const checkInterval = setInterval(() => {
          if ((window as any).Globe) {
            clearInterval(checkInterval);
            if (!isCancelled) setIsLoadingScript(false);
          }
        }, 80);
        setTimeout(() => {
          clearInterval(checkInterval);
          if ((window as any).Globe) {
            if (!isCancelled) setIsLoadingScript(false);
          } else if (!isCancelled) {
            setErrorMessage("Globe library script timed out");
            setIsLoadingScript(false);
          }
        }, 6000);
        return;
      }

      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.onload = () => {
        const checkInterval = setInterval(() => {
          if ((window as any).Globe) {
            clearInterval(checkInterval);
            if (!isCancelled) setIsLoadingScript(false);
          }
        }, 50);
        setTimeout(() => {
          clearInterval(checkInterval);
          if ((window as any).Globe) {
            if (!isCancelled) setIsLoadingScript(false);
          } else if (!isCancelled) {
            setErrorMessage("Globe initialized failed");
            setIsLoadingScript(false);
          }
        }, 4000);
      };
      script.onerror = () => {
        if (!isCancelled) {
          setErrorMessage("Failed to load 3D Globe scripts");
          setIsLoadingScript(false);
        }
      };
      document.head.appendChild(script);
    }

    ensureGlobeScript();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Land map rasterizer to sample spherical coordinates from alpha
  const sampleLandPoints = useCallback(
    (img: HTMLImageElement): LandPoint[] => {
      const cacheKey = `${landMapUrl}_${landDotRows}`;
      const cached = pointsCache.get(cacheKey);
      if (cached) return cached;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return [];

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const points: LandPoint[] = [];
      const width = imgData.width;
      const height = imgData.height;
      const data = imgData.data;
      const rowBytes = width * 4;

      const isLand = (lng: number, lat: number) => {
        const y = Math.floor(
          rowBytes * (height - Math.floor(((lat + 90) / 180) * height - 0.5) - 1)
        );
        const x = 4 * Math.floor(((lng + 180) / 360) * width + 0.5);
        return data[Math.floor(y + x + 3)] > 85;
      };

      for (let lat = -90; lat <= 90; lat += 180 / landDotRows) {
        const radius = 25 * Math.cos(Math.abs(lat) * DEG2RAD) * Math.PI * 4;
        for (let i = 0; i < radius; i++) {
          const lng = (360 * i) / radius - 180;
          if (isLand(lng, lat)) {
            points.push({ lat, lng });
          }
        }
      }

      pointsCache.set(cacheKey, points);
      return points;
    },
    [landDotRows, landMapUrl, DEG2RAD]
  );

  // Clean up Three.js scenes and timers
  const destroyGlobe = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    isAnimatingArcsRef.current = false;

    if (globeInstanceRef.current) {
      try {
        const scene = globeInstanceRef.current.scene();
        if (scene) {
          scene.traverse((obj: any) => {
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
              if (Array.isArray(obj.material)) {
                obj.material.forEach((m: any) => m && m.dispose());
              } else {
                obj.material.dispose();
              }
            }
          });
        }
        if (globeInstanceRef.current.renderer) {
          globeInstanceRef.current.renderer().dispose();
        }
      } catch (err) {
        // Silently catch dispose errors
      }
      globeInstanceRef.current = null;
    }

    if (containerRef.current) {
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
    }
    isMountedRef.current = false;
  }, []);

  // Main init effect
  useEffect(() => {
    if (
      isLoadingScript ||
      errorMessage ||
      !containerRef.current ||
      !(window as any).Globe ||
      isMountedRef.current
    ) {
      return;
    }

    isMountedRef.current = true;
    if (cleanupCallbackRef.current) {
      cleanupCallbackRef.current();
      cleanupCallbackRef.current = null;
    }
    destroyGlobe();

    const init = () => {
      if (!containerRef.current || !(window as any).Globe) {
        isMountedRef.current = false;
        return;
      }

      const container = containerRef.current;
      const parentWidth =
        container.parentElement?.getBoundingClientRect().width || 600;
      const parentHeight =
        container.parentElement?.getBoundingClientRect().height || parentWidth;

      const calcWidth = width === "auto" ? parentWidth : width;
      const calcHeight = height === "auto" ? parentHeight : height;

      // Load land map image
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = landMapUrl;

      img.onload = () => {
        const points = sampleLandPoints(img);
        landPointsRef.current = points;

        if (!(window as any).Globe || !containerRef.current) return;

        // Generate base sphere material color canvas
        const colorCanvas = document.createElement("canvas");
        colorCanvas.width = 1;
        colorCanvas.height = 1;
        const ctx = colorCanvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = defGlobeColor;
          ctx.fillRect(0, 0, 1, 1);
        }

        // Initialize Globe
        const globe = (window as any).Globe()(container)
          .globeImageUrl(colorCanvas.toDataURL())
          .backgroundColor("rgba(0, 0, 0, 0)")
          .showAtmosphere(showAtmosphere)
          .atmosphereColor(defAtmosphereColor)
          .atmosphereAltitude(atmosphereAltitude)
          .width(calcWidth)
          .height(calcHeight)
          .pointsData(points)
          .pointColor(() => defNeutralColor)
          .pointRadius(pointSize)
          .pointResolution(pointResolution)
          .pointAltitude(0)
          .pointsMerge(true)
          // Animated Arcs
          .arcColor(() => defPrimaryColor)
          .arcStroke(0.32)
          .arcDashInitialGap(1)
          .arcDashLength(2.2)
          .arcDashGap(2.5)
          .arcDashAnimateTime(arcAnimationDuration)
          // Markers
          .labelText(() => "")
          .labelColor(() => defPrimaryColor)
          .labelDotRadius(0.38)
          .labelAltitude(0.003)
          .labelsTransitionDuration(300)
          // Arrival destination ripple rings
          .ringColor(() => (t: number) => `rgba(${parseRgb(defPrimaryColor)}, ${Math.max(0, 1 - t)})`)
          .ringMaxRadius(2.6)
          .ringPropagationSpeed(2.2)
          .ringRepeatPeriod(0);

        // Configure sphere transparency & lighting
        const globeMat = globe.globeMaterial();
        if (globeMat) {
          globeMat.transparent = true;
          globeMat.opacity = globeOpacity;
          globeMat.shininess = 0.8;
        }

        // Clamp pixel ratio to prevent multi-megapixel Retina overdraw on 4K screens
        const renderer = globe.renderer?.();
        if (renderer) {
          const clampedPixelRatio = Math.min(
            typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
            1.75
          );
          renderer.setPixelRatio(clampedPixelRatio);
        }

        globe.pointOfView({ altitude: cameraAltitude });

        const controls = globe.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = autoRotateSpeed;
          controls.enabled = interactive;
          controls.enableZoom = enableZoom;
        }

        globe.onGlobeClick((coords: any, evt: MouseEvent) => {
          clickHandlerRef.current?.(coords, evt);
        });

        globeInstanceRef.current = globe;

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsRendered(true);
          });
        });

        // Arc animator
        const animateArcs = () => {
          if (
            !globeInstanceRef.current ||
            landPointsRef.current.length === 0 ||
            isAnimatingArcsRef.current ||
            !isVisibleRef.current
          ) {
            return;
          }

          isAnimatingArcsRef.current = true;
          animFrameRef.current = requestAnimationFrame(() => {
            if (
              !globeInstanceRef.current ||
              landPointsRef.current.length === 0 ||
              !isVisibleRef.current
            ) {
              isAnimatingArcsRef.current = false;
              return;
            }

            const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
            const effectiveArcCount = isMobile ? Math.min(arcCount, 6) : arcCount;

            const pool = landPointsRef.current;
            const poolLen = pool.length;
            const needed = 2 * effectiveArcCount;

            const selected: LandPoint[] = [];
            const usedIndices = new Set<number>();
            while (selected.length < needed && usedIndices.size < poolLen) {
              const idx = Math.floor(Math.random() * poolLen);
              if (!usedIndices.has(idx)) {
                usedIndices.add(idx);
                selected.push(pool[idx]);
              }
            }

            if (selected.length < needed) {
              isAnimatingArcsRef.current = false;
              return;
            }

            const arcs = Array.from({ length: effectiveArcCount }, (_, i) => ({
              startLat: selected[i].lat,
              startLng: selected[i].lng,
              endLat: selected[i + effectiveArcCount].lat,
              endLng: selected[i + effectiveArcCount].lng,
            }));

            const markers = Array.from({ length: effectiveArcCount }, (_, i) => ({
              lat: selected[i + effectiveArcCount].lat,
              lng: selected[i + effectiveArcCount].lng,
            }));

            const rings = Array.from({ length: effectiveArcCount }, (_, i) => ({
              lat: selected[i + effectiveArcCount].lat,
              lng: selected[i + effectiveArcCount].lng,
            }));

            globeInstanceRef.current.arcsData(arcs).labelsData(markers);

            const ringTimer = setTimeout(() => {
              if (globeInstanceRef.current && isVisibleRef.current) {
                globeInstanceRef.current.ringsData(rings);
              }
              isAnimatingArcsRef.current = false;
            }, arcAnimationDuration * 0.95);

            timeoutsRef.current.push(ringTimer);
          });
        };

        const initialTimer = setTimeout(animateArcs, 600);
        timeoutsRef.current.push(initialTimer);
        intervalRef.current = setInterval(animateArcs, arcInterval);

        // Handle window & parent resizing
        let resizeDebounce: ReturnType<typeof setTimeout>;
        const handleResize = () => {
          clearTimeout(resizeDebounce);
          resizeDebounce = setTimeout(() => {
            if (!globeInstanceRef.current || !container.parentElement) return;
            const newW =
              width === "auto"
                ? container.parentElement.getBoundingClientRect().width
                : width;
            const newH =
              height === "auto"
                ? container.parentElement.getBoundingClientRect().height ||
                  newW
                : height;
            globeInstanceRef.current.width(newW);
            globeInstanceRef.current.height(newH);
          }, 120);
        };

        window.addEventListener("resize", handleResize);

        let resizeObserver: ResizeObserver | null = null;
        if ("ResizeObserver" in window && container.parentElement) {
          resizeObserver = new ResizeObserver(handleResize);
          resizeObserver.observe(container.parentElement);
        }

        // Viewport intersection observer to completely halt WebGL rendering when hidden
        let intersectionObserver: IntersectionObserver | null = null;
        if ("IntersectionObserver" in window) {
          intersectionObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                const isIntersecting = entry.isIntersecting;
                isVisibleRef.current = isIntersecting;
                if (globeInstanceRef.current) {
                  const ctrl = globeInstanceRef.current.controls();
                  if (ctrl) {
                    ctrl.autoRotate = isIntersecting;
                  }
                  if (isIntersecting) {
                    globeInstanceRef.current.resumeAnimation?.();
                  } else {
                    globeInstanceRef.current.pauseAnimation?.();
                  }
                }
              });
            },
            { threshold: 0.05 }
          );
          intersectionObserver.observe(container);
        }

        cleanupCallbackRef.current = () => {
          window.removeEventListener("resize", handleResize);
          clearTimeout(resizeDebounce);
          if (resizeObserver) resizeObserver.disconnect();
          if (intersectionObserver) intersectionObserver.disconnect();
          destroyGlobe();
        };

        onReady?.();
      };

      img.onerror = () => {
        // Fallback to online CDN map if local image fails
        if (landMapUrl !== "https://assets.ot.digital/img/map.png") {
          img.src = "https://assets.ot.digital/img/map.png";
        } else {
          setErrorMessage("Failed to load globe land map texture");
          isMountedRef.current = false;
        }
      };
    };

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(init, { timeout: 400 });
    } else {
      setTimeout(init, 0);
    }

    return () => {
      if (cleanupCallbackRef.current) {
        cleanupCallbackRef.current();
        cleanupCallbackRef.current = null;
      }
    };
  }, [
    isLoadingScript,
    errorMessage,
    width,
    height,
    defPrimaryColor,
    defNeutralColor,
    defAtmosphereColor,
    defGlobeColor,
    showAtmosphere,
    autoRotateSpeed,
    enableZoom,
    interactive,
    arcCount,
    arcInterval,
    arcAnimationDuration,
    landMapUrl,
    sampleLandPoints,
    onReady,
    destroyGlobe,
    pointSize,
    pointResolution,
    atmosphereAltitude,
    globeOpacity,
  ]);

  // Dynamically update camera altitude when prop changes (e.g. mobile vs desktop)
  useEffect(() => {
    if (globeInstanceRef.current && cameraAltitude !== undefined) {
      globeInstanceRef.current.pointOfView({ altitude: cameraAltitude });
    }
  }, [cameraAltitude]);

  if (errorMessage) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl border border-border/40 bg-muted/20 p-8 text-xs text-muted-foreground",
          className
        )}
      >
        <p>Interactive 3D Globe unavailable: {errorMessage}</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden w-full h-full flex items-center justify-center select-none",
        interactive ? "cursor-grab active:cursor-grabbing" : "cursor-default",
        className
      )}
      style={{
        width: width === "auto" ? "100%" : width,
        height: height === "auto" ? "100%" : height,
        opacity: isRendered ? 1 : 0,
        transform: isRendered ? "scale(1)" : "scale(0.92)",
        transition:
          "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    />
  );
};

export default Globe;
