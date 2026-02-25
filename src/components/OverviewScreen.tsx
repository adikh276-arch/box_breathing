import { ArrowLeft } from "lucide-react";

interface Props {
  onStart: () => void;
}

const OverviewScreen = ({ onStart }: Props) => {
  return (
    <div className="min-h-screen gradient-calm flex flex-col">
      {/* Header */}
      <header className="flex items-center px-6 pt-6 pb-4">
        <button className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-foreground pr-10">
          Relax
        </h1>
      </header>

      {/* Content */}
      <div className="flex-1 px-6 pb-8 flex flex-col">
        {/* About Section */}
        <section className="bg-card rounded-lg p-6 shadow-soft mb-5 animate-fade-in">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
            About This Technique
          </p>
          <p className="text-secondary-foreground leading-relaxed text-[15px]">
            Box breathing uses a simple 4-4-4-4 pattern — inhale, hold, exhale,
            hold — each for four seconds. It activates your parasympathetic
            nervous system, lowering stress and bringing you back to a calm,
            focused state.
          </p>
        </section>

        {/* Steps Section */}
        <section className="bg-card rounded-lg p-6 shadow-soft animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
            How to Practice
          </p>
          <ul className="space-y-3">
            {[
              "Inhale for 4 seconds",
              "Hold for 4 seconds",
              "Exhale for 4 seconds",
              "Hold for 4 seconds",
              "Repeat the cycle",
            ].map((step, i) => (
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
          Start Breathing
        </button>
      </div>
    </div>
  );
};

export default OverviewScreen;
