import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function DraggableWindow({
  id,
  title,
  zIndex,
  position,
  closing = false,
  widthClass = 'md:w-[600px]',
  onFocus,
  onClose,
  onMove,
  children,
}) {
  const dragStateRef = useRef({
    dragging: false,
    startMouseX: 0,
    startMouseY: 0,
    startPosX: 0,
    startPosY: 0,
  });

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!dragStateRef.current.dragging) return;

      const deltaX = e.clientX - dragStateRef.current.startMouseX;
      const deltaY = e.clientY - dragStateRef.current.startMouseY;

      const nextX = dragStateRef.current.startPosX + deltaX;
      const nextY = dragStateRef.current.startPosY + deltaY;

      const maxOffsetX = Math.max(120, window.innerWidth / 2 - 140);
      const maxOffsetY = Math.max(80, window.innerHeight / 2 - 120);

      const clampedX = Math.max(-maxOffsetX, Math.min(maxOffsetX, nextX));
      const clampedY = Math.max(-maxOffsetY, Math.min(maxOffsetY, nextY));

      onMove(id, { x: clampedX, y: clampedY });
    };

    const handlePointerUp = () => {
      if (dragStateRef.current.dragging) {
        dragStateRef.current.dragging = false;
        document.body.style.cursor = '';
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [id, onMove]);

  const handleTitleBarPointerDown = (e) => {
    if (window.innerWidth < 768) return;
    if (e.target.closest('button')) return;

    onFocus(id);
    dragStateRef.current = {
      dragging: true,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    };
    document.body.style.cursor = 'grabbing';
  };

  return (
    <div
      role="dialog"
      aria-label={`${title} window`}
      style={{
        zIndex,
        '--tx': `${position.x}px`,
        '--ty': `${position.y}px`,
      }}
      onMouseDown={() => onFocus(id)}
      className={`fixed inset-x-0 bottom-0 h-[85vh] max-h-[85vh] md:inset-x-auto md:bottom-auto md:top-1/2 md:left-1/2 md:h-auto md:max-h-[76vh] md:[transform:translate(calc(-50%+var(--tx)),calc(-50%+var(--ty)))] ${widthClass} flex`}
    >
      <div
        className={`origin-bottom md:origin-center flex w-full h-full md:h-auto md:max-h-[76vh] flex-col rounded-t-2xl rounded-b-none md:rounded-xl border border-b-0 md:border-b border-zinc-500/75 dark:border-zinc-300/70 bg-white dark:bg-[#131d2b] shadow-[0_-10px_36px_rgba(15,23,42,0.2)] md:shadow-[0_18px_48px_rgba(15,23,42,0.22)] dark:shadow-[0_20px_54px_rgba(0,0,0,0.6)] overflow-hidden transition-colors duration-200 ${
          closing ? 'animate-window-out' : 'animate-window-in'
        }`}
      >
        <div
          onPointerDown={handleTitleBarPointerDown}
          className="flex shrink-0 items-center justify-between bg-[#3f3f3f] dark:bg-[#1c1c20] px-5 md:px-4 py-3 md:py-2.5 border-b border-zinc-600/40 dark:border-zinc-700/60 md:cursor-grab md:active:cursor-grabbing select-none touch-none"
        >
          <span className="font-mono text-sm font-medium text-white tracking-tight truncate pr-2">
            {title}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }}
            aria-label={`Close ${title} window`}
            className="flex items-center justify-center font-mono text-sm font-medium text-zinc-200 hover:text-amber-400 dark:hover:text-sky-300 px-1 py-0.5 rounded transition-colors cursor-pointer"
          >
            <ChevronDown className="h-5 w-5 md:hidden" strokeWidth={2.2} />
            <span className="hidden md:inline">[x]</span>
          </button>
        </div>

        <div className="os-scroll flex-1 overflow-y-auto select-text">
          {children}
        </div>
      </div>
    </div>
  );
}
