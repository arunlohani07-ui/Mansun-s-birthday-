import { useEffect, useRef, useState } from "react";
import { Music, Pause, Play, Volume2, X } from "lucide-react";
import { MUSIC_SRC } from "@/lib/content";

const fmt = (s: number) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "--:--");

export function MusicPlayer() {
  const ref = useRef<HTMLAudioElement>(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(NaN);
  const [vol, setVol] = useState(0.7);

  useEffect(() => { if (ref.current) ref.current.volume = vol; }, [vol]);
  useEffect(() => {
  const audio = ref.current;
  if (!audio) return;

  audio.volume = vol;

  audio.play().catch(() => {
    // Autoplay blocked; manual Play button remains available.
  });
}, []);

  const toggle = async () => {
    const a = ref.current;
    if (!a || missing) return;
    if (a.paused) {
      try {
  await a.play();
} catch {
  setPlaying(false);
}
    } else a.pause();
  };

  return (
    <div className="fixed right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-40">
      <audio
        ref={ref}
        src={MUSIC_SRC}
        loop
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
        onError={() => { setMissing(true); setPlaying(false); }}
      />
      {!open ? (
        <button aria-label="Open music player" onClick={() => setOpen(true)} className="glass flex h-11 items-center gap-2 rounded-full px-3">
          {playing ? (
            <span className="flex h-4 items-end gap-0.5">{[0, 1, 2].map((i) => <span key={i} className="w-1 rounded bg-blush" style={{ animation: `eq 0.9s ${i * 0.15}s ease-in-out infinite` }} />)}</span>
          ) : <Music className="h-4 w-4 text-blush" />}
        </button>
      ) : (
        <div className="glass anim-fade-up w-64 rounded-3xl p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="min-w-0">
              <p className="font-script text-xl text-blush">Our song ♡</p>
              <p className="truncate text-xs text-muted-foreground">{missing ? "Song not added yet" : "birthday-song.mp3"}</p>
            </div>
            <button aria-label="Close player" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-foreground/10"><X className="h-4 w-4" /></button>
          </div>
          <div className="flex items-center gap-3">
            <button aria-label={playing ? "Pause" : "Play"} disabled={missing} onClick={toggle} className="btn-rose grid h-11 w-11 shrink-0 place-items-center rounded-full disabled:opacity-40">
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <div className="min-w-0 flex-1">
              <input aria-label="Progress" type="range" min={0} max={isFinite(dur) ? dur : 0} step={0.1} value={t} disabled={missing || !isFinite(dur)}
                onChange={(e) => { if (ref.current) ref.current.currentTime = +e.target.value; }} className="w-full accent-[var(--blush)]" />
              <div className="flex justify-between text-[10px] text-muted-foreground"><span>{fmt(t)}</span><span>{fmt(dur)}</span></div>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <input aria-label="Volume" type="range" min={0} max={1} step={0.05} value={vol} onChange={(e) => setVol(+e.target.value)} className="w-full accent-[var(--gold)]" />
          </div>
        </div>
      )}
    </div>
  );
}
