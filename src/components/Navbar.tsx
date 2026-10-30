import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, Volume2, VolumeX } from 'lucide-react';
import { sfx } from '../lib/sound';

const navLinks = [
  { label: 'Arena', href: '#home' },
  { label: 'Battle Rigs', href: '#stations' },
  { label: 'Must-Play', href: '#featured' },
  { label: 'Explore Vault', href: '#explore' },
];

export function Navbar({ onQuickBook }: { onQuickBook?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sfx.getMuted());

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#03040a]/95 backdrop-blur-2xl border-b border-red-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
      }`}
    >
      {/* Top energy beam */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e8192c] to-transparent shadow-[0_0_12px_#e8192c]" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Brand */}
          <a
            href="#home"
            className="flex items-center gap-2.5 sm:gap-3.5 group select-none min-w-0"
            onMouseEnter={() => sfx.playHover()}
            onClick={() => sfx.playClick()}
          >
            <div
              className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #e8192c 0%, #750a14 100%)',
                clipPath: 'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))',
                boxShadow: '0 0 20px rgba(232,25,44,0.4)',
              }}
            >
              <img src="/logo.png" alt="SB-MAX" className="w-5 h-5 sm:w-7 sm:h-7 object-cover rounded-sm" />
              <div className="absolute inset-0 border border-red-400/30 pointer-events-none" />
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-display text-xl sm:text-2xl font-black italic tracking-wider text-white uppercase group-hover:text-red-400 transition-colors">
                  SB-MAX
                </span>
                <span className="px-1.5 py-0.5 text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/40">
                  CAFE
                </span>
              </div>
              <span className="font-ui text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.28em] text-red-400/80 uppercase font-semibold truncate">
                ESPORTS & GAMING
              </span>
            </div>
          </a>

          {/* Live Arena Status pill (Desktop only) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#0d0f1a]/80 border border-white/10 rounded-full text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-zinc-300">
              ARENA: <strong className="text-emerald-400">18 / 24</strong> RIGS ACTIVE
            </span>
            <span className="text-zinc-600">|</span>
            <span className="font-mono text-amber-400 text-[11px]">6 OPEN SEATS</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => sfx.playHover()}
                onClick={() => sfx.playTab()}
                className="relative px-4 py-2 font-display text-base font-bold italic tracking-wider text-zinc-300 uppercase transition-all duration-200 hover:text-white group"
              >
                {link.label}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left shadow-[0_0_8px_#e8192c]" />
              </a>
            ))}
          </div>

          {/* Sound Toggle + Quick CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* SFX Audio Button - Compact on mobile */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Turn Sound FX On' : 'Mute Sound FX'}
              className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 text-xs font-mono border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all rounded"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
              }}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-zinc-500" />
                  <span className="hidden sm:inline text-zinc-500 text-[11px]">SFX OFF</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="hidden sm:inline text-emerald-400 text-[11px]">SFX ON</span>
                  {/* Visual sound bars */}
                  <span className="flex items-end gap-0.5 h-3 ml-0.5 sm:ml-1">
                    <span className="w-0.5 h-2 bg-emerald-400 animate-[bounce_0.6s_infinite]" />
                    <span className="w-0.5 h-3 bg-emerald-400 animate-[bounce_0.8s_infinite]" />
                    <span className="w-0.5 h-1.5 bg-emerald-400 animate-[bounce_0.5s_infinite]" />
                  </span>
                </>
              )}
            </button>

            {/* Quick Book Rig button */}
            <a
              href="#stations"
              onMouseEnter={() => sfx.playHover()}
              onClick={() => {
                sfx.playClick();
                if (onQuickBook) onQuickBook();
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 font-display text-xs sm:text-sm font-black italic tracking-widest text-white uppercase transition-all duration-300 group"
              style={{
                background: 'linear-gradient(135deg, #e8192c 0%, #b80018 100%)',
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                boxShadow: '0 0 20px rgba(232,25,44,0.45)',
              }}
            >
              <Zap className="w-3.5 h-3.5 fill-white group-hover:scale-125 transition-transform" />
              <span>BOOK RIG</span>
            </a>

            {/* Mobile menu hamburger button */}
            <button
              onClick={() => {
                sfx.playClick();
                setMobileOpen(!mobileOpen);
              }}
              className="md:hidden p-2 text-zinc-300 hover:text-white bg-white/5 border border-white/10 rounded"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-red-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer with Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 top-16 bg-black/80 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden relative z-50 bg-[#090b14] border-b border-red-500/30 px-5 py-5 shadow-2xl"
            >
              {/* Mobile Arena Status Pill */}
              <div className="flex items-center justify-between p-3 bg-black/60 border border-white/10 mb-4 rounded">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-xs text-zinc-300">ARENA STATUS</span>
                </div>
                <span className="font-mono text-xs text-emerald-400 font-bold">18/24 ACTIVE (6 OPEN)</span>
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      sfx.playTab();
                      setMobileOpen(false);
                    }}
                    className="font-display text-xl font-black italic tracking-wider text-zinc-200 hover:text-red-400 uppercase py-2.5 px-2 border-b border-white/5"
                  >
                    {link.label}
                  </a>
                ))}

                <a
                  href="#stations"
                  onClick={() => {
                    sfx.playClick();
                    setMobileOpen(false);
                    if (onQuickBook) onQuickBook();
                  }}
                  className="mt-3 flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-500 text-white font-display text-base font-black italic uppercase tracking-wider shadow-[0_0_20px_rgba(232,25,44,0.5)]"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  }}
                >
                  <Zap className="w-4 h-4 fill-white" />
                  BOOK BATTLE RIG NOW
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
