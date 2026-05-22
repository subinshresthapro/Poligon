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

// The radar plots ABSOLUTE conviction (0 = neutral, 1 = maximum conviction).
// Signed direction is stored separately in the data and shown in the tooltip.
const SCORE_TICKS = [0, 0.25, 0.5, 0.75, 1];

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
  // Display conviction level: 0 = none, 1 = maximum
  const label = payload.value === 0 ? "0" : payload.value.toFixed(2).replace(/^0/, "");
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={8}
        fill="rgba(10,10,10,0.45)"
        fontFamily="system-ui, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}

/**
 * Tooltip that surfaces the axis-specific pole label for the hovered spoke.
 *
 * The radar plots ABSOLUTE conviction, so `entry.value` is in [0,1].
 * We recover the SIGNED direction from the `_signed` field stored alongside
 * each abs value in the data point.
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: Record<string, any>;
  }>;
}) {
  if (!active || !payload?.length) return null;

  const categoryShortName = payload[0]?.payload?.category as string | undefined;
  const cat = CATEGORIES.find((c) => c.shortName === categoryShortName);

  return (
    <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-lg shadow-lg p-3 text-xs z-50 max-w-[220px]">
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
        // abs conviction strength (what's plotted on the radar)
        const absV = entry.value;
        // signed direction (stored as a separate field in the data point)
        const signedV = (entry.payload[`${entry.name}_signed`] as number) ?? absV;

        let label: string;
        let pole: string | undefined;

        if (absV < 0.15) {
          label = "Mixed / Neutral";
        } else if (signedV >= 0.7) {
          label = "Strongly progressive";
          pole = cat?.positiveLabel;
        } else if (signedV >= 0.3) {
          label = "Progressive lean";
          pole = cat?.positiveLabel;
        } else if (signedV > -0.3) {
          label = "Mixed / Neutral";
        } else if (signedV > -0.7) {
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
                {signedV > 0 ? "+" : ""}
                {signedV.toFixed(2)}
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
    const signed = scores[cat.id] ?? 0;
    // Plot absolute conviction so both −1 and +1 produce a full spoke.
    // The signed value is stored under `${seriesName}_signed` and read
    // by the tooltip to show the actual directional position.
    const point: Record<string, number | string> = {
      category: cat.shortName,
      [name]: Math.abs(signed),
      [`${name}_signed`]: signed,
    };
    overlays.forEach((ov) => {
      const ovSigned = ov.scores[cat.id] ?? 0;
      point[ov.name] = Math.abs(ovSigned);
      point[`${ov.name}_signed`] = ovSigned;
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
              domain={[0, 1]}
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
            domain={[0, 1]}
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
