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
import { answersToScores } from "@/lib/scoring";
import { loadAnswers, loadScores, saveAnswers, saveScores } from "@/lib/storage";
import { Answers, ScoreValue } from "@/types";

class MemoryStorage {
  private store = new Map<string, string>();

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }
}

function mixedCompletedAnswers(): Answers {
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
    const answers = mixedCompletedAnswers();

    saveAnswers(answers);
    const scores = answersToScores(loadAnswers() ?? {});
    saveScores(scores);

    const saved = saveSavedPoligon({
      name: "Avery",
      scores: loadScores() ?? {},
      sourceUrl: `https://poligon.example/results?scores=${btoa(JSON.stringify(scores))}`,
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
