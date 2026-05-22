"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/questions";
import { Answers } from "@/types";
import { findArchetype } from "@/lib/archetypes";
import PoligonShape from "./PoligonShape";

function computeLiveScores(answers: Answers): Record<string, number> {
  const scores: Record<string, number> = {};
  for (const cat of CATEGORIES) {
    const answered = cat.questions.filter((q) => answers[q.id] !== undefined);
    if (answered.length === 0) {
      scores[cat.id] = 0; // abs(0) = no spoke yet
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

interface Props {
  answers: Answers;
  isComplete: boolean;
  completedCategoryCount: number;
  totalAnswered: number;
  /** Called when the user taps the FAB — should scroll to top of page */
  onTap: () => void;
}

/**
 * Fixed bottom-right floating polygon — mobile only (hidden on lg+).
 * Appears after the first answer and stays visible throughout the quiz.
 */
export default function QuizFloatingShape({
  answers,
  isComplete,
  completedCategoryCount,
  totalAnswered,
  onTap,
}: Props) {
  const scores = computeLiveScores(answers);
  const archetype = isComplete ? findArchetype(scores) : null;

  const prevAnswered = useRef(totalAnswered);
  const prevCompleted = useRef(completedCategoryCount);

  const [answerPulse, setAnswerPulse] = useState(false);
  const [milestonePulse, setMilestonePulse] = useState(false);

  // Subtle scale on every new answer
  useEffect(() => {
    if (totalAnswered > prevAnswered.current) {
      setAnswerPulse(true);
      const t = setTimeout(() => setAnswerPulse(false), 380);
      prevAnswered.current = totalAnswered;
      return () => clearTimeout(t);
    }
    prevAnswered.current = totalAnswered;
  }, [totalAnswered]);

  // Bigger spring bounce + glow ring on category completion
  useEffect(() => {
    if (completedCategoryCount > prevCompleted.current) {
      setMilestonePulse(true);
      const t = setTimeout(() => setMilestonePulse(false), 750);
      prevCompleted.current = completedCategoryCount;
      return () => clearTimeout(t);
    }
    prevCompleted.current = completedCategoryCount;
  }, [completedCategoryCount]);

  // Don't mount until there's something to show
  if (totalAnswered === 0) return null;

  const containerStyle: React.CSSProperties = {
    width: 92,
    background: "#F1EEE5",
    borderRadius: 16,
    overflow: "hidden",
    border: `1.5px solid ${
      milestonePulse ? "rgba(85,96,200,0.55)" : "rgba(10,10,10,0.12)"
    }`,
    boxShadow: milestonePulse
      ? "0 0 0 5px rgba(85,96,200,0.18), 0 8px 28px rgba(10,10,10,0.14)"
      : "0 4px 18px rgba(10,10,10,0.10)",
    transform: milestonePulse
      ? "scale(1.06)"
      : answerPulse
      ? "scale(1.025)"
      : "scale(1)",
    transition:
      "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.35s ease",
  };

  const polygonWrapStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#E5E0D2",
    padding: "10px 10px 8px",
    transform: milestonePulse ? "scale(1.09)" : "scale(1)",
    transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
  };

  const inner = (
    <div style={containerStyle}>
      {/* Polygon */}
      <div style={polygonWrapStyle}>
        <PoligonShape scores={scores} size={64} />
      </div>

      {/* Footer label */}
      <div style={{ padding: "6px 8px 8px", textAlign: "center" }}>
        {isComplete ? (
          <>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#5560C8", lineHeight: 1.2 }}>
              {archetype!.emoji} {archetype!.name}
            </p>
            <p style={{ fontSize: 8, color: "rgba(10,10,10,0.45)", marginTop: 2 }}>
              tap to view
            </p>
          </>
        ) : (
          <>
            {/* 10-dot category progress */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                marginBottom: 4,
              }}
            >
              {CATEGORIES.map((cat) => {
                const done = cat.questions.every((q) => answers[q.id] !== undefined);
                const started = cat.questions.some((q) => answers[q.id] !== undefined);
                return (
                  <div
                    key={cat.id}
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: done
                        ? "#5560C8"
                        : started
                        ? "rgba(85,96,200,0.4)"
                        : "rgba(10,10,10,0.12)",
                      transition: "background 0.3s ease",
                    }}
                  />
                );
              })}
            </div>
            <p style={{ fontSize: 9, color: "rgba(10,10,10,0.55)", lineHeight: 1.3 }}>
              {completedCategoryCount}/{CATEGORIES.length} done
            </p>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed top-20 right-4 z-40 lg:hidden">
      {isComplete ? (
        // When complete, tap goes to results page
        <Link href="/results" aria-label="View your results">
          {inner}
        </Link>
      ) : (
        // When in progress, tap scrolls to top to see main card
        <button onClick={onTap} aria-label="Scroll up to see your shape">
          {inner}
        </button>
      )}
    </div>
  );
}
