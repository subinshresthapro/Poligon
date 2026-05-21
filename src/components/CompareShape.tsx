"use client";

import { CATEGORIES } from "@/data/questions";

/** Blue = "You" */
export const COLOR_A = "#5560C8";
/** Warm orange = "Friend" */
export const COLOR_B = "#E8782E";

interface Props {
  scoresA: Record<string, number>;
  scoresB: Record<string, number>;
  size?: number;
}

export default function CompareShape({ scoresA, scoresB, size = 280 }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.42;
  const n = CATEGORIES.length;

  const pointsForScores = (scores: Record<string, number>) =>
    CATEGORIES.map((cat, i) => {
      const angle = (2 * Math.PI * i) / n - Math.PI / 2;
      const score = scores[cat.id] ?? 0;
      const r = ((score + 1) / 2) * maxR; // −1 → 0, 0 → mid, +1 → maxR
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    });

  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";

  const ptsA = pointsForScores(scoresA);
  const ptsB = pointsForScores(scoresB);
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
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
          strokeWidth={frac === 1 ? 1 : 0.75}
          strokeDasharray={frac === 1 ? undefined : "2 4"}
        />
      ))}

      {/* Spokes */}
      {CATEGORIES.map((cat, i) => {
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        return (
          <line
            key={cat.id}
            x1={cx}
            y1={cy}
            x2={cx + maxR * Math.cos(angle)}
            y2={cy + maxR * Math.sin(angle)}
            stroke="rgba(10,10,10,0.08)"
            strokeWidth={0.75}
          />
        );
      })}

      {/* Friend polygon (drawn first, so "You" sits on top) */}
      <path
        d={toPath(ptsB)}
        fill={COLOR_B}
        fillOpacity={0.28}
        stroke={COLOR_B}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* Your polygon */}
      <path
        d={toPath(ptsA)}
        fill={COLOR_A}
        fillOpacity={0.28}
        stroke={COLOR_A}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* Center */}
      <circle cx={cx} cy={cy} r={2.5} fill="rgba(10,10,10,0.22)" />
    </svg>
  );
}
