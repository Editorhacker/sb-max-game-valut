import { motion } from 'framer-motion';
import { Search, ChevronDown, Zap, Sparkles } from 'lucide-react';
import { games, allGenres } from '../data/games';

interface HeroProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const uniqueGenresCount = allGenres.length;
const totalGames = games.length;

// Red -> Golden -> Red color sequence
const RED_TO_GOLD = [
  'rgba(239, 68, 68, 0.38)',
  'rgba(220, 38, 38, 0.42)',
  'rgba(245, 158, 11, 0.38)',
  'rgba(251, 191, 36, 0.42)',
  'rgba(245, 158, 11, 0.38)',
  'rgba(220, 38, 38, 0.42)',
  'rgba(239, 68, 68, 0.38)',
];

// Golden -> Red -> Golden color sequence
const GOLD_TO_RED = [
  'rgba(251, 191, 36, 0.38)',
  'rgba(245, 158, 11, 0.38)',
  'rgba(239, 68, 68, 0.40)',
  'rgba(220, 38, 38, 0.44)',
  'rgba(239, 68, 68, 0.40)',
  'rgba(245, 158, 11, 0.38)',
  'rgba(251, 191, 36, 0.38)',
];

// Animated dynamic aura orb with color-shifting and gentle movement
function DynamicAuraOrb({
  className,
  colorSequence,
  duration = 10,
  delay = 2,
  moveX = 40,
  moveY = 30,
}: {
  className: string;
  colorSequence: string[];
  duration?: number;
  delay?: number;
  moveX?: number;
  moveY?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[90px] pointer-events-none ${className}`}
      animate={{
        backgroundColor: colorSequence,
        x: [0, moveX, moveX * 0.3, -moveX * 0.7, -moveX * 0.2, 0],
        y: [0, -moveY, -moveY * 0.3, moveY * 0.7, moveY * 0.2, 0],
        scale: [1, 1.15, 1.05, 0.94, 1.08, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

export function Hero({ searchValue, onSearchChange }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#07070a] pt-24 pb-16"
    >
      {/* ── Dynamic Ambient Center Glow (smoothly breathes Red <-> Gold) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse 65% 55% at 45% 45%, rgba(239, 68, 68, 0.16) 0%, transparent 70%)',
            'radial-gradient(ellipse 70% 60% at 50% 48%, rgba(245, 158, 11, 0.17) 0%, transparent 70%)',
            'radial-gradient(ellipse 65% 55% at 55% 46%, rgba(251, 191, 36, 0.18) 0%, transparent 70%)',
            'radial-gradient(ellipse 70% 60% at 50% 44%, rgba(220, 38, 38, 0.17) 0%, transparent 70%)',
            'radial-gradient(ellipse 65% 55% at 45% 45%, rgba(239, 68, 68, 0.16) 0%, transparent 70%)',
          ],
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
      {/* Left orb (Primary aura seen behind the main title) */}
      <DynamicAuraOrb
        className="w-[440px] h-[440px] top-[18%] left-[8%] sm:left-[16%]"
        colorSequence={RED_TO_GOLD}
        duration={10}
        delay={0}
        moveX={45}
        moveY={35}
      />

      {/* Right orb (Counter-balance shifting Gold <-> Red) */}
      <DynamicAuraOrb
        className="w-[380px] h-[380px] bottom-[20%] right-[8%] sm:right-[15%]"
        colorSequence={GOLD_TO_RED}
        duration={11}
        delay={1.5}
        moveX={-40}
        moveY={30}
      />

      {/* Top ambient highlight */}
      <DynamicAuraOrb
        className="w-[320px] h-[320px] top-[12%] right-[35%]"
        colorSequence={RED_TO_GOLD}
        duration={13}
        delay={3}
        moveX={30}
        moveY={-25}
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
