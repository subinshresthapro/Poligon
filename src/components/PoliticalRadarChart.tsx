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
  width?: number;
  height?: number;
  compact?: boolean;
}

const SCORE_TICKS = [-1, -0.5, 0, 0.5, 1];

function CustomAngleAxisTick(props: {
  x?: number;
  y?: number;
  payload?: { value: string };
  cx?: number;
  cy?: number;
}) {
  const { x = 0, y = 0, payload, cx = 0, cy = 0 } = props;
  if (!payload) return null;

  const dx = x - cx;
  const dy = y - cy;
  const mag = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = (dx / mag) * 14;
  const ny = (dy / mag) * 14;

  const textAnchor =
    Math.abs(dx) < 10 ? "middle" : dx > 0 ? "start" : "end";
  const dominantBaseline =
    Math.abs(dy) < 8 ? "middle" : dy > 0 ? "hanging" : "auto";

  const cat = CATEGORIES.find((c) => c.shortName === payload.value);
  const emoji = cat?.emoji ?? "";

  return (
    <g transform={`translate(${x + nx},${y + ny})`}>
      <text
        textAnchor={textAnchor}
        dominantBaseline={dominantBaseline}
        fontSize={11}
        fontWeight={600}
        fill="#475569"
        fontFamily="system-ui, sans-serif"
      >
        {emoji} {payload.value}
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
        fill="#94a3b8"
        fontFamily="system-ui, sans-serif"
      >
        {payload.value === 0 ? "0" : payload.value > 0 ? `+${payload.value}` : payload.value}
      </text>
    </g>
  );
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
      {payload.map((entry) => {
        const v = entry.value;
        let label = "Neutral";
        if (v >= 0.7) label = "Strongly Supports";
        else if (v >= 0.3) label = "Leans Supportive";
        else if (v > -0.3) label = "Mixed / Neutral";
        else if (v > -0.7) label = "Leans Opposed";
        else label = "Strongly Opposes";
        return (
          <div key={entry.name} className="flex items-center gap-2">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: entry.color }}
            />
            <span className="font-medium text-slate-700">{entry.name}:</span>
            <span style={{ color: entry.color }}>
              {v > 0 ? "+" : ""}
              {v.toFixed(2)} — {label}
            </span>
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

  const chartHeight = compact ? 320 : height;
  const outerRadius = compact ? "75%" : "65%";

  return (
    <div style={{ width: "100%", height: chartHeight }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 30, right: 60, bottom: 30, left: 60 }}>
          <PolarGrid
            gridType="circle"
            stroke="#e2e8f0"
            strokeWidth={1}
          />
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

          {/* Overlays first (behind user shape) */}
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

          {/* User shape on top */}
          <Radar
            name={name}
            dataKey={name}
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.25}
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#6366f1", strokeWidth: 1.5, stroke: "#fff" }}
            activeDot={{ r: 6, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
          />

          <Tooltip content={<CustomTooltip />} />
          {(overlays.length > 0 || !compact) && (
            <Legend
              iconType="circle"
              iconSize={10}
              formatter={(value) => (
                <span className="text-xs text-slate-600 font-medium">{value}</span>
              )}
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
