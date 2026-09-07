import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Terminal', href: '#terminal' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Install', href: '#install' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-line-1 bg-bg/85 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="group flex items-center">
          <span className="font-mono text-xs tracking-[0.28em] text-ink-1">
            A.R.I.A
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-[11px] tracking-[0.18em] text-ink-2 uppercase transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="https://github.com/Shishir-Kc/A.R.I.A"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub repository"
          className="flex items-center gap-2 border border-line-2 px-3 py-1.5 font-mono text-[11px] text-ink-2 transition-colors hover:border-line-3 hover:text-white"
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
          <span className="hidden sm:inline">Source</span>
        </a>
      </nav>
    </header>
  );
}
