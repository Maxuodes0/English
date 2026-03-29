import { PageShell } from "@/components/ui/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const quizModes = [
  "Multiple choice for fast recognition",
  "True / false for meaning verification",
  "Arabic to English reversal for active recall",
  "Typing tests for precise memory retrieval",
];

export function QuizPreviewSection() {
  return (
    <section className="py-16 sm:py-20">
      <PageShell>
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            eyebrow="Quiz system"
            title="Four quiz modes. One signal: can the learner recall the word?"
            description="The platform tracks accuracy, current streak, and progress by CEFR level. Sessions can be mixed, level-specific, or focused on a single word."
          />

          <Reveal className="rounded-[2.4rem] border border-black/5 bg-zinc-950 p-6 text-white shadow-[0_30px_100px_rgba(15,23,42,0.18)] sm:p-8">
            <div className="text-sm font-semibold tracking-[0.2em] text-white/50 uppercase">
              Session logic
            </div>
            <div className="mt-8 space-y-4">
              {quizModes.map((mode, index) => (
                <div
                  key={mode}
                  className="flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-zinc-950">
                    0{index + 1}
                  </div>
                  <div className="text-base text-white/85">{mode}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </PageShell>
    </section>
  );
}
