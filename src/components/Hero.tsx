import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import {   Flame, Sparkles  } from 'lucide-react';



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
              className="font-display text-5xl min-[420px]:text-6xl sm:text-7xl lg:text-8xl font-black italic uppercase text-white leading-[0.92] mb-4 sm:mb-5 text-center"
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
            

           

          </div>

          
        </div>
      </div>
    </section>
  );
}
