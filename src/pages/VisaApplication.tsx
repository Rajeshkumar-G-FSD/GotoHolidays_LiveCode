import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, Minus, Plus, ChevronDown, StickyNote, 
  CheckCircle2, Upload, FileText, Check, ChevronLeft,
  ShieldCheck, Clock, Award
} from 'lucide-react';

type Step = 'details' | 'upload';

const documentsRequired = [
  {
    title: 'MANDATORY DETAILS',
    items: [
      { label: 'Passport', desc: 'Need to carry original passport at the time of biometric appointment. Old passport if (any)' },
      { label: 'Photograph', desc: 'Photograph required only for Dropbox Fresh Photograph against white background with 80% face close up and matte finish Size 2 X 2 inches Without specs and sunglasses' },
      { label: 'Cover letter', desc: 'Should indicate the purpose of travel, number of days, passport and travel details' },
      { label: 'Appointment letter', desc: 'This needs be carried on the day of appointment.' },
      { label: 'DS 160', desc: 'DS 160 Confirmation page.' },
      { label: 'Entry and exit stamp and previous visas held', desc: 'Sticker Visa, Enter Exit Stamp pages on passport for the last 10 years.' },
    ]
  },
  {
    title: 'FINANCIAL DETAILS',
    items: [
      { label: 'Proof of investment', desc: 'Rental Income Receipt, Interest Income and Other Source of Income proof' },
      { label: 'IT return', desc: 'Personal Income Tax Return of the last 03 years.' },
    ]
  },
  {
    title: 'OCCUPATIONAL DETAILS',
    items: [
      { label: 'If self-employed', desc: 'Company registration license: Business registration certificate / GST Registration with annex A & B / Partnership. Deed / Proof of proprietorship... Bank Statement (current/company account or savings) of last 06 month' },
      { label: 'If employed', desc: 'Employer NOC: Letter from employers statement on approval for holidays. Pay slips: Last 3 months salary slips. Bank Statement (both salary and savings) of last 06 month' },
      { label: 'If minor (under 18)', desc: 'Birth certificate and student id proof. Parents passport: This document is required only if the child is travelling without parents/single parent.' },
    ]
  }
];

export default function VisaApplication() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [step, setStep] = useState<Step>('details');
  const [passengers, setPassengers] = useState(1);
  const [note, setNote] = useState('');
  const [country, setCountry] = useState(queryParams.get('country') || 'Algeria');
  
  const visaFee = 17760;
  const taxes = 2360;
  const total = (visaFee * passengers) + taxes;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  return (
    <div className="min-h-screen bg-[#FCF6F5]">
      {/* Dynamic Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-100">
        <motion.div 
          initial={{ width: '0%' }}
          animate={{ width: step === 'details' ? '50%' : '100%' }}
          className="h-full bg-[#990011]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <div>
            <button 
              onClick={() => step === 'upload' ? setStep('details') : navigate(-1)}
              className="flex items-center gap-2 text-[#990011] font-bold text-sm mb-6 hover:-translate-x-1 transition-transform"
            >
              <ChevronLeft size={16} />
              BACK TO {step === 'details' ? 'SEARCH' : 'DETAILS'}
            </button>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">
              {step === 'details' ? 'Configure Application' : 'Secure Document Vault'}
            </h1>
            <p className="text-gray-500 font-medium">Applying for <span className="text-[#990011] font-bold">{country}</span> Visa</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <ShieldCheck size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-gray-400 uppercase">Identity Protection</p>
                <p className="text-xs font-bold text-gray-800 tracking-tight">Level 4 Encryption</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {step === 'details' ? (
                <motion.div 
                  key="details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-black/5 border border-white">
                    <div className="space-y-12">
                      {/* Travellers */}
                      <section>
                        <div className="flex justify-between items-center mb-10">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#990011]/5 rounded-2xl text-[#990011]">
                              <Users size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Traveller Details</h3>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-8 bg-gray-50/50 rounded-3xl border border-gray-100/50 gap-6">
                          <div>
                            <h4 className="font-black text-gray-800 text-lg mb-1">Standard Passenger</h4>
                            <p className="text-sm text-gray-400 font-medium">Valid for all age groups & nationalities</p>
                          </div>
                          <div className="flex items-center gap-8 bg-white p-2 rounded-2xl shadow-sm">
                            <button 
                              onClick={() => setPassengers(Math.max(1, passengers - 1))}
                              className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 hover:text-[#990011] transition-colors"
                            >
                              <Minus size={20} strokeWidth={3} />
                            </button>
                            <span className="font-black text-2xl w-6 text-center text-[#990011]">{passengers}</span>
                            <button 
                              onClick={() => setPassengers(passengers + 1)}
                              className="w-12 h-12 rounded-xl bg-[#990011] flex items-center justify-center text-white hover:bg-red-900 transition-colors shadow-lg shadow-red-200"
                            >
                              <Plus size={20} strokeWidth={3} />
                            </button>
                          </div>
                        </div>
                      </section>

                      <div className="h-px bg-linear-to-r from-transparent via-gray-100 to-transparent" />

                      {/* Info Form */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section>
                          <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Point of Contact <span className="text-[#990011]">*</span></label>
                          <div className="relative">
                            <select className="w-full h-16 pl-6 pr-12 bg-gray-50/50 border border-transparent rounded-2xl appearance-none focus:bg-white focus:ring-2 focus:ring-[#990011] focus:border-transparent outline-none font-bold text-gray-800 transition-all">
                              <option>NISHANTH PILLAI</option>
                              <option>EXECUTIVE ACCESS</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                              <ChevronDown size={20} strokeWidth={2.5} />
                            </div>
                          </div>
                        </section>

                        <section>
                          <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Application Tag</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Summer Trip 2026"
                            className="w-full h-16 px-6 bg-gray-50/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#990011] focus:border-transparent outline-none font-bold text-gray-800 transition-all"
                          />
                        </section>
                      </div>

                      <section>
                        <div className="flex items-center gap-3 mb-4">
                          <StickyNote size={20} className="text-[#990011]" strokeWidth={1.5} />
                          <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Special Instructions</label>
                        </div>
                        <textarea 
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder="Note down any specific requirements for our diplomatic liaison..."
                          className="w-full p-6 bg-gray-50/50 border border-transparent rounded-3xl focus:bg-white focus:ring-2 focus:ring-[#990011] focus:border-transparent outline-none min-h-[160px] resize-none font-medium text-gray-800 transition-all"
                        />
                      </section>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button 
                      onClick={() => setStep('upload')}
                      className="w-full md:w-auto px-12 h-20 bg-[#990011] hover:bg-red-900 text-white font-black text-xl rounded-3xl flex items-center justify-center gap-4 transition-all shadow-2xl shadow-red-200 group active:scale-95"
                    >
                      PROCEED TO VAULT
                      <div className="flex items-center bg-white/20 p-2 rounded-xl ml-1 group-hover:translate-x-2 transition-transform">
                        <Plus className="rotate-45" size={20} strokeWidth={3} />
                      </div>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="upload"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-black/5 border border-white">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                          <Upload size={24} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Deposit Documents</h3>
                      </div>
                      <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest">
                        <Award size={14} />
                        Verified Protocol
                      </div>
                    </div>

                    {/* Upload Zone */}
                    <div className="border-4 border-dashed border-gray-100 rounded-[40px] p-12 mb-12 flex flex-col items-center justify-center text-center bg-gray-50/20 group hover:border-[#990011]/20 transition-all cursor-pointer">
                      <div className="w-48 h-48 mb-10 relative">
                        <img 
                          src="https://img.freepik.com/free-vector/passport-with-ticket-illustration_1308-59230.jpg?w=740" 
                          alt="Passport" 
                          className="w-full h-full object-contain rounded-3xl shadow-sm"
                        />
                        <div className="absolute -bottom-4 -right-4 bg-[#990011] text-white p-4 rounded-2xl shadow-xl shadow-red-200">
                          <Upload size={24} strokeWidth={3} />
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-black text-gray-900 mb-4">Secure Cryptographic Upload</h3>
                      <p className="text-gray-500 font-medium max-w-md mx-auto leading-relaxed">
                        Drag and drop your scanned documents. Supporting <span className="text-gray-900 font-bold">JPEG, PNG, PDF</span> formats up to <span className="text-gray-900 font-bold">50 MB</span> per file.
                      </p>
                      
                      <button className="mt-10 px-12 py-5 bg-white border border-gray-200 rounded-2xl font-black text-gray-800 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md">
                        BROWSE LOCAL FILES
                      </button>
                    </div>

                    {/* Guidelines */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest">Pre-upload Checklist</h4>
                        <ul className="space-y-4">
                          {[
                            'High-resolution scan (300 DPI)',
                            'No glare on photo surfaces',
                            'All borders visible & edges clear',
                            'Validity exceeds 6 months'
                          ].map((tip, i) => (
                            <li key={i} className="flex items-center gap-4 text-gray-700 font-bold text-sm">
                              <div className="bg-emerald-500 p-1 rounded-full shrink-0">
                                <Check size={12} className="text-white" strokeWidth={4} />
                              </div>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-6 bg-[#990011]/5 rounded-3xl border border-[#990011]/10 self-center">
                        <div className="flex items-center gap-3 mb-3 text-[#990011]">
                          <Clock size={20} />
                          <h5 className="font-black text-sm uppercase">Concierge Review</h5>
                        </div>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed">
                          Once uploaded, our senior verification officers will review your documents within 45 minutes for any discrepancies.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-4 pt-4">
                    <button 
                      onClick={() => setStep('details')}
                      className="px-10 h-16 bg-white border border-gray-200 rounded-2xl font-black text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      BACK
                    </button>
                    <button className="flex-1 max-w-xs h-20 bg-black text-white font-black text-xl rounded-3xl flex items-center justify-center gap-4 transition-all shadow-2xl shadow-black/20 hover:scale-105 active:scale-95">
                      FINALIZE & PAY
                      <div className="bg-white/20 p-2 rounded-xl">
                        <ChevronLeft className="rotate-180" size={20} strokeWidth={3} />
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            {/* Price Summary */}
            <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl shadow-black/5 border border-white sticky top-24">
              <h3 className="text-2xl font-black text-gray-900 mb-10 tracking-tight leading-tight">
                Diplomatic <br />Fee Summary
              </h3>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center group">
                    <span className="font-bold text-gray-400 group-hover:text-gray-600 transition-colors">Visa Selection (x{passengers})</span>
                    <span className="font-black text-gray-900 text-lg">₹{(visaFee * passengers).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="font-bold text-gray-400 group-hover:text-gray-600 transition-colors">Concierge Service</span>
                    <span className="font-black text-gray-900 text-lg">₹{taxes.toLocaleString()}</span>
                  </div>
                </div>

                <div className="h-px bg-dashed border-t border-gray-100" />

                <div className="flex justify-between items-center text-[#990011]">
                  <span className="font-black text-xl uppercase tracking-tighter">Total Due</span>
                  <span className="font-black text-3xl">₹{total.toLocaleString()}</span>
                </div>

                <div className="bg-[#10B981]/10 p-4 rounded-2xl flex items-center gap-3">
                  <div className="bg-[#10B981] p-1 rounded-full shrink-0">
                    <CheckCircle2 size={16} className="text-white" strokeWidth={3} />
                  </div>
                  <span className="text-[10px] font-black text-[#10B981] uppercase tracking-[0.2em]">Guaranteed Lowest Diplomatic Rates</span>
                </div>
              </div>

              {/* Requirements Teaser (only in step 1) */}
              {step === 'details' && (
                <div className="mt-12 pt-12 border-t border-gray-50">
                  <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6 border-b border-gray-50 pb-2">UPCOMING REQUIREMENTS</h4>
                  <div className="space-y-4">
                    {documentsRequired[0].items.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">{item.label}</span>
                      </div>
                    ))}
                    <p className="text-[10px] italic text-gray-400 pt-2">+ {documentsRequired.length * 2} more protocols</p>
                  </div>
                </div>
              )}
            </div>

            {/* Support Card */}
            <div className="bg-black rounded-[40px] p-8 text-white overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="text-xl font-black mb-4">Elite Support</h4>
                <p className="text-white/60 text-sm font-medium mb-6">Real-time liaison with our diplomatic processing units.</p>
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 transition-all rounded-2xl text-sm font-black uppercase tracking-widest">
                  Connect Now
                </button>
              </div>
              {/* Background Accent */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-32 h-32 bg-[#990011] rounded-full blur-[60px] opacity-50" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Dynamic Requirements Footer (for upload step) */}
      <AnimatePresence>
        {step === 'upload' && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 z-40 p-6 md:p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] overflow-x-auto"
          >
            <div className="max-w-7xl mx-auto flex gap-12 min-w-max md:justify-center">
              {documentsRequired.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="text-[8px] font-black text-[#990011] uppercase tracking-[0.3em]">{section.title}</h4>
                  <div className="flex gap-4">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex flex-col gap-1 w-32">
                        <span className="text-[10px] font-bold text-gray-800 uppercase truncate">{item.label}</span>
                        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                           <div className="h-full w-0 bg-emerald-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Bottom Spacing */}
      <div className="h-40" />
    </div>
  );
}
