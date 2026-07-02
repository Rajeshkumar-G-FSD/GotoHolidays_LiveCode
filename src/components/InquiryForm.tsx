import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you'd send this to a backend or email service
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 md:p-12 rounded-[2rem] text-center shadow-xl border border-emerald-50"
      >
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-4">Inquiry Received!</h3>
        <p className="text-gray-500 font-medium mb-8">Our travel expert will contact you via WhatsApp shortly.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-[#990011] font-bold text-sm uppercase tracking-widest hover:underline"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <div id="inquiry-form" className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#990011]/5 rounded-full -mr-16 -mt-16" />
      
      <div className="relative z-10 mb-10">
        <h3 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">Quick Inquiry</h3>
        <p className="text-gray-500 font-medium">Get a quote within 45 minutes</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Full Name</label>
            <input 
              required
              type="text" 
              placeholder="John Doe"
              className="w-full h-14 px-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#990011] outline-none font-bold text-gray-800 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">WhatsApp Number</label>
            <input 
              required
              type="tel" 
              placeholder="+91 89394XXXXX"
              className="w-full h-14 px-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#990011] outline-none font-bold text-gray-800 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Destination</label>
            <select className="w-full h-14 px-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#990011] outline-none font-bold text-gray-800 transition-all appearance-none">
              <option>Thailand</option>
              <option>USA</option>
              <option>UK</option>
              <option>Europe (Schengen)</option>
              <option>Singapore</option>
              <option>Dubai</option>
              <option>Maldives</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Visa Type</label>
            <select className="w-full h-14 px-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#990011] outline-none font-bold text-gray-800 transition-all appearance-none">
              <option>Tourist Visa</option>
              <option>Business Visa</option>
              <option>Holiday Package</option>
              <option>Flight + Hotel</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Travel Date</label>
          <input 
            type="date" 
            className="w-full h-14 px-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#990011] outline-none font-bold text-gray-800 transition-all"
          />
        </div>

        <button 
          type="submit"
          className="w-full h-16 bg-[#990011] hover:bg-black text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-red-200 mt-4 group"
        >
          SUBMIT ENQUIRY
          <Send size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}
