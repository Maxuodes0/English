import { CtaSection } from "@/components/sections/cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LearningExperienceSection } from "@/components/sections/learning-experience-section";
import { ProgressPreviewSection } from "@/components/sections/progress-preview-section";
import { QuizPreviewSection } from "@/components/sections/quiz-preview-section";
import { getCatalogSummary, getDailyWords } from "@/lib/word-service";

export default function HomePage() {
  const summary = getCatalogSummary();
  const dailyWords = getDailyWords();

  return (
    <>
      <HeroSection summary={summary} dailyWords={dailyWords} />
      <LearningExperienceSection />
      <QuizPreviewSection />
      <ProgressPreviewSection />
      <CtaSection />
    </>
  );
}
