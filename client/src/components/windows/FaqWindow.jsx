import { memo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { playClickSound } from '../../utils/sound';
import SectionTitle from '../SectionTitle';

function FaqWindow({ soundEnabled }) {
  const [openId, setOpenId] = useState(null);

  const toggleItem = (id) => {
    playClickSound(soundEnabled);
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-5 sm:p-6 space-y-4">
      <div>
        <SectionTitle as="h2">frequently asked questions</SectionTitle>
        <p className="text-sm md:text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          tech stack choices, availability, and my homelab setup
        </p>
      </div>

      <div className="space-y-2.5">
        {portfolioData.faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700/75 bg-zinc-50/70 dark:bg-zinc-900/45 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleItem(faq.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left cursor-pointer hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <span className="text-[15px] md:text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 md:h-4 md:w-4 shrink-0 text-zinc-500 dark:text-zinc-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#f59e0b] dark:text-[#7dd3fc]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1.5 md:pb-3.5 md:pt-0.5 text-sm md:text-[13px] text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/60 dark:border-zinc-800">
                  {faq.link && faq.answer.includes(faq.link.text) ? (
                    <>
                      {faq.answer.split(faq.link.text)[0]}
                      <a
                        href={faq.link.href}
                        className="font-medium underline text-[#f59e0b] dark:text-[#7dd3fc] hover:opacity-80"
                      >
                        {faq.link.text}
                      </a>
                      {faq.answer.split(faq.link.text).slice(1).join(faq.link.text)}
                    </>
                  ) : (
                    faq.answer
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(FaqWindow);
