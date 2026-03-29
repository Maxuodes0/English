import { QUIZ_MODES } from "@/lib/constants";
import { QuizMode, QuizQuestion, WordRecord } from "@/lib/types";
import { normalizeAnswer, shuffle } from "@/lib/utils";

function pickDistractors(
  words: WordRecord[],
  currentWord: WordRecord,
  count: number,
  field: "arabicTranslation" | "word",
) {
  const pool = words.filter((candidate) => candidate.id !== currentWord.id);
  const sameLevelPool = pool.filter((candidate) => candidate.level === currentWord.level);
  const source = sameLevelPool.length >= count ? sameLevelPool : pool;

  return shuffle(source)
    .map((item) => item[field])
    .filter((value, index, collection) => collection.indexOf(value) === index)
    .slice(0, count);
}

export function buildQuestion(
  word: WordRecord,
  allWords: WordRecord[],
  mode: QuizMode,
  index = 0,
): QuizQuestion {
  if (mode === "multiple-choice") {
    const options = shuffle([
      word.arabicTranslation,
      ...pickDistractors(allWords, word, 3, "arabicTranslation"),
    ]);

    return {
      id: `${word.id}-${mode}-${index}`,
      wordId: word.id,
      wordSlug: word.slug,
      word: word.word,
      level: word.level,
      category: word.category,
      mode,
      prompt: `What does "${word.word}" mean?`,
      options,
      correctAnswer: word.arabicTranslation,
      explanation: word.englishDefinition,
    };
  }

  if (mode === "true-false") {
    const useCorrectAnswer = Math.random() > 0.5;
    const falseOption = pickDistractors(allWords, word, 1, "arabicTranslation")[0];

    return {
      id: `${word.id}-${mode}-${index}`,
      wordId: word.id,
      wordSlug: word.slug,
      word: word.word,
      level: word.level,
      category: word.category,
      mode,
      prompt: "Is this meaning correct?",
      statement: `"${word.word}" means "${useCorrectAnswer ? word.arabicTranslation : falseOption}".`,
      correctAnswer: useCorrectAnswer ? "true" : "false",
      explanation: `${word.word}: ${word.arabicTranslation}`,
    };
  }

  if (mode === "reverse") {
    const options = shuffle([word.word, ...pickDistractors(allWords, word, 3, "word")]);

    return {
      id: `${word.id}-${mode}-${index}`,
      wordId: word.id,
      wordSlug: word.slug,
      word: word.word,
      level: word.level,
      category: word.category,
      mode,
      prompt: `Which English word matches "${word.arabicTranslation}"?`,
      options,
      correctAnswer: word.word,
      explanation: word.englishDefinition,
    };
  }

  return {
    id: `${word.id}-${mode}-${index}`,
    wordId: word.id,
    wordSlug: word.slug,
    word: word.word,
    level: word.level,
    category: word.category,
    mode,
    prompt: `Type the English word for "${word.arabicTranslation}".`,
    correctAnswer: word.word,
    explanation: word.exampleEn,
  };
}

export function buildQuizSession(
  sourceWords: WordRecord[],
  allWords: WordRecord[],
  count: number,
  mode: QuizMode | "mixed" = "mixed",
) {
  const shuffledWords = shuffle(sourceWords).slice(0, count);

  return shuffledWords.map((word, index) => {
    const pickedMode = mode === "mixed" ? QUIZ_MODES[index % QUIZ_MODES.length].id : mode;
    return buildQuestion(word, allWords, pickedMode, index);
  });
}

export function buildWordQuizSet(word: WordRecord, allWords: WordRecord[]) {
  return QUIZ_MODES.map((mode, index) => buildQuestion(word, allWords, mode.id, index));
}

export function isAnswerCorrect(question: QuizQuestion, answer: string) {
  if (question.mode === "typing") {
    return normalizeAnswer(answer) === normalizeAnswer(question.correctAnswer);
  }

  return answer === question.correctAnswer;
}
