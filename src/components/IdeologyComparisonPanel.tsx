"use client";

import { useState } from "react";
import { IDEOLOGIES } from "@/data/ideologies";
import { IdeologyProfile } from "@/types";
import PoliticalRadarChart from "./PoliticalRadarChart";

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

  const overlays: IdeologyProfile[] = IDEOLOGIES.filter((i) =>
    selected.includes(i.id)
  );

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-[#0A0A0A] mb-1">
          Compare with example traditions
        </h3>
        <p className="text-xs text-[rgba(10,10,10,0.55)]">
          These are rough archetypes, not rigid labels. Select any to overlay on your chart.
        </p>
      </div>

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

      {selected.length > 0 && (
        <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl p-4">
          <PoliticalRadarChart
            scores={userScores}
            name="Your Shape"
            overlays={overlays}
            height={420}
          />
        </div>
      )}

      {selected.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {overlays.map((ov) => (
            <div
              key={ov.id}
              className="rounded-xl border p-4"
              style={{ borderColor: ov.color + "40", background: ov.color + "08" }}
            >
              <div
                className="font-semibold text-sm mb-1"
                style={{ color: ov.color }}
              >
                {ov.name}
              </div>
              <p className="text-xs text-[rgba(10,10,10,0.55)] mb-3">{ov.description}</p>
              <ul className="space-y-1">
                {ov.traits.map((t) => (
                  <li key={t} className="text-xs text-[rgba(10,10,10,0.70)] flex gap-1.5">
                    <span style={{ color: ov.color }}>•</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {selected.length === 0 && (
        <p className="text-sm text-[rgba(10,10,10,0.45)] text-center py-4">
          Select one or more traditions above to overlay them on your political shape.
        </p>
      )}
    </div>
  );
}
