export interface Question {
  id: string;
  text: string;
  categoryId: string;
  /**
   * When true, this question is framed so that "Agree" maps to the
   * conservative/traditional position.  The scoring layer multiplies the
   * raw answer by −1 before averaging, so that a committed conservative
   * and a committed progressive both produce fully-extended spokes — just
   * in different signed directions.
   */
  reverseScore?: boolean;
}

export interface Category {
  id: string;
  name: string;
  shortName: string;
  description: string;
  emoji: string;
  positiveLabel: string;
  negativeLabel: string;
  questions: Question[];
}

export type ScoreValue = -2 | -1 | 0 | 1 | 2;

export interface Answers {
  [questionId: string]: ScoreValue;
}

export interface CategoryScore {
  categoryId: string;
  name: string;
  shortName: string;
  emoji: string;
  score: number; // -1 to +1
  positiveLabel: string;
  negativeLabel: string;
}

export interface RadarDataPoint {
  category: string;
  categoryId: string;
  [key: string]: number | string;
}

export interface IdeologyProfile {
  id: string;
  name: string;
  description: string;
  color: string;
  fillColor: string;
  traits: string[];
  scores: Record<string, number>; // categoryId → -1 to +1
}

export interface SampleProfile {
  id: string;
  name: string;
  title: string;
  description: string;
  scores: Record<string, number>; // categoryId → -1 to +1
}

export interface PoliticalShapeData {
  name?: string;
  scores: Record<string, number>; // categoryId or name → -1 to +1
}
