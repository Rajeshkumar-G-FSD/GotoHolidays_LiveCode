import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  ChevronDown, Phone, MessageCircle, Shield, Star,
  CheckCircle2, Clock, Award, Headphones, Users, Binoculars,
  Landmark, BookOpen, FileBadge, Building2, Mail, FileCheck2,
  FileText, Image as ImageIcon, Receipt, ClipboardList, Plane, ShieldCheck,
  FileSignature, CalendarClock, Fingerprint, PackageCheck,
  CreditCard, Stamp, Heart, FileX, FileMinus, Globe, XCircle, Route, GraduationCap,
  ScrollText, TrendingUp, Home,
} from 'lucide-react';
import USAVisaSection from '../components/visa/USAVisaSection';
import LoadingOverlay from '../components/visa/LoadingOverlay';
import type { VisaPlan } from '../components/visa/VisaPlanCard';
import type { TimelineStepData } from '../components/visa/TimelineStep';
import type { DocumentItem } from '../components/visa/DocumentCard';
import type { AddOnItem } from '../components/visa/AddOnCard';

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

// ─── 4-step timeline data ───────────────────────────────────────────────────
const stepIcons: ReactNode[] = [
  <FileSignature size={18} className="text-indigo-600" />,
  <CalendarClock size={18} className="text-indigo-600" />,
  <Fingerprint size={18} className="text-indigo-600" />,
  <PackageCheck size={18} className="text-indigo-600" />,
];

function buildSteps(country: string, simplifiedCentreVisit?: boolean): TimelineStepData[] {
  const consulate = country === 'USA' ? 'US consulate' : `${country}'s consulate`;
  return [
    {
      title: 'Start & submit your application',
      desc: 'Complete your application accurately on our user-friendly platform.',
    },
    {
      title: 'Expert review and appointment booking',
      desc: 'Your designated visa expert reviews your application and books your appointments at the visa centre.',
    },
    simplifiedCentreVisit
      ? {
          title: 'Visit visa application centre',
          desc: 'Visit the visa centre to submit biometrics with our guidance and support.',
        }
      : {
          title: `Visit visa application centre followed by another appointment at the ${consulate}`,
          desc: `Visit the visa centre to submit biometrics with our guidance and support. Once biometrics are done, visit the ${consulate} on your visa interview day for your final interview.`,
        },
    {
      title: 'Visa delivered on time',
      desc: 'Relax as we ensure your visa is processed promptly and delivered on time.',
    },
  ];
}

// ─── document requirement data ─────────────────────────────────────────────
const USA_DOCUMENTS: DocumentItem[] = [
  { label: 'Bank Statement', icon: <Landmark size={17} />, desc: "Last 6 months' bank statement showing sufficient financial standing." },
  { label: 'Passport Front Page', icon: <BookOpen size={17} />, desc: 'Clear scan of the data page of your valid passport.' },
  { label: 'ITR', icon: <FileBadge size={17} />, desc: 'Income Tax Returns for the last 2–3 financial years.' },
  { label: 'Company Registration Proof', icon: <Building2 size={17} />, desc: 'Proof of business registration, required if you are self-employed.' },
  { label: 'Sponsor Cover Letter', icon: <Mail size={17} />, desc: 'Cover letter from your sponsor explaining the purpose of sponsorship.' },
  { label: 'Employer NOC/ Leave Approval Letter', icon: <FileCheck2 size={17} />, desc: 'No-objection or approved leave letter issued by your employer.' },
  { label: 'Cover letter', icon: <FileText size={17} />, desc: 'Personal letter explaining the purpose and itinerary of your visit.' },
  { label: 'Invitation Letter', icon: <Mail size={17} />, desc: 'Invitation letter if visiting friends, family, or business contacts.' },
  { label: 'Passport Back Page', icon: <BookOpen size={17} />, desc: 'Scan of the back page of your passport.' },
  { label: 'Passport Size Photograph', icon: <ImageIcon size={17} />, desc: 'Recent passport-size photograph as per US visa specifications.' },
  { label: 'Salary Slips', icon: <Receipt size={17} />, desc: 'Last 3 months salary slips from your employer.' },
  { label: 'Sponsor Bank Statement', icon: <Landmark size={17} />, desc: "Sponsor's bank statement if they are funding your trip." },
  { label: 'DS-160 Form', icon: <ClipboardList size={17} />, desc: 'Confirmation page of your completed DS-160 online application.' },
];

const CANADA_DOCUMENTS: DocumentItem[] = [
  { label: 'Bank Statement', icon: <Landmark size={17} />, desc: 'Last 6 months bank statement showing financial stability.' },
  { label: 'Passport Front Page', icon: <BookOpen size={17} />, desc: 'Clear scan of the data page of your valid passport.' },
  { label: 'ITR', icon: <FileBadge size={17} />, desc: 'Income Tax Returns for the last 2–3 financial years.' },
  { label: 'Company Registration Proof', icon: <Building2 size={17} />, desc: 'Proof of business registration, required if you are self-employed.' },
  { label: 'Sponsor Cover Letter', icon: <Mail size={17} />, desc: 'Cover letter from your sponsor explaining the purpose of sponsorship.' },
  { label: 'Flight Bookings', icon: <Plane size={17} />, desc: 'Confirmed round-trip flight reservation (not necessarily paid).' },
  { label: 'Hotel Confirmation', icon: <Building2 size={17} />, desc: 'Hotel booking or accommodation confirmation for the stay.' },
  { label: 'Aadhar Card', icon: <CreditCard size={17} />, desc: 'Copy of your Aadhar Card as identity proof.' },
  { label: 'Visa Entry Exit Stamp', icon: <Stamp size={17} />, desc: 'Copies of stamps from previous international travel.' },
  { label: 'Marriage certificate', icon: <Heart size={17} />, desc: "Marriage certificate, if applicable, to support your family status." },
  { label: 'Death Certificate', icon: <FileX size={17} />, desc: "Death certificate of a spouse, where relevant to your application." },
  { label: 'Employer NOC/ Leave Approval Letter', icon: <FileCheck2 size={17} />, desc: 'No-objection or approved leave letter issued by your employer.' },
  { label: 'Cover letter', icon: <FileText size={17} />, desc: 'Personal letter explaining the purpose and itinerary of your visit.' },
  { label: 'Divorce Certificate', icon: <FileMinus size={17} />, desc: 'Divorce certificate, if applicable, to support your family status.' },
  { label: 'Invitation Letter', icon: <Mail size={17} />, desc: 'Invitation letter if visiting friends, family, or business contacts.' },
  { label: 'Other Country Visa', icon: <Globe size={17} />, desc: 'Copies of valid visas for other countries, if you hold any.' },
  { label: 'Passport Back Page', icon: <BookOpen size={17} />, desc: 'Scan of the back page of your passport.' },
  { label: 'Passport Size Photograph', icon: <ImageIcon size={17} />, desc: 'Recent passport-size photograph as per embassy specifications.' },
  { label: 'Salary Slips', icon: <Receipt size={17} />, desc: 'Last 3 months salary slips from your employer.' },
  { label: 'Rejection Letter', icon: <XCircle size={17} />, desc: 'Copy of any previous visa rejection letter, if applicable.' },
  { label: 'Travel Itinerary', icon: <Route size={17} />, desc: 'Planned day-by-day itinerary for your trip.' },
  { label: 'Sponsor Bank Statement', icon: <Landmark size={17} />, desc: "Sponsor's bank statement if they are funding your trip." },
  { label: 'Student NOC', icon: <GraduationCap size={17} />, desc: 'No-objection certificate from your institution, if you are a student.' },
];

const UK_DOCUMENTS: DocumentItem[] = [
  { label: 'Bank Statement', icon: <Landmark size={17} />, desc: 'Last 6 months bank statement showing financial stability.' },
  { label: 'Passport Front Page', icon: <BookOpen size={17} />, desc: 'Clear scan of the data page of your valid passport.' },
  { label: 'Leave Approval Letter', icon: <FileCheck2 size={17} />, desc: 'Letter from employer approving your leave of absence.' },
  { label: 'ITR', icon: <FileBadge size={17} />, desc: 'Income Tax Returns for the last 2–3 financial years.' },
  { label: 'Company Registration Proof', icon: <Building2 size={17} />, desc: 'Proof of business registration, required if you are self-employed.' },
  { label: 'Sponsor Cover Letter', icon: <Mail size={17} />, desc: 'Cover letter from your sponsor explaining the purpose of sponsorship.' },
  { label: 'Visa Application Form', icon: <ClipboardList size={17} />, desc: 'Completed and signed visa application form.' },
  { label: 'Appointment Confirmation', icon: <CalendarClock size={17} />, desc: 'Confirmation of your booked visa centre appointment.' },
  { label: 'Flight Bookings', icon: <Plane size={17} />, desc: 'Confirmed round-trip flight reservation (not necessarily paid).' },
  { label: 'Hotel Confirmation', icon: <Building2 size={17} />, desc: 'Hotel booking or accommodation confirmation for the stay.' },
  { label: 'Aadhar Card', icon: <CreditCard size={17} />, desc: 'Copy of your Aadhar Card as identity proof.' },
  { label: 'Visa Entry Exit Stamp', icon: <Stamp size={17} />, desc: 'Copies of stamps from previous international travel.' },
  { label: 'Marriage certificate', icon: <Heart size={17} />, desc: 'Marriage certificate, if applicable, to support your family status.' },
  { label: 'Company Bank Statement', icon: <Landmark size={17} />, desc: "Your company's bank statement, if self-employed." },
  { label: 'Birth Certificate', icon: <ScrollText size={17} />, desc: 'Birth certificate for identity and age verification, where required.' },
  { label: 'Cover letter', icon: <FileText size={17} />, desc: 'Personal letter explaining the purpose and itinerary of your visit.' },
  { label: 'Invitation Letter', icon: <Mail size={17} />, desc: 'Invitation letter if visiting friends, family, or business contacts.' },
  { label: 'No Objection Certificate', icon: <FileCheck2 size={17} />, desc: 'No-objection certificate from your employer or institution.' },
  { label: 'Passport Back Page', icon: <BookOpen size={17} />, desc: 'Scan of the back page of your passport.' },
  { label: 'Passport Size Photograph', icon: <ImageIcon size={17} />, desc: 'Recent passport-size photograph as per embassy specifications.' },
  { label: 'Salary Slips', icon: <Receipt size={17} />, desc: 'Last 3 months salary slips from your employer.' },
  { label: 'Travel Insurance', icon: <ShieldCheck size={17} />, desc: 'Travel insurance policy with minimum ₹5 lakh coverage.' },
  { label: 'Proof Of Investment', icon: <TrendingUp size={17} />, desc: 'Proof of investments such as mutual funds, stocks, or fixed deposits.' },
  { label: 'Student ID Proof', icon: <GraduationCap size={17} />, desc: 'Valid student ID card, if you are currently enrolled in education.' },
  { label: 'Residence Proof', icon: <Home size={17} />, desc: 'Utility bill or rental agreement confirming your current address.' },
  { label: 'Sponsor Passport', icon: <BookOpen size={17} />, desc: "Copy of your sponsor's passport, if they are funding your trip." },
  { label: 'Sponsor IT Return', icon: <FileBadge size={17} />, desc: "Sponsor's Income Tax Returns for the last 2–3 financial years." },
  { label: 'Sponsor Bank Statement', icon: <Landmark size={17} />, desc: "Sponsor's bank statement if they are funding your trip." },
];

const DEFAULT_DOCUMENTS: DocumentItem[] = [
  { label: 'Passport Front Page', icon: <BookOpen size={17} />, desc: 'Clear scan of the data page of your valid passport.' },
  { label: 'Passport Back Page', icon: <BookOpen size={17} />, desc: 'Scan of the back page of your passport.' },
  { label: 'Flight Bookings', icon: <Plane size={17} />, desc: 'Confirmed round-trip flight reservation (not necessarily paid).' },
  { label: 'Hotel Confirmation', icon: <Building2 size={17} />, desc: 'Hotel booking or accommodation confirmation for the stay.' },
  { label: 'Bank Statement', icon: <Landmark size={17} />, desc: 'Last 6 months bank statement showing financial stability.' },
  { label: 'Leave Approval Letter', icon: <FileCheck2 size={17} />, desc: 'Letter from employer approving your leave of absence.' },
  { label: 'ITR', icon: <FileBadge size={17} />, desc: 'Income Tax Returns for the last 2–3 financial years.' },
  { label: 'Passport Size Photograph', icon: <ImageIcon size={17} />, desc: 'Recent passport-size photograph as per embassy specifications.' },
  { label: 'Cover Letter', icon: <FileText size={17} />, desc: 'Personal cover letter explaining purpose and itinerary of visit.' },
  { label: 'Invitation Letter', icon: <Mail size={17} />, desc: 'Invitation letter if visiting friends, family, or business contacts.' },
  { label: 'Salary Slips', icon: <Receipt size={17} />, desc: 'Last 3 months salary slips from your employer.' },
  { label: 'Travel Insurance', icon: <ShieldCheck size={17} />, desc: 'Travel insurance policy with minimum ₹5 lakh coverage.' },
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

const allReviews = [
  { name: 'Arjun Malhotra', rating: 5, text: 'Very smooth process, and they guided me at every step.', init: 'A' },
  { name: 'Sneha Joshi',    rating: 5, text: 'They simplified the visa process for my trip. Excellent!', init: 'S' },
  { name: 'Gunasimran',     rating: 4, text: 'Absolutely brilliant support. Got my visa quickly.', init: 'G' },
  { name: 'Ananya Sharma',  rating: 4, text: 'GotoHolidays made my visa process smooth and quick.', init: 'A' },
  { name: 'Rohit Mehta',    rating: 4, text: 'Fast service and clear instructions. Got my visa hassle-free.', init: 'R' },
  { name: 'Priya Desai',    rating: 5, text: 'Very professional team. I got my visa without any stress.', init: 'P' },
];

const VISA_TRANSFER_ADDON: AddOnItem = {
  name: 'Visa Transfer',
  processingTime: '2 working days',
  validityNote: '30 days post issue',
  price: 1180,
  recommended: true,
};

// ─── per-country data ───────────────────────────────────────────────────────
interface CountryData {
  country: string;
  flag: string;
  bg: string;
  gallery: { img: string; cap: string }[];
  plans: VisaPlan[];
  documents: DocumentItem[];
  specificFaqs: { q: string; a: string }[];
  simplifiedCentreVisit?: boolean;
  useRadioSelector?: boolean;
  addOns?: AddOnItem[];
}

const visaData: Record<string, CountryData> = {
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
      { name: 'Tourist Visa (B2)', type: 'Sticker', stay: '180 Days', validity: '10 Years', days: 30, price: 15540, fees: 5999, cat: 'sticker' },
      { name: 'Business Visa (B1)', type: 'Sticker', stay: '180 Days', validity: '10 Years', days: 30, price: 15540, fees: 5999, cat: 'sticker' },
    ],
    documents: USA_DOCUMENTS,
    specificFaqs: [
      { q: 'How early can I get a US visa appointment?', a: 'Appointment dates vary. We offer monitoring services to help you find the earliest possible slots.' },
      { q: 'Is the US visa fee refundable?', a: 'No, the US Embassy visa fee is non-refundable and non-transferable.' },
    ],
  },
  canada: {
    country: 'Canada', flag: '🇨🇦',
    bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&auto=format&fit=crop', cap: 'Niagara Falls' },
      { img: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=700&auto=format&fit=crop', cap: 'Rocky Mountains' },
      { img: 'https://images.unsplash.com/photo-1543862475-eb7ee6dd2e4d?w=700&auto=format&fit=crop', cap: 'Lake Louise' },
      { img: 'https://images.unsplash.com/photo-1493699441810-e84bf38df96f?w=700&auto=format&fit=crop', cap: 'Toronto' },
    ],
    plans: [
      { name: 'Tourist Visa Multiple Entry', type: 'sticker', stay: '180 Days', validity: '10 Years', days: 60, price: 12999, fees: 4999, cat: 'sticker' },
    ],
    documents: CANADA_DOCUMENTS,
    simplifiedCentreVisit: true,
    specificFaqs: [
      { q: 'What is a Canada eTA?', a: 'An eTA is an electronic travel authorization for visa-exempt foreign nationals traveling to Canada by air.' },
      { q: 'Can I extend my Canada visitor visa?', a: 'Yes, you can apply for an extension from within Canada before your authorized stay expires.' },
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
      { name: 'Tourist Visa Single/Multiple Entry', type: 'sticker', stay: '180 Days', validity: '6 Months', days: 35, price: 18199, fees: 4999, cat: 'sticker' },
    ],
    documents: UK_DOCUMENTS,
    simplifiedCentreVisit: true,
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
      { name: 'Appointment & Document Assistance (Easy Apply)', type: 'Assistance', stay: '90 Days', validity: '180 days post issue', days: 10, price: 4280, fees: 1000, cat: 'sticker', breakdown: { visaFee: 0, vfsFee: 3100, serviceFee: 1000, gstPercent: 18 } },
      { name: 'Appointment & Document Assistance', type: 'Assistance', stay: '90 Days', validity: 'Decided by embassy', days: 20, price: 4870, fees: 1500, cat: 'sticker', breakdown: { visaFee: 0, vfsFee: 3100, serviceFee: 1500, gstPercent: 18 } },
      { name: 'Meet & Assist', type: 'Assistance', stay: '90 Days', validity: 'Decided by embassy', days: 15, price: 6050, fees: 2500, cat: 'sticker', breakdown: { visaFee: 0, vfsFee: 3100, serviceFee: 2500, gstPercent: 18 } },
    ],
    documents: DEFAULT_DOCUMENTS,
    useRadioSelector: true,
    addOns: [VISA_TRANSFER_ADDON],
    specificFaqs: [
      { q: 'Which country should I apply to for Schengen visa?', a: 'Apply to the country of your primary destination or where you stay the longest.' },
      { q: 'Do I need an interview for Schengen visa?', a: 'Biometrics are required, but a formal interview is usually only for specific cases.' },
    ],
  },
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
      { name: 'Tourist Visa', type: 'e-visa', stay: '90 Days', validity: '1 Year', days: 45, price: 10500, fees: 4999, cat: 'e-visa' },
      { name: 'Business Visa', type: 'e-visa', stay: '90 Days', validity: '1 Year', days: 45, price: 10500, fees: 4999, cat: 'e-visa' },
    ],
    documents: DEFAULT_DOCUMENTS,
    specificFaqs: [
      { q: 'Is a medical exam required for Australia visa?', a: 'Usually not for stays under 3 months, unless you are over 75 years old.' },
      { q: 'What is a Subclass 600 visa?', a: 'It is a visitor visa that allows travel for tourism or business visitor activities.' },
    ],
  },
  newzealand: {
    country: 'New Zealand', flag: '🇳🇿',
    bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop', cap: 'Milford Sound' },
      { img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=700&auto=format&fit=crop', cap: 'Lake Tekapo' },
      { img: 'https://images.unsplash.com/photo-1536599424735-b02b92708b0f?w=700&auto=format&fit=crop', cap: 'Tongariro National Park' },
      { img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&auto=format&fit=crop', cap: 'Adventure Capital' },
    ],
    plans: [
      { name: 'Visitor Visa', type: 'Sticker', stay: '180 Days', validity: '3 Years', days: 30, price: 9916, fees: 1200, cat: 'sticker', breakdown: { visaFee: 8500, dependentFee: 2000, serviceFee: 1200, gstPercent: 18 } },
      { name: 'eVisa', type: 'e-visa', stay: '180 Days', validity: '2 Years', days: 7, price: 3326, fees: 700, cat: 'e-visa', breakdown: { visaFee: 2500, dependentFee: 1200, serviceFee: 700, gstPercent: 18 } },
    ],
    documents: DEFAULT_DOCUMENTS,
    useRadioSelector: true,
    addOns: [VISA_TRANSFER_ADDON],
    specificFaqs: [
      { q: 'Do I need a visitor visa for New Zealand?', a: 'Indian citizens require a visitor visa for New Zealand tourism or business visits.' },
      { q: 'What is the New Zealand eVisa?', a: 'The eVisa is an electronic visa that allows you to enter New Zealand. It is the faster alternative to the traditional sticker visa.' },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
export default function CountryVisa() {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const instantReveal = Boolean((location.state as { instantReveal?: boolean } | null)?.instantReveal);
  const data = countrySlug ? visaData[countrySlug.toLowerCase()] : null;

  const [openFaq,   setOpenFaq]   = useState<number | null>(null);
  const [allFaqsOn, setAllFaqsOn] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'loading' | 'revealed'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setPhase('idle'); }, [countrySlug]);

  useEffect(() => {
    if (phase === 'revealed') {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [phase]);

  if (!data) return <Navigate to="/visa" />;

  const procDays  = data.plans[0]?.days ?? 10;
  const todayStr  = formatDate(new Date());
  const arriveStr = addDays(procDays);
  const allFaqs   = [...(data.specificFaqs ?? []), ...baseFaqs];
  const shownFaqs = allFaqsOn ? allFaqs : allFaqs.slice(0, 8);
  const steps     = buildSteps(data.country, data.simplifiedCentreVisit);

  const goToApplication = (planName?: string, addOnNames?: string[]) => {
    const q = new URLSearchParams({ country: data.country });
    if (planName) q.set('plan', planName);
    if (addOnNames?.length) q.set('addons', addOnNames.join(','));
    navigate(`/visa-application?${q.toString()}`);
  };

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
            className="flex flex-wrap items-center gap-3 mb-8"
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
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
            <motion.button
              onClick={() => phase === 'idle' && setPhase(instantReveal ? 'revealed' : 'loading')}
              whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(37,99,235,0.5)' }}
              whileTap={{ scale: 0.97 }}
              disabled={phase !== 'idle'}
              className="flex items-center gap-2.5 text-white font-bold text-sm px-9 py-4 rounded-full transition-colors duration-300 disabled:opacity-70"
              style={{ background: '#2563eb' }}
            >
              <Binoculars size={18} />
              Explore Visa Details
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      <AnimatePresence>
        {phase === 'loading' && (
          <LoadingOverlay country={data.country} onComplete={() => setPhase('revealed')} />
        )}
      </AnimatePresence>

      {phase === 'revealed' && (
        <>
          <USAVisaSection
            ref={sectionRef}
            country={data.country}
            plans={data.plans}
            steps={steps}
            stepIcons={stepIcons}
            documents={data.documents}
            startDate={todayStr}
            arriveDate={arriveStr}
            onStartApplication={(planName, addOnNames) => goToApplication(planName, addOnNames)}
            onViewDetails={(planName) => goToApplication(planName)}
            useRadioSelector={data.useRadioSelector}
            addOns={data.addOns}
          />

          {/* ══ GALLERY ═══════════════════════════════════════════════════ */}
          <section className="py-10 px-6 md:px-16 lg:px-24 bg-white">
            <FadeUp>
              <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                <div className="flex overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                  {data.gallery.map((item, i) => (
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

          {/* ══ READY TO START CTA ════════════════════════════════════════ */}
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
                onClick={() => goToApplication()}
                className="text-white font-bold text-sm px-12 py-3.5 rounded-full transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-xl"
                style={{ background: '#2563eb' }}
              >
                Start Your Application
              </button>
            </FadeUp>
          </section>

          {/* ══ WHY CHOOSE ════════════════════════════════════════════════ */}
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

          {/* ══ REVIEWS ═══════════════════════════════════════════════════ */}
          <section className="py-16 px-6 md:px-16 lg:px-24 bg-white">
            <FadeUp>
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

                <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 300 }}>
                  <img src={data.gallery[1]?.img || data.bg} alt={data.country} className="w-full h-full object-cover" style={{ minHeight: 300 }} referrerPolicy="no-referrer" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <button onClick={() => goToApplication()}
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

          {/* ══ FAQS ══════════════════════════════════════════════════════ */}
          <section className="py-16 px-6 md:px-16 lg:px-24" style={{ background: '#f8faff' }}>
            <FadeUp>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-10">
                FAQs about {data.country} Visas
              </h2>
              <div className="max-w-2xl mx-auto space-y-2">
                {shownFaqs.map((faq, i) => (
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

          {/* ══ CONTACT STRIP ═════════════════════════════════════════════ */}
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
        </>
      )}
    </div>
  );
}
