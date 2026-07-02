import { motion } from 'motion/react';
import { Phone, Mail, MessageSquare, MapPin, Send, Globe, Clock, ChevronRight } from 'lucide-react';

const offices = [
  {
    city: 'Chennai',
    type: 'Headquarters',
    address: 'No:2/305, Puzgalanthi salai ki, J.J nagar east, Mugappair east, Chennai 600037',
    phone: '+91 984045 4061',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124376.10178351443!2d80.141566!3d13.049448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526696b9979d39%3A0xe54e2f81152a8a5e!2sMugappair%20East%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1715343500000!5m2!1sen!2sin'
  },
  {
    city: 'Nagercoil',
    type: 'Regional Office',
    address: 'NO 23-80A EAST STREET KAKAMOOR, SUCHINDRUM, KANYAKUMARI DIST, 629704',
    phone: '+91 89394 23442',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31591.123456789!2d77.44!3d8.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f1a2b3c4d5e6%3A0x1234567890abcdef!2sSuchindram%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1715343600000!5m2!1sen!2sin'
  }
];

const contactMethods = [
  { icon: <Phone size={20} />, label: 'Priority Hotline', value: '+91 984045 4061', sub: '+91 89394 23442' },
  { icon: <Mail size={20} />, label: 'Email', value: 'gotoholidaysandvisa@gmail.com', sub: 'info@gotoholidays-visa.co.in' },
  { icon: <MessageSquare size={20} />, label: 'WhatsApp Chat', value: 'Chat with Expert', sub: 'Instant Response' },
  { icon: <Clock size={20} />, label: 'Working Hours', value: 'Mon - Sat: 10AM - 8PM', sub: 'Sun: Emergency Only' },
];

export default function Contact() {
  return (
    <main className="pt-40 pb-24 px-6 md:px-20 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col lg:flex-row gap-20">
        {/* Left Column: Form & Info */}
        <div className="lg:w-1/2 space-y-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <span className="text-[#990011] text-[10px] font-black tracking-[0.4em] uppercase">Connect With Us</span>
            <h1 className="font-display text-6xl md:text-8xl text-gray-900 tracking-tighter">Let's <span className="text-[#990011]">Plan</span> Your Journey</h1>
            <p className="font-sans text-lg text-gray-500 leading-relaxed max-w-xl italic">
              Experience the world with confidence. Our elite visa experts and vacation curators are ready to assist you 24/7.
            </p>
          </motion.div>

          {/* Quick Stats/Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactMethods.map((method, i) => (
              <motion.div 
                key={method.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl flex flex-col gap-4 shadow-xl shadow-black/[0.02] border border-gray-50 hover:border-[#990011]/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#990011] group-hover:bg-[#990011] group-hover:text-white transition-all duration-300">
                  {method.icon}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{method.label}</span>
                  <p className="text-gray-900 text-sm font-black mt-1">{method.value}</p>
                  <p className="text-gray-400 text-xs font-medium mt-0.5">{method.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Inquiry Form Teaser - Links to home Inquiry or embedded here */}
          <div className="bg-black text-white p-10 rounded-[3rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#990011]/20 rounded-full blur-[60px] -mr-16 -mt-16" />
             <h3 className="text-2xl font-black mb-4 tracking-tight">Need a customized package?</h3>
             <p className="text-white/60 mb-8 max-w-xs font-medium">Send us your details and our senior travel consultant will call you back within 60 minutes.</p>
             <button 
               onClick={() => {
                  const el = document.getElementById('contact-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
               }}
               className="bg-[#990011] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-black transition-all"
             >
               Start Conversation <ChevronRight size={14} />
             </button>
          </div>
        </div>

        {/* Right Column: Maps & Locations */}
        <div className="lg:w-1/2 space-y-12">
          {offices.map((office, idx) => (
            <motion.div 
              key={office.city}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-black/[0.04] border border-gray-100"
            >
              {/* Map Preview */}
              <div className="h-64 md:h-80 w-full bg-gray-100 relative group">
                <iframe 
                  src={office.mapUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Virtual Tour Available</span>
                </div>
              </div>

              {/* Office Details */}
              <div className="p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{office.city}</h3>
                    <span className="bg-[#990011]/5 text-[#990011] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{office.type}</span>
                  </div>
                  <p className="text-gray-500 font-medium max-w-sm leading-relaxed mb-6">{office.address}</p>
                  <div className="flex items-center gap-4">
                    <a href={`tel:${office.phone}`} className="flex items-center gap-2 text-gray-900 font-black text-xs hover:text-[#990011] transition-colors">
                      <Phone size={14} /> {office.phone}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <a 
                    href={`https://wa.me/${office.phone.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-[#25D366] text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-xl shadow-green-200"
                  >
                    <MessageSquare size={24} fill="currentColor" />
                  </a>
                  <button className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-xl shadow-black/20">
                    <MapPin size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

