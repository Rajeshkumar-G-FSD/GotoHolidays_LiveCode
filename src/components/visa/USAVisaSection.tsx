import { forwardRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import SectionHeading from './SectionHeading';
import VisaPlanCard, { type VisaPlan } from './VisaPlanCard';
import RadioPlanCard from './RadioPlanCard';
import AddOnCard, { type AddOnItem } from './AddOnCard';
import VisaTimeline from './VisaTimeline';
import type { TimelineStepData } from './TimelineStep';
import DocumentGrid from './DocumentGrid';
import type { DocumentItem } from './DocumentCard';

interface USAVisaSectionProps {
  country: string;
  plans: VisaPlan[];
  steps: TimelineStepData[];
  stepIcons: ReactNode[];
  documents: DocumentItem[];
  startDate: string;
  arriveDate: string;
  onStartApplication: (planName?: string, addOnNames?: string[]) => void;
  onViewDetails: (planName: string) => void;
  useRadioSelector?: boolean;
  addOns?: AddOnItem[];
}

const USAVisaSection = forwardRef<HTMLDivElement, USAVisaSectionProps>(function USAVisaSection(
  { country, plans, steps, stepIcons, documents, startDate, arriveDate, onStartApplication, onViewDetails, useRadioSelector, addOns },
  ref
) {
  const cats = ['all', ...Array.from(new Set(plans.map(p => p.cat)))];
  const [filter, setFilter] = useState('all');
  const shownPlans = filter === 'all' ? plans : plans.filter(p => p.cat === filter);
  const [selectedPlanName, setSelectedPlanName] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const activePlanName = selectedPlanName ?? shownPlans[0]?.name;
  const activePlan = shownPlans.find(p => p.name === activePlanName);
  const addOnsTotal = (addOns ?? []).filter(a => selectedAddOns.has(a.name)).reduce((sum, a) => sum + a.price, 0);
  const total = (activePlan?.price ?? 0) + addOnsTotal;

  return (
    <div ref={ref}>
      {/* ── Visa Plan ── */}
      <section className="py-16 px-6 md:px-16 lg:px-24 bg-white">
        <SectionHeading title="Select a Visa Plan That Suits You" />

        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className="relative px-8 py-2.5 rounded-full text-sm font-semibold capitalize transition-colors duration-300"
              style={
                filter === c
                  ? { background: '#990011', color: '#fff', boxShadow: '0 4px 14px rgba(153,0,17,0.35)' }
                  : { background: '#fff', color: '#64748b', border: '1.5px solid #e2e8f0' }
              }
            >
              {c === 'e-visa' ? 'E-Visa' : c}
            </button>
          ))}
        </div>

        {useRadioSelector ? (
          <div className="max-w-2xl mx-auto space-y-5">
            {shownPlans.map((plan, i) => (
              <RadioPlanCard
                key={plan.name}
                plan={plan}
                index={i}
                selected={plan.name === activePlanName}
                onSelect={() => setSelectedPlanName(plan.name)}
              />
            ))}
            {addOns?.map((addOn, i) => (
              <motion.div
                key={addOn.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (shownPlans.length + i) * 0.1, duration: 0.5, ease: 'easeOut' }}
              >
                <AddOnCard
                  addOn={addOn}
                  selected={selectedAddOns.has(addOn.name)}
                  onToggle={() => setSelectedAddOns(prev => {
                    const next = new Set(prev);
                    if (next.has(addOn.name)) next.delete(addOn.name); else next.add(addOn.name);
                    return next;
                  })}
                />
              </motion.div>
            ))}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 rounded-3xl p-6 border border-gray-100">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Total Amount</p>
                <p className="text-2xl font-black text-gray-900">₹{total.toLocaleString('en-IN')}</p>
              </div>
              <motion.button
                onClick={() => onStartApplication(activePlanName ?? undefined, Array.from(selectedAddOns))}
                whileHover={{ scale: 1.04, boxShadow: '0 10px 30px rgba(153,0,17,0.45)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto text-white font-bold text-sm px-10 py-3.5 rounded-full transition-colors duration-300"
                style={{ background: '#990011' }}
              >
                Start Application
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-5">
            {shownPlans.map((plan, i) => (
              <VisaPlanCard
                key={plan.name}
                plan={plan}
                index={i}
                onStart={() => onStartApplication(plan.name)}
                onViewDetails={() => onViewDetails(plan.name)}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-8 space-y-2">
          <p className="text-gray-400 text-sm">📌 More Options: Business Visa, Group Travel, Long-Term Stay</p>
        </div>
      </section>

      {/* ── 4 Easy Steps ── */}
      <section className="py-16 px-6 md:px-16 lg:px-24" style={{ background: '#eef2ff' }}>
        <SectionHeading
          title={`Get Your ${country} Visa in 4 Easy Steps`}
          subtitle={
            <>
              Our streamlined process makes getting your <span className="font-bold" style={{ color: '#2563eb' }}>{country}</span> visa quick and simple
            </>
          }
        />
        <VisaTimeline steps={steps} icons={stepIcons} startDate={startDate} arriveDate={arriveDate} />
      </section>

      {/* ── Requirements ── */}
      <section className="py-16 px-6 md:px-16 lg:px-24 bg-white">
        <SectionHeading
          title={`Essential Requirements for a ${country} Visa`}
          subtitle="Make sure you have all the required documents before starting your application"
        />
        <DocumentGrid documents={documents} />
      </section>
    </div>
  );
});

export default USAVisaSection;
