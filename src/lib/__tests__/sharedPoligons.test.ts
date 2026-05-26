import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CATEGORIES } from "@/data/questions";
import {
  computeAgreement,
  findSavedPoligon,
  loadSavedPoligons,
  removeSavedPoligon,
  saveSavedPoligon,
  updateSavedPoligonName,
} from "@/lib/sharedPoligons";

const STORAGE_KEY = "poligon-shared-collection";

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

function scores(value: number): Record<string, number> {
  return Object.fromEntries(CATEGORIES.map((category) => [category.id, value]));
}

describe("shared poligon storage", () => {
  let storage: MemoryStorage;

  beforeEach(() => {
    storage = new MemoryStorage();
    vi.stubGlobal("localStorage", storage);
    vi.spyOn(Date, "now").mockReturnValue(123456);
    vi.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("loads an empty collection for missing or invalid storage", () => {
    expect(loadSavedPoligons()).toEqual([]);

    storage.setItem(STORAGE_KEY, "{");

    expect(loadSavedPoligons()).toEqual([]);
  });

  it("saves new entries with generated metadata and prepends them", () => {
    const first = saveSavedPoligon({
      name: "Avery",
      scores: scores(0.5),
      sourceUrl: "https://poligon.example/results?scores=one",
    });
    vi.spyOn(Date, "now").mockReturnValue(123457);
    vi.spyOn(Math, "random").mockReturnValue(0.75);
    const second = saveSavedPoligon({
      name: "Blair",
      scores: scores(-0.5),
      sourceUrl: "https://poligon.example/results?scores=two",
    });

    expect(first).toMatchObject({
      id: "123456-i",
      name: "Avery",
      savedAt: 123456,
    });
    expect(second.name).toBe("Blair");
    expect(loadSavedPoligons().map((entry) => entry.name)).toEqual(["Blair", "Avery"]);
  });

  it("removes entries by id", () => {
    const entry = saveSavedPoligon({
      name: "Avery",
      scores: scores(0),
      sourceUrl: "https://poligon.example/results",
    });

    removeSavedPoligon(entry.id);

    expect(loadSavedPoligons()).toEqual([]);
  });

  it("updates names after trimming and preserves existing names for blank input", () => {
    const entry = saveSavedPoligon({
      name: "Avery",
      scores: scores(0),
      sourceUrl: "https://poligon.example/results",
    });

    updateSavedPoligonName(entry.id, "  New name  ");
    expect(loadSavedPoligons()[0].name).toBe("New name");

    updateSavedPoligonName(entry.id, "   ");
    expect(loadSavedPoligons()[0].name).toBe("New name");
  });

  it("finds saved shapes within the per-dimension tolerance", () => {
    const entry = saveSavedPoligon({
      name: "Avery",
      scores: scores(0.5),
      sourceUrl: "https://poligon.example/results",
    });

    expect(findSavedPoligon(scores(0.509))).toEqual(entry);
    expect(findSavedPoligon(scores(0.51))).toBeNull();
  });

  it("computes shape agreement across all quiz categories", () => {
    expect(computeAgreement(scores(0), scores(0))).toBe(100);
    expect(computeAgreement(scores(1), scores(-1))).toBe(0);
    expect(computeAgreement(scores(1), scores(0))).toBe(50);
  });
});
