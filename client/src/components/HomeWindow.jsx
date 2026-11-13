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
      className="relative z-10 w-full max-w-[420px] md:w-[92vw] md:max-w-[660px] md:rounded-xl md:border md:border-zinc-400/75 md:dark:border-zinc-300/70 md:bg-white md:dark:bg-[#131d2b] md:shadow-[0_12px_36px_rgba(15,23,42,0.12)] md:dark:shadow-[0_14px_40px_rgba(0,0,0,0.45)] overflow-visible transition-colors duration-300"
    >
      <div
        aria-hidden="true"
        className="hidden md:block animate-float-slow pointer-events-none absolute -top-11 left-4 select-none"
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

      <div className="hidden md:flex items-center justify-between rounded-t-[11px] bg-[#3f3f3f] dark:bg-[#1c1c20] px-4 py-2.5 border-b border-zinc-500/30 dark:border-zinc-700/60">
        <span className="font-mono text-sm font-medium tracking-tight text-white">home</span>
      </div>

      <div className="px-4 py-4 md:px-12 md:py-14 flex flex-col items-center text-center">
        <h1 className="text-[2.25rem] sm:text-4xl md:text-[3.1rem] font-semibold tracking-tight text-zinc-700 dark:text-zinc-100 leading-tight">
          {profile.greetingPrefix}{' '}
          <span className="text-[#f59e0b] dark:text-[#7dd3fc] font-bold">
            {profile.greetingHighlight}
          </span>
        </h1>

        <p className="mt-2.5 max-w-[300px] sm:max-w-md text-[13px] sm:text-[15px] text-zinc-500 dark:text-zinc-300 leading-relaxed">
          {profile.tagline}
        </p>

        <nav
          aria-label="Portfolio sections"
          className="mt-7 md:mt-9 flex flex-wrap justify-center gap-4 w-full max-w-[290px] min-[380px]:max-w-[320px] md:max-w-[460px] md:grid md:grid-cols-5 md:gap-6"
        >
          {navItems.map(({ id, label, Icon }) => {
            const isOpen = openWindows.some((w) => w.id === id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => onOpenWindow(id)}
                className="group flex flex-col items-center gap-1.5 md:gap-2 focus:outline-none cursor-pointer"
              >
                <div
                  className={`relative flex h-[74px] w-[74px] md:h-14 md:w-14 items-center justify-center rounded-xl border transition-all duration-150 group-hover:-translate-y-1 group-active:translate-y-0 ${
                    isOpen
                      ? 'border-[#f59e0b] bg-amber-100/90 text-[#d97706] dark:border-sky-400 dark:bg-[#2a5999] dark:text-sky-200 shadow-sm'
                      : 'border-amber-200/70 bg-amber-50/90 text-zinc-700 group-hover:border-amber-400 dark:border-[#2e5a96] dark:bg-[#1f4478] dark:text-white dark:group-hover:border-sky-300/80 md:border-zinc-300/90 md:bg-zinc-50/70 md:group-hover:border-zinc-500 md:group-hover:bg-white md:dark:border-zinc-600/80 md:dark:bg-zinc-800/60 md:dark:text-zinc-200 md:dark:group-hover:border-sky-300/70 md:dark:group-hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="h-7 w-7" strokeWidth={1.65} />
                  {isOpen && (
                    <span
                      aria-hidden="true"
                      className="hidden md:block absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-[#f59e0b] dark:bg-sky-400"
                    />
                  )}
                </div>
                <span className="font-mono text-xs font-medium text-zinc-600 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-white transition-colors">
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
