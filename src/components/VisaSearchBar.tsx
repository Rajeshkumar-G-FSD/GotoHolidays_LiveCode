import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Binoculars, X, ChevronLeft, ChevronRight } from 'lucide-react';

const countries = [
  { name: 'Maldives', flag: '🇲🇻' },
  { name: 'Dubai', flag: '🇦🇪' },
  { name: 'Thailand', flag: '🇹🇭' },
  { name: 'Malaysia', flag: '🇲🇾' },
  { name: 'Andaman', flag: '🇮🇳' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Lakshadweep', flag: '🇮🇳' },
];

const purposes = [
  { name: 'Tourism', icon: '🏖️' },
  { name: 'Business', icon: '💼' },
  { name: 'Education', icon: '🎓' },
  { name: 'Family Visit', icon: '🏠' },
];

interface VisaSearchBarProps {
  onApply?: (data: { country: string; purpose: string; dates: string }) => void;
}

export default function VisaSearchBar({ onApply }: VisaSearchBarProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [dateRange, setDateRange] = useState<{ start: Date | null, end: Date | null }>({ start: null, end: null });
  const [currentViewDate, setCurrentViewDate] = useState(new Date());

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveTab(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    const firstDayIndex = date.getDay();
    
    // Fill empty days before first day of month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const handleDateClick = (date: Date) => {
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      setDateRange({ start: date, end: null });
    } else if (dateRange.start && !dateRange.end) {
      if (date < dateRange.start) {
        setDateRange({ start: date, end: null });
      } else {
        setDateRange({ ...dateRange, end: date });
        setActiveTab(null);
      }
    }
  };

  const isSelected = (date: Date) => {
    if (!date) return false;
    return (dateRange.start?.toDateString() === date.toDateString()) || 
           (dateRange.end?.toDateString() === date.toDateString());
  };

  const isInRange = (date: Date) => {
    if (!date || !dateRange.start || !dateRange.end) return false;
    return date > dateRange.start && date < dateRange.end;
  };

  const isToday = (date: Date) => {
    if (!date) return false;
    return date.toDateString() === new Date().toDateString();
  };

  const isPast = (date: Date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentViewDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentViewDate(newDate);
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const firstMonth = currentViewDate;
  const secondMonth = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, 1);

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4" ref={containerRef}>
      <div className="mb-6 text-center md:text-left overflow-hidden">
        <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg leading-tight">
          Which country would you like to <span className="text-[#FF3B3F]">explore?</span>
        </h2>
      </div>

      <div className="relative bg-white transition-all duration-500 shadow-2xl border border-gray-100 rounded-3xl md:rounded-full flex flex-col md:flex-row items-stretch md:items-center p-2">
        {/* Country Search Section */}
        <div
          className={`flex-1 flex items-center gap-3 px-4 md:px-6 py-3 cursor-pointer rounded-2xl md:rounded-full transition-all duration-300 ${activeTab === 'country' ? 'bg-black/5' : 'hover:bg-black/5'}`}
          onClick={() => setActiveTab('country')}
        >
          {!selectedCountry && (
            <div className="w-10 h-10 bg-black/5 rounded-lg flex items-center justify-center text-xl overflow-hidden shrink-0">
               <img src="https://cdn-icons-png.flaticon.com/512/854/854878.png" alt="location" className="w-6 h-6 object-contain" />
            </div>
          )}
          <div className="flex flex-col flex-1 min-w-0">
            {!selectedCountry && <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tight">Location</span>}
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search for a country"
                className={`bg-transparent border-none outline-none text-gray-800 font-medium placeholder:text-gray-400 w-full pr-8 ${selectedCountry ? 'text-base md:text-lg py-1' : 'text-sm md:text-base'}`}
                value={selectedCountry || searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedCountry('');
                }}
                onFocus={() => setActiveTab('country')}
              />
              {(selectedCountry || searchQuery) && (
                <button 
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 hover:bg-black/5 rounded-full text-gray-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCountry('');
                    setSearchQuery('');
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-gray-200" />

        {/* Purpose Section */}
        <div 
          className={`flex-1 flex items-center gap-3 px-4 md:px-6 py-3 cursor-pointer rounded-2xl md:rounded-full transition-all duration-300 ${activeTab === 'purpose' ? 'bg-black/5' : 'hover:bg-black/5'}`}
          onClick={() => setActiveTab('purpose')}
        >
          {!selectedPurpose && (
            <div className="w-10 h-10 bg-black/5 rounded-lg flex items-center justify-center text-xl overflow-hidden shrink-0">
              <img src="https://cdn-icons-png.flaticon.com/512/826/826070.png" alt="purpose" className="w-6 h-6 object-contain" />
            </div>
          )}
          <div className="flex flex-col">
            {!selectedPurpose && <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tight">Travel Type</span>}
            <span className={`font-medium ${selectedPurpose ? 'text-gray-800 text-base md:text-lg py-1' : 'text-gray-400 text-sm md:text-base'}`}>
              {selectedPurpose || 'Purpose Of Travel'}
            </span>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-gray-200" />

        {/* Date Section */}
        <div 
          className={`flex-[1.2] flex items-center gap-3 px-4 md:px-6 py-3 cursor-pointer rounded-2xl md:rounded-full transition-all duration-300 ${activeTab === 'date' ? 'bg-black/5' : 'hover:bg-black/5'}`}
          onClick={() => setActiveTab('date')}
        >
          {!dateRange.start && (
            <div className="w-10 h-10 bg-black/5 rounded-lg flex items-center justify-center text-xl overflow-hidden shrink-0">
              <img src="https://cdn-icons-png.flaticon.com/512/2838/2838779.png" alt="calendar" className="w-6 h-6 object-contain" />
            </div>
          )}
          <div className="flex flex-col">
            {!dateRange.start && <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tight">Duration</span>}
            <span className={`font-medium ${dateRange.start ? 'text-gray-800 text-base md:text-lg py-0.5' : 'text-gray-400 text-sm md:text-base'}`}>
              {dateRange.start ? (
                `${formatDate(dateRange.start)} ${dateRange.end ? `- ${formatDate(dateRange.end)}` : ''}`
              ) : (
                'Start - End Date'
              )}
            </span>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-gray-200" />

        {/* Explore Button */}
        <button
          onClick={() => {
            if (!selectedCountry) {
              setActiveTab('country');
              return;
            }
            onApply?.({
              country: selectedCountry,
              purpose: selectedPurpose,
              dates: dateRange.start ? `${dateRange.start.toLocaleDateString()} - ${dateRange.end?.toLocaleDateString() ?? ''}` : 'Anytime',
            });
          }}
          className="bg-primary hover:brightness-110 text-white px-8 py-4 rounded-2xl md:rounded-full flex items-center justify-center gap-2 font-bold transition-all shadow-xl active:scale-95 md:ml-2 mt-2 md:mt-0"
        >
          <Binoculars size={20} />
          <span>Explore</span>
        </button>

        {/* Dropdowns */}
        <AnimatePresence>
          {activeTab === 'country' && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={() => setActiveTab(null)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] z-10 p-10 overflow-hidden font-sans"
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Select Destination</h3>
                    <p className="text-sm text-gray-500 font-medium">Where would you like to travel next?</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab(null)}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="relative mb-8">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search size={20} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search by country name..."
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#990011]/20 focus:bg-white outline-none rounded-2xl py-5 pl-16 pr-6 font-black text-gray-900 placeholder:text-gray-300 transition-all text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map(country => (
                        <div 
                          key={country.name} 
                          className="p-5 rounded-3xl hover:bg-red-50 flex items-center gap-5 cursor-pointer group transition-all border border-transparent hover:border-[#990011]/10 bg-gray-50/50"
                          onClick={() => {
                            setSelectedCountry(`${country.flag} ${country.name}`);
                            setSearchQuery('');
                            setActiveTab(null);
                          }}
                        >
                          <span className="text-3xl filter drop-shadow-md transition-transform group-hover:scale-110">{country.flag}</span>
                          <div className="flex flex-col">
                            <span className="font-black text-gray-900 group-hover:text-[#990011] transition-colors">{country.name}</span>
                            {country.category && <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{country.category}</span>}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full py-20 text-center flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-3xl">🏜️</div>
                        <p className="text-gray-400 font-black text-sm uppercase tracking-widest">No destination found</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'purpose' && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={() => setActiveTab(null)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="relative w-full max-w-xl bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] z-10 p-10 overflow-hidden font-sans text-center"
              >
                <div className="mb-10">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Trave Mode</h3>
                  <p className="text-sm text-gray-500 font-medium">Select the primary purpose of your journey</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {purposes.map(p => (
                    <div 
                      key={p.name} 
                      className="p-8 rounded-[32px] bg-gray-50 hover:bg-red-50 border-2 border-transparent hover:border-[#990011]/20 cursor-pointer transition-all flex flex-col items-center justify-center gap-4 group"
                      onClick={() => {
                        setSelectedPurpose(`${p.icon} ${p.name}`);
                        setActiveTab(null);
                      }}
                    >
                      <span className="text-5xl transition-transform group-hover:scale-110 duration-500 filter drop-shadow-md">{p.icon}</span>
                      <span className="font-black text-gray-900 uppercase tracking-widest text-xs">{p.name}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setActiveTab(null)}
                  className="mt-12 w-full py-5 rounded-2xl bg-black text-white font-black text-xs uppercase tracking-[0.3em] active:scale-95 transition-all shadow-xl shadow-black/10"
                >
                  Confirm Selection
                </button>
              </motion.div>
            </div>
          )}

          {activeTab === 'date' && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={() => setActiveTab(null)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] z-10 p-10 overflow-hidden font-sans"
              >
                <div className="flex justify-between items-center mb-10">
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Select Travel Dates</h3>
                    <p className="text-sm text-gray-500 font-medium">Choose your travel window for {selectedCountry.split(' ').slice(1).join(' ') || 'your trip'}</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab(null)}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-16">
                  {/* First Month */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-8">
                      <button 
                        className="p-3 hover:bg-gray-100 rounded-2xl transition-colors text-gray-500"
                        onClick={(e) => { e.stopPropagation(); changeMonth(-1); }}
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <span className="font-black text-gray-900 tracking-tight text-xl">
                        {months[firstMonth.getMonth()]} {firstMonth.getFullYear()}
                      </span>
                      <div className="w-12 h-12" />
                    </div>
                    <div className="grid grid-cols-7 gap-3 text-center mb-6">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <span key={d} className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{d}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-3 text-center">
                      {getDaysInMonth(firstMonth.getFullYear(), firstMonth.getMonth()).map((date, i) => (
                        <div 
                          key={i} 
                          onClick={() => date && !isPast(date) && handleDateClick(date)}
                          className={`
                            h-12 flex items-center justify-center rounded-2xl cursor-pointer text-sm font-bold transition-all relative
                            ${!date ? 'pointer-events-none' : ''}
                            ${date && isPast(date) ? 'text-gray-200 cursor-not-allowed opacity-30' : 'text-gray-700 hover:bg-red-50 hover:text-[#990011]'}
                            ${date && isSelected(date) ? 'bg-[#990011] text-white hover:bg-[#990011] hover:text-white shadow-xl shadow-red-900/20 z-10 scale-105' : ''}
                            ${date && isInRange(date) ? 'bg-[#990011]/10 text-[#990011] rounded-none' : ''}
                            ${date && isToday(date) && !isSelected(date) ? 'border-2 border-[#990011]/30 text-[#990011]' : ''}
                          `}
                        >
                          {date?.getDate()}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Second Month */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-8">
                      <div className="w-12 h-12" />
                      <span className="font-black text-gray-900 tracking-tight text-xl">
                        {months[secondMonth.getMonth()]} {secondMonth.getFullYear()}
                      </span>
                      <button 
                        className="p-3 hover:bg-gray-100 rounded-2xl transition-colors text-gray-500"
                        onClick={(e) => { e.stopPropagation(); changeMonth(1); }}
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-3 text-center mb-6">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <span key={d} className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{d}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-3 text-center">
                      {getDaysInMonth(secondMonth.getFullYear(), secondMonth.getMonth()).map((date, i) => (
                        <div 
                          key={i} 
                          onClick={() => date && !isPast(date) && handleDateClick(date)}
                          className={`
                            h-12 flex items-center justify-center rounded-2xl cursor-pointer text-sm font-bold transition-all relative
                            ${!date ? 'pointer-events-none' : ''}
                            ${date && isPast(date) ? 'text-gray-200 cursor-not-allowed opacity-30' : 'text-gray-700 hover:bg-red-50 hover:text-[#990011]'}
                            ${date && isSelected(date) ? 'bg-[#990011] text-white hover:bg-[#990011] hover:text-white shadow-xl shadow-red-900/20 z-10 scale-105' : ''}
                            ${date && isInRange(date) ? 'bg-[#990011]/10 text-[#990011] rounded-none' : ''}
                            ${date && isToday(date) && !isSelected(date) ? 'border-2 border-[#990011]/30 text-[#990011]' : ''}
                          `}
                        >
                          {date?.getDate()}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-10 text-left bg-gray-50 px-8 py-5 rounded-3xl">
                    <div className="flex flex-col min-w-[100px]">
                      <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Check-In</span>
                      <span className="text-gray-900 font-black text-lg tracking-tight">{formatDate(dateRange.start) || '---'}</span>
                    </div>
                    <div className="text-gray-300">
                      <ChevronRight size={24} strokeWidth={3} />
                    </div>
                    <div className="flex flex-col min-w-[100px]">
                      <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Check-Out</span>
                      <span className="text-gray-900 font-black text-lg tracking-tight">{formatDate(dateRange.end) || '---'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 w-full sm:w-auto">
                    <button 
                      className="flex-1 sm:flex-none text-gray-400 hover:text-[#990011] font-black text-[12px] uppercase tracking-widest transition-colors px-8"
                      onClick={(e) => { e.stopPropagation(); setDateRange({ start: null, end: null }); }}
                    >
                      Reset dates
                    </button>
                    <button 
                      className="flex-1 sm:flex-none bg-black text-white px-12 py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed shadow-2xl shadow-black/20"
                      disabled={!dateRange.start || !dateRange.end}
                      onClick={(e) => { e.stopPropagation(); setActiveTab(null); }}
                    >
                      Set Travel Window
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
