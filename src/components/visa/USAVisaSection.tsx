import { forwardRef, useState, type ReactNode } from 'react';
import SectionHeading from './SectionHeading';
import VisaPlanCard, { type VisaPlan } from './VisaPlanCard';
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
  onStartApplication: (planName?: string) => void;
  onViewDetails: (planName: string) => void;
}

const USAVisaSection = forwardRef<HTMLDivElement, USAVisaSectionProps>(function USAVisaSection(
  { country, plans, steps, stepIcons, documents, startDate, arriveDate, onStartApplication, onViewDetails },
  ref
) {
  const cats = ['all', ...Array.from(new Set(plans.map(p => p.cat)))];
  const [filter, setFilter] = useState('all');
  const shownPlans = filter === 'all' ? plans : plans.filter(p => p.cat === filter);

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
