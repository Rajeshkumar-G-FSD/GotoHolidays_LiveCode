import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

export interface DocumentItem {
  label: string;
  icon: ReactNode;
  desc: string;
}

interface DocumentCardProps {
  doc: DocumentItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export default function DocumentCard({ doc, index, isOpen, onToggle }: DocumentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 4) * 0.07, duration: 0.45, ease: 'easeOut' }}
    >
      <motion.button
        onClick={onToggle}
        whileHover={{ y: -3 }}
        className={`w-full flex items-start justify-between gap-2 p-4 bg-[#f0f4ff] border rounded-2xl transition-all duration-300 text-left hover:shadow-md min-h-[76px] ${
          isOpen ? 'border-blue-400 shadow-md bg-white' : 'border-transparent hover:border-blue-300'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ background: '#2563eb' }}>
            {doc.icon}
          </span>
          <span className="text-sm font-bold text-gray-800 leading-tight">{doc.label}</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="px-4 pt-2.5 pb-3.5 text-xs text-gray-500 leading-relaxed bg-gray-50 border border-t-0 border-blue-200 rounded-b-2xl -mt-1 overflow-hidden"
          >
            {doc.desc}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
