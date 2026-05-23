"use client";

import { useState } from "react";
import { CATEGORIES } from "@/data/questions";
import { IDEOLOGIES } from "@/data/ideologies";
import { findArchetype } from "@/lib/archetypes";
import PoligonShape from "@/components/PoligonShape";

interface IdeologyComparisonPanelProps {
  userScores: Record<string, number>;
}

/** Returns 0–100 overlap between two score maps. */
function computeOverlap(
  a: Record<string, number>,
  b: Record<string, number>
): number {
  const ids = CATEGORIES.map((c) => c.id);
  // Each score is in [-1, +1], so max diff is 2. Dividing by 2 normalises to [0, 1].
  const avgAbsDiff =
    ids.reduce((sum, id) => sum + Math.abs((a[id] ?? 0) - (b[id] ?? 0)) / 2, 0) /
    ids.length;
  return Math.round((1 - avgAbsDiff) * 100);
}

export default function IdeologyComparisonPanel({
  userScores,
}: IdeologyComparisonPanelProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleIdeology = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedIdeologies = IDEOLOGIES.filter((i) => selected.includes(i.id));
  const userArchetype = findArchetype(userScores);

  // Top-4 user traits derived from their strongest dimensions
  const userTraits = [...CATEGORIES]
    .sort(
      (a, b) =>
        Math.abs(userScores[b.id] ?? 0) - Math.abs(userScores[a.id] ?? 0)
    )
    .slice(0, 4)
    .map((cat) => {
      const score = userScores[cat.id] ?? 0;
      const poleLabel = score >= 0 ? cat.positiveLabel : cat.negativeLabel;
      const strength =
        Math.abs(score) > 0.65
          ? "Strongly"
          : Math.abs(score) > 0.35
          ? "Leans"
          : "Moderate on";
      return `${strength} ${poleLabel.toLowerCase()}`;
    });

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-[#0A0A0A] mb-1">
          Compare with political ideologies
        </h3>
        <p className="text-xs text-[rgba(10,10,10,0.55)]">
          These are rough archetypes, not rigid labels. Select any to see their
          shape alongside yours — colour encoding is the same: dark wedge =
          conservative lean, light wedge = progressive lean.
        </p>
      </div>

      {/* Ideology toggle buttons */}
      <div className="flex flex-wrap gap-2">
        {IDEOLOGIES.map((ideology) => {
          const isOn = selected.includes(ideology.id);
          return (
            <button
              key={ideology.id}
              onClick={() => toggleIdeology(ideology.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-all"
              style={{
                borderColor: ideology.color,
                backgroundColor: isOn ? ideology.color : "transparent",
                color: isOn ? "#fff" : ideology.color,
              }}
            >
              {ideology.name}
            </button>
          );
        })}
      </div>

      {/* Side-by-side polygon comparison grid */}
      {selected.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* ── User's shape — reference card ── */}
          <div className="bg-[#E5E0D2] border border-[rgba(10,10,10,0.12)] rounded-2xl p-4 flex flex-col items-center text-center">
            <p className="text-[10px] font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-2">
              Your Shape
            </p>
            <div className="mb-2">
              <PoligonShape scores={userScores} size={120} />
            </div>
            <p className="text-sm font-bold text-[#0A0A0A] leading-tight">
              {userArchetype.emoji} {userArchetype.name}
            </p>
            <p className="text-[10px] text-[rgba(10,10,10,0.50)] mt-1 leading-relaxed mb-2">
              {userArchetype.description}
            </p>
            <ul className="w-full space-y-1 text-left">
              {userTraits.map((t) => (
                <li key={t} className="flex gap-1.5 text-[10px]">
                  <span className="text-[var(--color-accent)] flex-shrink-0">•</span>
                  <span className="text-[rgba(10,10,10,0.65)]">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── One card per selected ideology ── */}
          {selectedIdeologies.map((ideology) => {
            const overlap = computeOverlap(userScores, ideology.scores);
            return (
              <div
                key={ideology.id}
                className="bg-[#F1EEE5] border rounded-2xl p-4 flex flex-col items-center text-center"
                style={{ borderColor: ideology.color + "30" }}
              >
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest mb-0.5"
                  style={{ color: ideology.color }}
                >
                  {ideology.name}
                </p>
                <p className="text-[10px] text-[rgba(10,10,10,0.45)] mb-2">
                  <span className="font-semibold" style={{ color: ideology.color }}>
                    {overlap}%
                  </span>{" "}
                  overlap with you
                </p>
                <div className="mb-2">
                  <PoligonShape scores={ideology.scores} size={120} />
                </div>
                <p className="text-[10px] text-[rgba(10,10,10,0.55)] leading-relaxed mb-2">
                  {ideology.description}
                </p>
                <ul className="w-full space-y-1 text-left">
                  {ideology.traits.map((t) => (
                    <li key={t} className="flex gap-1.5 text-[10px]">
                      <span
                        style={{ color: ideology.color }}
                        className="flex-shrink-0"
                      >
                        •
                      </span>
                      <span className="text-[rgba(10,10,10,0.65)]">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {selected.length === 0 && (
        <p className="text-sm text-[rgba(10,10,10,0.45)] text-center py-4">
          Select one or more ideologies above to see their shape compared with yours.
        </p>
      )}
    </div>
  );
}
