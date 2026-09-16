import React from "react";
import { cn } from "@/lib/utils";

/**
 * GlobeMorph Component
 * Interactive 3D Globe that morphs between a 3D globe and a Van der Grinten flat map.
 */

export interface GlobeMorphProps {
  /** Hex or rgba color for land/continents (e.g. "#F0ECDD", "#8BA3C5", "#FFFFFF") */
  hex?: string;
  /** Hex or rgba color for the oceans (e.g. "#000000", "#02122F") */
  ocean?: string;
  /** Hex or rgba background color (e.g. "#000000", "#090e14") */
  bg?: string;
  /** Opacity of land points (0 to 1) */
  landOpacity?: number;
  /** Opacity of the 3D globe wireframe/sphere (0 to 1) */
  globeOpacity?: number;
  /** Density of hexagon grid points (150 to 650) */
  density?: number;
  /** Additional container classes */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
}

const GLOBE_URL =
  "https://tkartik.com/globe-to-flat-map/van-der-grinten-map.html";

const DEFAULTS = {
  hex: "#F0ECDD",
  ocean: "#000000",
  bg: "#000000",
  landOpacity: 1,
  globeOpacity: 0.45,
  density: 500,
};

function toHex(color: string): string {
  if (!color) return "";
  if (color.startsWith("#")) return color.slice(1);
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return "";
  const r = parseInt(m[1], 10).toString(16).padStart(2, "0");
  const g = parseInt(m[2], 10).toString(16).padStart(2, "0");
  const b = parseInt(m[3], 10).toString(16).padStart(2, "0");
  return r + g + b;
}

function buildGlobeUrl(p: GlobeMorphProps): string {
  const hex =
    p.hex != null
      ? p.hex.startsWith("#")
        ? p.hex.slice(1)
        : toHex(p.hex)
      : DEFAULTS.hex.slice(1);
  const ocean =
    p.ocean != null
      ? p.ocean.startsWith("#")
        ? p.ocean.slice(1)
        : toHex(p.ocean)
      : DEFAULTS.ocean.slice(1);
  const bg =
    p.bg != null
      ? p.bg.startsWith("#")
        ? p.bg.slice(1)
        : toHex(p.bg)
      : DEFAULTS.bg.slice(1);

  const params = new URLSearchParams({
    hex,
    ocean,
    bg,
    landOpacity: String(p.landOpacity ?? DEFAULTS.landOpacity),
    globeOpacity: String(p.globeOpacity ?? DEFAULTS.globeOpacity),
    density: String(Math.round(Number(p.density) || DEFAULTS.density)),
  });

  return `${GLOBE_URL}?${params.toString()}`;
}

export default function GlobeMorph({
  hex = DEFAULTS.hex,
  ocean = DEFAULTS.ocean,
  bg = DEFAULTS.bg,
  landOpacity = DEFAULTS.landOpacity,
  globeOpacity = DEFAULTS.globeOpacity,
  density = DEFAULTS.density,
  className,
  style,
}: GlobeMorphProps) {
  const src = buildGlobeUrl({
    hex,
    ocean,
    bg,
    landOpacity,
    globeOpacity,
    density,
  });

  return (
    <div
      className={cn(
        "relative w-full h-full min-h-[300px] overflow-hidden rounded-2xl bg-black select-none",
        className
      )}
      style={style}
    >
      <iframe
        key={src}
        src={src}
        title="Globe Morph"
        loading="lazy"
        className="absolute inset-0 w-full h-full border-none pointer-events-auto"
        allow="accelerometer; autoplay; encrypted-media; gyroscope"
      />
    </div>
  );
}
