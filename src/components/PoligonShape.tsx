"use client";

import { CATEGORIES } from "@/data/questions";
import { getDirectionalShade } from "@/lib/colorUtils";

/**
 * One brand colour per political dimension.
 * These are the "base" colours that getDirectionalShade() shifts lighter
 * (progressive) or darker (conservative) based on the signed axis score.
 */
export const DIMENSION_COLORS: Record<string, string> = {
  immigration:    "#E8782E",
  government:     "#8FA82E",
  economy:        "#D4A53C",
  healthcare:     "#B8385E",
  education:      "#8B4FCB",
  environment:    "#3AA361",
  civilLiberties: "#4257C9",
  foreignPolicy:  "#2EA39C",
  technology:     "#3A8DD8",
  social:         "#D63D8F",
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
 * PoligonShape — the brand's core visual identity badge.
 *
 * A 10-spoke polygon where:
 *  • Spoke LENGTH  = conviction strength (|score|).  Both a committed
 *    progressive and a committed conservative produce a full polygon.
 *  • Wedge SHADE   = direction.  Light, vibrant pastel = progressive (+1).
 *    Deep, rich dark = conservative (−1).  The two profiles look completely
 *    different even at identical size.
 */
export default function PoligonShape({
  scores,
  size = 280,
  showLabels = false,
  className = "",
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = (size / 2) * (showLabels ? 0.72 : 0.82);
  const n = CATEGORIES.length; // 10

  const points = CATEGORIES.map((cat, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    const signed = Math.max(-1, Math.min(1, scores[cat.id] ?? 0));
    const r = Math.abs(signed) * maxR;
    const baseColor = DIMENSION_COLORS[cat.id] ?? "#5560C8";

    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      // spoke tip (full length — for the grid lines)
      ex: cx + maxR * Math.cos(angle),
      ey: cy + maxR * Math.sin(angle),
      // label anchor
      lx: cx + (maxR + (showLabels ? 18 : 0)) * Math.cos(angle),
      ly: cy + (maxR + (showLabels ? 18 : 0)) * Math.sin(angle),
      // shade-encoded fill colour for this wedge
      fillColor: getDirectionalShade(baseColor, signed),
      baseColor,
      cat,
      angle,
      score: signed,
    };
  });

  // Grid rings — uniform weight (no special neutral ring now that
  // the polygon uses absolute values; neutrality = r ≈ 0 at centre)
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
      {rings.map((frac) => (
        <circle
          key={frac}
          cx={cx}
          cy={cy}
          r={frac * maxR}
          fill="none"
          stroke="rgba(10,10,10,0.09)"
          strokeWidth={frac === 1.0 ? 1.1 : 0.7}
          strokeDasharray={frac === 1.0 ? undefined : "2 4"}
        />
      ))}

      {/* Spoke lines */}
      {points.map((pt, i) => (
        <line
          key={`spoke-${i}`}
          x1={cx} y1={cy}
          x2={pt.ex} y2={pt.ey}
          stroke="rgba(10,10,10,0.09)"
          strokeWidth={0.7}
        />
      ))}

      {/* Shade-encoded wedges — triangle from center to adjacent vertex pair */}
      {points.map((pt, i) => {
        const next = points[(i + 1) % n];
        return (
          <path
            key={`slice-${i}`}
            d={`M ${cx},${cy} L ${pt.x.toFixed(2)},${pt.y.toFixed(2)} L ${next.x.toFixed(2)},${next.y.toFixed(2)} Z`}
            fill={pt.fillColor}
            fillOpacity={0.88}
            stroke="rgba(10,10,10,0.08)"
            strokeWidth={0.5}
            strokeLinejoin="round"
          />
        );
      })}

      {/* Vertex dots */}
      {points.map((pt, i) => (
        <circle
          key={`dot-${i}`}
          cx={pt.x}
          cy={pt.y}
          r={size > 160 ? 4.5 : 2.5}
          fill={pt.fillColor}
          stroke="rgba(10,10,10,0.22)"
          strokeWidth={1.4}
        />
      ))}

      {/* Optional edge labels */}
      {showLabels &&
        points.map((pt) => {
          const cosA = Math.cos(pt.angle);
          const sinA = Math.sin(pt.angle);
          const anchor = cosA > 0.15 ? "start" : cosA < -0.15 ? "end" : "middle";
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
