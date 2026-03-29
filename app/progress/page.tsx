import { PageShell } from "@/components/ui/page-shell";
import { ProgressDashboard } from "@/components/ui/progress-dashboard";
import { getAllWords } from "@/lib/word-service";

export const metadata = {
  title: "Progress",
};

export default function ProgressPage() {
  const words = getAllWords();

  return (
    <div className="py-10 sm:py-14">
      <PageShell>
        <ProgressDashboard words={words} />
      </PageShell>
    </div>
  );
}
