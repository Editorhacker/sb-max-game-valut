import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PlatformSelector } from './components/PlatformSelector';
import { GameFilters } from './components/GameFilters';
import { GameGrid } from './components/GameGrid';
import { GameDetailsDialog } from './components/GameDetailsDialog';
import { FeaturedGames } from './components/FeaturedGames';
import { Footer } from './components/Footer';
import { useGameFilters } from './hooks/useGameFilters';
import type { Game, Platform } from './types/game';
import { motion } from 'framer-motion';

function App() {
  const {
    filters,
    filteredGames,
    platformCounts,
    activeFilterCount,
    updateFilter,
    clearFilters,
  } = useGameFilters();

  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openGame = useCallback((game: Game) => {
    setSelectedGame(game);
    setDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  // Handle Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dialogOpen) closeDialog();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dialogOpen, closeDialog]);

  return (
    <div className="min-h-screen bg-[#07070a] text-white selection:bg-red-500 selection:text-white">
      <Navbar />

      {/* Hero */}
      <Hero
        searchValue={filters.search}
        onSearchChange={(v) => updateFilter('search', v)}
      />

      {/* Featured Games */}
      <FeaturedGames onGameClick={openGame} />

      {/* Explore Section */}
      <section id="explore" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section heading with Gold & Red accents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-amber-400 to-red-600 shadow-sm shadow-amber-400" />
            <span className="text-amber-400 text-xs font-extrabold uppercase tracking-widest">
              Browse Vault
            </span>
          </div>
          <h2 className="text-3xl font-black text-white">Explore All Games</h2>
          <p className="text-gray-400 text-sm mt-1">
            Showing <strong className="text-amber-300 font-bold">{filteredGames.length}</strong> of {platformCounts['All']} total games in vault
          </p>
        </motion.div>

        {/* Platform selector */}
        <div className="mb-8">
          <PlatformSelector
            selected={filters.platform}
            onSelect={(p) => updateFilter('platform', p as Platform | 'All')}
            counts={platformCounts}
          />
        </div>

        {/* Filters */}
        <div className="mb-8 p-5 rounded-2xl bg-[#0f1017] border border-amber-400/15 backdrop-blur-sm shadow-lg shadow-black/40">
          <GameFilters
            filters={filters}
            onFilterChange={updateFilter}
            onClearFilters={clearFilters}
            activeFilterCount={activeFilterCount}
            resultCount={filteredGames.length}
          />
        </div>

        {/* Game Grid */}
        <GameGrid games={filteredGames} onGameClick={openGame} />
      </section>

      <Footer />

      {/* Game Details Dialog */}
      <GameDetailsDialog
        game={selectedGame}
        open={dialogOpen}
        onClose={closeDialog}
      />
    </div>
  );
}

export default App;
