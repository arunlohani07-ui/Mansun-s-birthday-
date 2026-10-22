import { useEffect, useState } from "react";
import { CAKE_SECRET } from "@/lib/content";
import { Page, Petals } from "./ui";

type Phase = "reveal" | "wish" | "blown" | "secret";

function Tier({ w, h, top, bottom }: { w: number; h: number; top: string; bottom: string }) {
  return (
    <div className="relative mx-auto" style={{ width: `${w}%`, height: h }}>
      <div className="absolute inset-x-0 bottom-0 rounded-b-[50%/22px]" style={{ top: 12, background: `linear-gradient(90deg, ${bottom}, ${top} 45%, ${bottom})`, boxShadow: "inset 0 -10px 20px oklch(0 0 0 / 40%)" }} />
      {/* drip */}
      <div className="absolute inset-x-0 top-3 h-4" style={{ background: "radial-gradient(circle at 10px 0, var(--blush) 6px, transparent 7px) 0 0/22px 16px repeat-x", opacity: 0.85 }} />
      <div className="absolute inset-x-0 top-0 h-6 rounded-[50%]" style={{ background: `radial-gradient(ellipse at 50% 40%, var(--blush), ${top})`, boxShadow: "0 2px 0 var(--gold)" }} />
    </div>
  );
}

export function CakePage() {
  const [phase, setPhase] = useState<Phase>("reveal");
  useEffect(() => {
    if (phase !== "reveal") return;
    const t = setTimeout(() => setPhase("wish"), 1600);
    return () => clearTimeout(t);
  }, [phase]);
  useEffect(() => {
    if (phase !== "blown") return;
    const t = setTimeout(() => setPhase("secret"), 1800);
    return () => clearTimeout(t);
  }, [phase]);

  const lit = phase === "reveal" || phase === "wish";
  const blow = () => phase === "wish" && setPhase("blown");

  return (
    <Page>
      <Petals count={8} />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[50vmin] w-[50vmin] -translate-x-1/2 rounded-full bg-flame/20 blur-3xl transition-opacity duration-1000" style={{ opacity: lit ? 1 : 0.15 }} />
      <h2 className="anim-fade-up z-10 mb-3 text-center text-[clamp(1.6rem,6vw,2.6rem)] text-gold">
        {phase === "reveal" ? "For you, mero sanu…" : phase === "wish" ? "Make a wish, mero sanu 🥹🎂" : "Yayy! 🎉"}
      </h2>
      <div className="anim-cake relative z-10 w-[min(78vw,340px,42dvh)]" style={{ perspective: 800 }}>
        {/* candles */}
        <button onClick={blow} aria-label="Blow out the candles" disabled={!lit} className="relative mx-auto flex h-[72px] w-[45%] items-end justify-around">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative flex flex-col items-center">
              <div className={`mb-0.5 h-5 w-2.5 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-flame transition-all duration-500 ${lit ? "anim-flicker opacity-100" : "scale-0 opacity-0"}`} style={{ boxShadow: "0 0 18px 6px oklch(0.86 0.15 75 / 55%)" }} />
              {!lit && <span className="absolute -top-4 h-6 w-1 rounded bg-foreground/20 blur-sm anim-fade-up" />}
              <div className="h-12 w-2.5 rounded-sm" style={{ background: "repeating-linear-gradient(45deg, var(--ivory) 0 5px, var(--blush) 5px 10px)" }} />
            </div>
          ))}
        </button>
        <Tier w={55} h={70} top="oklch(0.4 0.14 12)" bottom="oklch(0.2 0.07 10)" />
        <Tier w={78} h={80} top="oklch(0.33 0.12 10)" bottom="oklch(0.16 0.05 10)" />
        <Tier w={100} h={90} top="oklch(0.28 0.1 8)" bottom="oklch(0.12 0.04 8)" />
        {/* roses */}
        <div className="absolute left-[12%] top-[150px] text-2xl">🌹</div>
        <div className="absolute right-[10%] top-[230px] text-2xl">🌹</div>
        <div className="mx-auto -mt-2 h-5 w-[110%] -translate-x-[4.5%] rounded-[50%] bg-gradient-to-r from-gold/40 via-gold to-gold/40 shadow-2xl" />
      </div>
      <div className="z-10 mt-5 min-h-[110px] w-full max-w-md text-center">
        {phase === "wish" && (
          <button onClick={blow} className="btn-rose anim-fade-up rounded-full px-7 py-3 font-semibold">Blow the candles 🌬️</button>
        )}
        {phase === "blown" && <p className="anim-fade-up font-script text-3xl text-blush">Your wish is on its way ✨</p>}
        {phase === "secret" && (
          <div className="glass anim-fade-up rounded-3xl p-4">
            <p className="font-serif text-[clamp(1rem,4vw,1.25rem)] leading-snug">{CAKE_SECRET}</p>
          </div>
        )}
      </div>
    </Page>
  );
}
