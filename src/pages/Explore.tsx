import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PlaneTakeoff, ShieldCheck, Clock, CheckCircle2, ArrowRight, Calendar, Binoculars, MessageCircle } from 'lucide-react';

const countryMedia: Record<string, { bg: string; gallery: string[] }> = {
  maldives: {
    bg: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=700&auto=format&fit=crop',
    ],
  },
  dubai: {
    bg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=700&auto=format&fit=crop',
    ],
  },
  thailand: {
    bg: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=700&auto=format&fit=crop',
    ],
  },
  malaysia: {
    bg: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=700&auto=format&fit=crop',
    ],
  },
  andaman: {
    bg: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501959915551-4e8d30928317?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=700&auto=format&fit=crop',
    ],
  },
  singapore: {
    bg: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=700&auto=format&fit=crop',
    ],
  },
  lakshadweep: {
    bg: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501959915551-4e8d30928317?w=700&auto=format&fit=crop',
    ],
  },
};

const fallbackMedia = {
  bg: 'https://i.postimg.cc/hvrjJqkr/Chat-GPT-Image-May-10-2026-06-04-32-PM.png',
  gallery: [
    'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=700&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=700&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=700&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=700&auto=format&fit=crop',
  ],
};

export default function Explore() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const countryRaw = searchParams.get('country') || '';
  const purposeRaw = searchParams.get('purpose') || '';
  const dates = searchParams.get('dates') || 'Anytime';

  const [flag, ...nameParts] = countryRaw.trim().split(' ');
  const countryName = nameParts.join(' ') || countryRaw;
  const purposeName = purposeRaw.trim().split(' ').slice(1).join(' ') || 'Tourism';

  const media = countryMedia[countryName.toLowerCase()] || fallbackMedia;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!countryRaw) navigate('/', { replace: true });
  }, [countryRaw, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  if (!countryRaw) return null;

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center gap-8"
          >
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-full bg-[#990011]/10 border border-[#990011]/30 flex items-center justify-center"
            >
              <PlaneTakeoff size={32} className="text-[#FF3B3F]" />
            </motion.div>
            <div className="text-center px-6">
              <p className="text-white font-black text-lg tracking-tight mb-4">
                Curating {countryName}{flag ? ` ${flag}` : ''} for you...
              </p>
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
                <motion.div
                  animate={{ x: ['-100%', '150%'] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1/2 h-full bg-[#990011] rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {/* Hero */}
          <section className="relative w-full min-h-[85vh] flex items-end overflow-hidden">
            <div className="absolute inset-0">
              <img src={media.bg} alt={countryName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/10" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full px-6 md:px-16 lg:px-24 pb-16 pt-40"
            >
              <span className="inline-block text-white text-[10px] font-black tracking-[0.4em] uppercase px-5 py-1.5 rounded-full mb-6 bg-[#990011]">
                Your Selected Destination
              </span>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-black tracking-tighter mb-5 leading-[1.05] max-w-4xl">
                {flag} {countryName}
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
                {purposeName} trip &middot; {dates}
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <ShieldCheck size={13} />, label: '98% Success Rate' },
                  { icon: <Clock size={13} />, label: 'Fast Processing' },
                  { icon: <CheckCircle2 size={13} />, label: 'Secure & Reliable' },
                ].map((b) => (
                  <span key={b.label} className="flex items-center gap-2 text-white text-xs font-bold px-5 py-2.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-md">
                    {b.icon}{b.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Trip Summary Strip */}
          <section className="bg-white border-b border-gray-100 py-8">
            <div className="container mx-auto px-6 md:px-20 flex flex-wrap gap-8 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#990011]/5 text-[#990011] flex items-center justify-center shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Travel Window</p>
                  <p className="font-black text-gray-900">{dates}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <Binoculars size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Purpose</p>
                  <p className="font-black text-gray-900">{purposeName}</p>
                </div>
              </div>
              <Link
                to={`/visa-application?country=${encodeURIComponent(countryName)}`}
                className="bg-[#990011] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2"
              >
                Start Application <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          {/* Gallery */}
          <section className="py-20 px-6 md:px-20 container mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-10 tracking-tighter">Glimpses of {countryName}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {media.gallery.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative h-56 rounded-3xl overflow-hidden group"
                >
                  <img src={img} alt={`${countryName} ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 px-6 md:px-20 container mx-auto">
            <div className="bg-black rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#990011]/30 rounded-full blur-[100px] -mr-40 -mt-40" />
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter relative z-10">
                Ready to make {countryName} happen?
              </h2>
              <p className="text-white/60 mb-10 relative z-10 max-w-xl mx-auto">
                Our concierge team handles your documents, visa, and bookings end-to-end.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Link
                  to={`/visa-application?country=${encodeURIComponent(countryName)}`}
                  className="bg-white text-[#990011] font-black text-sm uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-[#990011] hover:text-white transition-all"
                >
                  Start Visa Application
                </Link>
                <a
                  href="https://wa.me/8939423442"
                  className="bg-white/10 border border-white/20 text-white font-black text-sm uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} /> WhatsApp Us
                </a>
              </div>
            </div>
          </section>
        </motion.div>
      )}
    </div>
  );
}
