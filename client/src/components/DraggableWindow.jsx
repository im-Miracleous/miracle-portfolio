import { memo, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

function DraggableWindow({
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
  const windowRef = useRef(null);
  const cleanupDragRef = useRef(null);

  useEffect(() => {
    return () => {
      cleanupDragRef.current?.();
    };
  }, []);

  const handleTitleBarPointerDown = (e) => {
    if (window.innerWidth < 768) return;
    if (e.target.closest('button')) return;

    onFocus(id);

    cleanupDragRef.current?.();

    const startMouseX = e.clientX;
    const startMouseY = e.clientY;
    const startPosX = position.x;
    const startPosY = position.y;
    const maxOffsetX = Math.max(120, window.innerWidth / 2 - 140);
    const maxOffsetY = Math.max(80, window.innerHeight / 2 - 120);

    let currentX = startPosX;
    let currentY = startPosY;
    let rafId = null;

    document.body.style.cursor = 'grabbing';

    const applyTransform = () => {
      rafId = null;
      if (!windowRef.current) return;
      windowRef.current.style.transform = `translate3d(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px), 0)`;
    };

    const handlePointerMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startMouseX;
      const deltaY = moveEvent.clientY - startMouseY;

      currentX = Math.max(-maxOffsetX, Math.min(maxOffsetX, startPosX + deltaX));
      currentY = Math.max(-maxOffsetY, Math.min(maxOffsetY, startPosY + deltaY));

      if (rafId === null) {
        rafId = window.requestAnimationFrame(applyTransform);
      }
    };

    const cleanup = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      document.body.style.cursor = '';
      if (windowRef.current) {
        windowRef.current.style.transform = '';
      }
      cleanupDragRef.current = null;
    };

    const handlePointerUp = () => {
      if (windowRef.current) {
        windowRef.current.style.setProperty('--tx', `${currentX}px`);
        windowRef.current.style.setProperty('--ty', `${currentY}px`);
      }
      cleanup();
      if (currentX !== startPosX || currentY !== startPosY) {
        onMove(id, { x: currentX, y: currentY });
      }
    };

    cleanupDragRef.current = cleanup;
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  };

  return (
    <div
      ref={windowRef}
      role="dialog"
      aria-label={`${title} window`}
      style={{
        zIndex,
        '--tx': `${position.x}px`,
        '--ty': `${position.y}px`,
      }}
      onMouseDown={() => onFocus(id)}
      className={`fixed inset-x-0 bottom-0 h-[85vh] max-h-[85vh] md:inset-x-auto md:bottom-auto md:top-1/2 md:left-1/2 md:h-auto md:max-h-[76vh] md:will-change-transform md:[transform:translate3d(calc(-50%+var(--tx)),calc(-50%+var(--ty)),0)] ${widthClass} flex`}
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

export default memo(DraggableWindow);
