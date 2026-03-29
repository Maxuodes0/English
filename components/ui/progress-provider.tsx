"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

import {
  getWordAccuracy,
  initialProgressState,
  loadProgressState,
  markWordCompleted as persistWordCompleted,
  recordQuizEntry,
  saveProgressState,
} from "@/lib/progress-store";
import { Level, ProgressState, QuizMode } from "@/lib/types";

type ProgressContextValue = {
  state: ProgressState;
  hydrated: boolean;
  markWordCompleted: (wordId: number) => void;
  recordQuizResult: (payload: {
    wordId: number;
    level: Level;
    mode: QuizMode;
    isCorrect: boolean;
  }) => void;
  getAccuracy: (wordId: number) => number;
  isCompleted: (wordId: number) => boolean;
  isWeak: (wordId: number) => boolean;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);
const PROGRESS_EVENT = "lumena-progress-change";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = () => onStoreChange();

  window.addEventListener("storage", handleStorage);
  window.addEventListener(PROGRESS_EVENT, handleStorage);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(PROGRESS_EVENT, handleStorage);
  };
}

function emitProgressChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, loadProgressState, () => initialProgressState);
  const hydrated = typeof window !== "undefined";

  const value: ProgressContextValue = {
    state,
    hydrated,
    markWordCompleted(wordId) {
      const nextState = persistWordCompleted(loadProgressState(), wordId);
      saveProgressState(nextState);
      emitProgressChange();
    },
    recordQuizResult(payload) {
      const nextState = recordQuizEntry(loadProgressState(), {
        ...payload,
        answeredAt: new Date().toISOString(),
      });
      saveProgressState(nextState);
      emitProgressChange();
    },
    getAccuracy(wordId) {
      return getWordAccuracy(state, wordId);
    },
    isCompleted(wordId) {
      return state.completedWordIds.includes(wordId);
    },
    isWeak(wordId) {
      return state.weakWordIds.includes(wordId);
    },
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider.");
  }

  return context;
}
