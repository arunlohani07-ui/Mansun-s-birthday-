import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Heart, ImageOff, X, Play, Pause } from "lucide-react";

export function Petals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * -14,
        dur: 9 + Math.random() * 8,
        size: 10 + Math.random() * 14,
        drift: (Math.random() - 0.5) * 160,
        hue: i % 3,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="anim-fall absolute top-0 block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.8,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            ["--drift" as string]: `${p.drift}px`,
            borderRadius: "80% 0 80% 0",
            background:
              p.hue === 0
                ? "radial-gradient(circle at 30% 30%, var(--blush), var(--wine))"
                : p.hue === 1
                  ? "radial-gradient(circle at 30% 30%, oklch(0.6 0.16 12), var(--cherry))"
                  : "radial-gradient(circle at 30% 30%, var(--ivory), var(--blush))",
            boxShadow: "inset -2px -2px 4px oklch(0 0 0 / 30%)",
            filter: "drop-shadow(0 4px 6px oklch(0 0 0 / 40%))",
          }}
        />
      ))}
    </div>
  );
}

export function Stars({ count = 30 }: { count?: number }) {
  const stars = useMemo(
    () => Array.from({ length: count }, () => ({ x: Math.random() * 100, y: Math.random() * 70, d: Math.random() * 3, s: Math.random() * 2 + 1 })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {stars.map((s, i) => (
        <span key={i} className="anim-twinkle absolute rounded-full bg-ivory" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />
      ))}
    </div>
  );
}

export function Heart3D({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <Heart
      className={className}
      width={size}
      height={size}
      fill="url(#heartGrad)"
      stroke="none"
      style={{ filter: "drop-shadow(0 6px 14px oklch(0.6 0.18 10 / 60%))" }}
    />
  );
}

export function HeartGradientDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <radialGradient id="heartGrad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="oklch(0.92 0.06 10)" />
          <stop offset="45%" stopColor="oklch(0.65 0.19 12)" />
          <stop offset="100%" stopColor="oklch(0.3 0.12 10)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function FloatingHearts({ count = 6 }: { count?: number }) {
  const hs = useMemo(() => Array.from({ length: count }, () => ({ x: 5 + Math.random() * 90, y: 10 + Math.random() * 75, s: 14 + Math.random() * 22, d: Math.random() * -6 })), [count]);
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {hs.map((h, i) => (
        <div key={i} className="anim-float absolute opacity-70" style={{ left: `${h.x}%`, top: `${h.y}%`, animationDelay: `${h.d}s` }}>
          <Heart3D size={h.s} />
        </div>
      ))}
    </div>
  );
}

/** Image that turns into a soft placeholder if the file is missing. */
export function SafeImg({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (failed)
    return (
      <div className={`flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-wine to-cherry text-blush/70 ${className}`}>
        <ImageOff className="h-5 w-5" />
        <span className="font-script text-sm">{src.split("/").pop()}</span>
      </div>
    );
  return <img src={src} alt={alt} loading="lazy" draggable={false} onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}

export function Lightbox({ images, index, onClose, onIndex }: { images: string[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => onIndex((index + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [playing, index, images.length, onIndex]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [index, images.length, onClose, onIndex]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl anim-fade-up" role="dialog" aria-modal>
      <div key={index} className="anim-fade-up relative flex h-[78dvh] w-[92vw] max-w-3xl items-center justify-center">
        <SafeImg src={images[index] ?? ""} alt={`Photo ${index + 1}`} className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl h-full w-full" />
      </div>
      <button aria-label="Close" onClick={onClose} className="glass absolute right-4 top-[max(1rem,env(safe-area-inset-top))] rounded-full p-3"><X className="h-5 w-5" /></button>
      <div className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] flex items-center gap-3">
        <button aria-label="Previous" onClick={() => onIndex((index - 1 + images.length) % images.length)} className="glass rounded-full p-3"><ChevronLeft className="h-5 w-5" /></button>
        <button onClick={() => setPlaying((p) => !p)} className="glass flex items-center gap-2 rounded-full px-4 py-3 text-sm">
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />} {playing ? "Pause" : "Slideshow"}
        </button>
        <button aria-label="Next" onClick={() => onIndex((index + 1) % images.length)} className="glass rounded-full p-3"><ChevronRight className="h-5 w-5" /></button>
      </div>
    </div>
  );
}

export function Page({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative flex h-full w-full flex-col items-center justify-center px-5 ${className}`}>{children}</div>;
}
