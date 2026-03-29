"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/components/ui/progress-provider";
import { QUIZ_MODES } from "@/lib/constants";
import { buildQuizSession, buildWordQuizSet, isAnswerCorrect } from "@/lib/quiz";
import { LEVELS, QuizMode, QuizQuestion, WordRecord } from "@/lib/types";
import { cn, formatPercent } from "@/lib/utils";

type QuizArenaProps = {
  words: WordRecord[];
  focusWordSlug?: string | null;
};

type AnswerRecord = {
  questionId: string;
  wordId: number;
  isCorrect: boolean;
  level: WordRecord["level"];
  mode: QuizMode;
};

export function QuizArena({ words, focusWordSlug }: QuizArenaProps) {
  const focusWord = focusWordSlug
    ? words.find((word) => word.slug === focusWordSlug) ?? null
    : null;

  const [selectedMode, setSelectedMode] = useState<QuizMode | "mixed">("mixed");
  const [selectedLevel, setSelectedLevel] = useState<WordRecord["level"] | "all">("all");
  const [session, setSession] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [typedAnswer, setTypedAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const { recordQuizResult } = useProgress();

  function startSession() {
    if (focusWord) {
      setSession(buildWordQuizSet(focusWord, words));
    } else {
      const sourceWords =
        selectedLevel === "all" ? words : words.filter((word) => word.level === selectedLevel);

      setSession(buildQuizSession(sourceWords, words, 8, selectedMode));
    }

    setCurrentIndex(0);
    setSelectedAnswer("");
    setTypedAnswer("");
    setSubmitted(false);
    setAnswers([]);
  }

  useEffect(() => {
    startSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusWord?.slug, selectedLevel, selectedMode]);

  const question = session[currentIndex];
  const correctCount = answers.filter((answer) => answer.isCorrect).length;
  const accuracy = answers.length ? (correctCount / answers.length) * 100 : 0;
  const bestStreak = answers.reduce(
    (state, answer) => {
      const current = answer.isCorrect ? state.current + 1 : 0;
      return {
        current,
        best: Math.max(state.best, current),
      };
    },
    { current: 0, best: 0 },
  ).best;
  const finished = session.length > 0 && currentIndex >= session.length;

  function submitAnswer(answer: string) {
    if (!question || submitted) {
      return;
    }

    const correct = isAnswerCorrect(question, answer);

    setSelectedAnswer(answer);
    setSubmitted(true);
    setAnswers((current) => [
      ...current,
      {
        questionId: question.id,
        wordId: question.wordId,
        isCorrect: correct,
        level: question.level,
        mode: question.mode,
      },
    ]);

    recordQuizResult({
      wordId: question.wordId,
      level: question.level,
      mode: question.mode,
      isCorrect: correct,
    });
  }

  function nextQuestion() {
    setCurrentIndex((current) => current + 1);
    setSelectedAnswer("");
    setTypedAnswer("");
    setSubmitted(false);
  }

  if (!session.length) {
    return null;
  }

  if (finished) {
    const levelGroups = LEVELS.map((level) => {
      const levelAnswers = answers.filter((answer) => answer.level === level);
      const levelAccuracy = levelAnswers.length
        ? (levelAnswers.filter((answer) => answer.isCorrect).length / levelAnswers.length) * 100
        : 0;

      return {
        level,
        count: levelAnswers.length,
        accuracy: levelAccuracy,
      };
    });

    return (
      <div className="rounded-[2.2rem] border border-black/5 bg-white/85 p-6 shadow-[0_25px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
        <Badge>Session complete</Badge>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
          Accuracy {formatPercent(accuracy)} with a best streak of {bestStreak}.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600">
          Review weak areas, then restart with a new mode or difficulty. Every attempt updates the
          local progress dashboard and is ready to be mirrored into Supabase later.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <StatCard label="Questions" value={answers.length} />
          <StatCard label="Correct" value={correctCount} />
          <StatCard label="Best streak" value={bestStreak} />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {levelGroups.map((item) => (
            <div key={item.level} className="rounded-[1.5rem] border border-black/6 bg-white p-4">
              <div className="text-sm font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                {item.level}
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
                {item.count ? formatPercent(item.accuracy) : "No data"}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={startSession}>Start another session</Button>
          <Link
            href="/progress"
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:-translate-y-0.5 hover:border-black/15"
          >
            Open progress
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2.2rem] border border-black/5 bg-white/85 p-6 shadow-[0_25px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Badge>{focusWord ? "Focused drill" : "Adaptive quiz"}</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              {focusWord
                ? `Train "${focusWord.word}" across all four quiz modes.`
                : "Turn vocabulary into durable recall."}
            </h2>
          </div>
          <Button variant="secondary" onClick={startSession}>
            Restart
          </Button>
        </div>

        {!focusWord ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[1.8rem] bg-zinc-50 p-5">
              <div className="text-sm font-medium text-zinc-600">Mode</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMode("mixed")}
                  className={cn(
                    "rounded-full border px-3 py-2 text-sm transition",
                    selectedMode === "mixed"
                      ? "border-black bg-black text-white"
                      : "border-black/8 bg-white text-zinc-600 hover:border-black/15 hover:text-zinc-950",
                  )}
                >
                  Mixed
                </button>
                {QUIZ_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setSelectedMode(mode.id)}
                    className={cn(
                      "rounded-full border px-3 py-2 text-sm transition",
                      selectedMode === mode.id
                        ? "border-black bg-black text-white"
                        : "border-black/8 bg-white text-zinc-600 hover:border-black/15 hover:text-zinc-950",
                    )}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.8rem] bg-zinc-50 p-5">
              <div className="text-sm font-medium text-zinc-600">Level</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedLevel("all")}
                  className={cn(
                    "rounded-full border px-3 py-2 text-sm transition",
                    selectedLevel === "all"
                      ? "border-black bg-black text-white"
                      : "border-black/8 bg-white text-zinc-600 hover:border-black/15 hover:text-zinc-950",
                  )}
                >
                  All
                </button>
                {LEVELS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedLevel(level)}
                    className={cn(
                      "rounded-full border px-3 py-2 text-sm transition",
                      selectedLevel === level
                        ? "border-black bg-black text-white"
                        : "border-black/8 bg-white text-zinc-600 hover:border-black/15 hover:text-zinc-950",
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="rounded-[2.2rem] border border-black/5 bg-white/85 p-6 shadow-[0_25px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-zinc-500">
              Question {currentIndex + 1} of {session.length}
            </div>
            <div className="mt-2 h-2 w-56 max-w-full rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full bg-black transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / session.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Badge>{question.mode.replace("-", " ")}</Badge>
            <Badge className="border-black/5 bg-black/5 text-zinc-600">{question.level}</Badge>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-3xl font-semibold tracking-tight text-zinc-950">{question.prompt}</div>
          {question.statement ? (
            <p className="mt-4 rounded-[1.6rem] bg-zinc-50 px-5 py-4 text-base leading-7 text-zinc-700">
              {question.statement}
            </p>
          ) : null}
        </div>

        {question.options ? (
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {question.options.map((option) => (
              <button
                key={option}
                type="button"
                disabled={submitted}
                onClick={() => submitAnswer(option)}
                className={cn(
                  "rounded-[1.4rem] border px-5 py-4 text-left text-base transition",
                  submitted && option === question.correctAnswer
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                    : "border-black/8 bg-white text-zinc-700 hover:border-black/15 hover:bg-black/[0.02]",
                  submitted &&
                    option === selectedAnswer &&
                    option !== question.correctAnswer &&
                    "border-red-300 bg-red-50 text-red-700",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        ) : question.mode === "true-false" ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { value: "true", label: "True" },
              { value: "false", label: "False" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                disabled={submitted}
                onClick={() => submitAnswer(option.value)}
                className={cn(
                  "rounded-[1.4rem] border px-5 py-4 text-left text-base transition",
                  submitted && option.value === question.correctAnswer
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                    : "border-black/8 bg-white text-zinc-700 hover:border-black/15 hover:bg-black/[0.02]",
                  submitted &&
                    option.value === selectedAnswer &&
                    option.value !== question.correctAnswer &&
                    "border-red-300 bg-red-50 text-red-700",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              value={typedAnswer}
              onChange={(event) => setTypedAnswer(event.target.value)}
              placeholder="Type the English word"
              className="min-w-0 flex-1 rounded-[1.4rem] border border-black/10 bg-white px-5 py-4 text-base text-zinc-950 outline-none transition focus:border-black/20"
            />
            <Button onClick={() => submitAnswer(typedAnswer)}>Submit</Button>
          </div>
        )}

        {submitted ? (
          <div
            className={cn(
              "mt-8 rounded-[1.6rem] px-5 py-4",
              isAnswerCorrect(question, selectedAnswer || typedAnswer)
                ? "bg-emerald-50 text-emerald-900"
                : "bg-amber-50 text-amber-900",
            )}
          >
            <div className="text-sm font-semibold uppercase tracking-[0.18em]">
              {isAnswerCorrect(question, selectedAnswer || typedAnswer) ? "Correct" : "Review"}
            </div>
            <div className="mt-2 text-base leading-7">
              {question.explanation}
              {!isAnswerCorrect(question, selectedAnswer || typedAnswer)
                ? ` Correct answer: ${question.correctAnswer}.`
                : null}
            </div>

            <div className="mt-5">
              <Button onClick={nextQuestion}>
                {currentIndex === session.length - 1 ? "Finish session" : "Next question"}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.8rem] bg-zinc-50 p-5">
      <div className="text-sm text-zinc-500">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">{value}</div>
    </div>
  );
}
