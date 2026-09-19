"use client";

/**
 * DistributionFlow
 * ----------------------------------------------------------------------------
 * A pinned, scroll-scrubbed canvas section: one long-form video (16:9) on the
 * left, four short-form reels (9:16) fanned out on the right, connected by
 * hand-drawn bezier curves with data packets travelling along them.
 *
 * Design notes
 *  - Everything is drawn on a single 2D canvas. No SVG, no DOM graphics.
 *  - All animated values live in one mutable state object. GSAP tweens that
 *    object; a single render(state) call paints the frame. There is no
 *    per-frame rAF driving scroll motion — only a dirty-flag ticker.
 *  - Geometry is rebuilt on resize only, never per frame. Jitter is seeded so
 *    the "marker on paper" wobble is stable instead of shimmering.
 *  - Reels render as empty outlines until a `src` is supplied. Adding images
 *    later requires no change to layout or animation code.
 *
 * Install: npm i gsap
 */

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ───────────────────────────── types ───────────────────────────── */

export interface ReelSource {
  /** Stable key. Used for image caching — keep it stable across renders. */
  id: string;
  /** Image URL. Leave null/undefined to render an empty outline. */
  src?: string | null;
}

export interface DistributionFlowProps {
  /** Up to 4 reels. Falls back to four empty placeholders. */
  reels?: ReelSource[];
  /** Stroke colour for all linework. */
  ink?: string;
  /** Canvas background. Pass null for a transparent canvas. */
  background?: string | null;
  /** Colour of the travelling packets. Defaults to `ink`. */
  accent?: string;
  /** ScrollTrigger end value — how much scroll the section consumes. */
  scrollLength?: string;
  /** Packet loops per second along a curve. */
  packetSpeed?: number;
  /** Change to reshuffle the hand-drawn wobble. */
  seed?: number;
  className?: string;
  id?: string;
}

interface Point {
  x: number;
  y: number;
}

/** A polyline with a cumulative length table, so it can be partially stroked. */
interface Path {
  points: Point[];
  lengths: number[];
  total: number;
}

interface ReelGeometry {
  id: string;
  cx: number;
  cy: number;
  w: number;
  h: number;
  /** radians */
  rotation: number;
  /** local, centred on (0,0), with hand-drawn overshoot */
  outline: Path;
  /** local, clean rounded rect used to clip artwork */
  clip: Point[];
  /** world-space point where the connector lands */
  anchor: Point;
}

interface SourceGeometry {
  cx: number;
  cy: number;
  w: number;
  h: number;
  outline: Path;
  play: Point[];
}

interface Geometry {
  vw: number;
  vh: number;
  scale: number;
  offsetX: number;
  offsetY: number;
  compact: boolean;
  source: SourceGeometry;
  origin: Point;
  curves: Path[];
  reels: ReelGeometry[];
}

interface AnimState {
  sourceDraw: number;
  playOpacity: number;
  playScale: number;
  curves: { progress: number }[];
  reels: { scale: number; opacity: number }[];
  packetOpacity: number;
  packetTime: number;
  /** dead-weight property used to pad the timeline to a full 100 units */
  tail: number;
}

/* ─────────────────────────── constants ─────────────────────────── */

const MAX_REELS = 4;
const COMPACT_BREAKPOINT = 768;
const TRAIL_SEGMENTS = 7;
const TRAIL_SPACING = 0.013;
const PACKETS_PER_CURVE = 2;

const DEFAULT_REELS: ReelSource[] = [
  { id: "reel-1" },
  { id: "reel-2" },
  { id: "reel-3" },
  { id: "reel-4" },
];

/* ───────────────────────── geometry helpers ────────────────────── */

/** mulberry32 — small, fast, deterministic. */
function createRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildPath(points: Point[]): Path {
  const lengths: number[] = [0];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += Math.hypot(
      points[i].x - points[i - 1].x,
      points[i].y - points[i - 1].y,
    );
    lengths.push(total);
  }
  return { points, lengths, total };
}

/** Strokes the path from its start up to `progress` (0–1) of its arc length. */
function strokePath(
  ctx: CanvasRenderingContext2D,
  path: Path,
  progress: number,
): void {
  if (progress <= 0 || path.total === 0) return;
  const target = path.total * Math.min(progress, 1);
  const pts = path.points;

  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    if (path.lengths[i] <= target) {
      ctx.lineTo(pts[i].x, pts[i].y);
      continue;
    }
    const seg = path.lengths[i] - path.lengths[i - 1];
    const f = seg === 0 ? 0 : (target - path.lengths[i - 1]) / seg;
    ctx.lineTo(
      pts[i - 1].x + (pts[i].x - pts[i - 1].x) * f,
      pts[i - 1].y + (pts[i].y - pts[i - 1].y) * f,
    );
    break;
  }
  ctx.stroke();
}

/** Position at a normalised distance along the path. */
function pointAt(path: Path, t: number): Point {
  const pts = path.points;
  if (pts.length === 1) return pts[0];
  const d = Math.min(Math.max(t, 0), 1) * path.total;

  let lo = 0;
  let hi = path.lengths.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (path.lengths[mid] < d) lo = mid + 1;
    else hi = mid;
  }
  const i = Math.max(1, lo);
  const seg = path.lengths[i] - path.lengths[i - 1];
  const f = seg === 0 ? 0 : (d - path.lengths[i - 1]) / seg;
  return {
    x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * f,
    y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * f,
  };
}

/** Rounded rect as a dense polyline, centred on the origin. */
function roundedRectPoints(
  w: number,
  h: number,
  radius: number,
  segmentLength = 22,
): Point[] {
  const hw = w / 2;
  const hh = h / 2;
  const r = Math.min(radius, hw, hh);
  const pts: Point[] = [];

  const line = (x0: number, y0: number, x1: number, y1: number) => {
    const len = Math.hypot(x1 - x0, y1 - y0);
    const steps = Math.max(2, Math.ceil(len / segmentLength));
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      pts.push({ x: x0 + (x1 - x0) * t, y: y0 + (y1 - y0) * t });
    }
  };
  const arc = (cx: number, cy: number, a0: number, a1: number) => {
    const steps = 7;
    for (let i = 0; i < steps; i++) {
      const a = a0 + (a1 - a0) * (i / steps);
      pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
    }
  };

  line(-hw + r, -hh, hw - r, -hh);
  arc(hw - r, -hh + r, -Math.PI / 2, 0);
  line(hw, -hh + r, hw, hh - r);
  arc(hw - r, hh - r, 0, Math.PI / 2);
  line(hw - r, hh, -hw + r, hh);
  arc(-hw + r, hh - r, Math.PI / 2, Math.PI);
  line(-hw, hh - r, -hw, -hh + r);
  arc(-hw + r, -hh + r, Math.PI, Math.PI * 1.5);
  pts.push({ x: -hw + r, y: -hh });

  return pts;
}

/**
 * Adds seeded wobble and a small overshoot past the starting corner, so corners
 * read as overlapping marker strokes rather than a closed vector path.
 */
function handDrawn(
  points: Point[],
  amplitude: number,
  rng: () => number,
  overshoot = 0.035,
): Path {
  const extra = Math.max(1, Math.round(points.length * overshoot));
  const raw = points.concat(points.slice(1, 1 + extra));
  return buildPath(
    raw.map((p) => ({
      x: p.x + (rng() - 0.5) * 2 * amplitude,
      y: p.y + (rng() - 0.5) * 2 * amplitude,
    })),
  );
}

/** Cubic bezier sampled to a polyline; wobble tapers to zero at both ends. */
function bezierPath(
  p0: Point,
  c1: Point,
  c2: Point,
  p3: Point,
  amplitude: number,
  rng: () => number,
  samples = 140,
): Path {
  const pts: Point[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const u = 1 - t;
    const a = u * u * u;
    const b = 3 * u * u * t;
    const c = 3 * u * t * t;
    const d = t * t * t;
    const taper = Math.sin(Math.PI * t) * amplitude;
    pts.push({
      x: a * p0.x + b * c1.x + c * c2.x + d * p3.x + (rng() - 0.5) * 2 * taper,
      y: a * p0.y + b * c1.y + c * c2.y + d * p3.y + (rng() - 0.5) * 2 * taper,
    });
  }
  return buildPath(pts);
}

function playTriangle(size: number, rng: () => number): Point[] {
  const base: Point[] = [
    { x: -size * 0.52, y: -size },
    { x: size * 0.88, y: 0 },
    { x: -size * 0.52, y: size },
  ];
  return base.map((p) => ({
    x: p.x + (rng() - 0.5) * 2.4,
    y: p.y + (rng() - 0.5) * 2.4,
  }));
}

/* ───────────────────────── layout definition ───────────────────── */

interface Placement {
  x: number;
  y: number;
  /** degrees */
  rot: number;
}

const WIDE_PLACEMENTS: Placement[] = [
  { x: 1118, y: 236, rot: -4.2 },
  { x: 1306, y: 392, rot: 3.2 },
  { x: 1298, y: 640, rot: -2.6 },
  { x: 1104, y: 806, rot: 4.4 },
];

const COMPACT_PLACEMENTS: Placement[] = [
  { x: 170, y: 842, rot: -4.5 },
  { x: 455, y: 1000, rot: 3.0 },
  { x: 742, y: 832, rot: -2.2 },
];

function buildGeometry(
  cssW: number,
  cssH: number,
  reels: ReelSource[],
  seed: number,
): Geometry {
  const compact = cssW < COMPACT_BREAKPOINT;
  const rng = createRng(seed + (compact ? 977 : 0));

  const vw = compact ? 900 : 1600;
  const vh = compact ? 1220 : 1000;

  // Source video: 16:9, stroke only.
  const srcW = compact ? 660 : 640;
  const srcH = (srcW * 9) / 16;
  const srcCx = compact ? 450 : 500;
  const srcCy = compact ? 300 : 500;

  const source: SourceGeometry = {
    cx: srcCx,
    cy: srcCy,
    w: srcW,
    h: srcH,
    outline: handDrawn(roundedRectPoints(srcW, srcH, 10), 1.5, rng),
    play: playTriangle(Math.min(srcW, srcH) * 0.165, rng),
  };

  // Flow leaves the source edge-on, so every curve shares one tangent at the
  // root and only splays further out. Right on desktop, downward on mobile.
  const flow: Point = compact ? { x: 0, y: 1 } : { x: 1, y: 0 };
  const origin: Point = compact
    ? { x: srcCx, y: srcCy + srcH / 2 }
    : { x: srcCx + srcW / 2, y: srcCy };

  const placements = compact ? COMPACT_PLACEMENTS : WIDE_PLACEMENTS;
  const reelW = compact ? 180 : 164;
  const reelH = (reelW * 16) / 9;

  const reelGeos: ReelGeometry[] = placements.map((placement, i) => {
    const rotation = (placement.rot * Math.PI) / 180;
    // Anchor sits on the edge facing the source, rotated with the reel.
    const localAnchor: Point = compact
      ? { x: 0, y: -reelH / 2 }
      : { x: -reelW / 2, y: 0 };
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);

    return {
      id: reels[i]?.id ?? `reel-${i + 1}`,
      cx: placement.x,
      cy: placement.y,
      w: reelW,
      h: reelH,
      rotation,
      outline: handDrawn(roundedRectPoints(reelW, reelH, 9, 18), 1.3, rng),
      clip: roundedRectPoints(reelW, reelH, 9, 18),
      anchor: {
        x: placement.x + localAnchor.x * cos - localAnchor.y * sin,
        y: placement.y + localAnchor.x * sin + localAnchor.y * cos,
      },
    };
  });

  const curves = reelGeos.map((reel) => {
    const dist = Math.hypot(reel.anchor.x - origin.x, reel.anchor.y - origin.y);
    const k = dist * 0.42;
    return bezierPath(
      origin,
      { x: origin.x + flow.x * k, y: origin.y + flow.y * k },
      { x: reel.anchor.x - flow.x * k, y: reel.anchor.y - flow.y * k },
      reel.anchor,
      1.1,
      rng,
    );
  });

  const scale = Math.min(cssW / vw, cssH / vh);

  return {
    vw,
    vh,
    scale,
    offsetX: (cssW - vw * scale) / 2,
    offsetY: (cssH - vh * scale) / 2,
    compact,
    source,
    origin,
    curves,
    reels: reelGeos,
  };
}

/* ───────────────────────── state helpers ───────────────────────── */

function createState(): AnimState {
  return {
    sourceDraw: 0,
    playOpacity: 0,
    playScale: 0.6,
    curves: Array.from({ length: MAX_REELS }, () => ({ progress: 0 })),
    reels: Array.from({ length: MAX_REELS }, () => ({
      scale: 0.82,
      opacity: 0,
    })),
    packetOpacity: 0,
    packetTime: 0,
    tail: 0,
  };
}

function resetState(s: AnimState): void {
  s.sourceDraw = 0;
  s.playOpacity = 0;
  s.playScale = 0.6;
  s.curves.forEach((c) => (c.progress = 0));
  s.reels.forEach((r) => {
    r.scale = 0.82;
    r.opacity = 0;
  });
  s.packetOpacity = 0;
  s.tail = 0;
}

function settleState(s: AnimState): void {
  s.sourceDraw = 1;
  s.playOpacity = 1;
  s.playScale = 1;
  s.curves.forEach((c) => (c.progress = 1));
  s.reels.forEach((r) => {
    r.scale = 1;
    r.opacity = 1;
  });
  s.packetOpacity = 0;
  s.tail = 1;
}

/* ──────────────────────────── component ────────────────────────── */

export default function DistributionFlow({
  reels,
  ink = "#1b2cc4",
  background = "#f7f5f0",
  accent,
  scrollLength = "+=250%",
  packetSpeed = 0.34,
  seed = 20260919,
  className,
  id,
}: DistributionFlowProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const geoRef = useRef<Geometry | null>(null);
  const stateRef = useRef<AnimState>(createState());
  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const dirtyRef = useRef(true);
  const dprRef = useRef(1);
  const sizeRef = useRef({ width: 1, height: 1 });

  const reelConfig = useMemo(
    () => (reels?.length ? reels : DEFAULT_REELS).slice(0, MAX_REELS),
    [reels],
  );
  const reelKey = useMemo(() => JSON.stringify(reelConfig), [reelConfig]);
  const packetColor = accent ?? ink;

  /* ── paint ── */

  const render = useRef<() => void>(() => {});
  render.current = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const geo = geoRef.current;
    const s = stateRef.current;
    if (!canvas || !ctx || !geo) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (background) {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const dpr = dprRef.current;
    const k = dpr * geo.scale;
    ctx.setTransform(k, 0, 0, k, dpr * geo.offsetX, dpr * geo.offsetY);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = ink;

    /* source video */
    ctx.save();
    ctx.translate(geo.source.cx, geo.source.cy);
    ctx.lineWidth = 3.4;
    strokePath(ctx, geo.source.outline, s.sourceDraw);

    if (s.playOpacity > 0) {
      ctx.globalAlpha = s.playOpacity;
      ctx.scale(s.playScale, s.playScale);
      ctx.fillStyle = ink;
      ctx.beginPath();
      geo.source.play.forEach((p, i) =>
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y),
      );
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.restore();

    /* connectors */
    ctx.lineWidth = 2.4;
    for (let i = 0; i < geo.curves.length; i++) {
      strokePath(ctx, geo.curves[i], s.curves[i].progress);
    }

    /* reels */
    for (let i = 0; i < geo.reels.length; i++) {
      const reel = geo.reels[i];
      const rs = s.reels[i];
      if (rs.opacity <= 0.001) continue;

      ctx.save();
      ctx.globalAlpha = rs.opacity;
      ctx.translate(reel.cx, reel.cy);
      ctx.rotate(reel.rotation);
      ctx.scale(rs.scale, rs.scale);

      const img = imagesRef.current.get(reel.id);
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath();
        reel.clip.forEach((p, j) =>
          j === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y),
        );
        ctx.closePath();
        ctx.clip();
        const cover = Math.max(
          reel.w / img.naturalWidth,
          reel.h / img.naturalHeight,
        );
        const dw = img.naturalWidth * cover;
        const dh = img.naturalHeight * cover;
        ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
        ctx.restore();
      }

      ctx.lineWidth = 3;
      strokePath(ctx, reel.outline, 1);
      ctx.restore();
    }

    /* packets */
    if (s.packetOpacity > 0.001) {
      ctx.fillStyle = packetColor;
      ctx.shadowColor = packetColor;
      for (let i = 0; i < geo.curves.length; i++) {
        if (s.curves[i].progress < 0.999) continue;
        const curve = geo.curves[i];
        const offset = i * 0.23;

        for (let n = 0; n < PACKETS_PER_CURVE; n++) {
          const head =
            (s.packetTime * packetSpeed + offset + n / PACKETS_PER_CURVE) % 1;
          for (let t = TRAIL_SEGMENTS - 1; t >= 0; t--) {
            const at = head - t * TRAIL_SPACING;
            if (at < 0) continue;
            const fade = 1 - t / TRAIL_SEGMENTS;
            const p = pointAt(curve, at);
            ctx.globalAlpha = s.packetOpacity * fade * fade;
            ctx.shadowBlur = t === 0 ? 10 : 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.5 + 3.1 * fade, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }
  };

  /* ── measure, animate, clean up ── */

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    ctxRef.current = ctx;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const cssW = Math.max(1, Math.round(rect.width));
      const cssH = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (
        sizeRef.current.width === cssW &&
        sizeRef.current.height === cssH &&
        dprRef.current === dpr &&
        geoRef.current
      ) {
        return;
      }

      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;

      sizeRef.current = { width: cssW, height: cssH };
      dprRef.current = dpr;
      geoRef.current = buildGeometry(cssW, cssH, reelConfig, seed);
      dirtyRef.current = true;
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(section);

    const ctxGsap = gsap.context(() => {
      const s = stateRef.current;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        settleState(s);
        dirtyRef.current = true;
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        resetState(s);
        const markDirty = () => {
          dirtyRef.current = true;
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: scrollLength,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 1,
            invalidateOnRefresh: true,
          },
          onUpdate: markDirty,
        });

        // 0–15  source rectangle strokes itself in
        tl.to(s, { sourceDraw: 1, duration: 15 }, 0);
        tl.to(s, { playOpacity: 1, duration: 6 }, 11);
        tl.to(s, { playScale: 1, duration: 10, ease: "back.out(2.2)" }, 11);

        // 15–55 connectors draw out from the shared root, staggered
        for (let i = 0; i < MAX_REELS; i++) {
          tl.to(s.curves[i], { progress: 1, duration: 22 }, 15 + i * 6);
        }

        // 40–78 reels pop in behind their landing curve
        for (let i = 0; i < MAX_REELS; i++) {
          const at = 40 + i * 8;
          tl.to(s.reels[i], { opacity: 1, duration: 8 }, at);
          tl.to(
            s.reels[i],
            { scale: 1, duration: 14, ease: "back.out(1.7)" },
            at,
          );
        }

        // 56–70 packets fade in and start looping
        tl.to(s, { packetOpacity: 1, duration: 14 }, 56);

        // pad to a round 100 so the last stretch of scroll holds the frame
        tl.to(s, { tail: 1, duration: 22 }, 78);

        return () => {
          resetState(s);
          dirtyRef.current = true;
        };
      });
    }, section);

    const tick = (_time: number, deltaTime: number) => {
      const s = stateRef.current;
      if (s.packetOpacity > 0.001) {
        s.packetTime += deltaTime / 1000;
        dirtyRef.current = true;
      }
      if (dirtyRef.current) {
        dirtyRef.current = false;
        render.current();
      }
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      observer.disconnect();
      ctxGsap.revert();
      ctxRef.current = null;
    };
  }, [reelConfig, seed, scrollLength]);

  /* ── artwork loading (optional, added later) ── */

  useEffect(() => {
    const cache = imagesRef.current;
    const pending: HTMLImageElement[] = [];

    reelConfig.forEach((reel) => {
      if (!reel.src) {
        cache.delete(reel.id);
        dirtyRef.current = true;
        return;
      }
      const existing = cache.get(reel.id);
      if (existing && existing.getAttribute("data-src") === reel.src) return;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.decoding = "async";
      img.setAttribute("data-src", reel.src);
      img.onload = () => {
        cache.set(reel.id, img);
        dirtyRef.current = true;
      };
      img.src = reel.src;
      pending.push(img);
    });

    return () => {
      pending.forEach((img) => {
        img.onload = null;
      });
    };
  }, [reelKey, reelConfig]);

  /* ── pin offsets settle only once fonts and images are in ── */

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(refresh).catch(() => {});
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={["df-root", className].filter(Boolean).join(" ")}
      aria-label="One long-form video distributed into short-form reels"
    >
      <style>{`
        .df-root {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          background: ${background ?? "transparent"};
        }
        .df-root canvas {
          display: block;
          width: 100%;
          height: 100%;
        }
      `}</style>
      <canvas ref={canvasRef} role="presentation" />
    </section>
  );
}
