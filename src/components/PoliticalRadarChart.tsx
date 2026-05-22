"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { CATEGORIES } from "@/data/questions";
import { IdeologyProfile } from "@/types";

interface PoliticalRadarChartProps {
  scores: Record<string, number>;
  name?: string;
  overlays?: IdeologyProfile[];
  height?: number;
  /** Compact hides all labels — for use in small cards/thumbnails */
  compact?: boolean;
}

const SCORE_TICKS = [-1, -0.5, 0, 0.5, 1];

/**
 * Angle-axis tick that shows:
 *   Line 1 — emoji + category shortName (bold)
 *   Line 2 — positive-pole label in muted text (what +1 means on this axis)
 *   Line 3 — negative-pole label in muted text (what −1 means on this axis)
 *
 * The tick is pushed outward from the centre so both lines clear the outer
 * grid ring, making the pole labels legible without cluttering the spokes.
 */
function CustomAngleAxisTick(props: {
  x?: number;
  y?: number;
  payload?: { value: string };
  cx?: number;
  cy?: number;
}) {
  const { x = 0, y = 0, payload, cx = 0, cy = 0 } = props;
  if (!payload) return null;

  // Unit vector pointing away from the chart centre
  const dx = x - cx;
  const dy = y - cy;
  const mag = Math.sqrt(dx * dx + dy * dy) || 1;

  // Push the label group further out so sub-labels clear the outer ring
  const nx = (dx / mag) * 18;
  const ny = (dy / mag) * 16;

  const textAnchor =
    Math.abs(dx) < 10 ? "middle" : dx > 0 ? "start" : "end";
  const dominantBaseline =
    Math.abs(dy) < 8 ? "middle" : dy > 0 ? "hanging" : "auto";

  const cat = CATEGORIES.find((c) => c.shortName === payload.value);
  const emoji = cat?.emoji ?? "";
  const posLabel = cat?.positiveLabel ?? "";
  const negLabel = cat?.negativeLabel ?? "";

  // For the sub-labels we always offset downward from the main text.
  // Because the group is translated to the outer-ring position, "down"
  // in the SVG local frame is toward the chart interior for top axes and
  // away from it for bottom axes — acceptable trade-off for simplicity.
  const subY1 = 14;
  const subY2 = 24;

  return (
    <g transform={`translate(${x + nx},${y + ny})`}>
      {/* Category name */}
      <text
        textAnchor={textAnchor}
        dominantBaseline={dominantBaseline}
        fontSize={11}
        fontWeight={600}
        fill="#0A0A0A"
        fontFamily="var(--font-outfit), system-ui, sans-serif"
      >
        {emoji} {payload.value}
      </text>

      {/* Positive-pole label (what the outermost/+1 end of this spoke means) */}
      <text
        y={subY1}
        textAnchor={textAnchor}
        dominantBaseline="hanging"
        fontSize={7.5}
        fill="rgba(16,140,80,0.75)"
        fontFamily="system-ui, sans-serif"
      >
        ↑ {posLabel}
      </text>

      {/* Negative-pole label (what the −1 / inner end means) */}
      <text
        y={subY2}
        textAnchor={textAnchor}
        dominantBaseline="hanging"
        fontSize={7.5}
        fill="rgba(200,60,30,0.65)"
        fontFamily="system-ui, sans-serif"
      >
        ↓ {negLabel}
      </text>
    </g>
  );
}

function RadiusAxisTick(props: {
  x?: number;
  y?: number;
  payload?: { value: number };
}) {
  const { x = 0, y = 0, payload } = props;
  if (!payload) return null;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={8}
        fill="rgba(10,10,10,0.45)"
        fontFamily="system-ui, sans-serif"
      >
        {payload.value === 0 ? "0" : payload.value > 0 ? `+${payload.value}` : payload.value}
      </text>
    </g>
  );
}

/**
 * Tooltip that surfaces the axis-specific pole label for the hovered spoke,
 * so users understand what their signed score actually means.
 */
function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    payload: { category: string };
  }>;
}) {
  if (!active || !payload?.length) return null;

  // All entries share the same hovered axis
  const categoryShortName = payload[0]?.payload?.category;
  const cat = CATEGORIES.find((c) => c.shortName === categoryShortName);

  return (
    <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-lg shadow-lg p-3 text-xs z-50 max-w-[200px]">
      {cat && (
        <p className="text-[rgba(10,10,10,0.55)] mb-2 leading-snug">
          <span className="font-semibold text-[#0A0A0A]">
            {cat.emoji} {cat.name}
          </span>
          <br />
          <span className="text-[10px]">
            <span style={{ color: "rgba(16,140,80,0.9)" }}>↑ {cat.positiveLabel}</span>
            {" · "}
            <span style={{ color: "rgba(200,60,30,0.8)" }}>↓ {cat.negativeLabel}</span>
          </span>
        </p>
      )}
      {payload.map((entry) => {
        const v = entry.value;
        let label: string;
        let pole: string | undefined;

        if (v >= 0.7) {
          label = "Strongly progressive";
          pole = cat?.positiveLabel;
        } else if (v >= 0.3) {
          label = "Progressive lean";
          pole = cat?.positiveLabel;
        } else if (v > -0.3) {
          label = "Mixed / Neutral";
          pole = undefined;
        } else if (v > -0.7) {
          label = "Conservative lean";
          pole = cat?.negativeLabel;
        } else {
          label = "Strongly conservative";
          pole = cat?.negativeLabel;
        }

        return (
          <div key={entry.name} className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: entry.color }}
              />
              <span className="font-medium text-[#0A0A0A]">{entry.name}:</span>
              <span style={{ color: entry.color }} className="font-mono">
                {v > 0 ? "+" : ""}
                {v.toFixed(2)}
              </span>
            </div>
            <p className="text-[rgba(10,10,10,0.55)] pl-4 leading-snug">
              {label}
              {pole && (
                <span className="text-[10px]">
                  {" "}→ <em>{pole}</em>
                </span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default function PoliticalRadarChart({
  scores,
  name = "Your Shape",
  overlays = [],
  height = 480,
  compact = false,
}: PoliticalRadarChartProps) {
  const data = CATEGORIES.map((cat) => {
    const point: Record<string, number | string> = {
      category: cat.shortName,
      [name]: scores[cat.id] ?? 0,
    };
    overlays.forEach((ov) => {
      point[ov.name] = ov.scores[cat.id] ?? 0;
    });
    return point;
  });

  if (compact) {
    // Minimal chart for small cards — no labels, no legend, tight margins
    return (
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <PolarGrid gridType="circle" stroke="rgba(10,10,10,0.12)" strokeWidth={1} />
            <PolarAngleAxis dataKey="category" tick={false} axisLine={false} />
            <PolarRadiusAxis
              domain={[-1, 1]}
              ticks={SCORE_TICKS}
              tick={false}
              axisLine={false}
            />
            {overlays.map((ov) => (
              <Radar
                key={ov.id}
                name={ov.name}
                dataKey={ov.name}
                stroke={ov.color}
                fill={ov.fillColor}
                fillOpacity={0.15}
                strokeWidth={1.5}
                strokeDasharray="3 2"
                dot={false}
              />
            ))}
            <Radar
              name={name}
              dataKey={name}
              fill="#5560C8"
              fillOpacity={0.28}
              strokeWidth={0}
              dot={{ r: 3, fill: "#5560C8", strokeWidth: 0 }}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Full chart — extra vertical margin to accommodate the two sub-label lines
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 45, right: 80, bottom: 45, left: 80 }}>
          <PolarGrid gridType="circle" stroke="rgba(10,10,10,0.12)" strokeWidth={1} />
          <PolarAngleAxis
            dataKey="category"
            tick={CustomAngleAxisTick as never}
            tickLine={false}
          />
          <PolarRadiusAxis
            domain={[-1, 1]}
            ticks={SCORE_TICKS}
            tick={RadiusAxisTick as never}
            axisLine={false}
            angle={90}
          />
          {overlays.map((ov) => (
            <Radar
              key={ov.id}
              name={ov.name}
              dataKey={ov.name}
              stroke={ov.color}
              fill={ov.fillColor}
              fillOpacity={0.12}
              strokeWidth={1.5}
              strokeDasharray="4 3"
              dot={{ r: 3, fill: ov.color, strokeWidth: 0 }}
            />
          ))}
          <Radar
            name={name}
            dataKey={name}
            fill="#5560C8"
            fillOpacity={0.25}
            strokeWidth={0}
            dot={{ r: 4, fill: "#5560C8", strokeWidth: 1.5, stroke: "rgba(10,10,10,0.25)" }}
            activeDot={{ r: 6, fill: "#5560C8", stroke: "rgba(10,10,10,0.25)", strokeWidth: 2 }}
          />
          <Tooltip content={<CustomTooltip />} />
          {overlays.length > 0 && (
            <Legend
              iconType="circle"
              iconSize={10}
              formatter={(value) => (
                <span className="text-xs text-[rgba(10,10,10,0.55)] font-medium">{value}</span>
              )}
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
