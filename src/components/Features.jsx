import { motion } from 'framer-motion';
import useInView from '../hooks/useInView';

const features = [
  {
    title: 'Agent Registry',
    description:
      'NvidiaAgent, multi-model support via OpenRouter, and dynamic model roulette. Load agents with encrypted API keys and switch providers instantly.',
    icon: (
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    ),
  },
  {
    title: 'Plugin Architecture',
    description:
      'Extend capabilities through customizable scripts or install community plugins from the Elysium_additionals repository.',
    icon: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    ),
  },
  {
    title: 'Daily Check-ins',
    description:
      'Run `elysium log` to track emotional states, log milestones, and maintain a private engineering journal.',
    icon: (
      <g>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="13" y2="13" />
      </g>
    ),
  },
  {
    title: 'Config & Encryption',
    description:
      'Fernet-encrypted API keys, secure model configs, and one-click export of settings to spin up agents anywhere.',
    icon: (
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.78 7.78 5.5 5.5 0 017.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    ),
  },
  {
    title: 'Python Native',
    description:
      'Built strictly in Python. Runs instantly with `uv`. Zero-headache setup, lightweight footprint, and full control.',
    icon: (
      <g>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </g>
    ),
  },
  {
    title: 'FastAPI Server',
    description:
      'Built-in server with health checks, SSE log streaming, and WebSocket echo endpoints for real-time integration.',
    icon: (
      <g>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </g>
    ),
  },
];

const cardEase = [0.16, 1, 0.3, 1];

export default function Features() {
  const [ref, isInView] = useInView();

  return (
    <section
      ref={ref}
      style={{
        paddingTop: 160,
        paddingBottom: 160,
        maxWidth: 1160,
        margin: '0 auto',
        paddingLeft: 40,
        paddingRight: 40,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 80, textAlign: 'center' }}>
        <p
          style={{
            fontWeight: 400,
            fontSize: 11,
            letterSpacing: '0.35em',
            color: 'var(--text-3)',
            textTransform: 'uppercase',
            marginBottom: 16,
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          Capabilities
        </p>
        <h2
          className="font-serif"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(2.6rem, 5vw, 3.8rem)',
            color: 'var(--text-1)',
            lineHeight: 1,
            margin: 0,
          }}
        >
          What it does
        </h2>
      </div>

      {/* Features Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 16,
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.75,
              ease: cardEase,
              delay: index * 0.08,
            }}
            whileHover={{
              y: -4,
              borderColor: 'rgba(255,255,255,0.22)',
              backgroundColor: 'var(--bg-2)',
              transition: { duration: 0.35, ease: 'easeOut' },
            }}
            style={{
              background: 'var(--bg-3)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '36px 32px',
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-1)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginBottom: 24 }}
            >
              {feature.icon}
            </svg>

            <h3
              className="font-serif"
              style={{
                fontWeight: 400,
                fontSize: '1.35rem',
                color: 'var(--text-1)',
                marginBottom: 12,
                letterSpacing: '0.01em',
              }}
            >
              {feature.title}
            </h3>

            <p
              className="font-sans"
              style={{
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 1.75,
                color: 'var(--text-2)',
              }}
            >
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          section {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
