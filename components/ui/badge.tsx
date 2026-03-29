import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
