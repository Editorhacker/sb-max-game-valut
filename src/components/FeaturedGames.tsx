import { motion } from 'framer-motion';
import { Crown, Zap, Flame, ArrowUpRight } from 'lucide-react';
import { games, featuredGameIds } from '../data/games';
import type { Game } from '../types/game';
import { getGameHeaderUrl, getPlatformBadgeClass, getCafeRigInfo } from '../lib/utils';
import { sfx } from '../lib/sound';

interface FeaturedGamesProps {
  onGameClick: (game: Game) => void;
}

const featuredGames = featuredGameIds
  .map((id) => games.find((g) => g.id === id))
  .filter(Boolean) as Game[];

function FeaturedCard({ game, onClick, index }: { game: Game; onClick: (g: Game) => void; index: number }) {
  const rigInfo = getCafeRigInfo(game);

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => {
        sfx.playHoloOpen();
        onClick(game);
      }}
      onMouseEnter={() => sfx.playHover()}
      className="relative bg-[#0d0f1a] border border-white/10 hover:border-red-500/70 transition-all duration-300 flex flex-col group cursor-pointer overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(232,25,44,0.3)] hover:-translate-y-1.5"
      style={{
        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
      }}
    >
      {/* Artwork Banner Container - Clean and clear */}
      <div className="relative h-48 sm:h-64 overflow-hidden bg-black/40">
        <motion.img
          src={getGameHeaderUrl(game)}
          alt={game.title}
          loading="lazy"
          className="w-full h-full object-cover object-center filter contrast-110 group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Ambient bottom gradient so text below separates cleanly */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
          <span
            className={`px-2.5 py-1 text-xs font-mono font-bold border backdrop-blur-md ${getPlatformBadgeClass(game.platform)}`}
            style={{ clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))' }}
          >
            {game.platform}
          </span>
          <span className="px-2 py-1 text-[11px] font-mono font-semibold bg-black/75 backdrop-blur-md text-amber-300 border border-amber-400/30">
            {game.releaseYear}
          </span>
        </div>

        {/* Crown Badge */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold bg-red-600/90 text-white shadow-[0_0_15px_rgba(232,25,44,0.6)]">
            <Crown className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            TOP CAFE PICK
          </span>
        </div>

        {/* Cafe Rig Target Overlay on image bottom right */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="px-2.5 py-1 text-[10px] font-mono font-bold bg-black/85 backdrop-blur-md text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
            <Zap className="w-3 h-3 fill-emerald-400" />
            {rigInfo.fps}
          </span>
        </div>
      </div>

      {/* Content Section - Placed Below Image, No text collisions! */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[11px] font-bold tracking-widest text-red-500 uppercase">
              {game.primaryGenre}
            </span>
            <span className="font-mono text-[11px] text-zinc-400">
              {rigInfo.rigName}
            </span>
          </div>

          <h3 className="font-display text-2xl font-black italic uppercase text-white tracking-wide group-hover:text-red-400 transition-colors line-clamp-1">
            {game.title}
          </h3>

          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Action Row */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Installed & Ready</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              sfx.playLockSuccess();
              onClick(game);
            }}
            onMouseEnter={() => sfx.playHover()}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-display text-xs font-black italic uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(232,25,44,0.4)] group-hover:shadow-[0_0_25px_rgba(232,25,44,0.7)]"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
            }}
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>BOOK RIG</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedGames({ onGameClick }: FeaturedGamesProps) {
  return (
    <section id="featured" className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-8 sm:mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-8 h-0.5 bg-red-600 shadow-[0_0_8px_#e8192c]" />
          <span className="font-mono text-[11px] sm:text-xs font-bold tracking-widest text-red-500 uppercase flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 fill-red-500" />
            HIGH-DEMAND TITLES
          </span>
        </div>
        <h2 className="font-display text-3xl min-[420px]:text-4xl sm:text-5xl lg:text-6xl font-black italic uppercase text-white tracking-tight leading-none mb-2 sm:mb-3">
          MUST-PLAY <span className="text-red-500">EXPERIENCES</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
          Pre-installed and optimized with custom ultra graphics profiles on our RTX 4090 and PS5 Pro battle stations.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {featuredGames.map((game, i) => (
          <FeaturedCard key={game.id} game={game} onClick={onGameClick} index={i} />
        ))}
      </div>
    </section>
  );
}
