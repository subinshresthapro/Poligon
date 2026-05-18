"use client";

import { CategoryScore } from "@/types";
import { scoreLabel, scoreLabelColor } from "@/lib/scoring";
import { useState } from "react";

interface CategoryBreakdownProps {
  categoryScores: CategoryScore[];
}

function ScoreBar({ score }: { score: number }) {
  const pct = ((score + 1) / 2) * 100;
  const barColor =
    score >= 0.5
      ? "bg-emerald-500"
      : score >= 0.1
      ? "bg-emerald-400"
      : score > -0.1
      ? "bg-slate-400"
      : score > -0.5
      ? "bg-orange-400"
      : "bg-red-500";

  return (
    <div className="relative h-2 rounded-full bg-slate-100 overflow-hidden">
      <div className="absolute inset-y-0 left-1/2 w-px bg-slate-300 z-10" />
      <div
        className={`absolute inset-y-0 rounded-full transition-all ${barColor}`}
        style={{
          left: score >= 0 ? "50%" : `${pct}%`,
          width: `${Math.abs(score) * 50}%`,
        }}
      />
    </div>
  );
}

export default function CategoryBreakdown({ categoryScores }: CategoryBreakdownProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {categoryScores.map((cs) => {
        const isOpen = expanded === cs.categoryId;
        const label = scoreLabel(cs.score);
        const labelColor = scoreLabelColor(cs.score);

        return (
          <div
            key={cs.categoryId}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden"
          >
            <button
              className="w-full px-5 py-4 text-left hover:bg-slate-50 transition-colors"
              onClick={() => setExpanded(isOpen ? null : cs.categoryId)}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{cs.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-semibold text-slate-800 text-sm">
                      {cs.name}
                    </span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs font-medium ${labelColor}`}>
                        {label}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {cs.score >= 0 ? "+" : ""}
                        {cs.score.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <ScoreBar score={cs.score} />
                </div>
                <span className="text-slate-400 text-xs ml-1">
                  {isOpen ? "▲" : "▼"}
                </span>
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-4 border-t border-slate-100">
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                    {cs.negativeLabel}
                  </span>
                  <span className="flex items-center gap-1.5">
                    {cs.positiveLabel}
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  </span>
                </div>
                <div className="mt-3 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">Your position:</span>{" "}
                  <span className={labelColor}>{label}</span> on this dimension
                  {cs.score >= 0 ? (
                    <span> — aligning more toward <strong>{cs.positiveLabel}</strong></span>
                  ) : (
                    <span> — aligning more toward <strong>{cs.negativeLabel}</strong></span>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
      <p className="text-xs text-slate-400 text-center pt-1">
        Click any category to see details
      </p>
    </div>
  );
}
