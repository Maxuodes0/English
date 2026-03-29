import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex items-center justify-center rounded-full border text-sm font-semibold tracking-tight no-underline transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.985]";

const variants = {
  primary:
    "border-slate-300/70 bg-[linear-gradient(135deg,#1f2937,#334155)] px-5 py-3 !text-white shadow-[0_18px_50px_rgba(15,23,42,0.15)] hover:-translate-y-0.5 hover:!text-white hover:shadow-[0_24px_70px_rgba(15,23,42,0.2)] visited:!text-white",
  secondary:
    "border-black/10 bg-white/82 px-5 py-3 !text-zinc-900 backdrop-blur-xl hover:-translate-y-0.5 hover:border-black/15 hover:bg-white hover:!text-zinc-950 visited:!text-zinc-900",
  ghost:
    "border-transparent bg-transparent px-3 py-2 !text-zinc-700 hover:bg-black/5 hover:!text-black visited:!text-zinc-700",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", ...props },
  ref,
) {
  return <button ref={ref} className={cn(baseStyles, variants[variant], className)} {...props} />;
});

type ButtonLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    variant?: keyof typeof variants;
  };

export function ButtonLink({
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return <Link className={cn(baseStyles, variants[variant], className)} {...props} />;
}

export const LinkButton = ButtonLink;
