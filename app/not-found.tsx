import { ButtonLink } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";

export default function NotFound() {
  return (
    <PageShell className="py-24">
      <div className="rounded-[2.4rem] border border-black/5 bg-white/85 px-6 py-16 text-center shadow-[0_30px_100px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="text-sm font-semibold tracking-[0.2em] text-zinc-400 uppercase">
          Not found
        </div>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-950">
          This page is not in the vocabulary flow.
        </h1>
        <p className="mt-4 text-base leading-8 text-zinc-600">
          Return to the library or start a quiz session.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/words">Open library</ButtonLink>
          <ButtonLink href="/quiz" variant="secondary">
            Start quiz
          </ButtonLink>
        </div>
      </div>
    </PageShell>
  );
}
