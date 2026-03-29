import { PageShell } from "@/components/ui/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const features = [
  {
    title: "Focused word detail",
    description:
      "Each word gets English and Arabic definitions, bilingual examples, category context, and a direct path into practice.",
  },
  {
    title: "Distraction-free focus mode",
    description:
      "Open a dedicated study view with large typography, restrained controls, and an audio-ready placeholder for pronunciation.",
  },
  {
    title: "Responsive by default",
    description:
      "Cards, controls, and spacing are tuned for touch devices first, then scaled into a wider desktop layout.",
  },
];

export function LearningExperienceSection() {
  return (
    <section className="py-16 sm:py-20">
      <PageShell>
        <SectionHeading
          eyebrow="Learning experience"
          title="Built to keep attention on the word, not the interface."
          description=""
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="rounded-[2.4rem] border border-black/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.82))] p-6 shadow-[0_30px_100px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
            <div className="text-sm font-semibold tracking-[0.2em] text-zinc-400 uppercase">
              Word detail preview
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="font-serif text-5xl tracking-tight text-zinc-950">benefit</div>
                <div className="mt-3 text-xl text-zinc-500">فائدة</div>
                <div className="mt-6 rounded-[1.6rem] bg-white p-5">
                  <div className="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                    Simple definition
                  </div>
                  <p className="mt-3 text-base leading-7 text-zinc-700">
                    An advantage or positive result that comes from something.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.6rem] bg-white p-5">
                  <div className="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                    Arabic definition
                  </div>
                  <p className="mt-3 text-base leading-7 text-zinc-700">
                    ميزة أو نتيجة إيجابية تأتي من شيء ما.
                  </p>
                </div>
                <div className="rounded-[1.6rem] bg-white p-5">
                  <div className="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                    Example
                  </div>
                  <p className="mt-3 text-base leading-7 text-zinc-900">
                    One benefit of walking is lower stress.
                  </p>
                  <p className="mt-2 text-sm leading-7 text-zinc-500">
                    إحدى فوائد المشي هي تقليل التوتر.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5">
            {features.map((feature, index) => (
              <Reveal
                key={feature.title}
                delay={index * 0.08}
                className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl"
              >
                <div className="text-xl font-semibold tracking-tight text-zinc-950">
                  {feature.title}
                </div>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{feature.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </PageShell>
    </section>
  );
}
