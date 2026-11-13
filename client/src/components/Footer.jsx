import { Github, Instagram, Linkedin, Youtube } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playClickSound } from '../utils/sound';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
};

export default function Footer({ soundEnabled }) {
  return (
    <footer className="fixed bottom-3 inset-x-0 z-20 flex flex-col items-center gap-2 pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-auto">
        {portfolioData.socials.map((item) => {
          const Icon = iconMap[item.id] || Github;
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              title={item.label}
              onClick={() => playClickSound(soundEnabled)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3f3f3f] text-white shadow-sm transition-transform duration-150 hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
            </a>
          );
        })}
      </div>

      <p className="text-[11px] font-medium tracking-wide text-zinc-700/90 dark:text-zinc-200/90">
        {portfolioData.profile.copyright}
      </p>
    </footer>
  );
}
