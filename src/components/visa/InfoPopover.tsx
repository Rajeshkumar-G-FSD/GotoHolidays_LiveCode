import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Info } from 'lucide-react';

export interface InfoPopoverRow {
  label: string;
  value: string;
}

interface InfoPopoverProps {
  title?: string;
  rows?: InfoPopoverRow[];
  note?: string;
  text?: string;
}

export default function InfoPopover({ title = 'Price Details', rows, note, text }: InfoPopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <span className="relative inline-flex" ref={ref}>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
        className="inline-flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors align-middle ml-1"
        aria-label={title}
      >
        <Info size={13} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 rounded-2xl p-4 shadow-2xl"
            style={{ background: '#1f2937' }}
          >
            {rows ? (
              <>
                <p className="text-white font-bold text-sm mb-3">{title}</p>
                <div className="space-y-2">
                  {rows.map(row => (
                    <div key={row.label} className="flex justify-between gap-3 text-xs">
                      <span className="text-gray-300">{row.label}</span>
                      <span className="text-white font-semibold whitespace-nowrap">{row.value}</span>
                    </div>
                  ))}
                </div>
                {note && <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">{note}</p>}
              </>
            ) : (
              <p className="text-xs text-gray-100 leading-relaxed">{text}</p>
            )}
            <span
              className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
              style={{ background: '#1f2937' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
