import Link from "next/link";

import { APP_NAME } from "@/lib/constants";
import { PageShell } from "@/components/ui/page-shell";

export function AppFooter() {
  return (
    <footer className="border-t border-black/5 bg-white/80 dark:border-white/10 dark:bg-zinc-950/70">
      <PageShell className="flex flex-col gap-4 py-10 text-sm text-zinc-500 dark:text-zinc-400 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-semibold text-zinc-900 dark:text-white">{APP_NAME}</span> is structured for a
          Supabase-backed 20,000-word catalog and ships with a curated 100-word starter set.
        </div>
        <div className="flex gap-4">
          <Link href="/words" className="transition hover:text-zinc-950 dark:hover:text-white">
            Explore words
          </Link>
          <Link href="/quiz" className="transition hover:text-zinc-950 dark:hover:text-white">
            Practice quiz
          </Link>
          <Link href="/progress" className="transition hover:text-zinc-950 dark:hover:text-white">
            View progress
          </Link>
        </div>
      </PageShell>
    </footer>
  );
}
