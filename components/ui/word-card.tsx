"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { useProgress } from "@/components/ui/progress-provider";
import { categories } from "@/data/categories";
import { WordRecord } from "@/lib/types";
import { cn, formatPercent } from "@/lib/utils";

type WordCardProps = {
  word: WordRecord;
  compact?: boolean;
};

export function WordCard({ word, compact = false }: WordCardProps) {
  const { isCompleted, isWeak, getAccuracy, hydrated } = useProgress();
  const category = categories.find((item) => item.id === word.category);
  const completed = hydrated && isCompleted(word.id);
  const weak = hydrated && isWeak(word.id);
  const accuracy = hydrated ? getAccuracy(word.id) : 0;

  return (
    <Link
      href={`/words/${word.slug}`}
      className={cn(
        "group relative min-w-0 overflow-hidden rounded-[2rem] border border-black/5 bg-white/80 p-6 no-underline shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(15,23,42,0.12)]",
        compact && "rounded-[1.6rem] p-5",
      )}
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-black/15 to-transparent" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <div
            className={cn(
              "break-words text-2xl font-semibold tracking-tight text-zinc-950",
              compact && "text-xl leading-tight",
            )}
          >
            {word.word}
          </div>
          <div className="mt-1 break-words text-sm font-medium text-zinc-500">
            {word.arabicTranslation}
          </div>
        </div>
        <Badge className="border-black/5 bg-zinc-950 text-white">{word.level}</Badge>
      </div>

      {compact ? (
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-zinc-600">{word.englishDefinition}</p>
      ) : (
        <p className="mt-5 text-sm leading-7 text-zinc-600">{word.englishDefinition}</p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge className="border-black/5 bg-black/5 text-zinc-600">
          {category?.title ?? word.category}
        </Badge>
        {!compact && completed ? (
          <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">Completed</Badge>
        ) : null}
        {!compact && weak ? (
          <Badge className="border-amber-200 bg-amber-50 text-amber-700">Weak word</Badge>
        ) : null}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-zinc-500">
        <span>
          {compact
            ? word.level
            : hydrated && accuracy > 0
              ? `${formatPercent(accuracy)} accuracy`
              : "Start learning"}
        </span>
        <span className="transition group-hover:translate-x-0.5 group-hover:text-zinc-950">Open</span>
      </div>
    </Link>
  );
}
