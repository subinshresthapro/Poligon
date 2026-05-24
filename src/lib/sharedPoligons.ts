import { CATEGORIES } from "@/data/questions";

const STORAGE_KEY = "poligon-shared-collection";

export interface SavedPoligon {
  id: string;
  /** User-assigned nickname, e.g. "Alice", "My sister", "Guy from front desk" */
  name: string;
  scores: Record<string, number>;
  savedAt: number;
  /** Full URL with ?scores= param — used to navigate back to their results page */
  sourceUrl: string;
}

// ── Read ─────────────────────────────────────────────────────────────────────

export function loadSavedPoligons(): SavedPoligon[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedPoligon[];
  } catch {
    return [];
  }
}

// ── Write ────────────────────────────────────────────────────────────────────

function write(entries: SavedPoligon[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    /* silent — quota exceeded or SSR */
  }
}

export function saveSavedPoligon(
  entry: Omit<SavedPoligon, "id" | "savedAt">
): SavedPoligon {
  const all = loadSavedPoligons();
  const newEntry: SavedPoligon = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    savedAt: Date.now(),
  };
  write([newEntry, ...all]);
  return newEntry;
}

export function removeSavedPoligon(id: string): void {
  write(loadSavedPoligons().filter((e) => e.id !== id));
}

export function updateSavedPoligonName(id: string, name: string): void {
  write(
    loadSavedPoligons().map((e) =>
      e.id === id ? { ...e, name: name.trim() || e.name } : e
    )
  );
}

// ── Lookup ───────────────────────────────────────────────────────────────────

/**
 * Check whether scores that are close to `scores` are already in the
 * collection (tolerance 0.01 per dimension).  Returns the match or null.
 */
export function findSavedPoligon(
  scores: Record<string, number>
): SavedPoligon | null {
  const ids = CATEGORIES.map((c) => c.id);
  return (
    loadSavedPoligons().find((entry) =>
      ids.every(
        (id) => Math.abs((entry.scores[id] ?? 0) - (scores[id] ?? 0)) < 0.01
      )
    ) ?? null
  );
}

// ── Agreement score ───────────────────────────────────────────────────────────

/**
 * Returns 0–100: how closely two score maps agree.
 * 100 = identical shapes, 0 = maximally opposite on every dimension.
 *
 * Same formula used in IdeologyComparisonPanel — averaged normalised
 * absolute difference (each score is in [−1, +1], so max diff = 2).
 */
export function computeAgreement(
  a: Record<string, number>,
  b: Record<string, number>
): number {
  const ids = CATEGORIES.map((c) => c.id);
  const avgAbsDiff =
    ids.reduce(
      (sum, id) => sum + Math.abs((a[id] ?? 0) - (b[id] ?? 0)) / 2,
      0
    ) / ids.length;
  return Math.round((1 - avgAbsDiff) * 100);
}
