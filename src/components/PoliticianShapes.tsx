"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { POLITICIANS } from "@/data/politicians";
import { shapeScore } from "@/lib/scoring";
import { hasSavedScores } from "@/lib/storage";
import PoligonShape from "./PoligonShape";

const PARTY_COLOR: Record<string, string> = {
  "Democrat": "#2563eb",
  "Democrat / Democratic Socialist": "#7c3aed",
  "Independent / Democratic Socialist": "#7c3aed",
  "Republican": "#dc2626",
  "Republican / Libertarian": "#d97706",
};

function partyColor(party: string): string {
  return PARTY_COLOR[party] ?? "#6366f1";
}

export default function PoliticianShapes() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    // Only unlock after mount so the lock screen is always the SSR default —
    // prevents the static page from ever shipping an "unlocked" state.
    if (hasSavedScores()) setUnlocked(true);
  }, []);

  if (!unlocked) {
    return (
      <section id="politicians-section" className="py-16 bg-[#F1EEE5] border-t border-[rgba(10,10,10,0.12)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[rgba(10,10,10,0.06)] rounded-2xl text-3xl mb-4">
              🔒
            </div>
            <h2
              className="text-2xl font-bold text-[#0A0A0A] mb-3"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              See the shapes of real politicians
            </h2>
            <p className="text-[rgba(10,10,10,0.55)] text-sm max-w-md mx-auto mb-6 leading-relaxed">
              We&apos;ve estimated political shapes for 6 well-known politicians based on their
              public voting records and stated positions. Take the quiz first to unlock — and
              see how your shape compares.
            </p>
            <div className="flex gap-3 justify-center flex-wrap text-sm text-[rgba(10,10,10,0.45)] mb-6">
              {POLITICIANS.map((p) => (
                <span key={p.id} className="flex items-center gap-1.5 bg-[#E5E0D2] border border-[rgba(10,10,10,0.12)] px-3 py-1 rounded-full">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: partyColor(p.party) }}
                  />
                  {p.name}
                </span>
              ))}
            </div>
            <Link
              href="/quiz"
              className="inline-block bg-[#5560C8] hover:bg-[#4450B2] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Take the Quiz to Unlock →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="politicians-section" className="py-16 bg-[#F1EEE5] border-t border-[rgba(10,10,10,0.12)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-4">
          <h2
            className="text-2xl font-bold text-[#0A0A0A] mb-2"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Real politician shapes
          </h2>
          <p className="text-[rgba(10,10,10,0.55)] text-sm max-w-xl mx-auto">
            Estimated from publicly available voting records, policy platforms, and political
            science research. These are approximations for educational comparison only.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 text-center max-w-3xl mx-auto">
          <strong>Note:</strong> Scores are approximations derived from voting records (GovTrack, VoteSmart),
          published platforms, and Pew Research Center analysis. They are intended for
          educational comparison only and do not represent an endorsement of any political position.
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {POLITICIANS.map((politician) => {
            const avg = shapeScore(politician.scores);
            const color = partyColor(politician.party);
            return (
              <div
                key={politician.id}
                className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden"
              >
                {/* Color accent bar */}
                <div className="h-1 w-full" style={{ background: color }} />

                <div className="p-3 flex flex-col flex-1">
                  <h3
                    className="text-sm font-bold text-center mb-0.5 leading-snug"
                    style={{ color }}
                  >
                    {politician.name}
                  </h3>
                  <p className="text-xs text-[rgba(10,10,10,0.45)] text-center mb-2 leading-snug line-clamp-2">
                    {politician.title}
                  </p>

                  {/* Shape */}
                  <div className="w-full flex items-center justify-center py-1">
                    <PoligonShape scores={politician.scores} size={110} />
                  </div>

                  {/* Score badge */}
                  <div className="mt-2 text-center">
                    <span className="text-xs text-[rgba(10,10,10,0.45)]">
                      Shape score:{" "}
                      <span className="font-mono font-semibold text-[rgba(10,10,10,0.70)]">
                        {avg >= 0 ? "+" : ""}
                        {avg.toFixed(2)}
                      </span>
                    </span>
                  </div>

                  {/* Party */}
                  <div className="mt-1.5 text-center">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: color + "18",
                        color,
                      }}
                    >
                      {politician.party.split(" / ")[0]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-[rgba(10,10,10,0.45)] mt-6">
          Go to{" "}
          <Link href="/results" className="text-[#5560C8] hover:underline">
            My Shape
          </Link>{" "}
          to compare your results against these profiles.
        </p>
      </div>
    </section>
  );
}
