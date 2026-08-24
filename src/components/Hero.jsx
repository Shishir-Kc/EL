import { useState } from 'react';
import { motion } from 'framer-motion';

const ASCII = '/\\-\\_=+|< -/= ~:*-/  [ELYSIUM://BOOT]  >_ run --home --secure  /\\-\\_=+|< ~:*-/  ';

const INSTALL_CMD = 'curl -fsSL https://elysium.shishirkhatri.com.np/install.sh | sh';

const STATS = [
  ['FastAPI', 'Live server core'],
  ['Fernet', 'Keys encrypted at rest'],
  ['NVIDIA NIM', 'Agent reasoning'],
  ['uv · Python 3.12', 'Native runtime'],
];

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="top" className="dot-grid relative overflow-hidden pt-36 pb-20">
      <div className="hairline-grid pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          custom={0}
          className="kicker mb-8 flex items-center gap-3 text-ink-2"
        >
          <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-white" />
          Home AI Security Harness · v0.0.8 omega-cooper
        </motion.p>

        <motion.h1
          variants={fade}
          initial="hidden"
          animate="show"
          custom={1}
          className="display max-w-4xl text-[clamp(3.2rem,9vw,7rem)] text-white"
        >
          The Harness That<br />
          <span className="italic text-ink-2">Keeps Your</span> Home<br />
          Intelligent.
        </motion.h1>

        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-10 max-w-xl text-base leading-relaxed font-light text-ink-2 md:text-lg"
        >
          E.L.Y.S.I.U.M is a modular, self-aware home server harness — agents that reason,
          keys that never sleep in plain text, telemetry that streams live, and a harness
          that updates itself while you sleep.
        </motion.p>

        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a
            href="#install"
            className="bg-white px-7 py-3 font-mono text-xs tracking-[0.18em] text-bg uppercase transition-colors hover:bg-ink-2"
          >
            Install the Harness
          </a>
          <a
            href="#features"
            className="border border-line-3 px-7 py-3 font-mono text-xs tracking-[0.18em] text-ink-1 uppercase transition-colors hover:border-white hover:text-white"
          >
            Explore Features
          </a>
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-8 max-w-2xl"
        >
          <div className="flex items-center gap-3 border border-line-2 bg-surface-1 py-3 pr-3 pl-4">
            <code className="flex-1 overflow-x-auto font-mono text-xs whitespace-pre text-ink-1">
              <span className="mr-2 text-ink-4 select-none">$</span>
              {INSTALL_CMD}
            </code>
            <button
              onClick={copyInstall}
              className="shrink-0 border border-line-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-ink-2 uppercase transition-colors hover:border-white hover:text-white"
            >
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
          <p className="mt-3 font-mono text-[10px] tracking-[0.12em] text-ink-3">
            linux native · requires python 3.12 + uv
          </p>
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          custom={5}
          className="mt-16 grid grid-cols-2 gap-px border border-line-1 bg-line-1 md:grid-cols-4"
        >
          {STATS.map(([title, sub]) => (
            <div key={title} className="bg-surface-1 px-5 py-4">
              <p className="font-mono text-sm text-white">{title}</p>
              <p className="mt-1 text-xs text-ink-3">{sub}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative mt-20 border-y border-line-1 bg-surface-1 py-3 overflow-hidden select-none">
        <div className="ascii-marquee">
          {[0, 1].map((n) => (
            <span key={n} className="pr-8 font-mono text-[11px] whitespace-pre text-ink-4">
              {ASCII}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
