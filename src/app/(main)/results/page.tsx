"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  decodeScores,
  encodeScores,
  shapeScore,
  scoreLabel,
  scoresToCategoryScores,
} from "@/lib/scoring";
import { saveScores, loadScores } from "@/lib/storage";
import PoligonShape, { DIMENSION_COLORS } from "@/components/PoligonShape";
import { getSegmentColor } from "@/lib/colorUtils";
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
  const [compareCopied, setCompareCopied] = useState(false);

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

  const copyCompareLink = async () => {
    if (!scores) return;
    const url = `${window.location.origin}/compare?a=${encodeScores(scores)}`;
    try { await navigator.clipboard.writeText(url); } catch { /* silent */ }
    setCompareCopied(true);
    setTimeout(() => setCompareCopied(false), 2500);
  };

  const categoryScores = scoresToCategoryScores(scores);
  const avg = shapeScore(scores);
  const overallLabel = scoreLabel(avg);
  const archetype = findArchetype(scores);

  const tabs = [
    { id: "breakdown" as const, label: "Category Breakdown" },
    { id: "compare" as const, label: "Compare Ideologies" },
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
                // brandColor = mid-tone, used for pill border/bg so it's always readable
                const brandColor = DIMENSION_COLORS[cat.id] ?? "#5560C8";
                // scoreColor = actual shade for this score (dark for conservative, light for progressive)
                const scoreColor = getSegmentColor(cat.id, score);
                return (
                  <div
                    key={cat.id}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border"
                    style={{ borderColor: brandColor + "40", background: brandColor + "12" }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: scoreColor }}
                    />
                    <span className="text-[rgba(10,10,10,0.70)]">{cat.emoji} {cat.shortName}</span>
                    <span className="font-mono font-semibold" style={{ color: scoreColor }}>
                      {score >= 0 ? "+" : ""}{score.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Compare with a Friend + Share card ─────────────────────────── */}
        <div className="bg-[#0A0A0A] text-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 px-6 py-5">
            {/* Two overlapping hex icons */}
            <div className="flex-shrink-0 flex items-center -space-x-3">
              <svg width="38" height="38" viewBox="0 0 28 28" aria-hidden="true">
                <polygon points="14,7 21,10 20,18 13,21 7,17 9,10" fill="#5560C8" fillOpacity="0.9" />
              </svg>
              <svg width="38" height="38" viewBox="0 0 28 28" aria-hidden="true">
                <polygon points="14,7 21,10 20,18 13,21 7,17 9,10" fill="#E8782E" fillOpacity="0.9" />
              </svg>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs font-semibold text-[#5560C8] uppercase tracking-widest mb-0.5">
                Compare shapes with a friend
              </p>
              <p className="font-bold text-base" style={{ fontFamily: "var(--font-outfit)" }}>
                Political difference as geometry, not warfare
              </p>
              <p className="text-[rgba(241,238,229,0.50)] text-xs mt-0.5 leading-relaxed">
                Send anyone your link. When they take the quiz, both polygons appear side by side.
                Couples, coworkers, families — see exactly where you align and diverge.
              </p>
            </div>

            <button
              onClick={copyCompareLink}
              className="flex-shrink-0 flex items-center gap-2 bg-[#5560C8] hover:bg-[#4450B2] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              {compareCopied ? "✓ Copied!" : "🔗 Copy compare link"}
            </button>
          </div>

          {/* ── Social share strip ──────────────────────────────────────────── */}
          <div className="border-t border-[rgba(255,255,255,0.08)] px-6 pb-5 pt-4">
            <p className="text-[10px] text-[rgba(241,238,229,0.35)] mb-3 text-center uppercase tracking-widest">
              Share your shape
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {(
                [
                  {
                    name: "X",
                    bg: "#1a1a1a",
                    border: "rgba(255,255,255,0.15)",
                    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just found my political shape on Poligon — I'm ${archetype.emoji} ${archetype.name}. See how ours compare 👇`)}&url=${encodeURIComponent(typeof window !== "undefined" ? `${window.location.origin}/compare?a=${encodeScores(scores)}` : "")}`,
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Facebook",
                    bg: "#1877F2",
                    border: "transparent",
                    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? `${window.location.origin}/compare?a=${encodeScores(scores)}` : "")}`,
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    ),
                  },
                  {
                    name: "WhatsApp",
                    bg: "#25D366",
                    border: "transparent",
                    href: `https://wa.me/?text=${encodeURIComponent(`I just found my political shape on Poligon — I'm ${archetype.emoji} ${archetype.name}. See how ours compare 👇 ${typeof window !== "undefined" ? `${window.location.origin}/compare?a=${encodeScores(scores)}` : ""}`)}`,
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Reddit",
                    bg: "#FF4500",
                    border: "transparent",
                    href: `https://reddit.com/submit?url=${encodeURIComponent(typeof window !== "undefined" ? `${window.location.origin}/compare?a=${encodeScores(scores)}` : "")}&title=${encodeURIComponent(`I'm a ${archetype.name} on Poligon — the multidimensional political quiz`)}`,
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0" aria-hidden="true">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                      </svg>
                    ),
                  },
                  {
                    name: "LinkedIn",
                    bg: "#0A66C2",
                    border: "transparent",
                    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? `${window.location.origin}/compare?a=${encodeScores(scores)}` : "")}`,
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Telegram",
                    bg: "#26A5E4",
                    border: "transparent",
                    href: `https://t.me/share/url?url=${encodeURIComponent(typeof window !== "undefined" ? `${window.location.origin}/compare?a=${encodeScores(scores)}` : "")}&text=${encodeURIComponent(`I just found my political shape on Poligon — I'm ${archetype.emoji} ${archetype.name}. See how ours compare 👇`)}`,
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0" aria-hidden="true">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    ),
                  },
                ] as const
              ).map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: platform.bg,
                    border: `1px solid ${platform.border}`,
                  }}
                >
                  {platform.icon}
                  {platform.name}
                </a>
              ))}
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
                <strong>Spoke length</strong> = conviction strength.{" "}
                <strong>Wedge shade</strong> = direction — light pastel = progressive,
                deep dark = conservative.  Two extreme profiles always look completely
                different, even at the same size.  Hover any spoke for details.
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
