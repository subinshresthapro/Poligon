"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  decodeScores,
  encodeScores,
  shapeScore,
  scoresToCategoryScores,
  convictionPercent,
  leanLabel,
} from "@/lib/scoring";
import LeanBadge from "@/components/LeanBadge";
import { loadScores } from "@/lib/storage";
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
  const [isViewingShared, setIsViewingShared] = useState(false);
  const [compareCopied, setCompareCopied] = useState(false);

  useEffect(() => {
    const encoded = searchParams.get("scores");
    if (encoded) {
      const decoded = decodeScores(encoded);
      if (decoded) {
        setScores(decoded);
        // Results page NEVER writes to localStorage — the quiz page already calls
        // saveScores() before navigating here.  Writing here would corrupt a
        // visitor's own data when they open a shared link.
        const existing = loadScores();
        if (existing) {
          const isDifferent = Object.keys(decoded).some(
            (k) => Math.abs((decoded[k] ?? 0) - (existing[k] ?? 0)) > 0.01
          );
          if (isDifferent) {
            setIsViewingShared(true);
          }
          // Same scores = own results page (or their own page refresh) — no banner
        }
        // No existing scores = fresh visitor viewing a shared link.
        // Show the results in-memory only; do NOT save to localStorage.
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

  // ── All hooks must be above every early return ──────────────────────────
  const copyCompareLink = useCallback(async () => {
    if (!scores) return;
    const url = `${window.location.origin}/compare?a=${encodeScores(scores)}`;
    try { await navigator.clipboard.writeText(url); } catch { /* silent */ }
    setCompareCopied(true);
    setTimeout(() => setCompareCopied(false), 2500);
  }, [scores]);

  const handleDownloadPoligon = useCallback(async () => {
    if (!scores) return;
    const { exportPoligonPNG } = await import("@/components/PoliticalRadarChart");
    const arch = findArchetype(scores);
    const dataUri = exportPoligonPNG(scores, {
      size: 1080,
      bgColor: "#F1EEE5",
      label: `${arch.emoji} ${arch.name}`,
    });
    const a = document.createElement("a");
    a.href = dataUri;
    a.download = `my-poligon-${arch.name.toLowerCase().replace(/\s+/g, "-")}.png`;
    a.click();
  }, [scores]);
  // ─────────────────────────────────────────────────────────────────────────

  if (!scores) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[rgba(10,10,10,0.45)] text-sm">Loading your shape…</p>
      </div>
    );
  }

  const categoryScores = scoresToCategoryScores(scores);
  const avg = shapeScore(scores);
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

        {/* Shared-link banner — shown when viewing someone else's results URL */}
        {isViewingShared && (
          <div className="mb-4 flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm">
            <span className="text-amber-700">
              👀 You&apos;re viewing someone else&apos;s shape. Your own shape is saved separately.
            </span>
            <Link
              href="/results"
              className="text-amber-600 hover:text-amber-800 font-semibold underline underline-offset-2 text-xs ml-4 flex-shrink-0 whitespace-nowrap"
            >
              View my shape →
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
              <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-1">
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
                  className="text-2xl font-bold"
                  style={{ color: "var(--color-secondary)", fontFamily: "var(--font-outfit)" }}
                >
                  {convictionPercent(avg)}%
                </p>
                <p className="text-xs text-[rgba(10,10,10,0.45)] mt-0.5 mb-2">conviction strength</p>
                <LeanBadge score={avg} size="md" />
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
                const brandColor = DIMENSION_COLORS[cat.id] ?? "var(--color-accent)";
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
                      style={{
                        background: leanLabel(score) === "Reform" ? "#1E3A5F"
                          : leanLabel(score) === "Traditional" ? "#C2440A"
                          : "rgba(10,10,10,0.25)",
                      }}
                    />
                    <span className="text-[rgba(10,10,10,0.70)]">{cat.emoji} {cat.shortName} · {convictionPercent(score)}%</span>
                    <LeanBadge score={score} size="sm" />
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
                <polygon points="14,7 21,10 20,18 13,21 7,17 9,10" fill="var(--color-accent)" fillOpacity="0.9" />
              </svg>
              <svg width="38" height="38" viewBox="0 0 28 28" aria-hidden="true">
                <polygon points="14,7 21,10 20,18 13,21 7,17 9,10" fill="#E8782E" fillOpacity="0.9" />
              </svg>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-0.5">
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
              className="flex-shrink-0 flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              {compareCopied ? "✓ Copied!" : "🔗 Copy compare link"}
            </button>
          </div>

          {/* ── Social share strip ──────────────────────────────────────────── */}
          {(() => {
            const shareUrl = typeof window !== "undefined"
              ? `${window.location.origin}/compare?a=${encodeScores(scores)}`
              : "";
            const shareText = `I just found my political shape on Poligon — I'm ${archetype.emoji} ${archetype.name}. See how ours compare`;

            type Platform = { name: string; bg: string; border: string; icon: React.ReactNode; action: () => void };
            const platforms: Platform[] = [
              {
                name: "X",
                bg: "#1a1a1a",
                border: "rgba(255,255,255,0.15)",
                action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareText} 👇`)}&url=${encodeURIComponent(shareUrl)}`, "_blank", "noopener"),
                icon: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636Zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
              },
              {
                name: "Facebook",
                bg: "#1877F2",
                border: "transparent",
                action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank", "noopener"),
                icon: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
              },
              {
                name: "WhatsApp",
                bg: "#25D366",
                border: "transparent",
                action: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} 👇 ${shareUrl}`)}`, "_blank", "noopener"),
                icon: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
              },
              {
                name: "Reddit",
                bg: "#FF4500",
                border: "transparent",
                action: () => window.open(`https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(`I'm a ${archetype.name} on Poligon — the multidimensional political quiz`)}`, "_blank", "noopener"),
                icon: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0" aria-hidden="true"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" /></svg>,
              },
              {
                name: "Instagram",
                bg: "#E1306C",
                border: "transparent",
                action: () => window.open("https://www.instagram.com/", "_blank", "noopener"),
                icon: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>,
              },
              {
                name: "Telegram",
                bg: "#26A5E4",
                border: "transparent",
                action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`${shareText} 👇`)}`, "_blank", "noopener"),
                icon: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>,
              },
            ];

            return (
              <div className="border-t border-[rgba(255,255,255,0.08)] px-6 pb-5 pt-4">
                <p className="text-[10px] text-[rgba(241,238,229,0.35)] mb-3 text-center uppercase tracking-widest">
                  Share your shape
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {platforms.map((p) => (
                    <button
                      key={p.name}
                      onClick={p.action}
                      title={`Share on ${p.name}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium transition-opacity hover:opacity-80"
                      style={{ backgroundColor: p.bg, border: `1px solid ${p.border}` }}
                    >
                      {p.icon}
                      {p.name}
                    </button>
                  ))}
                </div>
                {/* Download button */}
                <div className="flex justify-center mt-3">
                  <button
                    onClick={handleDownloadPoligon}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-semibold transition-opacity hover:opacity-80 bg-[#3A3A3A] border border-[rgba(255,255,255,0.15)]"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0" aria-hidden="true">
                      <path d="M12 16l-5-5h3V4h4v7h3l-5 5zm-7 4v-2h14v2H5z"/>
                    </svg>
                    Download my Poligon
                  </button>
                </div>
                <p className="text-[10px] text-[rgba(241,238,229,0.25)] text-center mt-2">
                  Download saves a 1080px image with your archetype label. Then share it anywhere.
                </p>
              </div>
            );
          })()}
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
                      <span className="text-[rgba(10,10,10,0.55)] flex-shrink-0">{convictionPercent(cs.score)}%</span>
                      <LeanBadge score={cs.score} size="sm" />
                    </div>
                  ))}
              </div>
            </div>

            <Link
              href="/quiz"
              className="block text-center text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-deep)] font-medium border border-[rgba(10,10,10,0.12)] rounded-xl py-2.5 bg-[#F1EEE5] transition-colors"
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
