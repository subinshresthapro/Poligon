"use client";

import { IDEOLOGIES } from "@/data/ideologies";
import { shapeScore } from "@/lib/scoring";
import PoliticalRadarChart from "./PoliticalRadarChart";

export default function IdeologyGallery() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Can we represent traditional ideologies?
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Yes — each tradition tends to have a characteristic shape. These are rough archetypes, not hard labels.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {IDEOLOGIES.map((ideology) => {
            const avg = shapeScore(ideology.scores);
            return (
              <div
                key={ideology.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3
                  className="text-sm font-bold text-center mb-1"
                  style={{ color: ideology.color }}
                >
                  {ideology.name}
                </h3>
                <p className="text-xs text-slate-500 text-center mb-2 leading-snug">
                  {ideology.description.split("—")[0].trim()}
                </p>

                <div className="h-40 pointer-events-none">
                  <PoliticalRadarChart
                    scores={ideology.scores}
                    name={ideology.name}
                    compact
                    height={160}
                  />
                </div>

                <ul className="mt-2 space-y-0.5">
                  {ideology.traits.slice(0, 3).map((t) => (
                    <li key={t} className="text-xs text-slate-500 flex gap-1">
                      <span style={{ color: ideology.color }}>•</span>
                      <span className="leading-snug">{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 text-center">
                  <span className="text-xs text-slate-400">
                    Shape score:{" "}
                    <span className="font-mono font-semibold text-slate-600">
                      {avg >= 0 ? "+" : ""}
                      {avg.toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
