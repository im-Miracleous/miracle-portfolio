import { useState } from 'react';
import { Download } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import SectionTitle from '../SectionTitle';

export default function AboutWindow({ onOpenContact }) {
  const { profile } = portfolioData;
  const [imgError, setImgError] = useState(false);

  let avatarContent;
  if (profile.avatarUrl && !imgError) {
    avatarContent = (
      <img
        src={profile.avatarUrl}
        alt={profile.fullName}
        onError={() => setImgError(true)}
        className="h-full w-full object-cover"
      />
    );
  } else {
    avatarContent = (
      <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-amber-700 dark:text-sky-200">
        {profile.initials}
      </span>
    );
  }

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 bg-white dark:bg-[#131d2b] border-b border-zinc-200 dark:border-zinc-700/70 p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-5">
        <div className="shrink-0">
          <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center overflow-hidden rounded-full border-2 border-amber-400/70 dark:border-sky-400/70 bg-gradient-to-br from-amber-100 via-orange-50 to-sky-100 dark:from-sky-900/80 dark:via-slate-800 dark:to-indigo-950 shadow-inner">
            {avatarContent}
          </div>
        </div>

        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-[1.7rem] font-bold tracking-tight text-[#f59e0b] dark:text-[#7dd3fc]">
            {profile.fullName}
          </h2>
          <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">
            {profile.subtitle}
          </p>
          <p className="mt-0.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            {profile.role}
          </p>
          <a
            href={profile.cvUrl}
            download="CV_Miracle_Steven_Gerrald.pdf"
            className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-amber-300/80 bg-amber-50/90 hover:bg-amber-100 text-amber-900 dark:border-sky-400/50 dark:bg-sky-950/70 dark:hover:bg-sky-900/70 dark:text-sky-200 px-3 py-1 font-mono text-xs font-medium transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            download cv
          </a>
        </div>
      </div>

      <div className="p-6 sm:p-7 space-y-7 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
        <p>{profile.bioIntro}</p>

        <section className="space-y-2.5">
          <SectionTitle>Education</SectionTitle>
          <div className="border-l-2 border-zinc-200 dark:border-zinc-700 pl-3.5 space-y-2">
            {profile.education.map((edu) => (
              <div key={edu.degree}>
                <p className="font-medium text-zinc-800 dark:text-zinc-100 text-sm">
                  {edu.degree}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {edu.institution} ({edu.period})
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <SectionTitle>Experiences</SectionTitle>
          <div className="border-l-2 border-zinc-200 dark:border-zinc-700 pl-3.5 space-y-4">
            {profile.experiences.map((exp) => (
              <div key={`${exp.role}-${exp.organization}`} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-3">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-100 text-[13px]">
                    {exp.organization}
                  </span>
                  <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 sm:text-right shrink-0">
                    {exp.location}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-3">
                  <span className="text-xs font-medium text-[#d97706] dark:text-[#7dd3fc]">
                    {exp.role}
                  </span>
                  <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 sm:text-right shrink-0">
                    {exp.period}
                  </span>
                </div>

                <ul className="list-disc list-outside ml-4 pt-0.5 space-y-1 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed text-justify">
                  {exp.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <SectionTitle>Other Interests</SectionTitle>
          <ul className="list-disc list-inside space-y-1 text-[13px] sm:text-sm">
            {profile.otherInterests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-2">
          <SectionTitle>Language Proficiency</SectionTitle>
          <div className="border-l-2 border-zinc-200 dark:border-zinc-700 pl-3.5 space-y-1.5">
            <p className="text-sm text-zinc-700 dark:text-zinc-200">
              i have native fluency in{' '}
              <span className="font-semibold text-[#f59e0b] dark:text-[#7dd3fc]">
                Indonesian
              </span>{' '}
              and strong professional proficiency in{' '}
              <span className="font-semibold text-[#f59e0b] dark:text-[#7dd3fc]">
                English
              </span>
              .
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {profile.languages.note}
            </p>
          </div>
        </section>

        <p className="pt-2 border-t border-zinc-200/80 dark:border-zinc-700/70 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          {profile.bioClosing}{' '}
          <button
            type="button"
            onClick={onOpenContact}
            className="font-medium text-[#d97706] dark:text-[#7dd3fc] underline underline-offset-4 hover:opacity-80 cursor-pointer"
          >
            say hello!
          </button>
        </p>
      </div>
    </div>
  );
}
