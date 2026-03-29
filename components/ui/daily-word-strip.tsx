import { Reveal } from "@/components/ui/reveal";
import { WordCard } from "@/components/ui/word-card";
import { WordRecord } from "@/lib/types";

type DailyWordStripProps = {
  words: WordRecord[];
  variant?: "default" | "hero";
};

export function DailyWordStrip({ words, variant = "default" }: DailyWordStripProps) {
  return (
    <div
      className={
        variant === "hero"
          ? "grid gap-4 sm:grid-cols-2"
          : "grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      }
    >
      {words.map((word, index) => (
        <Reveal key={word.id} delay={index * 0.08} className="min-w-0">
          <WordCard word={word} compact />
        </Reveal>
      ))}
    </div>
  );
}
