import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Coffee } from 'lucide-react';
import type { Game } from '../types/game';
import { getGameCoverUrl, getGameHeaderUrl, getPlatformBadgeClass, getCafeRigInfo } from '../lib/utils';
import { BookingAnimation } from './BookingAnimation';
import { sfx } from '../lib/sound';

interface GameDetailsDialogProps {
  game: Game | null;
  open: boolean;
  onClose: () => void;
}

export function GameDetailsDialog({ game, open, onClose }: GameDetailsDialogProps) {
  const [selectedDuration, setSelectedDuration] = useState<'1hr' | '2hr' | '4hr' | 'night'>('2hr');
  const [selectedRig, setSelectedRig] = useState<'titan' | 'vip' | 'sim'>('titan');
  const [addFuel, setAddFuel] = useState(false);
  const [showBookingAnim, setShowBookingAnim] = useState(false);

  useEffect(() => {
    if (open) {
      sfx.playHoloOpen();
      setShowBookingAnim(false);
    }
  }, [open]);

  if (!game) return null;

  const rigInfo = getCafeRigInfo(game);

  // Price calculation
  const basePrices = {
    '1hr': 6,
    '2hr': 11,
    '4hr': 20,
    'night': 35,
  };
  const totalPrice = basePrices[selectedDuration] + (addFuel ? 4 : 0);

  const handleBook = () => {
    sfx.playLockSuccess();
    setShowBookingAnim(true);
  };

  const handleClose = () => {
    sfx.playClick();
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl"
              onClick={handleClose}
            />

            {/* Modal Container - Scrollable on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-[#0d0f1a] border border-red-500/50 shadow-[0_0_60px_rgba(232,25,44,0.3)] my-auto max-h-[92vh] overflow-y-auto z-10"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                onMouseEnter={() => sfx.playHover()}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 sm:p-2.5 bg-black/80 hover:bg-red-600 text-zinc-300 hover:text-white transition-all border border-white/10"
                style={{ clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))' }}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Header Image with Neon Vignette */}
              <div className="relative h-44 sm:h-72 overflow-hidden bg-black flex-shrink-0">
                <img
                  src={getGameHeaderUrl(game)}
                  alt={game.title}
                  className="w-full h-full object-cover object-center filter contrast-125 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a] via-[#0d0f1a]/60 to-transparent" />

                {/* Left Poster Thumbnail Overlay */}
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 flex items-end gap-3 sm:gap-5 max-w-[85%]">
                  <div className="hidden sm:block w-24 sm:w-28 aspect-[2/3] rounded border-2 border-red-500/70 shadow-[0_0_25px_rgba(232,25,44,0.5)] overflow-hidden flex-shrink-0">
                    <img
                      src={getGameCoverUrl(game)}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 flex-wrap">
                      <span className={`px-2 py-0.5 text-[10px] sm:text-xs font-mono font-bold border ${getPlatformBadgeClass(game.platform)}`}>
                        {game.platform}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] sm:text-xs font-mono font-bold bg-red-600/80 text-white">
                        {game.primaryGenre}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] sm:text-xs font-mono bg-black/80 text-amber-300 border border-amber-400/30">
                        {game.releaseYear}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black italic uppercase text-white leading-none truncate">
                      {game.title}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">

                {/* Left column: Overview & Highlights */}
                <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-mono text-xs font-bold tracking-widest text-red-500 uppercase mb-1.5">
                      TITLE BRIEFING
                    </h4>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  {game.highlights && game.highlights.length > 0 && (
                    <div>
                      <h4 className="font-mono text-xs font-bold tracking-widest text-amber-400 uppercase mb-1.5">
                        VAULT HIGHLIGHTS
                      </h4>
                      <ul className="space-y-1">
                        {game.highlights.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Cafe Rig Benchmark */}
                  <div className="p-3 sm:p-4 bg-black/50 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">OPTIMIZED FOR</span>
                      <strong className="text-xs sm:text-sm font-display font-black italic text-white uppercase">
                        {rigInfo.rigName}
                      </strong>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 font-mono text-[11px] sm:text-xs font-bold border border-emerald-500/30">
                      {rigInfo.fps}
                    </span>
                  </div>
                </div>

                {/* Right column: Station Booking Form */}
                <div className="lg:col-span-5 bg-black/40 p-4 sm:p-5 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-white/10">
                      <span className="font-display text-sm sm:text-base font-black italic uppercase text-white">
                        LOCK CAFE SESSION
                      </span>
                      <span className="text-[11px] sm:text-xs font-mono text-emerald-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Live Seat Ready
                      </span>
                    </div>

                    {/* Choose Rig Type */}
                    <div className="mb-3.5">
                      <label className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase block mb-1.5">
                        SELECT STATION RIG
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { id: 'titan', label: 'PC TITAN', spec: 'RTX 4090' },
                          { id: 'vip', label: 'PS5 POD', spec: 'OLED VIP' },
                          { id: 'sim', label: 'SIM RIG', spec: 'FANATEC' },
                        ].map((r) => (
                          <button
                            key={r.id}
                            onClick={() => {
                              sfx.playTab();
                              setSelectedRig(r.id as 'titan' | 'vip' | 'sim');
                            }}
                            className={`p-2 text-center border text-[11px] sm:text-xs font-mono transition-all ${
                              selectedRig === r.id
                                ? 'bg-red-600 border-red-500 text-white font-bold shadow-[0_0_12px_rgba(232,25,44,0.4)]'
                                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                            }`}
                          >
                            <span className="block font-bold truncate">{r.label}</span>
                            <span className="text-[8px] sm:text-[9px] opacity-80 truncate block">{r.spec}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Choose Duration */}
                    <div className="mb-3.5">
                      <label className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase block mb-1.5">
                        SESSION DURATION
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                        {[
                          { id: '1hr', label: '1 Hour', price: '$6' },
                          { id: '2hr', label: '2 Hours', price: '$11' },
                          { id: '4hr', label: '4h Grind', price: '$20' },
                          { id: 'night', label: 'All-Nighter', price: '$35' },
                        ].map((dur) => (
                          <button
                            key={dur.id}
                            onClick={() => {
                              sfx.playTab();
                              setSelectedDuration(dur.id as '1hr' | '2hr' | '4hr' | 'night');
                            }}
                            className={`p-2 sm:p-2.5 text-left border text-[11px] sm:text-xs font-mono flex items-center justify-between transition-all ${
                              selectedDuration === dur.id
                                ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                            }`}
                          >
                            <span>{dur.label}</span>
                            <strong className="text-white">{dur.price}</strong>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Add Fuel perk */}
                    <div
                      onClick={() => {
                        sfx.playClick();
                        setAddFuel(!addFuel);
                      }}
                      className="p-2 sm:p-2.5 bg-white/5 border border-white/10 hover:border-white/30 cursor-pointer flex items-center justify-between mb-4 sm:mb-6"
                    >
                      <div className="flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <div className="text-xs">
                          <span className="text-white font-medium block">Add Fuel Pack (+ $4)</span>
                          <span className="text-zinc-500 text-[9px] sm:text-[10px]">Monster / Red Bull + Chips</span>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={addFuel}
                        onChange={() => {}}
                        className="accent-red-600 w-4 h-4 cursor-pointer flex-shrink-0"
                      />
                    </div>
                  </div>

                  {/* Confirm CTA */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5 text-xs sm:text-sm">
                      <span className="font-mono text-zinc-400">Total Session Fee:</span>
                      <strong className="font-display text-xl sm:text-2xl font-black italic text-amber-400">
                        ${totalPrice}
                      </strong>
                    </div>

                    <button
                      onClick={handleBook}
                      onMouseEnter={() => sfx.playHover()}
                      className="w-full py-3 sm:py-3.5 bg-red-600 hover:bg-red-500 text-white font-display text-sm sm:text-base font-black italic tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(232,25,44,0.5)] active:scale-98"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                      }}
                    >
                      <Zap className="w-4 h-4 fill-white" />
                      <span>LOCK RIG & ISSUE PASS</span>
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hologram Booking Pass Animation */}
      <BookingAnimation
        game={game}
        open={showBookingAnim}
        duration={selectedDuration}
        rig={selectedRig}
        price={totalPrice}
        onClose={() => {
          setShowBookingAnim(false);
          onClose();
        }}
      />
    </>
  );
}
