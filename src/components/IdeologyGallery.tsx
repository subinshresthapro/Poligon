"use client";

import { IDEOLOGIES } from "@/data/ideologies";
import { shapeScore } from "@/lib/scoring";
import PoligonShape from "./PoligonShape";

export default function IdeologyGallery() {
  return (
    <section className="py-16 bg-[#E5E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#0A0A0A] mb-2">
            Can we represent traditional ideologies?
          </h2>
          <p className="text-[rgba(10,10,10,0.55)] text-sm max-w-xl mx-auto">
            Yes — each tradition tends to have a characteristic shape. These are rough archetypes, not hard labels.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {IDEOLOGIES.map((ideology) => {
            const avg = shapeScore(ideology.scores);
            return (
              <div
                key={ideology.id}
                className="bg-[#F1EEE5] rounded-2xl border border-[rgba(10,10,10,0.12)] p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Title */}
                <h3
                  className="text-sm font-bold text-center mb-1 leading-snug"
                  style={{ color: ideology.color }}
                >
                  {ideology.name}
                </h3>
                <p className="text-xs text-[rgba(10,10,10,0.55)] text-center mb-2 leading-snug line-clamp-2">
                  {ideology.description.split("—")[0].trim()}
                </p>

                {/* Shape */}
                <div className="w-full flex items-center justify-center py-1">
                  <PoligonShape scores={ideology.scores} size={110} />
                </div>

                {/* Traits */}
                <ul className="mt-2 space-y-0.5 flex-1">
                  {ideology.traits.slice(0, 3).map((t) => (
                    <li key={t} className="text-xs text-[rgba(10,10,10,0.55)] flex gap-1 leading-snug">
                      <span className="flex-shrink-0" style={{ color: ideology.color }}>•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                {/* Shape score */}
                <div className="mt-2 pt-2 border-t border-[rgba(10,10,10,0.08)] text-center">
                  <span className="text-xs text-[rgba(10,10,10,0.45)]">
                    Shape score:{" "}
                    <span className="font-mono font-semibold text-[rgba(10,10,10,0.70)]">
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
