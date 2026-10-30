import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, ArrowUpRight } from 'lucide-react';
import type { Game } from '../types/game';
import { getGameCoverUrl, getPlatformBadgeClass, getCafeRigInfo } from '../lib/utils';
import { sfx } from '../lib/sound';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
  index: number;
}

export function GameCard({ game, onClick, index }: GameCardProps) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const rig = getCafeRigInfo(game);

  // Reliable poster URL with fallback
  const posterUrl = imgError
    ? 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/library_600x900.jpg'
    : getGameCoverUrl(game);

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      onClick={() => {
        sfx.playHoloOpen();
        onClick(game);
      }}
      onMouseEnter={() => {
        setHovered(true);
        sfx.playHover();
      }}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-[#0d0f1a] border border-white/10 hover:border-red-500/70 transition-all duration-300 flex flex-col group cursor-pointer overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(232,25,44,0.3)] hover:-translate-y-2"
      style={{
        clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
      }}
    >
      {/* 2:3 Vertical Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-black/60 flex-shrink-0">
        <motion.img
          src={posterUrl}
          alt={game.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center filter contrast-110 group-hover:scale-108 transition-transform duration-600 ease-out"
        />

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a] via-[#0d0f1a]/25 to-transparent" />

        {/* Platform badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-flex items-center px-2 py-0.5 text-xs font-mono font-bold border backdrop-blur-md ${getPlatformBadgeClass(game.platform)}`}
            style={{ clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))' }}
          >
            {game.platform}
          </span>
        </div>

        {/* Year badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-mono font-semibold bg-black/80 backdrop-blur-md text-amber-300 border border-amber-400/30">
            {game.releaseYear}
          </span>
        </div>

        {/* Live FPS badge at bottom right of poster */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-black/85 backdrop-blur-md text-emerald-400 border border-emerald-500/40">
            {rig.fps.split(' ')[0]}
          </span>
        </div>

        {/* Cyber laser scan line on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/25 to-transparent pointer-events-none"
          animate={{ y: hovered ? ['-100%', '200%'] : '-100%' }}
          transition={{ duration: 1.2, repeat: hovered ? Infinity : 0, ease: 'linear' }}
        />
      </div>

      {/* Card Body */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2.5 sm:gap-3">
        <div>
          {/* Genre tag */}
          <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-widest text-red-400 uppercase block mb-1">
            {game.primaryGenre}
          </span>

          {/* Title */}
          <h3 className="font-display text-lg sm:text-xl font-black italic uppercase text-white tracking-wide group-hover:text-red-400 transition-colors line-clamp-1 leading-snug">
            {game.title}
          </h3>

          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-zinc-400 mt-1.5 sm:mt-2">
            <Users className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
            <span className="truncate">{game.modes[0]}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sfx.playLockSuccess();
            onClick(game);
          }}
          onMouseEnter={() => sfx.playHover()}
          className="w-full py-2 sm:py-2.5 bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-500 text-white font-display text-[11px] sm:text-xs font-black italic uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all group-hover:bg-red-600 shadow-sm"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
          }}
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>SELECT RIG</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.article>
  );
}
