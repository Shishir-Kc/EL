import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useInView from '../hooks/useInView';

const lines = [
  { text: '$ elysium log', color: 'text-1' },
  { text: '', color: '' },
  { text: '✦ E.L.Y.S.I.U.M daily check-in', color: 'accent' },
  { text: '──────────────────────────────', color: 'text-3' },
  { text: 'What did you build today?', color: 'text-2' },
  { text: '> Built the plugin registry for elysium_additionals', color: 'text-1' },
  { text: '', color: '' },
  { text: 'How are you feeling? (1-10): 7', color: 'text-2' },
  { text: '', color: '' },
  { text: '✦ Logged. Keep building.', color: 'accent' },
  { text: '', color: '' },
  { text: '$ elysium run --model gemini-2.0-flash', color: 'text-1' },
  { text: '✦ Model loaded: gemini-2.0-flash [OpenRouter]', color: 'accent' },
  { text: '✦ Ready.', color: 'accent' },
];

const colorMap = {
  'text-1': 'var(--text-1)',
  'text-2': 'var(--text-2)',
  'text-3': 'var(--text-3)',
  'accent': 'var(--accent)',
  '': 'transparent',
};

export default function Terminal() {
  const [ref, isInView] = useInView();
  const started = useRef(false);

  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineText, setCurrentLineText] = useState('');
  const [currentLineColor, setCurrentLineColor] = useState('text-2');
  const [done, setDone] = useState(false);

  const lineIndex = useRef(0);
  const charIndex = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    setCurrentLineColor(lines[0].color);

    intervalRef.current = setInterval(() => {
      const li = lineIndex.current;
      if (li >= lines.length) {
        clearInterval(intervalRef.current);
        setCurrentLineText('');
        setDone(true);
        return;
      }

      const currentLine = lines[li];

      if (currentLine.text === '') {
        setDisplayedLines(prev => [...prev, { text: '', color: currentLine.color }]);
        setCurrentLineText('');
        lineIndex.current += 1;
        if (lineIndex.current < lines.length) {
          setCurrentLineColor(lines[lineIndex.current].color);
        }
        return;
      }

      const ci = charIndex.current;

      if (ci < currentLine.text.length) {
        charIndex.current += 1;
        setCurrentLineText(currentLine.text.slice(0, ci + 1));
      } else {
        setDisplayedLines(prev => [...prev, { text: currentLine.text, color: currentLine.color }]);
        setCurrentLineText('');
        charIndex.current = 0;
        lineIndex.current += 1;
        if (lineIndex.current < lines.length) {
          setCurrentLineColor(lines[lineIndex.current].color);
        }
      }
    }, 28);

    return () => clearInterval(intervalRef.current);
  }, [isInView]);

  return (
    <section
      style={{
        width: '100%',
        background: 'var(--bg-2)',
        padding: '140px 0',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 72 }}>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 400,
            fontSize: 11,
            letterSpacing: '0.35em',
            color: 'var(--text-3)',
            textTransform: 'uppercase',
            marginBottom: 14,
          }}
        >
          Live Preview
        </p>
        <h2
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 300,
            fontSize: 'clamp(2.8rem, 5vw, 4rem)',
            color: 'var(--text-1)',
            lineHeight: 1,
            margin: 0,
          }}
        >
          See it run.
        </h2>
      </div>

      {/* Terminal window */}
      <div
        ref={ref}
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: '0 40px',
        }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            border: '1px solid var(--border-2)',
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
          }}
        >
          {/* Title bar */}
          <div
            style={{
              background: '#0f0f0f',
              height: 44,
              padding: '0 16px',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#555555' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#555555' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#555555' }} />
            </div>
            <span
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 400,
                fontSize: 11,
                color: 'var(--text-3)',
                letterSpacing: '0.05em',
              }}
            >
              elysium — bash
            </span>
          </div>

          {/* Terminal body */}
          <div
            style={{
              background: '#060606',
              padding: '28px 36px',
              minHeight: 340,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 13,
              lineHeight: 2,
              color: 'var(--text-2)',
            }}
          >
            {displayedLines.map((line, i) => (
              <div key={i} style={{ color: colorMap[line.color] || 'var(--text-2)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {line.text === '' ? '\u00A0' : line.text}
              </div>
            ))}

            {!done && currentLineText !== '' && (
              <div style={{ color: colorMap[currentLineColor] || 'var(--text-2)' }}>
                {currentLineText}
              </div>
            )}

            {done && (
              <div>
                <span
                  style={{
                    color: 'var(--accent)',
                    animation: 'blink 1.1s ease-in-out infinite',
                    fontSize: 14,
                  }}
                >
                  █
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
