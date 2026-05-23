"use client";

import { useState, useCallback } from "react";
import { CATEGORIES } from "@/data/questions";
import { getSegmentColor, getDimensionBrandColor } from "@/lib/colorUtils";
import { convictionPercent, leanLabel } from "@/lib/scoring";

/**
 * Mid-tone brand colour per dimension (score = 0 on the light↔dark scale).
 * Derived dynamically from CATEGORY_LIGHT_DARK so it never goes stale
 * when palette entries are updated.
 *
 * Used by results-page pill decorations, legend dots, etc.
 */
export const DIMENSION_COLORS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, getDimensionBrandColor(c.id)])
);

interface Props {
  scores: Record<string, number>;
  /** Overall SVG size in px (square). Default 280. */
  size?: number;
  /** Show dimension labels around the edge. Default false. */
  showLabels?: boolean;
  /** Extra CSS class names for the <svg> element. */
  className?: string;
  /**
   * 'abstract' (default) — clean filled shape, no grid rings, no spoke lines,
   *   no borders between segments. Single thin outer edge only. Feels like a
   *   personal emblem or fingerprint.
   *
   * 'chart' — original style with grid rings, spoke lines, segment borders,
   *   and vertex dots. Useful for detailed analysis views.
   */
  variant?: "abstract" | "chart";
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
  variant = "abstract",
}: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleWedgeMouseEnter = useCallback(
    (i: number, e: React.MouseEvent<SVGPathElement>) => {
      const rect = (e.currentTarget.closest("svg") as SVGSVGElement).getBoundingClientRect();
      setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setHoveredIndex(i);
    },
    []
  );

  const handleWedgeMouseMove = useCallback((e: React.MouseEvent<SVGPathElement>) => {
    const rect = (e.currentTarget.closest("svg") as SVGSVGElement).getBoundingClientRect();
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleWedgeMouseLeave = useCallback(() => setHoveredIndex(null), []);

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
      {/* Background disc + outer ring — abstract variant only */}
      {variant === "abstract" && (
        <>
          <circle cx={cx} cy={cy} r={maxR} fill="rgba(255,255,255,0.22)" />
          <circle cx={cx} cy={cy} r={maxR} fill="none" stroke="rgba(10,10,10,0.10)" strokeWidth={0.9} />
        </>
      )}

      {/* Grid rings — chart variant only */}
      {variant === "chart" && rings.map((frac) => (
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

      {/* Spoke lines — chart variant only */}
      {variant === "chart" && points.map((pt, i) => (
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
        const isHovered = hoveredIndex === i;
        return (
          <path
            key={`slice-${i}`}
            d={`M ${cx},${cy} L ${pt.x.toFixed(2)},${pt.y.toFixed(2)} L ${next.x.toFixed(2)},${next.y.toFixed(2)} Z`}
            fill={pt.fillColor}
            fillOpacity={variant === "abstract" ? (isHovered ? 1 : 0.92) : 0.92}
            stroke={variant === "chart" ? "rgba(255,255,255,0.5)" : pt.fillColor}
            strokeWidth={variant === "chart" ? 0.8 : 0.3}
            strokeLinejoin="round"
            {...(variant === "abstract" ? {
              onMouseEnter: (e) => handleWedgeMouseEnter(i, e),
              onMouseMove: handleWedgeMouseMove,
              onMouseLeave: handleWedgeMouseLeave,
              style: { cursor: "default" },
            } : {})}
          />
        );
      })}

      {/* Outer edge — abstract variant only */}
      {variant === "abstract" && (
        <polygon
          points={points.map(pt => `${pt.x.toFixed(2)},${pt.y.toFixed(2)}`).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth={1.8}
          strokeLinejoin="round"
        />
      )}

      {/* Center dot — abstract variant only */}
      {variant === "abstract" && (
        <circle cx={cx} cy={cy} r={3.5} fill="rgba(10,10,10,0.20)" />
      )}

      {/* Vertex dots — chart variant only */}
      {variant === "chart" && points.map((pt, i) => (
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

      {/* Legend — abstract variant only */}
      {variant === "abstract" && (
        <text
          x={cx}
          y={size - 6}
          textAnchor="middle"
          fontSize={8.5}
          fill="rgba(10,10,10,0.38)"
          fontFamily="system-ui, sans-serif"
          letterSpacing={0.2}
        >
          Dark = conservative · Light = progressive
        </text>
      )}

      {/* Hover tooltip — abstract variant only */}
      {variant === "abstract" && hoveredIndex !== null && (() => {
        const pt = points[hoveredIndex];
        const conviction = convictionPercent(pt.score);
        const lean = leanLabel(pt.score);
        const label = `${pt.cat.emoji} ${pt.cat.shortName}`;
        const sub = `${conviction}% · ${lean}`;
        const tooltipW = 118;
        const tooltipH = 36;
        const pad = 6;
        // keep tooltip inside SVG bounds
        let tx = tooltipPos.x + 12;
        let ty = tooltipPos.y - tooltipH - 6;
        if (tx + tooltipW > size) tx = tooltipPos.x - tooltipW - 12;
        if (ty < 0) ty = tooltipPos.y + 10;
        return (
          <g key="tooltip" style={{ pointerEvents: "none" }}>
            <rect
              x={tx}
              y={ty}
              width={tooltipW}
              height={tooltipH}
              rx={5}
              ry={5}
              fill="rgba(10,10,10,0.82)"
            />
            <text
              x={tx + pad}
              y={ty + 13}
              fontSize={9.5}
              fill="rgba(255,255,255,0.95)"
              fontFamily="system-ui, sans-serif"
              fontWeight={600}
            >
              {label}
            </text>
            <text
              x={tx + pad}
              y={ty + 26}
              fontSize={8.5}
              fill="rgba(255,255,255,0.70)"
              fontFamily="system-ui, sans-serif"
            >
              {sub}
            </text>
          </g>
        );
      })()}
    </svg>
  );
}
