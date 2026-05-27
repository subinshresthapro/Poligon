import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  clearSaved,
  hasSavedScores,
  loadAnswers,
  loadScores,
  saveAnswers,
  saveScores,
} from "@/lib/storage";
import { MemoryStorage } from "@/lib/__tests__/testUtils";

describe("quiz storage", () => {
  let storage: MemoryStorage;

  beforeEach(() => {
    storage = new MemoryStorage();
    vi.stubGlobal("localStorage", storage);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("saves and loads answers", () => {
    const answers = { "imm-1": 2, "imm-2": -1 } as const;

    saveAnswers(answers);

    expect(loadAnswers()).toEqual(answers);
  });

  it("reports no saved scores before any save", () => {
    expect(hasSavedScores()).toBe(false);
  });

  it("saves and loads scores", () => {
    const scores = { immigration: 0.5, economy: -0.25 };

    saveScores(scores);

    expect(hasSavedScores()).toBe(true);
    expect(loadScores()).toEqual(scores);
  });

  it("clearSaved removes saved scores", () => {
    saveScores({ immigration: 0.5 });

    clearSaved();

    expect(hasSavedScores()).toBe(false);
    expect(loadScores()).toBeNull();
  });

  it("returns null when stored JSON is invalid", () => {
    storage.setItem("pShape_answers", "{");
    storage.setItem("pShape_scores", "{");

    expect(loadAnswers()).toBeNull();
    expect(loadScores()).toBeNull();
  });

  it("swallows localStorage failures", () => {
    const failingStorage = {
      getItem: vi.fn(() => {
        throw new Error("blocked");
      }),
      setItem: vi.fn(() => {
        throw new Error("blocked");
      }),
      removeItem: vi.fn(() => {
        throw new Error("blocked");
      }),
    };
    vi.stubGlobal("localStorage", failingStorage);

    expect(() => saveAnswers({ "imm-1": 1 })).not.toThrow();
    expect(() => saveScores({ immigration: 1 })).not.toThrow();
    expect(() => clearSaved()).not.toThrow();
    expect(loadAnswers()).toBeNull();
    expect(loadScores()).toBeNull();
    expect(hasSavedScores()).toBe(false);
  });
});
