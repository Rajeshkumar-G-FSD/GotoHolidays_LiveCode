import { motion } from 'motion/react';
import { Globe, Plane, Hotel, Heart, Briefcase, FileText, Calendar, Shield } from 'lucide-react';

const serviceCards = [
  { icon: <Globe />, title: 'International Tours', desc: 'Curated journeys to the world\'s most breathtaking destinations.' },
  { icon: <Plane />, title: 'Flight Booking', desc: 'Seamless private charter and first-class commercial arrangements.' },
  { icon: <Hotel />, title: 'Hotel Reservations', desc: 'Exclusive access and VIP amenities at the world\'s finest properties.' },
  { icon: <Heart />, title: 'Luxury Honeymoon', desc: 'Intimate, unforgettable experiences designed for romance and privacy.' },
  { icon: <Briefcase />, title: 'Corporate Travel', desc: 'Discreet and efficient management of executive itineraries.' },
  { icon: <FileText />, title: 'Visa Assistance', desc: 'Streamlined, white-glove processing for international documentation.' },
  { icon: <Calendar />, title: 'Custom Planning', desc: 'Bespoke itineraries crafted around your specific interests.' },
  { icon: <Shield />, title: 'Travel Insurance', desc: 'Comprehensive, premium coverage for absolute peace of mind.' },
];

export default function Services() {
  return (
    <main className="pt-40 pb-24 px-6 md:px-20 max-w-7xl mx-auto min-h-screen">
      <header className="text-center mb-24 max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-display text-5xl md:text-7xl text-on-surface mb-8 tracking-tighter"
        >
          Bespoke Travel Services
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-sans text-lg text-on-surface-variant leading-relaxed"
        >
          Elevating global travel through exclusive access, uncompromising quality, and unparalleled attention to detail.
        </motion.p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-panel p-10 rounded-2xl group hover:scale-[1.03] transition-all duration-500 relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-full bg-black/5 border border-black/5 flex items-center justify-center mb-8 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
              {card.icon}
            </div>
            <h3 className="font-display text-2xl text-on-surface mb-4">{card.title}</h3>
            <p className="font-sans text-on-surface-variant text-sm leading-relaxed">{card.desc}</p>
            <div className="absolute inset-0 bg-linear-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Ambient backgrounds */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[160px] -z-10 pointer-events-none" />
    </main>
  );
}
