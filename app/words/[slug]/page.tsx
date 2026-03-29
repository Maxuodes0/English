import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { WordCard } from "@/components/ui/word-card";
import { WordPracticePanel } from "@/components/ui/word-practice-panel";
import { categories } from "@/data/categories";
import { getAllWords, getRelatedWords, getWordBySlug } from "@/lib/word-service";

export async function generateStaticParams() {
  return getAllWords().map((word) => ({
    slug: word.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const word = getWordBySlug(slug);

  if (!word) {
    return {
      title: "Word not found",
    };
  }

  return {
    title: `${word.word} | ${word.arabicTranslation}`,
    description: word.englishDefinition,
  };
}

export default async function WordDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const word = getWordBySlug(slug);

  if (!word) {
    notFound();
  }

  const allWords = getAllWords();
  const relatedWords = getRelatedWords(word, 3);
  const category = categories.find((item) => item.id === word.category);

  return (
    <div className="py-10 sm:py-14">
      <PageShell>
        <div className="space-y-8">
          <Reveal className="rounded-[2.4rem] border border-black/5 bg-white/85 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex flex-wrap gap-2 text-sm text-zinc-500">
                  <span className="rounded-full bg-black px-3 py-1 text-white">{word.level}</span>
                  <span className="rounded-full border border-black/8 px-3 py-1">
                    {category?.title ?? word.category}
                  </span>
                </div>
                <h1 className="mt-6 font-serif text-5xl tracking-tight text-zinc-950 sm:text-6xl">
                  {word.word}
                </h1>
                <div className="mt-3 text-2xl text-zinc-500">{word.arabicTranslation}</div>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
                  {word.englishDefinition}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <ButtonLink href={`/words/${word.slug}/focus`}>Open focus mode</ButtonLink>
                <ButtonLink href={`/quiz?word=${word.slug}`} variant="secondary">
                  Quiz this word
                </ButtonLink>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[1.8rem] bg-zinc-50 p-5">
                <div className="text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
                  Arabic definition
                </div>
                <p className="mt-3 text-base leading-7 text-zinc-700">{word.arabicDefinition}</p>
              </div>
              <div className="rounded-[1.8rem] bg-zinc-50 p-5">
                <div className="text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
                  Example sentence
                </div>
                <p className="mt-3 text-base leading-7 text-zinc-900">{word.exampleEn}</p>
                <p className="mt-2 text-sm leading-7 text-zinc-500">{word.exampleAr}</p>
                <p className="mt-4 text-sm text-zinc-400">
                  Pronunciation placeholder: /audio/{word.slug}.mp3
                </p>
              </div>
            </div>
          </Reveal>

          <WordPracticePanel word={word} words={allWords} />

          <section className="space-y-5">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Related words</h2>
              <p className="mt-2 text-sm leading-7 text-zinc-600">
                Keep the same context and move through nearby vocabulary without losing focus.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedWords.map((relatedWord) => (
                <WordCard key={relatedWord.id} word={relatedWord} />
              ))}
            </div>
          </section>
        </div>
      </PageShell>
    </div>
  );
}
