import { RefObject, useEffect, useRef } from "react";

export const useMousePositionRef = (
  containerRef?: RefObject<HTMLElement | SVGElement>
) => {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let rect: DOMRect | null = null;

    const updateRect = () => {
      if (containerRef && containerRef.current) {
        rect = containerRef.current.getBoundingClientRect();
      }
    };

    updateRect();
    window.addEventListener("resize", updateRect, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });

    const handleMouseMove = (ev: MouseEvent) => {
      if (rect) {
        positionRef.current = {
          x: ev.clientX - rect.left,
          y: ev.clientY - rect.top,
        };
      } else {
        positionRef.current = { x: ev.clientX, y: ev.clientY };
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [containerRef]);

  return positionRef;
};

