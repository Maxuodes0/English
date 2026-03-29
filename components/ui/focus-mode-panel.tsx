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
      <div className="rounded-[2.6rem] border border-black/5 bg-white/85 px-6 py-8 shadow-[0_30px_120px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:px-10 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase">
            Focus mode
          </div>
          <Link href={`/words/${word.slug}`} className="text-sm text-zinc-500 transition hover:text-zinc-950">
            Exit
          </Link>
        </div>

        <div className="mt-10">
          <div className="font-serif text-6xl tracking-tight text-zinc-950 sm:text-8xl">{word.word}</div>
          <div className="mt-4 text-lg text-zinc-500">Audio placeholder ready · /audio/{word.slug}.mp3</div>
        </div>

        <div className="mt-10 space-y-6">
          <div>
            <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase">
              Translation
            </div>
            <div className="mt-3 text-2xl text-zinc-900">{revealed ? word.arabicTranslation : "Tap reveal to focus first."}</div>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase">
              Definition
            </div>
            <div className="mt-3 text-lg leading-8 text-zinc-700">
              {revealed ? word.englishDefinition : "Keep the screen minimal until you are ready for the meaning."}
            </div>
          </div>

          {revealed ? (
            <div className="rounded-[1.8rem] bg-zinc-50 p-5">
              <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase">
                Example
              </div>
              <div className="mt-3 text-lg leading-8 text-zinc-900">{word.exampleEn}</div>
              <div className="mt-2 text-base leading-7 text-zinc-500">{word.exampleAr}</div>
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
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:-translate-y-0.5 hover:border-black/15"
            >
              Next word
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
