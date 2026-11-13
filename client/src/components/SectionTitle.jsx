export default function SectionTitle({ children, className = '', as: Component = 'h3' }) {
  return (
    <Component
      className={`font-mono text-base sm:text-lg font-bold tracking-wide uppercase text-zinc-900 dark:text-zinc-100 ${className}`}
    >
      {children}
    </Component>
  );
}
