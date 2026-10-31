import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Code,
  Building2,
  Users,
  Tag,
  Star,
  Monitor,
  Gamepad2,
} from 'lucide-react';
import type { Game } from '../types/game';
import {
  getGameCoverUrl,
  getGameHeaderUrl,
  getPlatformBadgeClass,
} from '../lib/utils';
import { sfx } from '../lib/sound';

interface GameDetailsDialogProps {
  game: Game | null;
  open: boolean;
  onClose: () => void;
}

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function GameDetailsDialog({ game, open, onClose }: GameDetailsDialogProps) {
  useEffect(() => {
    if (open) {
      sfx.playHoloOpen();
    }
  }, [open]);

  if (!game) return null;


  const handleClose = () => {
    sfx.playClick();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xl"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#0d0f1a] border border-red-500/50 shadow-[0_0_60px_rgba(232,25,44,0.3)] my-auto max-h-[95vh] overflow-y-auto z-10"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
            }}
          >
            {/* Top Action Controls: Close Button */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-2 sm:gap-2.5">
              <button
                onClick={handleClose}
                onMouseEnter={() => sfx.playHover()}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/80 hover:bg-red-600 text-zinc-300 hover:text-white transition-all border border-white/10 flex items-center justify-center cursor-pointer shadow-lg"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </div>

            {/* Header Image with Neon Vignette - UNTOUCHED */}
            <div className="relative h-44 sm:h-72 overflow-hidden bg-black flex-shrink-0">
              <img
                src={getGameHeaderUrl(game)}
                alt={game.title}
                className="w-full h-full object-cover object-center filter contrast-125 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a] via-[#0d0f1a]/70 to-black/40" />

              {/* Poster Thumbnail & Title Overlay */}
              <div className="absolute bottom-2.5 sm:bottom-3.5 left-3 sm:left-6 flex items-end gap-3 sm:gap-4 max-w-[85%]">
                <div className="hidden sm:block w-14 sm:w-16 aspect-[2/3] rounded border border-red-500/60 shadow-[0_0_15px_rgba(232,25,44,0.4)] overflow-hidden flex-shrink-0">
                  <img
                    src={getGameCoverUrl(game)}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono font-bold border ${getPlatformBadgeClass(game.platform)}`}>
                      {game.platform}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono font-semibold bg-black/60 text-amber-300 border border-amber-400/30">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {game.releaseYear}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] sm:text-xs font-mono font-bold bg-red-600/80 text-white rounded">
                      {game.primaryGenre}
                    </span>
                  </div>

                  <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-black italic uppercase text-white leading-tight truncate">
                    {game.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Below Section: Redesigned & Readjusted Info Part */}
            <div className="p-3.5 sm:p-5 md:p-6 bg-[#0d0f1a] flex flex-col gap-4 sm:gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Left Column: Description, Station Rig, Metadata */}
                <div className="flex flex-col gap-3 sm:gap-3.5">
                  {/* Game Description */}
                  <div className="relative pl-3 border-l-2 border-red-500/70 bg-white/[0.02] p-2.5 rounded-r-lg">
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  {/* 2x2 Specs & Details Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-red-500/30 transition-colors">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                        <Code className="w-3 h-3 text-amber-400 flex-shrink-0" />
                        <span>DEVELOPER</span>
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-zinc-200 mt-1 truncate" title={game.developer}>
                        {game.developer}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-red-500/30 transition-colors">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                        <Building2 className="w-3 h-3 text-amber-400 flex-shrink-0" />
                        <span>PUBLISHER</span>
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-zinc-200 mt-1 truncate" title={game.publisher}>
                        {game.publisher}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-red-500/30 transition-colors">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                        <Monitor className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                        <span>PLATFORM</span>
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-zinc-200 mt-1 truncate">
                        {game.platform}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-red-500/30 transition-colors">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                        <Users className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span>PLAYERS</span>
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-zinc-200 mt-1 truncate" title={game.players}>
                        {game.players}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Modes, Genres, Highlights, Tags */}
                <div className="flex flex-col gap-3 sm:gap-3.5">
                  {/* Game Modes & Genres */}
                  <div className="space-y-2.5">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Gamepad2 className="w-3 h-3 text-amber-400" />
                        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                          GAME MODES
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {game.modes.map((m) => (
                          <span
                            key={m}
                            className="px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.1] text-zinc-200 text-xs border border-white/10 font-medium transition-colors"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Tag className="w-3 h-3 text-red-400" />
                        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                          GENRES
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {game.genres.map((g) => (
                          <span
                            key={g}
                            className="px-2.5 py-1 rounded-md bg-red-950/60 hover:bg-red-900/60 text-red-300 text-xs border border-red-500/30 font-medium transition-colors"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  {game.highlights && game.highlights.length > 0 && (
                    <div className="p-3 rounded-lg bg-amber-500/[0.04] border border-amber-500/20">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                          KEY HIGHLIGHTS
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {game.highlights.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-zinc-300 leading-snug">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5 shadow-[0_0_6px_#ffd700]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  {game.tags && game.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {game.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[11px] font-mono hover:border-amber-400/40 hover:text-amber-200 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Dedicated Instagram Follow CTA Bar */}
              <div className="mt-1 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-purple-950/40 via-red-950/30 to-black/60 p-3 sm:p-3.5 rounded-xl border border-red-500/25 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#fd1d1d] via-[#e1306c] to-[#833ab4] flex items-center justify-center text-white flex-shrink-0 shadow-[0_0_15px_rgba(225,48,108,0.4)]">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-display font-black italic uppercase text-white tracking-wide truncate">
                      SB GAMING ESPORTS
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 truncate">
                      Follow <span className="text-pink-400 font-bold">@sbgaming._</span> on Instagram
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.instagram.com/sbgaming._?utm_source=ig_web_button_share_sheet&mdxt=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sfx.playClick()}
                  onMouseEnter={() => sfx.playHover()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white text-xs sm:text-sm font-display font-black italic tracking-wider uppercase transition-all shadow-[0_0_18px_rgba(225,48,108,0.5)] hover:shadow-[0_0_28px_rgba(225,48,108,0.8)] hover:scale-105 active:scale-95 cursor-pointer border border-white/20 select-none flex-shrink-0"
                  aria-label="Follow on Instagram"
                >
                  <InstagramIcon className="w-4 h-4 text-white" />
                  <span>FOLLOW</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
