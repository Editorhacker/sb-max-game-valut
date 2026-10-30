import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap} from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Featured', href: '#featured' },
  { label: 'Explore Games', href: '#explore' },
  { label: 'Platforms', href: '#platforms' },
  { label: 'Genres', href: '#filters' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07070a]/90 backdrop-blur-xl border-b border-red-500/15 shadow-lg shadow-black/70'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Name */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Outer Red & Gold Ring */}
              <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-red-600 via-amber-400 to-red-600 shadow-lg shadow-red-600/30 group-hover:shadow-amber-500/40 transition-shadow">
                <img
                  src="/logo.png"
                  alt="SB-MAX Game Vault"
                  className="w-full h-full object-cover rounded-full bg-black group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-amber-400 rounded-full border-2 border-[#07070a] shadow-sm shadow-amber-400 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-red-100 transition-colors">
                  SB-MAX
                </span>
               
              </div>
              <span className="text-[11px] font-extrabold tracking-[0.22em] text-red-500 uppercase mt-0.5">
                GAME <span className="text-amber-400">VAULT</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-amber-300 transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button with Red base & Gold accents */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#explore"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 border border-amber-400/30 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-red-600/30 hover:shadow-amber-500/30 hover:scale-105 active:scale-95 group/btn"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300 group-hover/btn:rotate-12 transition-transform" />
              <span>Explore Vault</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-amber-300 hover:bg-white/10 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="w-5 h-5 text-red-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-red-500/10"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-amber-300 hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#explore"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 border border-amber-400/30 text-white font-bold text-sm shadow-lg shadow-red-600/30"
              >
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                Explore Vault
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
