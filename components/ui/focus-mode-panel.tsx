"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useProgress } from "@/components/ui/progress-provider";
import { WordRecord } from "@/lib/types";

type FocusModePanelProps = {
  word: WordRecord;
  nextWord: WordRecord | null;
};

export function FocusModePanel({ word, nextWord }: FocusModePanelProps) {
  const [revealed, setRevealed] = useState(false);
  const { markWordCompleted, isCompleted } = useProgress();

  return (
    <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-4xl flex-col justify-center py-12">
      <div className="rounded-[2.6rem] border border-black/5 bg-white/85 px-6 py-8 shadow-[0_30px_120px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:shadow-none sm:px-10 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase dark:text-zinc-500">
            Focus mode
          </div>
          <Link
            href={`/words/${word.slug}`}
            className="text-sm text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
          >
            Exit
          </Link>
        </div>

        <div className="mt-10">
          <div className="font-serif text-6xl tracking-tight text-zinc-950 dark:text-white sm:text-8xl">
            {word.word}
          </div>
          <div className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
            Audio placeholder ready | /audio/{word.slug}.mp3
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <div>
            <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase dark:text-zinc-500">
              Translation
            </div>
            <div
              lang="ar"
              dir="rtl"
              className="arabic-text mt-3 text-3xl font-medium text-zinc-900 dark:text-zinc-100 sm:text-4xl"
            >
              {revealed
                ? word.arabicTranslation
                : "\u0627\u0636\u063A\u0637 \u0625\u0638\u0647\u0627\u0631 \u0627\u0644\u0645\u0639\u0646\u0649 \u0623\u0648\u0644\u064B\u0627"}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase dark:text-zinc-500">
              Definition
            </div>
            <div className="mt-3 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              {revealed
                ? word.englishDefinition
                : "Keep the screen minimal until you are ready for the meaning."}
            </div>
          </div>

          {revealed ? (
            <div className="rounded-[1.8rem] bg-zinc-50 p-5 dark:bg-white/6">
              <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase dark:text-zinc-500">
                Example
              </div>
              <div className="mt-3 text-lg leading-8 text-zinc-900 dark:text-white">
                {word.exampleEn}
              </div>
              <div
                lang="ar"
                dir="rtl"
                className="arabic-text mt-3 text-lg text-zinc-600 dark:text-zinc-300"
              >
                {word.exampleAr}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button onClick={() => setRevealed((current) => !current)}>
            {revealed ? "Hide meaning" : "Reveal meaning"}
          </Button>
          <Button variant="secondary" onClick={() => markWordCompleted(word.id)}>
            {isCompleted(word.id) ? "Marked as learned" : "Mark as learned"}
          </Button>
          {nextWord ? (
            <Link
              href={`/words/${nextWord.slug}/focus`}
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:-translate-y-0.5 hover:border-black/15 dark:border-white/10 dark:bg-white/6 dark:text-white dark:hover:border-white/15"
            >
              Next word
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
