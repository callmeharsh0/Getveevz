import { useEffect, useRef, useState } from "react";
import { COLORS, FONTS } from "../../../utils/theme";

export function formatCompactNumber(target) {
  if (target >= 1000000) return `${(target / 1000000).toFixed(target % 1000000 === 0 ? 0 : 1)}M`;
  if (target >= 1000) return `${(target / 1000).toFixed(0)}K`;
  return `${target}`;
}

export default function StatsCounter({ target = 0, suffix = "+", trigger = false, duration = 1200, style = {} }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!trigger || startedRef.current) return;
    startedRef.current = true;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, target, duration]);

  const formatted =
    target >= 1000000
      ? `${(value / 1000000).toFixed(value < target ? 1 : 0)}M`
      : target >= 1000
      ? `${(value / 1000).toFixed(0)}K`
      : `${value}`;

  return (
    <span style={{ fontFamily: FONTS.display, color: COLORS.text, fontVariantNumeric: "tabular-nums", ...style }}>
      {formatted}
      {suffix}
    </span>
  );
}