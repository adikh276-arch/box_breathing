import { ArrowLeft } from "lucide-react";
import { useTranslated } from "@/contexts/TranslationContext";

interface Props {
  onStart: () => void;
}

const OverviewScreen = ({ onStart }: Props) => {
  const t = useTranslated({
    title: "Relax",
    aboutLabel: "About This Technique",
    aboutText:
      "Box breathing uses a simple 4-4-4-4 pattern — inhale, hold, exhale, hold — each for four seconds. It activates your parasympathetic nervous system, lowering stress and bringing you back to a calm, focused state.",
    howLabel: "How to Practice",
    step1: "Inhale for 4 seconds",
    step2: "Hold for 4 seconds",
    step3: "Exhale for 4 seconds",
    step4: "Hold for 4 seconds",
    step5: "Repeat the cycle",
    startBtn: "Start Breathing",
  });

  const steps = [t.step1, t.step2, t.step3, t.step4, t.step5];

  return (
    <div className="min-h-screen gradient-calm flex flex-col">
      {/* Header */}
      <header className="flex items-center px-6 pt-6 pb-4">
        <button className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-foreground pr-10">
          {t.title}
        </h1>
      </header>

      {/* Content */}
      <div className="flex-1 px-6 pb-8 flex flex-col">
        {/* About Section */}
        <section className="bg-card rounded-lg p-6 shadow-soft mb-5 animate-fade-in">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
            {t.aboutLabel}
          </p>
          <p className="text-secondary-foreground leading-relaxed text-[15px]">
            {t.aboutText}
          </p>
        </section>

        {/* Steps Section */}
        <section
          className="bg-card rounded-lg p-6 shadow-soft animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
            {t.howLabel}
          </p>
          <ul className="space-y-3">
            {steps.map((step, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="text-secondary-foreground text-[15px]">{step}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Spacer */}
        <div className="flex-1 min-h-8" />

        {/* CTA */}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-base shadow-button hover:brightness-105 active:scale-[0.98] transition-all duration-200"
        >
          {t.startBtn}
        </button>
      </div>
    </div>
  );
};

export default OverviewScreen;
