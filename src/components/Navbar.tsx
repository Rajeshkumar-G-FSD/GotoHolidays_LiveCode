import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Visa', path: '/visa' },
  { name: 'Packages', path: '/packages' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled && !isOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
      isTransparent
        ? 'bg-transparent border-transparent h-24'
        : 'bg-surface-dim/95 backdrop-blur-xl border-black/5 shadow-sm h-20'
    }`}>
      <div className="flex justify-between items-center h-full px-6 md:px-20 max-w-7xl mx-auto w-full">
        <Link to="/" className="relative z-50">
          <img
            src="/images/goto_transparent.png"
            alt="GotoHolidays Logo"
            className="h-10 md:h-14 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex gap-1 items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="relative px-4 py-2 group"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 font-sans font-semibold text-sm tracking-widest uppercase transition-all duration-300 group-hover:scale-105 inline-block ${
                  isActive
                    ? 'text-primary'
                    : isTransparent
                      ? 'text-white/80 hover:text-white'
                      : 'text-on-surface-variant hover:text-on-surface'
                }`}>
                  {link.name}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavDot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4 relative z-50">
          <Link to="/contact" className="hidden md:block bg-[#990011] text-white px-8 py-3 rounded-lg font-sans font-black text-xs tracking-widest uppercase hover:scale-105 transition-transform shadow-lg shadow-red-900/10">
            Inquire
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-full transition-colors ${scrolled || isOpen || !isHome ? 'text-primary hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 bg-surface-dim/98 backdrop-blur-3xl z-40 md:hidden flex flex-col p-8"
          >
            <div className="flex flex-col gap-5 pt-8 items-center justify-center h-full">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    className={`font-display font-bold text-2xl tracking-[0.1em] uppercase transition-all relative flex items-center gap-4 ${
                      pathname === link.path ? 'text-primary' : 'text-on-surface'
                    }`}
                  >
                    {pathname === link.path && (
                      <motion.span
                        layoutId="mobileActiveDot"
                        className="w-2 h-2 rounded-full bg-primary flex-shrink-0"
                      />
                    )}
                    {pathname !== link.path && <span className="w-2 h-2 flex-shrink-0" />}
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                className="mt-6 w-full max-w-xs"
              >
                <Link
                  to="/contact"
                  className="bg-primary text-on-primary px-6 py-3.5 rounded-full font-sans font-bold text-[10px] tracking-widest uppercase shadow-2xl shadow-primary/40 block text-center"
                >
                  Start Inquiring
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
