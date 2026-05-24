"use client";

import { CategoryScore } from "@/types";
import { convictionPercent, leanLabel } from "@/lib/scoring";
import LeanBadge from "@/components/LeanBadge";
import { useState } from "react";

interface CategoryBreakdownProps {
  categoryScores: CategoryScore[];
  /** Possessive label for the position copy. Default "Your". Pass "Alice's" or "Their" for shared views. */
  posLabel?: string;
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
    <div className="relative h-2 rounded-full bg-[rgba(10,10,10,0.06)] overflow-hidden">
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

export default function CategoryBreakdown({ categoryScores, posLabel = "Your" }: CategoryBreakdownProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {categoryScores.map((cs) => {
        const isOpen = expanded === cs.categoryId;

        return (
          <div
            key={cs.categoryId}
            className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-xl overflow-hidden"
          >
            <button
              className="w-full px-5 py-4 text-left hover:bg-[#E5E0D2] transition-colors"
              onClick={() => setExpanded(isOpen ? null : cs.categoryId)}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{cs.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-semibold text-[#0A0A0A] text-sm">
                      {cs.name}
                    </span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-[rgba(10,10,10,0.55)]">
                        {convictionPercent(cs.score)}%
                      </span>
                      <LeanBadge score={cs.score} size="sm" />
                    </div>
                  </div>
                  <ScoreBar score={cs.score} />
                </div>
                <span className="text-[rgba(10,10,10,0.45)] text-xs ml-1">
                  {isOpen ? "▲" : "▼"}
                </span>
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-4 border-t border-[rgba(10,10,10,0.08)]">
                <div className="mt-3 flex items-center justify-between text-xs text-[rgba(10,10,10,0.55)]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#C2440A] inline-block" />
                    {cs.negativeLabel}
                  </span>
                  <span className="flex items-center gap-1.5">
                    {cs.positiveLabel}
                    <span className="w-2 h-2 rounded-full bg-[#1E3A5F] inline-block" />
                  </span>
                </div>
                <div className="mt-3 text-xs text-[rgba(10,10,10,0.55)]">
                  <span className="font-medium text-[#0A0A0A]">{posLabel} position:</span>{" "}
                  <LeanBadge score={cs.score} size="sm" />{" "}
                  with <strong>{convictionPercent(cs.score)}% conviction</strong>
                  {leanLabel(cs.score) !== "Mixed" ? (
                    <span>, leaning toward <strong>{cs.score >= 0 ? cs.positiveLabel : cs.negativeLabel}</strong></span>
                  ) : (
                    <span> — balanced between both sides</span>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
      <p className="text-xs text-[rgba(10,10,10,0.45)] text-center pt-1">
        Click any category to see details
      </p>
    </div>
  );
}
