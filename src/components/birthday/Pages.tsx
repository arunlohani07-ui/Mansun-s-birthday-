import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Lock, Play } from "lucide-react";
import * as C from "@/lib/content";
import { FloatingHearts, Heart3D, Lightbox, Page, Petals, SafeImg, Stars } from "./ui";

export function Opening({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3800);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <Page>
      <Stars />
      <Petals count={10} />
      <div className="absolute h-72 w-72 rounded-full bg-blush/20 blur-3xl" />
      <p className="anim-fade-up z-10 max-w-sm text-center font-serif text-[clamp(1.6rem,7vw,2.6rem)] italic leading-tight text-ivory" style={{ animationDuration: "2s" }}>
        {C.OPENING}
      </p>
      <button onClick={onDone} className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] text-xs text-muted-foreground underline-offset-4 hover:underline">skip</button>
    </Page>
  );
}

export function Password({ onUnlock }: { onUnlock: () => void }) {
  const [v, setV] = useState("");
  const [err, setErr] = useState("");
  const [shake, setShake] = useState(0);
  const [open, setOpen] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (C.checkPassword(v)) {
      setErr("");
      setOpen(true);
      setTimeout(onUnlock, 1100);
    } else {
      setErr(v.trim() ? "Hmm, tyo hoina sanu… feri try gara na 🥺" : "Password lekha na, mero budii ♡");
      setShake((s) => s + 1);
    }
  };
  return (
    <Page>
      <Stars />
      <Petals count={12} />
      {/* envelope */}
      <div className="relative z-10 mb-6 h-24 w-36 anim-float">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-wine to-cherry shadow-2xl" />
        <div className="absolute inset-x-0 top-0 h-14 origin-top transition-transform duration-700" style={{ clipPath: "polygon(0 0,100% 0,50% 100%)", background: "linear-gradient(var(--blush), var(--wine))", transform: open ? "rotateX(180deg)" : "none" }} />
        <div className="absolute left-1/2 top-9 -translate-x-1/2"><Heart3D size={28} className={open ? "anim-beat" : ""} /></div>
      </div>
      <form key={shake} onSubmit={submit} className={`glass z-10 w-full max-w-sm rounded-[2rem] p-6 text-center ${shake ? "anim-shake" : ""} ${open ? "scale-95 opacity-0 transition-all duration-700" : ""}`}>
        <Lock className="mx-auto mb-2 h-5 w-5 text-gold" />
        <h1 className="text-gold text-4xl">Only for my sanu ♡</h1>
        <p className="mb-4 mt-1 text-sm text-muted-foreground">Hamro special date halnu hai</p>
        <label htmlFor="pw" className="sr-only">Secret password</label>
        <input id="pw" type="password" autoComplete="off" inputMode="numeric" value={v} onChange={(e) => setV(e.target.value)} placeholder="yyyy-mm-dd"
          className="w-full rounded-2xl border border-input bg-background/40 px-4 py-3 text-center tracking-widest outline-none focus:ring-2 focus:ring-ring" />
        <p role="alert" className="mt-2 min-h-5 text-sm text-destructive">{err}</p>
        <button type="submit" className="btn-rose mt-2 w-full rounded-2xl py-3 font-semibold">Unlock ♡</button>
      </form>
    </Page>
  );
}

export function Welcome({ next }: { next: () => void }) {
  return (
    <Page className="text-center">
      <Stars />
      <FloatingHearts count={7} />
      <Petals count={8} />
      <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-wine/50 to-transparent" />
      <h1 className="anim-fade-up z-10 text-gold text-[clamp(2.2rem,9vw,4.5rem)] leading-none">{C.WELCOME.title}</h1>
      <p className="anim-fade-up z-10 mt-5 font-script text-[clamp(1.6rem,6vw,2.4rem)] text-blush" style={{ animationDelay: ".5s" }}>{C.WELCOME.line1}</p>
      <p className="anim-fade-up z-10 mt-4 max-w-md text-[clamp(.95rem,3.8vw,1.15rem)] leading-relaxed text-ivory/90" style={{ animationDelay: "1s" }}>{C.WELCOME.line2}</p>
      <button onClick={next} className="btn-rose anim-fade-up z-10 mt-8 rounded-full px-8 py-3.5 font-semibold" style={{ animationDelay: "1.5s" }}>Open Your Surprise ♡</button>
    </Page>
  );
}

export function Letter() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % C.PERSONAL.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <Page className="py-3">
      <div className="absolute inset-0 overflow-hidden">
        {C.PERSONAL.map((src, k) => (
          <div key={src} className="absolute inset-0 transition-opacity duration-[1500ms]" style={{ opacity: k === i ? 1 : 0 }}>
            <SafeImg src={src} alt="" className="h-full w-full scale-110 blur-[3px]" />
          </div>
        ))}
        <div className="absolute inset-0 bg-background/70" />
      </div>
      <article className="glass z-10 w-full max-w-xl rounded-[2rem] px-5 py-5 sm:px-8">
        <h2 className="mb-2 text-center text-gold text-[clamp(1.5rem,6vw,2.2rem)]">Mero sanu lai ♡</h2>
        {C.LETTER.map((para, p) => (
          <div key={p} className={p ? "mt-3" : ""}>
            {para.map((line, l) => (
              <p key={l} className="anim-fade-up py-[0.15rem] font-serif text-[clamp(.92rem,3.7vw,1.15rem)] leading-snug text-ivory" style={{ animationDelay: `${(p * 5 + l) * 0.15}s` }}>{line}</p>
            ))}
          </div>
        ))}
        <p className="mt-3 text-right font-script text-[clamp(1.8rem,7vw,2.4rem)] text-blush">{C.LETTER_SIGN}</p>
      </article>
      <div className="z-10 mt-4 hidden w-full max-w-xl justify-center gap-2 [@media(min-height:760px)]:flex">
        {C.PERSONAL.slice(0, 5).map((src, k) => (
          <div key={src} className="anim-float overflow-hidden rounded-xl border-2 border-ivory/70 shadow-xl" style={{ ["--r" as string]: `${(k - 2) * 4}deg`, animationDelay: `${k * -1.2}s`, width: k % 2 ? 56 : 66, height: k % 2 ? 70 : 82 }}>
            <SafeImg src={src} alt={`Mansun ${k + 1}`} className="h-full w-full" />
          </div>
        ))}
      </div>
    </Page>
  );
}

export function Beauty() {
  return (
    <Page className="py-3">
      <Petals count={6} />
      <h2 className="anim-fade-up z-10 text-center text-gold text-[clamp(1.7rem,7vw,2.8rem)]">Timi kati sundar xau, thaha xa? 🥹</h2>
      <div className="z-10 my-3 flex h-[22dvh] w-full max-w-lg items-center justify-center">
        {C.PERSONAL.slice(5, 10).map((src, k) => (
          <div key={src} className="anim-float -mx-2 overflow-hidden rounded-2xl border-2 border-ivory/70 shadow-2xl" style={{ ["--r" as string]: `${(k - 2) * 6}deg`, animationDelay: `${k * -1}s`, height: k === 2 ? "100%" : "78%", aspectRatio: "3/4", zIndex: 5 - Math.abs(k - 2) }}>
            <SafeImg src={src} alt={`Mansun ${k + 6}`} className="h-full w-full" />
          </div>
        ))}
      </div>
      <div className="z-10 grid w-full max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2">
        {C.BEAUTY.map((b, k) => (
          <div key={b.t} className="glass anim-fade-up rounded-2xl px-4 py-2.5" style={{ animationDelay: `${k * 0.2}s` }}>
            <p className="font-script text-2xl text-blush">{b.t}</p>
            <p className="text-[clamp(.8rem,3.3vw,.95rem)] leading-snug text-ivory/90">{b.d}</p>
          </div>
        ))}
      </div>
    </Page>
  );
}

function Collage({ images, captions, scrapbook, onOpen }: { images: string[]; captions: string[]; scrapbook?: boolean; onOpen: (i: number) => void }) {
  return (
    <div className="grid min-h-0 w-full max-w-4xl flex-1 grid-cols-4 grid-rows-3 gap-2.5 p-1 sm:grid-cols-5 sm:grid-rows-2 sm:gap-4">
      {images.map((src, k) => (
        <button key={src} onClick={() => onOpen(k)} aria-label={`Open photo ${k + 1}`}
          className={`anim-float group relative min-h-0 overflow-hidden ${scrapbook ? "rounded-md bg-ivory p-1 pb-5 shadow-xl" : "rounded-2xl border border-ivory/30 shadow-2xl"} ${k === 0 || k === 7 ? "col-span-2 sm:col-span-1" : ""}`}
          style={{ ["--r" as string]: `${((k * 37) % 9) - 4}deg`, animationDelay: `${k * -0.7}s` }}>
          <SafeImg src={src} alt={captions[k] ?? ""} className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${scrapbook ? "rounded-sm" : ""}`} />
          {scrapbook ? (
            <>
              <span className="absolute -top-1 left-1/2 h-3 w-10 -translate-x-1/2 rotate-[-4deg] bg-blush/60" />
              <span className="absolute inset-x-0 bottom-0 truncate px-1 font-script text-sm text-cherry sm:text-base">{captions[k]}</span>
            </>
          ) : (
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-ivory/10 to-transparent" />
          )}
        </button>
      ))}
    </div>
  );
}

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const [c, setC] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setC((x) => (x + 1) % C.GALLERY_COMPLIMENTS.length), 3200);
    return () => clearInterval(t);
  }, []);
  const onIndex = useCallback((i: number) => setOpen(i), []);
  return (
    <Page className="pb-2 pt-14">
      <FloatingHearts count={4} />
      <h2 className="z-10 text-center text-gold text-[clamp(1.8rem,7vw,3rem)]">My Beautiful Sanu</h2>
      <p key={c} className="anim-fade-up z-10 mb-2 font-script text-[clamp(1.3rem,5vw,1.8rem)] text-blush">{C.GALLERY_COMPLIMENTS[c]}</p>
      <Collage images={C.PERSONAL} captions={C.PERSONAL.map((_, i) => `Mansun ${i + 1}`)} onOpen={setOpen} />
      <button onClick={() => setOpen(0)} className="glass z-10 mt-2 flex items-center gap-2 rounded-full px-5 py-2 text-sm"><Play className="h-4 w-4" /> Slideshow</button>
      {open !== null && <Lightbox images={C.PERSONAL} index={open} onClose={() => setOpen(null)} onIndex={onIndex} />}
    </Page>
  );
}

export function Memories() {
  const [open, setOpen] = useState<number | null>(null);
  const onIndex = useCallback((i: number) => setOpen(i), []);
  return (
    <Page className="pb-2 pt-14">
      <Petals count={5} />
      <h2 className="z-10 text-center text-gold text-[clamp(1.8rem,7vw,3rem)]">Our Memories</h2>
      <p className="z-10 mb-3 max-w-xl text-center text-[clamp(.8rem,3.3vw,1rem)] leading-snug text-ivory/85">{C.MEMORIES_MESSAGE}</p>
      <Collage images={C.MEMORIES} captions={C.MEMORY_CAPTIONS} scrapbook onOpen={setOpen} />
      {open !== null && <Lightbox images={C.MEMORIES} index={open} onClose={() => setOpen(null)} onIndex={onIndex} />}
    </Page>
  );
}

export function Promise() {
  return (
    <Page className="text-center">
      <Stars />
      <div className="relative z-10 mb-4">
        <div className="absolute inset-0 rounded-full bg-blush/40 blur-3xl" />
        <Heart3D size={110} className="anim-beat relative" />
      </div>
      <h2 className="z-10 mb-3 text-gold text-[clamp(1.8rem,7vw,3rem)]">Mero promise ♡</h2>
      <div className="glass z-10 max-w-md space-y-2 rounded-[2rem] p-5">
        {C.PROMISE.map((l, k) => <p key={k} className="anim-fade-up font-serif text-[clamp(1rem,4vw,1.25rem)]" style={{ animationDelay: `${k * 0.3}s` }}>{l}</p>)}
        <p className="pt-2 font-script text-3xl text-blush">{C.PROMISE_SIGN}</p>
      </div>
    </Page>
  );
}

export function Hug() {
  const [bursts, setBursts] = useState<number[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const hug = () => {
    const id = Date.now();
    setBursts((b) => [...b.slice(-2), id]);
    timers.current.push(setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 4500));
  };
  return (
    <Page className="text-center">
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: bursts.length ? 1 : 0, background: "radial-gradient(circle at 50% 55%, oklch(0.6 0.15 10 / 45%), transparent 60%)" }} />
      {bursts.map((id) => (
        <div key={id} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {Array.from({ length: 16 }, (_, k) => (
            <span key={k} className="anim-rise absolute bottom-0" style={{ left: `${(k * 61) % 100}%`, animationDuration: `${2.5 + (k % 5) * 0.4}s`, animationDelay: `${(k % 6) * 0.12}s` }}>
              {k % 3 === 0 ? <span className="block h-4 w-5 rounded-[80%_0_80%_0] bg-gradient-to-br from-blush to-wine" /> : <Heart3D size={18 + (k % 4) * 8} />}
            </span>
          ))}
        </div>
      ))}
      <h2 className="z-10 mb-6 max-w-md text-gold text-[clamp(1.7rem,7vw,2.8rem)] leading-tight">{C.HUG}</h2>
      <button onClick={hug} aria-label="Send a virtual hug" className="z-10 grid h-40 w-40 place-items-center rounded-full glass glow-rose transition-transform active:scale-90">
        <Heart3D size={90} className="anim-beat" />
      </button>
      <p className="z-10 mt-5 font-script text-2xl text-blush">{bursts.length ? "Kasera hug gareko xu, feel bhayo? 🫂" : "Tap the heart, mero budii"}</p>
    </Page>
  );
}

export function Final({ replay }: { replay: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Page className="py-3 text-center">
      <Stars />
      <Petals count={open ? 10 : 4} />
      {!open ? (
        <>
          <h2 className="anim-fade-up z-10 mb-6 text-gold text-[clamp(1.8rem,7vw,3rem)]">Euta last secret letter…</h2>
          <button onClick={() => setOpen(true)} aria-label="Open the final letter" className="anim-float relative z-10 h-36 w-56">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-wine to-cherry shadow-2xl" />
            <div className="absolute inset-x-0 top-0 h-20" style={{ clipPath: "polygon(0 0,100% 0,50% 100%)", background: "linear-gradient(var(--blush), var(--wine))" }} />
            <div className="absolute left-1/2 top-14 -translate-x-1/2"><Heart3D size={36} className="anim-beat" /></div>
          </button>
          <p className="z-10 mt-5 text-sm text-muted-foreground">Tap to open ♡</p>
        </>
      ) : (
        <div className="glass anim-fade-up z-10 w-full max-w-lg rounded-[2rem] p-5 sm:p-7">
          <div className="space-y-2 text-left">
            {C.FINAL_LETTER.map((l, k) => <p key={k} className="anim-fade-up font-serif text-[clamp(.95rem,3.8vw,1.15rem)] leading-snug" style={{ animationDelay: `${k * 0.35}s` }}>{l}</p>)}
          </div>
          <p className="anim-fade-up mt-4 text-gold text-[clamp(1.3rem,5.5vw,1.8rem)] font-serif" style={{ animationDelay: "1.6s" }}>{C.FINAL_END_1}</p>
          <p className="anim-fade-up mt-2 font-script text-[clamp(1.4rem,5.5vw,1.9rem)] leading-tight text-blush" style={{ animationDelay: "2s" }}>{C.FINAL_END_2}</p>
          <button onClick={replay} className="btn-rose mt-5 rounded-full px-6 py-2.5 text-sm font-semibold">Replay our little universe ↺</button>
        </div>
      )}
      <p className="absolute bottom-[max(4.6rem,calc(env(safe-area-inset-bottom)+4rem))] z-10 text-[11px] text-muted-foreground/70">{C.CREDIT}</p>
    </Page>
  );
}
