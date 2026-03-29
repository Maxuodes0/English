import { QuizMode } from "@/lib/types";

export const APP_NAME = "Lumena";
export const APP_TAGLINE =
  "A premium English vocabulary platform built for depth, clarity, and daily progress.";
export const DAILY_WORD_COUNT = 4;
export const QUIZ_MODES: { id: QuizMode; label: string; description: string }[] = [
  {
    id: "multiple-choice",
    label: "Multiple Choice",
    description: "Match the English word to the right Arabic meaning.",
  },
  {
    id: "true-false",
    label: "True / False",
    description: "Judge whether the meaning statement is correct.",
  },
  {
    id: "reverse",
    label: "Arabic to English",
    description: "Recognize the English word from its Arabic meaning.",
  },
  {
    id: "typing",
    label: "Typing Test",
    description: "Type the word from memory for stronger recall.",
  },
];

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/words", label: "Words" },
  { href: "/quiz", label: "Quiz" },
  { href: "/progress", label: "Progress" },
];

export const STORAGE_KEY = "lumena-progress-v1";
