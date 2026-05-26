import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  clearSaved,
  hasSavedScores,
  loadAnswers,
  loadScores,
  saveAnswers,
  saveScores,
} from "@/lib/storage";

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

  it("saves, detects, loads, and clears scores", () => {
    const scores = { immigration: 0.5, economy: -0.25 };

    expect(hasSavedScores()).toBe(false);
    saveScores(scores);

    expect(hasSavedScores()).toBe(true);
    expect(loadScores()).toEqual(scores);

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
