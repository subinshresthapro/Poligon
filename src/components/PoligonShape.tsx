"use client";

import { CATEGORIES } from "@/data/questions";

/** One hue per political dimension — the visual identity palette */
export const DIMENSION_COLORS: Record<string, string> = {
  immigration:    "#f59e0b", // amber
  government:     "#8b5cf6", // violet
  economy:        "#10b981", // emerald
  healthcare:     "#ef4444", // red
  education:      "#3b82f6", // blue
  environment:    "#22c55e", // green
  civilLiberties: "#f97316", // orange
  foreignPolicy:  "#06b6d4", // cyan
  technology:     "#a855f7", // purple
  social:         "#ec4899", // pink
};

interface Props {
  scores: Record<string, number>;
  /** Overall SVG size in px (square). Default 280. */
  size?: number;
  /** Show dimension labels around the edge. Default false. */
  showLabels?: boolean;
  /** Extra CSS class names for the <svg> element. */
  className?: string;
}

/**
 * PoligonShape — the brand's core visual.
 *
 * A pure-SVG 10-spoke radar polygon where each slice carries its own
 * dimension colour. Works at any size: pass size=120 for card thumbnails
 * or size=360 for the full results page.
 */
export default function PoligonShape({
  scores,
  size = 280,
  showLabels = false,
  className = "",
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  // Leave a margin so labels (if shown) don't clip
  const maxR = (size / 2) * (showLabels ? 0.72 : 0.82);
  const n = CATEGORIES.length; // 10

  // ── Compute the polygon vertex for each dimension ──────────────────────
  const points = CATEGORIES.map((cat, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    const score = Math.max(-1, Math.min(1, scores[cat.id] ?? 0));
    // Map score: -1 → r=0, 0 → r=maxR/2, +1 → r=maxR
    const r = ((score + 1) / 2) * maxR;
    // Spoke endpoint (full length)
    const ex = cx + maxR * Math.cos(angle);
    const ey = cy + maxR * Math.sin(angle);
    // Label anchor point (beyond spoke)
    const labelDist = maxR + (showLabels ? 18 : 0);
    const lx = cx + labelDist * Math.cos(angle);
    const ly = cy + labelDist * Math.sin(angle);
    return {
      // polygon vertex
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      // spoke tip
      ex,
      ey,
      // label position
      lx,
      ly,
      color: DIMENSION_COLORS[cat.id] ?? "#6366f1",
      cat,
      angle,
      score,
    };
  });

  // ── Grid rings ─────────────────────────────────────────────────────────
  const rings = [0.25, 0.5, 0.75, 1.0];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`overflow-visible ${className}`}
      aria-label="Political shape polygon"
    >
      {/* Grid rings */}
      {rings.map((frac) => {
        const r = frac * maxR;
        const isZeroRing = frac === 0.5; // score=0 sits at 50%
        return (
          <circle
            key={frac}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={isZeroRing ? "#94a3b8" : "#e2e8f0"}
            strokeWidth={isZeroRing ? 1.25 : 0.75}
            strokeDasharray={isZeroRing ? "3 3" : undefined}
          />
        );
      })}

      {/* Spoke lines */}
      {points.map((pt, i) => (
        <line
          key={`spoke-${i}`}
          x1={cx}
          y1={cy}
          x2={pt.ex}
          y2={pt.ey}
          stroke="#e2e8f0"
          strokeWidth={0.75}
        />
      ))}

      {/* Colored slices — triangle from center to each adjacent vertex pair */}
      {points.map((pt, i) => {
        const next = points[(i + 1) % n];
        return (
          <path
            key={`slice-${i}`}
            d={`M ${cx},${cy} L ${pt.x},${pt.y} L ${next.x},${next.y} Z`}
            fill={pt.color}
            fillOpacity={0.8}
            stroke="white"
            strokeWidth={0.5}
            strokeLinejoin="round"
          />
        );
      })}

      {/* Outer polygon border */}
      <polygon
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="white"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* Vertex dots */}
      {points.map((pt, i) => (
        <circle
          key={`dot-${i}`}
          cx={pt.x}
          cy={pt.y}
          r={size > 160 ? 3 : 2}
          fill={pt.color}
          stroke="white"
          strokeWidth={1}
        />
      ))}

      {/* Optional edge labels */}
      {showLabels &&
        points.map((pt) => {
          const cosA = Math.cos(pt.angle);
          const sinA = Math.sin(pt.angle);
          const anchor =
            cosA > 0.15 ? "start" : cosA < -0.15 ? "end" : "middle";
          const dy = sinA > 0.15 ? 12 : sinA < -0.15 ? -4 : 4;
          return (
            <text
              key={`label-${pt.cat.id}`}
              x={pt.lx}
              y={pt.ly + dy}
              textAnchor={anchor}
              fontSize={9}
              fill="#475569"
              fontFamily="system-ui, sans-serif"
              fontWeight={500}
            >
              {pt.cat.emoji} {pt.cat.shortName}
            </text>
          );
        })}
    </svg>
  );
}
