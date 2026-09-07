import { motion } from 'framer-motion';

const MODULES = [
  {
    name: 'Server/',
    desc: 'FastAPI lifespan app, SSE log stream, WebSocket channel.',
    files: ['main.py', 'routes/'],
  },
  {
    name: 'Agents/',
    desc: 'Model roulette, NVIDIA NIM chat, deep/web/worker/council spine, voice stub.',
    files: ['__init__.py', 'nvidia.py', 'agent.py'],
  },
  {
    name: 'AriaConfig/',
    desc: 'Encrypted model config, self-updater, additionals registry, voice RAM-fit.',
    files: ['model_config.py', 'updater.py', 'additionals.py'],
  },
  {
    name: 'AriaCli/',
    desc: 'aria CLI — eleven subcommands over argparse with encrypted cli_config.',
    files: ['main.py', 'commands/', 'Config/'],
  },
  {
    name: 'Security/',
    desc: 'Fernet key generation, encrypt/decrypt, provider+model dedupe vault.',
    files: ['encryption/crypto.py'],
  },
  {
    name: 'Linux/',
    desc: 'psutil storage/RAM/cache inspection and sudo cache purge.',
    files: ['system.py'],
  },
  {
    name: 'Workers/',
    desc: 'Background worker framework with startup preview config.',
    files: ['worker.py', 'workers_preview.json'],
  },
  {
    name: 'Errors/',
    desc: 'Centralized exceptions — missing configs, absent keys, unknown providers.',
    files: ['errors.py'],
  },
];

export default function Architecture() {
  return (
    <section id="architecture" className="mx-auto max-w-6xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="kicker mb-6 text-ink-3">Architecture</p>
        <h2 className="display max-w-2xl text-4xl text-white md:text-6xl">
          Modular to<br />
          <span className="italic text-ink-2">the bone.</span>
        </h2>
      </motion.div>

      <div className="mt-16 grid gap-px border border-line-1 bg-line-1 sm:grid-cols-2 lg:grid-cols-4">
        {MODULES.map((mod, i) => (
          <motion.div
            key={mod.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            className="group flex min-h-44 flex-col justify-between bg-bg p-5 transition-colors hover:bg-surface-2"
          >
            <p className="font-mono text-sm text-white">{mod.name}</p>
            <p className="mt-3 text-xs leading-relaxed font-light text-ink-2">{mod.desc}</p>
            <div className="mt-4 flex flex-wrap gap-x-3 font-mono text-[10px] text-ink-4 transition-colors group-hover:text-ink-2">
              {mod.files.map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-8 font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase"
      >
        Root · ~/.config/A.R.I.A — logs, keys, skills &amp; memory live here
      </motion.p>
    </section>
  );
}
