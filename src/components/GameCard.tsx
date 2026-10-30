import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Users, Code } from 'lucide-react';
import type { Game } from '../types/game';
import { getSteamImageUrl, getPlatformBadgeClass, getGenreGradient } from '../lib/utils';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
  index: number;
}

export function GameCard({ game, onClick, index }: GameCardProps) {
  const [imgError, setImgError] = useState(false);
  const hasSteamImage = game.steamAppId !== null && !imgError;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#111218] border border-white/8 hover:border-amber-400/40 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-red-600/20 hover:shadow-2xl"
      onClick={() => onClick(game)}
    >
      {/* Artwork */}
      <div className="relative aspect-[2/3] overflow-hidden flex-shrink-0">
        {hasSteamImage ? (
          <img
            src={getSteamImageUrl(game.steamAppId!)}
            alt={game.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-b ${getGenreGradient(game.primaryGenre)} flex flex-col items-center justify-center p-4`}
          >
            <div className="text-5xl mb-3 opacity-40">🎮</div>
            <span className="text-white/60 text-xs font-semibold uppercase tracking-widest text-center">
              {game.primaryGenre}
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111218] via-[#111218]/20 to-transparent opacity-75 group-hover:opacity-85 transition-opacity" />

        {/* Platform badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border backdrop-blur-sm ${getPlatformBadgeClass(game.platform)}`}
          >
            {game.platform}
          </span>
        </div>

        {/* Gold Year badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-black/70 text-amber-300/90 backdrop-blur-sm border border-amber-400/25">
            {game.releaseYear}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="font-bold text-white text-sm leading-snug line-clamp-2 group-hover:text-amber-200 transition-colors">
          {game.title}
        </h3>

        {/* Genre tag */}
        <span className="self-start px-2.5 py-0.5 rounded-full bg-red-950/40 border border-red-500/20 text-red-300 text-xs font-medium">
          {game.primaryGenre}
        </span>

        {/* Meta row */}
        <div className="flex flex-col gap-1 mt-auto pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Code className="w-3 h-3 flex-shrink-0 text-amber-400/80" />
            <span className="truncate">{game.developer}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Users className="w-3 h-3 flex-shrink-0 text-red-400/80" />
            <span className="truncate">{game.modes.join(', ')}</span>
          </div>
        </div>

        {/* View details button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            onClick(game);
          }}
          className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-red-600/20 hover:to-amber-500/20 border border-white/8 hover:border-amber-400/40 text-gray-300 hover:text-amber-300 text-xs font-semibold transition-all duration-200"
        >
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          View Details
        </motion.button>
      </div>
    </motion.article>
  );
}
