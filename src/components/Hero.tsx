import { motion } from 'framer-motion';
import { Search, ChevronDown, Zap, Sparkles } from 'lucide-react';
import { games, allGenres } from '../data/games';

interface HeroProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const uniqueGenresCount = allGenres.length;
const totalGames = games.length;

// ── Ultra-smooth GPU-accelerated shifting aura ─────────────────────────────
// Uses opacity cross-fading of static pre-rendered layers instead of heavy
// CSS background/color re-painting, ensuring 120 FPS frictionless scrolling.
function ShiftingAura({
  className,
  initialColor = 'red',
  duration = 10,
  delay = 0,
  moveX = 35,
  moveY = 25,
}: {
  className: string;
  initialColor?: 'red' | 'gold';
  duration?: number;
  delay?: number;
  moveX?: number;
  moveY?: number;
}) {
  const isRedFirst = initialColor === 'red';

  return (
    <motion.div
      className={`absolute pointer-events-none transform-gpu will-change-transform ${className}`}
      animate={{
        x: [0, moveX, moveX * 0.25, -moveX * 0.6, 0],
        y: [0, -moveY, -moveY * 0.25, moveY * 0.6, 0],
        scale: [1, 1.1, 1.03, 0.96, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      {/* Red Glow Layer */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl bg-gradient-to-br from-red-600/40 via-rose-600/35 to-red-950/40 transform-gpu will-change-opacity"
        animate={{
          opacity: isRedFirst
            ? [1, 0.8, 0.1, 0.05, 0.1, 0.8, 1]
            : [0.05, 0.1, 0.8, 1, 0.8, 0.1, 0.05],
        }}
        transition={{
          duration,
          repeat: Infinity,
          delay,
          ease: 'easeInOut',
        }}
      />

      {/* Gold Glow Layer */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl bg-gradient-to-br from-amber-400/40 via-yellow-500/35 to-amber-700/30 transform-gpu will-change-opacity"
        animate={{
          opacity: isRedFirst
            ? [0.05, 0.1, 0.8, 1, 0.8, 0.1, 0.05]
            : [1, 0.8, 0.1, 0.05, 0.1, 0.8, 1],
        }}
        transition={{
          duration,
          repeat: Infinity,
          delay,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}

export function Hero({ searchValue, onSearchChange }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#07070a] pt-24 pb-16"
    >
      {/* ── Background Dual Cross-fading Atmosphere (100% GPU compositor) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_65%_55%_at_48%_45%,rgba(239,68,68,0.15)_0%,transparent_70%)] transform-gpu will-change-opacity"
        animate={{
          opacity: [1, 0.7, 0.15, 0.1, 0.15, 0.7, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_52%_48%,rgba(245,158,11,0.15)_0%,transparent_70%)] transform-gpu will-change-opacity"
        animate={{
          opacity: [0.1, 0.15, 0.7, 1, 0.7, 0.15, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Bottom fade into section */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(7,7,10,0.95)_100%)] pointer-events-none" />

      {/* ── Color-Shifting Aura Orbs with slight organic movement ── */}
      {/* Left primary aura (shifts Red <-> Gold with gentle movement) */}
      <ShiftingAura
        className="w-96 h-96 sm:w-[420px] sm:h-[420px] top-[18%] left-[6%] sm:left-[14%]"
        initialColor="red"
        duration={10}
        delay={0}
        moveX={35}
        moveY={25}
      />

      {/* Right counter-aura (shifts Gold <-> Red with gentle movement) */}
      <ShiftingAura
        className="w-80 h-80 sm:w-[380px] sm:h-[380px] bottom-[20%] right-[6%] sm:right-[14%]"
        initialColor="gold"
        duration={11}
        delay={1.5}
        moveX={-30}
        moveY={20}
      />

      {/* Subtle top-center highlight */}
      <ShiftingAura
        className="w-72 h-72 top-[10%] right-[35%]"
        initialColor="red"
        duration={13}
        delay={2.5}
        moveX={20}
        moveY={-15}
      />

      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Brand Badge with Logo & Gold Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-950/60 via-amber-950/30 to-[#12131d] border border-amber-400/35 text-sm font-semibold mb-8 backdrop-blur-md shadow-lg shadow-amber-500/10"
        >
          <img
            src="/logo.png"
            alt="SB-MAX Logo"
            className="w-5 h-5 rounded-full object-cover ring-1 ring-amber-400/50"
          />
          <span className="text-gray-200 tracking-wide flex items-center gap-1.5">
            SB-MAX Gaming • <span className="text-amber-400 font-bold">Ultimate Game Vault</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </span>
        </motion.div>

        {/* Heading with Fiery Red-to-Gold Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6"
        >
          Find Your Next{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Gaming Adventure.
            </span>
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-amber-400 to-yellow-400 rounded-full shadow-sm shadow-amber-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Explore legendary battles, immersive open worlds, and unforgettable experiences across
          PS5, PS4, and PC on the official{' '}
          <strong className="text-white font-semibold">
            SB-MAX <span className="text-amber-400">Game Vault</span>
          </strong>.
        </motion.p>

        {/* Search Bar with Red & Gold Glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative max-w-2xl mx-auto mb-8"
        >
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-amber-400 transition-colors" />
            <input
              id="hero-search"
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search games, genres, developers…"
              className="w-full bg-[#111218]/90 backdrop-blur-md border border-white/10 hover:border-amber-400/40 focus:border-red-500/70 text-white placeholder-gray-500 rounded-2xl py-4 pl-14 pr-36 text-base outline-none transition-all shadow-xl shadow-black/60 focus:shadow-red-600/20"
            />
            <a
              href="#explore"
              onClick={() => {
                const el = document.getElementById('explore');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 border border-amber-400/35 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-red-600/30 hover:shadow-amber-500/25 group/searchbtn"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300 group-hover/searchbtn:rotate-12 transition-transform" />
              <span>Explore</span>
            </a>
          </div>
        </motion.div>

        {/* Stats Row with Gold accents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex items-center justify-center gap-8 sm:gap-14"
        >
          {[
            { value: totalGames, label: 'Curated Games' },
            { value: 3, label: 'Supported Platforms' },
            { value: uniqueGenresCount, label: 'Game Genres' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-white">
                {stat.value}
                <span className="text-amber-400 ml-0.5">+</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 hover:text-amber-400 transition-colors"
      >
        <span className="text-[11px] font-semibold tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
