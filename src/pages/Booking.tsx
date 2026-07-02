import { motion } from 'motion/react';
import { Search, Check, Info } from 'lucide-react';
import { useState } from 'react';

const destinations = [
  { id: '1', title: 'Maldives', desc: 'Private Atoll Reserve', price: '12,000', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA-gxbFV0RepPZE5XNlwhii0esRomnJ5gWtBQYTBmufHAoFxS7FFmFPig1aDRtM7BSj-D1dHZJWsowtgRWhKUT3FFTS5s8xR6TyuHMT8_WmZ9Eqx4qaY6qDUlUeY6y4KIii8z305KAGpf27GKk6FN5aLciHPhQRdJDEtf2kWYOraXNdC1UATjEOdWxtkHoXgdSZ_zDox3L0_N4aByFppWId4Aisr7c3JWsOCJlzA3ZhGVaB9uNt-P8ir83e03aPNDGAvzJQ-Hv3N_c' },
  { id: '2', title: 'Swiss Alps', desc: 'Zermatt Penthouse', price: '8,500', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmufgSw8uBE5F5Rx4eIeMW_Sol3IhmkF3bKhffLr8_xIt5WmnXJo_1SeJ7SfqMVQiWJH1EPWP2ryVg4kf9-HQuHZX_y1g9M8BUyckkly2jyzugcO04QaH0zHPXOV59cydGxIkbh7HrecxEch6JDD_dIIAiuVB9ZPJe1tTdyG_L1Sptk54eHw4N0uMVbPeaPEL8COlghT73Dp5_ct76S69b61h7p1rCo2qvog6nHlLb3GNR0ntsz6nUKCmUbu8RA8vriBoolKZW9eoY' },
  { id: '3', title: 'Amalfi Coast', desc: 'Villa TreVille Exclusive', price: '15,000', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1X3-vNn39Gz5k8UvK0w_Xp-61d09r1d82v10_Z6L2_5-00w_r-C_63d09r1d82v10_Z6L2_5-00w_r-C_63d09r1d82v10_Z6L2_5-00w_r-C' },
  { id: '4', title: 'Tokyo', desc: 'Aman Sky Suite', price: '6,200', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1X3-vNn39Gz5k8UvK0w_Xp-61d09r1d82v10_Z6L2_5-00w_r-C_63d09r1d82v10_Z6L2_5-00w_r-C_63d09r1d82v10_Z6L2_5-00w_r-C' },
].map(d => ({ ...d, price: d.price || '5,000', img: d.img || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957' }));

export default function Booking() {
  const [selectedId, setSelectedId] = useState<string | null>('2');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = () => {
    if (step < 3) {
      setIsSubmitting(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsSubmitting(false);
      }, 800);
    }
  };

  const selectedDestination = destinations.find(d => d.id === selectedId);

  return (
    <div className="pt-24 min-h-screen">
      <header className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <img 
          src={selectedDestination?.img || destinations[0].img} 
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity blur-[2px] transition-all duration-1000"
          alt="Booking"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface-dim to-transparent" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-6xl text-on-surface mb-4">Curate Your Journey</h1>
          <p className="font-sans text-on-surface-variant text-lg">Experience the pinnacle of discreet, exclusive travel.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-20 -mt-24 relative z-20 pb-24">
        <div className="glass-panel rounded-3xl p-10 md:p-16 shadow-2xl overflow-hidden relative min-h-[600px]">
          {/* Progress */}
          <div className="flex justify-between items-center mb-16 relative max-w-xl mx-auto">
            <div className="absolute top-[20px] left-0 w-full h-px bg-black/5" />
            <motion.div 
              animate={{ width: `${(step - 1) * 50}%` }}
              className="absolute top-[20px] left-0 h-[2px] bg-primary transition-all duration-500" 
            />
            
            {[1, 2, 3].map((num) => (
              <div key={num} className="relative z-10 flex flex-col items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${step >= num ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'glass-panel text-on-surface-variant'}`}>
                  {step > num ? <Check size={16} /> : num}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= num ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {num === 1 ? 'Destination' : num === 2 ? 'Details' : 'Confirm'}
                </span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-10 gap-16"
            >
              <div className="lg:col-span-3 space-y-12">
                <div className="space-y-6">
                  <h2 className="font-display text-4xl">Where to?</h2>
                  <div className="relative">
                    <Search size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                    <input 
                      type="text" 
                      placeholder="Search destinations..." 
                      className="w-full bg-transparent border-b border-black/10 pb-3 pl-8 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Experiences</h4>
                  <div className="flex flex-wrap gap-3">
                    {['Private Villas', 'Yacht Charters', 'Alpine Retreats'].map((tag, i) => (
                      <button key={tag} className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${i === 0 ? 'bg-primary/10 text-primary' : 'glass-panel text-on-surface hover:bg-black/5'}`}>{tag}</button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 pt-12 border-t border-black/5">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Dates</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-panel p-4 rounded-xl border-black/5">
                      <span className="block text-[8px] font-bold uppercase text-on-surface-variant mb-1">Check-in</span>
                      <span className="block text-xs text-on-surface">Oct 15, 2024</span>
                    </div>
                    <div className="glass-panel p-4 rounded-xl border-black/5">
                      <span className="block text-[8px] font-bold uppercase text-on-surface-variant mb-1">Check-out</span>
                      <span className="block text-xs text-on-surface">Oct 22, 2024</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                {destinations.map((opt) => (
                  <div 
                    key={opt.id} 
                    onClick={() => setSelectedId(opt.id)}
                    className={`group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer border transition-all duration-500 ${selectedId === opt.id ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img src={opt.img} alt={opt.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-linear-to-t from-surface-dim via-transparent to-transparent" />
                    {selectedId === opt.id && (
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg">
                        <Check size={16} />
                      </div>
                    )}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className={`glass-panel p-5 rounded-2xl border-black/10 flex justify-between items-end backdrop-blur-3xl transition-all group-hover:border-primary/30 ${selectedId === opt.id ? 'border-primary/30 bg-primary/5' : ''}`}>
                        <div>
                          <span className="text-[8px] font-bold uppercase text-primary mb-1 block">AVAILABLE</span>
                          <h4 className="font-display text-xl text-on-surface">{opt.title}</h4>
                          <p className="text-on-surface-variant text-[10px]">{opt.desc}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] text-on-surface-variant block uppercase font-bold">FROM</span>
                          <span className="text-primary font-display text-lg">${opt.price}<span className="text-[10px] text-on-surface-variant ml-1">/nt</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              <div className="flex gap-12 items-start">
                <div className="w-1/3 h-48 rounded-2xl overflow-hidden glass-panel border-black/10 shrink-0">
                  <img src={selectedDestination?.img} className="w-full h-full object-cover" alt="Selected" />
                </div>
                <div className="space-y-4">
                  <h2 className="font-display text-5xl text-on-surface">{selectedDestination?.title}</h2>
                  <p className="text-on-surface-variant font-sans">You have selected the {selectedDestination?.desc}. This package includes private chauffeur transfers, 24/7 concierge, and exclusive access to off-market amenities.</p>
                  <div className="flex gap-8">
                    <div>
                      <span className="block text-[8px] font-bold uppercase tracking-widest text-primary">PRICE</span>
                      <p className="font-display text-3xl text-on-surface">${selectedDestination?.price}<span className="text-sm text-on-surface-variant font-sans">/night</span></p>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold uppercase tracking-widest text-primary">DURATION</span>
                      <p className="font-display text-3xl text-on-surface">7 Days</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Travelers</h4>
                  <div className="flex items-center justify-between glass-panel p-4 rounded-xl">
                    <span className="text-on-surface">Adults</span>
                    <div className="flex items-center gap-4">
                      <button className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">-</button>
                      <span>2</span>
                      <button className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">+</button>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Special Requests</h4>
                  <textarea className="w-full bg-black/5 border border-black/10 rounded-xl p-4 text-sm focus:border-primary outline-none h-24" placeholder="Dietary requirements, accessibility, etc." />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 space-y-8"
            >
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-primary border border-primary/30">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}>
                  <Check size={48} />
                </motion.div>
              </div>
              <div className="space-y-4">
                <h2 className="font-display text-5xl text-on-surface">Reservation Requested</h2>
                <p className="text-on-surface-variant font-sans max-w-lg mx-auto leading-relaxed">Your request for {selectedDestination?.title} has been logged. A private concierge will contact you within 15 minutes to finalize the dossier.</p>
              </div>
              <div className="flex gap-4 justify-center">
                <button onClick={() => setStep(1)} className="px-8 py-3 rounded-xl glass-panel text-xs font-bold uppercase tracking-widest">New Booking</button>
                <div className="flex items-center gap-2 px-8 py-3 rounded-xl border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                  <Info size={14} /> STATUS: PENDING
                </div>
              </div>
            </motion.div>
          )}

          {isSubmitting && (
            <div className="absolute inset-0 bg-surface-dim/50 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {step < 3 && (
          <div className="mt-12 flex justify-end gap-6">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="px-10 py-4 rounded-xl glass-panel text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                Back
              </button>
            )}
            <button 
              onClick={handleContinue}
              disabled={!selectedId}
              className="px-10 py-4 rounded-xl bg-primary text-on-primary text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
            >
              {step === 1 ? 'Continue to Details' : 'Request Reservation'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
