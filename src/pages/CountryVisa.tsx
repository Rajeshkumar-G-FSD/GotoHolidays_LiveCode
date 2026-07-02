import { useState, useRef, type ReactNode } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  ChevronDown, Phone, MessageCircle, Shield, Star,
  CheckCircle2, ArrowRight, Clock, Award, Headphones, Users
} from 'lucide-react';

// ─── helpers ───────────────────────────────────────────────────────────────
function formatDate(d: Date) {
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
function addDays(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return formatDate(d);
}

// ─── scroll-animated wrapper ───────────────────────────────────────────────
function FadeUp({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: 'easeOut', delay }} className={className}>
      {children}
    </motion.div>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => <Star key={i} size={11} fill={i<=n?'#f59e0b':'transparent'} className={i<=n?'text-amber-400':'text-gray-300'} />)}
    </div>
  );
}

// ─── shared data ───────────────────────────────────────────────────────────
const reqList = [
  { label: 'Passport Front Page', code: 'B', desc: 'Clear scan of the data page of your valid passport.' },
  { label: 'Flight Bookings',     code: 'B', desc: 'Confirmed round-trip flight reservation (not necessarily paid).' },
  { label: 'Hotel Confirmation',  code: 'O', desc: 'Hotel booking or accommodation confirmation for the stay.' },
  { label: 'Passport Back Page',  code: 'B', desc: 'Scan of the back page of your passport.' },
  { label: 'Bank Statement',      code: 'B', desc: 'Last 6 months bank statement showing financial stability.' },
  { label: 'Leave Approval Letter', code: 'O', desc: 'Letter from employer approving your leave of absence.' },
  { label: 'ITR',                 code: 'S', desc: 'Income Tax Returns for the last 2–3 financial years.' },
  { label: 'Visa Application Form', code: 'B', desc: 'Completed and signed visa application form.' },
  { label: 'Aadhar Card',         code: 'S', desc: 'Copy of your Aadhar Card as identity proof.' },
  { label: 'Cover Letter',        code: 'B', desc: 'Personal cover letter explaining purpose and itinerary of visit.' },
  { label: 'Invitation Letter',   code: 'O', desc: 'Invitation letter if visiting friends, family, or business contacts.' },
  { label: 'Employment Contract', code: 'S', desc: 'Current employment contract or appointment letter.' },
  { label: 'Salary Slips',        code: 'B', desc: 'Last 3 months salary slips from your employer.' },
  { label: 'Travel Insurance',    code: 'O', desc: 'Travel insurance policy with minimum ₹5 lakh coverage.' },
  { label: 'Visa Entry Exit Stamp', code: 'B', desc: 'Copies of stamps from previous international travel.' },
];

const codeStyle: Record<string,string> = {
  B: 'bg-blue-100 text-blue-600',
  O: 'bg-teal-100 text-teal-600',
  S: 'bg-emerald-100 text-emerald-600',
};
const codeLabel: Record<string,string> = { B: 'Basic', O: 'Optional', S: 'Supporting' };

const allReviews = [
  { name: 'Arjun Malhotra', rating: 5, text: 'Very smooth process, and they guided me at every step.', init: 'A' },
  { name: 'Sneha Joshi',    rating: 5, text: 'They simplified the visa process for my trip. Excellent!', init: 'S' },
  { name: 'Gunasimran',     rating: 4, text: 'Absolutely brilliant support. Got my visa quickly.', init: 'G' },
  { name: 'Ananya Sharma',  rating: 4, text: 'GotoHolidays made my visa process smooth and quick.', init: 'A' },
  { name: 'Rohit Mehta',    rating: 4, text: 'Fast service and clear instructions. Got my visa hassle-free.', init: 'R' },
  { name: 'Priya Desai',    rating: 5, text: 'Very professional team. I got my visa without any stress.', init: 'P' },
];

const baseFaqs = [
  { q: 'How do I apply for a visa?', a: 'Fill out our secure online form with your travel details and upload required documents. Our team will review and process your application promptly.' },
  { q: 'What documents are required for visa application?', a: 'Documents vary by country and visa type. Common requirements include passport, bank statements, flight bookings, hotel confirmation, and photographs.' },
  { q: 'How long does visa processing take?', a: 'Processing time depends on the destination. We offer fast-track processing options for urgent requirements.' },
  { q: 'What is the validity period of the visa?', a: 'Validity varies by visa type. Single entry visas are valid for specific dates while multiple entry visas allow repeated entry within the validity period.' },
  { q: 'Can I extend my visa after arrival?', a: 'Extension policies vary by country. Some allow extension through immigration offices while others require you to exit and re-apply.' },
  { q: 'What happens if my visa application is rejected?', a: 'In case of rejection, we analyze the reason and guide you on the best course of action. Some cases can be re-applied with additional documentation.' },
  { q: 'Is travel insurance required for visa application?', a: 'For some destinations like Schengen countries, travel insurance is mandatory. We recommend it for all international travel regardless.' },
  { q: 'Can I track my visa application status?', a: 'Yes, we provide real-time tracking for all applications. You will receive updates via SMS and email throughout the process.' },
  { q: 'What are the visa fees and payment methods?', a: 'Visa fees vary by country. We accept all major payment methods including UPI, credit/debit cards, and net banking.' },
  { q: 'Can I cancel or modify my visa application?', a: 'Cancellation policies vary. Contact our support team immediately if you need to cancel or modify. Government fees are generally non-refundable.' },
];

// ─── per-country data ───────────────────────────────────────────────────────
const visaData: Record<string, any> = {
  australia: {
    country: 'Australia', flag: '🇦🇺',
    bg: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1600&auto=format&fit=crop',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&auto=format&fit=crop', cap: 'Sydney Harbour' },
      { img: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=700&auto=format&fit=crop', cap: 'Sydney Opera House' },
      { img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=700&auto=format&fit=crop', cap: 'Great Ocean Road' },
      { img: 'https://images.unsplash.com/photo-1559628233-100c798642d5?w=700&auto=format&fit=crop', cap: 'Uluru Rock' },
    ],
    plans: [
      { name: 'Tourist Visa', type: 'e-visa', stay: '90 Days', validity: '1 Year', days: 45, price: '₹10,500', fees: '₹4,999 (fees + tax)', cat: 'e-visa' },
      { name: 'Business Visa', type: 'e-visa', stay: '90 Days', validity: '1 Year', days: 45, price: '₹10,500', fees: '₹4,999 (fees + tax)', cat: 'e-visa' },
    ],
    specificFaqs: [
      { q: 'Is a medical exam required for Australia visa?', a: 'Usually not for stays under 3 months, unless you are over 75 years old.' },
      { q: 'What is a Subclass 600 visa?', a: 'It is a visitor visa that allows travel for tourism or business visitor activities.' },
    ],
  },
  singapore: {
    country: 'Singapore', flag: '🇸🇬',
    bg: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&auto=format&fit=crop',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=700&auto=format&fit=crop', cap: 'Marina Bay Sands' },
      { img: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=700&auto=format&fit=crop', cap: 'Gardens by the Bay' },
      { img: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=700&auto=format&fit=crop', cap: 'Merlion Park' },
      { img: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=700&auto=format&fit=crop', cap: 'Chinatown' },
    ],
    plans: [
      { name: 'Tourist Visa', type: 'e-visa', stay: '30 Days', validity: '2 Years Multiple Entry', days: 4, price: '₹3,500', fees: '₹1,499 (fees + tax)', cat: 'e-visa' },
      { name: 'Business Visa', type: 'e-visa', stay: '30 Days', validity: '2 Years Multiple Entry', days: 4, price: '₹3,500', fees: '₹1,499 (fees + tax)', cat: 'e-visa' },
    ],
    specificFaqs: [
      { q: 'Is Singapore visa a sticker or e-visa?', a: 'It is an electronic visa (E-Visa) which comes as a PDF document.' },
      { q: 'Can I get Singapore visa in 24 hours?', a: 'Sometimes yes, but standard processing is 3-4 days.' },
    ],
  },
  usa: {
    country: 'USA', flag: '🇺🇸',
    bg: 'https://images.unsplash.com/photo-1508433957232-3107f5fd5995?w=1600&auto=format&fit=crop',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1508433957232-3107f5fd5995?w=700&auto=format&fit=crop', cap: 'Statue of Liberty' },
      { img: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=700&auto=format&fit=crop', cap: 'New York City' },
      { img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=700&auto=format&fit=crop', cap: 'Golden Gate Bridge' },
      { img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=700&auto=format&fit=crop', cap: 'Los Angeles' },
    ],
    plans: [
      { name: 'Tourist Visa (B2)', type: 'Sticker', stay: '180 Days', validity: '10 Years', days: 30, price: '₹15,540', fees: '₹5,999 (fees + tax)', cat: 'sticker' },
      { name: 'Business Visa (B1)', type: 'Sticker', stay: '180 Days', validity: '10 Years', days: 30, price: '₹15,540', fees: '₹5,999 (fees + tax)', cat: 'sticker' },
    ],
    specificFaqs: [
      { q: 'How early can I get a US visa appointment?', a: 'Appointment dates vary. We offer monitoring services to help you find the earliest possible slots.' },
      { q: 'Is the US visa fee refundable?', a: 'No, the US Embassy visa fee is non-refundable and non-transferable.' },
    ],
  },
  uk: {
    country: 'UK', flag: '🇬🇧',
    bg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&auto=format&fit=crop',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=700&auto=format&fit=crop', cap: 'Big Ben, London' },
      { img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=700&auto=format&fit=crop', cap: 'Tower Bridge' },
      { img: 'https://images.unsplash.com/photo-1543832923-44667a44c804?w=700&auto=format&fit=crop', cap: 'Scottish Highlands' },
      { img: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=700&auto=format&fit=crop', cap: 'Oxford' },
    ],
    plans: [
      { name: 'Standard Visitor Visa', type: 'Sticker', stay: '180 Days', validity: '6 Months', days: 21, price: '₹12,400', fees: '₹4,499 (fees + tax)', cat: 'sticker' },
      { name: 'Long-Term Visitor Visa', type: 'Sticker', stay: '180 Days', validity: '2–10 Years', days: 15, price: '₹24,800', fees: '₹6,999 (fees + tax)', cat: 'sticker' },
    ],
    specificFaqs: [
      { q: 'Can I apply for a UK 10-year visa directly?', a: 'Yes, if you can demonstrate a frequent and sustained need to visit the UK.' },
      { q: 'Is there a fast-track service for UK visa?', a: 'Yes, Priority (5 days) and Super Priority (24h) services are available at an extra cost.' },
    ],
  },
  schengen: {
    country: 'Schengen (Europe)', flag: '🇪🇺',
    bg: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&auto=format&fit=crop',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=700&auto=format&fit=crop', cap: 'Eiffel Tower, Paris' },
      { img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=700&auto=format&fit=crop', cap: 'Rome, Italy' },
      { img: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=700&auto=format&fit=crop', cap: 'Barcelona, Spain' },
      { img: 'https://images.unsplash.com/photo-1508050919630-b135583b29ab?w=700&auto=format&fit=crop', cap: 'Amsterdam' },
    ],
    plans: [
      { name: 'Tourist Visa (Type C)', type: 'Sticker', stay: '90 Days', validity: '90 Days in 180 Days', days: 25, price: '₹7,200', fees: '₹2,999 (fees + tax)', cat: 'sticker' },
      { name: 'Business Visa (Type C)', type: 'Sticker', stay: '90 Days', validity: '90 Days in 180 Days', days: 25, price: '₹7,200', fees: '₹2,999 (fees + tax)', cat: 'sticker' },
    ],
    specificFaqs: [
      { q: 'Which country should I apply to for Schengen visa?', a: 'Apply to the country of your primary destination or where you stay the longest.' },
      { q: 'Do I need an interview for Schengen visa?', a: 'Biometrics are required, but a formal interview is usually only for specific cases.' },
    ],
  },
  maldives: {
    country: 'Maldives', flag: '🇲🇻',
    bg: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&auto=format&fit=crop',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=700&auto=format&fit=crop', cap: 'Overwater Bungalows' },
      { img: 'https://images.unsplash.com/photo-1540202404-a2f29b5a4b71?w=700&auto=format&fit=crop', cap: 'Crystal Clear Lagoon' },
      { img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=700&auto=format&fit=crop', cap: 'Coral Reef Diving' },
      { img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=700&auto=format&fit=crop', cap: 'Sunset at Male' },
    ],
    plans: [
      { name: 'Tourist Visa (On Arrival)', type: 'On Arrival', stay: '30 Days', validity: '30 Days (Extendable)', days: 3, price: 'Free', fees: 'Free on Arrival', cat: 'on-arrival' },
      { name: 'Extended Tourist Visa',     type: 'Sticker',    stay: '90 Days', validity: '90 Days', days: 7, price: '₹2,500', fees: '₹999 (fees + tax)', cat: 'sticker' },
    ],
    specificFaqs: [
      { q: 'Do Indians need a visa for Maldives?', a: 'No, Indians get a free 30-day visa on arrival. No advance application needed.' },
      { q: 'Can I extend my Maldives visa?', a: 'Yes, tourist visa can be extended for another 60 days through the immigration department.' },
    ],
  },
  dubai: {
    country: 'Dubai', flag: '🇦🇪',
    bg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&auto=format&fit=crop',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&auto=format&fit=crop', cap: 'Burj Khalifa' },
      { img: 'https://images.unsplash.com/photo-1533395427226-788cee21cc9f?w=700&auto=format&fit=crop', cap: 'Dubai Marina' },
      { img: 'https://images.unsplash.com/photo-1548813395-4393bbbc3ab3?w=700&auto=format&fit=crop', cap: 'Desert Safari' },
      { img: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=700&auto=format&fit=crop', cap: 'Gold Souk' },
    ],
    plans: [
      { name: 'Tourist Visa (30 Days)', type: 'e-visa', stay: '30 Days', validity: '60 Days from Issue', days: 3, price: '₹4,500', fees: '₹1,999 (fees + tax)', cat: 'e-visa' },
      { name: 'Tourist Visa (60 Days)', type: 'e-visa', stay: '60 Days', validity: '90 Days from Issue', days: 3, price: '₹7,000', fees: '₹2,499 (fees + tax)', cat: 'e-visa' },
    ],
    specificFaqs: [
      { q: 'What is the difference between 30 and 60 day Dubai visa?', a: '30-day visa allows 30 days stay valid for 60 days from issue. 60-day allows 60 days stay valid for 90 days from issue.' },
      { q: 'Can I convert Dubai tourist visa to employment visa?', a: 'No, you must exit the UAE and apply for the appropriate work visa from your home country.' },
    ],
  },
  thailand: {
    country: 'Thailand', flag: '🇹🇭',
    bg: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1600&auto=format&fit=crop',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=700&auto=format&fit=crop', cap: 'Grand Palace, Bangkok' },
      { img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=700&auto=format&fit=crop', cap: 'Phi Phi Islands' },
      { img: 'https://images.unsplash.com/photo-1528181304800-2f1408198f29?w=700&auto=format&fit=crop', cap: 'Chiang Mai Temples' },
      { img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=700&auto=format&fit=crop', cap: 'Bangkok Floating Market' },
    ],
    plans: [
      { name: 'Tourist Visa (TR)', type: 'e-visa', stay: '30 Days', validity: '3 Months from Issue', days: 5, price: '₹2,800', fees: '₹999 (fees + tax)', cat: 'e-visa' },
      { name: 'Multiple Entry Visa', type: 'e-visa', stay: '30 Days per Entry', validity: '6 Months', days: 7, price: '₹5,500', fees: '₹1,499 (fees + tax)', cat: 'e-visa' },
    ],
    specificFaqs: [
      { q: 'Do Indians need a visa for Thailand?', a: 'Yes, Indians require a visa but Thailand offers a visa-on-arrival facility. We recommend getting an e-visa in advance for hassle-free entry.' },
      { q: 'Can I extend my Thailand tourist visa?', a: 'Yes, you can extend once for up to 30 more days at any immigration office for a fee.' },
    ],
  },
  malaysia: {
    country: 'Malaysia', flag: '🇲🇾',
    bg: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1600&auto=format&fit=crop',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=700&auto=format&fit=crop', cap: 'Petronas Towers, KL' },
      { img: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=700&auto=format&fit=crop', cap: 'Batu Caves' },
      { img: 'https://images.unsplash.com/photo-1506875184594-86cd4e22fd0b?w=700&auto=format&fit=crop', cap: 'Langkawi Beach' },
      { img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=700&auto=format&fit=crop', cap: 'George Town, Penang' },
    ],
    plans: [
      { name: 'Digital Arrival Card (MDAC)', type: 'e-visa', stay: '30 days', validity: 'Not Applicable', days: 1, price: '₹1', fees: '₹599 (fees + tax)', cat: 'e-visa' },
      { name: 'Tourist eVisa (30 Days)',      type: 'e-visa', stay: '30 Days', validity: '3 Months', days: 5, price: '₹2,500', fees: '₹999 (fees + tax)', cat: 'e-visa' },
    ],
    specificFaqs: [
      { q: 'How long is the visa-free entry period for Indian citizens?', a: 'Indian citizens currently require a visa or MDAC (Digital Arrival Card) to enter Malaysia. Check the latest government regulations.' },
      { q: 'Can I enter Malaysia without a valid passport?', a: 'No, a valid passport with at least 6 months validity is mandatory to enter Malaysia.' },
      { q: 'How will I receive my Malaysia Digital Arrival Card?', a: 'Your MDAC will be sent to your registered email address as a PDF document within 1 business day.' },
      { q: 'Can I track my MDAC application status?', a: 'Yes, you will receive real-time updates via email and SMS. You can also track through our website.' },
      { q: 'What is the Malaysia Digital Arrival Card (MDAC)?', a: 'MDAC is a mandatory digital arrival card for visitors entering Malaysia. It replaced the traditional landing card and must be filled before arrival.' },
      { q: 'When can I fill out the MDAC form?', a: 'You can fill out the MDAC form up to 3 days before your arrival date. We recommend applying at least 24 hours before your flight.' },
    ],
  },
  andaman: {
    country: 'Andaman', flag: '🇮🇳',
    bg: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1600&auto=format&fit=crop',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=700&auto=format&fit=crop', cap: 'Radhanagar Beach' },
      { img: 'https://images.unsplash.com/photo-1501959915551-4e8d30928317?w=700&auto=format&fit=crop', cap: 'Havelock Island' },
      { img: 'https://images.unsplash.com/photo-1540202404-a2f29b5a4b71?w=700&auto=format&fit=crop', cap: 'Coral Reef Diving' },
      { img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=700&auto=format&fit=crop', cap: 'Turquoise Lagoon' },
    ],
    plans: [
      { name: 'Domestic Travel Package',  type: 'Permit', stay: '30 Days', validity: '30 Days', days: 2, price: '₹1,200', fees: '₹499 (permit + processing)', cat: 'e-visa' },
      { name: 'Restricted Area Permit', type: 'Permit', stay: '45 Days', validity: '45 Days', days: 3, price: '₹2,000', fees: '₹799 (fees + tax)', cat: 'sticker' },
    ],
    specificFaqs: [
      { q: 'Do I need a permit for Andaman?', a: 'Indian nationals do not need a special permit for most Andaman islands but tribal reserves require a Restricted Area Permit (RAP).' },
    ],
  },
  lakshadweep: {
    country: 'Lakshadweep', flag: '🇮🇳',
    bg: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=1600&auto=format&fit=crop',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=700&auto=format&fit=crop', cap: 'Coral Lagoon' },
      { img: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=700&auto=format&fit=crop', cap: 'White Sand Beach' },
      { img: 'https://images.unsplash.com/photo-1540202404-a2f29b5a4b71?w=700&auto=format&fit=crop', cap: 'Snorkeling' },
      { img: 'https://images.unsplash.com/photo-1501959915551-4e8d30928317?w=700&auto=format&fit=crop', cap: 'Bangaram Island' },
    ],
    plans: [
      { name: 'Tourist Entry Permit', type: 'Permit', stay: '15 Days', validity: '15 Days', days: 7,  price: '₹1,500', fees: '₹499 (permit fee)', cat: 'e-visa' },
      { name: 'Extended Stay Permit', type: 'Permit', stay: '30 Days', validity: '30 Days', days: 10, price: '₹2,500', fees: '₹799 (fees + tax)', cat: 'sticker' },
    ],
    specificFaqs: [
      { q: 'Do I need a permit for Lakshadweep?', a: 'Yes, Indian nationals need a permit to visit Lakshadweep. Foreign nationals have limited access to specific islands only.' },
      { q: 'How do I get to Lakshadweep?', a: 'Lakshadweep is accessible by ship from Kochi or by air to Agatti island. We handle all travel arrangements.' },
    ],
  },
};

// ─── row icons ──────────────────────────────────────────────────────────────
const rowIcons: Record<string, string> = {
  'Visa Type': '🪪',
  'Stay Duration': '📅',
  'Visa Validity': '🛡️',
  'Processing Time': '⏳',
};

// ═══════════════════════════════════════════════════════════════════════════
export default function CountryVisa() {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  const navigate = useNavigate();
  const data = countrySlug ? visaData[countrySlug.toLowerCase()] : null;

  const [filter,    setFilter]    = useState('all');
  const [openFaq,   setOpenFaq]   = useState<number | null>(null);
  const [openReq,   setOpenReq]   = useState<number | null>(null);
  const [allFaqsOn, setAllFaqsOn] = useState(false);

  if (!data) return <Navigate to="/visa" />;

  const procDays  = data.plans[0]?.days ?? 10;
  const todayStr  = formatDate(new Date());
  const arriveStr = addDays(procDays);
  const allFaqs   = [...(data.specificFaqs ?? []), ...baseFaqs];
  const shownFaqs = allFaqsOn ? allFaqs : allFaqs.slice(0, 8);
  const cats      = ['all', ...Array.from(new Set(data.plans.map((p: any) => p.cat as string)))];
  const plans     = filter === 'all' ? data.plans : data.plans.filter((p: any) => p.cat === filter);

  return (
    <div className="min-h-screen" style={{ background: '#f5f7ff' }}>

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[78vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={data.bg} alt={data.country} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 100%)' }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="relative z-10 w-full px-6 md:px-16 lg:px-24 pb-20 pt-36"
        >
          <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="inline-block text-white text-[10px] font-black tracking-[0.4em] uppercase px-5 py-1.5 rounded-full mb-6"
            style={{ background: '#990011' }}
          >
            Official Visa Service
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl text-white font-black tracking-tighter mb-5 leading-tight max-w-4xl"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Apply for a {data.country}{' '}
            {data.plans[0]?.type === 'e-visa' ? 'E-visa' : 'Visa'}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed"
          >
            Get Your {data.country} Visa Approved in just{' '}
            <span className="font-black text-white">{procDays} days</span> with our hassle-free online process.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: <Shield size={13}/>,       label: '98% Success Rate' },
              { icon: <Clock size={13}/>,         label: 'Fast Processing' },
              { icon: <CheckCircle2 size={13}/>,  label: 'Secure & Reliable' },
            ].map(b => (
              <span key={b.label} className="flex items-center gap-2 text-white text-xs font-bold px-5 py-2.5 rounded-full border border-white/25" style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(10px)' }}>
                {b.icon}{b.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ══ VISA PLANS ════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 md:px-16 lg:px-24 bg-white">
        <FadeUp>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-8">
            Select a Visa Plan That Suits You
          </h2>

          {/* Filter pills */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className="px-8 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-300"
                style={filter===c
                  ? { background: '#2563eb', color: '#fff', boxShadow: '0 4px 14px rgba(37,99,235,0.35)' }
                  : { background: '#fff', color: '#64748b', border: '1.5px solid #e2e8f0' }
                }
              >
                {c === 'on-arrival' ? 'On Arrival' : c}
              </button>
            ))}
          </div>

          {/* Plan cards */}
          <div className="max-w-2xl mx-auto space-y-5">
            {plans.map((plan: any, i: number) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Card header: green left + blue right */}
                <div className="flex">
                  <div className="flex-1 px-6 py-4 flex items-center" style={{ background: '#22c55e' }}>
                    <span className="font-black text-white text-base">{plan.name} |</span>
                  </div>
                  <div className="px-6 py-4 flex items-center gap-2 shrink-0" style={{ background: '#2563eb', minWidth: 220 }}>
                    <span className="text-white text-lg">🏅</span>
                    <span className="text-white text-[13px] font-bold whitespace-nowrap">Get Your Visa in {plan.days} Days</span>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col md:flex-row bg-white relative overflow-hidden">
                  {/* Faint world-map watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span style={{ fontSize: 260, opacity: 0.025, lineHeight: 1 }}>🌍</span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 px-6 py-5 relative z-10">
                    {[
                      { label: 'Visa Type',       value: plan.type },
                      { label: 'Stay Duration',    value: plan.stay },
                      { label: 'Visa Validity',    value: plan.validity },
                      { label: 'Processing Time',  value: `${plan.days} Days` },
                    ].map(row => (
                      <div key={row.label} className="flex items-center justify-between py-3 border-b border-dashed border-gray-200 last:border-0">
                        <div className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                          <span className="text-lg w-6 text-center">{rowIcons[row.label]}</span>
                          {row.label}
                        </div>
                        <span className="font-bold text-sm" style={{ color: '#2563eb' }}>{row.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Dashed vertical divider */}
                  <div className="hidden md:block w-px border-l border-dashed border-gray-200 my-4 relative z-10" />

                  {/* Price panel */}
                  <div className="md:w-52 px-6 py-5 flex flex-col justify-between relative z-10">
                    <div>
                      <div className="text-3xl font-black text-gray-900">
                        {plan.price}
                        {plan.price !== 'Free' && <span className="text-base font-semibold text-gray-400 ml-1">/adult</span>}
                      </div>
                      <div className="text-xs text-gray-400 mt-1 mb-4">{plan.fees}</div>
                      <button className="text-xs font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: '#2563eb' }}>
                        View Details
                      </button>
                    </div>
                    <button
                      onClick={() => navigate(`/visa-application?country=${encodeURIComponent(data.country)}&plan=${encodeURIComponent(plan.name)}`)}
                      className="mt-5 w-full text-white font-bold text-sm py-3 rounded-full transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ background: '#2563eb' }}
                    >
                      Start Application
                    </button>
                  </div>
                </div>

                {/* Blue bottom strip */}
                <div className="h-1.5" style={{ background: 'linear-gradient(to right, #2563eb, #7c3aed)' }} />
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <div className="text-center mt-8 space-y-2">
            <p className="text-gray-400 text-sm">📌 More Options: Business Visa, Group Travel, Long-Term Stay</p>
            <button className="font-bold text-sm hover:underline underline-offset-2 transition-all" style={{ color: '#2563eb' }}>
              Explore All Visas
            </button>
          </div>
        </FadeUp>
      </section>

      {/* ══ 3 EASY STEPS ══════════════════════════════════════════════════ */}
      <section className="py-16 px-6 md:px-16 lg:px-24" style={{ background: '#eef2ff' }}>
        <FadeUp>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-2">
            Get Your {data.country} Visa in 3 Easy Steps
          </h2>
          <p className="text-gray-500 text-center text-sm mb-8">
            Our streamlined process makes getting your{' '}
            <span className="font-bold" style={{ color: '#2563eb' }}>{data.country}</span> visa quick and simple
          </p>

          {/* Date timeline */}
          <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
            <span className="text-sm font-bold px-5 py-2 rounded-full" style={{ background: '#dcfce7', color: '#15803d' }}>
              Start: {todayStr}
            </span>
            <ArrowRight size={16} className="text-gray-400" />
            <span className="text-sm font-bold px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700">
              Visa Arrived by: {arriveStr}
            </span>
          </div>

          {/* Steps layout: left icon bar + right cards */}
          <div className="max-w-xl mx-auto flex gap-5">
            {/* Vertical icon bar */}
            <div className="flex flex-col items-center w-14 shrink-0">
              <div className="flex flex-col items-center justify-around py-5 px-3 gap-10 rounded-3xl flex-1" style={{ background: 'linear-gradient(to bottom, #4f46e5, #7c3aed)' }}>
                {['✉️', '📋', '🎫'].map((icon, i) => (
                  <div key={i} className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Step cards */}
            <div className="flex flex-col gap-3 flex-1">
              {[
                { title: 'Start & submit your application',   desc: 'Share travel details and make a secure payment in just 2 minutes' },
                { title: 'Expert review and submission',       desc: 'Our experts review and submit your application to the embassy on your behalf.' },
                { title: 'Visa delivered on time',            desc: 'Relax as we deliver your visa on time for a stress-free journey.' },
              ].map((step, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.45 }}
                  className="bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100"
                >
                  <h4 className="font-black text-gray-900 text-sm mb-1">{step.title}</h4>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: '#2563eb' }}>{step.desc}</p>
                  <div className="w-8 h-0.5 rounded" style={{ background: '#2563eb' }} />
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ══ GALLERY ═══════════════════════════════════════════════════════ */}
      <section className="py-10 px-6 md:px-16 lg:px-24 bg-white">
        <FadeUp>
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
            <div className="flex overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {data.gallery.map((item: any, i: number) => (
                <motion.div key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative shrink-0 group overflow-hidden"
                  style={{ width: 260, height: 180 }}
                >
                  <img src={item.img} alt={item.cap} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
                  <p className="absolute bottom-3 left-3 text-white text-xs font-bold">{item.cap}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ══ READY TO START CTA ════════════════════════════════════════════ */}
      <section className="py-14 px-6 bg-white border-t border-gray-100">
        <FadeUp className="text-center">
          <h2 className="text-2xl font-black mb-3" style={{ color: '#2563eb' }}>
            Ready to start your application?
          </h2>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-7">
            <span>• Expected delivery date: {arriveStr}</span>
            <span>• Track your application anytime</span>
          </div>
          <button
            onClick={() => navigate(`/visa-application?country=${encodeURIComponent(data.country)}`)}
            className="text-white font-bold text-sm px-12 py-3.5 rounded-full transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-xl"
            style={{ background: '#2563eb' }}
          >
            Start Your Application
          </button>
        </FadeUp>
      </section>

      {/* ══ REQUIREMENTS ══════════════════════════════════════════════════ */}
      <section className="py-16 px-6 md:px-16 lg:px-24 bg-white border-t border-gray-100">
        <FadeUp>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-2">
            Essential Requirements for a {data.country} Visa
          </h2>
          <p className="text-gray-400 text-sm text-center mb-10">
            Make sure you have all the required documents before starting your application
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {reqList.map((req, i) => (
              <motion.div key={req.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.05 }}
              >
                <button
                  onClick={() => setOpenReq(openReq === i ? null : i)}
                  className="w-full flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${codeStyle[req.code]}`}>
                      {req.code}
                    </span>
                    <span className="text-xs font-semibold text-gray-700 leading-tight">{req.label}</span>
                  </div>
                  <ChevronDown size={14} className={`text-gray-400 shrink-0 ml-1 transition-transform duration-300 ${openReq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openReq === i && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="px-3.5 pt-2.5 pb-3 text-[11px] text-gray-500 leading-relaxed bg-gray-50 border-x border-b border-gray-200 rounded-b-xl -mt-1"
                    >
                      {req.desc}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-8">
            {Object.entries(codeLabel).map(([code, label]) => (
              <div key={code} className="flex items-center gap-2 text-xs text-gray-500">
                <span className={`w-5 h-5 rounded flex items-center justify-center font-black text-[10px] ${codeStyle[code]}`}>{code}</span>
                {label}
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ══ WHY CHOOSE ════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 md:px-16 lg:px-24" style={{ background: '#f8faff' }}>
        <FadeUp>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-1">
            Why Choose GotoHolidays?
          </h2>
          <p className="text-center text-gray-400 text-sm italic mb-14">
            "Your Trusted Partner for Hassle-Free Visa Processing"
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-3xl mx-auto">
            {[
              { icon: <Award size={28} strokeWidth={1.5} />,      title: '98% approval success rate',            sub: 'Highest success rate in the industry' },
              { icon: <Headphones size={28} strokeWidth={1.5} />, title: '24/7 support via phone and chat',      sub: 'Round-the-clock customer support' },
              { icon: <Users size={28} strokeWidth={1.5} />,      title: 'Dedicated experts to review your docs', sub: 'Professional visa experts ensure perfection' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4 text-gray-500">{item.icon}</div>
                <h4 className="font-black text-gray-900 text-sm mb-1 leading-snug">{item.title}</h4>
                <p className="text-gray-400 text-xs">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ══ REVIEWS ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 md:px-16 lg:px-24 bg-white">
        <FadeUp>
          {/* Google header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                <span className="font-black text-sm" style={{ background: 'linear-gradient(135deg,#4285F4,#EA4335,#FBBC05,#34A853)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>G</span>
              </div>
              <span className="text-sm font-semibold text-gray-600">Google Rating</span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="#f59e0b" className="text-amber-400" />)}
              <span className="font-black text-xl ml-1 text-gray-900">4.9</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">Best Visa Assistance in India</h2>
            <p className="text-gray-400 text-sm">Top rated visa service on Google & reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto items-start">
            {/* Left */}
            <div className="space-y-3">
              {allReviews.slice(0, 3).map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                  className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full text-white flex items-center justify-center font-black text-sm shrink-0" style={{ background: '#2563eb' }}>{r.init}</div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{r.name}</p>
                      <Stars n={r.rating} />
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{r.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Center image */}
            <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 300 }}>
              <img src={data.gallery[1]?.img || data.bg} alt={data.country} className="w-full h-full object-cover" style={{ minHeight: 300 }} referrerPolicy="no-referrer" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <button onClick={() => navigate(`/visa-application?country=${encodeURIComponent(data.country)}`)}
                  className="text-white font-bold text-xs px-7 py-3 rounded-xl shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
                  style={{ background: '#2563eb' }}
                >
                  Get Your Visa Now
                </button>
              </div>
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold whitespace-nowrap px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}>
                {data.gallery[1]?.cap || data.country}
              </p>
            </div>

            {/* Right */}
            <div className="space-y-3">
              {allReviews.slice(3).map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                  className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full text-white flex items-center justify-center font-black text-sm shrink-0" style={{ background: '#2563eb' }}>{r.init}</div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{r.name}</p>
                      <Stars n={r.rating} />
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{r.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ══ FAQS ══════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 md:px-16 lg:px-24" style={{ background: '#f8faff' }}>
        <FadeUp>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-10">
            FAQs about {data.country} Visas
          </h2>
          <div className="max-w-2xl mx-auto space-y-2">
            {shownFaqs.map((faq: any, i: number) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.04 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 text-sm pr-4">{faq.q}</span>
                  <ChevronDown size={16} className={`text-gray-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          {allFaqs.length > 8 && (
            <div className="text-center mt-7">
              <button onClick={() => setAllFaqsOn(!allFaqsOn)}
                className="text-sm font-bold hover:underline underline-offset-2 transition-all"
                style={{ color: '#2563eb' }}
              >
                {allFaqsOn ? 'Show Less' : 'Expand All FAQs'}
              </button>
            </div>
          )}
        </FadeUp>
      </section>

      {/* ══ CONTACT STRIP ═════════════════════════════════════════════════ */}
      <section className="py-14 px-6 md:px-16 bg-white border-t border-gray-100">
        <FadeUp className="flex flex-col md:flex-row items-center justify-between max-w-3xl mx-auto gap-7">
          <div>
            <h3 className="text-xl font-black text-gray-900 mb-1">Need Help?</h3>
            <p className="text-gray-400 text-sm">Our {data.country} visa experts are available 24/7</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a href="tel:9840454061" className="flex items-center gap-2.5 text-white font-bold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-all" style={{ background: '#111827' }}>
              <Phone size={15}/> +91 984045 4061
            </a>
            <a href="https://wa.me/8939423442" className="flex items-center gap-2.5 text-white font-bold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-all" style={{ background: '#25D366' }}>
              <MessageCircle size={15} fill="white"/> WhatsApp
            </a>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
