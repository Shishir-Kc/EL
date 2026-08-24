import { useState } from 'react';
import { motion } from 'framer-motion';

const CURL_CMD = 'curl -fsSL https://elysium.shishirkhatri.com.np/install.sh | sh';

const SCRIPT_STEPS = [
  'Verifies Linux + at least 4 GB RAM',
  'Bootstraps uv into ~/.local/bin',
  'Clones the harness to ~/.E.L.Y.S.I.U.M',
  'Syncs every dependency with uv sync',
  'Wires the romeo launcher into your PATH',
];

export default function Install() {
  const [copied, setCopied] = useState(false);

  const copyCurl = async () => {
    try {
      await navigator.clipboard.writeText(CURL_CMD);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="install" className="dot-grid border-t border-line-1 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid items-start gap-14 lg:grid-cols-[1fr_1.2fr]"
        >
          <div>
            <p className="kicker mb-6 text-ink-3">Install</p>
            <h2 className="display text-4xl text-white md:text-5xl">
              Raise the<br />
              <span className="italic text-ink-2">harness tonight.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed font-light text-ink-2">
              One command. One script. It provisions the{' '}
              <span className="font-mono text-white">romeo</span> launcher, wires your
              PATH, and offers an interactive upgrade path on every re-run.
            </p>
            <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
              Linux native · any distro · one pipe
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="overflow-hidden border border-line-2 bg-surface-1"
          >
            <div className="flex items-center justify-between border-b border-line-1 px-4 py-2.5">
              <p className="font-mono text-[10px] tracking-[0.2em] text-ink-4">
                install via terminal
              </p>
              <button
                onClick={copyCurl}
                className="border border-line-2 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-ink-2 uppercase transition-colors hover:border-white hover:text-white"
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </div>

            <div className="border-b border-line-1 px-4 py-5">
              <code className="block overflow-x-auto font-mono text-[13px] whitespace-pre text-white">
                <span className="mr-2 text-ink-4 select-none">$</span>
                {CURL_CMD}
              </code>
            </div>

            <div className="px-4 py-3">
              <p className="font-mono text-[10px] tracking-[0.2em] text-ink-4 uppercase">
                the script handles it
              </p>
              <ol className="mt-2">
                {SCRIPT_STEPS.map((step, i) => (
                  <li key={step} className="flex items-baseline gap-3 py-1.5">
                    <span className="font-mono text-[10px] text-ink-4">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-light text-ink-2">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-line-1 px-4 py-3 font-mono text-[11px] text-ink-3">
              # then run <span className="text-white">romeo</span> in any terminal — the
              harness answers
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
