import { PageShell } from "@/components/ui/page-shell";
import { QuizArena } from "@/components/ui/quiz-arena";
import { getAllWords } from "@/lib/word-service";

export const metadata = {
  title: "Quiz",
};

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<{ word?: string }>;
}) {
  const words = getAllWords();
  const params = await searchParams;

  return (
    <div className="py-10 sm:py-14">
      <PageShell>
        <QuizArena words={words} focusWordSlug={params.word ?? null} />
      </PageShell>
    </div>
  );
}
