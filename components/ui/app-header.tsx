"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { APP_NAME, NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/75 backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/70">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white dark:bg-white dark:text-black">
            L
          </span>
          <div>
            <div className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-white">{APP_NAME}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">English vocabulary, designed well.</div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <nav className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-black/5 bg-white/80 p-1 shadow-[0_12px_40px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/" ? pathname === item.href : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-zinc-500 transition hover:bg-black/[0.03] hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/8 dark:hover:text-white",
                  active &&
                    "border border-black/6 bg-white text-zinc-950 shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:shadow-none",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          </nav>
        </div>
      </div>
    </header>
  );
}
