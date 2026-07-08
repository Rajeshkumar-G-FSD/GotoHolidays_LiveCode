import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingOverlayProps {
  country: string;
  onComplete: () => void;
}

const CHAR_MS = 16;
const LINE_HOLD_MS = 200;

export default function LoadingOverlay({ country, onComplete }: LoadingOverlayProps) {
  const lines = [
    `Preparing ${country} Visa Guide...`,
    'Loading Visa Plans...',
    'Fetching Requirements...',
    'Almost Ready...',
  ];

  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const totalMs = lines.reduce((sum, l) => sum + l.length * CHAR_MS + LINE_HOLD_MS, 0);
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const pct = Math.min(((now - start) / totalMs) * 100, 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      const exitTimer = setTimeout(() => setExiting(true), LINE_HOLD_MS);
      return () => clearTimeout(exitTimer);
    }
    const line = lines[lineIndex];
    let charCount = 0;
    const typeTimer = setInterval(() => {
      charCount += 1;
      setTyped(line.slice(0, charCount));
      if (charCount >= line.length) {
        clearInterval(typeTimer);
        setTimeout(() => {
          setLineIndex(i => i + 1);
          setTyped('');
        }, LINE_HOLD_MS);
      }
    }, CHAR_MS);
    return () => clearInterval(typeTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIndex]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(onComplete, 380);
    return () => clearTimeout(t);
  }, [exiting, onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.38, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center px-6"
          style={{
            background: 'linear-gradient(135deg, #0b1220 0%, #1e2a5e 45%, #2563eb 100%)',
          }}
        >
          {/* floating decorative blur shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ y: [0, -24, 0], x: [0, 16, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-[15%] w-64 h-64 rounded-full blur-3xl"
              style={{ background: 'rgba(99,102,241,0.35)' }}
            />
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, -18, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-1/4 right-[15%] w-72 h-72 rounded-full blur-3xl"
              style={{ background: 'rgba(37,99,235,0.3)' }}
            />
          </div>

          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md"
          >
            <motion.span
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-6xl"
            >
              🛂
            </motion.span>

            <div className="h-8 flex items-center justify-center">
              <p className="text-white font-bold text-base md:text-lg tracking-tight text-center">
                {typed}
                <span className="inline-block w-0.5 h-5 ml-0.5 bg-white/80 align-middle animate-pulse" />
              </p>
            </div>

            <div className="w-full">
              <div className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #60a5fa, #ffffff)',
                    transition: 'width 80ms linear',
                  }}
                />
              </div>
              <p className="text-white/50 text-[11px] font-bold tracking-widest uppercase mt-3 text-center">
                {Math.round(progress)}% Complete
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
