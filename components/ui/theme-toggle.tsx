"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

import { getThemeSnapshot, subscribeTheme, toggleTheme } from "@/lib/theme-store";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "light");
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/8 bg-white/80 text-zinc-700 shadow-[0_12px_32px_rgba(15,23,42,0.06)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:text-white"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
