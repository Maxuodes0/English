export const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;

export type Level = (typeof LEVELS)[number];

export type CategoryId =
  | "daily-life"
  | "communication"
  | "education"
  | "business"
  | "work"
  | "technology"
  | "travel"
  | "health"
  | "emotions"
  | "environment"
  | "community"
  | "culture"
  | "society";

export type WordRecord = {
  id: number;
  word: string;
  slug: string;
  arabicTranslation: string;
  englishDefinition: string;
  arabicDefinition: string;
  exampleEn: string;
  exampleAr: string;
  level: Level;
  category: CategoryId;
  pronunciation?: string;
};

export type CategoryRecord = {
  id: CategoryId;
  title: string;
  arabicTitle: string;
  description: string;
  accent: string;
};

export type QuizMode =
  | "multiple-choice"
  | "true-false"
  | "reverse"
  | "typing";

export type QuizQuestion = {
  id: string;
  wordId: number;
  wordSlug: string;
  word: string;
  level: Level;
  category: CategoryId;
  mode: QuizMode;
  prompt: string;
  statement?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
};

export type WordProgress = {
  attempts: number;
  correct: number;
  currentStreak: number;
  completed: boolean;
  lastSeenAt: string | null;
};

export type QuizHistoryEntry = {
  wordId: number;
  level: Level;
  mode: QuizMode;
  isCorrect: boolean;
  answeredAt: string;
};

export type ProgressState = {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  completedWordIds: number[];
  weakWordIds: number[];
  wordStats: Record<number, WordProgress>;
  quizHistory: QuizHistoryEntry[];
};

export type CatalogSummary = {
  totalWords: number;
  categories: number;
  byLevel: Record<Level, number>;
};

export type Word = WordRecord;
