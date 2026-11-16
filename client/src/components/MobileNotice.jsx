import { useState } from 'react';
import { playClickSound } from '../utils/sound';

export default function MobileNotice({ soundEnabled }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[60] md:hidden border-t border-sky-400/40 bg-sky-700/90 dark:bg-sky-950/90 backdrop-blur-md px-4 py-3.5 text-white shadow-[0_-6px_24px_rgba(15,23,42,0.25)]"
    >
      <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-xs font-bold tracking-tight text-white">
            hey there!
          </p>
          <p className="mt-0.5 text-[11px] leading-snug text-sky-100/95">
            just letting you know that this site is best experienced on desktop, some features might be wonky on different devices.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            playClickSound(soundEnabled);
            setVisible(false);
          }}
          className="shrink-0 rounded-md bg-sky-200 hover:bg-white px-3.5 py-2 font-mono text-xs font-semibold text-sky-950 transition-colors cursor-pointer"
        >
          okay
        </button>
      </div>
    </div>
  );
}
