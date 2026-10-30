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
            className="col-span-full flex flex-col items-center justify-center py-24 gap-5"
          >
            <div className="w-20 h-20 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center">
              <Gamepad2 className="w-8 h-8 text-gray-600" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-300 mb-1">No games found</h3>
              <p className="text-gray-500 text-sm max-w-sm">
                No games match your current filters. Try adjusting your search or clearing filters.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
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
