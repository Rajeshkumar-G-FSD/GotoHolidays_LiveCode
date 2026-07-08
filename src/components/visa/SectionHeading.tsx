import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'motion/react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

export default function SectionHeading({ eyebrow, title, subtitle, className = '' }: SectionHeadingProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className={`text-center mb-10 ${className}`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="inline-block text-[11px] font-black tracking-[0.3em] uppercase mb-3 px-4 py-1.5 rounded-full"
          style={{ background: '#eef2ff', color: '#2563eb' }}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
        className="text-2xl md:text-3xl font-black text-gray-900"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-gray-500 text-sm mt-2 max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
