import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppButton() {
  const whatsappNumber = "919840454061"; // Updated number
  const message = encodeURIComponent("Hi, I'm interested in your Visa and Holiday packages. Can you help me?");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center gap-3 group"
    >
      <div className="hidden group-hover:block font-bold text-sm whitespace-nowrap px-2">
        Chat With Travel Expert
      </div>
      <MessageCircle size={32} fill="white" />
    </motion.a>
  );
}
