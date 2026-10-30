import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import {  ShieldCheck, Flame, Sparkles,  } from 'lucide-react';
import { games } from '../data/games';



const LIVE_ACTIVITIES = [
  { user: 'Viper_99', action: 'Locked Rig #07 (RTX 4090)', time: '2m ago' },
  { user: 'ShadowKratos', action: 'Playing God of War in VIP Pod #02', time: '5m ago' },
  { user: 'NeonSamurai', action: 'Booked 4-Hour Grind for Elden Ring', time: '11m ago' },
  { user: 'SquadZero', action: '5v5 CS2 LAN match started', time: '18m ago' },
];

export function Hero( ) {
  const containerRef = useRef<HTMLElement>(null);
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
