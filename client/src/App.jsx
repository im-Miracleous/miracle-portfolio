import { useCallback, useEffect, useRef, useState } from 'react';
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
};

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
  const topZRef = useRef(30);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('miracle_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('miracle_sound', String(soundEnabled));
  }, [soundEnabled]);

  const focusWindow = useCallback((id) => {
    topZRef.current += 1;
    const nextZ = topZRef.current;
    setOpenWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, zIndex: nextZ } : win))
    );
  }, []);

  const openWindow = useCallback(
    (id) => {
      if (!WINDOW_CONFIG[id]) return;

      setOpenWindows((prev) => {
        const exists = prev.find((w) => w.id === id);
        topZRef.current += 1;
        const nextZ = topZRef.current;

        if (exists) {
          playOpenSound(soundEnabled);
          return prev.map((w) =>
            w.id === id ? { ...w, zIndex: nextZ, closing: false } : w
          );
        }

        playOpenSound(soundEnabled);
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
      setTimeout(() => {
        setOpenWindows((prev) =>
          prev.filter((w) => !(w.id === id && w.closing))
        );
      }, 185);
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
      if (e.key !== 'Escape' || openWindows.length === 0) return;
      const topWin = openWindows.reduce((highest, curr) =>
        curr.zIndex > highest.zIndex ? curr : highest
      );
      closeWindow(topWin.id);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openWindows, closeWindow]);

  const handleToggleTheme = () => {
    playToggleSound(soundEnabled);
    setDarkMode((prev) => !prev);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    if (next) {
      playToggleSound(true);
    }
    setSoundEnabled(next);
  };

  const renderWindowContent = (id) => {
    switch (id) {
      case 'about':
        return <AboutWindow onOpenContact={() => openWindow('contact')} />;
      case 'work':
        return <WorkWindow soundEnabled={soundEnabled} />;
      case 'links':
        return <LinksWindow soundEnabled={soundEnabled} />;
      case 'faq':
        return <FaqWindow soundEnabled={soundEnabled} />;
      case 'contact':
        return <ContactWindow soundEnabled={soundEnabled} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center">
      <DesktopBackground darkMode={darkMode} />

      <TopBar
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      <main className="relative z-10 flex items-center justify-center px-4 pb-8">
        <HomeWindow openWindows={openWindows} onOpenWindow={openWindow} />
      </main>

      {/* Mobile backdrop when one or more windows are stacked */}
      {openWindows.length > 0 && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-20 bg-zinc-950/30 backdrop-blur-[1px] md:hidden"
        />
      )}

      {/* Floating Pop-Up Windows */}
      {openWindows.map((win) => {
        const config = WINDOW_CONFIG[win.id];
        return (
          <DraggableWindow
            key={win.id}
            id={win.id}
            title={config.title}
            zIndex={win.zIndex}
            position={win.position}
            closing={Boolean(win.closing)}
            widthClass={config.widthClass}
            onFocus={focusWindow}
            onClose={closeWindow}
            onMove={moveWindow}
          >
            {renderWindowContent(win.id)}
          </DraggableWindow>
        );
      })}

      <MusicPlayer soundEnabled={soundEnabled} />

      <Footer soundEnabled={soundEnabled} />
    </div>
  );
}
