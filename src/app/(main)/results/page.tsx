"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  decodeScores,
  shapeScore,
  scoreLabel,
  scoresToCategoryScores,
} from "@/lib/scoring";
import { saveScores, loadScores } from "@/lib/storage";
import PoligonShape, { DIMENSION_COLORS } from "@/components/PoligonShape";
import PoliticalRadarChart from "@/components/PoliticalRadarChart";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import IdeologyComparisonPanel from "@/components/IdeologyComparisonPanel";
import ShareExportPanel from "@/components/ShareExportPanel";
import ScoreLegend from "@/components/ScoreLegend";
import { findArchetype } from "@/lib/archetypes";
import { CATEGORIES } from "@/data/questions";

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState<"breakdown" | "compare" | "share">("breakdown");
  const [scores, setScores] = useState<Record<string, number> | null>(null);
  const [fromStorage, setFromStorage] = useState(false);

  useEffect(() => {
    const encoded = searchParams.get("scores");
    if (encoded) {
      const decoded = decodeScores(encoded);
      if (decoded) {
        setScores(decoded);
        saveScores(decoded);
      } else {
        router.replace("/quiz");
      }
    } else {
      const saved = loadScores();
      if (saved) {
        setScores(saved);
        setFromStorage(true);
      } else {
        router.replace("/quiz");
      }
    }
  }, [searchParams, router]);

  if (!scores) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[rgba(10,10,10,0.45)] text-sm">Loading your shape…</p>
      </div>
    );
  }

  const categoryScores = scoresToCategoryScores(scores);
  const avg = shapeScore(scores);
  const overallLabel = scoreLabel(avg);
  const archetype = findArchetype(scores);

  const tabs = [
    { id: "breakdown" as const, label: "Category Breakdown" },
    { id: "compare" as const, label: "Compare Traditions" },
    { id: "share" as const, label: "Share & Embed" },
  ];

  return (
    <div className="min-h-screen bg-[#E5E0D2] py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Saved-shape banner */}
        {fromStorage && (
          <div className="mb-4 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm">
            <span className="text-emerald-700">
              ✓ Showing your saved shape. Go back to the quiz to update any answers.
            </span>
            <Link
              href="/quiz"
              className="text-emerald-600 hover:text-emerald-800 font-semibold underline underline-offset-2 text-xs ml-4 flex-shrink-0"
            >
              Edit answers
            </Link>
          </div>
        )}

        {/* ── Archetype Identity Card ─────────────────────────────────────── */}
        <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
            {/* PoligonShape as identity badge */}
            <div className="flex-shrink-0 bg-[#E5E0D2] rounded-xl p-2">
              <PoligonShape scores={scores} size={140} />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs font-semibold text-[#5560C8] uppercase tracking-widest mb-1">
                Your political archetype
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
                <p className="text-xs text-[rgba(10,10,10,0.45)] uppercase tracking-widest mb-1">Shape score</p>
                <p
                  className="text-2xl font-bold font-mono"
                  style={{ color: "#6E2226", fontFamily: "var(--font-jetbrains-mono), monospace" }}
                >
                  {avg >= 0 ? "+" : ""}{avg.toFixed(2)}
                </p>
                <p className="text-xs text-[rgba(10,10,10,0.55)] mt-1">{overallLabel}</p>
              </div>
            </div>
          </div>

          {/* Dimension colour legend strip */}
          <div className="px-6 pb-5">
            <p className="text-xs text-[rgba(10,10,10,0.45)] uppercase tracking-widest mb-2">Your shape, dimension by dimension</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const score = scores[cat.id] ?? 0;
                const color = DIMENSION_COLORS[cat.id] ?? "#5560C8";
                return (
                  <div
                    key={cat.id}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border"
                    style={{ borderColor: color + "40", background: color + "12" }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: color }}
                    />
                    <span className="text-[rgba(10,10,10,0.70)]">{cat.emoji} {cat.shortName}</span>
                    <span className="font-mono font-semibold" style={{ color }}>
                      {score >= 0 ? "+" : ""}{score.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Main chart + sidebar ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Recharts radar for detailed view */}
          <div className="lg:col-span-2 bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm p-4">
            <p className="text-xs text-[rgba(10,10,10,0.45)] text-center mb-2 uppercase tracking-widest">
              Full radar view
            </p>
            <PoliticalRadarChart scores={scores} name="Your Shape" height={440} />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm p-5">
              <h3 className="text-sm font-semibold text-[#0A0A0A] mb-4">How to read this</h3>
              <ScoreLegend />
              <p className="text-xs text-[rgba(10,10,10,0.45)] mt-4 leading-relaxed">
                The further a point extends from the center, the more you support that
                dimension&apos;s direction.
              </p>
            </div>

            <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm p-5">
              <h3 className="text-sm font-semibold text-[#0A0A0A] mb-3">Strongest positions</h3>
              <div className="space-y-2">
                {[...categoryScores]
                  .sort((a, b) => Math.abs(b.score) - Math.abs(a.score))
                  .slice(0, 5)
                  .map((cs) => (
                    <div key={cs.categoryId} className="flex items-center gap-2 text-xs">
                      <span>{cs.emoji}</span>
                      <span className="text-[rgba(10,10,10,0.70)] flex-1 truncate">{cs.name}</span>
                      <span
                        className={`font-mono font-semibold flex-shrink-0 ${
                          cs.score >= 0 ? "text-emerald-600" : "text-red-500"
                        }`}
                      >
                        {cs.score >= 0 ? "+" : ""}{cs.score.toFixed(2)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <Link
              href="/quiz"
              className="block text-center text-sm text-[#5560C8] hover:text-[#4450B2] font-medium border border-[rgba(10,10,10,0.12)] rounded-xl py-2.5 bg-[#F1EEE5] transition-colors"
            >
              ↩ Edit My Answers
            </Link>
          </div>
        </div>

        {/* ── Tabs ─────────────────────────────────────────────────────────── */}
        <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-[rgba(10,10,10,0.12)] flex">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                  tab === t.id
                    ? "border-indigo-600 text-[#5560C8] bg-[#E5E0D2]"
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
            {tab === "share" && <ShareExportPanel scores={scores} name="My Shape" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-[rgba(10,10,10,0.45)] text-sm">Calculating your shape…</div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
