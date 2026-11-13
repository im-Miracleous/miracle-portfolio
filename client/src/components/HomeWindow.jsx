import { FolderOpen, HelpCircle, Info, Link2, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const navItems = [
  { id: 'about', label: 'about', Icon: Info },
  { id: 'links', label: 'links', Icon: Link2 },
  { id: 'work', label: 'work', Icon: FolderOpen },
  { id: 'faq', label: 'faq', Icon: HelpCircle },
  { id: 'contact', label: 'contact', Icon: Mail },
];

export default function HomeWindow({ openWindows, onOpenWindow }) {
  const { profile } = portfolioData;

  return (
    <section
      aria-label="Home launcher window"
      className="relative z-10 w-[92vw] max-w-[660px] rounded-xl border border-zinc-400/75 dark:border-zinc-300/70 bg-white dark:bg-[#131d2b] shadow-[0_12px_36px_rgba(15,23,42,0.12)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.45)] overflow-visible transition-colors duration-300"
    >
      {/* Playful corner star sticker above the top-left of the home window */}
      <div
        aria-hidden="true"
        className="animate-float-slow pointer-events-none absolute -top-9 left-3 sm:-top-11 sm:left-4 select-none"
      >
        <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
          <path
            d="M20 2.5L24.8 13.1L36.4 14.3L27.7 22.1L30.1 33.5L20 27.6L9.9 33.5L12.3 22.1L3.6 14.3L15.2 13.1L20 2.5Z"
            className="fill-amber-300 stroke-amber-500 dark:fill-sky-300 dark:stroke-sky-500 transition-colors duration-300"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="16.5" cy="19" r="1.4" className="fill-amber-800 dark:fill-sky-900" />
          <circle cx="23.5" cy="19" r="1.4" className="fill-amber-800 dark:fill-sky-900" />
          <path
            d="M17.5 22.2C18.5 23.4 21.5 23.4 22.5 22.2"
            className="stroke-amber-800 dark:stroke-sky-900"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Window Title Bar */}
      <div className="flex items-center justify-between rounded-t-[11px] bg-[#3f3f3f] dark:bg-[#1c1c20] px-4 py-2.5 border-b border-zinc-500/30 dark:border-zinc-700/60">
        <span className="font-mono text-sm font-medium tracking-tight text-white">home</span>
      </div>

      {/* Main Launcher Body */}
      <div className="px-6 py-11 sm:px-12 sm:py-14 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-[3.1rem] font-semibold tracking-tight text-zinc-700 dark:text-zinc-100 leading-tight">
          {profile.greetingPrefix}{' '}
          <span className="text-[#f59e0b] dark:text-[#7dd3fc] font-bold">
            {profile.greetingHighlight}
          </span>
        </h1>

        <p className="mt-3 max-w-md text-sm sm:text-[15px] text-zinc-500 dark:text-zinc-300 leading-relaxed">
          {profile.tagline}
        </p>

        {/* 5 Desktop App Icons */}
        <nav
          aria-label="Portfolio sections"
          className="mt-9 grid grid-cols-5 gap-2 sm:gap-6 w-full max-w-[460px]"
        >
          {navItems.map(({ id, label, Icon }) => {
            const isOpen = openWindows.some((w) => w.id === id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => onOpenWindow(id)}
                className="group flex flex-col items-center gap-2 focus:outline-none cursor-pointer"
              >
                <div
                  className={`relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border transition-all duration-150 group-hover:-translate-y-1 group-active:translate-y-0 ${isOpen
                      ? 'border-[#f59e0b] bg-amber-50/70 text-[#d97706] dark:border-sky-400 dark:bg-sky-950/60 dark:text-sky-300 shadow-sm'
                      : 'border-zinc-300/90 bg-zinc-50/70 text-zinc-700 group-hover:border-zinc-500 group-hover:bg-white dark:border-zinc-600/80 dark:bg-zinc-800/60 dark:text-zinc-200 dark:group-hover:border-sky-300/70 dark:group-hover:bg-zinc-800'
                    }`}
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.65} />
                  {isOpen && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-[#f59e0b] dark:bg-sky-400"
                    />
                  )}
                </div>
                <span className="font-mono text-[11px] sm:text-xs font-medium text-zinc-600 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-white transition-colors">
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
