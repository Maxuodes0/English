import { DailyWordStrip } from "@/components/ui/daily-word-strip";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { WordExplorer } from "@/components/ui/word-explorer";
import { getAllCategories, getAllWords, getDailyWords } from "@/lib/word-service";

export const metadata = {
  title: "Words",
};

export default function WordsPage() {
  const words = getAllWords();
  const categories = getAllCategories();
  const dailyWords = getDailyWords();

  return (
    <div className="py-10 sm:py-14">
      <PageShell>
        <div className="space-y-14">
          <section className="space-y-8">
            <SectionHeading
              eyebrow="Daily rotation"
              title="Start with a compact set, then move into the full library."
              description="These cards refresh daily and give learners an easy way back into the platform without deciding where to begin."
            />
            <DailyWordStrip words={dailyWords} />
          </section>

          <WordExplorer words={words} categories={categories} />
        </div>
      </PageShell>
    </div>
  );
}
