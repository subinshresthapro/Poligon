"use client";

import { CATEGORIES } from "@/data/questions";
import { DIMENSION_COLORS } from "@/components/PoligonShape";
import { getDirectionalShade } from "@/lib/colorUtils";

/** Kept for the compare-page legend and per-dimension breakdown dots */
export const COLOR_A = "#5560C8"; // "You"
export const COLOR_B = "#E8782E"; // "Friend"

interface Props {
  scoresA: Record<string, number>;
  scoresB: Record<string, number>;
  /** Person A label (default "You") — used for aria */
  nameA?: string;
  /** Person B label (default "Friend") — used for aria */
  nameB?: string;
  size?: number;
}

/**
 * CompareShape — two shade-encoded polygons overlaid.
 *
 * Both shapes use per-dimension brand colours.  The shade of each wedge
 * encodes that person's direction on the axis: light = progressive,
 * dark = conservative.  Person A is drawn on top at full opacity; person B
 * is drawn behind at ~55 % opacity so both are legible when they overlap.
 */
export default function CompareShape({
  scoresA,
  scoresB,
  nameA = "You",
  nameB = "Friend",
  size = 280,
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.42;
  const n = CATEGORIES.length;

  /** Compute the wedge vertex + shade for one set of scores */
  const buildPoints = (scores: Record<string, number>) =>
    CATEGORIES.map((cat, i) => {
      const angle = (2 * Math.PI * i) / n - Math.PI / 2;
      const signed = Math.max(-1, Math.min(1, scores[cat.id] ?? 0));
      const r = Math.abs(signed) * maxR;
      const base = DIMENSION_COLORS[cat.id] ?? "#5560C8";
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        ex: cx + maxR * Math.cos(angle),
        ey: cy + maxR * Math.sin(angle),
        fillColor: getDirectionalShade(base, signed),
        score: signed,
        cat,
      };
    });

  const ptsA = buildPoints(scoresA);
  const ptsB = buildPoints(scoresB);
  const rings = [0.25, 0.5, 0.75, 1.0];

  const renderWedges = (
    pts: ReturnType<typeof buildPoints>,
    opacity: number,
    dotR: number
  ) =>
    pts.map((pt, i) => {
      const next = pts[(i + 1) % n];
      return (
        <g key={pt.cat.id}>
          <path
            d={`M ${cx},${cy} L ${pt.x.toFixed(2)},${pt.y.toFixed(2)} L ${next.x.toFixed(2)},${next.y.toFixed(2)} Z`}
            fill={pt.fillColor}
            fillOpacity={opacity}
            stroke="rgba(10,10,10,0.06)"
            strokeWidth={0.5}
          />
          <circle
            cx={pt.x}
            cy={pt.y}
            r={dotR}
            fill={pt.fillColor}
            fillOpacity={opacity + 0.1}
            stroke="rgba(10,10,10,0.18)"
            strokeWidth={1.2}
          />
        </g>
      );
    });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label={`Political shapes: ${nameA} vs ${nameB}`}
      style={{ display: "block" }}
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
          strokeWidth={frac === 1 ? 1 : 0.7}
          strokeDasharray={frac === 1 ? undefined : "2 4"}
        />
      ))}

      {/* Spokes */}
      {ptsA.map((pt, i) => (
        <line
          key={`spoke-${i}`}
          x1={cx} y1={cy}
          x2={pt.ex} y2={pt.ey}
          stroke="rgba(10,10,10,0.07)"
          strokeWidth={0.7}
        />
      ))}

      {/* Person B — behind, lower opacity */}
      {renderWedges(ptsB, 0.52, size > 160 ? 4 : 2.5)}

      {/* Person A — on top, full opacity */}
      {renderWedges(ptsA, 0.82, size > 160 ? 4.5 : 3)}

      {/* Centre dot */}
      <circle cx={cx} cy={cy} r={2.5} fill="rgba(10,10,10,0.20)" />
    </svg>
  );
}
