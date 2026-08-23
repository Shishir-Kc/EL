import { useState } from 'react';
import { motion } from 'framer-motion';
import Status from './Status';
import Toast from './Toast';

const installCmd = 'curl -fsSL https://elysium.shishirkhatri.com.np/install.sh | sh';

export default function Hero() {
  const [toastVisible, setToastVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd).then(() => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    });
  };

  return (
    <>
      <Toast message="Copied to clipboard" visible={toastVisible} />
      <section
        style={{
          height: '100svh',
          overflow: 'hidden',
          background: 'var(--bg)',
          position: 'relative',
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(255,255,255,0.035) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        {/* Dot grid */}
        <div
          className="dot-grid"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Edge vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, transparent 30%, #030303 80%)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: '100vh',
            padding: '0 24px',
          }}
        >
          {/* Small label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              fontSize: 11,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              marginBottom: 36,
            }}
          >
            Modular AI Agent & CLI Toolkit
          </motion.p>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 300,
              fontSize: 'clamp(6.5rem, 13vw, 12rem)',
              letterSpacing: '0.06em',
              color: 'var(--text-1)',
              lineHeight: 0.92,
              margin: 0,
            }}
          >
            E.L.Y.S.I.U.M
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
              color: 'var(--text-2)',
              maxWidth: 520,
              margin: '28px auto 0 auto',
              lineHeight: 1.65,
              letterSpacing: '0.01em',
            }}
          >
            A modular, extensible Python-based personal AI agent and CLI tool for developers who think in systems.
          </motion.p>

          {/* Status Tags */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            style={{ marginTop: 36 }}
          >
            <Status />
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
              marginTop: 48,
            }}
          >
            {/* Install command */}
            <div
              onClick={handleCopy}
              title="Click to copy"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
                padding: '14px 24px',
                borderRadius: '4px',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 13,
                color: 'var(--text-2)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                transition: 'border-color 0.25s ease, background 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              <span style={{ color: 'var(--text-1)' }}>$</span>
              <span>{installCmd}</span>
            </div>

            <a
              href="https://github.com/Shishir-Kc/E.L.Y.S.I.U.M"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <button
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-2)',
                  color: 'var(--text-2)',
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  fontSize: 13,
                  letterSpacing: '0.08em',
                  padding: '14px 36px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'border-color 0.25s ease, color 0.25s ease, background 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--text-1)';
                  e.currentTarget.style.color = 'var(--text-1)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-2)';
                  e.currentTarget.style.color = 'var(--text-2)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                View Source
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
