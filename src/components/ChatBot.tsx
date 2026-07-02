import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Search } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

interface Message {
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `
You are "GotoHolidayAI", the premium concierge for a high-end luxury travel agency.
Your goal is to assist travelers with their queries about international tours, visa consultancy, and curated travel experiences.

Key Agency Details:
- We specialize in "Luxury Travel Experiences" and "Premium International Tours".
- We provide holistic visa consultancy services for countries like USA, UK, Europe (Schengen), Australia, and more.
- We offer curated holiday packages that include premium accommodations, private transfers, and unique local experiences.
- Call to action: Users can contact us on WhatsApp at 919840454061 for direct consultation.
- Tone: Professional, helpful, sophisticated, and enthusiastic about travel.

Instructions:
1. Answer questions about travel, destinations, and visa requirements generally (use common knowledge for visa basics but always suggest professional consultation for specific cases).
2. If the user asks about booking, suggest they use the "Stamp My Visa" search bar on the homepage or contact our experts on WhatsApp.
3. Keep responses concise but elegant.
4. If you don't know something specifically about the agency's internal policies, suggest talking to our travel experts.
5. You must respond politely to all kinds of questions, but always steer back to travel or luxury services if the conversation wanders too far.
`;

const countries = [
  { name: 'Albania', flag: '🇦🇱' }, { name: 'Algeria', flag: '🇩🇿' }, { name: 'Andorra', flag: '🇦🇩' },
  { name: 'Angola', flag: '🇦🇴' }, { name: 'Argentina', flag: '🇦🇷' }, { name: 'Armenia', flag: '🇦🇲' },
  { name: 'Australia', flag: '🇦🇺' }, { name: 'Austria', flag: '🇦🇹' }, { name: 'Azerbaijan', flag: '🇦🇿' },
  { name: 'Bahamas', flag: '🇧🇸' }, { name: 'Bahrain', flag: '🇧🇭' }, { name: 'Bangladesh', flag: '🇧🇩' },
  { name: 'Belgium', flag: '🇧🇪' }, { name: 'Belize', flag: '🇧🇿' }, { name: 'Benin', flag: '🇧🇯' },
  { name: 'Bhutan', flag: '🇧🇹' }, { name: 'Bolivia', flag: '🇧🇴' }, { name: 'Botswana', flag: '🇧🇼' },
  { name: 'Brazil', flag: '🇧🇷' }, { name: 'Brunei', flag: '🇧🇳' }, { name: 'Bulgaria', flag: '🇧🇬' },
  { name: 'Cambodia', flag: '🇰🇭' }, { name: 'Cameroon', flag: '🇨🇲' }, { name: 'Canada', flag: '🇨🇦' },
  { name: 'Chile', flag: '🇨🇱' }, { name: 'China', flag: '🇨🇳' }, { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Croatia', flag: '🇭🇷' }, { name: 'Cyprus', flag: '🇨🇾' }, { name: 'Denmark', flag: '🇩🇰' },
  { name: 'Egypt', flag: '🇪🇬' }, { name: 'Estonia', flag: '🇪🇪' }, { name: 'Ethiopia', flag: '🇪🇹' },
  { name: 'Finland', flag: '🇫🇮' }, { name: 'France', flag: '🇫🇷' }, { name: 'Georgia', flag: '🇬🇪' },
  { name: 'Germany', flag: '🇩🇪' }, { name: 'Ghana', flag: '🇬🇭' }, { name: 'Greece', flag: '🇬🇷' },
  { name: 'Hungary', flag: '🇭🇺' }, { name: 'Iceland', flag: '🇮🇸' }, { name: 'India', flag: '🇮🇳' },
  { name: 'Indonesia', flag: '🇮🇩' }, { name: 'Ireland', flag: '🇮🇪' }, { name: 'Israel', flag: '🇮🇱' },
  { name: 'Italy', flag: '🇮🇹' }, { name: 'Japan', flag: '🇯🇵' }, { name: 'Jordan', flag: '🇯🇴' },
  { name: 'Kazakhstan', flag: '🇰🇿' }, { name: 'Kenya', flag: '🇰🇪' }, { name: 'Kuwait', flag: '🇰🇼' },
  { name: 'Latvia', flag: '🇱🇻' }, { name: 'Lithuania', flag: '🇱🇹' }, { name: 'Luxembourg', flag: '🇱🇺' },
  { name: 'Malaysia', flag: '🇲🇾' }, { name: 'Maldives', flag: '🇲🇻' }, { name: 'Malta', flag: '🇲🇹' },
  { name: 'Mauritius', flag: '🇲🇺' }, { name: 'Mexico', flag: '🇲🇽' }, { name: 'Monaco', flag: '🇲🇨' },
  { name: 'Montenegro', flag: '🇲🇪' }, { name: 'Morocco', flag: '🇲🇦' }, { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'New Zealand', flag: '🇳🇿' }, { name: 'Norway', flag: '🇳🇴' }, { name: 'Oman', flag: '🇴🇲' },
  { name: 'Pakistan', flag: '🇵🇰' }, { name: 'Panama', flag: '🇵🇦' }, { name: 'Peru', flag: '🇵🇪' },
  { name: 'Philippines', flag: '🇵🇭' }, { name: 'Poland', flag: '🇵🇱' }, { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Qatar', flag: '🇶🇦' }, { name: 'Romania', flag: '🇷🇴' }, { name: 'Russia', flag: '🇷🇺' },
  { name: 'Saudi Arabia', flag: '🇸🇦' }, { name: 'Singapore', flag: '🇸🇬' }, { name: 'Slovakia', flag: '🇸🇰' },
  { name: 'Slovenia', flag: '🇸🇮' }, { name: 'South Africa', flag: '🇿🇦' }, { name: 'South Korea', flag: '🇰🇷' },
  { name: 'Spain', flag: '🇪🇸' }, { name: 'Sri Lanka', flag: '🇱🇰' }, { name: 'Sweden', flag: '🇸🇪' },
  { name: 'Switzerland', flag: '🇨🇭' }, { name: 'Thailand', flag: '🇹🇭' }, { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Ukraine', flag: '🇺🇦' }, { name: 'United Kingdom', flag: '🇬🇧' }, { name: 'United States', flag: '🇺🇸' },
  { name: 'Uruguay', flag: '🇺🇾' }, { name: 'Uzbekistan', flag: '🇺🇿' }, { name: 'Vietnam', flag: '🇻🇳' },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hello! I'm GotoHolidayAI. How can I help you plan your next extraordinary journey today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [formStep, setFormStep] = useState<null | 'name' | 'phone' | 'purpose' | 'date' | 'country'>(null);
  const [formData, setFormData] = useState({
    serviceType: '',
    name: '',
    phone: '',
    purpose: '',
    date: '',
    country: ''
  });
  const [countrySearch, setCountrySearch] = useState('');
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, formStep]);

  const startFormFlow = (type: string) => {
    setFormData(prev => ({ ...prev, serviceType: type }));
    setMessages(prev => [...prev, {
      role: 'bot',
      text: `Great! For ${type}, I need a few details. What is your full name?`,
      timestamp: new Date()
    }]);
    setFormStep('name');
  };

  const handleWhatsApp = () => {
    const text = `Hi, I'm interested in ${formData.serviceType}.
Details:
- Name: ${formData.name}
- Phone: ${formData.phone}
- Purpose: ${formData.purpose}
- Date: ${formData.date}
- Target Country: ${formData.country}

Please assist me with further process.`;
    window.open(`https://wa.me/919840454061?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleFormInput = (value: string) => {
    if (formStep === 'name') {
      setFormData(prev => ({ ...prev, name: value }));
      setMessages(prev => [...prev, 
        { role: 'user', text: value, timestamp: new Date() },
        { role: 'bot', text: "Thank you. What is your contact phone number?", timestamp: new Date() }
      ]);
      setFormStep('phone');
    } else if (formStep === 'phone') {
      setFormData(prev => ({ ...prev, phone: value }));
      setMessages(prev => [...prev, 
        { role: 'user', text: value, timestamp: new Date() },
        { role: 'bot', text: "What is the purpose of your travel? (e.g. Tourism, Business, etc.)", timestamp: new Date() }
      ]);
      setFormStep('purpose');
    } else if (formStep === 'purpose') {
      setFormData(prev => ({ ...prev, purpose: value }));
      setMessages(prev => [...prev, 
        { role: 'user', text: value, timestamp: new Date() },
        { role: 'bot', text: "When are you planning to travel? (e.g. Next month, Aug 2024)", timestamp: new Date() }
      ]);
      setFormStep('date');
    } else if (formStep === 'date') {
      setFormData(prev => ({ ...prev, date: value }));
      setMessages(prev => [...prev, 
        { role: 'user', text: value, timestamp: new Date() },
        { role: 'bot', text: "Which country are you planning to visit?", timestamp: new Date() }
      ]);
      setFormStep('country');
    }
    setInputValue('');
  };

  const handleCountrySelect = (country: string, flag: string) => {
    const selected = `${flag} ${country}`;
    setFormData(prev => ({ ...prev, country: selected }));
    setMessages(prev => [...prev, 
      { role: 'user', text: selected, timestamp: new Date() },
      { role: 'bot', text: "Perfect! All details are ready. Click below to share this with our experts on WhatsApp for immediate assistance.", timestamp: new Date() }
    ]);
    setFormStep(null);
    setCountrySearch('');
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    if (formStep) {
      handleFormInput(inputValue);
      return;
    }

    const userMessage: Message = {
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      if (!ai) {
        throw new Error("Gemini API key is not configured.");
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          ...messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: inputValue }] }
        ],
      });

      const botMessage: Message = {
        role: 'bot',
        text: response.text || "I apologize, I'm having trouble connecting right now. Please try again or contact our experts via WhatsApp.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        role: 'bot',
        text: error instanceof Error && error.message.includes("API key") 
          ? "The AI advisor is currently offline. Please contact our experts on WhatsApp for assistance." 
          : "I'm sorry, I encountered an error. Our travel experts are available on WhatsApp if you need immediate assistance.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 md:inset-auto md:bottom-32 md:right-8 w-full md:w-[400px] h-[100dvh] md:h-[600px] bg-white z-[999] flex flex-col md:rounded-2xl md:shadow-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-[#990011] p-5 md:p-4 text-white flex items-center justify-between shrink-0 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot size={28} className="md:w-6 md:h-6" />
                  </div>
                  {/* Live Indicator Animation */}
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3.5 h-3.5 md:w-3 md:h-3 bg-green-400 rounded-full border-2 border-[#990011]"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg md:text-sm tracking-tight text-white">GotoHolidayAI</h3>
                  <p className="text-[10px] opacity-80 uppercase tracking-widest font-medium text-white">Always Active</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2.5 md:p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95 text-white"
              >
                <X size={24} className="md:w-5 md:h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 custom-scrollbar overscroll-contain"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'bot' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] p-4 md:p-3 rounded-2xl text-[15px] md:text-sm ${
                    msg.role === 'bot' 
                      ? 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none' 
                      : 'bg-[#990011] text-white rounded-tr-none shadow-md'
                  }`}>
                    {msg.text}
                    
                    {/* Form Step: Initial Buttons */}
                    {i === 0 && msg.role === 'bot' && !formStep && !formData.name && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button 
                          onClick={() => startFormFlow('Visa Assistance')}
                          className="bg-[#990011] text-white px-5 py-2.5 md:px-4 md:py-2 rounded-xl text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-md"
                        >
                          Visa Assistance
                        </button>
                        <button 
                          onClick={() => startFormFlow('Passport Services')}
                          className="bg-black text-white px-5 py-2.5 md:px-4 md:py-2 rounded-xl text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-md"
                        >
                          Passport Services
                        </button>
                      </div>
                    )}

                    {/* Form Step: Country Selection UI */}
                    {formStep === 'country' && i === messages.length - 1 && msg.role === 'bot' && (
                      <div className="mt-4 space-y-3">
                        <div className="relative">
                          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input 
                            type="text"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            placeholder="Search country..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#990011]/20 focus:border-[#990011] transition-all"
                          />
                        </div>
                        <div className="max-h-[200px] overflow-y-auto custom-scrollbar space-y-1 bg-white rounded-xl border border-gray-100 p-1">
                          {countries
                            .filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()))
                            .map(c => (
                              <button
                                key={c.name}
                                onClick={() => handleCountrySelect(c.name, c.flag)}
                                className="w-full text-left p-3 hover:bg-gray-50 rounded-lg text-sm flex items-center gap-3 border border-transparent hover:border-gray-100 transition-colors"
                              >
                                <span className="text-xl">{c.flag}</span>
                                <span className="font-medium text-gray-700">{c.name}</span>
                              </button>
                            ))
                          }
                        </div>
                      </div>
                    )}

                    {/* Form Completion: WhatsApp Share Button */}
                    {!formStep && formData.country && i === messages.length - 1 && msg.role === 'bot' && (
                      <div className="mt-4 space-y-2">
                        <button 
                          onClick={handleWhatsApp}
                          className="w-full bg-green-500 text-white px-4 py-4 rounded-xl text-sm font-bold hover:bg-green-600 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-3"
                        >
                          <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="wa" className="w-5 h-5 invert" />
                          Share Details on WhatsApp
                        </button>
                        <button 
                          onClick={() => {
                            setFormData({ serviceType: '', name: '', phone: '', purpose: '', date: '', country: '' });
                            setFormStep(null);
                            setMessages([messages[0]]);
                          }}
                          className="w-full py-2 text-[11px] text-gray-400 font-bold uppercase tracking-widest hover:text-[#990011] transition-colors"
                        >
                          Restart Consultation
                        </button>
                      </div>
                    )}

                    <div className={`text-[10px] mt-2 opacity-60 ${msg.role === 'bot' ? 'text-gray-400' : 'text-white'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none flex gap-1">
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-[#990011]/30 rounded-full" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} className="w-1.5 h-1.5 bg-[#990011]/30 rounded-full" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }} className="w-1.5 h-1.5 bg-[#990011]/30 rounded-full" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 pb-safe md:pb-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={formStep ? `Enter your ${formStep}...` : "Ask about visas or tours..."}
                  className="flex-1 bg-gray-50 border border-gray-200 focus:border-[#990011] focus:ring-2 focus:ring-[#990011]/10 rounded-2xl px-5 py-4 md:py-3 text-base outline-none transition-all placeholder:text-gray-400"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-4 md:p-3.5 bg-[#990011] text-white rounded-2xl hover:brightness-110 active:scale-90 transition-all disabled:opacity-50 disabled:grayscale shadow-lg shadow-[#990011]/20 flex items-center justify-center min-w-[56px] md:min-w-0"
                >
                  <Send size={24} className="md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <div className="fixed bottom-44 right-6 md:bottom-28 md:right-8 z-[100] flex flex-col items-end">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-black text-white p-4 rounded-full shadow-2xl flex items-center gap-3 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          {/* Pulse Animation for active state */}
          {!isOpen && (
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-white/20 rounded-full"
            />
          )}

          <div className="hidden group-hover:block font-bold text-sm whitespace-nowrap px-2">
            Ask AI Advisor
          </div>
          <div className="relative">
            <MessageSquare size={32} />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1 text-yellow-400"
            >
              <Sparkles size={14} />
            </motion.div>
          </div>
        </motion.button>
      </div>
    </>
  );
}
