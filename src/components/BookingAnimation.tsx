import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sparkles, X, Download } from 'lucide-react';
import type { Game } from '../types/game';
import { getGameCoverUrl, getPlatformBadgeClass } from '../lib/utils';
import { sfx } from '../lib/sound';

interface BookingAnimationProps {
  game: Game;
  open: boolean;
  duration?: string;
  rig?: string;
  price?: number;
  onClose: () => void;
}

const CONFETTI = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  rotation: Math.random() * 360,
  color: ['#e8192c', '#00d4ff', '#ffd700', '#ffffff'][i % 4],
  size: 4 + Math.random() * 8,
  delay: Math.random() * 0.4,
}));

export function BookingAnimation({
  game,
  open,
  duration = '2 Hours',
  rig = 'Titan Rig Alpha',
  price = 15,
  onClose,
}: BookingAnimationProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      sfx.playLockSuccess();
    }
  }, [open]);

  if (!open) return null;

  const stationId = `RIG-${Math.floor(10 + Math.random() * 89)}`;
  const passCode = `SB-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/95 backdrop-blur-2xl overflow-y-auto">
        {/* Confetti particles */}
        {CONFETTI.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{
              y: '105vh',
              x: (p.id % 2 === 0 ? 1 : -1) * (Math.random() * 100),
              rotate: p.rotation + 360,
              opacity: [1, 1, 0.6, 0],
            }}
            transition={{ duration: 2.2 + Math.random() * 1.5, delay: p.delay, ease: 'easeOut' }}
            className="absolute rounded-sm pointer-events-none"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 10px ${p.color}`,
            }}
          />
        ))}

        {/* Holographic Boarding Pass Container - Mobile Scroll Safe */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 25 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-lg bg-[#0d0f1a] border-2 border-red-500 shadow-[0_0_80px_rgba(232,25,44,0.4)] my-auto max-h-[92vh] overflow-y-auto"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 bg-white/10 hover:bg-red-600 text-zinc-300 hover:text-white transition-all rounded"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Pass Header Banner */}
          <div className="bg-gradient-to-r from-red-600 via-red-700 to-amber-600 p-4 sm:p-5 text-white relative">
            <div className="flex items-center justify-between pr-8">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Sparkles className="w-3.5 h-3.5 fill-amber-300 text-amber-300 flex-shrink-0" />
                <span className="font-mono text-[10px] sm:text-xs font-black tracking-wider uppercase truncate">
                  SB-MAX CAFE // PASS
                </span>
              </div>
              <span className="font-mono text-[10px] sm:text-xs font-bold bg-black/40 px-2 py-0.5 rounded flex-shrink-0">
                VERIFIED
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-black italic uppercase tracking-wider mt-1.5 leading-tight">
              STATION LOCKED & READY!
            </h3>
          </div>

          {/* Pass Body Content */}
          <div className="p-4 sm:p-6">
            <div className="flex gap-3 sm:gap-4 items-center mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-white/10">
              <div className="w-16 sm:w-20 aspect-[2/3] rounded overflow-hidden border border-red-500/50 flex-shrink-0 shadow-[0_0_15px_rgba(232,25,44,0.3)]">
                <img
                  src={getGameCoverUrl(game)}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <span className={`px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold border ${getPlatformBadgeClass(game.platform)}`}>
                  {game.platform}
                </span>
                <h4 className="font-display text-xl sm:text-2xl font-black italic uppercase text-white mt-1 truncate">
                  {game.title}
                </h4>
                <p className="font-mono text-[11px] sm:text-xs text-zinc-400 truncate">
                  Pre-installed on NVMe Gen4 Rig
                </p>
              </div>
            </div>

            {/* Ticket Info Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6 bg-black/50 p-3 sm:p-4 border border-white/10">
              <div>
                <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase block">ASSIGNED RIG</span>
                <strong className="font-display text-base sm:text-lg font-black italic text-red-400 uppercase truncate block">
                  {stationId} [{rig.toUpperCase()}]
                </strong>
              </div>

              <div>
                <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase block">SESSION PASS</span>
                <strong className="font-display text-base sm:text-lg font-black italic text-amber-400 uppercase truncate block">
                  {duration} (${price})
                </strong>
              </div>

              <div>
                <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase block">BOOKING PASS ID</span>
                <strong className="font-mono text-xs sm:text-sm font-bold text-white uppercase truncate block">
                  {passCode}
                </strong>
              </div>

              <div>
                <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase block">STATUS</span>
                <strong className="font-mono text-[10px] sm:text-xs font-bold text-emerald-400 uppercase flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  RESERVED
                </strong>
              </div>
            </div>

            {/* Simulated Barcode */}
            <div className="mb-4 sm:mb-6 p-2.5 sm:p-3 bg-white flex flex-col items-center justify-center rounded">
              <div className="h-8 sm:h-10 w-full flex items-center justify-between px-1 sm:px-2">
                {Array.from({ length: 36 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-full bg-black inline-block"
                    style={{ width: i % 3 === 0 ? '3px' : i % 2 === 0 ? '2px' : '1px' }}
                  />
                ))}
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] text-zinc-800 tracking-[0.25em] font-bold mt-1">
                {passCode}-{stationId}-2026
              </span>
            </div>

            {/* Action Buttons - Responsive Stack */}
            <div className="flex flex-col min-[420px]:flex-row gap-2.5 sm:gap-3">
              <button
                onClick={() => {
                  sfx.playClick();
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex-1 py-2.5 sm:py-3 bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 border border-white/20"
              >
                <Download className="w-4 h-4" />
                <span>{copied ? 'PASS COPIED!' : 'SAVE PASS'}</span>
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  onClose();
                }}
                className="flex-1 py-2.5 sm:py-3 bg-red-600 hover:bg-red-500 text-white font-display text-sm font-black italic uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(232,25,44,0.4)]"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                }}
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>ENTER ARENA</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
