import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import DesktopBackground from './components/DesktopBackground';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import HomeWindow from './components/HomeWindow';
import DraggableWindow from './components/DraggableWindow';
import AboutWindow from './components/windows/AboutWindow';
import WorkWindow from './components/windows/WorkWindow';
import LinksWindow from './components/windows/LinksWindow';
import FaqWindow from './components/windows/FaqWindow';
import ContactWindow from './components/windows/ContactWindow';
import MusicPlayer from './components/MusicPlayer';
import MobileNotice from './components/MobileNotice';
import { playCloseSound, playOpenSound, playToggleSound } from './utils/sound';

const WINDOW_CONFIG = {
  about: {
    title: 'about',
    widthClass: 'md:w-[590px]',
    defaultOffset: { x: 28, y: 26 },
  },
  links: {
    title: 'links',
    widthClass: 'md:w-[540px]',
    defaultOffset: { x: -48, y: 34 },
  },
  work: {
    title: 'work',
    widthClass: 'md:w-[640px]',
    defaultOffset: { x: 46, y: -18 },
  },
  faq: {
    title: 'faq',
    widthClass: 'md:w-[560px]',
    defaultOffset: { x: -34, y: -26 },
  },
  contact: {
    title: 'contact',
    widthClass: 'md:w-[520px]',
    defaultOffset: { x: 64, y: 40 },
  },
  preview: {
    title: 'preview',
    widthClass: 'md:w-fit md:min-w-[320px] md:max-w-[88vw]',
    defaultOffset: { x: 0, y: 0 },
  },
};

const WindowContent = memo(function WindowContent({
  id,
  soundEnabled,
  previewImage,
  onOpenContact,
  onPreviewImage,
}) {
  switch (id) {
    case 'about':
      return <AboutWindow onOpenContact={onOpenContact} />;
    case 'work':
      return <WorkWindow soundEnabled={soundEnabled} onPreviewImage={onPreviewImage} />;
    case 'links':
      return <LinksWindow soundEnabled={soundEnabled} />;
    case 'faq':
      return <FaqWindow soundEnabled={soundEnabled} onOpenContact={onOpenContact} />;
    case 'contact':
      return <ContactWindow soundEnabled={soundEnabled} />;
    case 'preview':
      if (!previewImage) return null;
      return (
        <div className="p-3 sm:p-4 bg-zinc-100/80 dark:bg-zinc-950/60 flex items-center justify-center">
          <img
            src={previewImage.src}
            alt={previewImage.alt}
            decoding="async"
            className="max-h-[65vh] w-auto max-w-full rounded-lg object-contain shadow-sm"
          />
        </div>
      );
    default:
      return null;
  }
});

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('miracle_theme') === 'dark';
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('miracle_sound');
    return saved === null ? true : saved === 'true';
  });

  const [openWindows, setOpenWindows] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const topZRef = useRef(30);
  const openWindowsRef = useRef(openWindows);
  openWindowsRef.current = openWindows;
  const closeTimersRef = useRef({});

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('miracle_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('miracle_sound', String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    const timers = closeTimersRef.current;
    return () => {
      Object.values(timers).forEach((timerId) => clearTimeout(timerId));
    };
  }, []);

  const focusWindow = useCallback((id) => {
    setOpenWindows((prev) => {
      if (prev.length <= 1) return prev;
      const target = prev.find((w) => w.id === id);
      if (!target) return prev;
      const isAlreadyTop = prev.every((w) => w.id === id || w.zIndex < target.zIndex);
      if (isAlreadyTop) return prev;

      const maxZ = prev.reduce((max, w) => (w.zIndex > max ? w.zIndex : max), topZRef.current);
      topZRef.current = maxZ + 1;
      const nextZ = topZRef.current;
      return prev.map((win) => (win.id === id ? { ...win, zIndex: nextZ } : win));
    });
  }, []);

  const openWindow = useCallback(
    (id) => {
      if (!WINDOW_CONFIG[id]) return;

      if (closeTimersRef.current[id]) {
        clearTimeout(closeTimersRef.current[id]);
        delete closeTimersRef.current[id];
      }

      playOpenSound(soundEnabled);

      setOpenWindows((prev) => {
        const exists = prev.find((w) => w.id === id);
        topZRef.current += 1;
        const nextZ = topZRef.current;

        if (exists) {
          return prev.map((w) =>
            w.id === id ? { ...w, zIndex: nextZ, closing: false } : w
          );
        }

        const cascadeStep = (prev.length % 4) * 18;
        const base = WINDOW_CONFIG[id].defaultOffset;
        return [
          ...prev,
          {
            id,
            zIndex: nextZ,
            closing: false,
            position: {
              x: base.x + cascadeStep,
              y: base.y + cascadeStep,
            },
          },
        ];
      });
    },
    [soundEnabled]
  );

  const closeWindow = useCallback(
    (id) => {
      playCloseSound(soundEnabled);
      setOpenWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, closing: true } : w))
      );

      if (closeTimersRef.current[id]) {
        clearTimeout(closeTimersRef.current[id]);
      }

      closeTimersRef.current[id] = setTimeout(() => {
        delete closeTimersRef.current[id];
        setOpenWindows((prev) =>
          prev.filter((w) => !(w.id === id && w.closing))
        );
      }, 225);
    },
    [soundEnabled]
  );

  const moveWindow = useCallback((id, position) => {
    setOpenWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, position } : win))
    );
  }, []);

  // Close topmost window with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      const active = openWindowsRef.current.filter((w) => !w.closing);
      if (active.length === 0) return;
      const topWin = active.reduce((highest, curr) =>
        curr.zIndex > highest.zIndex ? curr : highest
      );
      closeWindow(topWin.id);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeWindow]);

  const handleToggleTheme = useCallback(() => {
    playToggleSound(soundEnabled);
    setDarkMode((prev) => !prev);
  }, [soundEnabled]);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) {
        playToggleSound(true);
      }
      return next;
    });
  }, []);

  const openContactWindow = useCallback(() => openWindow('contact'), [openWindow]);

  const openPreview = useCallback(
    (image) => {
      setPreviewImage(image);
      openWindow('preview');
    },
    [openWindow]
  );

  const openIdsKey = openWindows.map((w) => w.id).join(',');
  const openWindowIds = useMemo(
    () => new Set(openIdsKey ? openIdsKey.split(',') : []),
    [openIdsKey]
  );

  const hasVisibleWindow = openWindows.some((w) => !w.closing);

  const handleBackdropClick = useCallback(() => {
    const active = openWindowsRef.current.filter((w) => !w.closing);
    if (active.length === 0) return;
    const topWin = active.reduce((highest, curr) =>
      curr.zIndex > highest.zIndex ? curr : highest
    );
    closeWindow(topWin.id);
  }, [closeWindow]);

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden flex items-start pt-20 md:items-center md:pt-0 justify-center">
      <DesktopBackground darkMode={darkMode} />

      <TopBar
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      <main className="relative z-10 flex items-center justify-center px-4 md:pb-8">
        <HomeWindow openWindowIds={openWindowIds} onOpenWindow={openWindow} />
      </main>

      {hasVisibleWindow && (
        <div
          aria-hidden="true"
          onClick={handleBackdropClick}
          className="animate-backdrop-in fixed inset-0 z-20 bg-zinc-950/40 md:hidden"
        />
      )}

      {/* Floating Pop-Up Windows */}
      {openWindows.map((win) => {
        const config = WINDOW_CONFIG[win.id];
        const windowTitle =
          win.id === 'preview' && previewImage?.filename
            ? `preview - ${previewImage.filename}`
            : config.title;
        return (
          <DraggableWindow
            key={win.id}
            id={win.id}
            title={windowTitle}
            zIndex={win.zIndex}
            position={win.position}
            closing={Boolean(win.closing)}
            widthClass={config.widthClass}
            onFocus={focusWindow}
            onClose={closeWindow}
            onMove={moveWindow}
          >
            <WindowContent
              id={win.id}
              soundEnabled={soundEnabled}
              previewImage={win.id === 'preview' ? previewImage : null}
              onOpenContact={openContactWindow}
              onPreviewImage={openPreview}
            />
          </DraggableWindow>
        );
      })}

      <MusicPlayer soundEnabled={soundEnabled} />

      <Footer soundEnabled={soundEnabled} />

      <MobileNotice soundEnabled={soundEnabled} />
    </div>
  );
}
