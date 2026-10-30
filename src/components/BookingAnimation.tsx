import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Gamepad2, X, Sparkles, Crown } from 'lucide-react';
import type { Game } from '../types/game';
import { getSteamImageUrl, getGenreGradient, getPlatformBadgeClass } from '../lib/utils';

interface BookingAnimationProps {
  game: Game;
  visible: boolean;
  onDismiss: () => void;
}

// ── Confetti colours tailored to Black, Red & Gold aesthetic ─────────────────
const CONFETTI_COLORS = [
  '#f59e0b', '#fbbf24', '#fcd34d', '#d97706', // Golds
  '#ef4444', '#dc2626', '#b91c1c', '#f87171', // Reds
  '#ffffff', '#fef08a',                        // Shimmering highlights
];

interface Particle {
  id: number;
  x: number;
  rotation: number;
  color: string;
  size: number;
  shape: 'square' | 'circle' | 'star';
  vx: number;
  vy: number;
  delay: number;
}

// Generate once at module load
const PARTICLES: Particle[] = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  rotation: Math.random() * 360,
  color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  size: 6 + Math.random() * 10,
  shape: (['square', 'circle', 'star'] as const)[Math.floor(Math.random() * 3)],
  vx: (Math.random() - 0.5) * 50,
  vy: 2 + Math.random() * 4,
  delay: Math.random() * 0.9,
}));

function ConfettiParticle({ p }: { p: Particle }) {
  const isCircle = p.shape === 'circle';
  const isStar = p.shape === 'star';

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{
        left: `${p.x}%`,
        top: '-4%',
        width: isStar ? undefined : p.size,
        height: isStar ? undefined : p.size,
        borderRadius: isCircle ? '50%' : '2px',
        backgroundColor: isStar ? 'transparent' : p.color,
        color: p.color,
        fontSize: isStar ? p.size * 1.5 : undefined,
        lineHeight: 1,
      }}
      initial={{ y: 0, opacity: 1, rotate: p.rotation, x: 0 }}
      animate={{
        y: '115vh',
        x: [0, p.vx, p.vx * 0.5, p.vx * 1.2],
        opacity: [1, 1, 0.7, 0],
        rotate: p.rotation + (p.id % 2 === 0 ? 540 : -540),
      }}
      transition={{
        duration: 2.4 + Math.random() * 1.6,
        delay: p.delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {isStar ? '★' : null}
    </motion.div>
  );
}

// ── Pulsing ripple ring ───────────────────────────────────────────────────────
function RippleRing({ delay = 0, color = 'border-red-500/50' }: { delay?: number; color?: string }) {
  return (
    <motion.div
      className={`absolute inset-0 rounded-full border-2 ${color}`}
      initial={{ scale: 0.6, opacity: 0.9 }}
      animate={{ scale: 2.6, opacity: 0 }}
      transition={{
        duration: 1.8,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
}

export function BookingAnimation({ game, visible, onDismiss }: BookingAnimationProps) {
  const [imgError, setImgError] = useState(false);
  const hasSteamImage = game.steamAppId !== null && !imgError;

  // Auto-dismiss after 6s
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onDismiss, 6000);
    return () => clearTimeout(t);
  }, [visible, onDismiss]);

  // Reset image error when game changes
  useEffect(() => {
    setImgError(false);
  }, [game.id]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="booking-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{ background: 'rgba(5,5,8,0.95)', backdropFilter: 'blur(16px)' }}
          onClick={onDismiss}
        >
          {/* Confetti rain */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {PARTICLES.map((p) => (
              <ConfettiParticle key={p.id} p={p} />
            ))}
          </div>

          {/* Booking card */}
          <motion.div
            initial={{ scale: 0.45, y: 100, opacity: 0, rotateX: -20 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.6, y: -80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.06 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center w-80 sm:w-96 rounded-3xl overflow-hidden border border-amber-400/40 shadow-2xl"
            style={{
              background: 'linear-gradient(160deg, #161722 0%, #07070a 100%)',
              boxShadow: '0 25px 60px -15px rgba(245, 158, 11, 0.25)',
            }}
          >
            {/* Animated Red & Gold glow border */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              animate={{
                boxShadow: [
                  '0 0 0px 0px rgba(245,158,11,0)',
                  '0 0 45px 8px rgba(245,158,11,0.35)',
                  '0 0 0px 0px rgba(245,158,11,0)',
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Close button */}
            <button
              onClick={onDismiss}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 hover:border-amber-400/40 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Game artwork */}
            <div className="relative w-full h-52 overflow-hidden flex-shrink-0">
              {hasSteamImage ? (
                <motion.img
                  src={getSteamImageUrl(game.steamAppId!)}
                  alt={game.title}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top"
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${getGenreGradient(game.primaryGenre)} flex items-center justify-center`}
                >
                  <Gamepad2 className="w-16 h-16 text-white/20" />
                </div>
              )}
              {/* Bottom fade */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#161722]" />

              {/* Platform badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border backdrop-blur-sm ${getPlatformBadgeClass(game.platform)}`}
                >
                  {game.platform}
                </span>
              </div>

              {/* Checkmark badge with Gold & Red Ripples */}
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
                <div className="relative flex items-center justify-center w-14 h-14">
                  <RippleRing delay={0.4} color="border-amber-400/60" />
                  <RippleRing delay={1.1} color="border-red-500/60" />
                  <motion.div
                    initial={{ scale: 0, rotate: -60 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 16,
                      delay: 0.3,
                    }}
                    className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-red-600 via-rose-600 to-amber-500 flex items-center justify-center shadow-2xl shadow-amber-500/60 ring-2 ring-amber-400/50"
                  >
                    <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className="w-full px-6 pt-12 pb-7 flex flex-col items-center gap-3 text-center">
              {/* Brand Sparkle label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-1.5 text-amber-400 text-xs font-extrabold uppercase tracking-widest"
              >
                <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>SB-MAX Game Booked!</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-2xl sm:text-3xl font-black text-white leading-tight"
              >
                {game.title}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-sm text-gray-400 leading-relaxed max-w-xs"
              >
                Your game has been booked into your{' '}
                <span className="text-amber-400 font-bold">SB-MAX Vault</span> session. Get ready for an epic adventure!
              </motion.p>

              {/* Divider with Gold Accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.78, duration: 0.5 }}
                className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent my-1"
              />

              {/* Meta chips */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.82 }}
                className="flex flex-wrap justify-center gap-2"
              >
                <span className="px-3 py-1 rounded-full bg-red-600/15 text-red-300 text-xs font-semibold border border-red-500/25">
                  {game.primaryGenre}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/50 text-amber-300 text-xs font-semibold border border-amber-400/30">
                  {game.releaseYear}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs font-semibold border border-white/10 truncate max-w-[140px]">
                  {game.developer}
                </span>
              </motion.div>

              {/* CTA Button with Gold & Red Energy */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.92 }}
                onClick={onDismiss}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="mt-3 w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 border border-amber-400/50 text-white font-black text-sm tracking-wide transition-all shadow-lg shadow-amber-500/25 cursor-pointer flex items-center justify-center gap-2 group/btn"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Awesome! Let's Play 🎮</span>
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-xs text-gray-500"
              >
                Closes automatically in a few seconds
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
