/* src/components/About.jsx — Modern grayscale editorial landing page component */
import { motion } from 'framer-motion';
import useInView from '../hooks/useInView';

const ease = [0.16, 1, 0.3, 1];

export default function About() {
  const [ref, isInView] = useInView();

  return (
    <section
      ref={ref}
      style={{
        padding: '160px 40px',
        maxWidth: 1080,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '80px',
          alignItems: 'flex-start',
        }}
      >
        {/* Left column - quote */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
          transition={{ duration: 0.9, ease }}
          style={{
            flex: '0 0 58%',
            position: 'relative',
            paddingLeft: 28,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 4,
              bottom: 4,
              width: '1px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)',
            }}
          />
          <h2
            className="font-serif"
            style={{
              fontWeight: 300,
              fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
              lineHeight: 1.1,
              color: 'var(--text-1)',
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            “A CLI companion that thinks with you, not for you.”
          </h2>
        </motion.div>

        {/* Right column - body */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.12 }}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <p
            className="font-sans"
            style={{
              fontWeight: 300,
              fontSize: 15,
              lineHeight: 1.8,
              color: 'var(--text-2)',
              margin: 0,
            }}
          >
            E.L.Y.S.I.U.M is built to sit beside your terminal as a reflective AI assistant. Rather than generating boilerplate blindly, it prompts systems-level reasoning to help you navigate architecture decisions.
          </p>
          <p
            className="font-sans"
            style={{
              fontWeight: 300,
              fontSize: 15,
              lineHeight: 1.8,
              color: 'var(--text-2)',
              margin: 0,
            }}
          >
            It runs as a modular registry: load custom plugins, switch inference engines dynamically, and coordinate local pipelines directly from a unified Python CLI named <span style={{ color: 'var(--text-1)', fontFamily: '"JetBrains Mono", monospace', fontSize: 13 }}>romeo</span>.
          </p>
          <p
            className="font-sans"
            style={{
              fontWeight: 300,
              fontSize: 15,
              lineHeight: 1.8,
              color: 'var(--text-2)',
              margin: 0,
            }}
          >
            By documenting mental blockages, daily structures, and engineering milestones, it creates a private local journal that logs your growth alongside the systems you build.
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          section > div {
            flex-direction: column !important;
            gap: 48px !important;
          }
        }
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
