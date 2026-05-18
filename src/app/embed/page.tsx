"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PROFILE_MAP } from "@/data/profiles";
import { IDEOLOGY_MAP } from "@/data/ideologies";
import { CATEGORIES } from "@/data/questions";
import { shapeScore, scoreLabel } from "@/lib/scoring";
import PoliticalRadarChart from "@/components/PoliticalRadarChart";
import ScoreLegend from "@/components/ScoreLegend";

function normalizeScores(raw: Record<string, number>): Record<string, number> {
  const normalized: Record<string, number> = {};
  CATEGORIES.forEach((cat) => {
    // Try categoryId first, then name match
    if (raw[cat.id] !== undefined) {
      normalized[cat.id] = raw[cat.id];
    } else {
      const nameMatch = Object.entries(raw).find(
        ([k]) => k.toLowerCase() === cat.name.toLowerCase()
      );
      if (nameMatch) normalized[cat.id] = nameMatch[1];
      else normalized[cat.id] = 0;
    }
  });
  return normalized;
}

function EmbedContent() {
  const params = useSearchParams();

  let scores: Record<string, number> = {};
  let name = "Political Shape";

  // Load from ?profile=<id>
  const profileId = params.get("profile");
  const ideologyId = params.get("ideology");
  const dataParam = params.get("data");

  if (profileId && PROFILE_MAP[profileId]) {
    const p = PROFILE_MAP[profileId];
    scores = p.scores;
    name = p.name;
  } else if (ideologyId && IDEOLOGY_MAP[ideologyId]) {
    const ideo = IDEOLOGY_MAP[ideologyId];
    scores = ideo.scores;
    name = ideo.name;
  } else if (dataParam) {
    try {
      const parsed = JSON.parse(atob(dataParam));
      if (parsed.scores) {
        scores = normalizeScores(parsed.scores);
        name = parsed.name ?? name;
      } else {
        scores = normalizeScores(parsed);
      }
    } catch {
      // Invalid data — show empty
    }
  }

  const showLegend = params.get("legend") !== "false";
  const avg = shapeScore(scores);
  const label = scoreLabel(avg);

  return (
    <div className="p-4 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-base font-bold text-slate-900">{name}</h2>
          <p className="text-xs text-slate-500">Political Shape</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">Shape Score</div>
          <div className="text-lg font-bold font-mono text-indigo-600">
            {avg >= 0 ? "+" : ""}
            {avg.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500">{label}</div>
        </div>
      </div>

      {/* Chart */}
      <PoliticalRadarChart scores={scores} name={name} height={340} compact />

      {/* Legend */}
      {showLegend && (
        <div className="mt-2 px-2">
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center">
            {[
              { score: "+1", label: "Strongly Supports", dot: "bg-emerald-600" },
              { score: "0", label: "Neutral", dot: "bg-slate-400" },
              { score: "−1", label: "Strongly Opposes", dot: "bg-red-600" },
            ].map(({ score, label: l, dot }) => (
              <div key={score} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}`} />
                <span className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">{score}</span> = {l}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">
            Each spoke = one political dimension · Distance from center = level of support
          </p>
        </div>
      )}

      {/* Attribution */}
      <div className="text-center mt-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-indigo-500 hover:text-indigo-700"
        >
          yourpoliticalshape.com
        </a>
      </div>
    </div>
  );
}

export default function EmbedPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
          Loading...
        </div>
      }
    >
      <EmbedContent />
    </Suspense>
  );
}
