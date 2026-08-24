import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SESSION = [
  {
    cmd: 'romeo version',
    out: ['elysium 0.0.8'],
  },
  {
    cmd: 'romeo version-name',
    out: ['omega-cooper'],
  },
  {
    cmd: 'romeo status',
    out: ['development — not stable yet'],
  },
  {
    cmd: 'romeo ram-info',
    out: [
      'Total RAM : 31.28 GB',
      'Used      : 12.44 GB',
      'Free      : 18.84 GB',
      'Swap      : 8.00 GB',
    ],
  },
  {
    cmd: 'romeo cache-info',
    out: [
      '.cache total : 14.20 GB',
      '',
      '4.21 GB   mozilla/firefox',
      '2.87 GB   google/chrome',
      '1.93 GB   huggingface',
      '1.10 GB   pip',
      '0.86 GB   uv',
    ],
  },
  {
    cmd: 'romeo check-version',
    out: ['No update available'],
  },
];

const TYPE_MS = 55;
const LINE_MS = 260;
const CMD_PAUSE = 900;
const LOOP_PAUSE = 3200;

export default function Terminal() {
  const [entryIndex, setEntryIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [linesShown, setLinesShown] = useState(0);
  const bodyRef = useRef(null);

  const entry = SESSION[entryIndex];
  const doneTyping = typed >= entry.cmd.length;
  const doneOutput = linesShown >= entry.out.length;

  useEffect(() => {
    if (!doneTyping) {
      const t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      return () => clearTimeout(t);
    }
    if (!doneOutput) {
      const t = setTimeout(() => setLinesShown((n) => n + 1), LINE_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setTyped(0);
      setLinesShown(0);
      setEntryIndex((i) => (i + 1) % SESSION.length);
    }, doneTyping && doneOutput ? (entryIndex === SESSION.length - 1 ? LOOP_PAUSE : CMD_PAUSE) : 0);
    return () => clearTimeout(t);
  }, [typed, linesShown, entryIndex, doneTyping, doneOutput]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [typed, linesShown]);

  return (
    <section id="terminal" className="border-y border-line-1 bg-surface-1 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid items-center gap-14 lg:grid-cols-[1fr_1.2fr]"
        >
          <div>
            <p className="kicker mb-6 text-ink-3">Command Line</p>
            <h2 className="display text-4xl text-white md:text-5xl">
              Talk to the<br />
              <span className="italic text-ink-2">harness directly.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed font-light text-ink-2">
              The <span className="font-mono text-white">romeo</span> CLI speaks eleven
              subcommands — version intel, live RAM stats, per-application cache audits,
              and full autonomous updates. No dashboard required.
            </p>
          </div>

          <div className="overflow-hidden border border-line-2 bg-bg shadow-[0_0_80px_rgba(255,255,255,0.04)]">
            <div className="flex items-center justify-between border-b border-line-1 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full border border-line-3" />
                <span className="h-2.5 w-2.5 rounded-full border border-line-3" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
              </div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-ink-4">
                romeo — elysium@home
              </p>
            </div>

            <div ref={bodyRef} className="h-80 overflow-y-auto p-5 font-mono text-[13px] leading-7">
              {SESSION.slice(0, entryIndex).map((e) => (
                <SessionBlock key={e.cmd} cmd={e.cmd} out={e.out} all />
              ))}
              <SessionBlock
                key={entry.cmd}
                cmd={entry.cmd}
                out={entry.out}
                typed={doneTyping ? undefined : typed}
                lines={linesShown}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SessionBlock({ cmd, out, typed, lines = out.length, all }) {
  const showPrompt = typed !== undefined || all;
  return (
    <div className={all ? '' : 'mb-2'}>
      {showPrompt && (
        <p className="text-white">
          <span className="mr-2 text-ink-3">:~$</span>
          {typed !== undefined ? cmd.slice(0, typed) : cmd}
          {typed !== undefined && !all && <span className="cursor-blink">▌</span>}
        </p>
      )}
      {out.slice(0, lines).map((line, i) => (
        <p key={i} className="whitespace-pre text-ink-2">{line || '\u00A0'}</p>
      ))}
    </div>
  );
}
