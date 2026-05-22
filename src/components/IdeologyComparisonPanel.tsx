"use client";

import { useState } from "react";
import { IDEOLOGIES } from "@/data/ideologies";
import { findArchetype } from "@/lib/archetypes";
import PoligonShape from "@/components/PoligonShape";

interface IdeologyComparisonPanelProps {
  userScores: Record<string, number>;
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

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-[#0A0A0A] mb-1">
          Compare with example traditions
        </h3>
        <p className="text-xs text-[rgba(10,10,10,0.55)]">
          These are rough archetypes, not rigid labels. Select any to see their
          shape alongside yours — colour encoding is the same: dark wedge = conservative
          lean, light wedge = progressive lean.
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
            <p className="text-[10px] font-semibold text-[#5560C8] uppercase tracking-widest mb-2">
              Your Shape
            </p>
            <div className="mb-2">
              <PoligonShape scores={userScores} size={120} />
            </div>
            <p className="text-sm font-bold text-[#0A0A0A] leading-tight">
              {userArchetype.emoji} {userArchetype.name}
            </p>
            <p className="text-[10px] text-[rgba(10,10,10,0.50)] mt-1 leading-relaxed">
              {userArchetype.description}
            </p>
          </div>

          {/* ── One card per selected ideology ── */}
          {selectedIdeologies.map((ideology) => (
            <div
              key={ideology.id}
              className="bg-[#F1EEE5] border rounded-2xl p-4 flex flex-col items-center text-center"
              style={{ borderColor: ideology.color + "30" }}
            >
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: ideology.color }}
              >
                {ideology.name}
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
                    <span style={{ color: ideology.color }} className="flex-shrink-0">•</span>
                    <span className="text-[rgba(10,10,10,0.65)]">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {selected.length === 0 && (
        <p className="text-sm text-[rgba(10,10,10,0.45)] text-center py-4">
          Select one or more traditions above to see their shape compared with yours.
        </p>
      )}
    </div>
  );
}
