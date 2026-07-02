import { motion } from 'motion/react';

const stats = [
  { label: 'Years Experience', value: '15+' },
  { label: 'Happy Customers', value: '50k+' },
  { label: 'Countries Covered', value: '100+' },
  { label: 'Visa Success Rate', value: '99%' },
];

export default function About() {
  return (
    <div className="pt-24 min-h-screen">
      <section className="relative px-6 md:px-20 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-row-reverse">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-black/5 border border-black/10 text-primary text-xs font-bold tracking-widest uppercase">
              The GooToHolidays Legacy
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-on-surface leading-tight">
              Curating The <br />
              <span className="text-primary italic">Extraordinary</span>
            </h1>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed max-w-xl">
              Since 2008, GooToHolidays has been the invisible hand behind the world's most exclusive travel experiences. We don't just book trips; we architect memories for the discerning few who demand nothing less than perfection.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-[600px] rounded-3xl overflow-hidden group shadow-2xl"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLtfYQAqxLBiWaE71Pu_bTlpixIEQ6Y6Ir-qib6DvuPkhd3jDW6arPH5IF-0p-nhoc6rmttH1ibm_PpXccBCkSqaLMplLxbk2TfdA_JzEG2XIeM-HQBvNY-ObuuBDynp8iHQBobA4zcA0ZRDOYtZsoBGmAwTiLUfTvdJfymbDm0enaUULQdV-9d82rkSM4vr28PoJC9cbGWqRuhPDayMHYFUZK8d0TmM9Ci6jCJKdY1tpTa-yTE12A2kKWw8-FKvcaQ-D8Q6CnRdsS" 
              alt="Luxury Yacht Fjord" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-t from-surface-dim/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-2xl">
              <h4 className="text-primary font-bold text-xs tracking-widest mb-2 uppercase">Beyond Boundaries</h4>
              <p className="text-on-surface text-sm">Pioneering bespoke itineraries across seven continents with absolute discretion.</p>
            </div>
          </motion.div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-black/5 bg-surface-container-lowest/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <h3 className="font-display text-5xl md:text-6xl text-primary mb-2 group-hover:scale-110 transition-transform duration-500">{stat.value}</h3>
                <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
