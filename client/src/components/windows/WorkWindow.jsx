import { ExternalLink, Shirt, Navigation, Cpu, Database } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { playClickSound } from '../../utils/sound';
import SectionTitle from '../SectionTitle';

const projectVisuals = {
  rewardrobe: {
    Icon: Shirt,
    bgLight: 'from-amber-100 via-orange-50 to-amber-200',
    bgDark: 'from-amber-950/60 via-stone-900 to-amber-900/40',
    iconColorLight: 'text-amber-700',
    iconColorDark: 'text-amber-300',
    subtitle: 'community web platform',
  },
  'flood-nav': {
    Icon: Navigation,
    bgLight: 'from-sky-100 via-blue-50 to-cyan-200',
    bgDark: 'from-sky-950/70 via-slate-900 to-sky-900/40',
    iconColorLight: 'text-sky-700',
    iconColorDark: 'text-sky-300',
    subtitle: 'flood-aware navigation',
  },
  ascend: {
    Icon: Cpu,
    bgLight: 'from-teal-100 via-emerald-50 to-cyan-200',
    bgDark: 'from-teal-950/70 via-stone-900 to-emerald-900/40',
    iconColorLight: 'text-teal-700',
    iconColorDark: 'text-teal-300',
    subtitle: 'smart curb iot telemetry',
  },
  'lab-inventory': {
    Icon: Database,
    bgLight: 'from-indigo-100 via-purple-50 to-blue-200',
    bgDark: 'from-indigo-950/70 via-slate-900 to-indigo-900/40',
    iconColorLight: 'text-indigo-700',
    iconColorDark: 'text-indigo-300',
    subtitle: 'lab asset tracking system',
  },
};

export default function WorkWindow({ soundEnabled }) {
  return (
    <div className="p-6 sm:p-7 space-y-7 text-sm text-zinc-700 dark:text-zinc-200">
      <div className="rounded-lg bg-amber-50/90 dark:bg-sky-950/40 border border-amber-200/70 dark:border-sky-800/50 px-4 py-3 text-xs sm:text-[13px] leading-relaxed">
        <p className="font-medium text-zinc-800 dark:text-zinc-100">
          Accepting work offers via my{' '}
          <a
            href={`mailto:${portfolioData.profile.email}`}
            onClick={() => playClickSound(soundEnabled)}
            className="font-semibold text-[#d97706] dark:text-[#7dd3fc] underline underline-offset-2 hover:opacity-80"
          >
            work email!
          </a>
        </p>
        <p className="mt-0.5 text-zinc-600 dark:text-zinc-300">
          I do full-stack web development, self-hosted infrastructure, and software architecture. :)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <section>
          <SectionTitle className="mb-2.5">Tools</SectionTitle>
          <div className="flex flex-wrap gap-1.5">
            {portfolioData.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50/80 dark:bg-zinc-800/60 px-2.5 py-1 text-xs text-zinc-700 dark:text-zinc-200 transition-all duration-150 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-50/90 hover:text-amber-900 dark:hover:border-sky-400 dark:hover:bg-sky-950/70 dark:hover:text-sky-200 cursor-default select-none shadow-xs hover:shadow-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle className="mb-2.5">Development</SectionTitle>
          <div className="flex flex-wrap gap-1.5">
            {portfolioData.development.map((item) => (
              <span
                key={item}
                className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50/80 dark:bg-zinc-800/60 px-2.5 py-1 text-xs text-zinc-700 dark:text-zinc-200 transition-all duration-150 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-50/90 hover:text-amber-900 dark:hover:border-sky-400 dark:hover:bg-sky-950/70 dark:hover:text-sky-200 cursor-default select-none shadow-xs hover:shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>

      <section className="space-y-4">
        <div>
          <SectionTitle>Selected Projects</SectionTitle>
        </div>

        <div className="space-y-5">
          {portfolioData.projects.map((project) => {
            const visual = projectVisuals[project.id] || {
              Icon: ExternalLink,
              bgLight: 'from-zinc-100 to-zinc-200',
              bgDark: 'from-zinc-800 to-zinc-900',
              iconColorLight: 'text-zinc-700',
              iconColorDark: 'text-zinc-200',
              subtitle: 'project preview',
            };
            const VisualIcon = visual.Icon;

            return (
              <article
                key={project.id}
                className="flex flex-col sm:flex-row items-start gap-4 p-2 sm:p-3 rounded-xl transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40"
              >
                {/* Image Placeholder on left */}
                <div
                  className={`w-full sm:w-44 h-28 shrink-0 rounded-lg border border-zinc-200/90 dark:border-zinc-700/80 bg-gradient-to-br ${visual.bgLight} dark:${visual.bgDark} flex flex-col items-center justify-center p-3 text-center shadow-xs select-none`}
                >
                  <VisualIcon
                    className={`h-7 w-7 ${visual.iconColorLight} dark:${visual.iconColorDark} mb-1.5`}
                    strokeWidth={1.75}
                  />
                  <span className="font-mono text-[11px] font-bold tracking-tight text-zinc-800 dark:text-zinc-200 truncate max-w-[140px]">
                    {project.title}
                  </span>
                  <span className="font-mono text-[9px] text-zinc-500 dark:text-zinc-400">
                    {visual.subtitle}
                  </span>
                </div>

                {/* Content on right */}
                <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base sm:text-[17px] font-bold text-[#f59e0b] dark:text-[#7dd3fc]">
                        {project.title}
                      </h4>
                      <span className="font-mono text-[11px] text-zinc-400">
                        {project.year}
                      </span>
                    </div>

                    <p className="mt-1 text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {project.summary}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-zinc-200/80 dark:border-zinc-700/80 bg-white/80 dark:bg-zinc-800/80 px-1.5 py-0.5 font-mono text-[10px] text-zinc-600 dark:text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.repoUrl && (
                    <div className="mt-3 flex justify-start sm:justify-end">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playClickSound(soundEnabled)}
                        className="inline-flex items-center gap-1.5 rounded-md bg-amber-100/90 hover:bg-amber-200/90 text-amber-900 dark:bg-sky-950/80 dark:hover:bg-sky-900/80 dark:text-sky-200 px-3 py-1 font-mono text-xs font-semibold transition-colors"
                      >
                        view project
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="pt-4 border-t border-zinc-200/80 dark:border-zinc-700/70 space-y-2.5">
        <SectionTitle>Other dev projects</SectionTitle>
        <ul className="list-disc list-inside space-y-1 text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-300">
          <li>This desktop-OS portfolio website!</li>
          <li>Homelab automation &amp; self-hosted monitoring stack on Proxmox VE</li>
        </ul>

        <p className="pt-1 text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400">
          See more on{' '}
          <a
            href="https://github.com/miraclegerrald"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound(soundEnabled)}
            className="font-medium text-[#d97706] dark:text-[#7dd3fc] underline underline-offset-2 hover:opacity-80"
          >
            GitHub
          </a>
        </p>
      </section>
    </div>
  );
}
