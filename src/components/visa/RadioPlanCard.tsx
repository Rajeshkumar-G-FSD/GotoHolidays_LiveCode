import { motion } from 'motion/react';
import InfoPopover from './InfoPopover';
import type { VisaPlan } from './VisaPlanCard';

interface RadioPlanCardProps {
  plan: VisaPlan;
  index: number;
  selected: boolean;
  onSelect: () => void;
}

export default function RadioPlanCard({ plan, index, selected, onSelect }: RadioPlanCardProps) {
  const b = plan.breakdown;
  const rows = b
    ? [
        { label: 'Visa Fee', value: `₹${b.visaFee.toLocaleString('en-IN')}` },
        ...(b.vfsFee !== undefined ? [{ label: 'VFS Fee / pax', value: `₹${b.vfsFee.toLocaleString('en-IN')}` }] : []),
        ...(b.dependentFee ? [{ label: 'Visa fee for Dependent (if added)', value: `₹${b.dependentFee.toLocaleString('en-IN')}` }] : []),
        { label: 'Service Fee / pax', value: `₹${b.serviceFee.toLocaleString('en-IN')}` },
        { label: `GST (${b.gstPercent}%)`, value: `₹${Math.round(b.serviceFee * b.gstPercent / 100).toLocaleString('en-IN')}` },
      ]
    : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      onClick={onSelect}
      className="cursor-pointer rounded-3xl p-6 bg-white border-2 transition-colors duration-300 shadow-sm hover:shadow-lg"
      style={{ borderColor: selected ? '#990011' : '#e5e7eb' }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <h4 className="font-black text-gray-900 text-base leading-snug">{plan.name}</h4>
        <span
          className="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5"
          style={{ borderColor: selected ? '#990011' : '#d1d5db' }}
        >
          {selected && <span className="w-3 h-3 rounded-full" style={{ background: '#990011' }} />}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm mb-4">
        <div>
          <span className="text-gray-400">Visa validity: </span>
          <span className="font-bold text-gray-800">{plan.validity}</span>
        </div>
        <div>
          <span className="text-gray-400">Processing time: </span>
          <span className="font-bold text-gray-800">{plan.days} working days</span>
        </div>
      </div>

      <div className="h-px bg-gray-100 mb-4" />

      <div className="flex items-center text-2xl font-black text-gray-900">
        ₹{plan.price.toLocaleString('en-IN')}
        {rows && <InfoPopover rows={rows} note="* Add-on prices are not inclusive e.g. courier, etc." />}
      </div>
    </motion.div>
  );
}
