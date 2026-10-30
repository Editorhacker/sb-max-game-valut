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
import { getGameCoverUrl, getGameHeaderUrl, getPlatformBadgeClass } from '../lib/utils';
import { sfx } from '../lib/sound';

interface GameDetailsDialogProps {
  game: Game | null;
  open: boolean;
  onClose: () => void;
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-950/40 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(232,25,44,0.15)]">
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[10px] sm:text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
          {label}
        </span>
        <div className="text-xs sm:text-sm text-zinc-200 font-medium">
          {value}
        </div>
      </div>
    </div>
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

          {/* Modal Container - Fixed size, no scrollable overflow on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#0d0f1a] border border-red-500/50 shadow-[0_0_60px_rgba(232,25,44,0.3)] my-auto max-h-[95vh] overflow-y-auto md:overflow-hidden z-10"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
            }}
          >
            {/* Circular Close Button */}
            <button
              onClick={handleClose}
              onMouseEnter={() => sfx.playHover()}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/80 hover:bg-red-600 text-zinc-300 hover:text-white transition-all border border-white/10 flex items-center justify-center cursor-pointer shadow-lg"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Header Image with Neon Vignette */}
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

            {/* Below Section: Game Details matching reference design */}
            <div className="p-3.5 sm:p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5 md:gap-6 bg-[#0d0f1a]">
              {/* Left Column: Description & Metadata */}
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-1 line-clamp-3">
                  {game.description}
                </p>

                <div className="space-y-0">
                  <InfoRow icon={Code} label="DEVELOPER" value={game.developer} />
                  <InfoRow icon={Building2} label="PUBLISHER" value={game.publisher} />
                  <InfoRow icon={Monitor} label="PLATFORM" value={game.platform} />
                  <InfoRow icon={Users} label="PLAYERS" value={game.players} />
                </div>
              </div>

              {/* Right Column: Modes, Genres, Highlights, Tags */}
              <div className="flex flex-col gap-2">
                <div className="space-y-0">
                  <InfoRow
                    icon={Gamepad2}
                    label="GAME MODES"
                    value={
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {game.modes.map((m) => (
                          <span
                            key={m}
                            className="px-2 py-0.5 rounded bg-white/8 text-zinc-300 text-xs border border-white/10 font-medium"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    }
                  />

                  <InfoRow
                    icon={Tag}
                    label="GENRES"
                    value={
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {game.genres.map((g) => (
                          <span
                            key={g}
                            className="px-2 py-0.5 rounded bg-red-950/60 text-red-300 text-xs border border-red-500/30 font-medium"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    }
                  />
                </div>

                {/* Key Highlights */}
                {game.highlights && game.highlights.length > 0 && (
                  <div className="pt-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                        KEY HIGHLIGHTS
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {game.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-300 leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1 shadow-[0_0_6px_#ffd700]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                {game.tags && game.tags.length > 0 && (
                  <div className="pt-1 flex flex-wrap gap-1.5">
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
