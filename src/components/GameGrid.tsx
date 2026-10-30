import { AnimatePresence, motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import type { Game } from '../types/game';
import { GameCard } from './GameCard';

interface GameGridProps {
  games: Game[];
  onGameClick: (game: Game) => void;
}

export function GameGrid({ games, onGameClick }: GameGridProps) {
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
            key="grid"
            className="grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-5"
          >
            {games.map((game, i) => (
              <GameCard
                key={game.id}
                game={game}
                onClick={onGameClick}
                index={i}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
