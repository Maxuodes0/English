"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import { ButtonLink } from "@/components/ui/button";
import { DailyWordStrip } from "@/components/ui/daily-word-strip";
import { PageShell } from "@/components/ui/page-shell";
import { CatalogSummary, WordRecord } from "@/lib/types";

type HeroSectionProps = {
  summary: CatalogSummary;
  dailyWords: WordRecord[];
};

export function HeroSection({ summary, dailyWords }: HeroSectionProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(244,114,182,0.14),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f8fafc_55%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.1),transparent_22%),linear-gradient(180deg,#09090b_0%,#111827_58%,#09090b_100%)]" />
      <PageShell className="relative">
        <div className="grid items-end gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <motion.div style={{ y }} className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-black/8 bg-white/70 px-4 py-2 text-sm text-zinc-600 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
              Premium English vocabulary, calibrated for Arabic learners
            </div>
            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-6xl md:text-7xl">
                Learn the right English words in a product that feels quiet, fast, and deliberate.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300 sm:text-xl">
                Lumena pairs a scalable vocabulary architecture with calm typography, subtle motion,
                bilingual clarity, and quiz mechanics that make recall measurable.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/words">Browse words</ButtonLink>
              <ButtonLink href="/quiz" variant="secondary">
                Start quiz
              </ButtonLink>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="Starter dataset" value={`${summary.totalWords}+`} />
              <Stat label="Catalog target" value="20,000" />
              <Stat label="Quiz modes" value="4" />
            </div>
          </motion.div>

          <div className="overflow-hidden rounded-[2.2rem] border border-black/5 bg-white/72 p-6 shadow-[0_30px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:shadow-none">
            <div className="text-sm font-semibold tracking-[0.2em] text-zinc-400 uppercase dark:text-zinc-500">
              Daily words
            </div>
            <div className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              A calm four-word rotation, refreshed every day.
            </div>
            <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              The selection changes automatically from the catalog and works as a light daily entry
              point before the full learning flow.
            </p>
            <div className="mt-6">
              <DailyWordStrip words={dailyWords} variant="hero" />
            </div>
          </div>
        </div>
      </PageShell>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.7rem] border border-black/5 bg-white/72 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <div className="text-sm text-zinc-500 dark:text-zinc-400">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">{value}</div>
    </div>
  );
}
