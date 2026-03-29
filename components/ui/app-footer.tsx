import Link from "next/link";

import { APP_NAME } from "@/lib/constants";
import { PageShell } from "@/components/ui/page-shell";

export function AppFooter() {
  return (
    <footer className="border-t border-black/5 bg-white/80">
      <PageShell className="flex flex-col gap-4 py-10 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-semibold text-zinc-900">{APP_NAME}</span> is structured for a
          Supabase-backed 20,000-word catalog and ships with a curated 100-word starter set.
        </div>
        <div className="flex gap-4">
          <Link href="/words" className="transition hover:text-zinc-950">
            Explore words
          </Link>
          <Link href="/quiz" className="transition hover:text-zinc-950">
            Practice quiz
          </Link>
          <Link href="/progress" className="transition hover:text-zinc-950">
            View progress
          </Link>
        </div>
      </PageShell>
    </footer>
  );
}
