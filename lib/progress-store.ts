import { STORAGE_KEY } from "@/lib/constants";
import { ProgressState, QuizHistoryEntry } from "@/lib/types";

export const initialProgressState: ProgressState = {
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  completedWordIds: [],
  weakWordIds: [],
  wordStats: {},
  quizHistory: [],
};

function toDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function loadProgressState() {
  if (typeof window === "undefined") {
    return initialProgressState;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return initialProgressState;
  }

  try {
    return {
      ...initialProgressState,
      ...JSON.parse(raw),
    } as ProgressState;
  } catch {
    return initialProgressState;
  }
}

export function saveProgressState(state: ProgressState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function updateDailyStreak(state: ProgressState, answeredAt: string) {
  const today = answeredAt.slice(0, 10);

  if (!state.lastActiveDate) {
    return {
      ...state,
      currentStreak: 1,
      longestStreak: Math.max(state.longestStreak, 1),
      lastActiveDate: today,
    };
  }

  if (state.lastActiveDate === today) {
    return state;
  }

  const previous = new Date(state.lastActiveDate);
  const current = new Date(today);
  const diffInDays = Math.round((current.getTime() - previous.getTime()) / 86_400_000);
  const currentStreak = diffInDays === 1 ? state.currentStreak + 1 : 1;

  return {
    ...state,
    currentStreak,
    longestStreak: Math.max(state.longestStreak, currentStreak),
    lastActiveDate: today,
  };
}

export function markWordCompleted(state: ProgressState, wordId: number) {
  const current = state.wordStats[wordId] ?? {
    attempts: 0,
    correct: 0,
    currentStreak: 0,
    completed: false,
    lastSeenAt: null,
  };

  return {
    ...state,
    completedWordIds: Array.from(new Set([...state.completedWordIds, wordId])),
    wordStats: {
      ...state.wordStats,
      [wordId]: {
        ...current,
        completed: true,
        lastSeenAt: toDateKey(),
      },
    },
  };
}

export function recordQuizEntry(state: ProgressState, entry: QuizHistoryEntry) {
  const current = state.wordStats[entry.wordId] ?? {
    attempts: 0,
    correct: 0,
    currentStreak: 0,
    completed: false,
    lastSeenAt: null,
  };

  const attempts = current.attempts + 1;
  const correct = current.correct + (entry.isCorrect ? 1 : 0);
  const accuracy = correct / attempts;
  const nextState = updateDailyStreak(state, entry.answeredAt);
  const weakWordIds = new Set(nextState.weakWordIds);

  if (attempts >= 2 && accuracy < 0.6) {
    weakWordIds.add(entry.wordId);
  } else if (accuracy >= 0.6) {
    weakWordIds.delete(entry.wordId);
  }

  const completedWordIds = new Set(nextState.completedWordIds);

  if (entry.isCorrect) {
    completedWordIds.add(entry.wordId);
  }

  return {
    ...nextState,
    completedWordIds: Array.from(completedWordIds),
    weakWordIds: Array.from(weakWordIds),
    wordStats: {
      ...nextState.wordStats,
      [entry.wordId]: {
        attempts,
        correct,
        currentStreak: entry.isCorrect ? current.currentStreak + 1 : 0,
        completed: completedWordIds.has(entry.wordId),
        lastSeenAt: entry.answeredAt,
      },
    },
    quizHistory: [...nextState.quizHistory, entry].slice(-400),
  };
}

export function getWordAccuracy(state: ProgressState, wordId: number) {
  const stats = state.wordStats[wordId];

  if (!stats || stats.attempts === 0) {
    return 0;
  }

  return (stats.correct / stats.attempts) * 100;
}
