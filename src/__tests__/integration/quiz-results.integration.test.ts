import { describe, expect, it } from "vitest";

import { CATEGORIES } from "@/data/questions";
import { ARCHETYPES, findArchetype } from "@/lib/archetypes";
import {
  answersToScores,
  decodeScores,
  encodeScores,
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

describe("quiz to results workflow", () => {
  it("turns a completed quiz into restorable result data", () => {
    const scores = answersToScores(answersForAxis(-1));
    const encoded = encodeScores(scores);
    const restoredScores = decodeScores(encoded);
    const categoryScores = scoresToCategoryScores(restoredScores ?? {});

    expect(restoredScores).toEqual(scores);
    expect(Object.values(scores).every((score) => score === -1)).toBe(true);
    expect(shapeScore(scores)).toBe(-1);
    expect(categoryScores).toHaveLength(CATEGORIES.length);

    for (const category of CATEGORIES) {
      const categoryScore = categoryScores.find((score) => score.categoryId === category.id);

      expect(categoryScore).toMatchObject({
        categoryId: category.id,
        name: category.name,
        shortName: category.shortName,
        positiveLabel: category.positiveLabel,
        negativeLabel: category.negativeLabel,
        score: -1,
      });
    }
  });

  it("preserves archetype identity through the result serialization boundary", () => {
    const sourceArchetype = ARCHETYPES.find(
      (archetype) => archetype.id === "social-architect"
    );
    if (!sourceArchetype) throw new Error("Missing expected archetype fixture");

    const restoredScores = decodeScores(encodeScores(sourceArchetype.scores));
    const restoredArchetype = findArchetype(restoredScores ?? {});
    const categoryScores = scoresToCategoryScores(restoredScores ?? {});

    expect(restoredArchetype).toBe(sourceArchetype);
    expect(categoryScores.map((score) => score.categoryId)).toEqual(
      CATEGORIES.map((category) => category.id)
    );
  });
});
