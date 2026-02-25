import { useState } from "react";
import OverviewScreen from "@/components/OverviewScreen";
import SessionScreen from "@/components/SessionScreen";
import CompleteScreen from "@/components/CompleteScreen";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type Screen = "overview" | "session" | "complete";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("overview");

  return (
    <div style={{ position: "relative" }}>
      {/* ─── Language switcher – always visible top-right ─── */}
      <div
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          zIndex: 9999,
        }}
      >
        <LanguageSwitcher />
      </div>

      {/* ─── Screen content ─── */}
      <div className="max-w-md mx-auto">
        {screen === "overview" && (
          <OverviewScreen onStart={() => setScreen("session")} />
        )}
        {screen === "session" && (
          <SessionScreen
            onComplete={() => setScreen("complete")}
            onEnd={() => setScreen("overview")}
          />
        )}
        {screen === "complete" && (
          <CompleteScreen
            onRestart={() => setScreen("session")}
            onBack={() => setScreen("overview")}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
