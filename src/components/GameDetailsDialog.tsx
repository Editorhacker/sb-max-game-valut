import { useState, useEffect } from 'react';
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
  BookmarkPlus,
  CheckCircle2,
} from 'lucide-react';
import type { Game } from '../types/game';
import { getSteamImageUrl, getPlatformBadgeClass, getGenreGradient } from '../lib/utils';
import { BookingAnimation } from './BookingAnimation';

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
    <div className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-red-950/30 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-amber-400" />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
        <span className="text-sm text-gray-200 font-medium">{value}</span>
      </div>
    </div>
  );
}

export function GameDetailsDialog({ game, open, onClose }: GameDetailsDialogProps) {
  const [imgError, setImgError] = useState(false);
  const [booked, setBooked] = useState(false);
  const [showBookingAnim, setShowBookingAnim] = useState(false);

  // Reset booking state whenever a new game is opened
  useEffect(() => {
    setBooked(false);
    setShowBookingAnim(false);
    setImgError(false);
  }, [game?.id]);

  if (!game) return null;

  const hasSteamImage = game.steamAppId !== null && !imgError;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleBook = () => {
    setBooked(true);
    setShowBookingAnim(true);
  };

  const handleDismissBooking = () => {
    setShowBookingAnim(false);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md"
              onClick={handleBackdropClick}
              aria-hidden="true"
            />

            {/* Dialog */}
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
              role="dialog"
              aria-modal="true"
              aria-label={`Details for ${game.title}`}
            >
              <motion.div
                key="dialog"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                className="pointer-events-auto relative w-full max-w-3xl max-h-[90vh] flex flex-col lg:flex-row rounded-2xl overflow-hidden bg-[#0a0a0f] border border-amber-400/25 shadow-2xl shadow-black/90"
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black/90 border border-white/10 hover:border-amber-400/40 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4 text-gray-300 hover:text-amber-400" />
                </button>

                {/* Left: Artwork */}
                <div className="relative w-full lg:w-72 flex-shrink-0 aspect-[2/3] lg:aspect-auto lg:h-auto overflow-hidden max-h-64 lg:max-h-full">
                  {hasSteamImage ? (
                    <img
                      src={getSteamImageUrl(game.steamAppId!)}
                      alt={game.title}
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full h-full min-h-64 lg:min-h-0 bg-gradient-to-b ${getGenreGradient(game.primaryGenre)} flex flex-col items-center justify-center gap-3`}
                    >
                      <Gamepad2 className="w-16 h-16 text-white/20" />
                      <span className="text-white/40 text-sm font-semibold uppercase tracking-widest text-center px-4">
                        {game.primaryGenre}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent lg:bg-gradient-to-r" />
                </div>

                {/* Right: Details */}
                <div className="flex-1 flex flex-col overflow-y-auto">
                  {/* Header */}
                  <div className="p-6 pb-4 border-b border-white/5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold border ${getPlatformBadgeClass(game.platform)}`}
                      >
                        {game.platform}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-black/60 text-amber-300/90 border border-amber-400/30">
                        <Calendar className="w-3 h-3 text-amber-400" />
                        {game.releaseYear}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-white leading-tight mb-2">{game.title}</h2>
                    <p className="text-sm text-gray-400 leading-relaxed">{game.description}</p>
                  </div>

                  {/* Details body */}
                  <div className="flex-1 p-6 space-y-0">
                    <InfoRow icon={Code} label="Developer" value={game.developer} />
                    <InfoRow icon={Building2} label="Publisher" value={game.publisher} />
                    <InfoRow icon={Monitor} label="Platform" value={game.platform} />
                    <InfoRow icon={Users} label="Players" value={game.players} />
                    <InfoRow
                      icon={Gamepad2}
                      label="Game Modes"
                      value={
                        <div className="flex flex-wrap gap-1 mt-1">
                          {game.modes.map((m) => (
                            <span
                              key={m}
                              className="px-2 py-0.5 rounded-md bg-white/8 text-gray-300 text-xs border border-white/10"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      }
                    />
                    <InfoRow
                      icon={Tag}
                      label="Genres"
                      value={
                        <div className="flex flex-wrap gap-1 mt-1">
                          {game.genres.map((g) => (
                            <span
                              key={g}
                              className="px-2 py-0.5 rounded-md bg-red-600/15 text-red-300 text-xs border border-red-500/25"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                      }
                    />

                    {/* Highlights with Gold accents */}
                    <div className="pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                          Key Highlights
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {game.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5 text-sm text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-2 shadow-sm shadow-amber-400" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="pt-4 pb-2">
                      <div className="flex flex-wrap gap-1.5">
                        {game.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-gray-400 text-xs font-medium hover:border-amber-400/40 hover:text-amber-200 transition-colors"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── BOOK BUTTON with Red, Gold & Black Theme ── */}
                  <div className="px-6 pb-6 pt-2 border-t border-white/5 flex-shrink-0">
                    <AnimatePresence mode="wait">
                      {booked ? (
                        <motion.div
                          key="booked-state"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-gradient-to-r from-red-600/20 via-amber-500/15 to-red-600/20 border border-amber-400/40 text-amber-300 font-bold text-sm shadow-lg shadow-amber-500/10"
                        >
                          <CheckCircle2 className="w-5 h-5 text-amber-400" />
                          Booked at SB-MAX Vault — Ready to Play!
                        </motion.div>
                      ) : (
                        <motion.button
                          key="book-btn"
                          id="book-game-btn"
                          onClick={handleBook}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="relative w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-black text-sm tracking-wide overflow-hidden group cursor-pointer text-white border border-amber-400/40 shadow-lg shadow-red-600/30 hover:shadow-amber-500/30"
                          style={{
                            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)',
                          }}
                        >
                          {/* Shimmer sweep on hover */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                          />
                          <BookmarkPlus className="w-5 h-5 text-amber-300 relative z-10" />
                          <span className="relative z-10 flex items-center gap-2">
                            <span>Book This Game in Vault</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                              Instant
                            </span>
                          </span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Full-page booking celebration animation */}
      {game && (
        <BookingAnimation
          game={game}
          visible={showBookingAnim}
          onDismiss={handleDismissBooking}
        />
      )}
    </>
  );
}
