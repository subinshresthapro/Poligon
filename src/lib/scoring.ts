import { Answers, CategoryScore, ScoreValue } from "@/types";
import { CATEGORIES } from "@/data/questions";

export function calculateCategoryScores(answers: Answers): CategoryScore[] {
  return CATEGORIES.map((category) => {
    const questionAnswers = category.questions
      .map((q) => answers[q.id])
      .filter((v): v is ScoreValue => v !== undefined);

    let score = 0;
    if (questionAnswers.length > 0) {
      const avg = questionAnswers.reduce((sum: number, v) => sum + v, 0) / questionAnswers.length;
      score = avg / 2; // normalize -2..+2 → -1..+1
    }

    return {
      categoryId: category.id,
      name: category.name,
      shortName: category.shortName,
      emoji: category.emoji,
      score: Math.max(-1, Math.min(1, score)),
      positiveLabel: category.positiveLabel,
      negativeLabel: category.negativeLabel,
    };
  });
}

export function scoreLabel(score: number): string {
  if (score >= 0.7) return "Strongly Supports";
  if (score >= 0.3) return "Leans Supportive";
  if (score > -0.3) return "Mixed / Neutral";
  if (score > -0.7) return "Leans Opposed";
  return "Strongly Opposes";
}

export function scoreLabelColor(score: number): string {
  if (score >= 0.7) return "text-emerald-600";
  if (score >= 0.3) return "text-emerald-500";
  if (score > -0.3) return "text-slate-500";
  if (score > -0.7) return "text-orange-500";
  return "text-red-600";
}

export function shapeScore(scores: Record<string, number>): number {
  const values = Object.values(scores);
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function encodeScores(scores: Record<string, number>): string {
  return btoa(JSON.stringify(scores));
}

export function decodeScores(encoded: string): Record<string, number> | null {
  try {
    return JSON.parse(atob(encoded));
  } catch {
    return null;
  }
}

export function answersToScores(answers: Answers): Record<string, number> {
  const categoryScores = calculateCategoryScores(answers);
  return Object.fromEntries(categoryScores.map((cs) => [cs.categoryId, cs.score]));
}

export function scoresToCategoryScores(
  scores: Record<string, number>
): import("@/types").CategoryScore[] {
  return CATEGORIES.map((cat) => ({
    categoryId: cat.id,
    name: cat.name,
    shortName: cat.shortName,
    emoji: cat.emoji,
    score: scores[cat.id] ?? 0,
    positiveLabel: cat.positiveLabel,
    negativeLabel: cat.negativeLabel,
  }));
}
