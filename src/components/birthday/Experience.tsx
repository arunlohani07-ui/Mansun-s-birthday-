import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MusicPlayer } from "./MusicPlayer";
import { CakePage } from "./Cake";
import { HeartGradientDefs } from "./ui";
import { Beauty, Final, Gallery, Hug, Letter, Memories, Opening, Password, Promise, Welcome } from "./Pages";

const STEPS = ["Welcome", "Letter", "Beauty", "Gallery", "Memories", "Cake", "Promise", "Hug", "Final"] as const;

export function Experience() {
  const [stage, setStage] = useState<"opening" | "password" | "journey">("opening");
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [run, setRun] = useState(0);

  const go = useCallback((n: number) => {
    setStep((s) => {
      const t = Math.max(0, Math.min(STEPS.length - 1, n));
      setDir(t >= s ? "next" : "prev");
      return t;
    });
  }, []);

  useEffect(() => {
    if (stage !== "journey") return;
    const k = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT" || document.querySelector("[role=dialog]")) return;
      if (e.key === "ArrowRight") go(step + 1);
      if (e.key === "ArrowLeft") go(step - 1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [stage, step, go]);

  const replay = () => { setDir("next"); setStep(0); setRun((r) => r + 1); };
  const name = STEPS[step];

  return (
    <main className="fixed inset-0 overflow-hidden" style={{ paddingTop: "env(safe-area-inset-top)", paddingLeft: "env(safe-area-inset-left)", paddingRight: "env(safe-area-inset-right)" }}>
      <HeartGradientDefs />
      {stage === "journey" && <MusicPlayer />}
      {stage === "opening" && <Opening onDone={() => setStage("password")} />}
      {stage === "password" && <div className="anim-enter-next h-full"><Password onUnlock={() => setStage("journey")} /></div>}
      {stage === "journey" && (
        <div className="flex h-full flex-col">
          <div key={`${name}-${run}`} className={`relative min-h-0 flex-1 ${dir === "next" ? "anim-enter-next" : "anim-enter-prev"}`}>
            {name === "Welcome" && <Welcome next={() => go(1)} />}
            {name === "Letter" && <Letter />}
            {name === "Beauty" && <Beauty />}
            {name === "Gallery" && <Gallery />}
            {name === "Memories" && <Memories />}
            {name === "Cake" && <CakePage />}
            {name === "Promise" && <Promise />}
            {name === "Hug" && <Hug />}
            {name === "Final" && <Final replay={replay} />}
            <div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="anim-sweep h-full w-1/2 bg-gradient-to-r from-transparent via-blush/10 to-transparent" /></div>
          </div>
          <nav className="z-30 flex shrink-0 items-center justify-between gap-3 px-4 pt-2" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }} aria-label="Page navigation">
            <button onClick={() => go(step - 1)} disabled={step === 0} className="glass flex h-11 items-center gap-1 rounded-full px-4 text-sm disabled:opacity-30"><ChevronLeft className="h-4 w-4" />Back</button>
            <div className="flex min-w-0 items-center gap-1.5" aria-label={`Page ${step + 1} of ${STEPS.length}`}>
              {STEPS.map((s, i) => (
                <button key={s} aria-label={`Go to ${s}`} onClick={() => go(i)} className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-blush" : "w-1.5 bg-foreground/30"}`} />
              ))}
            </div>
            <button onClick={() => go(step + 1)} disabled={step === STEPS.length - 1} className="btn-rose flex h-11 items-center gap-1 rounded-full px-4 text-sm font-semibold disabled:opacity-30">Next<ChevronRight className="h-4 w-4" /></button>
          </nav>
        </div>
      )}
    </main>
  );
}
