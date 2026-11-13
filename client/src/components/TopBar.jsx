import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';

export default function TopBar({ darkMode, onToggleTheme, soundEnabled, onToggleSound }) {
  return (
    <header className="fixed top-4 left-4 sm:top-5 sm:left-6 z-50 flex items-center gap-2">
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
        title={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-200/70 dark:text-zinc-200 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
      >
        {darkMode ? <Moon className="h-5 w-5" strokeWidth={1.8} /> : <Sun className="h-5 w-5" strokeWidth={1.8} />}
      </button>

      <button
        type="button"
        onClick={onToggleSound}
        aria-label={soundEnabled ? 'Mute UI sounds' : 'Unmute UI sounds'}
        title={soundEnabled ? 'Sound effects: ON' : 'Sound effects: OFF'}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-200/70 dark:text-zinc-200 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
      >
        {soundEnabled ? (
          <Volume2 className="h-5 w-5" strokeWidth={1.8} />
        ) : (
          <VolumeX className="h-5 w-5 opacity-60" strokeWidth={1.8} />
        )}
      </button>
    </header>
  );
}
