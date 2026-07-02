import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  ArrowRight, PlaneTakeoff, ShieldCheck, Clock, Users, 
  MapPin, Star, Laptop, Heart, Users2, Globe2, 
  CheckCircle2, Calculator, Calendar, Smartphone, 
  ChevronRight, MessageCircle, Info, Landmark
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import InquiryForm from '../components/InquiryForm';
import VisaSearchBar from '../components/VisaSearchBar';

const visaServices = [
  { name: 'USA Visa', desc: 'Business & Tourist (B1/B2)', icon: <Landmark size={24} />, info: '10 Years Validity', color: 'bg-blue-50 text-blue-600' },
  { name: 'UK Visa', desc: 'Standard Visitor Visa', icon: <Globe2 size={24} />, info: '6 Months to 10 Years', color: 'bg-red-50 text-red-600' },
  { name: 'Schengen Visa', desc: 'Europe Multi-Entry', icon: <Globe2 size={24} />, info: '27 Countries Access', color: 'bg-emerald-50 text-emerald-600' },
  { name: 'Canada Visa', desc: 'Visitor & Student Visa', icon: <Landmark size={24} />, info: 'Fast Processing', color: 'bg-red-50 text-red-600' },
  { name: 'Singapore Visa', desc: 'E-Visa Facility', icon: <Globe2 size={24} />, info: '2-3 Working Days', color: 'bg-orange-50 text-orange-600' },
  { name: 'Dubai Visa', desc: '30/60 Days Tourist', icon: <Globe2 size={24} />, info: 'Quick Approval', color: 'bg-amber-50 text-amber-600' },
];

const tourPackages = [
  { name: 'Maldives', price: '₹45,000', days: '4N/5D', inc: 'Hotel + Flight', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800' },
  { name: 'Bali', price: '₹38,000', days: '5N/6D', inc: 'Private Villa', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800' },
  { name: 'Thailand', price: '₹28,000', days: '4N/5D', inc: 'Free Visa', image: 'https://images.unsplash.com/photo-1528181304800-2f1408198f29?w=800' },
  { name: 'Europe', price: '₹1,45,000', days: '9N/10D', inc: 'Guided Tour', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800' },
  { name: 'Dubai', price: '₹42,000', days: '4N/5D', inc: 'Expo + Desert', image: 'https://images.unsplash.com/photo-1512453979798-5ea4 jointing-33f7?w=800' },
  { name: 'Kashmir', price: '₹25,000', days: '5N/6D', inc: 'Houseboat', image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800' },
];

const trustStats = [
  { label: 'Happy Travelers', value: '5000+', icon: <Users2 size={24} /> },
  { label: 'Years Experience', value: '10+', icon: <Award size={24} /> },
  { label: 'Countries Served', value: '40+', icon: <Globe2 size={24} /> },
  { label: 'Support', value: '24/7', icon: <Smartphone size={24} /> },
];

function Award({ className, size }: { className?: string; size?: number }) {
  return <Star className={className} size={size} />;
}

export default function Home() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="w-full relative bg-[#FCF6F5]">
      {/* Hero Section */}
      <header className="relative w-full min-h-[100svh] flex flex-col items-center pt-24 md:pt-0 md:justify-center overflow-hidden bg-[#FCF6F5]">
        {/* Parallax Background */}
        <motion.div 
          style={{ 
            y: useTransform(smoothProgress, [0, 0.3], [0, 200]),
            scale: useTransform(smoothProgress, [0, 0.3], [1, 1.1])
          }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://i.postimg.cc/hvrjJqkr/Chat-GPT-Image-May-10-2026-06-04-32-PM.png" 
            alt="Luxury Travel Experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-[#FCF6F5]" />
        </motion.div>
        
        <div className="relative z-10 container mx-auto px-6 text-center max-w-7xl md:mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            style={{ 
              y: useTransform(smoothProgress, [0, 0.3], [0, -50]),
              opacity: useTransform(smoothProgress, [0, 0.2], [1, 0])
            }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-5xl md:text-[8rem] text-white drop-shadow-2xl mb-6 leading-[1.1] tracking-tight">
              Explore the World <br />
              <span className="font-sans font-light text-4xl md:text-[6rem]">in</span> <span className="text-[#FF3B3F] italic font-serif font-medium text-5xl md:text-[8rem]">Luxury</span>
            </h1>
            
            <p className="font-sans text-sm md:text-lg text-white/90 drop-shadow-lg max-w-xl mx-auto leading-relaxed font-medium">
              Premium international tours, curated travel experiences and unforgettable journeys designed for the world's most discerning travelers.
            </p>
          </motion.div>
        </div>

        {/* Global Search Bar - Floating at bottom of hero */}
        <motion.div 
          style={{ 
            y: useTransform(smoothProgress, [0, 0.2], [0, 50]),
            opacity: useTransform(smoothProgress, [0, 0.2], [1, 0.5])
          }}
          className="relative md:absolute md:bottom-20 z-20 w-full max-w-7xl px-6 mt-12 md:mt-0 pb-12 md:pb-0"
        >
          <VisaSearchBar onApply={(data) => {
            navigate(`/explore?country=${encodeURIComponent(data.country)}&purpose=${encodeURIComponent(data.purpose)}&dates=${encodeURIComponent(data.dates)}`);
          }} />
        </motion.div>
      </header>

      {/* Trust Counters */}
      <section className="py-20 bg-white border-b border-gray-50">
        <div className="container mx-auto px-6 md:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trustStats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-2 p-6 rounded-[2rem] hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-[#990011]/5 text-[#990011] rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <h4 className="text-4xl font-black text-gray-900 tracking-tighter">{stat.value}</h4>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Visa Services */}
      <section className="py-24 px-6 md:px-20 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-4 tracking-tighter">Popular Visa Services</h2>
            <p className="text-gray-500 font-medium text-lg">Expert assistance for 100+ countries with 99.9% success rate. Hassle-free documentation & interview prep.</p>
          </div>
          <Link to="/visa" className="flex items-center gap-2 text-[#990011] font-black text-sm uppercase tracking-widest hover:gap-4 transition-all">
            View All Visas <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visaServices.map((visa, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-black/[0.02] hover:shadow-2xl hover:shadow-black/5 transition-all group"
            >
              <div className={`w-14 h-14 ${visa.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {visa.icon}
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">{visa.name}</h3>
              <p className="text-gray-500 font-medium mb-6">{visa.desc}</p>
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-gray-400">{visa.info}</span>
                </div>
                <Users size={16} className="text-gray-300" />
              </div>
              <Link 
                to={`/visa-application?country=${encodeURIComponent(visa.name)}`}
                className="w-full py-4 bg-gray-50 hover:bg-[#990011] hover:text-white text-gray-900 font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Apply Now <ChevronRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* USA Specialized Section */}
      <section className="py-24 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#990011]/20 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="container mx-auto px-6 md:px-20 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Need Earlier USA Visa Appointment?</h2>
            <p className="text-white/60 font-medium text-lg mb-10 leading-relaxed">
              We assist clients with appointment monitoring, rescheduling support, and guidance for earlier available slots based on embassy availability.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {[
                'Regular Slot Monitoring',
                'Faster Appointment Guidance',
                'Emergency Appointment Support',
                'Chennai / Hyderabad / Mumbai Support'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="w-6 h-6 bg-[#990011] rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 size={12} strokeWidth={4} />
                  </div>
                  <span className="text-sm font-bold text-white/90">{feature}</span>
                </div>
              ))}
            </div>
            <button className="bg-white text-black font-black text-sm uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-[#990011] hover:text-white transition-all shadow-2xl">
              Get Priority Appointment
            </button>
          </motion.div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1508433957232-3107f5fd5995?w=800" 
              alt="USA Visa" 
              className="rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute -bottom-8 -left-8 bg-[#990011] p-10 rounded-[2.5rem] shadow-2xl">
              <h4 className="text-4xl font-black mb-1">98%</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Thailand Special Section */}
      <section className="py-24 container mx-auto px-6 md:px-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#990011] text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">Seasonal Special</span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter italic">Best Thailand Tour Packages</h2>
          <p className="text-gray-500 font-medium text-lg">Explore Bangkok, Pattaya & Phuket with affordable luxury packages from GOTO Holidays.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              name: 'Bangkok + Pattaya', 
              price: '₹22,999', 
              days: '4N/5D', 
              features: ['Coral Island Tour', 'Alcazar Show', 'Hotel + Breakfast', 'Airport Transfers'],
              image: 'https://images.unsplash.com/photo-1528181304800-2f1408198f29?w=800'
            },
            { 
              name: 'Phuket + Krabi', 
              price: '₹34,999', 
              days: '5N/6D', 
              features: ['Phi Phi Island Tour', '4 Star Hotel', 'Speed Boat Experience', 'Honeymoon Friendly'],
              image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800'
            },
            { 
              name: 'Honeymoon Special', 
              price: '₹42,999', 
              days: '4N/5D', 
              features: ['Romantic Dinner Cruise', 'Beach Resort Stay', 'Couple Activities', 'Private Island Tours'],
              image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800'
            }
          ].map((pkg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-black/[0.03] border border-gray-50 flex flex-col h-full group"
            >
              <div className="h-64 overflow-hidden relative">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl">
                  <span className="text-xs font-black text-gray-900">{pkg.days}</span>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-black text-gray-900 mb-6">{pkg.name}</h3>
                <div className="space-y-4 mb-8 flex-grow">
                  {pkg.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3 text-xs font-bold text-gray-500">
                      <div className="w-1 h-1 rounded-full bg-[#990011]" />
                      {f}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="text-[#990011]">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Starting From</p>
                    <p className="text-2xl font-black">{pkg.price}</p>
                  </div>
                  <button className="bg-black text-white font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-[#990011] transition-colors">
                    Enquire Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tour Packages (Bento Grid) */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-4 tracking-tighter">Global Tour Packages</h2>
              <p className="text-gray-500 font-medium text-lg">Curated international experiences designed for your luxury and comfort.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourPackages.map((pkg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] overflow-hidden group cursor-pointer border border-gray-100 shadow-lg shadow-black/[0.02]"
              >
                <div className="relative h-72">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-black mb-1">{pkg.name}</h3>
                    <p className="text-xs font-bold opacity-80">{pkg.days} • {pkg.inc}</p>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Starting Price</p>
                    <p className="text-xl font-black text-[#990011]">{pkg.price}</p>
                  </div>
                  <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#990011] group-hover:text-white group-hover:border-[#990011] transition-all">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-20 container mx-auto">
        <div className="text-center max-w-xl mx-auto mb-20">
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">What Our Travelers Say</h2>
          <p className="text-gray-500 font-medium italic">“Got my USA visa approved smoothly through GOTO Holidays”</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Rahul Sharma', country: 'USA Visitor Visa', text: 'Seamless process for my parents US visa. The team were incredibly helpful with the interview prep. Highly recommended!', image: 'https://i.pravatar.cc/150?u=rahul' },
            { name: 'Priya Patel', country: 'Europe (Schengen)', text: 'Booking our honeymoon to Maldives through GOTO Holidays was the best decision. Everything was pre-planned to perfection.', image: 'https://i.pravatar.cc/150?u=priya' },
            { name: 'David Wilson', country: 'Thailand Family Trip', text: 'Excellent service and transparency regarding the Thailand packages. The hotel selection was premium yet affordable.', image: 'https://i.pravatar.cc/150?u=david' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[3rem] shadow-xl shadow-black/[0.02] border border-gray-50 flex flex-col items-center text-center"
            >
              <div className="flex gap-1 text-amber-400 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-gray-600 font-medium leading-relaxed mb-8">"{item.text}"</p>
              <div className="flex items-center gap-4 text-left">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full border-2 border-white shadow-lg" />
                <div>
                  <h4 className="font-black text-gray-900 text-sm">{item.name}</h4>
                  <p className="text-[10px] font-bold text-[#990011] uppercase tracking-widest">{item.country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Google Reviews Badge */}
        <div className="mt-20 max-w-md mx-auto bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between shadow-2xl shadow-black/[0.02]">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
                <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google" className="w-6" />
              </div>
              <div>
                <p className="text-lg font-black text-gray-900 tracking-tighter">4.9 / 5.0</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">300+ Google Reviews</p>
              </div>
           </div>
           <div className="flex gap-0.5 text-amber-400">
             {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
           </div>
        </div>
      </section>

      {/* Blog / Travel Insights Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-20">
          <div className="flex justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl text-gray-900 tracking-tighter mb-4">Travel Insights</h2>
              <p className="text-gray-500 font-medium italic">Latest updates on visa policies and hidden gems across the globe.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#990011] font-black text-xs uppercase tracking-widest hover:gap-4 transition-all">
              View All Posts <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'New Schengen Visa Rules 2026', 
                cat: 'Visa Update', 
                date: 'May 10, 2026',
                image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800'
              },
              { 
                title: 'Top 10 Hidden Islands in Thailand', 
                cat: 'Travel Guide', 
                date: 'May 08, 2026',
                image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800'
              },
              { 
                title: 'USA Visa Interview Success Tips', 
                cat: 'Expert Advice', 
                date: 'May 05, 2026',
                image: 'https://images.unsplash.com/photo-1508433957232-3107f5fd5995?w=800'
              }
            ].map((post, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-6 shadow-xl shadow-black/[0.02]">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl">
                    <span className="text-[10px] font-black text-[#990011] uppercase tracking-widest">{post.cat}</span>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{post.date}</p>
                <h3 className="text-xl font-black text-gray-900 group-hover:text-[#990011] transition-colors leading-tight">{post.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-6 md:px-20 container mx-auto">
        <div className="bg-[#990011] rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-tight"
          >
            Ready for your <br /> next adventure?
          </motion.h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
            <Link to="/visa" className="bg-white text-[#990011] font-black text-sm uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-black hover:text-white transition-all shadow-2xl shadow-black/20">
              Start Visa Application
            </Link>
            <Link to="/contact" className="bg-black/20 backdrop-blur-md text-white border border-white/20 font-black text-sm uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-white/10 transition-all">
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

