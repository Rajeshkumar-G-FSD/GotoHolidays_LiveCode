import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ClipboardCheck, FileSignature, Mail, MapPin, Phone, RefreshCw, UserCheck } from 'lucide-react';
import VisaSearchBar from '../components/VisaSearchBar';

const visaDestinations = [
  { name: 'Maldives', slug: 'maldives', desc: 'Paradise Island Getaway.', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop', large: true, flag: '🇲🇻' },
  { name: 'Dubai', slug: 'dubai', desc: 'City of Gold & Luxury.', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop', flag: '🇦🇪' },
  { name: 'Thailand', slug: 'thailand', desc: 'Land of Smiles.', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop', flag: '🇹🇭' },
  { name: 'Malaysia', slug: 'malaysia', desc: 'Truly Asia.', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop', flag: '🇲🇾' },
  { name: 'Andaman', slug: 'andaman', desc: 'Emerald Islands.', image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=800&auto=format&fit=crop', flag: '🇮🇳' },
  { name: 'Singapore', slug: 'singapore', desc: 'E-Visa Experts.', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop', flag: '🇸🇬' },
  { name: 'Lakshadweep', slug: 'lakshadweep', desc: 'Coral Island Paradise.', image: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=800&auto=format&fit=crop', flag: '🇮🇳' },
  { name: 'Australia', slug: 'australia', desc: 'Land Down Under.', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&auto=format&fit=crop', flag: '🇦🇺' },
  { name: 'USA', slug: 'usa', desc: 'Land of Opportunities.', image: 'https://images.unsplash.com/photo-1508433957232-3107f5fd5995?w=800&auto=format&fit=crop', flag: '🇺🇸' },
  { name: 'UK', slug: 'uk', desc: 'Royal Kingdom.', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop', flag: '🇬🇧' },
  { name: 'Schengen', slug: 'schengen', desc: 'Explore All of Europe.', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format&fit=crop', flag: '🇪🇺' },
];

const supportedCountries = [
  { name: 'Maldives', flag: '🇲🇻' },
  { name: 'Dubai', flag: '🇦🇪' },
  { name: 'Thailand', flag: '🇹🇭' },
  { name: 'Malaysia', flag: '🇲🇾' },
  { name: 'Andaman', flag: '🇮🇳' },
  { name: 'Singapore', flag: '🇸🇬', slug: 'singapore' },
  { name: 'Lakshadweep', flag: '🇮🇳' },
];

const protocol = [
  { id: '01', title: 'Document Audit', desc: 'Rigorous review by specialists.', icon: <ClipboardCheck /> },
  { id: '02', title: 'Application', desc: 'Dedicated concierge drafting.', icon: <FileSignature /> },
  { id: '03', title: 'Processing', desc: 'Active diplomatic engagement.', icon: <RefreshCw /> },
  { id: '04', title: 'Approval', desc: 'Confirmed credential delivery.', icon: <UserCheck />, active: true },
];

export default function Visa() {
  const navigate = useNavigate();

  const handleApply = (dest: { name: string; flag: string; slug?: string }) => {
    if (dest.slug) {
      navigate(`/visa/${dest.slug}`);
    } else {
      navigate(`/visa-application?country=${encodeURIComponent(dest.name)}`);
    }
  };


  return (
    <div className="w-full">
      {/* Hero */}
      <header className="relative min-h-screen flex flex-col items-center justify-start pt-32 pb-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhiz0ny9QAVtO5G8O1xJRwjnkVxPBjPxgLoBi-a9Y2-agk_K_rKEVLJwjEY45sHUMH3Suh8s05DPukC5yDvu-UKEzHdNHwaE1J8S15LSNfTec-u2JN6m6rz_dK02dFPbqnE0b_jZyjNpPXYtuywe2sQtaLC6ubuDmWDjZyPHd1AWeLDactknG6WucfKY2NwRBjJmiTchcixO01nm7vIQgBf3ld5yzo-FIWv-VY44-jRDgMa1Kf9PpJqBoYPQTW0kgb-U_gVXycFG9Y" 
            className="w-full h-full object-cover fixed opacity-40 grayscale-[0.5]" 
            alt="Visas" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#FCF6F5]/80" />
        </div>
        <div className="relative z-10 w-full px-6">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full glass-panel text-xs font-bold tracking-widest text-primary mb-6">GLOBAL ENTRY CONCIERGE</span>
            <h1 className="font-display text-5xl md:text-8xl text-on-surface mb-8 tracking-tighter">Effortless Borders. <br /><span className="text-primary italic">Boundless Travel.</span></h1>
          </div>
          <VisaSearchBar onApply={(data) => {
            navigate(`/visa-application?country=${encodeURIComponent(data.country)}`);
          }} />
        </div>
      </header>

      {/* Grid */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <h2 className="font-display text-5xl mb-12">Prime Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {visaDestinations.map((dest, i) => (
            <motion.div 
              key={dest.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => handleApply(dest)}
              className={`relative rounded-3xl overflow-hidden min-h-[300px] group cursor-pointer ${dest.large ? 'md:col-span-2' : ''}`}
            >
              <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-linear-to-t from-surface-dim/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end">
                <div className="flex items-end gap-3">
                  <span className="text-4xl mb-1">{dest.flag}</span>
                  <div>
                    <h3 className="font-display text-2xl text-on-surface mb-1">{dest.name}</h3>
                    <p className="text-on-surface-variant text-sm font-sans">{dest.desc}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <button className="bg-primary text-on-primary px-6 py-2.5 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 invisible group-hover:visible shadow-xl shadow-primary/20">
                    Apply Now
                  </button>
                  {dest.large && (
                    <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                      <ArrowUpRight size={20} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative py-32 px-6 md:px-20 overflow-hidden bg-[#990011]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#990011] opacity-90" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-center text-white mb-28 tracking-tight">Our Elite <span className="text-white italic opacity-80 underline decoration-white/20 underline-offset-8">Protocol</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-[64px] left-[12%] right-[12%] h-[2px] bg-white/20" />
            
            {protocol.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center group">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 mb-10 border-4 ${step.active ? 'bg-black border-black text-white shadow-2xl shadow-black/40 scale-110' : 'bg-white border-white text-black shadow-xl'}`}>
                  <div className="scale-125">{step.icon}</div>
                </div>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/50 mb-4">PHASE {step.id}</span>
                <h4 className="font-display text-2xl text-white mb-3 text-center">{step.title}</h4>
                <p className="text-white/70 text-sm text-center leading-relaxed max-w-[220px] font-sans">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="bg-surface-dim py-32 px-6 md:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-4 block">Global Coverage</span>
              <h2 className="font-display text-5xl md:text-6xl text-on-surface leading-tight">Supported <br /><span className="text-primary italic">Nations</span></h2>
            </div>
            <p className="text-on-surface-variant font-sans max-w-xs text-sm leading-relaxed mb-4">
              Providing bespoke visa solutions and diplomatic liaison services across major global territories with unprecedented accuracy.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {supportedCountries.map((country, i) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.03 }}
                className="bg-surface-container-low border border-surface-container p-4 rounded-2xl flex items-center gap-4 hover:border-primary/40 hover:bg-surface-bright hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group cursor-default"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{country.flag}</span>
                <span className="text-[11px] font-bold tracking-wider text-on-surface-variant uppercase group-hover:text-primary transition-colors">{country.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="bg-[#000000] py-32 px-6 md:px-20 relative z-10 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            <div className="max-w-md">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-8 block">Contact Information</span>
              <h2 className="font-display text-5xl md:text-6xl mb-10 leading-tight tracking-tighter">Let's Discuss <br /><span className="text-primary italic">Your Journey</span></h2>
              <p className="text-white/50 font-sans text-sm leading-relaxed mb-10">
                Our elite concierge team is ready to facilitate your global passage. Reach out for customized strategic guidance.
              </p>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-all duration-300">
                  <Phone size={20} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-12 pt-4">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-2">Email Inquiries</h4>
                  <div className="flex flex-col gap-2">
                    <a href="mailto:gotoholidaysandvisa@gmail.com" className="text-xl font-medium hover:text-primary transition-colors">
                      gotoholidaysandvisa@gmail.com
                    </a>
                    <a href="mailto:info@gotoholidays-visa.co.in" className="text-xl font-medium hover:text-primary transition-colors">
                      info@gotoholidays-visa.co.in
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-2">Priority Hotline</h4>
                  <a href="tel:9840454061" className="text-xl font-medium hover:text-primary transition-colors">
                    +91 984045 4061
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6 pt-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-2">Headquarters</h4>
                <address className="not-italic text-white/70 font-sans text-base leading-loose">
                  No:2/305<br />
                  Puzgalanthi salai ki<br />
                  J.J nagar east<br />
                  Mugappair east<br />
                  Chennai 600037
                </address>
              </div>
            </div>
          </div>
          
          <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">© 2026 DataZync.com — All Rights Reserved</span>
            <div className="flex gap-12">
              <button className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 hover:text-white transition-colors">Privacy Ethics</button>
              <button className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 hover:text-white transition-colors">Client Confidentiality</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
