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
    const va = a[k] ?? 0, vb = b[k] ?? 0;
    dot += va * vb; magA += va * va; magB += vb * vb;
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function overlapPercent(a: Scores, b: Scores): number {
  return Math.round(((cosineSimilarity(a, b) + 1) / 2) * 100);
}

// ── Pairings data ──────────────────────────────────────────────────────────
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
    dimensions: "War & Peace, Civil Lib.",
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
    dimensions: "Civil Lib., Social",
  },
  {
    nameA: "Tulsi Gabbard",
    nameB: "Ron Paul",
    scoresA: {
      immigration: 0.0, government: -0.3, economy: 0.3, healthcare: 0.6,
      education: 0.4, environment: 0.6, civilLiberties: 0.9, foreignPolicy: -1.0,
      technology: -0.2, social: 0.1,
    },
    scoresB: {
      immigration: -0.5, government: -1.0, economy: -1.0, healthcare: -1.0,
      education: -0.9, environment: -0.8, civilLiberties: 1.0, foreignPolicy: -1.0,
      technology: -0.8, social: -0.7,
    },
    dimensions: "Foreign Policy, Civil Lib.",
  },
  {
    nameA: "Joe Manchin",
    nameB: "Lisa Murkowski",
    scoresA: {
      immigration: -0.3, government: -0.5, economy: 0.2, healthcare: 0.2,
      education: 0.3, environment: -0.4, civilLiberties: 0.3, foreignPolicy: -0.3,
      technology: 0.1, social: -0.1,
    },
    scoresB: {
      immigration: 0.0, government: -0.5, economy: -0.3, healthcare: 0.3,
      education: 0.3, environment: 0.3, civilLiberties: 0.5, foreignPolicy: -0.2,
      technology: 0.2, social: 0.3,
    },
    dimensions: "Govt., Education, Healthcare",
  },
  {
    nameA: "Mike Bloomberg",
    nameB: "John Kasich",
    scoresA: {
      immigration: 0.5, government: -0.3, economy: 0.0, healthcare: 0.5,
      education: 0.5, environment: 0.8, civilLiberties: 0.2, foreignPolicy: 0.1,
      technology: 0.5, social: 0.5,
    },
    scoresB: {
      immigration: 0.2, government: -0.6, economy: -0.4, healthcare: 0.3,
      education: 0.2, environment: 0.2, civilLiberties: 0.3, foreignPolicy: -0.2,
      technology: 0.1, social: 0.3,
    },
    dimensions: "Healthcare, Immigration, Social",
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
    dimensions: "Social, Healthcare",
  },
];

// On desktop show 3 cards at once; mobile shows 1
const VISIBLE_DESKTOP = 3;
const VISIBLE_MOBILE = 1;

export default function ComparisonCarousel() {
  const [active, setActive] = useState(0);
  const [autoKey, setAutoKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(VISIBLE_MOBILE); // safe SSR default
  const [cardWidth, setCardWidth] = useState(0);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const count = PAIRINGS.length;
  const maxActive = Math.max(0, count - visibleCount);

  // Detect breakpoint + measure card width
  useEffect(() => {
    const update = () => {
      const vc = window.innerWidth >= 1024 ? VISIBLE_DESKTOP : VISIBLE_MOBILE;
      setVisibleCount(vc);
      if (firstCardRef.current) {
        setCardWidth(firstCardRef.current.offsetWidth);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (firstCardRef.current) ro.observe(firstCardRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // Clamp active index when visibleCount changes
  useEffect(() => {
    setActive((prev) => Math.min(prev, Math.max(0, count - visibleCount)));
  }, [visibleCount, count]);

  // Auto-advance — restarts on manual navigation (autoKey) or pause state change
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev >= count - visibleCount ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [paused, count, visibleCount, autoKey]);

  function go(i: number) {
    setActive(Math.max(0, Math.min(i, maxActive)));
    setAutoKey((k) => k + 1);
  }

  const prev = () => go(active <= 0 ? maxActive : active - 1);
  const next = () => go(active >= maxActive ? 0 : active + 1);

  // Translate the track in px (cardWidth includes slot padding via offsetWidth)
  const translateX = cardWidth > 0 ? -(active * cardWidth) : 0;

  return (
    <section
      className="py-14 sm:py-20 bg-[#F1EEE5] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* Eyebrow + headline — indented to align with first card content */}
      <div className="pl-5 sm:pl-8 lg:pl-10 pr-4 mb-8">
        <p
          className="text-[10px] font-semibold uppercase tracking-widest text-[rgba(10,10,10,0.40)] mb-2"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Did you know?
        </p>
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#0A0A0A]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          They agree more than you think
        </h2>
      </div>

      {/* Carousel track — clips at right edge, cards peek off screen */}
      <div className="overflow-hidden pl-3 sm:pl-5 lg:pl-6">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {PAIRINGS.map((pairing, i) => {
            const overlap = overlapPercent(pairing.scoresA, pairing.scoresB);
            return (
              <div
                key={i}
                ref={i === 0 ? firstCardRef : undefined}
                // Mobile: full width | Desktop: 1/3 of container
                // pr provides the gap between cards
                className="flex-shrink-0 w-full lg:w-1/3 pr-3 sm:pr-5 lg:pr-6"
              >
                <div className="bg-white border border-[rgba(10,10,10,0.08)] rounded-2xl p-5 sm:p-6 shadow-sm">
                  {/* Polygons + names */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                      <PoligonShape scores={pairing.scoresA} size={96} variant="abstract" />
                      <span className="text-xs font-semibold text-[#0A0A0A] text-center leading-tight">
                        {pairing.nameA}
                      </span>
                    </div>
                    <span className="text-[rgba(10,10,10,0.25)] text-xs font-medium flex-shrink-0 px-1">
                      vs
                    </span>
                    <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                      <PoligonShape scores={pairing.scoresB} size={96} variant="abstract" />
                      <span className="text-xs font-semibold text-[#0A0A0A] text-center leading-tight">
                        {pairing.nameB}
                      </span>
                    </div>
                  </div>

                  {/* Overlap % — large prominent number */}
                  <div className="text-center mb-2.5">
                    <span
                      className="text-4xl font-bold leading-none"
                      style={{ color: "var(--color-accent)", fontFamily: "var(--font-outfit)" }}
                    >
                      {overlap}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[#E5E0D2] rounded-full h-1.5 overflow-hidden mb-2.5">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${overlap}%`, background: "var(--color-accent)" }}
                    />
                  </div>

                  {/* Dimension label */}
                  <p className="text-[11px] text-[rgba(10,10,10,0.42)] text-center leading-relaxed">
                    shape overlap · {pairing.dimensions}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation: arrows + dot indicators */}
      <div className="pl-5 sm:pl-8 lg:pl-10 pr-4 mt-6 flex items-center gap-5">
        <button
          onClick={prev}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(10,10,10,0.15)] hover:bg-[#E5E0D2] transition-colors text-[rgba(10,10,10,0.55)] text-lg leading-none flex-shrink-0"
          aria-label="Previous"
        >
          ‹
        </button>

        {/* Dots — one per possible position (count − visibleCount + 1) */}
        <div className="flex items-center gap-2 flex-1">
          {Array.from({ length: maxActive + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="h-2 rounded-full transition-all duration-300 flex-shrink-0"
              style={{
                width: i === active ? "20px" : "8px",
                background:
                  i === active ? "var(--color-accent)" : "rgba(10,10,10,0.22)",
              }}
              aria-label={`Go to position ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(10,10,10,0.15)] hover:bg-[#E5E0D2] transition-colors text-[rgba(10,10,10,0.55)] text-lg leading-none flex-shrink-0"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </section>
  );
}
