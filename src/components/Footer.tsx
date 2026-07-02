import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, PlayCircle, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-black/5 py-20 px-6 md:px-20 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/">
              <img 
                src="/images/goto_transparent.png"
                alt="GotoHolidays Logo" 
                className="h-12 w-auto object-contain" 
              />
            </Link>
            <p className="text-on-surface-variant font-sans text-sm leading-relaxed max-w-xs">
              Elevating global travel to an art form for the discerning few. Redefining luxury for the modern connoisseur.
            </p>
            <div className="flex gap-4">
              <Instagram size={18} className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors" />
              <PlayCircle size={18} className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors" />
              <Linkedin size={18} className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.2em]">Contact Us</h4>
            <div className="space-y-4 font-sans text-sm">
              <div className="flex items-start gap-3 group">
                <Mail size={16} className="text-primary mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Email Inquiries</span>
                  <a href="mailto:gotoholidaysandvisa@gmail.com" className="text-on-surface-variant hover:text-primary transition-colors">
                    gotoholidaysandvisa@gmail.com
                  </a>
                  <a href="mailto:info@gotoholidays-visa.co.in" className="text-on-surface-variant hover:text-primary transition-colors mt-1">
                    info@gotoholidays-visa.co.in
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <Phone size={16} className="text-primary mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Priority Hotline</span>
                  <a href="tel:919840454061" className="text-on-surface-variant hover:text-primary transition-colors">
                    +91 984045 4061
                  </a>
                  <a href="https://wa.me/919840454061" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:brightness-90 transition-all font-bold text-xs mt-1 flex items-center gap-1">
                    WhatsApp: +91 984045 4061
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div className="space-y-6 lg:col-span-1">
            <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.2em]">Offices</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-3 text-sm text-on-surface-variant leading-relaxed">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Chennai HQ</span>
                  <address className="not-italic">
                    No:2/305, Puzgalanthi salai ki,<br />
                    J.J nagar east, Mugappair east,<br />
                    Chennai 600037
                  </address>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-on-surface-variant leading-relaxed">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Nagercoil Office</span>
                  <address className="not-italic">
                    NO 23-80A EAST STREET KAKAMOOR,<br />
                    SUCHINDRUM, KANYAKUMARI,<br />
                    TN 629704
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Column */}
          <div className="space-y-6 font-sans">
            <h4 className="text-primary font-bold text-[10px] uppercase tracking-[0.2em]">Legal & Privacy</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Global Terms', 'Cookies', 'Client Confidentiality'].map(item => (
                <li key={item}>
                  <a href="#" className="text-on-surface-variant hover:text-primary text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-[10px] font-bold tracking-widest uppercase">
            © 2026 DataZync.com — PRIVATE & CONFIDENTIAL.
          </p>
          <div className="flex gap-6">
            <button className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors">Sitemap</button>
            <button className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors">Press Inquiries</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
