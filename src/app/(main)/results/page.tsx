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
import PoliticalRadarChart from "@/components/PoliticalRadarChart";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import IdeologyComparisonPanel from "@/components/IdeologyComparisonPanel";
import ShareExportPanel from "@/components/ShareExportPanel";
import ScoreLegend from "@/components/ScoreLegend";

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
        saveScores(decoded); // persist so "My Shape" nav link works
      } else {
        router.replace("/quiz");
      }
    } else {
      // No URL param — try localStorage
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
        <p className="text-slate-400 text-sm">Loading your shape…</p>
      </div>
    );
  }

  const categoryScores = scoresToCategoryScores(scores);
  const avg = shapeScore(scores);
  const overallLabel = scoreLabel(avg);

  const tabs = [
    { id: "breakdown" as const, label: "Category Breakdown" },
    { id: "compare" as const, label: "Compare Traditions" },
    { id: "share" as const, label: "Share & Embed" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
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

        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Your Political Shape
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Each spoke is one dimension. Distance from center shows your level of support.
            This is <strong>not</strong> a left–right label — it&apos;s a multidimensional map.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-2 rounded-full text-sm">
            <span>Shape score:</span>
            <span className="font-bold font-mono">
              {avg >= 0 ? "+" : ""}{avg.toFixed(2)}
            </span>
            <span className="text-indigo-500">— {overallLabel}</span>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
            <PoliticalRadarChart scores={scores} name="Your Shape" height={460} />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">How to read this</h3>
              <ScoreLegend />
              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                The further a point extends from the center, the more you support that dimension&apos;s direction.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Strongest positions</h3>
              <div className="space-y-2">
                {[...categoryScores]
                  .sort((a, b) => Math.abs(b.score) - Math.abs(a.score))
                  .slice(0, 5)
                  .map((cs) => (
                    <div key={cs.categoryId} className="flex items-center gap-2 text-xs">
                      <span>{cs.emoji}</span>
                      <span className="text-slate-600 flex-1 truncate">{cs.name}</span>
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
              className="block text-center text-sm text-indigo-600 hover:text-indigo-800 font-medium border border-indigo-200 rounded-xl py-2.5 bg-white transition-colors"
            >
              ↩ Edit My Answers
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 flex">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                  tab === t.id
                    ? "border-indigo-600 text-indigo-700 bg-indigo-50"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
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
          <div className="text-slate-400 text-sm">Calculating your shape…</div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
