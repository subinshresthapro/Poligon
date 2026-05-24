"use client";

import { useEffect, useState } from "react";
import { hasSavedScores } from "@/lib/storage";
import { POLITICIANS } from "@/data/politicians";
import { useGeoState } from "@/hooks/useGeoState";
import { getLocalPoliticians } from "@/data/statePoliticians";

const PARTY_COLOR: Record<string, string> = {
  "Democrat": "#2563eb",
  "Democrat / Democratic Socialist": "#7c3aed",
  "Independent / Democratic Socialist": "#7c3aed",
  "Republican": "#dc2626",
  "Republican / Libertarian": "#d97706",
};

function partyColor(party: string) {
  return PARTY_COLOR[party] ?? "#6366f1";
}

export default function PoliticianTeaser() {
  const [unlocked, setUnlocked] = useState(false);
  const { stateCode } = useGeoState();
  const localPoliticians = stateCode ? getLocalPoliticians(stateCode) : [];

  useEffect(() => {
    if (hasSavedScores()) setUnlocked(true);
  }, []);

  const scrollToSection = () => {
    document.getElementById("politicians-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <button
      onClick={scrollToSection}
      className="w-full text-left group"
      aria-label="Scroll to real politician shapes"
    >
      <div className={`rounded-2xl border px-4 py-3.5 flex items-center gap-4 transition-all hover:shadow-md ${
        unlocked
          ? "bg-[#E5E0D2] border-[rgba(10,10,10,0.12)] hover:border-indigo-400"
          : "bg-[#E5E0D2] border-[rgba(10,10,10,0.12)] hover:border-[rgba(10,10,10,0.12)]"
      }`}>
        {/* Avatar row */}
        <div className="flex -space-x-2 flex-shrink-0">
          {POLITICIANS.slice(0, 4).map((p) => (
            <div
              key={p.id}
              className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: partyColor(p.party) }}
              title={p.name}
            >
              {p.name.split(" ").pop()?.charAt(0)}
            </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center text-[rgba(10,10,10,0.70)] text-xs font-bold flex-shrink-0">
            +{POLITICIANS.length - 4}
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          {unlocked ? (
            <>
              <p className="text-sm font-semibold text-[var(--color-accent-deep)] leading-snug">
                Real politician shapes are below ↓
              </p>
              {localPoliticians.length > 0 && (
                <p className="text-xs text-[var(--color-accent)] mt-0.5 truncate">
                  📍 {localPoliticians.map((p) => p.name).join(" · ")}
                </p>
              )}
              <p className="text-xs text-[rgba(10,10,10,0.45)] mt-0.5 truncate">
                Sanders · AOC · Obama · Romney · Ron Paul · Trump
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-[#0A0A0A] leading-snug">
                🔒 Real politician shapes are below — take the quiz to unlock
              </p>
              {localPoliticians.length > 0 && (
                <p className="text-xs text-[rgba(10,10,10,0.45)] mt-0.5 truncate">
                  📍 {localPoliticians.map((p) => p.name).join(" · ")} + national figures
                </p>
              )}
              {localPoliticians.length === 0 && (
                <p className="text-xs text-[rgba(10,10,10,0.45)] mt-0.5 truncate">
                  Sanders · AOC · Obama · Romney · Ron Paul · Trump
                </p>
              )}
            </>
          )}
        </div>

        {/* Arrow */}
        <span className={`text-lg flex-shrink-0 transition-transform group-hover:translate-y-0.5 ${
          unlocked ? "text-[var(--color-accent)]" : "text-[rgba(10,10,10,0.45)]"
        }`}>
          ↓
        </span>
      </div>
    </button>
  );
}
