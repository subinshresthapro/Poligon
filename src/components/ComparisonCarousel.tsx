"use client";

import { useState, useEffect, useRef } from "react";
import PoligonShape from "@/components/PoligonShape";

type Scores = Record<string, number>;

const CATEGORY_KEYS = [
  "immigration", "government", "economy", "healthcare", "education",
  "environment", "civilLiberties", "foreignPolicy", "technology", "social",
] as const;

function cosineSimilarity(a: Scores, b: Scores): number {
  let dot = 0, magA = 0, magB = 0;
  for (const k of CATEGORY_KEYS) {
    const va = a[k] ?? 0;
    const vb = b[k] ?? 0;
    dot += va * vb;
    magA += va * va;
    magB += vb * vb;
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function overlapPercent(a: Scores, b: Scores): number {
  return Math.round(((cosineSimilarity(a, b) + 1) / 2) * 100);
}

const PAIRINGS = [
  {
    nameA: "Bernie Sanders",
    nameB: "Rand Paul",
    scoresA: {
      immigration: 0.9, government: 1.0, economy: 1.0, healthcare: 1.0,
      education: 0.8, environment: 0.9, civilLiberties: 0.7, foreignPolicy: -0.8,
      technology: 0.6, social: 0.9,
    },
    scoresB: {
      immigration: -0.7, government: -1.0, economy: -0.9, healthcare: -0.8,
      education: -0.6, environment: -0.5, civilLiberties: 0.8, foreignPolicy: -0.7,
      technology: -0.6, social: -0.5,
    },
    dimensions: "War & Peace, Civil Lib., Economy",
  },
  {
    nameA: "AOC",
    nameB: "Gary Johnson",
    scoresA: {
      immigration: 1.0, government: 1.0, economy: 1.0, healthcare: 1.0,
      education: 0.9, environment: 1.0, civilLiberties: 0.9, foreignPolicy: 0.6,
      technology: 0.8, social: 1.0,
    },
    scoresB: {
      immigration: 0.6, government: -1.0, economy: -1.0, healthcare: -0.8,
      education: -0.7, environment: -0.3, civilLiberties: 1.0, foreignPolicy: 0.4,
      technology: -0.4, social: 0.7,
    },
    dimensions: "Civil Lib., Technology, Social",
  },
  {
    nameA: "Env. Progressive",
    nameB: "Rel. Conservative",
    scoresA: {
      immigration: 0.8, government: 0.9, economy: 0.8, healthcare: 1.0,
      education: 0.9, environment: 1.0, civilLiberties: 0.8, foreignPolicy: 0.3,
      technology: 0.7, social: 0.6,
    },
    scoresB: {
      immigration: -0.6, government: -0.7, economy: -0.8, healthcare: -0.3,
      education: -0.5, environment: -0.2, civilLiberties: -0.4, foreignPolicy: -0.5,
      technology: -0.5, social: 0.7,
    },
    dimensions: "Social, Civil Lib., Healthcare",
  },
];

export default function ComparisonCarousel() {
  const [active, setActive] = useState(0);
  // autoKey bumps on manual navigation to restart the 4-second timer cleanly
  const [autoKey, setAutoKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = PAIRINGS.length;

  // Auto-advance: restarts whenever paused changes or user manually navigates
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused, count, autoKey]);

  function go(i: number) {
    if (i === active) return;
    setActive(i);
    setAutoKey((k) => k + 1); // reset the 4-second countdown
  }

  const prev = () => go((active - 1 + count) % count);
  const next = () => go((active + 1) % count);

  const pairing = PAIRINGS[active];
  const overlap = overlapPercent(pairing.scoresA, pairing.scoresB);

  return (
    <section className="py-16 sm:py-20 bg-[#F1EEE5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Eyebrow + headline */}
        <p
          className="text-[10px] font-semibold uppercase tracking-widest text-[rgba(10,10,10,0.40)] mb-2"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Did you know?
        </p>
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-10"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          They agree more than you think
        </h2>

        {/* Carousel card */}
        <div
          className="bg-white border border-[rgba(10,10,10,0.08)] rounded-2xl p-6 sm:p-8 max-w-sm mx-auto shadow-sm"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* Polygons + names */}
          <div className="flex items-center justify-center gap-3 mb-5">
            {/* Person A */}
            <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
              <PoligonShape scores={pairing.scoresA} size={108} variant="abstract" />
              <span className="text-sm font-medium text-[#0A0A0A] text-center leading-tight">
                {pairing.nameA}
              </span>
            </div>

            {/* vs separator */}
            <span className="text-[rgba(10,10,10,0.28)] text-xs font-medium flex-shrink-0">vs</span>

            {/* Person B */}
            <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
              <PoligonShape scores={pairing.scoresB} size={108} variant="abstract" />
              <span className="text-sm font-medium text-[#0A0A0A] text-center leading-tight">
                {pairing.nameB}
              </span>
            </div>
          </div>

          {/* Overlap % — prominent display */}
          <div className="text-center mb-3">
            <span
              className="text-5xl font-bold leading-none"
              style={{ color: "var(--color-accent)", fontFamily: "var(--font-outfit)" }}
            >
              {overlap}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#E5E0D2] rounded-full h-1.5 overflow-hidden mb-3">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${overlap}%`, background: "var(--color-accent)" }}
            />
          </div>

          {/* Dimension label */}
          <p className="text-xs text-[rgba(10,10,10,0.42)] text-center leading-relaxed">
            shape overlap · {pairing.dimensions}
          </p>
        </div>

        {/* Navigation: arrows + dots */}
        <div className="flex items-center justify-center gap-5 mt-6">
          <button
            onClick={prev}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(10,10,10,0.15)] hover:bg-[#E5E0D2] transition-colors text-[rgba(10,10,10,0.55)] text-lg leading-none"
            aria-label="Previous pairing"
          >
            ‹
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {PAIRINGS.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Show pairing ${i + 1}`}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "20px" : "8px",
                  minWidth: "8px",
                  background:
                    i === active
                      ? "var(--color-accent)"
                      : "rgba(10,10,10,0.22)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(10,10,10,0.15)] hover:bg-[#E5E0D2] transition-colors text-[rgba(10,10,10,0.55)] text-lg leading-none"
            aria-label="Next pairing"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
