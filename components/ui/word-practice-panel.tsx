"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useProgress } from "@/components/ui/progress-provider";
import { buildWordQuizSet, isAnswerCorrect } from "@/lib/quiz";
import { QuizQuestion, WordRecord } from "@/lib/types";
import { cn } from "@/lib/utils";

type WordPracticePanelProps = {
  word: WordRecord;
  words: WordRecord[];
};

type ResultMap = Record<string, { submitted: boolean; isCorrect: boolean; answer: string }>;

export function WordPracticePanel({ word, words }: WordPracticePanelProps) {
  const [questions, setQuestions] = useState(() => buildWordQuizSet(word, words));
  const [typedAnswers, setTypedAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<ResultMap>({});
  const { recordQuizResult } = useProgress();

  function refresh() {
    setQuestions(buildWordQuizSet(word, words));
    setTypedAnswers({});
    setResults({});
  }

  function submit(question: QuizQuestion, answer: string) {
    if (results[question.id]?.submitted) {
      return;
    }

    const correct = isAnswerCorrect(question, answer);

    setResults((current) => ({
      ...current,
      [question.id]: {
        submitted: true,
        isCorrect: correct,
        answer,
      },
    }));

    recordQuizResult({
      wordId: word.id,
      level: word.level,
      mode: question.mode,
      isCorrect: correct,
    });
  }

  return (
    <div className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xl font-semibold tracking-tight text-zinc-950">Practice this word</div>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-600">
            Run the four quiz modes against a single word, then continue into a full quiz session if you want repetition.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={refresh}>
            New prompts
          </Button>
          <Link
            href={`/quiz?word=${word.slug}`}
            className="inline-flex items-center justify-center rounded-full border border-black bg-black px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-900"
          >
            Focused quiz
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {questions.map((question) => {
          const result = results[question.id];

          return (
            <div
              key={question.id}
              className="rounded-[1.6rem] border border-black/6 bg-zinc-50/80 p-5"
            >
              <div className="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                {question.mode.replace("-", " ")}
              </div>
              <div className="mt-3 text-lg font-semibold tracking-tight text-zinc-950">
                {question.prompt}
              </div>
              {question.statement ? (
                <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm text-zinc-700">
                  {question.statement}
                </p>
              ) : null}

              {question.options ? (
                <div className="mt-4 grid gap-3">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      disabled={Boolean(result?.submitted)}
                      onClick={() => submit(question, option)}
                      className={cn(
                        "rounded-2xl border px-4 py-3 text-left text-sm transition",
                        result?.submitted && option === question.correctAnswer
                          ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                          : "border-black/8 bg-white text-zinc-700 hover:border-black/15 hover:bg-black/[0.02]",
                        result?.submitted &&
                          option === result.answer &&
                          option !== question.correctAnswer &&
                          "border-red-300 bg-red-50 text-red-700",
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : question.mode === "true-false" ? (
                <div className="mt-4 flex gap-3">
                  {[
                    { value: "true", label: "True" },
                    { value: "false", label: "False" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      disabled={Boolean(result?.submitted)}
                      onClick={() => submit(question, option.value)}
                      className={cn(
                        "flex-1 rounded-2xl border px-4 py-3 text-sm transition",
                        result?.submitted && option.value === question.correctAnswer
                          ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                          : "border-black/8 bg-white text-zinc-700 hover:border-black/15 hover:bg-black/[0.02]",
                        result?.submitted &&
                          option.value === result.answer &&
                          option.value !== question.correctAnswer &&
                          "border-red-300 bg-red-50 text-red-700",
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input
                    value={typedAnswers[question.id] ?? ""}
                    onChange={(event) =>
                      setTypedAnswers((current) => ({
                        ...current,
                        [question.id]: event.target.value,
                      }))
                    }
                    placeholder="Type the word"
                    className="min-w-0 flex-1 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-black/20"
                  />
                  <Button onClick={() => submit(question, typedAnswers[question.id] ?? "")}>
                    Check
                  </Button>
                </div>
              )}

              {result?.submitted ? (
                <div
                  className={cn(
                    "mt-4 rounded-2xl px-4 py-3 text-sm",
                    result.isCorrect
                      ? "bg-emerald-50 text-emerald-800"
                      : "bg-amber-50 text-amber-800",
                  )}
                >
                  <div className="font-semibold">
                    {result.isCorrect ? "Correct answer." : `Correct answer: ${question.correctAnswer}`}
                  </div>
                  <div className="mt-1 leading-6">{question.explanation}</div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
