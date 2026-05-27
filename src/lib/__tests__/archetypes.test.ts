import { describe, expect, it } from "vitest";

import { CATEGORIES } from "@/data/questions";
import { ARCHETYPES, findArchetype } from "@/lib/archetypes";

describe("archetypes", () => {
  it("has unique ids and complete score vectors", () => {
    const ids = ARCHETYPES.map((archetype) => archetype.id);

    expect(new Set(ids).size).toBe(ids.length);
    for (const archetype of ARCHETYPES) {
      expect(archetype.name).toBeTruthy();
      expect(archetype.description).toBeTruthy();
      expect(archetype.detail).toBeTruthy();

      for (const category of CATEGORIES) {
        expect(archetype.scores).toHaveProperty(category.id);
        expect(archetype.scores[category.id]).toBeGreaterThanOrEqual(-1);
        expect(archetype.scores[category.id]).toBeLessThanOrEqual(1);
      }
    }
  });

  it("finds an exact archetype match for each defined archetype", () => {
    for (const archetype of ARCHETYPES) {
      expect(findArchetype(archetype.scores)).toBe(archetype);
    }
  });

  it("treats missing dimensions as neutral when comparing distances", () => {
    const zeroScores = Object.fromEntries(CATEGORIES.map((category) => [category.id, 0]));

    expect(findArchetype({})).toBe(findArchetype(zeroScores));
  });
});
