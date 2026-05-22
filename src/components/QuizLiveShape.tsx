"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/questions";
import { Answers } from "@/types";
import { findArchetype } from "@/lib/archetypes";
import PoligonShape from "./PoligonShape";

interface Props {
  answers: Answers;
  isComplete: boolean;
  /** Number of fully-answered categories — used to detect milestone completions */
  completedCategoryCount: number;
  /** Smaller layout for the mobile top card */
  compact?: boolean;
}

/**
 * Compute live scores from partial answers.
 *
 * - Unanswered categories  →  0  (no spoke — abs(0) = 0, so the wedge is hidden)
 * - Partially answered     →  running average of answered questions so far
 * - Fully answered         →  full signed average
 *
 * Respects reverseScore on C-framed questions so the live polygon correctly
 * shows progressive vs conservative direction as the user answers.
 */
function computeLiveScores(answers: Answers): Record<string, number> {
  const scores: Record<string, number> = {};
  for (const cat of CATEGORIES) {
    const answered = cat.questions.filter((q) => answers[q.id] !== undefined);
    if (answered.length === 0) {
      scores[cat.id] = 0; // no spoke yet
    } else {
      const sum = answered.reduce((acc, q) => {
        const val = answers[q.id] as number;
        return acc + (q.reverseScore ? -val : val);
      }, 0);
      scores[cat.id] = sum / answered.length / 2;
    }
  }
  return scores;
}

export default function QuizLiveShape({
  answers,
  isComplete,
  completedCategoryCount,
  compact = false,
}: Props) {
  const scores = computeLiveScores(answers);
  const prevCount = useRef(completedCategoryCount);
  const [milestone, setMilestone] = useState(false);

  // Fire the milestone animation whenever a full category is completed
  useEffect(() => {
    if (completedCategoryCount > prevCount.current) {
      setMilestone(true);
      const t = setTimeout(() => setMilestone(false), 700);
      prevCount.current = completedCategoryCount;
      return () => clearTimeout(t);
    }
    prevCount.current = completedCategoryCount;
  }, [completedCategoryCount]);

  const archetype = isComplete ? findArchetype(scores) : null;
  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = CATEGORIES.reduce((sum, c) => sum + c.questions.length, 0);

  const polySize = compact ? 140 : 200;

  return (
    <div
      className="bg-[#F1EEE5] border rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        borderColor: milestone ? "rgba(85,96,200,0.5)" : "rgba(10,10,10,0.12)",
        boxShadow: milestone
          ? "0 0 0 4px rgba(85,96,200,0.15), 0 2px 8px rgba(10,10,10,0.06)"
          : "0 1px 4px rgba(10,10,10,0.04)",
      }}
    >
      {/* Polygon area */}
      <div
        className="flex items-center justify-center bg-[#E5E0D2] transition-transform duration-500"
        style={{
          paddingTop: compact ? 16 : 20,
          paddingBottom: compact ? 16 : 20,
          transform: milestone ? "scale(1.025)" : "scale(1)",
        }}
      >
        <div
          style={{
            transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            transform: milestone ? "scale(1.07)" : "scale(1)",
          }}
        >
          <PoligonShape scores={scores} size={polySize} />
        </div>
      </div>

      {/* Text content */}
      <div className={`text-center ${compact ? "px-4 py-3" : "px-5 py-4"}`}>
        {isComplete ? (
          /* ── Completed state ── */
          <>
            <p className="text-[10px] font-semibold text-[#5560C8] uppercase tracking-widest mb-1">
              Your archetype
            </p>
            <p
              className="font-bold text-[#0A0A0A] mb-1 leading-tight"
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: compact ? 16 : 20,
              }}
            >
              {archetype!.emoji} {archetype!.name}
            </p>
            <p
              className="text-[rgba(10,10,10,0.55)] leading-relaxed mb-4"
              style={{ fontSize: compact ? 11 : 12 }}
            >
              {archetype!.description}
            </p>
            <Link
              href="/results"
              className="block w-full bg-[#5560C8] hover:bg-[#4450B2] text-white font-semibold rounded-xl transition-colors text-center"
              style={{ fontSize: compact ? 12 : 13, padding: compact ? "8px 0" : "10px 0" }}
            >
              View My Results →
            </Link>
          </>
        ) : totalAnswered === 0 ? (
          /* ── Empty state ── */
          <>
            <p
              className="font-bold text-[#0A0A0A] mb-1 leading-tight"
              style={{ fontFamily: "var(--font-outfit)", fontSize: compact ? 13 : 15 }}
            >
              What is your shape?
            </p>
            <p className="text-[rgba(10,10,10,0.55)] leading-relaxed"
              style={{ fontSize: compact ? 10 : 11 }}>
              Ten dimensions. Forty questions.
              <br />A polygon that&apos;s uniquely yours.
            </p>
          </>
        ) : (
          /* ── In-progress state ── */
          <>
            <div className="flex items-center justify-center gap-1.5 mb-1.5">
              {/* Mini category-completion dots */}
              {CATEGORIES.map((cat) => {
                const done = cat.questions.every((q) => answers[q.id] !== undefined);
                const started = cat.questions.some((q) => answers[q.id] !== undefined);
                return (
                  <div
                    key={cat.id}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: 6,
                      height: 6,
                      background: done
                        ? "#5560C8"
                        : started
                        ? "rgba(85,96,200,0.35)"
                        : "rgba(10,10,10,0.12)",
                    }}
                  />
                );
              })}
            </div>
            <p
              className="font-semibold text-[#0A0A0A] mb-0.5"
              style={{ fontSize: compact ? 11 : 12 }}
            >
              {completedCategoryCount} / {CATEGORIES.length} categories done
            </p>
            <p className="text-[rgba(10,10,10,0.45)]" style={{ fontSize: 10 }}>
              {completedCategoryCount === 0
                ? "Your shape is forming..."
                : completedCategoryCount < 5
                ? "Keep going — it's taking shape."
                : completedCategoryCount < 9
                ? "Almost there. Looking interesting."
                : "One more to go!"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
