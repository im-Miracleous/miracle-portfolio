import { useState } from 'react';
import { Check, Copy, Loader2, Send } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { playClickSound } from '../../utils/sound';
import SectionTitle from '../SectionTitle';

export default function ContactWindow({ soundEnabled }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', text: '' });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    playClickSound(soundEnabled);
    try {
      await navigator.clipboard.writeText(portfolioData.profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClickSound(soundEnabled);
    setStatus({ type: 'loading', text: '' });
    setFieldErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const payload = await response.json();

      if (!response.ok) {
        setFieldErrors(payload.errors || {});
        setStatus({
          type: 'error',
          text: payload.message || 'Unable to send message. Please check your inputs.',
        });
        return;
      }

      setStatus({
        type: 'success',
        text: payload.message || 'Message sent! Thank you for reaching out.',
      });
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus({
        type: 'error',
        text: 'Could not reach the server. Make sure the Express backend is running.',
      });
    }
  };

  return (
    <div className="p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
        <div>
          <SectionTitle as="h2">get in touch</SectionTitle>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            send a direct message or copy my email below
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3 py-1.5 font-mono text-[11px] text-zinc-700 dark:text-zinc-200 hover:border-[#f59e0b] dark:hover:border-[#7dd3fc] transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span>copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>{portfolioData.profile.email}</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label
            htmlFor="contact-name"
            className="block font-mono text-[11px] font-medium text-zinc-600 dark:text-zinc-300 mb-1"
          >
            name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/70 px-3 py-2 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-[#f59e0b] dark:focus:border-[#7dd3fc] focus:outline-none"
          />
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-rose-500">{fieldErrors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block font-mono text-[11px] font-medium text-zinc-600 dark:text-zinc-300 mb-1"
          >
            email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/70 px-3 py-2 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-[#f59e0b] dark:focus:border-[#7dd3fc] focus:outline-none"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-rose-500">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block font-mono text-[11px] font-medium text-zinc-600 dark:text-zinc-300 mb-1"
          >
            message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            value={form.message}
            onChange={handleChange}
            placeholder="Tell me about your project, internship opportunity, or homelab question..."
            className="w-full resize-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/70 px-3 py-2 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-[#f59e0b] dark:focus:border-[#7dd3fc] focus:outline-none"
          />
          {fieldErrors.message && (
            <p className="mt-1 text-xs text-rose-500">{fieldErrors.message}</p>
          )}
        </div>

        {status.type === 'success' && (
          <div className="rounded-lg border border-emerald-300/70 bg-emerald-50 dark:border-emerald-700/60 dark:bg-emerald-950/40 px-3 py-2 text-xs text-emerald-700 dark:text-emerald-300">
            {status.text}
          </div>
        )}

        {status.type === 'error' && (
          <div className="rounded-lg border border-rose-300/70 bg-rose-50 dark:border-rose-700/60 dark:bg-rose-950/40 px-3 py-2 text-xs text-rose-700 dark:text-rose-300">
            {status.text}
          </div>
        )}

        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#3f3f3f] hover:bg-zinc-800 dark:bg-[#7dd3fc] dark:hover:bg-sky-300 px-4 py-2.5 font-mono text-xs font-semibold text-white dark:text-zinc-900 transition-colors disabled:opacity-60 cursor-pointer"
        >
          {status.type === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>sending...</span>
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              <span>send message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
