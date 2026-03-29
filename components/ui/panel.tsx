import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PanelProps {
  children: ReactNode;
  className?: string;
}

export function Panel({ children, className }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-white/70 bg-white/72 p-6 shadow-[0_30px_80px_rgba(148,163,184,0.18)] backdrop-blur-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
