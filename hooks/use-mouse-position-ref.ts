import { RefObject, useEffect, useRef } from "react";

export const useMousePositionRef = (
  containerRef?: RefObject<HTMLElement | SVGElement>
) => {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let rectCache: DOMRect | null = null;
    let isRectDirty = true;

    const updateRect = () => {
      if (containerRef && containerRef.current) {
        rectCache = containerRef.current.getBoundingClientRect();
      }
      isRectDirty = false;
    };

    const handleScrollOrResize = () => {
      isRectDirty = true;
    };

    let rafId: number | null = null;
    const handleMouseMove = (ev: MouseEvent) => {
      if (rafId) return;
      const clientX = ev.clientX;
      const clientY = ev.clientY;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (containerRef && containerRef.current) {
          if (isRectDirty || !rectCache) {
            updateRect();
          }
          if (rectCache) {
            const relativeX = clientX - rectCache.left;
            const relativeY = clientY - rectCache.top;
            positionRef.current = { x: relativeX, y: relativeY };
          }
        } else {
          positionRef.current = { x: clientX, y: clientY };
        }
      });
    };

    // Listen for mouse events with passive listeners
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [containerRef]);

  return positionRef;
};
