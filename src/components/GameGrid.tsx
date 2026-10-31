import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Gamepad2, Crosshair } from 'lucide-react';
import type { Game } from '../types/game';
import { GameCard } from './GameCard';

interface GameGridProps {
  games: Game[];
  onGameClick: (game: Game) => void;
}

export function GameGrid({ games, onGameClick }: GameGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mouse drag-to-scroll interaction refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStartLeft = useRef(0);
  const hasMoved = useRef(false);

  // Update active index based on scroll position
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || games.length === 0) return;
    const width = el.clientWidth;
    if (width > 0) {
      const index = Math.round(el.scrollLeft / width);
      setActiveIndex(Math.min(Math.max(0, index), games.length - 1));
    }
  }, [games.length]);

  // Reset scroll whenever filtered games change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
    setActiveIndex(0);
  }, [games]);

  // Mouse drag-to-scroll handlers (for desktop users without trackpad)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !scrollRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX;
    scrollStartLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const delta = e.pageX - startX.current;
    if (Math.abs(delta) > 5) {
      hasMoved.current = true;
    }
    scrollRef.current.scrollLeft = scrollStartLeft.current - delta;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setTimeout(() => {
      hasMoved.current = false;
    }, 60);
  };

  const handleCardClick = (game: Game) => {
    // If user dragged horizontally, ignore the click to avoid opening dialog
    if (hasMoved.current) return;
    onGameClick(game);
  };

  const currentGame = games[activeIndex] || games[0];

  return (
    <div className="w-full">
      <AnimatePresence mode="popLayout">
        {games.length === 0 || !currentGame ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center py-16 sm:py-24 gap-4 sm:gap-5 border border-white/10 bg-[#0d0f1a]/50"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
            }}
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
            key="scrollable-spotlight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3 sm:gap-4"
          >
            {/* Top Status Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-white/5 font-mono">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-400 bg-red-600/10 border border-red-500/30 shadow-[0_0_15px_rgba(232,25,44,0.15)]"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))',
                  }}
                >
                  <Crosshair className="w-3.5 h-3.5 text-red-500" />
                  <span>CENTER SPOTLIGHT</span>
                </span>
                <span className="text-xs text-zinc-400">
                  GAME <strong className="text-amber-400">{String(activeIndex + 1).padStart(2, '0')}</strong> /{' '}
                  <strong className="text-white">{String(games.length).padStart(2, '0')}</strong>
                </span>
              </div>

              <div className="font-mono text-[11px] text-zinc-500">
                <span>SWIPE OR DRAG TO SCROLL</span>
              </div>
            </div>

            {/* Purely Scrollable Track (100% Width Per Slide, 1 Card In Dead Center) */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-full overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory scroll-smooth py-3 no-scrollbar cursor-grab active:cursor-grabbing select-none"
            >
              {games.map((game, i) => (
                <div
                  key={game.id}
                  className="w-full shrink-0 flex items-center justify-center snap-center px-2 sm:px-4"
                >
                  <div className="w-full max-w-[280px] min-[400px]:max-w-[310px] sm:max-w-[340px] md:max-w-[360px]">
                    <GameCard
                      game={game}
                      onClick={handleCardClick}
                      index={i}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Cyber Vault Scrubber & Track */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5 font-mono text-[11px]">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-300 font-semibold truncate max-w-[220px] sm:max-w-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="truncate uppercase tracking-wider">{currentGame.title}</span>
                </span>

                <span className="text-amber-400 font-bold shrink-0">
                  {activeIndex + 1} / {games.length}
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-full h-1 bg-[#0d0f1a] border border-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-600 transition-all duration-150 shadow-[0_0_10px_#e8192c]"
                  style={{
                    width: `${((activeIndex + 1) / Math.max(1, games.length)) * 100}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-center text-[10px] text-zinc-500">
                <span>← SCROLL OR SWIPE TO EXPLORE TITLES →</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


