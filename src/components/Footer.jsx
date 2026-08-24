export default function Footer() {
  return (
    <footer className="border-t border-line-1 bg-surface-1">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="display text-3xl text-white">E.L.Y.S.I.U.M</p>
            <p className="mt-3 max-w-xs text-xs leading-relaxed font-light text-ink-3">
              A home AI security harness that reasons, remembers, encrypts, and
              updates itself — so your home runs itself.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-3 font-mono text-[11px] tracking-[0.14em] uppercase">
            <a href="#features" className="text-ink-2 transition-colors hover:text-white">Features</a>
            <a href="#terminal" className="text-ink-2 transition-colors hover:text-white">Terminal</a>
            <a href="#architecture" className="text-ink-2 transition-colors hover:text-white">Architecture</a>
            <a href="#install" className="text-ink-2 transition-colors hover:text-white">Install</a>
            <a
              href="https://github.com/Shishir-Kc/E.L.Y.S.I.U.M"
              target="_blank"
              rel="noreferrer"
              className="text-ink-2 transition-colors hover:text-white"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line-1 pt-6 font-mono text-[10px] tracking-[0.18em] text-ink-4 uppercase md:flex-row md:items-center md:justify-between">
          <p>v0.0.8 · omega-cooper · development build</p>
          <p>last dev changes · 21 july w30 2026</p>
          <p>{new Date().getFullYear()} — linux native, always</p>
        </div>
      </div>

      <div className="overflow-hidden border-t border-line-1 py-2.5 select-none">
        <div className="ascii-marquee">
          {[0, 1].map((n) => (
            <span key={n} className="pr-8 font-mono text-[10px] whitespace-pre text-ink-4 opacity-60">
              {'/\\-\\_=+|< -/= ~:*-/  ELYSIUM://STANDBY  >_ watch --logs --live  /\\-\\_=+|< ~:*-/  '}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
