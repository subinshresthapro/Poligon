import { describe, expect, it } from "vitest";

import { CATEGORIES } from "@/data/questions";
import {
  answersToScores,
  calculateCategoryScores,
  convictionPercent,
  decodeScores,
  encodeScores,
  leanLabel,
  leanLabelStyle,
  scoreLabel,
  scoreLabelColor,
  scoresToCategoryScores,
  shapeScore,
} from "@/lib/scoring";
import { Answers, ScoreValue } from "@/types";

function answersForAxis(score: 1 | -1 | 0): Answers {
  return Object.fromEntries(
    CATEGORIES.flatMap((category) =>
      category.questions.map((question) => {
        if (score === 0) return [question.id, 0];
        const value = question.reverseScore ? -2 * score : 2 * score;
        return [question.id, value as ScoreValue];
      })
    )
  );
}

describe("calculateCategoryScores", () => {
  it("returns every category with zero scores when no answers exist", () => {
    const scores = calculateCategoryScores({});

    expect(scores).toHaveLength(CATEGORIES.length);
    expect(scores.map((score) => score.categoryId)).toEqual(
      CATEGORIES.map((category) => category.id)
    );
    expect(scores.every((score) => score.score === 0)).toBe(true);
  });

  it("maps a consistently reform answer pattern to +1 on every axis", () => {
    const scores = calculateCategoryScores(answersForAxis(1));

    expect(scores.every((score) => score.score === 1)).toBe(true);
  });

  it("maps a consistently traditional answer pattern to -1 on every axis", () => {
    const scores = calculateCategoryScores(answersForAxis(-1));

    expect(scores.every((score) => score.score === -1)).toBe(true);
  });

  it("averages only answered questions and reverses conservative-framed answers", () => {
    const firstCategory = CATEGORIES[0];
    const [progressiveQuestion, conservativeQuestion] = firstCategory.questions;
    const scores = calculateCategoryScores({
      [progressiveQuestion.id]: 2,
      [conservativeQuestion.id]: 2,
    });

    expect(scores.find((score) => score.categoryId === firstCategory.id)?.score).toBe(0);
    const otherScores = scores.filter((score) => score.categoryId !== firstCategory.id);
    expect(otherScores.every((score) => score.score === 0)).toBe(true);
  });
});

describe("scoring labels and transforms", () => {
  it.each([
    [0.7, "Strongly progressive", "text-emerald-600"],
    [0.3, "Leans progressive", "text-emerald-500"],
    [0, "Mixed / Moderate", "text-slate-500"],
    [-0.3, "Leans conservative", "text-orange-500"],
    [-0.7, "Strongly conservative", "text-red-600"],
  ])("labels score %s consistently", (score, label, color) => {
    expect(scoreLabel(score)).toBe(label);
    expect(scoreLabelColor(score)).toBe(color);
  });

  it.each([
    [0.149, "Mixed"],
    [0.15, "Reform"],
    [-0.149, "Mixed"],
    [-0.15, "Traditional"],
  ] as const)("maps %s to lean label %s", (score, label) => {
    expect(leanLabel(score)).toBe(label);
  });

  it("returns style tokens for each lean direction", () => {
    expect(leanLabelStyle(0.5).text).toBe("#085041");
    expect(leanLabelStyle(-0.5).text).toBe("#633806");
    expect(leanLabelStyle(0).text).toBe("rgba(10,10,10,0.55)");
  });

  it("turns score magnitude into conviction percent", () => {
    expect(convictionPercent(0.876)).toBe(88);
    expect(convictionPercent(-0.42)).toBe(42);
    expect(convictionPercent(0)).toBe(0);
  });

  it("averages arbitrary score maps for an overall shape score", () => {
    expect(shapeScore({ a: 1, b: 0, c: -0.25 })).toBeCloseTo(0.25);
    expect(shapeScore({})).toBe(0);
  });

  it("round-trips score payloads through URL-safe serialization helpers", () => {
    const scores = { immigration: 0.25, economy: -0.5 };

    expect(decodeScores(encodeScores(scores))).toEqual(scores);
    expect(decodeScores("not valid base64 json")).toBeNull();
  });

  it("converts answers to plain score records and records back to category scores", () => {
    const scoreRecord = answersToScores(answersForAxis(1));
    const categoryScores = scoresToCategoryScores({ immigration: 0.4 });

    expect(Object.keys(scoreRecord).sort()).toEqual(
      CATEGORIES.map((category) => category.id).sort()
    );
    expect(Object.values(scoreRecord).every((score) => score === 1)).toBe(true);
    expect(categoryScores.find((score) => score.categoryId === "immigration")?.score).toBe(0.4);
    expect(categoryScores.find((score) => score.categoryId === "government")?.score).toBe(0);
  });
});
