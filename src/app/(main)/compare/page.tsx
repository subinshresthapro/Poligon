"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { decodeScores, encodeScores } from "@/lib/scoring";
import { loadScores } from "@/lib/storage";
import CompareShape, { COLOR_A, COLOR_B } from "@/components/CompareShape";
import PoligonShape from "@/components/PoligonShape";
import { CATEGORIES } from "@/data/questions";
import { findArchetype } from "@/lib/archetypes";

/** Per-dimension agreement 0–1 (1 = identical, 0 = opposite ends) */
function computeAgreement(
  scoresA: Record<string, number>,
  scoresB: Record<string, number>
) {
  const diffs = CATEGORIES.map((cat) => {
    const a = scoresA[cat.id] ?? 0;
    const b = scoresB[cat.id] ?? 0;
    return Math.abs(a - b) / 2; // max diff = 2 → normalise to 0..1
  });
  const avgDiff = diffs.reduce((s, d) => s + d, 0) / diffs.length;
  const agreementPct = Math.round((1 - avgDiff) * 100);
  const alignedCount = diffs.filter((d) => d < 0.25).length;
  return { agreementPct, alignedCount, diffs };
}

type Status = "loading" | "ready" | "need-quiz" | "bad-link";

function CompareContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");
  const [friendScores, setFriendScores] = useState<Record<string, number> | null>(null);
  const [myScores, setMyScores] = useState<Record<string, number> | null>(null);
  const [friendName, setFriendName] = useState("Your friend");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const aParam = searchParams.get("a");
    const nameParam = searchParams.get("name");
    if (nameParam) setFriendName(decodeURIComponent(nameParam));

    if (!aParam) { setStatus("bad-link"); return; }
    const decoded = decodeScores(aParam);
    if (!decoded) { setStatus("bad-link"); return; }

    setFriendScores(decoded);
    const mine = loadScores();
    if (mine) { setMyScores(mine); setStatus("ready"); }
    else setStatus("need-quiz");
  }, [searchParams]);

  const copyMyLink = async () => {
    if (!myScores) return;
    const url = `${window.location.origin}/compare?a=${encodeScores(myScores)}`;
    try { await navigator.clipboard.writeText(url); } catch { /* silent */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  /* ── Loading ── */
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[rgba(10,10,10,0.45)] text-sm">Comparing shapes…</p>
      </div>
    );
  }

  /* ── Bad link ── */
  if (status === "bad-link") {
    return (
      <div className="min-h-screen bg-[#E5E0D2] flex items-center justify-center px-4">
        <div className="max-w-sm text-center">
          <div className="text-5xl mb-4">⬡</div>
          <h2 className="text-xl font-bold text-[#0A0A0A] mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
            This link looks broken
          </h2>
          <p className="text-[rgba(10,10,10,0.55)] text-sm mb-6 leading-relaxed">
            Ask your friend to share their shape again from their My Poligon page — they&apos;ll find the compare link there.
          </p>
          <Link
            href="/"
            className="inline-block bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  /* ── Need quiz ── */
  if (status === "need-quiz" && friendScores) {
    const friendArchetype = findArchetype(friendScores);
    const aParam = searchParams.get("a")!;
    const nameParam = searchParams.get("name");
    // After taking the quiz, return to this compare page
    const returnTo = `/compare?a=${aParam}${nameParam ? `&name=${nameParam}` : ""}`;

    return (
      <div className="min-h-screen bg-[#E5E0D2]">
        {/* Hero */}
        <section className="bg-[#0A0A0A] text-white py-14 sm:py-20 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-widest mb-4">
              Compare Shapes
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold mb-3"
              style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}
            >
              {friendName} shared their Poligon
            </h1>
            <p className="text-[rgba(241,238,229,0.60)] text-base max-w-lg mx-auto">
              Take the quiz to see how your shape compares. Where polygons overlap, minds meet.
            </p>
          </div>
        </section>

        <div className="py-12 px-4 sm:px-6">
          <div className="max-w-sm mx-auto">
            {/* Friend preview card */}
            <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm p-6 mb-6 text-center">
              <p className="text-xs font-semibold text-[rgba(10,10,10,0.45)] uppercase tracking-widest mb-4">
                {friendName}&apos;s shape
              </p>
              <div className="flex justify-center bg-[#E5E0D2] rounded-xl p-3 mb-4">
                <PoligonShape scores={friendScores} size={180} />
              </div>
              <p className="font-semibold text-[#0A0A0A] text-sm">
                {friendArchetype.emoji} {friendArchetype.name}
              </p>
              <p className="text-xs text-[rgba(10,10,10,0.50)] mt-1 leading-relaxed">
                {friendArchetype.description}
              </p>
            </div>

            <p className="text-center text-sm text-[rgba(10,10,10,0.55)] mb-6">
              Answer 40 questions in ~5 minutes, then come back to this page to see your shapes overlaid.
            </p>

            <Link
              href={`/quiz?returnTo=${encodeURIComponent(returnTo)}`}
              className="block text-center bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              Take the Quiz →
            </Link>
            <p className="text-center text-xs text-[rgba(10,10,10,0.35)] mt-3">
              No account. Stays in your browser.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Ready — show comparison ── */
  if (status === "ready" && friendScores && myScores) {
    const { agreementPct, alignedCount, diffs } = computeAgreement(myScores, friendScores);
    const myArchetype = findArchetype(myScores);
    const friendArchetype = findArchetype(friendScores);

    const agreeColor =
      agreementPct >= 70 ? "#3AA361" : agreementPct >= 45 ? "#D4A53C" : "#B8385E";
    const agreeNote =
      agreementPct >= 70
        ? "Strong overlap — more in common than you might think."
        : agreementPct >= 45
        ? "A genuine mix of agreement and difference — worth exploring."
        : "Quite different shapes — which makes for a richer conversation.";

    return (
      <ReadyComparison
        myScores={myScores}
        friendScores={friendScores}
        friendName={friendName}
        myArchetype={myArchetype}
        friendArchetype={friendArchetype}
        agreementPct={agreementPct}
        alignedCount={alignedCount}
        agreeColor={agreeColor}
        agreeNote={agreeNote}
        diffs={diffs}
        copyMyLink={copyMyLink}
        copied={copied}
      />
    );
  }

  return null;
}

// ── Animated comparison component ────────────────────────────────────────────
interface ReadyComparisonProps {
  myScores: Record<string, number>;
  friendScores: Record<string, number>;
  friendName: string;
  myArchetype: { name: string; emoji: string };
  friendArchetype: { name: string; emoji: string };
  agreementPct: number;
  alignedCount: number;
  agreeColor: string;
  agreeNote: string;
  diffs: number[];
  copyMyLink: () => void;
  copied: boolean;
}

function ReadyComparison({
  myScores, friendScores, friendName,
  myArchetype, friendArchetype,
  agreementPct, alignedCount, agreeColor, agreeNote,
  diffs, copyMyLink, copied,
}: ReadyComparisonProps) {
  const [viewMode, setViewMode] = useState<"sidebyside" | "overlay">("sidebyside");
  const [animating, setAnimating] = useState(false);
  // "split" = polygons at 25%/75%; "merged" = both at 50%
  const [polyPosition, setPolyPosition] = useState<"split" | "merged">("split");
  const [polyOpacity, setPolyOpacity] = useState(1);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [transitionOn, setTransitionOn] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clean up on unmount
  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);

  const schedule = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  };

  const toggleView = () => {
    if (animating) return;
    setAnimating(true);
    timers.current.forEach(clearTimeout);
    timers.current = [];

    if (viewMode === "sidebyside") {
      // MERGE: slide polygons to center → fade in overlay
      setPolyPosition("merged");                              // CSS transition begins
      schedule(() => {
        setPolyOpacity(0);
        setOverlayOpacity(1);
        setViewMode("overlay");
      }, 380);
      // Reset split position instantly (no transition) for next time
      schedule(() => {
        setTransitionOn(false);
        setPolyPosition("split");
        setTimeout(() => setTransitionOn(true), 30);
        setAnimating(false);
      }, 700);
    } else {
      // SPLIT: fade out overlay → appear at center → slide outward
      setOverlayOpacity(0);
      schedule(() => {
        // Instant-place at center without transition, then enable transition
        setTransitionOn(false);
        setPolyPosition("merged");
        setPolyOpacity(0);
        setTimeout(() => {
          setTransitionOn(true);
          setViewMode("sidebyside");
          setPolyOpacity(1);
          // Start sliding outward one frame later
          setTimeout(() => setPolyPosition("split"), 30);
        }, 30);
      }, 250);
      schedule(() => setAnimating(false), 800);
    }
  };

  const isOverlay = viewMode === "overlay";
  const isSplit = viewMode === "sidebyside";

  // Polygon size in the animated stage
  const POLY_SIZE = 160;

  return (
    <div className="min-h-screen bg-[#E5E0D2]">
        {/* Hero */}
        <section className="bg-[#0A0A0A] text-white py-14 sm:py-18 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-widest mb-4">
              Compare Shapes
            </p>
            <h1
              className="text-3xl sm:text-5xl font-bold mb-3"
              style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.025em" }}
            >
              Your shapes, side by side
            </h1>
            <p className="text-[rgba(241,238,229,0.60)] text-base max-w-xl mx-auto">
              Political difference as geometry, not warfare.
              Where your polygons overlap, your views align.
            </p>
          </div>
        </section>

        <div className="py-10 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto space-y-5">

            {/* ── Main comparison card ── */}
            <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm overflow-hidden">

              {/* Agreement banner */}
              <div
                className="px-5 py-4 border-b border-[rgba(10,10,10,0.09)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                style={{ background: `${agreeColor}12` }}
              >
                <div>
                  <p className="font-semibold text-[#0A0A0A] text-sm">
                    {alignedCount} of {CATEGORIES.length} dimensions broadly aligned
                  </p>
                  <p className="text-xs text-[rgba(10,10,10,0.55)] mt-0.5">{agreeNote}</p>
                </div>
                <div className="flex-shrink-0 bg-white border border-[rgba(10,10,10,0.10)] rounded-xl px-4 py-2.5 text-center">
                  <p
                    className="text-2xl font-bold"
                    style={{ color: agreeColor, fontFamily: "var(--font-jetbrains-mono), monospace" }}
                  >
                    {agreementPct}%
                  </p>
                  <p className="text-[10px] text-[rgba(10,10,10,0.42)] uppercase tracking-wide">
                    agreement
                  </p>
                </div>
              </div>

              {/* ── Animated polygon stage ── */}
              <div className="bg-[#E5E0D2] px-4 pt-8 pb-4">
                {/* Stage: fixed height container with absolute-positioned elements */}
                <div className="relative w-full" style={{ height: 220 }}>

                  {/* Left polygon (You) */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                    style={{
                      left: polyPosition === "split" ? "25%" : "50%",
                      opacity: polyOpacity,
                      transition: transitionOn
                        ? "left 380ms ease-in-out, opacity 200ms ease-in-out"
                        : "none",
                      zIndex: 1,
                    }}
                  >
                    <PoligonShape scores={myScores} size={POLY_SIZE} variant="abstract" />
                  </div>

                  {/* Right polygon (Friend) */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                    style={{
                      left: polyPosition === "split" ? "75%" : "50%",
                      opacity: polyOpacity,
                      transition: transitionOn
                        ? "left 380ms ease-in-out, opacity 200ms ease-in-out"
                        : "none",
                      zIndex: 1,
                    }}
                  >
                    <PoligonShape scores={friendScores} size={POLY_SIZE} variant="abstract" />
                  </div>

                  {/* "vs" divider — fades out as polygons merge */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[rgba(10,10,10,0.28)] text-sm font-medium pointer-events-none select-none"
                    style={{
                      opacity: isSplit && polyPosition === "split" ? 1 : 0,
                      transition: "opacity 200ms ease-in-out",
                      zIndex: 2,
                    }}
                  >
                    vs
                  </div>

                  {/* Overlay (CompareShape) — fades in when merged */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      opacity: overlayOpacity,
                      transition: "opacity 280ms ease-in-out",
                      zIndex: 3,
                    }}
                  >
                    <CompareShape scoresA={myScores} scoresB={friendScores} size={220} />
                  </div>
                </div>

                {/* Side-by-side name labels — visible only in sidebyside mode */}
                <div
                  className="flex justify-between px-2 mt-2"
                  style={{
                    opacity: isSplit ? 1 : 0,
                    transition: "opacity 200ms ease-in-out",
                  }}
                >
                  <div className="text-center" style={{ width: "40%" }}>
                    <p className="text-xs font-semibold text-[#0A0A0A]">You</p>
                    <p className="text-[10px] text-[rgba(10,10,10,0.45)]">{myArchetype.emoji} {myArchetype.name}</p>
                  </div>
                  <div className="text-center" style={{ width: "40%", marginLeft: "auto" }}>
                    <p className="text-xs font-semibold text-[#0A0A0A]">{friendName}</p>
                    <p className="text-[10px] text-[rgba(10,10,10,0.45)]">{friendArchetype.emoji} {friendArchetype.name}</p>
                  </div>
                </div>

                {/* Overlay legend — visible only in overlay mode */}
                <div
                  className="flex flex-wrap justify-center items-center gap-5 mt-3"
                  style={{
                    opacity: isOverlay ? 1 : 0,
                    transition: "opacity 200ms ease-in-out",
                  }}
                >
                  {[
                    { color: COLOR_A, label: "You", archetype: myArchetype.name },
                    { color: COLOR_B, label: friendName, archetype: friendArchetype.name },
                  ].map(({ color, label, archetype }) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-sm flex-shrink-0" style={{ background: color }} />
                      <span className="text-sm font-semibold text-[#0A0A0A]">{label}</span>
                      <span className="text-xs text-[rgba(10,10,10,0.45)]">· {archetype}</span>
                    </div>
                  ))}
                </div>

                {/* Toggle button */}
                <div className="flex justify-center mt-5 mb-1">
                  <button
                    onClick={toggleView}
                    disabled={animating}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(10,10,10,0.15)] bg-white hover:bg-[#F1EEE5] text-sm font-medium text-[rgba(10,10,10,0.70)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {isOverlay ? (
                      <>
                        {/* Split icon */}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <rect x="1" y="4" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                          <rect x="9" y="4" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                        </svg>
                        View side by side
                      </>
                    ) : (
                      <>
                        {/* Merge icon */}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <rect x="1" y="4" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                          <rect x="5" y="4" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" opacity="0.5"/>
                        </svg>
                        View as overlay
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ── Dimension breakdown ── */}
            <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm p-5">
              <h2 className="text-sm font-semibold text-[#0A0A0A] mb-1">
                Dimension by dimension
              </h2>
              <p className="text-xs text-[rgba(10,10,10,0.45)] mb-5">
                <span style={{ color: COLOR_A }}>■</span> You &nbsp;·&nbsp;
                <span style={{ color: COLOR_B }}>■</span> {friendName}
              </p>
              <div className="space-y-5">
                {CATEGORIES.map((cat, i) => {
                  const myScore = myScores[cat.id] ?? 0;
                  const friendScore = friendScores[cat.id] ?? 0;
                  const aligned = diffs[i] < 0.25;

                  return (
                    <div key={cat.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[rgba(10,10,10,0.75)] font-medium">
                          {cat.emoji} {cat.shortName}
                        </span>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background: aligned ? "rgba(58,163,97,0.12)" : "rgba(184,56,94,0.10)",
                            color: aligned ? "#3AA361" : "#B8385E",
                          }}
                        >
                          {aligned ? "aligned" : "differs"}
                        </span>
                      </div>

                      {/* Track with two markers */}
                      <div className="relative h-5 flex items-center">
                        <div className="w-full h-1.5 bg-[#E5E0D2] rounded-full relative">
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-3.5 bg-[rgba(10,10,10,0.14)]" />
                          {[
                            { score: myScore, color: COLOR_A, tip: `You: ${myScore >= 0 ? "+" : ""}${myScore.toFixed(2)}` },
                            { score: friendScore, color: COLOR_B, tip: `${friendName}: ${friendScore >= 0 ? "+" : ""}${friendScore.toFixed(2)}` },
                          ].map(({ score, color, tip }) => (
                            <div
                              key={color}
                              className="absolute top-1/2 w-3.5 h-3.5 rounded-full border-2 border-[#F1EEE5] -translate-y-1/2 -translate-x-1/2 shadow-sm"
                              style={{
                                left: `${((score + 1) / 2) * 100}%`,
                                background: color,
                              }}
                              title={tip}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between text-[10px] text-[rgba(10,10,10,0.32)] mt-0.5">
                        <span>{cat.negativeLabel}</span>
                        <span>{cat.positiveLabel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Share CTA ── */}
            <div className="bg-[#0A0A0A] text-white rounded-2xl p-6 text-center">
              <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-2">
                Spread the conversation
              </p>
              <p className="font-bold text-lg mb-1.5" style={{ fontFamily: "var(--font-outfit)" }}>
                Share your shape with someone else
              </p>
              <p className="text-[rgba(241,238,229,0.50)] text-sm mb-5 max-w-sm mx-auto">
                Send your compare link. When they open it and take the quiz, both shapes appear overlaid — geometry, not argument.
              </p>
              <button
                onClick={copyMyLink}
                className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
              >
                {copied ? "✓ Copied!" : "🔗 Copy my compare link"}
              </button>
            </div>

          </div>
        </div>
      </div>
    );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-[rgba(10,10,10,0.45)] text-sm">Loading…</p>
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}
