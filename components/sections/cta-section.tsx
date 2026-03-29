import { ButtonLink } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";

export function CtaSection() {
  return (
    <section className="py-16 sm:py-20">
      <PageShell>
        <div className="rounded-[2.6rem] border border-black/5 bg-[linear-gradient(140deg,rgba(15,23,42,0.98),rgba(24,24,27,0.92))] px-6 py-10 text-white shadow-[0_30px_100px_rgba(15,23,42,0.18)] sm:px-10 sm:py-12">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold tracking-[0.22em] text-white/50 uppercase">
              Ready to learn
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Start with the library, switch into focus mode, then prove retention in the quiz.
            </h2>
            <p className="mt-4 text-base leading-8 text-white/70">
              The structure is ready for Supabase auth and a 20,000-word import. The current build
              already ships a polished MVP flow with 100 curated words.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/words">Explore words</ButtonLink>
            <ButtonLink href="/progress" variant="secondary">
              View progress
            </ButtonLink>
          </div>
        </div>
      </PageShell>
    </section>
  );
}
