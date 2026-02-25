import { CheckCircle2 } from "lucide-react";
import { useTranslated } from "@/contexts/TranslationContext";

interface Props {
  onRestart: () => void;
  onBack: () => void;
}

const CompleteScreen = ({ onRestart, onBack }: Props) => {
  const t = useTranslated({
    heading: "You're Feeling Calmer",
    body: "Great job completing your breathing session. Take a moment to notice how your body feels — lighter, steadier, more at ease.",
    restartBtn: "Start Again",
    backBtn: "Back",
  });

  return (
    <div className="min-h-screen gradient-calm flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>

        <h2 className="text-2xl font-semibold text-foreground mb-2 text-center">
          {t.heading}
        </h2>
        <p className="text-muted-foreground text-center text-[15px] leading-relaxed max-w-xs mb-10">
          {t.body}
        </p>

        <button
          onClick={onRestart}
          className="w-full max-w-xs py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-base shadow-button hover:brightness-105 active:scale-[0.98] transition-all duration-200 mb-3"
        >
          {t.restartBtn}
        </button>
        <button
          onClick={onBack}
          className="w-full max-w-xs py-4 rounded-lg bg-card text-secondary-foreground font-medium text-base shadow-soft hover:bg-muted active:scale-[0.98] transition-all duration-200"
        >
          {t.backBtn}
        </button>
      </div>
    </div>
  );
};

export default CompleteScreen;
