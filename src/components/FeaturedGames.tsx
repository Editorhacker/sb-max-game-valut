import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Calendar, Sparkles, Crown } from 'lucide-react';
import { games, featuredGameIds } from '../data/games';
import type { Game } from '../types/game';
import { getSteamImageUrl, getPlatformBadgeClass, getGenreGradient } from '../lib/utils';

interface FeaturedGamesProps {
  onGameClick: (game: Game) => void;
}

const featuredGames = featuredGameIds
  .map((id) => games.find((g) => g.id === id))
  .filter(Boolean) as Game[];

function FeaturedCard({ game, onClick, index }: { game: Game; onClick: (g: Game) => void; index: number }) {
  const [imgError, setImgError] = useState(false);
  const hasSteamImage = game.steamAppId !== null && !imgError;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-600/20 bg-[#12131b]"
      onClick={() => onClick(game)}
    >
      {/* Artwork */}
      <div className="relative aspect-video overflow-hidden">
        {hasSteamImage ? (
          <img
            src={getSteamImageUrl(game.steamAppId!)}
            alt={game.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            style={{ objectPosition: 'top center' }}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${getGenreGradient(game.primaryGenre)}`} />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-bold border backdrop-blur-sm ${getPlatformBadgeClass(game.platform)}`}
          >
            {game.platform}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/60 text-gray-300 backdrop-blur-sm border border-white/10 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-amber-400" />
            {game.releaseYear}
          </span>
        </div>

        {/* Gold Featured badge */}
        <div className="absolute top-4 right-4">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-gradient-to-r from-amber-500/25 via-yellow-500/20 to-amber-500/10 text-amber-300 border border-amber-400/40 backdrop-blur-md shadow-sm shadow-amber-500/20">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Featured
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-xs text-red-400/90 font-semibold mb-1 block uppercase tracking-wider">
            {game.primaryGenre}
          </span>
          <h3 className="text-xl font-black text-white leading-tight mb-2 group-hover:text-amber-300 transition-colors">
            {game.title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2 mb-4 leading-relaxed">{game.description}</p>
          <button
            onClick={(e) => { e.stopPropagation(); onClick(game); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-gradient-to-r hover:from-red-600/30 hover:to-amber-500/30 border border-white/10 hover:border-amber-400/40 text-white hover:text-amber-300 text-sm font-semibold transition-all duration-200"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            View Details
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedGames({ onGameClick }: FeaturedGamesProps) {
  return (
    <section id="featured" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-10"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-amber-400 to-red-600 shadow-sm shadow-amber-400" />
            <span className="text-amber-400 text-xs font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 fill-amber-400" />
              Vault Highlights
            </span>
          </div>
          <h2 className="text-3xl font-black text-white">Must-Play Games</h2>
          <p className="text-gray-400 text-sm mt-1">Hand-picked iconic titles curated for the SB-MAX Vault.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredGames.map((game, i) => (
          <FeaturedCard key={game.id} game={game} onClick={onGameClick} index={i} />
        ))}
      </div>
    </section>
  );
}
