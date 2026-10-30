import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BattleStations } from './components/BattleStations';
import { PlatformSelector } from './components/PlatformSelector';
import { GameFilters } from './components/GameFilters';
import { GameGrid } from './components/GameGrid';
import { GameDetailsDialog } from './components/GameDetailsDialog';
import { FeaturedGames } from './components/FeaturedGames';
import { Footer } from './components/Footer';
import { useGameFilters } from './hooks/useGameFilters';
import type { Game, Platform } from './types/game';
import { motion } from 'framer-motion';
import { Crosshair } from 'lucide-react';
import { games } from './data/games';

function App() {
  const {
    filters, filteredGames, platformCounts, activeFilterCount,
    updateFilter, clearFilters,
  } = useGameFilters();

  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openGame = useCallback((game: Game) => {
    setSelectedGame(game);
    setDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => setDialogOpen(false), []);

  // Quick book from Hero or BattleStations
  const handleQuickBookStation = useCallback((_stationName?: string) => {
    // Pick the most relevant game for that station or open first game
    const defaultGame = games.find((g) => g.id === 'pc-cyberpunk-2077') || games[0];
    setSelectedGame(defaultGame);
    setDialogOpen(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dialogOpen) closeDialog();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dialogOpen, closeDialog]);

  return (
    <div className="min-h-screen bg-[#03040a] text-[#f0f0ff] selection:bg-red-600 selection:text-white">
      {/* Sound-reactive & live status Navbar */}
      <Navbar onQuickBook={() => handleQuickBookStation('PC Titan')} />

      {/* Cyber Samurai Hero with 3D parallax & live station lock */}
      <Hero
        searchValue={filters.search}
        onSearchChange={(v) => updateFilter('search', v)}
        onQuickBookRig={() => handleQuickBookStation('PC Titan')}
      />

      {/* Dedicated Gaming Cafe Battle Stations & Hardware Specs */}
      <BattleStations onSelectStation={handleQuickBookStation} />

      {/* High-Octane Featured Games */}
      <FeaturedGames onGameClick={openGame} />

      {/* Explore Vault Section */}
      <section id="explore" className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/3 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-0.5 bg-red-600 shadow-[0_0_8px_#e8192c]" />
            <span className="font-mono text-[11px] sm:text-xs font-bold tracking-widest text-red-500 uppercase flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5" />
              COMPLETE GAME VAULT
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl min-[420px]:text-4xl sm:text-5xl lg:text-6xl font-black italic uppercase text-white tracking-tight leading-none">
                EXPLORE <span className="text-red-500">ALL TITLES</span>
              </h2>
              <p className="font-mono text-xs text-zinc-400 mt-2">
                Click any title to review hardware benchmarks and reserve your session.
              </p>
            </div>

            <div className="font-mono text-[11px] sm:text-xs text-zinc-400 bg-white/5 border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 self-start sm:self-auto">
              SHOWING <strong className="text-amber-400 font-bold">{filteredGames.length}</strong> OF{' '}
              <strong className="text-white">{platformCounts['All']}</strong> PRE-LOADED GAMES
            </div>
          </div>
        </motion.div>

        {/* Platform selector tabs */}
        <div className="mb-6 sm:mb-8">
          <PlatformSelector
            selected={filters.platform}
            onSelect={(p) => updateFilter('platform', p as Platform | 'All')}
            counts={platformCounts}
          />
        </div>

        {/* Filters panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10 p-4 sm:p-6 border border-white/10 bg-[#0d0f1a]/85 backdrop-blur-xl"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
          }}
        >
          <GameFilters
            filters={filters}
            onFilterChange={updateFilter}
            onClearFilters={clearFilters}
            activeFilterCount={activeFilterCount}
            resultCount={filteredGames.length}
          />
        </motion.div>

        {/* Game grid */}
        <GameGrid games={filteredGames} onGameClick={openGame} />
      </section>

      {/* Footer */}
      <Footer />

      {/* Booking Session Dialog */}
      <GameDetailsDialog game={selectedGame} open={dialogOpen} onClose={closeDialog} />
    </div>
  );
}

export default App;
