"use client";

import { CATEGORIES } from "@/data/questions";
import { getSegmentColor, getDimensionBrandColor } from "@/lib/colorUtils";

/**
 * Mid-tone brand colour per dimension (score = 0 on the light↔dark scale).
 * Used by the results-page pill decorations, legend dots, etc. — anywhere that
 * needs a single representative colour rather than a direction-encoded shade.
 */
export const DIMENSION_COLORS: Record<string, string> = {
  immigration:    "#DE8152",  // midpoint of #C2440A ↔ #FBBF9A
  government:     "#619A5A",  // midpoint of #1A5C14 ↔ #A8D8A0
  economy:        "#C29945",  // midpoint of #8B5A00 ↔ #FAD98A
  healthcare:     "#C16184",  // midpoint of #8B1A45 ↔ #F7A8C4
  education:      "#7F67B1",  // midpoint of #3A1F7A ↔ #C4B0E8
  environment:    "#539886",  // midpoint of #085041 ↔ #9FE1CB
  civilLiberties: "#5A81AD",  // midpoint of #0C3A6B ↔ #A8C8F0
  foreignPolicy:  "#658FA9",  // midpoint of #1A4A6B ↔ #B0D4E8
  technology:     "#7171A1",  // midpoint of #2A2A6B ↔ #B8B8D8
  social:         "#C28158",  // midpoint of #8B3A10 ↔ #FAC8A0
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
 *  • Wedge SHADE   = direction.  Light pastel = progressive (+1).
 *    Deep rich dark = conservative (−1).  The two profiles look completely
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
      fillColor: getSegmentColor(cat.id, signed),
      brandColor: getDimensionBrandColor(cat.id),
      cat,
      angle,
      score: signed,
    };
  });

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
          stroke="rgba(255,255,255,0.7)"
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
