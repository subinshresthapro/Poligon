import { describe, expect, it } from "vitest";

import { CATEGORIES, CATEGORY_MAP } from "@/data/questions";

describe("question data", () => {
  it("keeps category ids unique and lookup map complete", () => {
    const ids = CATEGORIES.map((category) => category.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(Object.keys(CATEGORY_MAP).sort()).toEqual([...ids].sort());
    for (const category of CATEGORIES) {
      expect(CATEGORY_MAP[category.id]).toBe(category);
    }
  });

  it("keeps every category in the expected four-question scoring shape", () => {
    for (const category of CATEGORIES) {
      expect(category.questions).toHaveLength(4);
      expect(category.questions.filter((question) => question.reverseScore)).toHaveLength(2);

      for (const question of category.questions) {
        expect(question.categoryId).toBe(category.id);
        expect(question.id).toMatch(/^[a-z]+-\d$/);
        expect(question.text.length).toBeGreaterThan(20);
      }
    }
  });

  it("does not reuse question ids across categories", () => {
    const questionIds = CATEGORIES.flatMap((category) =>
      category.questions.map((question) => question.id)
    );

    expect(new Set(questionIds).size).toBe(questionIds.length);
  });
});
