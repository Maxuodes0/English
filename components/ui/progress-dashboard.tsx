"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { useProgress } from "@/components/ui/progress-provider";
import { LEVELS, WordRecord } from "@/lib/types";
import { formatPercent } from "@/lib/utils";

type ProgressDashboardProps = {
  words: WordRecord[];
};

export function ProgressDashboard({ words }: ProgressDashboardProps) {
  const { state, hydrated, getAccuracy } = useProgress();
  const completedWords = words.filter((word) => state.completedWordIds.includes(word.id));
  const weakWords = words.filter((word) => state.weakWordIds.includes(word.id));
  const attemptedWords = words.filter((word) => (state.wordStats[word.id]?.attempts ?? 0) > 0);
  const overallAccuracy = attemptedWords.length
    ? attemptedWords.reduce((total, word) => total + getAccuracy(word.id), 0) / attemptedWords.length
    : 0;

  return (
    <div className="space-y-8">
      <div className="rounded-[2.2rem] border border-black/5 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-none sm:p-8">
        <Badge>Progress engine</Badge>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-4xl md:text-5xl">
          See what is sticking, what is weak, and what deserves the next session.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
          Progress is stored locally for the MVP. The data model maps cleanly to Supabase for authenticated persistence later.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Completed words" value={completedWords.length} helper={`${words.length} total`} />
          <StatCard label="Attempted words" value={attemptedWords.length} helper="Based on quiz activity" />
          <StatCard label="Overall accuracy" value={hydrated ? formatPercent(overallAccuracy) : "Syncing"} helper="Across attempted words" />
          <StatCard label="Current streak" value={state.currentStreak} helper={`Longest ${state.longestStreak}`} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          <div className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">Progress by level</div>
          <div className="mt-6 space-y-5">
            {LEVELS.map((level) => {
              const levelWords = words.filter((word) => word.level === level);
              const completed = levelWords.filter((word) => state.completedWordIds.includes(word.id)).length;
              const percentage = levelWords.length ? (completed / levelWords.length) * 100 : 0;

              return (
                <div key={level}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-zinc-950 dark:text-white">{level}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {completed}/{levelWords.length}
                    </span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-zinc-100 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-black transition-all duration-300 dark:bg-white"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-none">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">Weak words</div>
              <ButtonLink href="/quiz" variant="secondary">
                Review
              </ButtonLink>
            </div>
            <div className="mt-5 space-y-3">
              {weakWords.length ? (
                weakWords.slice(0, 6).map((word) => (
                  <Link
                    key={word.id}
                    href={`/words/${word.slug}`}
                    className="flex items-center justify-between rounded-[1.4rem] border border-black/6 bg-zinc-50 px-4 py-3 text-sm transition hover:border-black/12 dark:border-white/10 dark:bg-white/6 dark:hover:border-white/15"
                  >
                    <span className="font-medium text-zinc-950 dark:text-white">{word.word}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">{formatPercent(getAccuracy(word.id))}</span>
                  </Link>
                ))
              ) : (
                <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  No weak words yet. Start a quiz session to build useful review data.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-none">
            <div className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">Recent activity</div>
            <div className="mt-5 space-y-3">
              {state.quizHistory.length ? (
                state.quizHistory
                  .slice(-5)
                  .reverse()
                  .map((entry, index) => {
                    const word = words.find((candidate) => candidate.id === entry.wordId);

                    return (
                      <div
                        key={`${entry.wordId}-${entry.answeredAt}-${index}`}
                        className="rounded-[1.4rem] border border-black/6 bg-zinc-50 px-4 py-3 dark:border-white/10 dark:bg-white/6"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-medium text-zinc-950 dark:text-white">{word?.word ?? "Word"}</span>
                          <span className={entry.isCorrect ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}>
                            {entry.isCorrect ? "Correct" : "Needs review"}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                          {entry.mode.replace("-", " ")} | {entry.level}
                        </div>
                      </div>
                    );
                  })
              ) : (
                <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  Quiz attempts will appear here as soon as you start practicing.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: number | string;
  helper: string;
}) {
  return (
    <div className="rounded-[1.8rem] bg-zinc-50 p-5 dark:bg-white/6">
      <div className="text-sm text-zinc-500 dark:text-zinc-400">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">{value}</div>
      <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{helper}</div>
    </div>
  );
}
