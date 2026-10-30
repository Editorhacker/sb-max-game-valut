import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Gamepad2, ChevronDown } from 'lucide-react';
import type { Game } from '../types/game';
import { GameCard } from './GameCard';
import { sfx } from '../lib/sound';

interface GameGridProps {
  games: Game[];
  onGameClick: (game: Game) => void;
}

const PAGE_SIZE = 10;

export function GameGrid({ games, onGameClick }: GameGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset to initial count whenever the filtered list of games changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [games]);

  const visibleGames = games.slice(0, visibleCount);
  const hasMore = visibleCount < games.length;

  const handleSeeMore = () => {
    sfx.playClick();
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="popLayout">
        {games.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="col-span-full flex flex-col items-center justify-center py-16 sm:py-24 gap-4 sm:gap-5"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center">
              <Gamepad2 className="w-7 h-7 sm:w-8 sm:h-8 text-gray-600" />
            </div>
            <div className="text-center px-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-300 mb-1">No games found</h3>
              <p className="text-gray-500 text-xs sm:text-sm max-w-sm">
                No games match your current filters. Try adjusting your search query or clearing filters.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-5">
              {visibleGames.map((game, i) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onClick={onGameClick}
                  index={i}
                />
              ))}
            </div>

            {hasMore && (
              <div className="mt-10 sm:mt-12 flex flex-col items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={handleSeeMore}
                  onMouseEnter={() => sfx.playHover()}
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 font-display text-sm sm:text-base font-black italic tracking-widest text-white uppercase transition-all duration-300 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 shadow-[0_0_25px_rgba(232,25,44,0.4)] hover:shadow-[0_0_35px_rgba(232,25,44,0.7)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                  }}
                >
                  <span>SEE MORE</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
                <span className="font-mono text-[11px] text-zinc-400">
                  Showing <strong className="text-amber-400">{visibleGames.length}</strong> of{' '}
                  <strong className="text-white">{games.length}</strong> games
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
