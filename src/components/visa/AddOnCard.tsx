import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import InfoPopover from './InfoPopover';

export interface AddOnItem {
  name: string;
  processingTime: string;
  validityNote: string;
  price: number;
  recommended?: boolean;
}

interface AddOnCardProps {
  addOn: AddOnItem;
  selected: boolean;
  onToggle: () => void;
}

export default function AddOnCard({ addOn, selected, onToggle }: AddOnCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onClick={onToggle}
      className="cursor-pointer rounded-3xl overflow-hidden border-2 shadow-sm hover:shadow-lg transition-shadow duration-300"
      style={{ borderColor: selected ? '#f97316' : '#fb923c' }}
    >
      {addOn.recommended && (
        <div
          className="text-center text-white text-xs font-black tracking-wide py-2 flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(to right, #f97316, #fb923c)' }}
        >
          <Sparkles size={13} />
          RECOMMENDED FOR YOUR TRAVEL
          <Sparkles size={13} />
        </div>
      )}
      <div className="p-6 bg-white">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h4 className="font-black text-gray-900 text-base">{addOn.name}</h4>
          <span
            className="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5"
            style={{ borderColor: selected ? '#f97316' : '#d1d5db' }}
          >
            {selected && <span className="w-3 h-3 rounded-full" style={{ background: '#f97316' }} />}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm mb-4">
          <div className="flex items-center">
            <span className="text-gray-400">Processing time: </span>
            <span className="font-bold text-blue-600 ml-1">{addOn.processingTime}</span>
            <InfoPopover text="Time taken to process this add-on once your visa is issued." />
          </div>
          <div>
            <span className="text-gray-400">Visa validity: </span>
            <span className="font-bold text-gray-800">{addOn.validityNote}</span>
          </div>
        </div>

        <div className="h-px bg-gray-100 mb-4" />

        <div className="flex items-center text-2xl font-black text-gray-900">
          ₹{addOn.price.toLocaleString('en-IN')}
          <InfoPopover text={`${addOn.name} fee, charged per applicant.`} />
        </div>
      </div>
    </motion.div>
  );
}
