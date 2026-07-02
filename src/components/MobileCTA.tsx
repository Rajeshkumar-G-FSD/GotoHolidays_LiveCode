import React from 'react';
import { Phone, MessageCircle, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function MobileCTA() {
  const whatsappNumber = "919840454061";
  const phoneNumber = "919840454061";

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full h-18 bg-white border-t border-gray-100 grid grid-cols-3 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <a 
        href={`tel:${phoneNumber}`} 
        className="flex flex-col items-center justify-center text-gray-600 hover:text-[#990011] transition-colors"
      >
        <Phone size={20} />
        <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">Call Now</span>
      </a>
      
      <a 
        href={`https://wa.me/${whatsappNumber}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex flex-col items-center justify-center bg-[#25D366] text-white transition-colors"
      >
        <MessageCircle size={20} fill="white" />
        <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">WhatsApp</span>
      </a>

      <button 
        onClick={() => {
          const el = document.getElementById('inquiry-form');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex flex-col items-center justify-center text-gray-600 hover:text-[#990011] transition-colors"
      >
        <Info size={20} />
        <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">Enquire</span>
      </button>
    </div>
  );
}
