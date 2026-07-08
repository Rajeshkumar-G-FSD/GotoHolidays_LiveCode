import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import TimelineStep, { type TimelineStepData } from './TimelineStep';

interface VisaTimelineProps {
  steps: TimelineStepData[];
  icons: ReactNode[];
  startDate: string;
  arriveDate: string;
}

export default function VisaTimeline({ steps, icons, startDate, arriveDate }: VisaTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.4'],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div>
      {/* Date timeline */}
      <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
        <span className="text-sm font-bold px-5 py-2 rounded-full" style={{ background: '#dcfce7', color: '#15803d' }}>
          Start: {startDate}
        </span>
        <ArrowRight size={16} className="text-gray-400" />
        <span className="text-sm font-bold px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700">
          Visa Arrived by: {arriveDate}
        </span>
      </div>

      <div ref={containerRef} className="max-w-2xl mx-auto flex gap-5">
        {/* Vertical icon bar with scroll-driven fill */}
        <div className="flex flex-col items-center w-14 shrink-0">
          <div
            className="relative flex flex-col items-center justify-around py-6 px-3 gap-8 rounded-3xl flex-1 overflow-hidden"
            style={{ background: '#e2e8f0' }}
          >
            <motion.div
              className="absolute left-0 right-0 bottom-0"
              style={{ height: fillHeight, background: 'linear-gradient(to bottom, #4f46e5, #7c3aed)' }}
            />
            {icons.map((icon, i) => (
              <motion.div
                key={i}
                whileHover={{ rotate: 8, scale: 1.1 }}
                className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm"
                style={{ background: 'rgba(255,255,255,0.9)' }}
              >
                {icon}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Step cards */}
        <div className="flex flex-col gap-3 flex-1">
          {steps.map((step, i) => (
            <TimelineStep key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
