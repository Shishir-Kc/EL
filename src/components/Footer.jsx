/* src/components/Footer.jsx — Modern grayscale editorial landing page component */
import { motion } from 'framer-motion';
import useInView from '../hooks/useInView';

export default function Footer() {
  const [ref, isInView] = useInView();

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        paddingTop: 100,
        paddingBottom: 60,
        paddingLeft: 40,
        paddingRight: 40,
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <h2
          className="font-serif"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            color: 'var(--text-1)',
            letterSpacing: '0.08em',
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          E.L.Y.S.I.U.M
        </h2>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 300,
            fontSize: 14,
            color: 'var(--text-2)',
            letterSpacing: '0.06em',
            marginBottom: 40,
          }}
        >
          Modular AI Agent & CLI Toolkit · Python Native · Open Source
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <a
            href="https://github.com/Shishir-Kc/E.L.Y.S.I.U.M"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: '1px solid var(--border-2)',
              color: 'var(--text-2)',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              fontSize: 12,
              letterSpacing: '0.08em',
              padding: '10px 22px',
              borderRadius: 2,
              textDecoration: 'none',
              transition: 'border-color 0.25s, color 0.25s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--text-1)';
              e.currentTarget.style.color = 'var(--text-1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-2)';
              e.currentTarget.style.color = 'var(--text-2)';
            }}
          >
            GitHub
          </a>
          <a
            href="#"
            style={{
              border: '1px solid var(--border-2)',
              color: 'var(--text-2)',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              fontSize: 12,
              letterSpacing: '0.08em',
              padding: '10px 22px',
              borderRadius: 2,
              textDecoration: 'none',
              transition: 'border-color 0.25s, color 0.25s',
              display: 'inline-block',
              opacity: 0.5,
              pointerEvents: 'none',
            }}
          >
            Documentation
          </a>
        </div>

        <p
          style={{
            marginTop: 60,
            fontSize: 11,
            color: 'var(--text-3)',
            letterSpacing: '0.08em',
            fontFamily: '"JetBrains Mono", monospace',
          }}
        >
          MIT License · 2026 · Built with care
        </p>
      </div>
    </motion.footer>
  );
}
