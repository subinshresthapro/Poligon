import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CATEGORIES } from "@/data/questions";
import { IDEOLOGIES } from "@/data/ideologies";
import { buildEmbedUrl } from "@/lib/embed";
import {
  computeAgreement,
  findSavedPoligon,
  loadSavedPoligons,
  saveSavedPoligon,
} from "@/lib/sharedPoligons";
import { answersToScores, encodeScores } from "@/lib/scoring";
import { loadAnswers, loadScores, saveAnswers, saveScores } from "@/lib/storage";
import { Answers, ScoreValue } from "@/types";
import { MemoryStorage } from "@/lib/__tests__/testUtils";

/**
 * Produces a complete answer set with alternating reform/traditional values
 * across categories and question positions. Exact scores are not meaningful
 * here — only self-consistency within the pipeline matters.
 */
function arbitraryCompletedAnswers(): Answers {
  return Object.fromEntries(
    CATEGORIES.flatMap((category, categoryIndex) =>
      category.questions.map((question, questionIndex) => {
        const base = categoryIndex % 2 === 0 ? 2 : -2;
        const rawValue = questionIndex < 2 ? base : -base;
        return [question.id, rawValue as ScoreValue];
      })
    )
  );
}

function decodeEmbedPayload(url: string) {
  const data = new URL(url).searchParams.get("data");
  if (!data) throw new Error("Missing embed data");
  return JSON.parse(atob(data));
}

describe("saved sharing workflow", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", new MemoryStorage());
    vi.spyOn(Date, "now").mockReturnValue(987654);
    vi.spyOn(Math, "random").mockReturnValue(0.25);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("persists quiz answers, scores, shared collection entries, and embed payloads together", () => {
    const answers = arbitraryCompletedAnswers();

    saveAnswers(answers);
    const scores = answersToScores(loadAnswers() ?? {});
    saveScores(scores);

    const saved = saveSavedPoligon({
      name: "Avery",
      scores: loadScores() ?? {},
      sourceUrl: `https://poligon.example/results?scores=${encodeScores(scores)}`,
    });
    const embedUrl = buildEmbedUrl("https://poligon.example", saved.scores, saved.name);

    expect(loadSavedPoligons()).toEqual([saved]);
    expect(findSavedPoligon(scores)).toEqual(saved);
    expect(decodeEmbedPayload(embedUrl)).toEqual({ name: "Avery", scores });
  });

  it("compares a saved result against ideology profiles using the shared agreement formula", () => {
    const progressive = IDEOLOGIES.find((ideology) => ideology.id === "progressive");
    const conservative = IDEOLOGIES.find((ideology) => ideology.id === "conservative");
    if (!progressive || !conservative) throw new Error("Missing ideology fixtures");

    const saved = saveSavedPoligon({
      name: "Progressive voter",
      scores: progressive.scores,
      sourceUrl: "https://poligon.example/results?scores=progressive",
    });

    expect(computeAgreement(saved.scores, progressive.scores)).toBe(100);
    expect(computeAgreement(saved.scores, conservative.scores)).toBeLessThan(50);
  });
});
