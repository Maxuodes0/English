import { PageShell } from "@/components/ui/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProgressPreviewSection() {
  return (
    <section className="py-16 sm:py-20">
      <PageShell>
        <SectionHeading
          eyebrow="Progress tracking"
          title="Measure consistency, not just completion."
          description="The MVP stores progress locally and is wired to the same shape used by the Supabase tables, so daily streaks, weak-word review, and quiz history are ready to persist server-side."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Daily streak", "Track active learning days, not just opened pages."],
            ["Weak words", "Identify words with low accuracy after repeated exposure."],
            ["Level progress", "See how completion grows across A1 to C1."],
          ].map(([title, description], index) => (
            <Reveal
              key={title}
              delay={index * 0.08}
              className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-none"
            >
              <div className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">{title}</div>
              <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{description}</p>
            </Reveal>
          ))}
        </div>
      </PageShell>
    </section>
  );
}
