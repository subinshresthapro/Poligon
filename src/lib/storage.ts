import { Answers } from "@/types";

const ANSWERS_KEY = "pShape_answers";
const SCORES_KEY = "pShape_scores";

export function saveAnswers(answers: Answers): void {
  try { localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers)); } catch {}
}

export function loadAnswers(): Answers | null {
  try {
    const raw = localStorage.getItem(ANSWERS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function saveScores(scores: Record<string, number>): void {
  try { localStorage.setItem(SCORES_KEY, JSON.stringify(scores)); } catch {}
}

export function loadScores(): Record<string, number> | null {
  try {
    const raw = localStorage.getItem(SCORES_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function clearSaved(): void {
  try {
    localStorage.removeItem(ANSWERS_KEY);
    localStorage.removeItem(SCORES_KEY);
  } catch {}
}

export function hasSavedScores(): boolean {
  try { return !!localStorage.getItem(SCORES_KEY); } catch { return false; }
}
