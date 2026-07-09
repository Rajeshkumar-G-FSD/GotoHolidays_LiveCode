import { motion } from 'motion/react';
import AnimatedCounter from './AnimatedCounter';

export interface VisaPlanBreakdown {
  visaFee: number;
  vfsFee?: number;
  dependentFee?: number;
  serviceFee: number;
  gstPercent: number;
}

export interface VisaPlan {
  name: string;
  type: string;
  stay: string;
  validity: string;
  days: number;
  price: number;
  fees: number;
  cat: string;
  breakdown?: VisaPlanBreakdown;
}

const rowIcons: Record<string, string> = {
  'Visa Type': '🪪',
  'Stay Duration': '📅',
  'Visa Validity': '🛡️',
  'Processing Time': '⏳',
};

interface VisaPlanCardProps {
  plan: VisaPlan;
  index: number;
  onStart: () => void;
  onViewDetails: () => void;
}

export default function VisaPlanCard({ plan, index, onStart, onViewDetails }: VisaPlanCardProps) {
  const rows = [
    { label: 'Visa Type', value: plan.type },
    { label: 'Stay Duration', value: plan.stay },
    { label: 'Visa Validity', value: plan.validity },
    { label: 'Processing Time', value: `${plan.days} Days` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-md hover:shadow-2xl transition-shadow duration-500"
    >
      {/* Card header */}
      <div className="flex">
        <div className="flex-1 px-6 py-4 flex items-center" style={{ background: '#990011' }}>
          <span className="font-black text-white text-base truncate">{plan.name} |</span>
        </div>
        <div className="px-6 py-4 flex items-center gap-2 shrink-0" style={{ background: '#1f2937', minWidth: 220 }}>
          <span className="text-white text-lg">🏅</span>
          <span className="text-white text-[13px] font-bold whitespace-nowrap">Get Your Visa in {plan.days} Days</span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col md:flex-row bg-white relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span style={{ fontSize: 260, opacity: 0.025, lineHeight: 1 }}>🌍</span>
        </div>

        <div className="flex-1 px-6 py-5 relative z-10">
          {rows.map(row => (
            <div key={row.label} className="flex items-center justify-between py-3 border-b border-dashed border-gray-200 last:border-0">
              <div className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                <span className="text-lg w-6 text-center">{rowIcons[row.label]}</span>
                {row.label}
              </div>
              <span className="font-bold text-sm" style={{ color: '#990011' }}>{row.value}</span>
            </div>
          ))}
        </div>

        <div className="hidden md:block w-px border-l border-dashed border-gray-200 my-4 relative z-10" />

        <div className="md:w-56 px-6 py-5 flex flex-col justify-between relative z-10">
          <div>
            <div className="text-3xl font-black text-gray-900">
              <AnimatedCounter value={plan.price} prefix="₹" />
              <span className="text-base font-semibold text-gray-400 ml-1">/adult</span>
            </div>
            <div className="text-xs text-gray-400 mt-1 mb-4">
              ₹{plan.fees.toLocaleString('en-IN')} (fees + tax)
            </div>
            <button
              onClick={onViewDetails}
              className="text-xs font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
              style={{ color: '#990011' }}
            >
              View Details
            </button>
          </div>
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.04, boxShadow: '0 10px 30px rgba(153,0,17,0.45)' }}
            whileTap={{ scale: 0.97 }}
            className="mt-5 w-full text-white font-bold text-sm py-3 rounded-full transition-colors duration-300"
            style={{ background: '#990011' }}
          >
            Start Application
          </motion.button>
        </div>
      </div>

      <div className="h-1.5" style={{ background: 'linear-gradient(to right, #990011, #dc2626)' }} />
    </motion.div>
  );
}
