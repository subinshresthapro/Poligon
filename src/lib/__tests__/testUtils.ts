/**
 * Shared test utilities — imported by unit and integration test suites.
 */

import { CATEGORIES } from "@/data/questions";
import { Answers, ScoreValue } from "@/types";

/**
 * In-memory localStorage stand-in for tests that need browser storage APIs.
 * Stub it with `vi.stubGlobal("localStorage", new MemoryStorage())`.
 */
export class MemoryStorage {
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

/**
 * Builds a complete answer set that produces a uniform score of `score` on
 * every category axis. Accounts for `reverseScore` so the scoring engine
 * always yields the requested direction.
 *
 * @param score  1 = all-reform, -1 = all-traditional, 0 = all-neutral
 */
export function answersForAxis(score: 1 | -1 | 0): Answers {
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
