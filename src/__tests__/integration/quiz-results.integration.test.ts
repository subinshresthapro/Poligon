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
import { answersForAxis } from "@/lib/__tests__/testUtils";

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
    // Use the first archetype — the test only needs any defined archetype to
    // survive the encode → decode round-trip, not a specific one.
    const sourceArchetype = ARCHETYPES[0];

    const restoredScores = decodeScores(encodeScores(sourceArchetype.scores));
    const restoredArchetype = findArchetype(restoredScores ?? {});
    const categoryScores = scoresToCategoryScores(restoredScores ?? {});

    expect(restoredArchetype).toBe(sourceArchetype);
    expect(categoryScores.map((score) => score.categoryId)).toEqual(
      CATEGORIES.map((category) => category.id)
    );
  });
});
