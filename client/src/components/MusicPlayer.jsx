import { memo, useEffect, useRef, useState } from 'react';
import { playClickSound } from '../utils/sound';

// Place your background music audio file in client/public/ and update this path:
const BG_MUSIC_SRC = '/music.mp3';

function MusicPlayer({ soundEnabled }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const getOrCreateAudio = () => {
    if (audioRef.current) return audioRef.current;
    const audio = new Audio(BG_MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = 'none';
    audio.addEventListener('ended', () => setIsPlaying(false));
    audioRef.current = audio;
    return audio;
  };

  const toggleMusic = () => {
    playClickSound(soundEnabled);

    const audio = getOrCreateAudio();

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If no audio file is provided yet, toggle state visually
          setIsPlaying(true);
        });
    }
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-6 z-20 select-none">
      <button
        type="button"
        onClick={toggleMusic}
        title={isPlaying ? 'Pause background music' : 'Play background music'}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        className={`group relative flex items-center gap-2 rounded-full border px-2.5 py-1.5 sm:px-3 shadow-sm transition-[transform,background-color,border-color,color,box-shadow] duration-200 hover:-translate-y-0.5 cursor-pointer ${
          isPlaying
            ? 'border-emerald-400/80 bg-white/95 text-emerald-700 dark:border-emerald-400/70 dark:bg-zinc-900/95 dark:text-emerald-300 shadow-emerald-500/10'
            : 'border-zinc-300/80 bg-white/95 text-zinc-600 hover:border-amber-400 dark:border-zinc-700/80 dark:bg-zinc-900/95 dark:text-zinc-300 dark:hover:border-sky-400'
        }`}
      >
        {/* Cute Mascot SVG with flower on lilypad */}
        <div className="relative flex h-6 w-6 items-center justify-center shrink-0">
          <svg viewBox="0 0 36 36" className="h-6 w-6" fill="none">
            {/* Lilypad base */}
            <ellipse cx="18" cy="27" rx="14" ry="4.5" className="fill-emerald-700/40 dark:fill-emerald-950/70" />
            <ellipse cx="18" cy="26" rx="13" ry="4" className="fill-emerald-500 dark:fill-emerald-600" />
            <path d="M18 26 L23 30 L22 25 Z" className="fill-emerald-600 dark:fill-emerald-700" />

            {/* Cute body */}
            <ellipse cx="18" cy="18" rx="9" ry="7.5" className="fill-emerald-300 dark:fill-emerald-400" />
            <ellipse cx="18" cy="19" rx="7.5" ry="6" className="fill-emerald-200/90 dark:fill-emerald-300" />

            {/* Rosy cheeks */}
            <circle cx="12" cy="19.5" r="1.3" className="fill-rose-300 dark:fill-rose-400" />
            <circle cx="24" cy="19.5" r="1.3" className="fill-rose-300 dark:fill-rose-400" />

            {/* Eyes */}
            {isPlaying ? (
              <>
                {/* Happy curved eyes when music is playing */}
                <path d="M12.5 17.5 C13.5 16 15 16 16 17.5" stroke="#1f2937" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M20 17.5 C21 16 22.5 16 23.5 17.5" stroke="#1f2937" strokeWidth="1.2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="14" cy="17" r="1" className="fill-zinc-800" />
                <circle cx="22" cy="17" r="1" className="fill-zinc-800" />
              </>
            )}

            {/* Smile */}
            <path d="M16 20.5 C17 21.8 19 21.8 20 20.5" stroke="#1f2937" strokeWidth="1.1" strokeLinecap="round" />

            {/* Flower on head */}
            <circle cx="18" cy="10" r="2.2" className="fill-amber-300" />
            <circle cx="15.5" cy="8.5" r="1.6" className="fill-pink-200" />
            <circle cx="20.5" cy="8.5" r="1.6" className="fill-pink-200" />
            <circle cx="15.5" cy="11.5" r="1.6" className="fill-pink-200" />
            <circle cx="20.5" cy="11.5" r="1.6" className="fill-pink-200" />
          </svg>

          {/* Floating animated musical note when active */}
          {isPlaying && (
            <span
              aria-hidden="true"
              className="absolute -top-3 -right-2 text-[11px] font-bold text-amber-500 dark:text-sky-300 animate-bounce"
            >
              ♫
            </span>
          )}
        </div>

        <span className="hidden sm:inline font-mono text-[11px] font-medium tracking-tight">
          {isPlaying ? 'bgm: on ♫' : 'bgm: off'}
        </span>
      </button>
    </div>
  );
}

export default memo(MusicPlayer);
