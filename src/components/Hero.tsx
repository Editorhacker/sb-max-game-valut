import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Search, Zap, Gamepad2, Monitor, ShieldCheck, Flame, Sparkles, Trophy } from 'lucide-react';
import { sfx } from '../lib/sound';
import { games } from '../data/games';

interface HeroProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onQuickBookRig?: (platform: string, duration: string) => void;
}

const LIVE_ACTIVITIES = [
  { user: 'Viper_99', action: 'Locked Rig #07 (RTX 4090)', time: '2m ago' },
  { user: 'ShadowKratos', action: 'Playing God of War in VIP Pod #02', time: '5m ago' },
  { user: 'NeonSamurai', action: 'Booked 4-Hour Grind for Elden Ring', time: '11m ago' },
  { user: 'SquadZero', action: '5v5 CS2 LAN match started', time: '18m ago' },
];

export function Hero({ searchValue, onSearchChange, onQuickBookRig }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedStation, setSelectedStation] = useState<'PC' | 'PS5' | 'SIM'>('PC');
  const [selectedDuration, setSelectedDuration] = useState<'1hr' | '3hr' | 'night'>('3hr');
  const [tickerIndex, setTickerIndex] = useState(0);

  // 3D Parallax mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [6, -6]);
  const rotateY = useTransform(mouseX, [-300, 300], [-6, 6]);
  const charX = useTransform(mouseX, [-400, 400], [-10, 10]);
  const charY = useTransform(mouseY, [-400, 400], [-10, 10]);

  useEffect(() => {
    // Only track mouse parallax on devices with fine pointer (non-touch)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Activity ticker loop
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % LIVE_ACTIVITIES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const handleBookClick = () => {
    sfx.playLockSuccess();
    if (onQuickBookRig) {
      onQuickBookRig(selectedStation, selectedDuration);
    } else {
      const exploreElem = document.getElementById('stations');
      exploreElem?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-x-clip overflow-y-hidden bg-[#03040a] pt-20 sm:pt-28 pb-14 sm:pb-20 scanlines"
    >
      {/* Background Esports Arena ambience */}
      <div className="absolute inset-0 z-0">
        <img
          src="/cafe-arena.jpg"
          alt="SB-MAX Gaming Lounge"
          className="w-full h-full object-cover opacity-20 filter contrast-125 saturate-150 scale-105"
        />
        {/* Deep atmospheric gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#03040a] via-[#03040a]/85 to-[#03040a]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03040a] via-[#03040a]/75 to-transparent" />
        {/* Neon pools */}
        <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-red-600/15 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-cyan-500/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      </div>

      {/* Floating cyber particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 2 === 0 ? '3px' : '2px',
              height: i % 2 === 0 ? '10px' : '5px',
              left: `${(i * 6.2) % 100}%`,
              background: i % 3 === 0 ? '#e8192c' : i % 3 === 1 ? '#00d4ff' : '#ffd700',
              bottom: '-5%',
              boxShadow: '0 0 8px currentColor',
            }}
            animate={{
              y: [0, -1000],
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: 5 + (i % 4) * 2,
              repeat: Infinity,
              delay: (i % 5) * 0.9,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Live Cafe ticker bar - mobile responsive */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 sm:mb-6 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 bg-red-950/40 border border-red-500/30 backdrop-blur-md max-w-full overflow-hidden"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
          }}
        >
          <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-red-400 flex-shrink-0">
            <Flame className="w-3.5 h-3.5 fill-red-400 animate-pulse flex-shrink-0" />
            <span className="hidden sm:inline">LIVE LOUNGE FEED:</span>
            <span className="sm:hidden">LIVE FEED:</span>
          </span>

          <div className="h-4 overflow-hidden relative flex-1 min-w-0">
            <motion.div
              key={tickerIndex}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[11px] sm:text-xs text-zinc-300 font-mono truncate"
            >
              <strong className="text-amber-400">{LIVE_ACTIVITIES[tickerIndex].user}</strong>{' '}
              {LIVE_ACTIVITIES[tickerIndex].action}{' '}
              <span className="text-zinc-500 hidden min-[480px]:inline">({LIVE_ACTIVITIES[tickerIndex].time})</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Grid: Left Hero Content & Quick Booking / Right 3D Character */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left Column (Content & Rig Booking) */}
          <div className="lg:col-span-7 flex flex-col z-20">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap"
            >
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider bg-red-600/30 text-red-300 border border-red-500/50">
                ★ FLAGSHIP GAMING LOUNGE
              </span>
              <span className="text-[11px] sm:text-xs font-mono text-cyan-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 240Hz OLED ARENA
              </span>
            </motion.div>

            {/* Giant Title - Scaled for all screen sizes */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl min-[420px]:text-5xl sm:text-7xl lg:text-8xl font-black italic uppercase tracking-tight text-white leading-[0.92] mb-4 sm:mb-5"
            >
              LOCK YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8192c] via-[#ff5722] to-[#ffd700] drop-shadow-[0_0_35px_rgba(232,25,44,0.6)]">
                BATTLE RIG
              </span>{' '}
              <br />
              DOMINATE.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-zinc-300 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed mb-6 sm:mb-8"
            >
              Experience high-end gaming without limits. Step into our cyber lounge with{' '}
              <strong className="text-white">RTX 4090 Rigs</strong>,{' '}
              <strong className="text-cyan-400">PS5 Pro VIP Pods</strong>, and{' '}
              <strong className="text-amber-400">Fanatec Sim Rigs</strong>. 30+ AAA games pre-installed.
            </motion.p>

            {/* Quick Interactive Station Booker Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="p-4 sm:p-6 bg-[#0d0f1a]/95 backdrop-blur-2xl border border-red-500/30 shadow-[0_0_40px_rgba(232,25,44,0.15)] relative overflow-hidden group"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
              }}
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Zap className="w-4 h-4 text-red-500 fill-red-500 flex-shrink-0" />
                  <span className="font-display text-xs sm:text-sm font-black italic tracking-wider text-white uppercase truncate">
                    INSTANT RIG LOCK // NO WAIT
                  </span>
                </div>
                <span className="font-mono text-[11px] sm:text-xs text-emerald-400 flex items-center gap-1.5 flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  6 Ready
                </span>
              </div>

              {/* Station Selectors - Responsive grid */}
              <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-2 mb-3 sm:mb-4">
                {[
                  { id: 'PC', label: 'RTX 4090 PC', icon: Monitor, sub: '360Hz OLED' },
                  { id: 'PS5', label: 'PS5 PRO POD', icon: Gamepad2, sub: '65" 4K BRAVIA' },
                  { id: 'SIM', label: 'RACING COCKPIT', icon: Trophy, sub: 'Direct Drive' },
                ].map((station) => {
                  const Icon = station.icon;
                  const isSelected = selectedStation === station.id;
                  return (
                    <button
                      key={station.id}
                      onClick={() => {
                        sfx.playClick();
                        setSelectedStation(station.id as 'PC' | 'PS5' | 'SIM');
                      }}
                      onMouseEnter={() => sfx.playHover()}
                      className={`p-2.5 sm:p-2.5 text-left transition-all border ${
                        isSelected
                          ? 'bg-red-600 text-white border-red-500 shadow-[0_0_20px_rgba(232,25,44,0.5)]'
                          : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                      }`}
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                      }}
                    >
                      <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1">
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-white' : 'text-red-400'}`} />
                        <span className="font-display text-xs font-black italic uppercase leading-none truncate">
                          {station.label}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono block ${isSelected ? 'text-white/80' : 'text-zinc-500'} truncate`}>
                        {station.sub}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Duration Pass Selectors */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {[
                  { id: '1hr', label: '1 Hour', price: '$5' },
                  { id: '3hr', label: '3 Hours', price: '$12', popular: true },
                  { id: 'night', label: 'All-Night', price: '$25' },
                ].map((dur) => (
                  <button
                    key={dur.id}
                    onClick={() => {
                      sfx.playTab();
                      setSelectedDuration(dur.id as '1hr' | '3hr' | 'night');
                    }}
                    onMouseEnter={() => sfx.playHover()}
                    className={`py-1.5 sm:py-2 px-1 text-center border text-[11px] sm:text-xs font-mono transition-all relative ${
                      selectedDuration === dur.id
                        ? 'border-amber-400 text-amber-300 bg-amber-500/20 font-bold shadow-[0_0_12px_rgba(255,215,0,0.25)]'
                        : 'border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {dur.popular && (
                      <span className="hidden min-[400px]:inline-block absolute -top-2 left-1/2 -translate-x-1/2 px-1 text-[7px] sm:text-[8px] bg-red-600 text-white font-bold uppercase tracking-wider">
                        POPULAR
                      </span>
                    )}
                    <span>{dur.label}</span> <strong className="text-white ml-0.5 sm:ml-1">{dur.price}</strong>
                  </button>
                ))}
              </div>

              {/* Search Game or Lock Rig */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search 30+ games (e.g. Elden Ring, CS2)..."
                    className="w-full pl-9 pr-4 py-2.5 sm:py-3 bg-black/60 border border-white/15 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-mono"
                  />
                </div>

                <button
                  onClick={handleBookClick}
                  onMouseEnter={() => sfx.playHover()}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-display text-sm sm:text-base font-black italic tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(232,25,44,0.5)] active:scale-95"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  }}
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>LOCK IN STATION</span>
                </button>
              </div>
            </motion.div>

            {/* Quick stats below hero */}
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10 text-center sm:text-left">
              <div>
                <span className="font-display text-2xl sm:text-4xl font-black italic text-red-500 block leading-none">
                  24
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider">
                  Battle Rigs
                </span>
              </div>
              <div>
                <span className="font-display text-2xl sm:text-4xl font-black italic text-cyan-400 block leading-none">
                  {games.length}+
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider">
                  Pre-Loaded
                </span>
              </div>
              <div>
                <span className="font-display text-2xl sm:text-4xl font-black italic text-amber-400 block leading-none">
                  360Hz
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider">
                  QD-OLED
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D CYBER SAMURAI WARRIOR CHARACTER */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0">

            {/* Glowing neon halo behind character */}
            <motion.div
              style={{ rotateX, rotateY }}
              className="relative w-full max-w-[320px] sm:max-w-[420px] aspect-[3/4] flex items-center justify-center"
            >
              {/* Outer cyber ring */}
              <div className="absolute inset-0 rounded-2xl border-2 border-red-500/30 shadow-[0_0_50px_rgba(232,25,44,0.3)] animate-pulse" />
              <div className="absolute -inset-3 sm:-inset-4 rounded-3xl border border-cyan-500/20 pointer-events-none" />

              {/* Character Render Container */}
              <motion.div
                style={{ x: charX, y: charY }}
                className="relative w-full h-full rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] group"
              >
                {/* Character Image */}
                <img
                  src="/cyber-character.jpg"
                  alt="Cyber Samurai Gaming Warrior"
                  className="w-full h-full object-cover object-center filter contrast-110 saturate-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Cyber HUD Overlays on Character */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#03040a] via-transparent to-black/20" />

                {/* Floating holographic badge 1: Top Right */}
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-3 sm:top-5 right-3 sm:right-5 p-2 sm:p-2.5 bg-black/85 backdrop-blur-md border border-red-500/60 shadow-[0_0_20px_rgba(232,25,44,0.4)] text-left"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                  }}
                >
                  <div className="flex items-center gap-1.5 text-red-400 font-mono text-[9px] sm:text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    KATANA PROTOCOL
                  </div>
                  <div className="font-display text-xs sm:text-sm font-black italic text-white uppercase">
                    360Hz TOURNAMENT RIG
                  </div>
                </motion.div>

                {/* Floating holographic badge 2: Bottom Left */}
                <motion.div
                  animate={{ y: [3, -3, 3] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute bottom-4 sm:bottom-6 left-3 sm:left-5 p-2 sm:p-3 bg-black/85 backdrop-blur-md border border-cyan-500/60 shadow-[0_0_20px_rgba(0,212,255,0.3)] text-left max-w-[85%]"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                  }}
                >
                  <span className="text-[9px] sm:text-[10px] font-mono text-cyan-400 block font-semibold">
                    STATION SPECS // POD 01
                  </span>
                  <div className="font-display text-sm sm:text-base font-black italic text-white uppercase leading-none mt-0.5 truncate">
                    RTX 4090 • 24GB VRAM
                  </div>
                  <div className="font-mono text-[9px] sm:text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 flex-shrink-0" /> 0.8ms SERVER PING
                  </div>
                </motion.div>

                {/* Animated Scan Line */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent pointer-events-none"
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>

              {/* Decorative Corner Brackets */}
              <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-l-2 border-red-500" />
              <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-r-2 border-cyan-400" />
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
