import { categories } from "@/data/categories";
import { words } from "@/data/words";
import { DAILY_WORD_COUNT } from "@/lib/constants";
import { CatalogSummary, CategoryId, Level, LEVELS, WordRecord } from "@/lib/types";

type WordFilters = {
  search?: string;
  level?: Level | "all";
  category?: CategoryId | "all";
  limit?: number;
};

export function getAllWords() {
  return words;
}

export function getAllCategories() {
  return categories;
}

export function getWordBySlug(slug: string) {
  return words.find((word) => word.slug === slug) ?? null;
}

export function getRelatedWords(word: WordRecord, limit = 3) {
  return words
    .filter((candidate) => candidate.id !== word.id && candidate.category === word.category)
    .slice(0, limit);
}

export function filterWords(filters: WordFilters = {}) {
  const search = filters.search?.trim().toLowerCase();

  let filtered = words.filter((word) => {
    const matchesSearch =
      !search ||
      word.word.toLowerCase().includes(search) ||
      word.arabicTranslation.includes(search) ||
      word.englishDefinition.toLowerCase().includes(search);

    const matchesLevel = !filters.level || filters.level === "all" || word.level === filters.level;
    const matchesCategory =
      !filters.category || filters.category === "all" || word.category === filters.category;

    return matchesSearch && matchesLevel && matchesCategory;
  });

  if (filters.limit) {
    filtered = filtered.slice(0, filters.limit);
  }

  return filtered;
}

export function getDailyWords(count = DAILY_WORD_COUNT) {
  const anchor = new Date().toISOString().slice(0, 10);
  const seed = anchor.split("-").reduce((total, part) => total + Number(part), 0);
  const start = seed % words.length;
  const daily: WordRecord[] = [];

  for (let index = 0; index < count; index += 1) {
    daily.push(words[(start + index * 7) % words.length]);
  }

  return daily;
}

export function getCatalogSummary(): CatalogSummary {
  return {
    totalWords: words.length,
    categories: categories.length,
    byLevel: LEVELS.reduce(
      (result, level) => ({
        ...result,
        [level]: words.filter((word) => word.level === level).length,
      }),
      {} as Record<Level, number>,
    ),
  };
}

export function getWordsByLevel(level: Level) {
  return words.filter((word) => word.level === level);
}
