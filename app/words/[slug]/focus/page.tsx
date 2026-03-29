import { notFound } from "next/navigation";

import { FocusModePanel } from "@/components/ui/focus-mode-panel";
import { PageShell } from "@/components/ui/page-shell";
import { getAllWords, getWordBySlug } from "@/lib/word-service";

export default async function FocusModePage({
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
  const currentIndex = allWords.findIndex((item) => item.id === word.id);
  const nextWord = allWords[currentIndex + 1] ?? null;

  return (
    <PageShell>
      <FocusModePanel word={word} nextWord={nextWord} />
    </PageShell>
  );
}
