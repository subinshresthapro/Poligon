"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import PoligonShape, { DIMENSION_COLORS } from "@/components/PoligonShape";
import CompareShape from "@/components/CompareShape";
import PoliticalRadarChart from "@/components/PoliticalRadarChart";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import IdeologyComparisonPanel from "@/components/IdeologyComparisonPanel";
import ScoreLegend from "@/components/ScoreLegend";
import LeanBadge from "@/components/LeanBadge";
import { findArchetype } from "@/lib/archetypes";
import { CATEGORIES } from "@/data/questions";
import { getSegmentColor } from "@/lib/colorUtils";
import {
  shapeScore,
  scoresToCategoryScores,
  convictionPercent,
  leanLabel,
  encodeScores,
} from "@/lib/scoring";
import { loadScores } from "@/lib/storage";
import { computeAgreement } from "@/lib/sharedPoligons";

interface Props {
  scores: Record<string, number>;
  /**
   * Name the viewer gave this shape (from their saved collection).
   * null = not yet named; UI falls back to generic "their"/"this person".
   */
  displayName: string | null;
}

export default function SharedResultsView({ scores, displayName }: Props) {
  const [tab, setTab] = useState<"breakdown" | "compare">("breakdown");
  const [radarVariant, setRadarVariant] = useState<"abstract" | "chart">("abstract");
  const [ownScores, setOwnScores] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    setOwnScores(loadScores());
  }, []);

  const name = displayName ?? null;
  // Possessive: "Alice's" or "Their"
  const possessive = name ? `${name}'s` : "Their";
  // Subject: "Alice" or "this person"
  const subject = name ?? "this person";

  const categoryScores = scoresToCategoryScores(scores);
  const avg = shapeScore(scores);
  const archetype = findArchetype(scores);

  const agreement = ownScores ? computeAgreement(ownScores, scores) : null;

  const compareUrl =
    typeof window !== "undefined" && ownScores
      ? `${window.location.origin}/compare?a=${encodeScores(scores)}&b=${encodeScores(ownScores)}`
      : null;

  const tabs = [
    { id: "breakdown" as const, label: "Category Breakdown" },
    { id: "compare" as const, label: "Compare Ideologies" },
  ];

  return (
    <div className="min-h-screen bg-[#E5E0D2] py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* ── Identity card ─────────────────────────────────────────────────── */}
        <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
            {/* Shape badge */}
            <div className="flex-shrink-0 bg-[#E5E0D2] rounded-xl p-2">
              <PoligonShape scores={scores} size={140} />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-1">
                {possessive} political archetype
              </p>
              <h1
                className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-1"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {archetype.emoji} {archetype.name}
              </h1>
              <p className="text-[rgba(10,10,10,0.55)] text-sm leading-relaxed mb-3">
                {archetype.description}
              </p>
              <p className="text-[rgba(10,10,10,0.45)] text-xs leading-relaxed">
                {archetype.detail}
              </p>
            </div>

            {/* Shape score */}
            <div className="flex-shrink-0 text-center">
              <div className="bg-[#E5E0D2] border border-[rgba(10,10,10,0.12)] rounded-xl px-5 py-4">
                <p className="text-xs text-[rgba(10,10,10,0.45)] uppercase tracking-widest mb-1">
                  Shape score
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: "var(--color-secondary)", fontFamily: "var(--font-outfit)" }}
                >
                  {convictionPercent(avg)}%
                </p>
                <p className="text-xs text-[rgba(10,10,10,0.45)] mt-0.5 mb-2">
                  conviction strength
                </p>
                <LeanBadge score={avg} size="md" />
              </div>
            </div>
          </div>

          {/* Dimension strip */}
          <div className="px-6 pb-5">
            <p className="text-xs text-[rgba(10,10,10,0.45)] uppercase tracking-widest mb-2">
              {possessive} shape, dimension by dimension
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const score = scores[cat.id] ?? 0;
                const brandColor = DIMENSION_COLORS[cat.id] ?? "var(--color-accent)";
                return (
                  <div
                    key={cat.id}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border"
                    style={{ borderColor: brandColor + "40", background: brandColor + "12" }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        background:
                          leanLabel(score) === "Reform"
                            ? "#1E3A5F"
                            : leanLabel(score) === "Traditional"
                            ? "#C2440A"
                            : "rgba(10,10,10,0.25)",
                      }}
                    />
                    <span className="text-[rgba(10,10,10,0.70)]">
                      {cat.emoji} {cat.shortName} · {convictionPercent(score)}%
                    </span>
                    <LeanBadge score={score} size="sm" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Compare with me card ──────────────────────────────────────────── */}
        <div className="bg-[#0A0A0A] text-white rounded-2xl shadow-sm overflow-hidden mb-6">
          {ownScores ? (
            /* Viewer has taken the quiz — show the comparison */
            <div className="flex flex-col sm:flex-row items-center gap-6 px-6 py-5">
              <div className="flex-shrink-0">
                <CompareShape
                  scoresA={scores}
                  scoresB={ownScores}
                  nameA={subject}
                  nameB="You"
                  size={200}
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-0.5">
                  Compare with {subject}
                </p>
                <p
                  className="font-bold text-xl mb-1"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  🤝 {agreement}% agreement
                </p>
                <p className="text-[rgba(241,238,229,0.50)] text-xs leading-relaxed mb-4">
                  Based on how closely your positions align across all 10 dimensions.
                  See the full breakdown on the comparison page.
                </p>
                {compareUrl && (
                  <Link
                    href={compareUrl}
                    className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                  >
                    See full comparison →
                  </Link>
                )}
              </div>
            </div>
          ) : (
            /* Viewer hasn't taken the quiz */
            <div className="flex flex-col sm:flex-row items-center gap-5 px-6 py-5">
              <div className="flex-shrink-0 flex items-center -space-x-3 opacity-40">
                <svg width="38" height="38" viewBox="0 0 28 28" aria-hidden="true">
                  <polygon points="14,7 21,10 20,18 13,21 7,17 9,10" fill="var(--color-accent)" fillOpacity="0.9" />
                </svg>
                <svg width="38" height="38" viewBox="0 0 28 28" aria-hidden="true">
                  <polygon points="14,7 21,10 20,18 13,21 7,17 9,10" fill="#E8782E" fillOpacity="0.9" />
                </svg>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-0.5">
                  Compare with {subject}
                </p>
                <p className="font-bold text-base" style={{ fontFamily: "var(--font-outfit)" }}>
                  See how your shapes compare
                </p>
                <p className="text-[rgba(241,238,229,0.50)] text-xs mt-0.5 leading-relaxed">
                  Take the quiz to see your agreement score and both shapes side by side.
                </p>
              </div>
              <Link
                href="/quiz"
                className="flex-shrink-0 bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap"
              >
                Take the quiz →
              </Link>
            </div>
          )}
        </div>

        {/* ── Shape view + sidebar ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Shape panel */}
          <div className="lg:col-span-2 bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm p-4">
            <div className="flex gap-2 justify-center mb-4">
              {(["abstract", "chart"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setRadarVariant(v)}
                  className="text-xs px-3 py-1 rounded-full border transition-colors"
                  style={{
                    borderColor: radarVariant === v ? "var(--color-accent)" : "rgba(10,10,10,0.15)",
                    background: radarVariant === v ? "var(--color-accent)" : "transparent",
                    color: radarVariant === v ? "#fff" : "rgba(10,10,10,0.6)",
                    cursor: "pointer",
                  }}
                >
                  {v === "abstract" ? "Shape view" : "Data view"}
                </button>
              ))}
            </div>
            {radarVariant === "abstract" ? (
              <div className="flex items-center justify-center" style={{ minHeight: 440 }}>
                <PoligonShape scores={scores} size={380} variant="abstract" />
              </div>
            ) : (
              <PoliticalRadarChart
                scores={scores}
                name={name ?? "Their Shape"}
                height={440}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm p-5">
              <h3 className="text-sm font-semibold text-[#0A0A0A] mb-4">How to read this</h3>
              <ScoreLegend />
              <p className="text-xs text-[rgba(10,10,10,0.45)] mt-4 leading-relaxed">
                <strong>Spoke length</strong> = conviction strength.{" "}
                <strong>Wedge shade</strong> = direction — light pastel = progressive,
                deep dark = conservative. Hover any spoke for details.
              </p>
            </div>

            <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm p-5">
              <h3 className="text-sm font-semibold text-[#0A0A0A] mb-3">
                {possessive} strongest positions
              </h3>
              <div className="space-y-2">
                {[...categoryScores]
                  .sort((a, b) => Math.abs(b.score) - Math.abs(a.score))
                  .slice(0, 5)
                  .map((cs) => (
                    <div key={cs.categoryId} className="flex items-center gap-2 text-xs">
                      <span>{cs.emoji}</span>
                      <span className="text-[rgba(10,10,10,0.70)] flex-1 truncate">{cs.name}</span>
                      <span className="text-[rgba(10,10,10,0.55)] flex-shrink-0">
                        {convictionPercent(cs.score)}%
                      </span>
                      <LeanBadge score={cs.score} size="sm" />
                    </div>
                  ))}
              </div>
            </div>

            {/* CTA: take quiz or view own results */}
            {ownScores ? (
              <Link
                href="/results"
                className="block text-center text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-deep)] font-medium border border-[rgba(10,10,10,0.12)] rounded-xl py-2.5 bg-[#F1EEE5] transition-colors"
              >
                ← View my Poligon
              </Link>
            ) : (
              <Link
                href="/quiz"
                className="block text-center text-sm font-semibold bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white rounded-xl py-2.5 transition-colors"
              >
                Take the quiz →
              </Link>
            )}
          </div>
        </div>

        {/* ── Tabs ──────────────────────────────────────────────────────────── */}
        <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-[rgba(10,10,10,0.12)] flex">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                  tab === t.id
                    ? "border-[var(--color-accent)] text-[var(--color-accent)] bg-[#E5E0D2]"
                    : "border-transparent text-[rgba(10,10,10,0.55)] hover:text-[#0A0A0A] hover:bg-[#E5E0D2]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="p-6">
            {tab === "breakdown" && <CategoryBreakdown categoryScores={categoryScores} />}
            {tab === "compare" && <IdeologyComparisonPanel userScores={scores} />}
          </div>
        </div>

      </div>
    </div>
  );
}
