import { Answers, CategoryScore, ScoreValue } from "@/types";
import { CATEGORIES } from "@/data/questions";

/**
 * Convert raw quiz answers to per-category scores.
 *
 * Scoring model
 * -------------
 *  • Each question uses a 5-point scale: −2 (Strongly Disagree) → +2 (Strongly Agree).
 *  • Questions marked `reverseScore: true` are conservative-framed; their raw answer
 *    is multiplied by −1 before averaging.  This ensures that a committed conservative
 *    who answers C-framed questions with "Strongly Agree" gets the same magnitude (but
 *    opposite sign) as a progressive who answers P-framed questions with "Strongly Agree".
 *  • The per-category average is then normalised from [−2, +2] → [−1, +1].
 *
 *  Final sign convention
 *  ---------------------
 *   +1  ≈  strongly progressive / reform on this axis
 *   −1  ≈  strongly conservative / traditional on this axis
 *    0  ≈  neutral or mixed
 */
export function calculateCategoryScores(answers: Answers): CategoryScore[] {
  return CATEGORIES.map((category) => {
    // Pair each question with its answered value (skip unanswered questions)
    const answeredPairs = category.questions
      .map((q) => ({ question: q, value: answers[q.id] as ScoreValue | undefined }))
      .filter((pair): pair is { question: typeof pair.question; value: ScoreValue } =>
        pair.value !== undefined
      );

    let score = 0;
    if (answeredPairs.length > 0) {
      const sum = answeredPairs.reduce((acc, { question, value }) => {
        // Flip sign for conservative-framed questions so their raw "agree"
        // maps to the conservative (negative) end of the axis.
        const adjusted = question.reverseScore ? -value : value;
        return acc + adjusted;
      }, 0);
      // Normalise −2..+2 range → −1..+1
      score = sum / answeredPairs.length / 2;
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

/**
 * Human-readable label for a signed axis score.
 * Positive = progressive / reform direction; negative = conservative / traditional.
 */
export function scoreLabel(score: number): string {
  if (score >= 0.7) return "Strongly progressive";
  if (score >= 0.3) return "Leans progressive";
  if (score > -0.3) return "Mixed / Moderate";
  if (score > -0.7) return "Leans conservative";
  return "Strongly conservative";
}

export function scoreLabelColor(score: number): string {
  if (score >= 0.7) return "text-emerald-600";
  if (score >= 0.3) return "text-emerald-500";
  if (score > -0.3) return "text-slate-500";
  if (score > -0.7) return "text-orange-500";
  return "text-red-600";
}

/** Mean of all signed axis scores — a rough overall lean indicator. */
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
