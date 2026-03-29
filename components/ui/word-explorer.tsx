"use client";

import { useDeferredValue, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { WordCard } from "@/components/ui/word-card";
import { CategoryRecord, LEVELS, WordRecord } from "@/lib/types";

type WordExplorerProps = {
  words: WordRecord[];
  categories: CategoryRecord[];
};

export function WordExplorer({ words, categories }: WordExplorerProps) {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<(typeof LEVELS)[number] | "all">("all");
  const [category, setCategory] = useState<CategoryRecord["id"] | "all">("all");
  const deferredSearch = useDeferredValue(search);

  const filteredWords = words.filter((word) => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    const matchesSearch =
      !normalizedSearch ||
      word.word.toLowerCase().includes(normalizedSearch) ||
      word.arabicTranslation.includes(normalizedSearch) ||
      word.englishDefinition.toLowerCase().includes(normalizedSearch);

    const matchesLevel = level === "all" || word.level === level;
    const matchesCategory = category === "all" || word.category === category;

    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Vocabulary library"
        title="Browse the catalog with focus, not friction."
        description="Search by English or Arabic, narrow by CEFR level, and move from discovery to a focused study view without leaving the flow."
      />

      <div className="rounded-[2rem] border border-black/5 bg-white/80 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_repeat(2,minmax(0,0.7fr))]">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-zinc-600">Search</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try book, travel, or كتاب"
              className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-black/20"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-zinc-600">Level</span>
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value as (typeof LEVELS)[number] | "all")}
              className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-black/20"
            >
              <option value="all">All levels</option>
              {LEVELS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-zinc-600">Category</span>
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as CategoryRecord["id"] | "all")
              }
              className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-black/20"
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory((current) => (current === item.id ? "all" : item.id))}
              className="rounded-full border border-black/8 px-3 py-2 text-sm text-zinc-600 transition hover:border-black/15 hover:text-zinc-950"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Badge>{filteredWords.length} words shown</Badge>
          <Badge className="border-black/5 bg-black/5 text-zinc-600">
            {level === "all" ? "All levels" : `Level ${level}`}
          </Badge>
          <Badge className="border-black/5 bg-black/5 text-zinc-600">
            {category === "all"
              ? "All categories"
              : categories.find((item) => item.id === category)?.title}
          </Badge>
        </div>
        <ButtonLink href="/quiz" variant="secondary">
          Open quiz studio
        </ButtonLink>
      </div>

      {filteredWords.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredWords.map((word) => (
            <WordCard key={word.id} word={word} />
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-black/10 bg-white/60 px-6 py-16 text-center">
          <div className="text-xl font-semibold tracking-tight text-zinc-950">No words match this filter.</div>
          <p className="mt-3 text-sm leading-7 text-zinc-600">
            Try a broader search, switch the level, or clear the category filter.
          </p>
        </div>
      )}
    </div>
  );
}
