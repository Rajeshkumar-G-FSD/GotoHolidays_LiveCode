import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, FileText, CheckCircle2, ShieldCheck, ArrowRight, User, Globe, Mail } from 'lucide-react';

export default function UploadDocuments() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FCF6F5] pt-40 px-6 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Documents Received</h2>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            Our secure processing system has received your documents. A dedicated visa officer will be assigned to your case shortly.
          </p>
          <div className="flex flex-col gap-4">
             <button className="bg-[#990011] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
               View Application Status
             </button>
             <button onClick={() => setSubmitted(false)} className="text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-gray-600 transition-colors">
               Upload More
             </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF6F5] pt-40 pb-24 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Header & Instructions */}
          <div className="lg:w-1/2 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <span className="text-[#990011] text-[10px] font-black tracking-[0.4em] uppercase">Secure Transfer</span>
              <h1 className="font-display text-6xl md:text-8xl text-gray-900 tracking-tighter">Stamp <span className="text-[#990011]">My Visa</span></h1>
              <p className="font-sans text-lg text-gray-500 leading-relaxed italic">
                Upload your digital documents to our encrypted diplomatic vault for immediate review and processing.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
               {[
                 { title: 'SSL Encrypted', icon: <ShieldCheck size={20} />, desc: 'Your data is protected with banking-grade encryption.' },
                 { title: 'Privacy First', icon: <Globe size={20} />, desc: 'We never share your personal information with third parties.' },
               ].map((item, i) => (
                 <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-black/[0.02]">
                    <div className="text-[#990011] mb-4">{item.icon}</div>
                    <h4 className="text-sm font-black text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>

            <div className="bg-black text-white p-10 rounded-[3rem] space-y-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#990011]/20 rounded-full blur-[60px] -mr-16 -mt-16" />
               <h3 className="text-2xl font-black tracking-tight">Required Formats</h3>
               <ul className="space-y-4 font-medium text-white/50 text-sm">
                 <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#990011] rounded-full" /> PDF, JPEG, or PNG only</li>
                 <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#990011] rounded-full" /> Maximum 10MB per file</li>
                 <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#990011] rounded-full" /> High-resolution scans preferred</li>
               </ul>
            </div>
          </div>

          {/* Upload Area */}
          <div className="lg:w-1/2 space-y-8">
            <div className="bg-white p-8 md:p-12 rounded-[4rem] shadow-2xl shadow-black/[0.04] border border-gray-100">
               <div className="space-y-10">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input type="text" placeholder="John Doe" className="w-full bg-transparent border-b border-gray-100 py-3 pl-8 focus:outline-none focus:border-[#990011] transition-all font-bold text-gray-900" />
                      </div>
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mobile Number</label>
                      <div className="relative">
                        <Globe className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input type="tel" placeholder="+91 98XXX XXXXX" className="w-full bg-transparent border-b border-gray-100 py-3 pl-8 focus:outline-none focus:border-[#990011] transition-all font-bold text-gray-900" />
                      </div>
                    </div>
                  </div>

                  {/* Dropzone */}
                  <div 
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`
                      relative group border-2 border-dashed rounded-[3rem] p-12 text-center transition-all duration-500
                      ${dragActive ? 'bg-[#990011]/5 border-[#990011]' : 'border-gray-100 hover:border-[#990011]/30 hover:bg-gray-50'}
                    `}
                  >
                    <input 
                      type="file" 
                      multiple 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      onChange={(e) => e.target.files && setFiles(prev => [...prev, ...Array.from(e.target.files!)])}
                    />
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-[#990011] mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Upload size={32} />
                    </div>
                    <h4 className="text-xl font-black text-gray-900 mb-2">Drop your documents</h4>
                    <p className="text-gray-400 font-medium mb-6">or click to browse your files</p>
                    <div className="flex flex-wrap justify-center gap-2">
                       <span className="bg-gray-100 text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-gray-500">Passport</span>
                       <span className="bg-gray-100 text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-gray-500">Bank Statements</span>
                       <span className="bg-gray-100 text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-gray-500">Photographs</span>
                    </div>
                  </div>

                  {/* File List */}
                  {files.length > 0 && (
                    <div className="space-y-4">
                      {files.map((file, i) => (
                        <div key={i} className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#990011] shadow-sm">
                              <FileText size={18} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-black text-gray-900 truncate max-w-[200px]">{file.name}</span>
                              <span className="text-[10px] text-gray-400 font-bold">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFile(i)}
                            className="p-2 hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <ArrowRight className="rotate-45" size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button 
                    onClick={() => { setFiles([]); setSubmitted(true); }}
                    disabled={files.length === 0}
                    className="w-full bg-[#990011] text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-[#990011]/20 disabled:grayscale disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    Initiate Strategic Review <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
               </div>
            </div>

            <div className="flex items-center justify-center gap-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
               <ShieldCheck size={14} /> Powered by GOTO Holidays Secure Vault™
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
