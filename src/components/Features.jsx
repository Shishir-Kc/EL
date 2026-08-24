import { motion } from 'framer-motion';

const FEATURES = [
  {
    id: '001',
    label: 'Agents',
    title: 'Reasons at the Edge',
    body:
      'NVIDIA NIM models served through the OpenAI SDK with high reasoning effort. A model-roulette selector picks providers on demand — deep agents, web agents, workers, and a council are wired into the same spine.',
    tags: ['agents/nvidia.py', 'Load_Agent', 'model_roulet()'],
  },
  {
    id: '002',
    label: 'Encryption',
    title: 'Keys Never Sleep in Plain Text',
    body:
      'Every API key is sealed with Fernet symmetric encryption before it touches disk. The vault lives under ~/.config/E.L.Y.S.I.U.M, detects duplicate provider+model pairs, and rotates keys instead of stacking them.',
    tags: ['security/encryption/crypto.py', 'keys.json', 'Fernet'],
  },
  {
    id: '003',
    label: 'Live Server',
    title: 'Telemetry That Streams',
    body:
      'A FastAPI core exposes a health check, server-sent event log streaming on /read, and a WebSocket channel on /ws. Watch the harness breathe in real time from anywhere on your network.',
    tags: ['server/main.py', 'GET /read · SSE', '/ws'],
  },
  {
    id: '004',
    label: 'Additionals',
    title: 'Learns New Skills on Its Own',
    body:
      'A plug-and-play registry of skills and tools the harness downloads at runtime — version-checked against the cloud, dependency-resolved, and logged to settings.json. The agent decides when to grow.',
    tags: ['elysium_config/additionals.py', 'Elysium_additionals', 'self-install'],
  },
  {
    id: '005',
    label: 'Voice',
    title: 'Tuned to Your Machine',
    body:
      'KittenTTS models — nano, micro, mini — are matched to your total system RAM automatically. Small board or beefy rig, the voice model that fits is the one that ships.',
    tags: ['voice_config.py', 'kitten-tts-nano → mini', 'RAM-fit'],
  },
  {
    id: '006',
    label: 'System Aware',
    title: 'Knows Its Own Body',
    body:
      'psutil-driven inspection of storage, RAM, swap, and per-application cache usage. It ranks what hogs your disk and can purge bloat with sudo when you ask.',
    tags: ['linux/system.py', 'show_ram_info()', 'rm-cache'],
  },
  {
    id: '007',
    label: 'Self-Updating',
    title: 'Evolves While Idle',
    body:
      'The Updater diffs local metadata against the cloud config on every boot. New version detected? The old tree is removed, the latest source cloned, dependencies re-synced with uv — no hands required.',
    tags: ['updater.py', 'check_update()', 'uv sync'],
  },
];

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function FeatureRow({ feature }) {
  return (
    <motion.article
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="group grid gap-10 border-t border-line-1 py-14 md:grid-cols-[auto_1fr_1fr] md:gap-14"
    >
      <div className="font-mono text-sm text-ink-4 transition-colors group-hover:text-white">
        #{feature.id}
      </div>

      <h3 className="display text-3xl text-white md:text-[2.6rem] md:leading-tight">
        <span className="kicker mb-4 block font-mono text-[10px] not-italic tracking-[0.22em] text-ink-3">
          {feature.label}
        </span>
        {feature.title}
      </h3>

      <div>
        <p className="text-sm leading-relaxed font-light text-ink-2">{feature.body}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {feature.tags.map((tag) => (
            <span
              key={tag}
              className="border border-line-2 px-2.5 py-1 font-mono text-[10px] text-ink-3"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-28">
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className="kicker mb-6 text-ink-3">Feature Preview</p>
        <h2 className="display max-w-2xl text-4xl text-white md:text-6xl">
          Seven systems.<br />
          <span className="italic text-ink-2">One harness.</span>
        </h2>
      </motion.div>

      <div className="mt-16 border-b border-line-1">
        {FEATURES.map((feature) => (
          <FeatureRow key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}
