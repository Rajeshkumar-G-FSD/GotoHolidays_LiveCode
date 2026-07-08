import { motion } from 'motion/react';

export interface TimelineStepData {
  title: string;
  desc: string;
}

interface TimelineStepProps {
  step: TimelineStepData;
  index: number;
}

export default function TimelineStep({ step, index }: TimelineStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      className="rounded-2xl px-6 py-5 shadow-sm border border-gray-100 bg-white transition-shadow duration-300 hover:shadow-lg"
    >
      <h4 className="font-black text-gray-900 text-base mb-1.5">{step.title}</h4>
      <p className="text-sm leading-relaxed text-gray-500">{step.desc}</p>
      <div className="w-8 h-0.5 rounded mt-3" style={{ background: '#2563eb' }} />
    </motion.div>
  );
}
